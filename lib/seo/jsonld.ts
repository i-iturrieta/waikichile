/**
 * JSON-LD de datos estructurados (ARCHITECTURE.md §9 "SEO": "JSON-LD:
 * `Organization` en el layout, `Product` en fichas, `FAQPage` en preguntas
 * frecuentes, `Article` en blog"; Bloques 5 y 8 de PHASE_1_PLAN.md, tareas
 * 5.4 y 8.4).
 *
 * `Organization` y `Product` viven acá — `FAQPage` y `Article` llegan con
 * el Bloque 9, junto con las páginas que los necesitan (Bloque 11 es SEO en
 * detalle: metadata por ruta, sitemap, `_redirects`; este archivo solo
 * agrega las piezas de JSON-LD que cada bloque de contenido exige
 * explícitamente).
 *
 * Cada `generar*JsonLd` devuelve un objeto plano, no un string ya
 * serializado: quien lo consume (`app/layout.tsx`, `app/productos/[slug]/
 * page.tsx`, `app/accesorios/[slug]/page.tsx`) decide cómo insertarlo
 * (`JSON.stringify` dentro de un `<script type="application/ld+json">`),
 * para no acoplar este módulo a React ni a un formato de salida en
 * particular.
 */

import { empresa } from '../contenido/empresa.ts';
import { obtenerImagen } from '../imagenes/index.ts';
import type { ArticuloBlog, PreguntaFrecuente, Producto } from '../contenido/esquemas.ts';

// `NEXT_PUBLIC_SITE_URL` es la variable que PHASE_1_PLAN.md — Setup /
// Variables de entorno reserva para "canónicas absolutas y sitemap". Todavía
// no se define en ningún despliegue (eso es el Bloque 11), así que se cae a
// la URL de producción conocida en vez de emitir una URL vacía o relativa,
// que no es válida en JSON-LD.
//
// Exportada (Bloque 11, tarea 11.1): `lib/seo/metadata.ts` y
// `app/layout.tsx` (para `metadataBase`) necesitan la misma URL base para
// que canónicas, Open Graph y JSON-LD nunca diverjan por tener cada uno su
// propia copia de este fallback.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://waikichile.cl';

/**
 * `Organization` para el layout raíz. `logo` se omite a propósito: no hay
 * un archivo de logo real en el repositorio todavía (ver el comentario de
 * cabecera de `components/layout/Encabezado.tsx` y ARCHITECTURE.md §13).
 * Declarar una URL de logo que no existe es peor que omitir el campo — no
 * es obligatorio para que el validador de datos estructurados de Google
 * acepte `Organization`.
 */
export function generarOrganizationJsonLd() {
  const sameAs = [
    `https://www.tiktok.com/${empresa.redes.tiktok}`,
    `https://www.instagram.com/${empresa.redes.instagram.replace(/^@/, '')}/`,
    ...(empresa.redes.facebook
      ? [`https://www.facebook.com/${empresa.redes.facebook.replace(/^\/+|\/+$/g, '')}/`]
      : []),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Waiki Chile',
    url: SITE_URL,
    telephone: empresa.telefono,
    email: empresa.correo,
    sameAs,
  };
}

// ---------------------------------------------------------------------------
// Product (ARCHITECTURE.md §9 "SEO": "`Product` en fichas"; Bloque 8 de
// PHASE_1_PLAN.md, tarea 8.4)
// ---------------------------------------------------------------------------

/** Nombre de archivo sin extensión — mismo cálculo que `nombreBase` en
 * `components/ui/Imagen.tsx`, duplicado a propósito: son ~2 líneas y este
 * módulo no debe importar de `components/` (ARCHITECTURE.md §7: "`lib/` no
 * importa de `components/`. Nunca al revés de la dirección natural"). */
function nombreBaseImagen(archivo: string): string {
  const punto = archivo.lastIndexOf('.');
  return punto === -1 ? archivo : archivo.slice(0, punto);
}

/** URL absoluta de la variante WebP más ancha disponible de `archivo` (mismo
 * criterio de "fallback" que `<Imagen>`: soporte de navegador más amplio que
 * AVIF). Compartida por `Product` (imagen de producto) y `Article` (imagen
 * de portada del blog, cuando existe) — ambas necesitan la misma conversión
 * de "nombre de archivo en `content/images/`" a "URL absoluta publicada".
 *
 * Exportada (Bloque 11, tarea 11.1): `lib/seo/metadata.ts` construye
 * `openGraph.images` de fichas de producto/accesorio y portadas de blog con
 * la misma URL absoluta que ya usa este archivo para `Product.image` y
 * `Article.image` — es la misma conversión, no una nueva. */
