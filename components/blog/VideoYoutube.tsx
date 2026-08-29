'use client';

/**
 * `VideoYoutube` — embed diferido de un video de YouTube (ARCHITECTURE.md
 * §8 "YouTube": "embed con carga diferida (miniatura estática, iframe solo
 * al hacer clic). Un iframe de YouTube cargado de entrada arruina las Core
 * Web Vitals que la propuesta compromete"; Bloque 9 de PHASE_1_PLAN.md,
 * tarea 9.3).
 *
 * Antes de hacer clic: solo un `<button>` con la miniatura estática de
 * `i.ytimg.com` (una imagen `<img>` normal, no pasa por el pipeline de
 * `content/images/` porque no es un archivo del repositorio) — cero JS de
 * YouTube, cero cookies de terceros, cero iframe en el HTML inicial.
 * Después de hacer clic: se monta el iframe de `youtube-nocookie.com`
 * (dominio de YouTube pensado justamente para no setear cookies de
 * seguimiento hasta que el usuario decide reproducir).
 *
 * Ningún artículo real de `content/blog/*.md` usa este componente todavía
 * (verificado: ninguno de los tres trae un video) — se construye igual
 * porque la tarea 9.3 lo pide como pieza reutilizable para cuando exista
 * contenido con video, no porque haya un artículo que lo necesite hoy.
 */

import { useState } from 'react';

export interface VideoYoutubeProps {
  /** ID del video (los 11 caracteres después de `v=` o `youtu.be/`). */
  id: string;
  /** Título descriptivo del video — etiqueta el botón y el iframe. */
  titulo: string;
}

export default function VideoYoutube({ id, titulo }: VideoYoutubeProps) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (reproduciendo) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-tarjeta">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setReproduciendo(true)}
      aria-label={`Reproducir video: ${titulo}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-tarjeta border border-borde bg-texto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
    >
      {/* Miniatura estática de YouTube — carga como cualquier <img>, sin
          script del reproductor hasta el clic. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-marca text-superficie shadow-md transition-transform group-hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
