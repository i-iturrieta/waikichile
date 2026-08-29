/**
 * Listado de instalaciones (ARCHITECTURE.md §4, ruta `/instalaciones/`;
 * Bloque 9 de PHASE_1_PLAN.md, tarea 9.1).
 *
 * Server component, sin lógica propia: `instalaciones`
 * (`lib/contenido/instalaciones.ts`) ya llega filtrada por `borrador` vía
 * `filtrarPublicables`. La única isla de cliente es `Visor`
 * (`components/instalaciones/Visor.tsx`, ARCHITECTURE.md §2), que recibe la
 * colección completa y resuelve la retícula + el diálogo ampliado.
 *
 * Estado vacío: si `instalaciones` queda en `[]` (no es el caso hoy — hay 25
 * marcadores con `borrador: false`, ver `content/instalaciones.ts` — pero
 * puede pasar si algún día se marcan todas en borrador), esta página muestra
 * un mensaje en vez de montar `Visor` con una colección vacía. Es la misma
 * decisión de "quién decide el vacío" que ya usan
 * `components/inicio/Resenas.tsx` / `UltimasEntradas.tsx` (Bloque 6), solo
 * que aquí el mensaje es visible en vez de `return null`: esta página es el
 * destino completo de una ruta del menú, no una sección más de Inicio que
 * puede desaparecer sin dejar rastro.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Visor from '@/components/instalaciones/Visor';
import { instalaciones } from '@/lib/contenido/instalaciones';
import { construirMetadata } from '@/lib/seo/metadata';

// Metadata vía `construirMetadata` (Bloque 11, tarea 11.1). Galería, no
// ficha de un solo elemento — sin `imagen` propia, mismo criterio que
// `app/productos/page.tsx`.
export const metadata: Metadata = construirMetadata({
  titulo: 'Instalaciones',
  descripcion: 'Equipos Waiki instalados en distintas ciudades de Chile.',
  ruta: '/instalaciones/',
});

export default function PaginaInstalaciones() {
  return (
    <Contenedor as="section" className="py-16 lg:py-24">
      <div className="max-w-2xl">
        <Titulo nivel={1}>Instalaciones</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Fotografías de equipos Waiki ya instalados. Haz clic en cualquiera para verla ampliada.
        </p>
      </div>

      {instalaciones.length === 0 ? (
        <p className="mt-10 max-w-2xl text-cuerpo text-texto-tenue">
          Todavía no hay fotografías de instalaciones publicadas. Vuelve a revisar pronto, o escríbenos si
          quieres ver ejemplos por WhatsApp mientras tanto.
        </p>
      ) : (
        <div className="mt-10">
          <Visor instalaciones={instalaciones} />
        </div>
      )}
    </Contenedor>
  );
}