export function urlImagenAbsoluta(archivo: string, quienLlama: string): string {
  const { variantes } = obtenerImagen(archivo);
  const anchoMax = variantes.webp.at(-1) ?? variantes.avif.at(-1);
  if (anchoMax === undefined) {
    throw new Error(`${quienLlama}: "${archivo}" no tiene ninguna variante generada.`);
  }
  const extension = variantes.webp.length > 0 ? 'webp' : 'avif';
  return `${SITE_URL}/img/${nombreBaseImagen(archivo)}-${anchoMax}.${extension}`;
}

/** `Producto.imagenes` exige mínimo 1 elemento (`productoSchema`, tarea
 * 3.3), así que siempre hay una imagen de la que partir. */
function urlImagenProducto(producto: Producto): string {
  return urlImagenAbsoluta(producto.imagenes[0].archivo, 'generarProductJsonLd');
}

/**
 * `Product` para una ficha (`app/productos/[slug]/page.tsx` y
 * `app/accesorios/[slug]/page.tsx` — `Accesorio` es estructuralmente un
 * `Producto` con dos campos más, así que sirve para ambas rutas sin
 * variante propia; `basePath` es lo único que distingue una ficha de
 * producto de una de accesorio).
 *
 * **Sin `offers` mientras `precio.tipo === 'consultar'`** (PHASE_1_PLAN.md,
 * tarea 8.4: "declarar un precio inexistente es un error de datos
 * estructurados").
 *
 * La rama `{ tipo: 'fijo' }` de abajo **ya se ejercita con contenido real**,
 * desde que la clienta empezó a confirmar precios: el controlador de presión
 * (07-09-2026) y Chakay (08-09-2026). Sigue implementada con
 * `PriceSpecification` de schema.org, que es lo que permite expresar
 * `incluyeIva` — `Offer.price` por sí solo no distingue si el monto lleva
 * IVA. Los otros tres equipos siguen en "consultar" y no emiten `offers`.
 */
/**
 * Calificación agregada de un producto, para `aggregateRating` (10-09-2026,
 * junto con `/resenas/`).
 *
 * Llega **como parámetro** en vez de que este módulo importe
 * `lib/contenido/resenas.ts`, y la razón es concreta: ese módulo resuelve su
 * colección con `await` de nivel superior, igual que `productos.ts` e
 * `instalaciones.ts`. Importarlo acá le metería ese await al grafo de
 * `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` y `lib/seo/metadata.ts`
 * —que lo importa casi toda página del sitio— para alimentar un campo de una
 * sola ruta. `empresa.ts` sí se importa directo justamente porque no lo usa.
 *
 * Quien llama (`app/productos/[slug]/page.tsx`) ya tiene el contenido a mano
 * y filtra por su cuenta.
 */
export interface CalificacionAgregada {
  /** Promedio sin redondear. */
  promedio: number;
  total: number;
}

/**
 * `aggregateRating` solo cuando hay reseñas que nombran **este** producto.
 *
 * El filtro por `producto` del propio contenido no es un detalle: de las 38
 * reseñas publicadas, 21 dicen explícitamente cuál equipo tienen y 17 no.
 * Atribuirle a un producto el promedio de las 38 sería declararle a Google
 * un dato que el cliente nunca dio — la misma regla que ya gobierna
 * `availability` unas líneas más abajo (se omite, no se inventa).
 *
 * `bestRating`/`worstRating` van explícitos aunque 5 y 1 sean los valores
 * por defecto de schema.org: los validadores de Google los reportan como
 * advertencia cuando faltan.
 */
function aggregateRatingJsonLd(calificacion: CalificacionAgregada | undefined) {
  if (!calificacion || calificacion.total === 0) return undefined;
  return {
    '@type': 'AggregateRating',
    ratingValue: Number(calificacion.promedio.toFixed(2)),
    reviewCount: calificacion.total,
    bestRating: 5,
    worstRating: 1,
  };
}

