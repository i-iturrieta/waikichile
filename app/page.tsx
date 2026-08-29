/**
 * Inicio (ARCHITECTURE.md §4: "Inicio → `app/page.tsx` · estático"; Bloque
 * 6 de PHASE_1_PLAN.md, tarea 6.3). Reemplaza el boilerplate de
 * `create-next-app` que quedó desde el Bloque 1.
 *
 * Server component, completamente estático: ensambla las cinco secciones
 * del Bloque 6 en el orden de la tarea 6.2 (líneas de producto → acceso a
 * la calculadora → últimas entradas → reseñas) después de la portada de
 * 6.1. Ninguna trae estado ni lógica propia — cada una decide sola si tiene
 * algo que mostrar (`LineasProducto`, `UltimasEntradas` y `Resenas`
 * devuelven `null` si su colección está vacía), así que esta página no
 * necesita condicionales.
 *
 * `export const metadata` en vez de `generateMetadata`: Inicio no depende
 * de ningún parámetro de ruta ni de datos que cambien en build-time más
 * allá de lo que ya es estático, así que no hace falta la variante función
 * (PHASE_1_PLAN.md, tarea 6.3, segunda opción explícita). `title.absolute`
 * evita que el `template` de `app/layout.tsx` ("%s | Waiki Chile") le
 * agregue el sufijo de marca dos veces sobre un título que Inicio ya trae
 * completo.
 *
 * Canónica absoluta, Open Graph y Twitter Card (Bloque 11, tarea 11.1) se
 * arman con `construirMetadata` como cualquier otra ruta — solo que acá se
 * sobrescribe `title` después, con el spread, para conservar el
 * `title.absolute` de arriba en vez del `template` que usaría el resto del
 * sitio. `openGraph.title` sí queda con el string completo (vía `titulo`
 * más abajo): a diferencia de `<title>`, no pasa por ningún `template`, así
 * que no hay nada que evitar ahí.
 */

import type { Metadata } from 'next';
import Portada from '@/components/inicio/Portada';
import LineasProducto from '@/components/inicio/LineasProducto';
import AccesoCalculadora from '@/components/inicio/AccesoCalculadora';
import UltimasEntradas from '@/components/inicio/UltimasEntradas';
import Resenas from '@/components/inicio/Resenas';
import { construirMetadata } from '@/lib/seo/metadata';

const TITULO_INICIO = 'Waiki Chile — Calefacción a pellet sin electricidad';

export const metadata: Metadata = {
  ...construirMetadata({
    titulo: TITULO_INICIO,
    descripcion:
      'Waiki, Chakay y Nahuen: equipos de tiro natural a pellet, sin electricidad ni electrónica. Compara tu ahorro frente a la leña y conoce los tres modelos.',
    ruta: '/',
  }),
  title: { absolute: TITULO_INICIO },
};

export default function Inicio() {
  return (
    <>
      <Portada />
      <LineasProducto />
      <AccesoCalculadora />
      <UltimasEntradas />
      <Resenas />
    </>
  );
}
