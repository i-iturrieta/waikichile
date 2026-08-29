/**
 * Carga de `Instalacion` (ARCHITECTURE.md §3, §7; Bloque 3 de
 * PHASE_1_PLAN.md, tarea 3.5).
 *
 * A diferencia de productos/accesorios, `Instalacion` vive en un único
 * archivo `content/instalaciones.ts` que exporta el arreglo completo
 * (`export default [...]`) — así lo fija el árbol de `content/` en
 * ARCHITECTURE.md §7. Ese archivo no existe todavía (llega en el Bloque
 * 3b); mientras tanto la colección es `[]`, el estado esperado.
 */

import { instalacionSchema, type Instalacion } from './esquemas.ts';
import { cargarColeccion, filtrarPublicables, importarModuloContenido } from './cargar.ts';

async function cargar(): Promise<Instalacion[]> {
  const datos = await importarModuloContenido('instalaciones.ts');
  const lista = Array.isArray(datos) ? datos : [];
  return cargarColeccion('instalaciones', instalacionSchema, lista);
}

/** Sin filtrar por `borrador` — para `scripts/reporte-contenido.ts` (3.7). */
export const todasLasInstalaciones: Instalacion[] = await cargar();

export const instalaciones: Instalacion[] = filtrarPublicables(todasLasInstalaciones);