export function generarProductJsonLd(producto: Producto, basePath: '/productos' | '/accesorios', calificacion?: CalificacionAgregada) {
  const url = `${SITE_URL}${basePath}/${producto.slug}/`;

  const valoracion = aggregateRatingJsonLd(calificacion);

  const base = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    image: [urlImagenProducto(producto)],
    url,
    brand: { '@type': 'Brand', name: 'Waiki Chile' },
    ...(valoracion ? { aggregateRating: valoracion } : {}),
  };

  if (producto.precio.tipo !== 'fijo') {
    return base;
  }

  const { monto, incluyeIva } = producto.precio;

  /*
   * `availability` sale del propio contenido, no es una constante.
   *
   * Hasta el 08-09-2026 esta rama emitía siempre `InStock`, y nunca llegó a
   * Google porque ningún producto tenía precio y por lo tanto no se emitía
   * `offers`. Al publicarse Chakay, sí llega — y `InStock` sería falso: la
   * propia ficha dice que se fabrica por temporada, con 1 mes y medio a 2
   * meses desde la reserva y un 30% de anticipo. Declarar "en stock" un
   * equipo que se construye por encargo es exactamente el tipo de dato que
   * Google usa para prometerle al comprador algo que la empresa no puede
   * cumplir.
   *
   * `BackOrder` es el valor de schema.org que significa "se puede comprar
   * ahora, se entrega más adelante", y está entre los que Google admite. Se
   * usa para todo lo que declare un `plazoEntrega`.
   *
   * Y cuando no hay `plazoEntrega`, **no se emite `availability` en
   * absoluto**. Es la misma regla que gobierna el resto del contenido
   * (ARCHITECTURE.md §1.6: se omite, no se inventa) aplicada a los datos
   * estructurados: no saber cuánto demora un equipo no es lo mismo que
   * saber que está en bodega. Mini Nahuen es el caso exacto — su
   * `plazoEntrega` es `null` porque la clienta no lo ha dado, y afirmarle
   * `InStock` a Google sería fabricar el dato que falta. `availability` es
   * opcional en `Offer`: omitirlo es válido y es lo honesto.
   */
  const availability = producto.plazoEntrega ? 'https://schema.org/BackOrder' : undefined;

  return {
    ...base,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'CLP',
      price: monto,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: monto,
        priceCurrency: 'CLP',
        valueAddedTaxIncluded: incluyeIva,
      },
      ...(availability ? { availability } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Article (ARCHITECTURE.md §9 "SEO": "`Article` en blog"; Bloque 9 de
// PHASE_1_PLAN.md, tarea 9.3)
// ---------------------------------------------------------------------------

/**
 * `Article` para `app/blog/[slug]/page.tsx`. `datePublished` es `fecha`;
 * `dateModified` es `actualizado` si el frontmatter lo trae, o `fecha` de
 * vuelta si no — un artículo sin ediciones registradas se considera
 * modificado la misma fecha en que se publicó, no una fecha en blanco.
 *
 * `image` se omite cuando el artículo no trae `imagenPortada` (campo
 * opcional del esquema — hoy ninguno de los tres artículos reales la trae,
 * verificado contra `content/blog/*.md`), mismo criterio que `Product` con
 * `offers`: declarar una imagen que no existe es peor que omitir el campo.
 */
export function generarArticleJsonLd(articulo: ArticuloBlog) {
  const url = `${SITE_URL}/blog/${articulo.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articulo.titulo,
    description: articulo.resumen,
    url,
    datePublished: articulo.fecha,
    dateModified: articulo.actualizado ?? articulo.fecha,
    author: { '@type': 'Organization', name: 'Waiki Chile' },
    publisher: { '@type': 'Organization', name: 'Waiki Chile' },
    ...(articulo.imagenPortada
      ? { image: [urlImagenAbsoluta(articulo.imagenPortada.archivo, 'generarArticleJsonLd')] }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// FAQPage (ARCHITECTURE.md §9 "SEO": "`FAQPage` en preguntas frecuentes";
// Bloque 9 de PHASE_1_PLAN.md, tarea 9.4)
// ---------------------------------------------------------------------------

/**
 * `FAQPage` para `app/preguntas-frecuentes/page.tsx`. Recibe la lista ya
 * filtrada por `borrador` (`preguntasFrecuentes` de `lib/contenido/faq.ts`,
 * que aplica `filtrarPublicables` al cargar) — este generador no vuelve a
 * filtrar nada, así que quien lo llama es responsable de no pasarle
 * preguntas en borrador. Es deliberado: listar una pregunta con `borrador:
 * true` en el JSON-LD sería un error de datos estructurados aunque no se
 * muestre en pantalla (PHASE_1_PLAN.md, tarea 9.4), y la forma más simple de
 * garantizar que HTML visible y JSON-LD coincidan siempre es que ambos
 * consuman exactamente el mismo arreglo ya filtrado, no que cada uno filtre
 * por su cuenta.
 */
export function generarFaqPageJsonLd(preguntas: PreguntaFrecuente[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((pregunta) => ({
      '@type': 'Question',
      name: pregunta.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: pregunta.respuesta,
      },
    })),
  };
}
