/**
 * UltimasEntradas — sección de Inicio (ARCHITECTURE.md §4, §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2).
 *
 * Server component. Los 3 artículos publicados del blog
 * (`obtenerArticulos()` de `lib/contenido/blog.ts`, ya ordenados por fecha
 * descendente y filtrados por `publicado: true`) — hoy hay exactamente 3,
 * así que `.slice(0, 3)` los muestra todos, pero el corte queda explícito
 * para cuando haya más.
 *
 * Ninguno de los tres artículos trae `imagenPortada` en su frontmatter
 * (campo opcional del esquema — verificado contra `content/blog/*.md`), así
 * que las tarjetas son de texto: fecha, título y resumen. No se inventa una
 * imagen genérica para rellenar donde el contenido no la trae.
 *
 * Enlaza a `/blog/{slug}/`, que no existe todavía (Bloque 9) — mismo orden
 * de construcción esperado que `/productos/` en `LineasProducto.tsx`.
 */

import Link from 'next/link';
import Tarjeta from '@/components/ui/Tarjeta';
import Titulo from '@/components/ui/Titulo';
import Contenedor from '@/components/ui/Contenedor';
import { obtenerArticulos } from '@/lib/contenido/blog';

// Fechas legibles en español, <time datetime> en ISO (ARCHITECTURE.md §9).
const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

export default function UltimasEntradas() {
  const articulos = obtenerArticulos().slice(0, 3);

  if (articulos.length === 0) return null;

  return (
    <section className="border-t border-borde bg-superficie py-16 lg:py-24">
      <Contenedor>
        <div className="max-w-2xl">
          <Titulo nivel={2}>Del blog</Titulo>
          <p className="mt-3 text-cuerpo text-texto-tenue">
            Notas sobre calefacción a pellet: por qué conviene, cómo elegir el sistema adecuado y
            qué mirar antes de comprar.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articulos.map((articulo) => (
            <Tarjeta key={articulo.slug} as="article" className="flex flex-col p-6">
              <time dateTime={articulo.fecha} className="text-caption text-texto-tenue">
                {formatoFecha.format(new Date(`${articulo.fecha}T00:00:00`))}
              </time>
              <Titulo nivel={3} className="mt-2">
                {articulo.titulo}
              </Titulo>
              <p className="mt-3 flex-1 text-cuerpo text-texto-tenue">{articulo.resumen}</p>
              <Link
                href={`/blog/${articulo.slug}/`}
                className="mt-4 text-cuerpo font-semibold text-marca underline-offset-4 hover:underline"
              >
                Leer artículo →
              </Link>
            </Tarjeta>
          ))}
        </div>
      </Contenedor>
    </section>
  );
}
