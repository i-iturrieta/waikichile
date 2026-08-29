/**
 * Página 404 (ARCHITECTURE.md §4 `app/not-found.tsx`; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.6).
 *
 * `output: 'export'` genera `out/404.html` a partir de este archivo, y
 * `wrangler.jsonc` lo sirve para cualquier ruta no reconocida vía
 * `assets.not_found_handling: "404-page"` (ARCHITECTURE.md §1.1b).
 *
 * Enlaces a Inicio, Productos y Contacto (los que pide la tarea). `/productos/`
 * y `/contacto/` todavía no existen como página propia — los construyen los
 * Bloques 8 y 10 — así que hoy esos dos enlaces también resuelven en esta
 * misma página 404 hasta que se construyan. Es el orden de construcción
 * esperado (PHASE_1_PLAN.md §10: el Bloque 5 va antes que los Bloques 8 y
 * 10), no un enlace roto por error.
 */

import type { Metadata } from 'next';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Boton from '@/components/ui/Boton';

export const metadata: Metadata = {
  title: 'Página no encontrada',
};

export default function NoEncontrado() {
  return (
    <Contenedor className="flex flex-col items-start gap-6 py-24">
      <Titulo nivel={1}>Página no encontrada</Titulo>
      <p className="max-w-prose text-cuerpo text-texto-tenue">
        La página que buscas no existe o cambió de dirección. Prueba desde alguna de estas secciones:
      </p>
      <div className="flex flex-wrap gap-3">
        <Boton href="/" variante="primario">
          Ir a Inicio
        </Boton>
        <Boton href="/productos/" variante="secundario">
          Ver productos
        </Boton>
        <Boton href="/contacto/" variante="secundario">
          Contacto
        </Boton>
      </div>
    </Contenedor>
  );
}
