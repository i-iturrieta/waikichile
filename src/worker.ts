/**
 * Único código de servidor del sitio (ARCHITECTURE.md §7).
 *
 * Sirve el export estático de Next.js (`./out`, binding `ASSETS`) para todo
 * lo que no calce con `/api/*`. Corre en el runtime de Workers, no en Node:
 * no puede depender de `fs` ni de `process`, ni importar de `app/` ni de
 * `components/` (ARCHITECTURE.md §7). El único import fuera de `src/` es el
 * esquema Zod del formulario, desde `lib/contenido/` — es la excepción que
 * ARCHITECTURE.md §7 permite explícitamente.
 *
 * `POST /api/contacto` (Bloque 10 de PHASE_1_PLAN.md; ARCHITECTURE.md §1.2,
 * §8): valida el payload con `contactoSchema`, aplica el límite de tasa
 * nativo de Workers, verifica el token de Cloudflare Turnstile y despacha el
 * correo por la API REST de Resend (`fetch` nativo — "Sin SDK de Resend",
 * ARCHITECTURE.md §1.2). Cualquier otra ruta bajo `/api/` sigue respondiendo
 * 404, como en el Bloque 1.
 */

import { contactoSchema } from '../lib/contenido/esquemas.ts';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

// Mensajes de error genéricos (ARCHITECTURE.md §9: "el Worker devuelve
// mensajes genéricos al cliente y registra el detalle en los logs de
// Cloudflare"). En particular, ERROR_VALIDACION cubre tanto un error de
// formato real como un honeypot relleno o un tiempoLlenado insuficiente —
// las tres cosas devuelven exactamente el mismo mensaje y el mismo código
// 400, sin ningún campo adicional que distinga el motivo (tarea 10.1: "sin
// distinguir en la respuesta si fue spam o un error de formato real, para no
// darle información útil a un bot").
const ERROR_VALIDACION = 'No pudimos procesar tu mensaje. Revisa los datos e inténtalo de nuevo.';
const ERROR_TURNSTILE = 'No pudimos verificar que eres una persona. Inténtalo de nuevo.';
const ERROR_ENVIO = 'No se pudo enviar el mensaje. Escríbenos por WhatsApp mientras lo solucionamos.';
const ERROR_LIMITE = 'Demasiados intentos desde tu conexión. Espera un momento o escríbenos por WhatsApp.';
const ERROR_METODO = 'Método no permitido.';

interface RespuestaContacto {
  ok: boolean;
  error?: string;
}

function json(cuerpo: RespuestaContacto, status: number): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Firma de `fetch` global, inyectable para tests. En producción siempre es
 * el `fetch` nativo del runtime de Workers (nunca un SDK — ARCHITECTURE.md
 * §1.2). En `src/worker.test.ts` se reemplaza por un doble que no llama a
 * Cloudflare ni a Resend de verdad: es la vía (b) que sugiere el enunciado
 * del bloque ("estructurar el handler para poder pasarle un fetch
 * inyectable"), preferida aquí por ser explícita en la firma de la función
 * en vez de depender de un mock global de `fetch` dentro del runtime real de
 * Workers que ejecuta el pool de tests.
 */
type FetchImpl = typeof fetch;

async function verificarTurnstile(token: string, secretKey: string, fetchImpl: FetchImpl): Promise<boolean> {
  try {
    const respuesta = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    });
    if (!respuesta.ok) return false;
    const datos = (await respuesta.json()) as { success?: boolean };
    return datos.success === true;
  } catch {
    // Un error de red hacia Cloudflare no es distinto, para el visitante, de
    // un token inválido: en ambos casos no se pudo verificar y el envío no
    // continúa.
    return false;
  }
}

interface DatosCorreo {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

function construirCuerpoCorreo(datos: DatosCorreo): string {
  const lineas = [
    `Nombre: ${datos.nombre}`,
    `Email: ${datos.email}`,
    datos.telefono ? `Teléfono: ${datos.telefono}` : null,
    '',
    datos.mensaje,
  ].filter((linea): linea is string => linea !== null);
  return lineas.join('\n');
}

async function enviarCorreo(datos: DatosCorreo, env: Env, fetchImpl: FetchImpl): Promise<boolean> {
  try {
    const respuesta = await fetchImpl(RESEND_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACTO_REMITENTE,
        to: [env.CONTACTO_DESTINO],
        // Reply-To = el correo del visitante (ARCHITECTURE.md §1.2, §8): así
        // Waiki responde directo desde su bandeja de siempre, sin tocar el
        // DNS de waikichile.cl ni el correo corporativo.
        reply_to: datos.email,
        subject: `Nuevo mensaje de contacto — ${datos.nombre}`,
        text: construirCuerpoCorreo(datos),
      }),
    });
    return respuesta.ok;
  } catch {
    return false;
  }
}

/**
 * Maneja `POST /api/contacto`. Exportada (además del `fetch` por defecto del
 * Worker) para que `src/worker.test.ts` pueda probarla directamente,
 * inyectando un `fetchImpl` de prueba y sin pasar por el enrutador — el
 * binding de rate limiting sigue siendo el real de `env` (solo se puede
 * probar dentro del runtime de Workers, ver el pool `worker` de
 * vitest.config.mts).
 */
export async function manejarPostContacto(request: Request, env: Env, fetchImpl: FetchImpl = fetch): Promise<Response> {
  // 10.2 — límite de tasa nativo de Workers, por IP (ver el comentario largo
  // junto a `ratelimits` en wrangler.jsonc: el binding solo admite ventanas
  // de 10 o 60 segundos, no de una hora — "5 por hora" se aproxima aquí con
  // "5 por minuto", la ventana más larga que la API permite). Va primero,
  // antes de tocar el body: es la verificación más barata y la que más
  // importa bloquear temprano si alguien está martillando el endpoint.
  const ip = request.headers.get('CF-Connecting-IP') ?? 'ip-desconocida';
  const limite = await env.LIMITADOR_CONTACTO.limit({ key: ip });
  if (!limite.success) {
    return json({ ok: false, error: ERROR_LIMITE }, 429);
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ ok: false, error: ERROR_VALIDACION }, 400);
  }

  const resultado = contactoSchema.safeParse(cuerpo);
  if (!resultado.success) {
    return json({ ok: false, error: ERROR_VALIDACION }, 400);
  }

  const { nombre, email, telefono, mensaje, turnstileToken } = resultado.data;

  const turnstileValido = await verificarTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, fetchImpl);
  if (!turnstileValido) {
    return json({ ok: false, error: ERROR_TURNSTILE }, 400);
  }

  const enviado = await enviarCorreo({ nombre, email, telefono, mensaje }, env, fetchImpl);
  if (!enviado) {
    return json({ ok: false, error: ERROR_ENVIO }, 502);
  }

  return json({ ok: true }, 200);
}

function normalizarRuta(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const ruta = normalizarRuta(url.pathname);

    if (ruta === '/api/contacto') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: ERROR_METODO }, 405);
      }
      return manejarPostContacto(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return new Response('Not Found', { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
