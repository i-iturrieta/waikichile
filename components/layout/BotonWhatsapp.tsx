/**
 * Botón flotante de WhatsApp (ARCHITECTURE.md §1.2, §2; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.5).
 *
 * No es un adorno: es la vía alternativa que sostiene la degradación grácil
 * del formulario de contacto (ARCHITECTURE.md §1.2 — "el WhatsApp queda
 * visible y funcional en todas las páginas como vía alternativa, no como
 * adorno"). Server component: es un enlace estático, no necesita estado ni
 * JavaScript de cliente.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * Pasa a ser exclusivo de escritorio (`hidden lg:inline-flex`). Bajo `lg`
 * la función la cumple `BarraFija.tsx`, la barra anclada abajo que el diseño
 * introduce, y tener las dos a la vez pondría dos botones verdes de WhatsApp
 * en la misma esquina de la pantalla.
 *
 * El quiebre es `lg` y no `md` para coincidir con el del encabezado: a
 * partir de `lg` aparece la píldora de WhatsApp en la barra superior, así
 * que entre 768 y 1023px —donde el encabezado solo muestra logo y menú— la
 * barra inferior sigue siendo la única vía visible, que es justo lo que se
 * quiere.
 *
 * Redundancia deliberada con esa píldora del encabezado en `lg`: la del
 * encabezado se pierde al hacer scroll en páginas largas de catálogo (el
 * encabezado es `sticky`, pero el botón flotante no exige volver a mirar
 * arriba), y el costo de sostener las dos es un enlace estático.
 */

import { enlaceWhatsapp } from './whatsapp';
import { IconoWhatsapp } from '@/components/ui/iconos';

export default function BotonWhatsapp() {
  return (
    <a
      href={enlaceWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Waiki Chile por WhatsApp"
      className="fixed bottom-6 right-6 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-secundario text-claro shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca lg:inline-flex"
    >
      <IconoWhatsapp tamano={28} />
    </a>
  );
}
