/**
 * Listado de accesorios y repuestos (ARCHITECTURE.md §4, ruta
 * `/accesorios/`; Bloque 8 de PHASE_1_PLAN.md, tarea 8.3).
 *
 * Mismo patrón que `app/productos/page.tsx` (tarea 8.1): `accesorios`
 * (`lib/contenido/accesorios.ts`) ya llega filtrado por `borrador` y
 * ordenado por `orden`. Reutiliza `TarjetaProducto` sin variante propia —
 * ver el comentario de cabecera de ese componente para el porqué.
 *
 * Metadata vía `construirMetadata` (Bloque 11, tarea 11.1) — listado, sin
 * `imagen`, mismo criterio que `app/productos/page.tsx`.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import TarjetaProducto from '@/components/productos/TarjetaProducto';
import { accesorios } from '@/lib/contenido/accesorios';
import { construirMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = construirMetadata({
  titulo: 'Accesorios y repuestos',
  descripcion:
    'Controlador de presión y rejilla del quemador: los accesorios y repuestos para los equipos Waiki Chile.',
  ruta: '/accesorios/',
});

export default function PaginaAccesorios() {
  return (
    <Contenedor as="section" className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <Titulo nivel={1}>Accesorios y repuestos</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Lo que necesita un equipo Waiki para funcionar bien con el tiempo: el controlador de presión y la
          única pieza de recambio, la rejilla del quemador.
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {accesorios.map((accesorio) => (
          <TarjetaProducto key={accesorio.slug} producto={accesorio} basePath="/accesorios" />
        ))}
      </div>
    </Contenedor>
  );
}
