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
 * nuevas sin autorizar todavía) — hoy sí hay reseñas autorizadas (ver
 * `content/resenas.ts`), así que esta rama solo se ejercita en ese
 * escenario futuro, no en el build actual.
 *
 * **08-09-2026 — se muestran todas, no seis.** Esta sección hacía
 * `resenas.slice(0, 6)` cuando la colección tenía 5 reseñas y el recorte no
 * cortaba nada. Al recuperarse las del sitio anterior pasaron a ser 38
 * publicadas, y el mismo `slice` habría escondido 32 de ellas: Ignacio pidió
 * "que queden todos los comentarios posibles de la página anterior", y
 * tenerlas en `content/` sin que se vean no es tenerlas. Además esta es la
 * página a la que apunta la 301 de `/comentarios/`, que en el sitio anterior
 * era un listado completo y paginado — quien llegue desde esa URL viene a
 * ver todas.
 *
 * Inicio sigue mostrando tres (`components/inicio/Resenas.tsx`): ahí son un
 * anticipo, acá son el listado.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Tarjeta from '@/components/ui/Tarjeta';
import { paginaNosotros } from '@/lib/contenido/paginas';
import { resenas } from '@/lib/contenido/resenas';
import { construirMetadata } from '@/lib/seo/metadata';

/**
 * Línea de resumen sobre la grilla: cuántas reseñas y con qué promedio.
 *
 * Se calcula sobre `resenas` —lo que esta página realmente muestra— y no
 * sobre el total rescatado. El sitio anterior decía "4.9 de 5 estrellas
 * (basado en 48 reseñas)"; acá hay menos, porque nueve quedaron fuera por la
 * marca anterior y una está en borrador (`content/resenas.ts`). Repetir el 48
 * sería afirmar un promedio calculado sobre reseñas que el visitante no
 * puede ver.
 *
 * El promedio se formatea con coma decimal, que es la convención en Chile, y
 * **se trunca en vez de redondearse**. Con las 38 publicadas de hoy el
 * promedio real es 4,97 y `toFixed(1)` lo mostraba como "5,0": un puntaje
 * perfecto habiendo una reseña de 4 estrellas. Redondear una calificación
 * hacia arriba la exagera aunque sea por una décima, y es justo el número
 * que un visitante usa para decidir. Truncar nunca dice de más.
 */
const promedioResenas =
  resenas.reduce((total, resena) => total + resena.calificacion, 0) / (resenas.length || 1);

const promedioTruncado = (Math.floor(promedioResenas * 10) / 10).toFixed(1).replace('.', ',');

const resumenResenas = `${resenas.length} reseñas de clientes, con un promedio de ${promedioTruncado} de 5. Están tal como las escribieron en nuestro sitio anterior.`;

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
      <Contenedor as="article" className="py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Titulo nivel={1}>{paginaNosotros.titulo}</Titulo>
          <div className="prosa mt-8" dangerouslySetInnerHTML={{ __html: paginaNosotros.html }} />
        </div>
      </Contenedor>

      <section id="resenas" className="border-t border-borde bg-superficie py-10 sm:py-16 lg:py-24">
        <Contenedor>
          <Titulo nivel={2}>Lo que dicen quienes ya se cambiaron</Titulo>

          {resenas.length === 0 ? (
            <p className="mt-6 max-w-2xl text-cuerpo text-texto-tenue">
              Todavía no tenemos reseñas publicadas con autorización de nuestros clientes. Estamos
              reuniendo esos permisos para poder mostrarlas aquí — mientras tanto, escríbenos si quieres
              conversar directamente con alguien que ya se cambió a pellet.
            </p>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-cuerpo text-texto-tenue">
                {resumenResenas}
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resenas.map((resena) => (
                  <Tarjeta key={`${resena.autor}-${resena.fecha}-${resena.titulo}`} as="figure" className="p-6">
                    <blockquote className="text-cuerpo text-texto">&ldquo;{resena.cuerpo}&rdquo;</blockquote>
                    <figcaption className="mt-4 text-caption text-texto-tenue">
                      {resena.autor}
                      {resena.ciudad ? ` — ${resena.ciudad}` : ''}
                    </figcaption>
                  </Tarjeta>
                ))}
              </div>
            </>
          )}
        </Contenedor>
      </section>
    </>
  );
}
