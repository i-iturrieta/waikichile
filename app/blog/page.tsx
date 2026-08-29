/**
 * Listado del blog (ARCHITECTURE.md §4, ruta `/blog/`; Bloque 9 de
 * PHASE_1_PLAN.md, tarea 9.2).
 *
 * Server component, sin lógica propia: `obtenerArticulos()`
 * (`lib/contenido/blog.ts`) ya llega filtrada por `publicado` y ordenada por
 * fecha descendente. Mismo patrón que `components/inicio/UltimasEntradas.tsx`
 * (Bloque 6), que consume la misma función — esta página no corta la lista
 * con `.slice()`, la muestra completa.
 *
 * Fecha legible en español + `<time datetime>` en ISO (ARCHITECTURE.md §9).
 * `imagenPortada` es opcional en el esquema y hoy ninguno de los tres
 * artículos reales la trae (verificado contra `content/blog/*.md`) — la
 * tarjeta omite el bloque de imagen entero cuando no existe, no muestra un
 * hueco ni una imagen genérica de relleno.
 *
 * Metadata vía `construirMetadata` (Bloque 11, tarea 11.1) — listado, sin
 * `imagen`, mismo criterio que `app/productos/page.tsx`.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Tarjeta from '@/components/ui/Tarjeta';
import Imagen from '@/components/ui/Imagen';
import { obtenerArticulos } from '@/lib/contenido/blog';
import { construirMetadata } from '@/lib/seo/metadata';

const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

export const metadata: Metadata = construirMetadata({
  titulo: 'Blog',
  descripcion:
    'Notas sobre calefacción a pellet: por qué conviene, cómo elegir el sistema adecuado y qué mirar antes de comprar.',
  ruta: '/blog/',
});

export default function PaginaBlog() {
  const articulos = obtenerArticulos();

  return (
    <Contenedor as="section" className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <Titulo nivel={1}>Blog</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Notas sobre calefacción a pellet: por qué conviene, cómo elegir el sistema adecuado y qué mirar
          antes de comprar.
        </p>
      </div>

      {articulos.length === 0 ? (
        <p className="mt-10 max-w-2xl text-cuerpo text-texto-tenue">Todavía no hay artículos publicados.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articulos.map((articulo) => (
            <Tarjeta key={articulo.slug} as="article" className="flex flex-col overflow-hidden">
              {articulo.imagenPortada && (
                <Link href={`/blog/${articulo.slug}/`} className="block aspect-[4/5]">
                  <Imagen
                    archivo={articulo.imagenPortada.archivo}
                    alt={articulo.imagenPortada.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </Link>
              )}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <time dateTime={articulo.fecha} className="text-caption text-texto-tenue">
                  {formatoFecha.format(new Date(`${articulo.fecha}T00:00:00`))}
                </time>
                <Titulo nivel={3}>{articulo.titulo}</Titulo>
                <p className="flex-1 text-cuerpo text-texto-tenue">{articulo.resumen}</p>
                <Link
                  href={`/blog/${articulo.slug}/`}
                  className="text-cuerpo font-semibold text-marca underline-offset-4 hover:underline"
                >
                  Leer artículo →
                </Link>
              </div>
            </Tarjeta>
          ))}
        </div>
      )}
    </Contenedor>
  );
}
