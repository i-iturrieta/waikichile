/**
 * Tests de `src/worker.ts` — `POST /api/contacto` (Bloque 10 de
 * PHASE_1_PLAN.md, tareas 10.1 y 10.2).
 *
 * Vive en `src/` para correr en el proyecto `worker` de `vitest.config.mts`
 * (pool `@cloudflare/vitest-pool-workers`, runtime real de Workers vía
 * Miniflare) — es el primer archivo bajo `src/**` con tests reales. Ver el
 * reporte del Bloque 10 sobre el estado de `compatibility_date` en este
 * entorno: al momento de escribir este archivo, ningún test de este
 * proyecto puede *ejecutarse* aquí (el binario de `workerd` instalado no
 * soporta la fecha de compatibilidad de `wrangler.jsonc`), pero el archivo
 * está escrito para correr sin cambios apenas esa brecha de la herramienta
 * se cierre.
 *
 * Diseño deliberado: no se importa `env` desde `cloudflare:test` (ni
 * `cloudflare:workers`). Esos módulos tipan `env` como `Cloudflare.Env`, un
 * namespace que solo existe si se genera `worker-configuration.d.ts` con
 * `wrangler types` — este proyecto no lo tiene (Bloque 1 fijó `Env` a mano
 * en `src/env.d.ts`, sin depender de `@cloudflare/workers-types`), y
 * generarlo solo para este archivo es infraestructura nueva fuera del
 * alcance de este bloque. En su lugar, cada test construye su propio `env`
 * (tipado contra la interfaz global `Env` de `src/env.d.ts`, ya disponible
 * sin import) con un `LIMITADOR_CONTACTO.limit()` controlable a mano. Esto
 * prueba con precisión lo que es responsabilidad de *nuestro* código —que
 * `manejarPostContacto` respete `limit.success` y devuelva 429 cuando
 * corresponde— sin depender del simulador de Miniflare para el binding real
 * de rate limiting, que de todas formas no se puede ejercitar hoy (ver
 * arriba). La vía (b) del enunciado del bloque ("estructurar el handler
 * para poder pasarle un fetch inyectable") se usa también para Turnstile y
 * Resend: ninguna llamada de red real ocurre en este archivo.
 *
 * Claves de prueba oficiales de Cloudflare Turnstile (documentadas en
 * https://developers.cloudflare.com/turnstile/troubleshooting/testing/,
 * citadas aquí solo como referencia — el mock de `fetch` de abajo no llama
 * a Cloudflare de verdad, así que el valor exacto del token es irrelevante
 * para estos tests):
 *   - Sitekey que siempre pasa (visible):   1x00000000000000000000AA
 *   - Sitekey que siempre falla (visible):  2x00000000000000000000AB
 *   - Secret key que siempre pasa:          1x0000000000000000000000000000000AA
 *   - Secret key que siempre falla:         2x0000000000000000000000000000000AA
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import worker, { manejarPostContacto } from './worker.ts';

const RUTA_CONTACTO = 'https://waikichile.cl/api/contacto';

const PAYLOAD_VALIDO = {
  nombre: 'Juanita Pérez',
  email: 'juanita@example.com',
  mensaje: 'Hola, quería consultar por el modelo Nahuen para una casa de 60 m².',
  honeypot: '',
  tiempoLlenado: 4000,
  turnstileToken: 'un-token-de-turnstile',
};

/** `env` mínimo que satisface la interfaz global `Env` (`src/env.d.ts`), con
 * un rate limiter controlable a mano — ver la nota de diseño de arriba. */
function crearEnvFalso(overrides: Partial<Env> = {}): Env {
  return {
    ASSETS: { fetch: async () => new Response('no usado en estos tests', { status: 200 }) },
    RESEND_API_KEY: 'clave-de-prueba-resend',
    CONTACTO_DESTINO: 'contacto@waikichile.cl',
    CONTACTO_REMITENTE: 'formulario@dominio-de-ignacio.cl',
    TURNSTILE_SECRET_KEY: 'clave-de-prueba-turnstile',
    LIMITADOR_CONTACTO: { limit: async () => ({ success: true }) },
    ...overrides,
  };
}

interface LlamadaFetch {
  url: string;
  init?: RequestInit;
}

/** Doble de `fetch` que responde según el host de la URL, sin tocar la red.
 * Registra cada llamada para poder aserir sobre ellas (p. ej. que Resend
 * recibió el `reply_to` correcto). */
function crearFetchFalso(opciones: { turnstileOk: boolean; turnstileLanza?: boolean; resendOk: boolean }) {
  const llamadas: LlamadaFetch[] = [];
  const fetchFalso = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    llamadas.push({ url, init });

    if (url.includes('challenges.cloudflare.com')) {
      if (opciones.turnstileLanza) throw new Error('fallo de red simulado hacia Turnstile');
      return new Response(JSON.stringify({ success: opciones.turnstileOk }), { status: 200 });
    }

    if (url.includes('api.resend.com')) {
      return new Response(JSON.stringify({ id: 'correo-de-prueba' }), {
        status: opciones.resendOk ? 200 : 422,
      });
    }

    throw new Error(`fetchFalso: URL inesperada en un test — ${url}`);
  };
  return { fetchFalso, llamadas };
}

function crearRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(RUTA_CONTACTO, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
}

describe('manejarPostContacto — payload válido', () => {
  it('responde 200 { ok: true } y llama a Resend con from/to/reply_to correctos', async () => {
    const env = crearEnvFalso();
    const { fetchFalso, llamadas } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    const respuesta = await manejarPostContacto(crearRequest(PAYLOAD_VALIDO), env, fetchFalso);

    expect(respuesta.status).toBe(200);
    expect(await respuesta.json()).toEqual({ ok: true });

    const llamadaResend = llamadas.find((l) => l.url.includes('api.resend.com'));
    expect(llamadaResend).toBeDefined();
    const cuerpoResend = JSON.parse(llamadaResend!.init!.body as string);
    expect(cuerpoResend.from).toBe(env.CONTACTO_REMITENTE);
    expect(cuerpoResend.to).toEqual([env.CONTACTO_DESTINO]);
    // Reply-To = el correo del visitante (ARCHITECTURE.md §1.2/§8): así
    // Waiki responde directo desde su bandeja, sin tocar el DNS de
    // waikichile.cl.
    expect(cuerpoResend.reply_to).toBe(PAYLOAD_VALIDO.email);
    expect((llamadaResend!.init!.headers as Record<string, string>).authorization).toBe(
      `Bearer ${env.RESEND_API_KEY}`
    );
  });
});

describe('manejarPostContacto — validación (10.1: mensaje genérico, sin distinguir motivo)', () => {
  it('un payload con un campo real inválido (mensaje muy corto) devuelve 400 genérico', async () => {
    const env = crearEnvFalso();
    const { fetchFalso, llamadas } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    const respuesta = await manejarPostContacto(
      crearRequest({ ...PAYLOAD_VALIDO, mensaje: 'muy corto' }),
      env,
      fetchFalso
    );

    expect(respuesta.status).toBe(400);
    const cuerpo = await respuesta.json();
    expect(cuerpo.ok).toBe(false);
    expect(typeof cuerpo.error).toBe('string');
    // No debe haber gastado una llamada a Turnstile ni a Resend: la
    // validación de Zod corta antes.
    expect(llamadas).toHaveLength(0);
  });

  it('honeypot relleno (spam) devuelve el mismo 400 y el mismo mensaje que un error de formato real', async () => {
    const env = crearEnvFalso();
    const { fetchFalso: fetchA } = crearFetchFalso({ turnstileOk: true, resendOk: true });
    const { fetchFalso: fetchB } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    const respuestaFormatoInvalido = await manejarPostContacto(
      crearRequest({ ...PAYLOAD_VALIDO, mensaje: 'muy corto' }),
      env,
      fetchA
    );
    const respuestaHoneypot = await manejarPostContacto(
      crearRequest({ ...PAYLOAD_VALIDO, honeypot: 'soy un bot' }),
      env,
      fetchB
    );

    expect(respuestaHoneypot.status).toBe(400);
    const [cuerpoFormato, cuerpoHoneypot] = await Promise.all([
      respuestaFormatoInvalido.json(),
      respuestaHoneypot.json(),
    ]);
    // El punto de la tarea 10.1: un bot no debe poder distinguir, por la
    // respuesta, si lo atrapó el honeypot o si mandó un campo mal formado.
    expect(cuerpoHoneypot.error).toBe(cuerpoFormato.error);
  });

  it('tiempoLlenado insuficiente (< 3000 ms) devuelve el mismo 400 genérico', async () => {
    const env = crearEnvFalso();
    const { fetchFalso, llamadas } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    const respuesta = await manejarPostContacto(
      crearRequest({ ...PAYLOAD_VALIDO, tiempoLlenado: 500 }),
      env,
      fetchFalso
    );

    expect(respuesta.status).toBe(400);
    expect((await respuesta.json()).ok).toBe(false);
    expect(llamadas).toHaveLength(0);
  });

  it('un body que no es JSON válido devuelve 400 (no revienta el Worker)', async () => {
    const env = crearEnvFalso();
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, resendOk: true });
    const request = new Request(RUTA_CONTACTO, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ esto no es json',
    });

    const respuesta = await manejarPostContacto(request, env, fetchFalso);
    expect(respuesta.status).toBe(400);
  });
});

describe('manejarPostContacto — Turnstile', () => {
  it('token rechazado por Cloudflare (success: false) devuelve 400 y no llega a Resend', async () => {
    const env = crearEnvFalso();
    const { fetchFalso, llamadas } = crearFetchFalso({ turnstileOk: false, resendOk: true });

    const respuesta = await manejarPostContacto(crearRequest(PAYLOAD_VALIDO), env, fetchFalso);

    expect(respuesta.status).toBe(400);
    expect((await respuesta.json()).ok).toBe(false);
    expect(llamadas.some((l) => l.url.includes('api.resend.com'))).toBe(false);
  });

  it('un fallo de red al verificar Turnstile se trata como token inválido (falla cerrado), no como 500', async () => {
    const env = crearEnvFalso();
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, turnstileLanza: true, resendOk: true });

    const respuesta = await manejarPostContacto(crearRequest(PAYLOAD_VALIDO), env, fetchFalso);

    expect(respuesta.status).toBe(400);
    expect((await respuesta.json()).ok).toBe(false);
  });
});

