/**
 * `KitCanos` — recuadro "Kit de instalación" de la ficha (15-10-2026).
 *
 * Contenido y fuente en `content/kit-canos.ts`. Como `CondicionesCompra`,
 * no decide si corresponde mostrarlo: eso lo decide `FichaProducto`.
 */

import Titulo from '@/components/ui/Titulo';
import { kitCanos } from '@/content/kit-canos';
import { formatearPrecio } from './formatearPrecio';

export default function KitCanos() {
  return (
    <div className="rounded-[10px] border border-borde bg-superficie p-6">
      <Titulo nivel={3}>Kit de instalación (se cotiza aparte)</Titulo>
      <p className="mt-2 text-cuerpo text-texto-tenue">
        Este equipo no incluye el kit de caños. Si lo compras con nosotros, cuesta{' '}
        <strong className="text-texto">
          {formatearPrecio({ tipo: 'fijo', monto: kitCanos.precio, incluyeIva: true })}
        </strong>{' '}
        e incluye:
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {kitCanos.contenido.map((item) => (
          <li key={item} className="flex gap-2 text-cuerpo text-texto-tenue">
            <span aria-hidden="true" className="text-secundario">
              +
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-r-[10px] border-l-[3px] border-acento bg-acento/10 p-4">
        <p className="text-cuerpo text-texto">
          <strong>Costo extra: {kitCanos.extra.nombre}</strong> a ${kitCanos.extra.precioPorMetro.toLocaleString('es-CL')}{' '}
          el metro. {kitCanos.extra.detalle}
        </p>
      </div>
    </div>
  );
}
