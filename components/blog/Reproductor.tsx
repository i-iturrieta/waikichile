/**
 * `Reproductor` — reproduce un audio o un video alojado por nosotros
 * (agregado el 07-09-2026 para publicar las entrevistas de prensa).
 *
 * **Server component, sin `"use client"` y sin una línea de JavaScript.** Usa
 * los controles nativos de `<audio controls>` y `<video controls>`, que el
 * navegador ya trae: reproducir, pausar, barra de progreso, volumen,
 * velocidad, pantalla completa y —lo que ninguna implementación propia
 * consigue gratis— teclado, lector de pantalla y Picture-in-Picture. Escribir
 * controles a mano habría significado meter una isla de cliente
 * (ARCHITECTURE.md §2) para reconstruir peor algo que ya existe.
 *
 * Distinto de `VideoYoutube.tsx`, que sí es cliente: ahí la isla se justifica
 * porque el objetivo es NO cargar el iframe de YouTube hasta que alguien
 * decida verlo. Acá no hay terceros que diferir; el archivo es nuestro y
 * `preload="metadata"` ya evita que se descargue solo.
 *
 * `preload="metadata"` y no `"auto"`: con `auto` el navegador se baja los
 * ~8 MB del audio apenas se abre la página, la vea o no quien entró. Con
 * `metadata` pide unos pocos KB —lo justo para saber cuánto dura y poder
 * dibujar la barra— y el resto solo si le dan play. Los archivos se
 * remuxearon con `+faststart`, así que la reproducción arranca sin esperar la
 * descarga completa.
 *
 * El `poster` del video merece una nota: en `<video>` es la imagen que se ve
 * antes de reproducir. Para la entrevista de Radio Frutillar, que llegó
 * como .mp4 pero es audio, ese poster es la placa del programa — por eso el
 * caso `audio` también la muestra, arriba del reproductor, en vez de dejar
 * una barra gris flotando sin contexto.
 *
 * La proporción del video no se fuerza a 16:9: el archivo de Radio Puelche es
 * vertical (576 × 1024) porque así lo emitieron. Encajarlo en un marco
 * apaisado lo dejaría con franjas negras a los lados sobre las que ya trae
 * arriba y abajo. `max-h` lo acota para que un video vertical no ocupe tres
 * pantallas de alto en escritorio.
 */

import type { Medio } from '@/lib/contenido/esquemas';

export interface ReproductorProps {
  medio: Medio;
}

export default function Reproductor({ medio }: ReproductorProps) {
  const { tipo, archivo, titulo, poster, duracion } = medio;

  return (
    <figure className="my-8 first:mt-0">
      <figcaption className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-titulos text-[17px] font-semibold text-texto">{titulo}</span>
        {duracion && (
          <span className="text-[14px] text-texto-tenue">
            {tipo === 'audio' ? 'Audio' : 'Video'} · {duracion}
          </span>
        )}
      </figcaption>

      {tipo === 'audio' ? (
        /* La placa se muestra como miniatura al costado, no a todo el ancho.
           El original mide 368 px de ancho: estirarlo a la columna completa
           del artículo (768 px) lo deja borroso y empuja el botón de play
           fuera de la pantalla, que es justo lo contrario de lo que tiene que
           pasar en una nota cuyo contenido es la entrevista. A 160 px se ve
           nítida y el reproductor queda a la vista. */
        <div className="flex flex-col gap-3 rounded-tarjeta border border-borde bg-superficie-baja p-3 sm:flex-row sm:items-center sm:gap-4">
          {poster && (
            // eslint-disable-next-line @next/next/no-img-element -- Vive en `public/medios/`, no pasó por el pipeline: sin entrada en el manifiesto no hay `<Imagen>` posible.
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="mx-auto w-[160px] shrink-0 rounded-[10px] border border-borde-suave sm:mx-0"
            />
          )}
          <audio controls preload="metadata" className="w-full min-w-0 flex-1" aria-label={titulo}>
            <source src={archivo} type="audio/mp4" />
            Tu navegador no puede reproducir este audio.{' '}
            <a href={archivo} className="underline">
              Descárgalo aquí
            </a>
            .
          </audio>
        </div>
      ) : (
        <video
          controls
          preload="metadata"
          poster={poster}
          aria-label={titulo}
          className="max-h-[75vh] w-full rounded-tarjeta border border-borde bg-oscuro-hondo"
        >
          <source src={archivo} type="video/mp4" />
          Tu navegador no puede reproducir este video.{' '}
          <a href={archivo} className="underline">
            Descárgalo aquí
          </a>
          .
        </video>
      )}
    </figure>
  );
}
