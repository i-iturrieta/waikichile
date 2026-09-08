/**
 * `TarjetaPrensa` — tarjeta de una aparición en medios, para la sección "En
 * los medios" de `/blog/` (07-09-2026). Server component.
 *
 * Es una tarjeta distinta de `Tarjeta`/`TarjetaProducto` a propósito, porque
 * la decisión que ayuda a tomar es distinta. Frente a un artículo, quien mira
 * se pregunta "¿me interesa el tema?" y la respuesta está en el título y el
 * resumen. Frente a una entrevista se pregunta otras dos cosas antes: **quién
 * lo dijo** y **cuánto dura**. Un audio de dieciséis minutos y un video de
 * ocho no son el mismo compromiso, y ocultarlo hasta después del clic es
 * hacerle perder el tiempo a alguien.
 *
 * Por eso la tarjeta pone por delante lo que un listado de artículos no
 * necesita: el medio como antetítulo, un distintivo de formato (Audio/Video)
 * sobre la miniatura y la duración al lado. El título va después, no antes.
 *
 * **El triángulo de reproducción no reproduce nada.** Es un indicio visual
 * sobre una miniatura estática; el enlace lleva a la nota, donde está el
 * reproductor de verdad. Se podría haber montado el audio acá mismo, pero
 * eso pondría dos reproductores por página, obligaría a bajar los metadatos
 * de cada archivo a quien solo pasó de largo, y dejaría el resumen y el
 * contexto de la entrevista a un clic de distancia de donde se escucha. La
 * página de la nota es el lugar de la entrevista; esta tarjeta es el índice.
 *
 * Sin miniatura la tarjeta no se rompe: el bloque de imagen desaparece
 * entero, igual que hace el listado de artículos con `imagenPortada`. Hoy las
 * dos entrevistas tienen una —a Radio Puelche se le extrajo un fotograma del
 * propio video— pero la próxima podría llegar sin nada.
 */

import Link from 'next/link';
import type { ArticuloBlog } from '@/lib/contenido/esquemas';

export interface TarjetaPrensaProps {
  articulo: ArticuloBlog;
}

/**
 * Qué decir del formato y la extensión. Una entrevista partida en dos
 * archivos no puede anunciar una sola duración sin mentir, y sumar los
 * minutos escondería justamente lo que hay que avisar: que son dos.
 */
function describirMedios(articulo: ArticuloBlog): string | null {
  const medios = articulo.medios;
  if (!medios || medios.length === 0) return null;

  const formato = medios.every((medio) => medio.tipo === 'audio') ? 'Audio' : 'Video';
  if (medios.length === 1) {
    return medios[0].duracion ? `${formato} · ${medios[0].duracion}` : formato;
  }
  return `${formato} · ${medios.length} partes`;
}

export default function TarjetaPrensa({ articulo }: TarjetaPrensaProps) {
  const href = `/blog/${articulo.slug}/`;
  const descripcion = describirMedios(articulo);
  const miniatura = articulo.medios?.find((medio) => medio.poster)?.poster;
  const esVideo = articulo.medios?.some((medio) => medio.tipo === 'video') ?? false;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-borde-suave bg-superficie-alta shadow-[0_10px_22px_-14px_oklch(24%_0.025_45/0.3)] transition-shadow focus-within:shadow-md hover:shadow-md sm:flex-row">
      {miniatura && (
        <div className="relative shrink-0 bg-oscuro-hondo sm:w-[42%]">
          {/* `object-contain` y no `object-cover`: las miniaturas vienen con
              proporciones muy distintas —la placa de un programa es vertical,
              el fotograma de un video es apaisado— y recortar a una caja fija
              cortaba a una de las personas entrevistadas en el fotograma
              apaisado. Contener muestra el cuadro entero siempre; las franjas
              que quedan van sobre fondo oscuro, que es como se ve cualquier
              miniatura de video y no se lee como un error. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- Vive en `public/medios/`: es un fotograma del propio archivo, no pasa por el pipeline de imágenes. */}
          <img
            src={miniatura}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-[190px] w-full object-contain sm:h-full"
          />
          {/* Indicio de reproducción — decorativo, ver comentario de cabecera.
              Va en color de marca **opaco**, no en blanco translúcido. La
              primera versión era `bg-claro/90` y desaparecía sobre la placa de
              Radio Frutillar, que es clara: quedaba un disco casi blanco
              sobre un cielo casi blanco. Un indicio cuya visibilidad depende
              de la foto que le toque detrás no es un indicio. En color sólido
              se lee sobre cualquier miniatura, y de paso usa el mismo color
              que el resto de las acciones del sitio. El anillo claro lo separa
              del fondo cuando la foto es oscura. */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-marca text-claro shadow-[0_4px_16px_oklch(18%_0.03_40/0.45)] ring-2 ring-claro/70 transition-transform group-hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {articulo.fuente && (
            <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-marca">
              {articulo.fuente}
            </span>
          )}
          {descripcion && <span className="text-[13.5px] text-texto-tenue">{descripcion}</span>}
        </div>

        <h3 className="font-titulos text-[21px] font-semibold leading-[1.22] text-texto">
          {articulo.titulo}
        </h3>
        <p className="flex-1 text-[15px] leading-[1.5] text-texto-tenue">{articulo.resumen}</p>

        {/* Enlace estirado: toda la tarjeta es pulsable con una sola parada de
            tabulación, mismo patrón que las tarjetas de producto del home. */}
        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-1.5 text-[15px] font-semibold text-marca underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
        >
          {esVideo ? 'Ver la entrevista' : 'Escuchar la entrevista'}
          <span aria-hidden>→</span>
          <span className="sr-only">: {articulo.titulo}</span>
        </Link>
      </div>
    </article>
  );
}
