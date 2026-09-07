/**
 * AccesoCalculadora — sección de Inicio (ARCHITECTURE.md §4, §5; Bloque 6
 * de PHASE_1_PLAN.md, tarea 6.2). Server component.
 *
 * Bloque promocional que invita a usar la calculadora (`/calculadora/`,
 * Bloque 7, ya construida) — no reimplementa ningún cálculo ni cifra propia.
 *
 * Deliberadamente sin porcentaje de ahorro en el copy: ARCHITECTURE.md §5 es
 * explícito en que el resultado depende de la zona y del tipo de leña
 * (contra leña seca certificada el pellet no gana en ninguna zona, y en la
 * zona austral pierde incluso contra leña húmeda), y su regla no negociable
 * es "la interfaz nunca presenta un ahorro negativo como ahorro". Un "~50%
 * de ahorro" genérico en la portada violaría esa honestidad para los casos
 * donde no aplica — el número real solo lo entrega la calculadora, con su
 * desglose y sus excepciones ya resueltas.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * El panel pasa de claro con borde a bloque oscuro con el CTA en ámbar. Es
 * la única acción de todo el home que no es ni de marca (terracota) ni de
 * WhatsApp (verde), y esa excepción es intencional: la calculadora es la
 * herramienta que la clienta quiere empujar, y siendo el tercer botón de la
 * página necesitaba un color que no hubiera aparecido antes para no
 * confundirse con "ver productos". El ámbar sobre fondo oscuro es también
 * el par de mayor contraste de la paleta.
 *
 * La línea "Sin registro y sin dejar tus datos" contesta por adelantado la
 * objeción que frena a la mayoría frente a una calculadora en un sitio
 * comercial. Es literalmente cierto: la calculadora del Bloque 7 no tiene
 * formulario de captura.
 *
 * Escritorio (cocinado): el panel se abre en dos columnas —argumento a la
 * izquierda, botón a la derecha, alineados al centro vertical— en vez de
 * estirar un CTA de 54px de alto a 1150px de ancho.
 */

import Link from 'next/link';

export default function AccesoCalculadora() {
  return (
    <section className="px-5 pb-[38px] md:px-8 lg:px-16 lg:pb-20">
      <div className="mx-auto max-w-sitio rounded-[18px] bg-oscuro px-[22px] pb-6 pt-[26px] text-claro lg:flex lg:items-center lg:justify-between lg:gap-14 lg:px-14 lg:py-14">
        <div className="lg:max-w-[52ch]">
          <h2 className="text-pretty font-titulos text-[25px] font-semibold leading-[1.2] tracking-[-0.015em] lg:text-h2">
            ¿Cuánto puedes ahorrar cambiándote a pellet?
          </h2>
          <p className="mt-[11px] text-[15.5px] leading-[1.55] text-claro/90 lg:text-cuerpo">
            Compara el costo de calefaccionar con pellet contra la leña, para la misma cantidad de
            calor, según tu superficie y tu zona.
          </p>
          {/* Ámbar muy desaturado en vez del ámbar pleno del botón: tiene que
              leerse como una nota tranquilizadora asociada al CTA, no como
              una segunda acción compitiendo con él. */}
          <p className="mt-[9px] text-caption text-[oklch(80%_0.03_90)]">
            Sin registro y sin dejar tus datos.
          </p>
        </div>

        <Link
          href="/calculadora/"
          className="mt-[19px] flex min-h-[54px] items-center justify-center rounded-xl bg-ambar px-8 text-[17px] font-bold text-ambar-texto transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claro lg:mt-0 lg:shrink-0"
        >
          Calcular mi ahorro
        </Link>
      </div>
    </section>
  );
}
