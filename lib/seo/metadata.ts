/**
 * Metadata por ruta (ARCHITECTURE.md §9 "SEO": "metadata por ruta desde
 * `generateMetadata`... Canónicas absolutas"; Bloque 11 de PHASE_1_PLAN.md,
 * tarea 11.1).
 *
 * Hasta este bloque, cada `page.tsx` exportaba `title`/`description` a mano
 * (Bloques 6-9) — suficiente para no quedar con el título por defecto de
 * Next.js, pero sin canónica absoluta ni Open Graph/Twitter Card, que es
 * justo lo que pide esta tarea. `construirMetadata` es el único lugar que
 * arma esas tres piezas, para que las ~12 rutas del sitio no repitan la
 * misma forma de URL absoluta y de objeto Open Graph cada una a su manera.
 *
 * `SITE_URL` y `urlImagenAbsoluta` se reutilizan de `lib/seo/jsonld.ts`
 * (Bloques 5/8/9) en vez de duplicarse aquí: son exactamente la misma
 * conversión de "URL base con fallback a producción" y de "archivo de
 * `content/images/` → URL absoluta de su variante más ancha" que ya usan
 * `Product.image` y `Article.image` en ese archivo — una canónica y un
 * `og:image` que apuntaran a un dominio distinto del JSON-LD de la misma
 * página serían una inconsistencia de SEO peor que la duplicación que evita.
 */

import type { Metadata } from 'next';
import { SITE_URL, urlImagenAbsoluta } from './jsonld.ts';

/**
 * URL absoluta de `app/opengraph-image.jpg` (tarea 11.2), con las
 * dimensiones reales del archivo que genera el script de esa tarea (1200 ×
 * 630 — verificado con `sharp` sobre el resultado). Imagen de Open Graph
 * por defecto para toda página que no pase su propia `imagen`.
 *
 * No se depende de la convención de archivo de Next.js para propagar esto
 * solo a cada ruta: verificado contra el HTML de `pnpm build` (Bloque 11)
 * que Next.js SÍ la inyecta automáticamente en `/` (donde
 * `opengraph-image.jpg` vive en el mismo segmento que `app/page.tsx`), pero
 * deja de heredarla en cuanto una ruta anidada declara su propio
 * `metadata.openGraph` — que es lo que hace cada llamada a
 * `construirMetadata`, en todas las rutas del sitio. Sin este valor por
 * defecto explícito, cualquier página que no sea Inicio quedaría sin
 * `og:image`, aunque `app/layout.tsx` tenga `metadataBase` configurado —
 * `metadataBase` resuelve URLs relativas a absolutas, no hace que una
 * imagen de un segmento se propague a otro.
 */
const IMAGEN_OG_POR_DEFECTO = {
  url: `${SITE_URL}/opengraph-image.jpg`,
  width: 1200,
  height: 630,
};

/** Forma mínima que necesita este módulo de una `Imagen` de contenido
 * (`lib/contenido/esquemas.ts`) — no se importa ese tipo para no acoplar
 * `lib/seo/` a `lib/contenido/` por algo tan chico como dos campos; ver el
 * mismo criterio en el comentario de cabecera de `jsonld.ts` sobre no
 * importar de `components/`. */
export interface ImagenOpenGraph {
  archivo: string;
  alt: string;
}

export interface OpcionesMetadata {
  /** Título de la página, SIN el sufijo de marca: `app/layout.tsx` ya
   * define `title.template = '%s | Waiki Chile'`, así que pasar un título
   * que ya incluyera "| Waiki Chile" lo dejaría duplicado en la pestaña del
   * navegador. (Antes de esta tarea, `app/contacto/page.tsx` y
   * `app/calculadora/page.tsx` sí lo incluían a mano — corregido al migrar
   * ambas a este helper.) La única excepción es Inicio (`app/page.tsx`),
   * que sigue usando `title: { absolute: … }` fuera de este helper por la
   * razón ya documentada en su propio archivo. */
  titulo: string;
  descripcion: string;
  /** Ruta absoluta del sitio, con slash inicial y final — mismo formato que
   * `trailingSlash: true` genera para todo el sitio (`next.config.ts`), p.
   * ej. `/productos/waiki/`. Se concatena tal cual a `SITE_URL`. */
  ruta: string;
  /** Primera fotografía del producto/artículo, cuando existe. Sin esto,
   * `openGraph.images` cae en `IMAGEN_OG_POR_DEFECTO` (el archivo estático
   * de la tarea 11.2) — ver el comentario de esa constante para el porqué
   * hace falta un valor explícito y no basta con la convención de archivo
   * de Next.js. */
  imagen?: ImagenOpenGraph;
  /**
   * `openGraph.type`. `'article'` para entradas de blog (habilita
   * `publishedTime`/`modifiedTime` implícitos del tipo, y es el valor que
   * los validadores de redes sociales esperan para contenido editorial).
   *
   * Fichas de producto/accesorio se quedan en el valor por defecto
   * `'website'` aunque conceptualmente son "producto": el tipo `OpenGraph`
   * que expone `next` (`node_modules/next/dist/lib/metadata/types/
   * opengraph-types.d.ts`) no incluye la variante `og:type=product` de la
   * especificación de Open Graph — solo `website`, `article`, `book`,
   * `profile` y las de música/video. Declarar `type: 'product'` no
   * compilaría contra el tipo `Metadata` de Next. `website` es el valor más
   * cercano disponible sin salirse del tipado; no es una omisión.
   */
  tipo?: 'website' | 'article';
}

/**
 * Arma el objeto `Metadata` común a toda ruta: `title`, `description`,
 * `alternates.canonical` (URL absoluta), `openGraph` y `twitter`.
 *
 * Quien llama puede seguir sobrescribiendo campos del resultado (spread) —
 * `app/page.tsx` lo hace para reemplazar `title` por `{ absolute: … }` sin
 * tener que reconstruir `alternates`/`openGraph`/`twitter` a mano.
 */
export function construirMetadata({ titulo, descripcion, ruta, imagen, tipo = 'website' }: OpcionesMetadata): Metadata {
  const url = `${SITE_URL}${ruta}`;

  const imagenOpenGraph = imagen
    ? { url: urlImagenAbsoluta(imagen.archivo, 'construirMetadata'), alt: imagen.alt }
    : IMAGEN_OG_POR_DEFECTO;

  // Objeto base común a `OpenGraphWebsite` y `OpenGraphArticle`, construido
  // aparte del `type` discriminante: TypeScript no deja asignar un objeto
  // con `type: 'website' | 'article'` (el parámetro `tipo`, sin angostar a
  // un literal concreto) directamente a la unión discriminada `OpenGraph` —
  // cada rama del ternario de abajo sí fija `type` a un literal único, que
  // es lo que TypeScript necesita para aceptar cualquiera de las dos formas.
  const openGraphBase = {
    title: titulo,
    description: descripcion,
    url,
    siteName: 'Waiki Chile',
    locale: 'es_CL',
    images: [imagenOpenGraph],
  };

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: tipo === 'article' ? { ...openGraphBase, type: 'article' } : { ...openGraphBase, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
    },
  };
}
