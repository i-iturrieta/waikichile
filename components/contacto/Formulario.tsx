'use client';

/**
 * Formulario de contacto (ARCHITECTURE.md §1.2, §2 tabla de islas: "Formulario
 * de contacto — Estado del formulario y envío"; Bloque 10 de
 * PHASE_1_PLAN.md, tarea 10.3).
 *
 * Isla de cliente: envía a `POST /api/contacto` (`src/worker.ts`, tarea
 * 10.1/10.2). Solo se monta cuando `RESEND_API_KEY` existió en build
 * (`app/contacto/page.tsx`, tarea 10.4) — si este componente está en el
 * árbol, Turnstile y Resend están configurados.
 *
 * Reutiliza `contactoSchema` (`lib/contenido/esquemas.ts`) también en el
 * cliente para validar antes de enviar: mismo esquema, mismos límites que
 * `src/worker.ts` valida de nuevo en el servidor (fuente de verdad única,
 * ARCHITECTURE.md §3). Deliberadamente se separan los campos "visibles"
 * (nombre, email, teléfono, mensaje, turnstileToken) de los campos
 * antispam (`honeypot`, `tiempoLlenado`): estos últimos nunca se validan ni
 * se explican en la interfaz —no hay ningún escenario donde mostrarle a un
 * humano real un error sobre "tiempoLlenado" tenga sentido— y viajan al
 * servidor calculados en silencio. Si de todas formas el servidor los
 * rechaza (por ejemplo, un envío genuino a menos de 3 segundos de montado
 * el formulario, un caso raro con autocompletado del navegador), la
 * respuesta es el mismo error genérico que cualquier otro fallo de
 * validación — nunca se distingue en la interfaz, por diseño (tarea 10.1).
 *
 * Construida con las primitivas de `components/ui/` (Boton, Contenedor,
 * Titulo) del Bloque 5, a diferencia de `components/calculadora/Formulario.tsx`
 * (Bloque 7), que se escribió antes de que existiera el sistema visual y lo
 * documenta explícitamente en su propio encabezado.
 */

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Script from 'next/script';
import Boton from '@/components/ui/Boton';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import { contactoSchema } from '@/lib/contenido/esquemas';
import { empresa } from '@/lib/contenido/empresa';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
// Documentada en .env.example — pública a propósito: es la sitekey de
// Turnstile, diseñada para viajar al cliente (ARCHITECTURE.md §8: "Secretos:
// TURNSTILE_SECRET_KEY (Worker), NEXT_PUBLIC_TURNSTILE_SITE_KEY (cliente)").
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Solo los campos que un humano llena y que tiene sentido explicarle si
// fallan. `honeypot` y `tiempoLlenado` se completan en código, no por el
// visitante, y se validan únicamente en el envío final contra
// `contactoSchema` completo (servidor) — ver la nota de diseño de arriba.
const camposVisiblesSchema = contactoSchema.omit({ honeypot: true, tiempoLlenado: true });

type Estado = 'inactivo' | 'enviando' | 'exito' | 'error';

const MENSAJE_ERROR_RED = 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.';
const MENSAJE_EXITO = 'Tu mensaje fue enviado. Te responderemos a la brevedad.';

declare global {
  interface Window {
    turnstile?: {
      render(
        contenedor: HTMLElement,
        opciones: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        }
      ): string;
      reset(widgetId?: string): void;
    };
  }
}

function construirEnlaceWhatsapp(mensaje: string): string {
  // Mismo patrón que components/layout/BotonWhatsapp.tsx: número de
  // `empresa.whatsapp` sin formato, mensaje prellenado vía `api.whatsapp.com/send`.
  const numero = empresa.whatsapp.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
}

const ENLACE_WHATSAPP_ERROR = construirEnlaceWhatsapp(
  'Hola, intenté escribir por el formulario de la web pero no pude enviar el mensaje. Quería consultar por...'
);

