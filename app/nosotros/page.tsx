/**
 * Nosotros (ARCHITECTURE.md §4, ruta `/nosotros/` "+ #resenas"; Bloque 9 de
 * PHASE_1_PLAN.md, tarea 9.6).
 *
 * Server component. `paginaNosotros` (`lib/contenido/paginas.ts`, siempre
 * cargada — ver el comentario de cabecera de ese archivo) trae `borrador:
 * false`: es prosa institucional sin datos inventados, publicable tal cual
 * (ARCHITECTURE.md §1.6).
 *
 * Sección `#resenas`: destino de la redirección `/comentarios/` → Bloque 11,
 * pero el ancla debe existir ya (tarea 9.6, "Done when:
 * `/nosotros/#resenas` ancla correctamente"). No se reutiliza
 * `components/inicio/Resenas.tsx` (Bloque 6) tal cual: ese componente hace
 * `return null` cuando `resenas` está vacío, que es el comportamiento
 * correcto para una sección más de Inicio (puede desaparecer sin dejar
 * rastro) pero rompería el ancla aquí — un `<a href="#resenas">` que apunta
 * a un `id` que no existe en el DOM no hace nada, ni siquiera falla
 * visiblemente. Esta página monta su propia sección con el mismo `id`
 * fijo siempre presente, con un estado vacío honesto en vez de `null` para
 * el día en que `resenas` vuelva a estar vacía (p. ej. si se agregan reseñas
 * nuevas sin autorizar todavía) — hoy sí hay 5 reseñas autorizadas (ver
 * `content/resenas.ts`), así que esta rama solo se ejercita en ese
 * escenario futuro, no en el build actual.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Tarjeta from '@/components/ui/Tarjeta';
import { paginaNosotros } from '@/lib/contenido/paginas';
import { resenas } from '@/lib/contenido/resenas';
import { construirMetadata } from '@/lib/seo/metadata';

// Metadata vía `construirMetadata` (Bloque 11, tarea 11.1). La canónica es
// `/nosotros/` sin el ancla `#resenas` — el fragmento identifica una
// sección de la misma página, no una URL distinta que necesite su propia
// canónica (mismo criterio que usa cualquier motor de búsqueda: los
// fragmentos no son parte de la canónica).
export const metadata: Metadata = construirMetadata({
  titulo: paginaNosotros.titulo,
  descripcion: paginaNosotros.resumen,
  ruta: '/nosotros/',
});

export default function PaginaNosotros() {
  return (
    <>
      <Contenedor as="article" className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Titulo nivel={1}>{paginaNosotros.titulo}</Titulo>
          <div className="prosa mt-8" dangerouslySetInnerHTML={{ __html: paginaNosotros.html }} />
        </div>
      </Contenedor>

      <section id="resenas" className="border-t border-borde bg-superficie py-16 lg:py-24">
        <Contenedor>
          <Titulo nivel={2}>Lo que dicen quienes ya se cambiaron</Titulo>

          {resenas.length === 0 ? (
            <p className="mt-6 max-w-2xl text-cuerpo text-texto-tenue">
              Todavía no tenemos reseñas publicadas con autorización de nuestros clientes. Estamos
              reuniendo esos permisos para poder mostrarlas aquí — mientras tanto, escríbenos si quieres
              conversar directamente con alguien que ya se cambió a pellet.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resenas.slice(0, 6).map((resena) => (
                <Tarjeta key={`${resena.autor}-${resena.fecha}`} as="figure" className="p-6">
                  <blockquote className="text-cuerpo text-texto">&ldquo;{resena.cuerpo}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-caption text-texto-tenue">
                    {resena.autor}
                    {resena.ciudad ? ` — ${resena.ciudad}` : ''}
                  </figcaption>
                </Tarjeta>
              ))}
            </div>
          )}
        </Contenedor>
      </section>
    </>
  );
}
