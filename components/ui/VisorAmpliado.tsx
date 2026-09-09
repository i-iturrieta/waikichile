'use client';

/**
 * `VisorAmpliado` — el diálogo de imagen ampliada, compartido por las dos
 * galerías del sitio (ronda 09-09-2026).
 *
 * Existía desde el Bloque 9 dentro de `components/instalaciones/Visor.tsx`,
 * que era el único lugar del sitio donde se podía ampliar una foto. Al pedir
 * Ignacio lo mismo para las galerías de producto, se extrajo acá en vez de
 * duplicarlo: la lógica que vale la pena de este componente no es el layout
 * sino la accesibilidad (foco atrapado, Escape, flechas, devolución del
 * foco), y esa parte no se puede tener escrita dos veces sin que una de las
 * dos se quede atrás. `Visor` conserva su retícula y sus pies de foto; la
 * galería de producto conserva su tira con scroll-snap. Lo único común es
 * este diálogo.
 *
 * Accesibilidad (ARCHITECTURE.md §9), heredada del original:
 *
 *  - `role="dialog"` + `aria-modal="true"`, y el foco entra al diálogo al
 *    abrir.
 *  - Tab/Shift+Tab quedan atrapados entre el primer y el último elemento
 *    enfocable: un Tab en el último vuelve al primero, no se escapa al resto
 *    de la página.
 *  - Escape cierra. Flecha izquierda/derecha navegan sin cerrar.
 *  - Al cerrar, el foco vuelve al elemento que lo abrió.
 *
 * Diferencia con el original: **el elemento al que se devuelve el foco ya no
 * lo pasa quien monta el componente**. Antes `Visor` guardaba en un ref el
 * botón que había disparado la apertura; ahora el diálogo captura
 * `document.activeElement` en el momento de abrirse. Es equivalente para el
 * caso que ya existía y evita que cada galería nueva tenga que acordarse de
 * cablear ese ref — que es justo el detalle que se olvida al duplicar.
 *
 * El efecto de teclado depende de `abierto` (booleano), no del índice: así
 * el listener se registra una sola vez por apertura en vez de reinstalarse
 * en cada flecha, que le quitaría el foco al botón "siguiente"/"anterior"
 * que la persona acaba de usar. Es un detalle que ya venía resuelto en el
 * original y que conviene no perder.
 */

import { useEffect, useId, useRef, type ReactNode } from 'react';
import Imagen from '@/components/ui/Imagen';

export interface ImagenAmpliable {
  archivo: string;
  alt: string;
}

export interface VisorAmpliadoProps {
  imagenes: ImagenAmpliable[];
  /** Índice abierto, o `null` cuando el diálogo está cerrado. */
  indice: number | null;
  /** Cambia de imagen sin cerrar. */
  alCambiar: (indice: number) => void;
  alCerrar: () => void;
  /**
   * Palabra con que se nombra cada elemento en el contador y en las etiquetas
   * de los botones de navegación ("Instalación 3 de 110", "Imagen anterior").
   */
  singular?: string;
  /** Pie opcional bajo la imagen — hoy solo lo usa Instalaciones. */
  pie?: (indice: number) => ReactNode;
  /** Ancho máximo del diálogo. Los planos de medidas piden más espacio. */
  anchoMaximo?: string;
}

export default function VisorAmpliado({
  imagenes,
  indice,
  alCambiar,
  alCerrar,
  singular = 'Imagen',
  pie,
  anchoMaximo = 'max-w-3xl',
}: VisorAmpliadoProps) {
  const dialogoRef = useRef<HTMLDivElement>(null);
  const anteriorRef = useRef<HTMLElement | null>(null);
  const tituloId = useId();

  const total = imagenes.length;
  const abierto = indice !== null;
  const activa = indice !== null ? imagenes[indice] : null;

  // Refs para que el efecto de teclado no dependa de los callbacks: si
  // dependiera, cualquier padre que los recree en cada render reinstalaría el
  // listener en cada pulsación.
  const cambiarRef = useRef(alCambiar);
  const cerrarRef = useRef(alCerrar);
  const indiceRef = useRef(indice);
  cambiarRef.current = alCambiar;
  cerrarRef.current = alCerrar;
  indiceRef.current = indice;

  useEffect(() => {
    if (!abierto) return;

    anteriorRef.current = document.activeElement as HTMLElement | null;
    const nodo = dialogoRef.current;
    nodo?.focus();

    function mover(paso: number) {
      const actual = indiceRef.current;
      if (actual === null) return;
      cambiarRef.current((actual + paso + total) % total);
    }

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        cerrarRef.current();
        return;
      }
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        mover(-1);
        return;
      }
      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        mover(1);
        return;
      }
      if (evento.key === 'Tab') {
        if (!nodo) return;
        const enfocables = Array.from(
          nodo.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
        );
        if (enfocables.length === 0) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    }

    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('keydown', alPresionarTecla);
      // Devolver el foco a quien abrió el diálogo. Va en la limpieza del
      // mismo efecto para que ocurra exactamente al cerrarse.
      anteriorRef.current?.focus();
      anteriorRef.current = null;
    };
  }, [abierto, total]);

  if (!abierto || !activa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto/80 p-4 sm:p-8">
      <div
        ref={dialogoRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        className={`flex max-h-full w-full ${anchoMaximo} flex-col gap-4 rounded-imagen-principal bg-superficie-alta p-4 shadow-lg outline-none sm:p-6`}
      >
        <div className="flex items-center justify-between gap-4">
          <p id={tituloId} className="text-caption text-texto-tenue">
            {singular} {indice + 1} de {total}
          </p>
          <button
            type="button"
            onClick={alCerrar}
            aria-label="Cerrar visor de imágenes"
            className="rounded-boton p-2 text-texto hover:bg-superficie focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center gap-2">
          {total > 1 && (
            <button
              type="button"
              onClick={() => alCambiar((indice - 1 + total) % total)}
              aria-label={`${singular} anterior`}
              className="z-10 shrink-0 rounded-full bg-superficie-alta p-2 text-texto shadow-sm hover:text-marca focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
              </svg>
            </button>
          )}

          <div className="relative aspect-[4/5] max-h-[65vh] w-full overflow-hidden rounded-tarjeta">
            <Imagen
              archivo={activa.archivo}
              alt={activa.alt}
              prioridad
              sizes="100vw"
              llenar
              className="object-contain"
            />
          </div>

          {total > 1 && (
            <button
              type="button"
              onClick={() => alCambiar((indice + 1) % total)}
              aria-label={`${singular} siguiente`}
              className="z-10 shrink-0 rounded-full bg-superficie-alta p-2 text-texto shadow-sm hover:text-marca focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>

        {pie?.(indice)}
      </div>
    </div>
  );
}
