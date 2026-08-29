/**
 * Listado de productos (ARCHITECTURE.md §4, ruta `/productos/`; Bloque 8 de
 * PHASE_1_PLAN.md, tarea 8.1).
 *
 * Server component, sin lógica propia: `productos`
 * (`lib/contenido/productos.ts`) ya llega filtrado por `borrador` vía
 * `filtrarPublicables` (aplicado dentro del cargador, tarea 3.2) y ordenado
 * por `orden` ("Waiki primero, siempre", ARCHITECTURE.md §3) — esta página
 * solo lo recorre. Mismo patrón ya usado por
 * `components/inicio/LineasProducto.tsx` (Bloque 6), que consume la misma
 * colección de la misma forma.
 *
 * Metadata vía `construirMetadata` (Bloque 11, tarea 11.1): listado, no
 * ficha individual, así que sin `imagen` — Open Graph cae al archivo
 * estático `app/opengraph-image.jpg` (tarea 11.2).
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import TarjetaProducto from '@/components/productos/TarjetaProducto';
import { productos } from '@/lib/contenido/productos';
import { construirMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = construirMetadata({
  titulo: 'Productos',
  descripcion: 'Waiki, Chakay y Nahuen: los equipos de tiro natural a pellet de Waiki Chile, sin electricidad.',
  ruta: '/productos/',
});

export default function PaginaProductos() {
  return (
    <Contenedor as="section" className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <Titulo nivel={1}>Productos</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Tres líneas de tiro natural, sin electricidad. Cada una pensada para un tipo de casa distinto.
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <TarjetaProducto key={producto.slug} producto={producto} basePath="/productos" />
        ))}
      </div>
    </Contenedor>
  );
}
