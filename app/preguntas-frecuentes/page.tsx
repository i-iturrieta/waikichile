/**
 * Preguntas frecuentes (ARCHITECTURE.md §4, ruta `/preguntas-frecuentes/`;
 * Bloque 9 de PHASE_1_PLAN.md, tarea 9.4).
 *
 * Server component. `preguntasFrecuentes` (`lib/contenido/faq.ts`) ya llega
 * filtrada por `borrador` vía `filtrarPublicables` — en producción, las 2
 * preguntas sobre plazo de garantía (`borrador: true`, ver el comentario de
 * cabecera de `content/faq.ts`) quedan fuera de este arreglo antes de llegar
 * aquí, así que 23 de las 25 preguntas se publican.
 *
 * El mismo arreglo ya filtrado alimenta tanto `<Acordeon>` (HTML visible)
 * como `generarFaqPageJsonLd` (JSON-LD) — a propósito: es la forma más
 * simple de garantizar que ambos coincidan siempre, sin que cada uno tenga
 * que filtrar por su cuenta y arriesgarse a divergir (ver el comentario de
 * `generarFaqPageJsonLd` en `lib/seo/jsonld.ts`).
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Acordeon from '@/components/faq/Acordeon';
import { preguntasFrecuentes } from '@/lib/contenido/faq';
import { generarFaqPageJsonLd } from '@/lib/seo/jsonld';
import { construirMetadata } from '@/lib/seo/metadata';

// Metadata vía `construirMetadata` (Bloque 11, tarea 11.1).
export const metadata: Metadata = construirMetadata({
  titulo: 'Preguntas Frecuentes',
  descripcion: 'Respuestas sobre uso, consumo, mantención, garantía, instalación y normativa de los equipos Waiki.',
  ruta: '/preguntas-frecuentes/',
});

export default function PaginaPreguntasFrecuentes() {
  const faqJsonLd = generarFaqPageJsonLd(preguntasFrecuentes);

  return (
    <Contenedor as="section" className="py-10 sm:py-16 lg:py-24">
      <div className="max-w-2xl">
        <Titulo nivel={1}>Preguntas Frecuentes</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Todo lo que preguntan antes de comprar o después de instalar un equipo Waiki.
        </p>
      </div>

      <div className="mt-10 max-w-3xl">
        <Acordeon preguntas={preguntasFrecuentes} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </Contenedor>
  );
}