describe('manejarPostContacto — Resend (10.1, punto 4: el error orienta a WhatsApp)', () => {
  it('si Resend falla, responde ok:false con un error que menciona la alternativa de WhatsApp', async () => {
    const env = crearEnvFalso();
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, resendOk: false });

    const respuesta = await manejarPostContacto(crearRequest(PAYLOAD_VALIDO), env, fetchFalso);

    const cuerpo = await respuesta.json();
    expect(cuerpo.ok).toBe(false);
    expect(cuerpo.error.toLowerCase()).toContain('whatsapp');
  });
});

describe('manejarPostContacto — 10.2: límite de tasa nativo de Workers', () => {
  // El binding real (`env.LIMITADOR_CONTACTO`, `ratelimits` en
  // wrangler.jsonc) solo se puede ejercitar de verdad dentro del runtime de
  // Workers — no se simula aquí. Este bloque prueba que *nuestro código*
  // honra `limit.success` correctamente en ambos casos, con un doble
  // controlado a mano (ver la nota de diseño al inicio del archivo).
  it('cuando el limitador dice success:false, responde 429 sin tocar el body ni llamar a Turnstile/Resend', async () => {
    const env = crearEnvFalso({ LIMITADOR_CONTACTO: { limit: async () => ({ success: false }) } });
    const { fetchFalso, llamadas } = crearFetchFalso({ turnstileOk: true, resendOk: true });
    // Body deliberadamente inválido: si el código llegara a parsearlo,
    // fallaría por otro motivo (400) en vez de 429. Que la respuesta sea
    // 429 demuestra que el límite de tasa se evalúa antes de tocar el body.
    const request = new Request(RUTA_CONTACTO, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ json invalido a propósito',
    });

    const respuesta = await manejarPostContacto(request, env, fetchFalso);

    expect(respuesta.status).toBe(429);
    expect((await respuesta.json()).ok).toBe(false);
    expect(llamadas).toHaveLength(0);
  });

  it('simulando "el sexto envío en la ventana": los primeros 5 pasan el límite, el 6º no', async () => {
    let contador = 0;
    const env = crearEnvFalso({
      LIMITADOR_CONTACTO: {
        limit: async () => {
          contador += 1;
          return { success: contador <= 5 };
        },
      },
    });
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    const estados: number[] = [];
    for (let i = 0; i < 6; i += 1) {
      const respuesta = await manejarPostContacto(crearRequest(PAYLOAD_VALIDO), env, fetchFalso);
      estados.push(respuesta.status);
    }

    expect(estados).toEqual([200, 200, 200, 200, 200, 429]);
  });

  it('la IP se lee de CF-Connecting-IP y se pasa como key al limitador', async () => {
    const limitMock = vi.fn(async () => ({ success: true }));
    const env = crearEnvFalso({ LIMITADOR_CONTACTO: { limit: limitMock } });
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, resendOk: true });

    await manejarPostContacto(crearRequest(PAYLOAD_VALIDO, { 'CF-Connecting-IP': '203.0.113.42' }), env, fetchFalso);

    expect(limitMock).toHaveBeenCalledWith({ key: '203.0.113.42' });
  });
});

describe('worker.fetch — enrutamiento', () => {
  let env: Env;
  beforeEach(() => {
    env = crearEnvFalso();
  });

  it('GET /api/contacto devuelve 405 (solo POST)', async () => {
    const respuesta = await worker.fetch(new Request(RUTA_CONTACTO, { method: 'GET' }), env);
    expect(respuesta.status).toBe(405);
  });

  it('POST /api/contacto/ (con slash final) enruta igual que sin slash', async () => {
    // `worker.fetch` (el punto de entrada real que invoca Cloudflare) no
    // acepta un `fetch` inyectado — su firma la fija el runtime de Workers.
    // Para no hacer una llamada de red real hacia Turnstile/Resend al pasar
    // por esta ruta, se reemplaza el `fetch` global solo para este test.
    const { fetchFalso } = crearFetchFalso({ turnstileOk: true, resendOk: true });
    vi.stubGlobal('fetch', fetchFalso);
    try {
      const request = new Request('https://waikichile.cl/api/contacto/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(PAYLOAD_VALIDO),
      });
      // Alcanza con comprobar que NO cae en la rama 404 (que sí sería el
      // comportamiento si el enrutador no reconociera la ruta con slash) —
      // de hecho debe llegar a 200, confirmando que se procesó igual que
      // `/api/contacto` sin slash.
      const respuesta = await worker.fetch(request, env);
      expect(respuesta.status).toBe(200);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('una ruta /api/* no implementada sigue devolviendo 404 (comportamiento del Bloque 1, sin cambios)', async () => {
    const respuesta = await worker.fetch(new Request('https://waikichile.cl/api/lo-que-sea', { method: 'GET' }), env);
    expect(respuesta.status).toBe(404);
  });
});
