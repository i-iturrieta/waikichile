/**
 * Carga de `Producto` (ARCHITECTURE.md §3, §7; Bloque 3 de PHASE_1_PLAN.md,
 * tarea 3.3).
 *
 * Importa cada `content/productos/*.ts` (un producto por archivo, vía
 * `export default`), valida contra `productoSchema` y expone la colección
 * ordenada por `orden`.
 *
 * El catálogo publicado hoy son cuatro fichas —`waiki.ts`, `chakay.ts`,
 * `nahuen.ts` y `mini-nahuen.ts`—, en ese orden (`orden` 1 a 4). Nahuen se
 * incorporó el 05-09-2026, al llegar sus primeras fotografías reales: hasta
 * entonces estaba en `borrador: true` y `filtrarPublicables` lo dejaba fuera
 * de `productos` (pero no de `todosLosProductos`, que es lo que mira el
 * reporte de contenido).
 */

import { productoSchema, type Producto } from './esquemas.ts';
import { cargarColeccion, filtrarPublicables, importarModulosDirectorio } from './cargar.ts';

async function cargar(): Promise<Producto[]> {
  const datos = await importarModulosDirectorio('productos');
  const productos = cargarColeccion('productos', productoSchema, datos);
  return productos.sort((a, b) => a.orden - b.orden);
}

/**
 * Todos los productos válidos, sin filtrar por `borrador` — es lo que
 * consume `scripts/reporte-contenido.ts` (tarea 3.7) para poder listar
 * justamente los que están en borrador. Las páginas del sitio deben usar
 * `productos`, no esto.
 */
export const todosLosProductos: Producto[] = await cargar();

export const productos: Producto[] = filtrarPublicables(todosLosProductos);

export function obtenerProducto(slug: string): Producto | undefined {
  return productos.find((producto) => producto.slug === slug);
}

export function obtenerSlugsProductos(): string[] {
  return productos.map((producto) => producto.slug);
}
