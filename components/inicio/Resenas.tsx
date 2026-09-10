/**
 * Resenas — sección de Inicio (ARCHITECTURE.md §3 "Resena", §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2). Server component.
 *
 * Consume `resenas` de `lib/contenido/resenas.ts`, que ya viene filtrado por
 * `autorizada: true` *siempre* (desarrollo y producción — no es lo mismo que
 * `borrador`, ver ese archivo) y por `borrador` según el entorno.
 *
 * El componente decide solo si tiene algo que mostrar (`return null`), igual
 * que `LineasProducto` y `UltimasEntradas`: `app/page.tsx` no necesita
 * conocer la forma del contenido de cada sección para decidir si la monta.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * La sección se apoya sobre una banda un paso más oscura que el resto de la
 * página, con filete arriba y abajo. Es lo que la separa de las dos
 * secciones de venta que la rodean: el testimonio tiene que leerse como voz
 * ajena, no como una tarjeta más del catálogo.
 *
 * Dos desvíos deliberados respecto del mockup, ambos por venir de datos
 * reales en vez de relleno de maqueta:
 *
 * 1. Las estrellas se dibujan en las tres tarjetas, a partir de
 *    `resena.calificacion`. El mockup las pone solo en la primera; eso es
 *    una inconsistencia de la maqueta, no una intención de diseño — dos
 *    testimonios idénticos en jerarquía donde uno muestra calificación y el
 *    otro no se lee como un dato que falta, no como una decisión.
 * 2. El texto de cada reseña es el `cuerpo` completo de `content/resenas.ts`.
 *    El mockup muestra versiones recortadas; recortarlas acá (un `slice` a
 *    N caracteres) sería editar el testimonio de una persona desde el
 *    código. Si hay que acortarlas, el lugar correcto es `content/resenas.ts`
 *    —donde queda registrado qué se publicó— y no este componente.
 *
 * Cuántas se muestran: dos hasta `lg` (una columna en móvil, dos en tablet)
 * y tres desde `lg`. La tercera se oculta con CSS en vez de recortar el
 * arreglo porque el corte depende del ancho de pantalla, que en un sitio
 * estático no se conoce al renderizar; el markup es idéntico y solo cambia
 * la visibilidad. `aria-hidden` no hace falta: `display:none` ya la saca del
 * árbol de accesibilidad. Aparece recién en `lg` y no en `md` para que
 * nunca quede una tarjeta sola en una segunda fila de la grilla de dos.
 *
 * --- El enlace al listado completo (10-09-2026) ---------------------------
 *
 * La clienta reportó que "en la portada solo salen 2 o 3 comentarios y eran
 * hartos". Tenía razón en lo que veía, pero el problema **no era que
 * faltaran**: las 38 publicadas ya estaban completas en `/nosotros/#resenas`
 * desde el Bloque 9, que además es el destino de la 301 de `/comentarios/`
 * (`public/_redirects`). El problema era que desde acá no había cómo llegar,
 * y "Opiniones" no aparecía en el menú: quedaban escondidas dentro de
 * "Nosotros", donde nadie que busque comentarios va a mirar.
 *
 * Por eso la corrección es un enlace, no una página nueva ni un tope más
 * alto. Treinta y ocho testimonios completos en Inicio lo convierten en un
 * muro de texto; y crear una segunda página de reseñas habría duplicado
 * `/nosotros/#resenas` y peleado con su propia 301.
 *
 * El total sale de `resumenResenas`, no escrito a mano: si mañana se publica
 * una más, el enlace se actualiza solo. El promedio se trunca con el mismo
 * criterio que usa `app/nosotros/page.tsx` (piso a un decimal) para que el
 * mismo número no aparezca como "4,9" en una página y "4,97" en la otra.
 */

import Link from 'next/link';
import { IconoEstrella } from '@/components/ui/iconos';
import { resenas, resumenResenas } from '@/lib/contenido/resenas';

/** Tope de tarjetas en escritorio. En móvil se ven las dos primeras. */
const MAXIMO_VISIBLES = 3;

export default function Resenas() {
  if (resenas.length === 0) return null;

  const visibles = resenas.slice(0, MAXIMO_VISIBLES);
  const promedio = (Math.floor(resumenResenas.promedio * 10) / 10).toFixed(1).replace('.', ',');

  return (
    <section className="border-y border-borde-suave bg-superficie-baja px-5 py-[34px] md:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-sitio">
        <h2 className="text-pretty font-titulos text-[26px] font-semibold tracking-[-0.015em] text-texto lg:text-h2">
          Lo que dicen quienes ya se cambiaron
        </h2>

        <div className="mt-[18px] flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {visibles.map((resena, indice) => (
            <figure
              key={`${resena.autor}-${resena.fecha}-${indice}`}
              className={`m-0 rounded-[14px] border border-borde-suave bg-superficie-alta p-5 ${
                indice === 2 ? 'hidden lg:block' : ''
              }`}
            >
              <div
                className="mb-2.5 flex gap-0.5 text-estrella"
                role="img"
                aria-label={`${resena.calificacion} de 5 estrellas`}
              >
                {Array.from({ length: resena.calificacion }, (_, estrella) => (
                  <IconoEstrella key={estrella} tamano={15} />
                ))}
              </div>

              <blockquote className="text-[15.5px] leading-[1.6] text-texto">
                &ldquo;{resena.cuerpo}&rdquo;
              </blockquote>

              <figcaption className="mt-3 text-[13.5px] font-semibold text-texto-tenue">
                {resena.autor}
                {resena.ciudad ? ` — ${resena.ciudad}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>

        {resumenResenas.total > MAXIMO_VISIBLES ? (
          <p className="mt-5 lg:mt-8">
            <Link
              href="/nosotros/#resenas"
              className="inline-flex min-h-11 items-center rounded-[10px] border border-borde px-4 text-[15px] font-semibold text-texto transition-colors hover:bg-superficie-alta"
            >
              Ver las {resumenResenas.total} opiniones · {promedio} de 5
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
