/**
 * Ficha de accesorio (ARCHITECTURE.md §4, ruta `/accesorios/[slug]/`;
 * Bloque 8 de PHASE_1_PLAN.md, tarea 8.3).
 *
 * Mismo patrón que `app/productos/[slug]/page.tsx` (tarea 8.2), con dos
 * diferencias: la fuente es `lib/contenido/accesorios.ts`, y se le pasan a
 * `FichaProducto` los dos campos propios de `Accesorio`
 * (`esRepuesto`, `vidaUtil`) que esa ficha no tiene forma de leer sola —
 * ver el comentario de cabecera de `components/productos/FichaProducto.tsx`
 * para el porqué de esas dos props opcionales en vez de una
 * `FichaAccesorio` separada.
 *
 * También emite JSON-LD de `Product`: un accesorio sigue siendo un
 * producto físico a la venta (aunque hoy en "consultar"), y
 * `generarProductJsonLd` ya acepta cualquier objeto con la forma de
 * `Producto` — `Accesorio` la cumple. La tarea 8.4 solo pide usarlo en
 * `app/productos/[slug]/page.tsx` explícitamente; se extiende aquí también
 * por ser el mismo generador aplicado al mismo tipo de contenido, no una
 * pieza nueva de SEO del Bloque 11.
 *
 * Metadata (Bloque 11, tarea 11.1): mismo patrón que la ficha de producto,
 * con `basePath` `/accesorios` en vez de `/productos`.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FichaProducto from '@/components/productos/FichaProducto';
import { obtenerAccesorio, todosLosAccesorios } from '@/lib/contenido/accesorios';
import { generarProductJsonLd } from '@/lib/seo/jsonld';
import { construirMetadata } from '@/lib/seo/metadata';

interface ParametrosRuta {
  params: Promise<{ slug: string }>;
}

// Bloque 11: `generateStaticParams` usa `todosLosAccesorios` (sin filtrar
// por `borrador`), no `obtenerSlugsAccesorios()` — a propósito. Con los dos
// accesorios en `borrador: true` a la vez (ninguna foto real todavía, ver
// content/accesorios/*.ts), la lista filtrada queda vacía, y Next.js
// rechaza el build de `output: 'export'` con "Page .../[slug] is missing
// generateStaticParams()" cuando una ruta dinámica no genera ni una sola
// página — es una restricción real del export estático, no específica de
// Turbopack (se probó también con webpack: mismo error). Generar la página
// para TODOS los slugs de contenido, publicados o no, y dejar que
// `obtenerAccesorio` (abajo, que sí filtra por `borrador`) devuelva
// `undefined` y dispare `notFound()` para los que no están publicados,
// resuelve esto sin tocar el mecanismo de `borrador`: la URL de un
// accesorio en borrador sigue sirviendo 404, solo que ahora es un 404
// estático pregenerado en vez de una ruta que no existe.
export function generateStaticParams() {
  return todosLosAccesorios.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ParametrosRuta): Promise<Metadata> {
  const { slug } = await params;
  const accesorio = obtenerAccesorio(slug);
  if (!accesorio) return {};
  return construirMetadata({
    titulo: accesorio.nombre,
    descripcion: accesorio.tagline,
    ruta: `/accesorios/${accesorio.slug}/`,
    imagen: accesorio.imagenes[0],
  });
}

export default async function PaginaAccesorio({ params }: ParametrosRuta) {
  const { slug } = await params;
  const accesorio = obtenerAccesorio(slug);
  if (!accesorio) notFound();

  const accesorioJsonLd = generarProductJsonLd(accesorio, '/accesorios');

  return (
    <>
      <FichaProducto producto={accesorio} esRepuesto={accesorio.esRepuesto} vidaUtil={accesorio.vidaUtil} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(accesorioJsonLd) }} />
    </>
  );
}
