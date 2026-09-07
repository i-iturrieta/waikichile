/**
 * LineasProducto — sección de Inicio (ARCHITECTURE.md §4, §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2). Server component.
 *
 * Tarjetas resumen de los productos `destacado: true`, en el orden que fija
 * `orden` en cada ficha ("Waiki primero, siempre", ARCHITECTURE.md §3).
 *
 * Ronda 05-09-2026 (publicación de Nahuen): pasan de tres a cuatro —Waiki,
 * Chakay, Nahuen y Mini Nahuen—. Nahuen estuvo en `borrador: true` hasta que
 * llegaron sus dos primeras fotografías reales (Bloque 11, tarea 11.6); ahora
 * `lib/contenido/productos.ts` deja de filtrarlo y la cuarta tarjeta aparece
 * sola. Este componente sigue sin saber cuántos productos hay: la cuenta y las
 * palabras "tres"/"cuatro" del copy salen de `destacados.length`, precisamente
 * para que publicar o despublicar un equipo no obligue a editar texto acá.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * En móvil las tarjetas pasan de grilla apilada a carrusel horizontal con
 * anclaje (`scroll-snap`). Apiladas, cada una con su foto cuadrada, sumaban
 * cerca de 430px de scroll vertical por equipo para comparar equipos que se
 * entienden mejor de a lado: el carrusel los deja a un gesto de distancia y,
 * sobre todo, hace visible de una sola mirada cuántas opciones tiene el
 * catálogo. Con cuatro tarjetas el argumento pesa más que con tres, no
 * menos. El ancho de 76% no es arbitrario — deja asomando el borde de la
 * siguiente tarjeta, que es la única pista fiable de que hay más contenido a
 * la derecha; con 100% el carrusel se lee como una sola tarjeta y nadie
 * desliza.
 *
 * La línea "Desliza para ver los cuatro" refuerza esa pista con texto, y
 * desaparece en escritorio junto con el carrusel, donde arrastrar dejaría de
 * ser necesario (y sería incómodo con mouse).
 *
 * La grilla de escritorio pasa de `md:grid-cols-3` a `md:grid-cols-2
 * lg:grid-cols-4`. Cuatro columnas a 768px dejarían tarjetas de ~170px, con
 * la foto del equipo del tamaño de una miniatura; en dos filas de dos
 * respiran. A 1024px sí caben las cuatro en línea (~264px cada una dentro de
 * los 1280px del contenedor), que es donde el catálogo completo se abarca de
 * una mirada — el mismo objetivo que persigue el carrusel en móvil.
 *
 * La foto va con `object-contain` sobre un cuadrado de fondo claro, no con
 * `object-cover`: los equipos son objetos altos y angostos fotografiados
 * completos, y recortarlos a cuadro les corta la salida de humos o la base.
 * El relleno de 10px evita que toquen el borde de la tarjeta.
 *
 * Corrección 06-09-2026: el cuadrado se declara con `aspect-square` y la
 * imagen con la prop `llenar`. Antes eran `pt-[100%]` y las clases de
 * posicionamiento escritas a mano — el truco del relleno porcentual y el
 * rodeo que esta sección necesitaba porque `h-full` no funciona dentro de
 * `<Imagen>`. Ahora que `llenar` existe (ver `components/ui/Imagen.tsx`), el
 * rodeo sobra y el cuadrado puede decirse con la propiedad que lo significa.
 *
 * El texto de cada tarjeta sale de `producto.tagline` (`content/productos/
 * *.ts`), no del literal del mockup: el mockup trae versiones abreviadas de
 * esas mismas frases, y duplicar copy de contenido dentro de un componente
 * rompe el contrato de ARCHITECTURE.md §7 (el contenido se edita en
 * `content/`, no en `components/`). Es la única divergencia de texto
 * deliberada respecto del diseño en esta sección.
 *
 * Enlaza a `/productos/{slug}/` (Bloque 8).
 */

