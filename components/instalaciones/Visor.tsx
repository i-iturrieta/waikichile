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
 * Ronda 09-09-2026: **el diálogo ampliado salió de este archivo** a
 * `components/ui/VisorAmpliado.tsx`, cuando las galerías de producto pasaron
 * a ser ampliables también. Acá queda lo propio de Instalaciones —la
 * retícula de tres columnas y los pies con ciudad y modelo de combustión— y
 * el índice abierto; toda la mecánica de accesibilidad (foco atrapado,
 * Escape, flechas, devolución del foco) vive ahora en un solo lugar. No hay
 * cambio de comportamiento: es el mismo diálogo, movido.
 *
 * El único detalle que cambió al mover: antes este componente guardaba en un
 * ref el botón que disparaba la apertura, para devolverle el foco al cerrar.
 * Ahora eso lo resuelve `VisorAmpliado` capturando `document.activeElement`
 * al abrirse, así que ese ref desapareció de acá.
 */

import { useState } from 'react';
import Imagen from '@/components/ui/Imagen';
import VisorAmpliado from '@/components/ui/VisorAmpliado';
import type { Instalacion } from '@/lib/contenido/esquemas';

export interface VisorProps {
  instalaciones: Instalacion[];
}

export default function Visor({ instalaciones }: VisorProps) {
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instalaciones.map((instalacion, indice) => (
          <button
            key={instalacion.id}
            type="button"
            onClick={() => setIndiceAbierto(indice)}
            className="group overflow-hidden rounded-tarjeta border border-borde bg-superficie-alta text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            aria-label={`Ampliar fotografía de instalación${instalacion.ciudad ? `, ${instalacion.ciudad}` : ''}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Imagen
                archivo={instalacion.imagen.archivo}
                alt={instalacion.imagen.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                llenar
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {/* Ciudad y modelo de combustión solo cuando existen
                (ARCHITECTURE.md §3: los tres campos opcionales de
                `Instalacion` — hoy todas las entradas los traen en `null`,
                así que este bloque no se monta para ninguna todavía). Nunca
                se muestra un "null" ni un guion de relleno. */}
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

      <VisorAmpliado
        imagenes={instalaciones.map((instalacion) => instalacion.imagen)}
        indice={indiceAbierto}
        alCambiar={setIndiceAbierto}
        alCerrar={() => setIndiceAbierto(null)}
        singular="Instalación"
        pie={(indice) => {
          const activa = instalaciones[indice];
          if (!activa.ciudad && !activa.modeloCombustion) return null;
          return (
            <div className="text-cuerpo text-texto">
              {activa.ciudad && <p className="font-semibold">{activa.ciudad}</p>}
              {activa.modeloCombustion && <p className="text-texto-tenue">{activa.modeloCombustion}</p>}
            </div>
          );
        }}
      />
    </>
  );
}