export default function Formulario() {
  const montadoEnRef = useRef<number>(Date.now());
  const contenedorTurnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const [estado, setEstado] = useState<Estado>('inactivo');
  const [errorServidor, setErrorServidor] = useState('');
  const [erroresCampo, setErroresCampo] = useState<Record<string, string>>({});

  function reiniciarTurnstile() {
    setTurnstileToken('');
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  function renderizarTurnstile() {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !contenedorTurnstileRef.current) return;
    if (widgetIdRef.current) return; // ya renderizado — evita duplicar el widget
    widgetIdRef.current = window.turnstile.render(contenedorTurnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      'error-callback': () => setTurnstileToken(''),
      'expired-callback': () => setTurnstileToken(''),
    });
  }

  // Si el script de Turnstile ya estaba en caché y se cargó antes de que
  // este efecto corriera, `next/script` no vuelve a disparar `onLoad`: este
  // efecto cubre ese caso reintentando el render una vez montado.
  useEffect(() => {
    renderizarTurnstile();
  }, []);

  function reiniciarFormulario() {
    setNombre('');
    setEmail('');
    setTelefono('');
    setMensaje('');
    setHoneypot('');
    setErroresCampo({});
    setErrorServidor('');
    montadoEnRef.current = Date.now();
    reiniciarTurnstile();
    setEstado('inactivo');
  }

  async function manejarSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorServidor('');

    const datosVisibles = {
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim() || undefined,
      mensaje: mensaje.trim(),
      turnstileToken,
    };

    const resultadoVisible = camposVisiblesSchema.safeParse(datosVisibles);
    if (!resultadoVisible.success) {
      const errores: Record<string, string> = {};
      for (const issue of resultadoVisible.error.issues) {
        const campo = String(issue.path[0] ?? '');
        if (campo && !errores[campo]) errores[campo] = issue.message;
      }
      setErroresCampo(errores);
      return;
    }
    setErroresCampo({});

    const payload = {
      ...resultadoVisible.data,
      honeypot,
      tiempoLlenado: Date.now() - montadoEnRef.current,
    };

    setEstado('enviando');
    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const cuerpo = (await respuesta.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (!respuesta.ok || !cuerpo?.ok) {
        setErrorServidor(cuerpo?.error || MENSAJE_ERROR_RED);
        setEstado('error');
        reiniciarTurnstile();
        return;
      }

      setEstado('exito');
    } catch {
      setErrorServidor(MENSAJE_ERROR_RED);
      setEstado('error');
      reiniciarTurnstile();
    }
  }

  if (estado === 'exito') {
    return (
      <section className="py-16 lg:py-20">
        <Contenedor className="max-w-2xl">
          <div
            className="flex flex-col items-start gap-4 rounded-imagen-principal border border-borde bg-superficie-alta p-8 shadow-sm"
            role="status"
          >
            <Titulo nivel={2}>Mensaje enviado</Titulo>
            <p className="text-cuerpo text-texto-tenue">{MENSAJE_EXITO}</p>
            <Boton variante="secundario" onClick={reiniciarFormulario}>
              Enviar otro mensaje
            </Boton>
          </div>
        </Contenedor>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20">
      <Contenedor className="max-w-2xl">
        <Titulo nivel={1}>Contacto</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Cuéntanos qué necesitas y te respondemos a la brevedad. Si prefieres, también puedes
          escribirnos directo por WhatsApp.
        </p>

        <form className="mt-8 flex flex-col gap-6" onSubmit={manejarSubmit} noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nombre" className="text-caption font-medium text-texto">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-boton border border-borde bg-superficie px-4 py-3 text-cuerpo text-texto focus:outline-none focus:ring-2 focus:ring-marca"
              aria-invalid={Boolean(erroresCampo.nombre)}
              aria-describedby={erroresCampo.nombre ? 'nombre-error' : undefined}
            />
            {erroresCampo.nombre && (
              <p id="nombre-error" className="text-caption text-red-600">
                {erroresCampo.nombre}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-caption font-medium text-texto">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-boton border border-borde bg-superficie px-4 py-3 text-cuerpo text-texto focus:outline-none focus:ring-2 focus:ring-marca"
              aria-invalid={Boolean(erroresCampo.email)}
              aria-describedby={erroresCampo.email ? 'email-error' : undefined}
            />
            {erroresCampo.email && (
              <p id="email-error" className="text-caption text-red-600">
                {erroresCampo.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-caption font-medium text-texto">
              Teléfono <span className="text-texto-tenue">(opcional)</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="rounded-boton border border-borde bg-superficie px-4 py-3 text-cuerpo text-texto focus:outline-none focus:ring-2 focus:ring-marca"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mensaje" className="text-caption font-medium text-texto">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="resize-y rounded-boton border border-borde bg-superficie px-4 py-3 text-cuerpo text-texto focus:outline-none focus:ring-2 focus:ring-marca"
              aria-invalid={Boolean(erroresCampo.mensaje)}
              aria-describedby={erroresCampo.mensaje ? 'mensaje-error' : undefined}
            />
            {erroresCampo.mensaje && (
              <p id="mensaje-error" className="text-caption text-red-600">
                {erroresCampo.mensaje}
              </p>
            )}
          </div>

          {/* Honeypot antispam (ARCHITECTURE.md §1.2; tarea 10.1/10.3): oculto
              de verdad, no solo `display:none` — `aria-hidden` lo saca del
              árbol de accesibilidad, `tabIndex={-1}` lo salta del orden de
              tabulación, y el posicionamiento absoluto fuera de pantalla lo
              saca del flujo visual sin depender de una propiedad CSS que
              algunos bots detectan y evitan rellenar. `contactoSchema` exige
              que llegue vacío: si un bot lo autocompleta, el envío se
              rechaza en el servidor con el mismo error genérico que
              cualquier otro fallo de validación (tarea 10.1). */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="honeypot">No completar este campo</label>
            <input
              id="honeypot"
              name="honeypot"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {TURNSTILE_SITE_KEY ? (
              <>
                <Script src={TURNSTILE_SCRIPT_SRC} strategy="afterInteractive" onLoad={renderizarTurnstile} />
                <div ref={contenedorTurnstileRef} />
                {!turnstileToken && (
                  <p className="text-caption text-texto-tenue">Verificando que eres una persona…</p>
                )}
              </>
            ) : (
              // No debería ocurrir en producción (10.4 solo monta este
              // componente cuando el build tenía RESEND_API_KEY, y ambas
              // variables se configuran juntas), pero si faltara solo la
              // sitekey pública, se degrada al mensaje de error en vez de
              // dejar un widget roto o un error de consola.
              <p className="text-caption text-red-600">
                Falta configurar la verificación antispam. Escríbenos por WhatsApp mientras tanto.
              </p>
            )}
          </div>

          {estado === 'error' && (
            <div className="flex flex-col gap-2 rounded-boton border border-red-200 bg-red-50 p-4" role="alert">
              <p className="text-caption text-red-700">{errorServidor}</p>
              <Boton
                href={ENLACE_WHATSAPP_ERROR}
                variante="secundario"
                tamano="sm"
                className="self-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp
              </Boton>
            </div>
          )}

          <Boton
            type="submit"
            tamano="lg"
            className="self-start"
            disabled={estado === 'enviando' || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
          >
            {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
          </Boton>
        </form>
      </Contenedor>
    </section>
  );
}
