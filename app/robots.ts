/**
 * Robots (ARCHITECTURE.md §9 "Previews no indexables": "`robots.ts` emite
 * `noindex` salvo que `SITIO_PRODUCCION === 'true'`. Sin esto, los
 * despliegues de preview en `*.workers.dev` quedan indexables y Google
 * puede indexar el sitio nuevo antes del lanzamiento — contenido duplicado
 * compitiendo contra el sitio que todavía está en producción. La variable
 * se define solo en el despliegue de `main`"; Bloque 11 de
 * PHASE_1_PLAN.md, tarea 11.3).
 *
 * `SITIO_PRODUCCION` ya gobierna `filtrarPublicables` desde el Bloque 3
 * (`lib/contenido/cargar.ts`) — este archivo es el segundo y último lugar
 * que la lee (`.env.example`), esta vez para bloquear el rastreo entero en
 * vez de un elemento de contenido.
 */

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/jsonld';

// `output: 'export'` (ARCHITECTURE.md §1.1) exige declarar esta ruta como
// estática a propósito: Next.js no puede inferir solo que leer
// `process.env.SITIO_PRODUCCION` es seguro de evaluar en build y no en cada
// request — sin esto, `next build` falla con "dynamic ... not configured
//... with output: export". Es exactamente el comportamiento que se quiere
// igual: la variable se fija en build (Workers Builds), no cambia por
// request, así que "estático" es la descripción correcta.
export const dynamic = 'force-static';

const EN_PRODUCCION = process.env.SITIO_PRODUCCION === 'true';

export default function robots(): MetadataRoute.Robots {
  if (!EN_PRODUCCION) {
    // Preview (cualquier despliegue que no sea `main`, incluidos los
    // `*.workers.dev` de desarrollo de los Bloques 1-11): bloqueo total,
    // sin excepciones — ni siquiera el sitemap se referencia, para no darle
    // a un rastreador una lista de URLs que tampoco debería visitar.
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
