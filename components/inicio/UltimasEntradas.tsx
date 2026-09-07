/**
 * UltimasEntradas — sección de Inicio (ARCHITECTURE.md §4, §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2). Server component.
 *
 * Los 3 artículos publicados del blog (`obtenerArticulos()` de
 * `lib/contenido/blog.ts`, ya ordenados por fecha descendente y filtrados
 * por `publicado: true`). Hoy hay exactamente 3, así que `.slice(0, 3)` los
 * muestra todos, pero el corte queda explícito para cuando haya más.
 *
 * Ninguno de los tres trae `imagenPortada` en su frontmatter (campo opcional
 * del esquema — verificado contra `content/blog/*.md`), así que las tarjetas
 * son de texto: fecha, título y resumen. No se inventa una imagen genérica
 * para rellenar donde el contenido no la trae.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * Esta sección **no existe en el mockup**: el diseño saca el blog del home y
 * cierra con "Hablemos". Se conserva por decisión explícita de Ignacio
 * (05-09-2026), así que no hay original que calcar y el estilo está cocinado
 * con el vocabulario que el resto del home ya definió — mismo borde
 * `borde-suave`, mismo radio de 16px, misma sombra baja y mismo par
 * título Bitter 20px / resumen 15px que las tarjetas de `LineasProducto`.
 * Que se lea como pariente de esas tarjetas y no como un bloque importado de
 * otro sitio es todo el objetivo.
 *
 * Va después de las reseñas y antes de "Hablemos", no al final: el cierre de
 * la página tiene que ser la invitación a escribir, no tres enlaces que se
 * llevan al visitante a leer otra cosa.
 *
 * Sin carrusel, a diferencia de `LineasProducto`: son tarjetas de texto
 * corto, apiladas ocupan poco, y el anclaje horizontal solo se gana su
 * complejidad cuando lo que hay que comparar son objetos —los tres equipos—
 * no titulares que se leen en secuencia.
 */

import Link from 'next/link';
import { obtenerArticulos } from '@/lib/contenido/blog';

// Fechas legibles en español, <time datetime> en ISO (ARCHITECTURE.md §9).
const formatoFecha = new Intl.DateTimeFormat('es-CL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function UltimasEntradas() {
  const articulos = obtenerArticulos().slice(0, 3);

  if (articulos.length === 0) return null;

  return (
    <section className="px-5 pb-[34px] pt-[38px] md:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-sitio">
        <h2 className="font-titulos text-[26px] font-semibold tracking-[-0.015em] text-texto lg:text-h2">
          Noticias
        </h2>
        <p className="mt-[9px] max-w-[46ch] text-cuerpo leading-[1.55] text-texto-tenue">
          Por qué conviene el pellet, cómo elegir el sistema adecuado y qué mirar antes de comprar.
        </p>

        <div className="mt-[18px] grid gap-3 md:grid-cols-3 md:gap-5 lg:mt-10 lg:gap-6">
          {articulos.map((articulo) => (
            <article
              key={articulo.slug}
              className="relative flex flex-col rounded-2xl border border-borde-suave bg-superficie-alta p-5 shadow-[0_10px_22px_-14px_oklch(24%_0.025_45/0.3)] transition-shadow focus-within:shadow-md hover:shadow-md"
            >
              {!articulo.ocultarFecha && (
                <time dateTime={articulo.fecha} className="text-[13.5px] text-texto-tenue">
                  {formatoFecha.format(new Date(`${articulo.fecha}T00:00:00`))}
                </time>
              )}
              <h3 className="mt-1.5 font-titulos text-[20px] font-semibold leading-[1.25] text-texto">
                {articulo.titulo}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-[1.5] text-texto-tenue">
                {articulo.resumen}
              </p>
              {/* Mismo enlace estirado que las tarjetas de producto: toda la
                  tarjeta es pulsable con una sola parada de tabulación. Ver
                  el comentario en `LineasProducto.tsx`. */}
              <Link
                href={`/blog/${articulo.slug}/`}
                className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-marca underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
              >
                Leer artículo
                <span aria-hidden>→</span>
                <span className="sr-only">: {articulo.titulo}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
