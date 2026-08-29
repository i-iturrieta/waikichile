/**
 * Garantía (ARCHITECTURE.md §4, ruta `/garantia/`; Bloque 9 de
 * PHASE_1_PLAN.md, tarea 9.5).
 *
 * Server component. `paginaGarantia` (`lib/contenido/paginas.ts`) se carga
 * siempre — a diferencia de las colecciones filtradas por
 * `filtrarPublicables`, esta página existe pase lo que pase con `borrador`.
 * Ver el comentario de cabecera de `lib/contenido/paginas.ts` para la
 * tensión completa entre "esta página debe existir siempre"
 * (PHASE_1_PLAN.md, tarea 9.5) y "el mecanismo de `borrador` omite
 * contenido" (ARCHITECTURE.md §1.6): se resuelve dejando la decisión de qué
 * mostrar en el propio texto de `content/paginas/garantia.md`, no en un
 * `if` de esta página. Ese texto (`borrador: true` hoy) ya fue escrito en el
 * Bloque 3b para ser exactamente el "texto breve que remite a contacto" que
 * pide la tarea: sin plazo en meses, sin canal de reclamo específico. Esta
 * página lo renderiza tal cual, sin lógica condicional adicional.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Boton from '@/components/ui/Boton';
import { paginaGarantia } from '@/lib/contenido/paginas';
import { construirMetadata } from '@/lib/seo/metadata';

// Metadata vía `construirMetadata` (Bloque 11, tarea 11.1). `/garantia/`
// existe siempre pase lo que pase con `paginaGarantia.borrador` (ver el
// comentario de cabecera de arriba) — su canónica y Open Graph también, sin
// condicional adicional.
export const metadata: Metadata = construirMetadata({
  titulo: paginaGarantia.titulo,
  descripcion: paginaGarantia.resumen,
  ruta: '/garantia/',
});

export default function PaginaGarantia() {
  return (
    <Contenedor as="article" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <Titulo nivel={1}>{paginaGarantia.titulo}</Titulo>
        <div className="prosa mt-8" dangerouslySetInnerHTML={{ __html: paginaGarantia.html }} />
        <div className="mt-10">
          <Boton href="/contacto/" variante="primario">
            Escríbenos por tu garantía
          </Boton>
        </div>
      </div>
    </Contenedor>
  );
}