import Link from 'next/link';
import Imagen from '@/components/ui/Imagen';
import { IconoFlecha } from '@/components/ui/iconos';
import { productos } from '@/lib/contenido/productos';
import { enPalabras, enPalabrasCapital } from '@/lib/texto/numeros';

export default function LineasProducto() {
  const destacados = productos.filter((producto) => producto.destacado);

  if (destacados.length === 0) return null;

  const cuantos = enPalabras(destacados.length);

  return (
    <section className="pb-[34px] pt-[38px] lg:pb-20 lg:pt-20">
      <div className="mx-auto max-w-sitio px-5 md:px-8 lg:px-16">
        <h2 className="font-titulos text-[28px] font-semibold tracking-[-0.015em] text-texto lg:text-h2">
          Nuestros equipos
        </h2>
        <p className="mt-[9px] max-w-[46ch] text-cuerpo leading-[1.55] text-texto-tenue">
          {enPalabrasCapital(destacados.length)} líneas de tiro natural. Cada una pensada para un
          tipo de casa distinto.
        </p>
      </div>

      {/* Un solo contenedor que cambia de modelo de caja en `md`: carrusel
          con anclaje abajo, grilla arriba. Mantenerlo en un elemento (en vez
          de renderizar dos listas y ocultar una) evita duplicar el marcado
          de las tarjetas y que el lector de pantalla encuentre cada producto
          dos veces. */}
      <div className="sin-barra mx-auto mt-5 flex max-w-sitio snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-1.5 pt-1 md:grid md:grid-cols-2 md:gap-6 md:overflow-x-visible md:px-8 lg:mt-8 lg:grid-cols-4 lg:gap-8 lg:px-16">
        {destacados.map((producto) => {
          const portada = producto.imagenes[0];
          const ficha = `/productos/${producto.slug}/`;

          return (
            <article
              key={producto.slug}
              className="relative flex flex-none basis-[76%] snap-start flex-col overflow-hidden rounded-2xl border border-borde-suave bg-superficie-alta shadow-[0_10px_22px_-14px_oklch(24%_0.025_45/0.3)] transition-shadow focus-within:shadow-md hover:shadow-md md:basis-auto"
            >
              <div className="relative aspect-square bg-superficie-baja">
                <Imagen
                  archivo={portada.archivo}
                  alt={portada.alt}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 30vw, 76vw"
                  llenar
                  className="object-contain p-2.5"
                />
              </div>

              <div className="flex flex-1 flex-col gap-[7px] p-4 pb-[18px]">
                <h3 className="font-titulos text-[20px] font-semibold text-texto">{producto.nombre}</h3>
                <p className="flex-1 text-[15px] leading-[1.5] text-texto-tenue">{producto.tagline}</p>
                {/* Enlace estirado: `after:absolute after:inset-0` extiende
                    el área pulsable a toda la tarjeta (la foto incluida) sin
                    envolverla en un segundo `<a>`. Así hay una sola parada de
                    tabulación y un solo enlace por producto —dos enlaces al
                    mismo destino obligan a un lector de pantalla a anunciar
                    el mismo sitio dos veces— y la foto conserva su `alt` en
                    vez de tener que marcarse decorativa para evitarlo.
                    `overflow-hidden` en el `<article>` recorta el pseudo-
                    elemento a las esquinas redondeadas. */}
                <Link
                  href={ficha}
                  className="mt-1 flex min-h-[46px] items-center justify-center rounded-[10px] bg-marca-suave text-[15px] font-semibold text-marca-oscura transition-colors after:absolute after:inset-0 hover:bg-marca hover:text-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
                >
                  Ver ficha
                  <span className="sr-only"> de {producto.nombre}</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Solo con carrusel: en `md` la grilla ya las muestra todas. */}
      <div className="mx-auto max-w-sitio px-5 pt-2 md:hidden">
        <p className="flex items-center gap-[7px] text-[13.5px] text-texto-tenue">
          <IconoFlecha tamano={15} />
          Desliza para ver los {cuantos}
        </p>
      </div>
    </section>
  );
}
