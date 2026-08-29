/**
 * Carga de `Accesorio` (ARCHITECTURE.md §3, §7; Bloque 3 de
 * PHASE_1_PLAN.md, tarea 3.4). Misma forma que `lib/contenido/productos.ts`
 * — ver ese archivo para el razonamiento sobre por qué `content/accesorios/`
 * vacío (hasta el Bloque 3b) es el estado esperado, no un error.
 */

import { accesorioSchema, type Accesorio } from './esquemas.ts';
import { cargarColeccion, filtrarPublicables, importarModulosDirectorio } from './cargar.ts';

async function cargar(): Promise<Accesorio[]> {
  const datos = await importarModulosDirectorio('accesorios');
  const accesorios = cargarColeccion('accesorios', accesorioSchema, datos);
  return accesorios.sort((a, b) => a.orden - b.orden);
}

/** Sin filtrar por `borrador` — para `scripts/reporte-contenido.ts` (3.7). */
export const todosLosAccesorios: Accesorio[] = await cargar();

export const accesorios: Accesorio[] = filtrarPublicables(todosLosAccesorios);

export function obtenerAccesorio(slug: string): Accesorio | undefined {
  return accesorios.find((accesorio) => accesorio.slug === slug);
}

export function obtenerSlugsAccesorios(): string[] {
  return accesorios.map((accesorio) => accesorio.slug);
}
