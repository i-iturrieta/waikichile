/**
 * Sitemap (ARCHITECTURE.md §9 "SEO": "`sitemap.ts` y `robots.ts`
 * generados"; Bloque 11 de PHASE_1_PLAN.md, tarea 11.3).
 *
 * Convención de archivo de Next.js: exportar `sitemap` desde
 * `app/sitemap.ts` genera `sitemap.xml` en el export estático —
 * `output: 'export'` la soporta sin configuración adicional.
 *
 * Rutas estáticas fijas + rutas dinámicas desde los mismos cargadores que ya
 * usa `generateStaticParams` en cada `page.tsx` (`obtenerSlugsProductos()`,
 * `obtenerSlugsAccesorios()`, `obtenerSlugsArticulos()`), para no duplicar
 * en un tercer lugar la lógica de qué contenido está publicado
 * (`borrador`/`publicado`, ARCHITECTURE.md §1.6): si un producto pasa a
 * borrador, desaparece de aquí solo porque desaparece de esas mismas
 * funciones — nada que mantener sincronizado a mano.
 *
 * `/garantia/` va en la lista de fijas igual que cualquier otra ruta: existe
 * siempre pase lo que pase con `paginaGarantia.borrador` (ver el comentario
 * de cabecera de `lib/contenido/paginas.ts` y de `app/garantia/page.tsx`) —
 * ninguna condición la saca de acá.
 */

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/jsonld';
import { obtenerSlugsProductos } from '@/lib/contenido/productos';
import { obtenerSlugsAccesorios } from '@/lib/contenido/accesorios';
import { obtenerSlugsArticulos } from '@/lib/contenido/blog';

// `output: 'export'` exige declarar esta ruta como estática a propósito
// (mismo motivo que `app/robots.ts`): sin esto, `next build` falla porque
// no puede inferir solo que leer `SITE_URL` (que en el fondo lee
// `process.env.NEXT_PUBLIC_SITE_URL`) es seguro de evaluar en build.
export const dynamic = 'force-static';

/** Las 10 rutas navegables del sitio que no dependen de una colección
 * (ARCHITECTURE.md §4) — listados y páginas de prosa, con slash final
 * (`trailingSlash: true`). */
const RUTAS_ESTATICAS = [
  '/',
  '/productos/',
  '/accesorios/',
  '/instalaciones/',
  '/nosotros/',
  '/calculadora/',
  '/blog/',
  '/preguntas-frecuentes/',
  '/garantia/',
  '/contacto/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const rutasDinamicas = [
    ...obtenerSlugsProductos().map((slug) => `/productos/${slug}/`),
    ...obtenerSlugsAccesorios().map((slug) => `/accesorios/${slug}/`),
    ...obtenerSlugsArticulos().map((slug) => `/blog/${slug}/`),
  ];

  return [...RUTAS_ESTATICAS, ...rutasDinamicas].map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
  }));
}
