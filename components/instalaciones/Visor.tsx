'use client';

/**
 * `Visor` — galería de instalaciones con vista ampliada (ARCHITECTURE.md §2,
 * tabla de islas de cliente: "Visor de galería — Ampliar imagen, navegar con
 * teclado"; Bloque 9 de PHASE_1_PLAN.md, tarea 9.1).
 *
 * Recibe `instalaciones` ya filtrada por `borrador` (viene de
 * `lib/contenido/instalaciones.ts`, que aplica `filtrarPublicables`) y con
 * al menos un elemento — `app/instalaciones/page.tsx` decide el estado
 * vacío y solo monta este componente cuando hay algo que mostrar, así este
 * componente no necesita su propia rama para "0 instalaciones".
 *
 * Renderiza la retícula (botones enfocables por teclado) y el diálogo
 * ampliado en el mismo árbol, para que ambos compartan un único estado
 * (`indiceAbierto`) sin tener que levantarlo a la página servidor.
 *
 * Accesibilidad (ARCHITECTURE.md §9): al abrir, el foco se mueve dentro del
 * diálogo (`role="dialog"`, `aria-modal="true"`) y Tab/Shift+Tab quedan
 * atrapados entre el primer y el último elemento enfocable del diálogo — un
 * `Tab` en el último elemento vuelve al primero, no sale al resto de la
 * página. Escape cierra y devuelve el foco al botón que abrió esa imagen.
 * Flecha izquierda/derecha navegan entre instalaciones sin cerrar el
 * diálogo.
 */

import { useEffect, useId, useRef, useState } from 'react';
import Imagen from '@/components/ui/Imagen';
import type { Instalacion } from '@/lib/contenido/esquemas';

export interface VisorProps {
  instalaciones: Instalacion[];
}

export default function Visor({ instalaciones }: VisorProps) {
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLElement | null>(null);
  const tituloId = useId();

  const total = instalaciones.length;
  const abierto = indiceAbierto !== null;
  const activa = indiceAbierto !== null ? instalaciones[indiceAbierto] : null;

  function abrir(indice: number, elementoDisparador: HTMLElement) {
    disparadorRef.current = elementoDisparador;
    setIndiceAbierto(indice);
  }

  function cerrar() {
    setIndiceAbierto(null);
  }

  // Foco atrapado + navegación de teclado. Depende de `abierto` (booleano),
  // no de `indiceAbierto` (número): así el listener se registra una sola vez
  // por apertura, en vez de reinstalarse en cada flecha izquierda/derecha —
  // que reenfocaría el diálogo en cada navegación y le quitaría el foco al
  // botón "siguiente"/"anterior" que el usuario acaba de usar.
  useEffect(() => {
    if (!abierto) return;

    const nodo = dialogoRef.current;
    nodo?.focus();

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        setIndiceAbierto(null);
        return;
      }
      if (evento.key === 'ArrowLeft') {
        evento.preventDefault();
        setIndiceAbierto((indice) => (indice === null ? null : (indice - 1 + total) % total));
        return;
      }
      if (evento.key === 'ArrowRight') {
        evento.preventDefault();
        setIndiceAbierto((indice) => (indice === null ? null : (indice + 1) % total));
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
    return () => document.removeEventListener('keydown', alPresionarTecla);
  }, [abierto, total]);

  // Devolver el foco al botón que abrió el diálogo, al cerrarlo.
  useEffect(() => {
    if (!abierto && disparadorRef.current) {
      disparadorRef.current.focus();
      disparadorRef.current = null;
    }
  }, [abierto]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instalaciones.map((instalacion, indice) => (
          <button
            key={instalacion.id}
            type="button"
            onClick={(evento) => abrir(indice, evento.currentTarget)}
            className="group overflow-hidden rounded-tarjeta border border-borde bg-superficie-alta text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            aria-label={`Ampliar fotografía de instalación${instalacion.ciudad ? `, ${instalacion.ciudad}` : ''}`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <Imagen
                archivo={instalacion.imagen.archivo}
                alt={instalacion.imagen.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {/* Ciudad y modelo de combustión solo cuando existen
                (ARCHITECTURE.md §3: los tres campos opcionales de
                `Instalacion` — hoy las 25 entradas los traen en `null`, así
                que este bloque no se monta para ninguna todavía). Nunca se
                muestra un "null" ni un guion de relleno. */}
            {(instalacion.ciudad || instalacion.modeloCombustion) && (
              <div className="p-4">
                {instalacion.ciudad && (
                  <p className="text-cuerpo font-semibold text-texto">{instalacion.ciudad}</p>
                )}
                {instalacion.modeloCombustion && (
                  <p className="text-caption text-texto-tenue">{instalacion.modeloCombustion}</p>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {abierto && activa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-texto/80 p-4 sm:p-8">
          <div
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            tabIndex={-1}
            className="flex max-h-full w-full max-w-3xl flex-col gap-4 rounded-imagen-principal bg-superficie-alta p-4 shadow-lg outline-none sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p id={tituloId} className="text-caption text-texto-tenue">
                Instalación {indiceAbierto! + 1} de {total}
              </p>
              <button
                type="button"
                onClick={cerrar}
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
                  onClick={() => setIndiceAbierto((indice) => (indice === null ? null : (indice - 1 + total) % total))}
                  aria-label="Instalación anterior"
                  className="z-10 shrink-0 rounded-full bg-superficie-alta p-2 text-texto shadow-sm hover:text-marca focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
              )}

              <div className="aspect-[4/5] max-h-[65vh] w-full overflow-hidden rounded-tarjeta">
                <Imagen
                  archivo={activa.imagen.archivo}
                  alt={activa.imagen.alt}
                  prioridad
                  sizes="100vw"
                  className="h-full w-full object-contain"
                />
              </div>

              {total > 1 && (
                <button
                  type="button"
                  onClick={() => setIndiceAbierto((indice) => (indice === null ? null : (indice + 1) % total))}
                  aria-label="Instalación siguiente"
                  className="z-10 shrink-0 rounded-full bg-superficie-alta p-2 text-texto shadow-sm hover:text-marca focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              )}
            </div>

            {(activa.ciudad || activa.modeloCombustion) && (
              <div className="text-cuerpo text-texto">
                {activa.ciudad && <p className="font-semibold">{activa.ciudad}</p>}
                {activa.modeloCombustion && <p className="text-texto-tenue">{activa.modeloCombustion}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
