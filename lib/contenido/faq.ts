/**
 * Carga de `PreguntaFrecuente` (ARCHITECTURE.md §3, §7; Bloque 3 de
 * PHASE_1_PLAN.md, tarea 3.5).
 *
 * Un único archivo `content/faq.ts` (`export default [...]`), igual que
 * `instalaciones.ts` y `resenas.ts` — no existe todavía (Bloque 3b), así
 * que la colección es `[]` mientras tanto.
 */

import { preguntaFrecuenteSchema, type PreguntaFrecuente } from './esquemas.ts';
import { cargarColeccion, filtrarPublicables, importarModuloContenido } from './cargar.ts';

async function cargar(): Promise<PreguntaFrecuente[]> {
  const datos = await importarModuloContenido('faq.ts');
  const lista = Array.isArray(datos) ? datos : [];
  return cargarColeccion('faq', preguntaFrecuenteSchema, lista).sort((a, b) => a.orden - b.orden);
}

/** Sin filtrar por `borrador` — para `scripts/reporte-contenido.ts` (3.7). */
export const todasLasPreguntasFrecuentes: PreguntaFrecuente[] = await cargar();

export const preguntasFrecuentes: PreguntaFrecuente[] = filtrarPublicables(todasLasPreguntasFrecuentes);
