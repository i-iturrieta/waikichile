/**
 * Noticias (ARCHITECTURE.md §4, ruta `/blog/`; Bloque 9 de PHASE_1_PLAN.md,
 * tarea 9.2).
 *
 * Server component, sin lógica propia: `obtenerArticulos()`
 * (`lib/contenido/blog.ts`) ya llega filtrada por `publicado` y ordenada por
 * fecha descendente. Esta página no corta la lista con `.slice()`, la muestra
 * completa — solo la reparte en dos secciones.
 *
 * Rediseño 07-09-2026 — dos secciones en una página.
 *
 * La página pasa a llamarse **Noticias** y deja de contradecir al menú, que
 * ya la llamaba así desde el rediseño del 05-09. La URL sigue siendo `/blog/`
 * a propósito: está en las 30 redirecciones 301 de `public/_redirects` y
 * cambiarla obligaría a rehacer ese mapa por un beneficio cosmético.
 *
 * Adentro conviven dos cosas que no son la misma:
 *
 *  - **En los medios** — lo que otros publicaron sobre Waiki. Va arriba, en
 *    una franja con fondo propio. Es lo más reciente y lo que más convence a
 *    quien todavía no confía en la marca: que a uno lo entreviste una radio
 *    es prueba de terceros, y eso pesa más que cualquier cosa que uno mismo
 *    escriba. Enterrarlo al final del listado sería desperdiciarlo.
 *  - **Artículos** — lo que escribimos nosotros para explicar el pellet.
 *
 * La franja con fondo distinto (`bg-superficie-baja` a sangre completa) es lo
 * que hace legible la separación sin depender de que alguien lea los dos
 * encabezados. Va a sangre y no dentro del contenedor porque una banda que
 * cruza la pantalla se lee como "otra cosa"; una caja con borde se leería
 * como "un artículo destacado", que es justo lo que no es.
 *
 * **Qué separa una cosa de la otra:** el campo `fuente` (el medio que lo
 * publicó), no la etiqueta `prensa` ni "¿tiene `medios`?". Ver el comentario
 * del campo en `lib/contenido/esquemas.ts` — en resumen: una etiqueta se
 * escribe mal sin que nada avise, y un artículo propio puede llevar un video
 * sin dejar de ser nuestro.
 *
 * Las dos secciones se omiten enteras si quedan vacías, encabezado incluido:
 * un título "En los medios" sobre la nada es peor que no tener la sección.
 *
 * Fecha legible en español + `<time datetime>` en ISO (ARCHITECTURE.md §9),
 * salvo donde `ocultarFecha` diga lo contrario. `imagenPortada` es opcional y
 * hoy ningún artículo la trae: la tarjeta omite el bloque de imagen entero en
 * vez de mostrar un hueco.
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
import TarjetaPrensa from '@/components/blog/TarjetaPrensa';
import { obtenerArticulos } from '@/lib/contenido/blog';
import { construirMetadata } from '@/lib/seo/metadata';

const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

const DESCRIPCION =
  'Waiki en la prensa, y notas sobre calefacción a pellet: por qué conviene, cómo elegir el sistema adecuado y qué mirar antes de comprar.';

export const metadata: Metadata = construirMetadata({
  titulo: 'Noticias',
  descripcion: DESCRIPCION,
  ruta: '/blog/',
});

export default function PaginaBlog() {
  const articulos = obtenerArticulos();
  const enMedios = articulos.filter((articulo) => articulo.fuente);
  const propios = articulos.filter((articulo) => !articulo.fuente);

  return (
    <>
      <Contenedor as="section" className="pt-10 sm:pt-16 lg:pt-24">
        <div className="max-w-2xl">
          <Titulo nivel={1}>Noticias</Titulo>
          <p className="mt-3 text-cuerpo text-texto-tenue">{DESCRIPCION}</p>
        </div>
      </Contenedor>

      {enMedios.length > 0 && (
        <section className="mt-10 border-y border-borde-suave bg-superficie-baja py-10 sm:py-14">
          <Contenedor>
            <Titulo nivel={2}>En los medios</Titulo>
            <p className="mt-2 max-w-2xl text-cuerpo text-texto-tenue">
              Entrevistas y reportajes sobre Waiki, completos y sin editar.
            </p>

            {/* Dos columnas y no tres: son tarjetas horizontales con miniatura
                y texto al lado, y a un tercio del ancho no cabrían las dos
                cosas. Con pocas apariciones, además, una fila de tres deja un
                hueco a la derecha que se lee como si faltara algo. */}
            <div className="mt-7 grid gap-5 lg:grid-cols-2 lg:gap-6">
              {enMedios.map((articulo) => (
                <TarjetaPrensa key={articulo.slug} articulo={articulo} />
              ))}
            </div>
          </Contenedor>
        </section>
      )}

      <Contenedor as="section" className="py-10 sm:py-16 lg:py-20">
        <Titulo nivel={2}>Artículos</Titulo>
        <p className="mt-2 max-w-2xl text-cuerpo text-texto-tenue">
          Lo que hemos escrito sobre calefacción a pellet.
        </p>

        {propios.length === 0 ? (
          <p className="mt-8 max-w-2xl text-cuerpo text-texto-tenue">
            Todavía no hay artículos publicados.
          </p>
        ) : (
          <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {propios.map((articulo) => (
              <Tarjeta key={articulo.slug} as="article" className="flex flex-col overflow-hidden">
                {articulo.imagenPortada && (
                  <Link href={`/blog/${articulo.slug}/`} className="relative block aspect-[4/5]">
                    <Imagen
                      archivo={articulo.imagenPortada.archivo}
                      alt={articulo.imagenPortada.alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      llenar
                      className="object-cover"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  {!articulo.ocultarFecha && (
                    <time dateTime={articulo.fecha} className="text-caption text-texto-tenue">
                      {formatoFecha.format(new Date(`${articulo.fecha}T00:00:00`))}
                    </time>
                  )}
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
    </>
  );
}
