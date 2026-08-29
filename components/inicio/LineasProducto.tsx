/**
 * LineasProducto — sección de Inicio (ARCHITECTURE.md §4, §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2).
 *
 * Server component. Tarjetas resumen de los productos `destacado: true` —
 * hoy los tres del catálogo (Waiki, Chakay, Nahuen), en el orden que fija
 * `orden` en cada ficha ("Waiki primero, siempre", ARCHITECTURE.md §3).
 * Solo imagen, nombre, tagline y enlace: la ficha completa (medidas,
 * especificaciones, incluye/no incluye) es del Bloque 8, no de Inicio.
 *
 * `productos` (de `lib/contenido/productos.ts`) ya viene filtrado por
 * `borrador` según el entorno; acá se filtra además por `destacado` para no
 * asumir que todo lo publicable es automáticamente destacado si el catálogo
 * crece.
 *
 * Enlaza a `/productos/{slug}/`, que no existe todavía (Bloque 8) — es el
 * orden de construcción esperado, igual que con `/calculadora/` en 6.1.
 */

import Link from 'next/link';
import Tarjeta from '@/components/ui/Tarjeta';
import Titulo from '@/components/ui/Titulo';
import Contenedor from '@/components/ui/Contenedor';
import Imagen from '@/components/ui/Imagen';
import { productos } from '@/lib/contenido/productos';

export default function LineasProducto() {
  const destacados = productos.filter((producto) => producto.destacado);

  if (destacados.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <Contenedor>
        <div className="max-w-2xl">
          <Titulo nivel={2}>Nuestros equipos</Titulo>
          <p className="mt-3 text-cuerpo text-texto-tenue">
            Tres líneas de tiro natural, sin electricidad. Cada una pensada para un tipo de casa
            distinto.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((producto) => {
            const portada = producto.imagenes[0];
            return (
              <Tarjeta key={producto.slug} as="article" className="flex flex-col overflow-hidden">
                <Link href={`/productos/${producto.slug}/`} className="block aspect-[4/5]">
                  <Imagen
                    archivo={portada.archivo}
                    alt={portada.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <Titulo nivel={3}>{producto.nombre}</Titulo>
                  <p className="flex-1 text-cuerpo text-texto-tenue">{producto.tagline}</p>
                  <Link
                    href={`/productos/${producto.slug}/`}
                    className="text-cuerpo font-semibold text-marca underline-offset-4 hover:underline"
                  >
                    Ver ficha técnica →
                  </Link>
                </div>
              </Tarjeta>
            );
          })}
        </div>
      </Contenedor>
    </section>
  );
}
