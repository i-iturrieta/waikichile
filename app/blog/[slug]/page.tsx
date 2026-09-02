/**
 * Artículo del blog (ARCHITECTURE.md §4, ruta `/blog/[slug]/`; Bloque 9 de
 * PHASE_1_PLAN.md, tarea 9.3).
 *
 * `generateStaticParams` desde `obtenerSlugsArticulos()` (ya filtrado por
 * `publicado`, tarea 3.6) — genera exactamente las rutas publicables, mismo
 * patrón que `app/productos/[slug]/page.tsx` (Bloque 8) con `borrador`.
 *
 * `articulo.html` (ya convertido de Markdown por `lib/contenido/blog.ts`) se
 * inyecta con `dangerouslySetInnerHTML` dentro de `.prosa`
 * (`app/globals.css`, tarea 9.3: estilos de prosa escritos a mano porque
 * `@tailwindcss/typography` no está instalado — ver el comentario de
 * cabecera de esa clase para el razonamiento completo).
 *
 * JSON-LD de `Article` (`lib/seo/jsonld.ts`), mismo patrón que `Product` en
 * la ficha de producto: objeto plano serializado con `JSON.stringify` dentro
 * de un `<script type="application/ld+json">`.
 *
 * `VideoYoutube` (`components/blog/VideoYoutube.tsx`) no se usa en esta
 * página: el esquema `ArticuloBlog` no tiene un campo para asociar un video
 * a un artículo, y ninguno de los tres artículos reales lo necesita hoy. El
 * componente existe, listo para cuando haga falta, pero cablearlo aquí sin
 * un campo de contenido real que lo dispare sería agregar UI muerta.
 *
 * Metadata (Bloque 11, tarea 11.1): `tipo: 'article'` (Open Graph de tipo
 * artículo, más específico que el `'website'` por defecto). `imagen` es
 * `articulo.imagenPortada` tal cual — campo opcional del esquema, y
 * `construirMetadata` ya sabe omitir `openGraph.images` cuando no llega
 * nada, así que no hace falta un condicional acá.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import { obtenerArticulo, obtenerSlugsArticulos } from '@/lib/contenido/blog';
import { generarArticleJsonLd } from '@/lib/seo/jsonld';
import { construirMetadata } from '@/lib/seo/metadata';

const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

interface ParametrosRuta {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return obtenerSlugsArticulos().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ParametrosRuta): Promise<Metadata> {
  const { slug } = await params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) return {};
  return construirMetadata({
    titulo: articulo.titulo,
    descripcion: articulo.resumen,
    ruta: `/blog/${articulo.slug}/`,
    imagen: articulo.imagenPortada,
    tipo: 'article',
  });
}

export default async function PaginaArticulo({ params }: ParametrosRuta) {
  const { slug } = await params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) notFound();

  const articuloJsonLd = generarArticleJsonLd(articulo);

  return (
    <Contenedor as="article" className="py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <time dateTime={articulo.fecha} className="text-caption text-texto-tenue">
          {formatoFecha.format(new Date(`${articulo.fecha}T00:00:00`))}
        </time>
        <Titulo nivel={1} className="mt-2">
          {articulo.titulo}
        </Titulo>
        <p className="mt-3 text-destacado text-texto-tenue">{articulo.resumen}</p>

        <div className="prosa mt-10" dangerouslySetInnerHTML={{ __html: articulo.html }} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articuloJsonLd) }} />
    </Contenedor>
  );
}
