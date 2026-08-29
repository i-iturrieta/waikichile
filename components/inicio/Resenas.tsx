/**
 * Resenas — sección de Inicio (ARCHITECTURE.md §3 "Resena", §6; Bloque 6 de
 * PHASE_1_PLAN.md, tarea 6.2: "renderiza vacío mientras no haya
 * autorizadas").
 *
 * Server component. Consume `resenas` de `lib/contenido/resenas.ts`, que ya
 * viene filtrado por `autorizada: true` *siempre* (desarrollo y producción
 * — no es lo mismo que `borrador`, ver ese archivo) y por `borrador` según
 * el entorno.
 *
 * Estado real de hoy: las 5 reseñas rescatadas en `content/resenas.ts` se
 * publican con nombre parcial y `autorizada: true` (ver el comentario de
 * cabecera de ese archivo para por qué eso resuelve AUDITORIA §6.14 sin
 * esperar confirmación escrita de la clienta), así que esta sección ya
 * renderiza contenido real en vez de `return null`.
 *
 * Decisión de dónde vive el "vacío": el componente decide por sí mismo con
 * `return null`, no `app/page.tsx`. Motivo — mismo patrón que
 * `LineasProducto.tsx` y `UltimasEntradas.tsx` (que también hacen
 * `return null` si su colección está vacía): la página no necesita conocer
 * la forma del contenido de cada sección para decidir si la monta o no.
 * Cuando haya reseñas autorizadas, esta sección aparece sola — cero cambios
 * en `app/page.tsx` ni en ningún otro archivo de código, el mismo contrato
 * de "sustituir el dato es suficiente" que ya usan las imágenes y
 * `borrador`.
 */

import Tarjeta from '@/components/ui/Tarjeta';
import Titulo from '@/components/ui/Titulo';
import Contenedor from '@/components/ui/Contenedor';
import { resenas } from '@/lib/contenido/resenas';

export default function Resenas() {
  if (resenas.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <Contenedor>
        <Titulo nivel={2}>Lo que dicen quienes ya se cambiaron</Titulo>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resenas.slice(0, 3).map((resena) => (
            <Tarjeta key={`${resena.autor}-${resena.fecha}`} as="figure" className="p-6">
              <blockquote className="text-cuerpo text-texto">&ldquo;{resena.cuerpo}&rdquo;</blockquote>
              <figcaption className="mt-4 text-caption text-texto-tenue">
                {resena.autor}
                {resena.ciudad ? ` — ${resena.ciudad}` : ''}
              </figcaption>
            </Tarjeta>
          ))}
        </div>
      </Contenedor>
    </section>
  );
}
