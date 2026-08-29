/**
 * `formatearPrecio` — formatea el campo `Precio` de `Producto`/`Accesorio`
 * para presentación (ARCHITECTURE.md §3: "`precio` es una unión
 * discriminada, no un número"; Bloque 8 de PHASE_1_PLAN.md, tareas 8.1 y
 * 8.2).
 *
 * Maneja ambos casos de `precioSchema` (`lib/contenido/esquemas.ts`) aunque
 * hoy el contenido real solo ejercite `{ tipo: 'consultar' }` — los tres
 * productos y los dos accesorios están en "consultar" (decisión de
 * propuesta #3, ARCHITECTURE.md §0). El día que la clienta confirme un
 * monto, el objeto de contenido cambia a `{ tipo: 'fijo', ... }` y esta
 * función ya sabe formatearlo, sin tocar los componentes que la llaman
 * (`TarjetaProducto`, `FichaProducto`).
 *
 * Vive en `components/productos/` y no en `lib/` porque es lógica de
 * presentación (cómo se ve un precio), no de negocio: el número de negocio
 * en sí (`monto`) sigue viniendo siempre de `content/`, nunca escrito acá
 * (ARCHITECTURE.md §7, "Ningún número de negocio vive en un componente").
 */

import type { Precio } from '@/lib/contenido/esquemas';

const formatoCLP = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });

export function formatearPrecio(precio: Precio): string {
  if (precio.tipo === 'consultar') return 'Consultar precio';
  const monto = formatoCLP.format(precio.monto);
  return precio.incluyeIva ? `$${monto} IVA incluido` : `$${monto} + IVA`;
}
