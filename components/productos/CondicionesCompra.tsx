/**
 * `CondicionesCompra` — bloque "Cómo se compra" de la ficha de producto
 * (08-09-2026). Server component, cero JavaScript.
 *
 * Muestra las condiciones comerciales de `content/condiciones-comerciales.ts`:
 * reserva, saldo, despacho, documento y por dónde se hace el pedido. Es la
 * información que decide una compra y que hasta hoy vivía enterrada en el
 * párrafo de descripción de una sola ficha.
 *
 * **Se renderiza como `<dl>`, no como lista de viñetas.** Cada condición es
 * un par pregunta/respuesta —"Reserva: el 30% del valor total"— y eso es
 * exactamente una lista de definiciones. Un lector de pantalla anuncia la
 * relación entre el término y su valor; con `<ul>` habría que leer cinco
 * frases sueltas y deducirla.
 *
 * `despacho` y `documento` son nullable y se omiten enteros si faltan, igual
 * que el resto de la ficha (ARCHITECTURE.md §1.6: no se pinta un guion ni un
 * "por confirmar" donde no hay dato).
 *
 * El componente **no decide si corresponde mostrarlo**: eso lo decide
 * `FichaProducto` con `producto.usaCondicionesEstandar`. Acá solo se decide
 * qué hacer si no hay condiciones publicadas (`null` por estar en borrador),
 * que es no renderizar nada.
 */

import Titulo from '@/components/ui/Titulo';
import { condicionesComerciales } from '@/lib/contenido/condiciones-comerciales';

export default function CondicionesCompra() {
  if (!condicionesComerciales) return null;

  const filas: { termino: string; detalle: string }[] = [
    { termino: 'Reserva', detalle: condicionesComerciales.reserva },
    { termino: 'Saldo', detalle: condicionesComerciales.saldo },
    ...(condicionesComerciales.despacho
      ? [{ termino: 'Despacho', detalle: condicionesComerciales.despacho }]
      : []),
    ...(condicionesComerciales.documento
      ? [{ termino: 'Documento', detalle: condicionesComerciales.documento }]
      : []),
    { termino: 'Cómo se pide', detalle: condicionesComerciales.solicitud },
  ];

  return (
    <div className="rounded-[10px] border border-borde bg-superficie p-6">
      <Titulo nivel={3}>Cómo se compra</Titulo>
      <dl className="mt-4 flex flex-col gap-3">
        {filas.map(({ termino, detalle }) => (
          <div key={termino} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <dt className="text-caption font-semibold text-texto sm:w-32 sm:shrink-0">{termino}</dt>
            <dd className="text-cuerpo text-texto-tenue">{detalle}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
