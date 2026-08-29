/**
 * Botón flotante de WhatsApp (ARCHITECTURE.md §1.2, §2; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.5).
 *
 * No es un adorno: es la vía alternativa que sostiene la degradación
 * grácil del formulario de contacto (ARCHITECTURE.md §1.2 — "el WhatsApp
 * queda visible y funcional en todas las páginas como vía alternativa, no
 * como adorno"; Bloque 10, todavía no construido). Server component: es un
 * enlace estático a `https://api.whatsapp.com/send`, no necesita estado ni
 * JavaScript de cliente.
 *
 * Montado una sola vez en `app/layout.tsx` (tarea 5.4) para estar presente
 * en todas las páginas, incluidas las que no tengan ninguna otra isla de
 * cliente. Posición fija en la esquina inferior derecha: en pantallas
 * angostas no hay ninguna barra inferior con la que choque (no hay tab bar
 * ni CTA fijo de otro tipo en este sitio), así que un botón circular de 56px
 * con margen respecto del borde no tapa contenido de forma relevante.
 */

import { empresa } from '@/lib/contenido/empresa';

const MENSAJE_PRELLENADO = 'Hola, tengo una consulta sobre los equipos Waiki.';

export default function BotonWhatsapp() {
  const numero = empresa.whatsapp.replace(/\D/g, '');
  const href = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(MENSAJE_PRELLENADO)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Waiki Chile por WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secundario text-superficie shadow-lg transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.36 5.07L2 22l5.19-1.44a9.87 9.87 0 0 0 4.85 1.27h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.37-.44.5-.15.15-.31.31-.13.6.18.29.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.47 1.53.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
      </svg>
    </a>
  );
}
