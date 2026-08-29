/**
 * Manifiesto de imágenes (ARCHITECTURE.md §3, tipo `Imagen`; Bloque 2 de
 * PHASE_1_PLAN.md, tarea 2.2).
 *
 * `manifiesto.json` lo escribe `scripts/procesar-imagenes.ts` en cada build
 * (prebuild). Este módulo solo lo tipa y expone `obtenerImagen`, que es la
 * única forma en que el resto del código debe leerlo — nunca importar el
 * JSON directamente, para que la validación de "archivo existe" pase por un
 * solo lugar.
 */

import manifiestoJson from './manifiesto.json';

export interface VariantesImagen {
  /** Anchos (px) generados en formato AVIF, ascendente. */
  avif: number[];
  /** Anchos (px) generados en formato WebP, ascendente. */
  webp: number[];
}

export interface EntradaManifiesto {
  /** Ancho real del original, en px (leído del archivo, no declarado a mano). */
  ancho: number;
  /** Alto real del original, en px. */
  alto: number;
  variantes: VariantesImagen;
}

export type Manifiesto = Record<string, EntradaManifiesto>;

export const manifiesto: Manifiesto = manifiestoJson as Manifiesto;

/**
 * Devuelve la entrada del manifiesto para `archivo` (el nombre dentro de
 * `content/images/`, tal como lo usa el campo `Imagen.archivo`).
 *
 * Lanza si `archivo` no está en el manifiesto: una imagen faltante es un
 * error en el commit, no un cuadro roto en producción (ARCHITECTURE.md §3).
 */
export function obtenerImagen(archivo: string): EntradaManifiesto {
  const entrada = manifiesto[archivo];
  if (!entrada) {
    throw new Error(
      `obtenerImagen: "${archivo}" no está en lib/imagenes/manifiesto.json. ` +
        `¿Falta el original en content/images/, o falta correr el pipeline (pnpm procesar-imagenes)?`
    );
  }
  return entrada;
}
