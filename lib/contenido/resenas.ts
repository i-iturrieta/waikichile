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

/**
 * Total y promedio de las reseñas publicadas (10-09-2026).
 *
 * Lo consume el enlace de `components/inicio/Resenas.tsx` hacia
 * `/nosotros/#resenas` ("Ver las 38 opiniones · 4,9 de 5"), para que el
 * número salga del contenido y no escrito a mano en el texto del enlace.
 *
 * Se calcula sobre `resenas` —las que el sitio muestra— y no sobre
 * `todasLasResenas`: el promedio que se le enseña a alguien tiene que ser el
 * de los testimonios que esa persona puede abrir y leer.
 *
 * Hoy ambas colecciones coinciden: al borrarse la única reseña en borrador
 * (10-09-2026, ver el comentario de cabecera de `content/resenas.ts`) no
 * queda ninguna, así que `filtrarPublicables` no descarta nada. La distinción
 * igual importa el día que vuelva a haber un borrador.
 */
export interface ResumenResenas {
  total: number;
  /** Promedio de `calificacion`, sin redondear. 0 si no hay reseñas. */
  promedio: number;
}

export function resumirResenas(items: Resena[]): ResumenResenas {
  if (items.length === 0) return { total: 0, promedio: 0 };
  const suma = items.reduce((acumulado, item) => acumulado + item.calificacion, 0);
  return { total: items.length, promedio: suma / items.length };
}

export const resumenResenas: ResumenResenas = resumirResenas(resenas);

/**
 * Resumen de las reseñas que nombran **explícitamente** un producto, para el
 * `aggregateRating` de su ficha (`lib/seo/jsonld.ts`).
 *
 * Solo cuenta las que traen `producto` en el contenido, que es el campo que
 * `content/resenas.ts` completa únicamente cuando el texto del propio cliente
 * nombra el equipo — nunca por inferencia del contexto. Hoy son 21 de las 38
 * publicadas. Las otras 17 no se reparten ni se le suman al producto más
 * probable: decir "tengo una estufa y ando feliz" no es decir cuál.
 */
export function resumirResenasDeProducto(slug: string): ResumenResenas {
  return resumirResenas(resenas.filter((item) => item.producto === slug));
}
