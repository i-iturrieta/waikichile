/**
 * Carga de `Resena` (ARCHITECTURE.md §3, §7; Bloque 3 de PHASE_1_PLAN.md,
 * tarea 3.5).
 *
 * Un único archivo `content/resenas.ts` (`export default [...]`), igual que
 * `instalaciones.ts` — no existe todavía (Bloque 3b), así que la colección
 * es `[]` mientras tanto.
 *
 * `autorizada` **no es lo mismo que `borrador`**: hoy no hay permiso escrito
 * para republicar las reseñas con nombre, así que `filtrarAutorizadas` se
 * aplica siempre, en desarrollo y en producción — a diferencia de
 * `filtrarPublicables` (borrador), que en desarrollo deja pasar todo. Se
 * exporta como función pura, separada de `cargar()`, para poder probarla
 * con datos sintéticos sin depender de que `content/resenas.ts` exista.
 */

import { resenaSchema, type Resena } from './esquemas.ts';
import { cargarColeccion, filtrarPublicables, importarModuloContenido } from './cargar.ts';

/** Descarta las reseñas sin `autorizada: true`. Siempre, sin importar el entorno. */
export function filtrarAutorizadas(items: Resena[]): Resena[] {
  return items.filter((item) => item.autorizada);
}

async function cargar(): Promise<Resena[]> {
  const datos = await importarModuloContenido('resenas.ts');
  const lista = Array.isArray(datos) ? datos : [];
  return cargarColeccion('resenas', resenaSchema, lista);
}

/**
 * Todas las reseñas válidas, sin filtrar por `autorizada` ni `borrador` —
 * para `scripts/reporte-contenido.ts` (3.7), que necesita ver justamente
 * las que faltan por autorizar. Las páginas del sitio deben usar `resenas`.
 */
export const todasLasResenas: Resena[] = await cargar();

export const resenas: Resena[] = filtrarPublicables(filtrarAutorizadas(todasLasResenas));
