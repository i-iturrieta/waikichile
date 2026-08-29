/**
 * `TarjetaProducto` — tarjeta resumida de listado (ARCHITECTURE.md §3, §4;
 * Bloque 8 de PHASE_1_PLAN.md, tareas 8.1 y 8.3).
 *
 * Reutilizada tal cual para accesorios, sin una `TarjetaAccesorio` aparte:
 * `Accesorio` (`lib/contenido/esquemas.ts`) es
 * `productoSchema.extend({ esRepuesto, vidaUtil })`, así que todo objeto
 * `Accesorio` ya trae los campos que esta tarjeta necesita — TypeScript
 * permite pasar un `Accesorio` donde se pide un `Producto` porque tiene
 * todos sus campos y más (asignación estructural). La única diferencia real
 * entre listar productos y accesorios es la base de la URL de la ficha, que
 * resuelve la prop `basePath`. Ver el reporte del Bloque 8 para el
 * razonamiento completo de reutilizar en vez de separar.
 *
 * Mismo patrón visual que la tarjeta ya construida en
 * `components/inicio/LineasProducto.tsx` (Bloque 6) — no se reinventa,
 * solo se le agrega superficie recomendada y precio, que Inicio no muestra.
 */

import Link from 'next/link';
import Tarjeta from '@/components/ui/Tarjeta';
import Titulo from '@/components/ui/Titulo';
import Imagen from '@/components/ui/Imagen';
import type { Producto } from '@/lib/contenido/esquemas';
import { formatearPrecio } from './formatearPrecio';

export interface TarjetaProductoProps {
  producto: Producto;
  /** `/productos` o `/accesorios` — con qué ruta base armar el enlace a la ficha. */
  basePath: '/productos' | '/accesorios';
}

export default function TarjetaProducto({ producto, basePath }: TarjetaProductoProps) {
  const portada = producto.imagenes[0];
  const href = `${basePath}/${producto.slug}/`;

  return (
    <Tarjeta as="article" className="flex flex-col overflow-hidden">
      <Link href={href} className="block aspect-[4/5]">
        <Imagen
          archivo={portada.archivo}
          alt={portada.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Titulo nivel={3}>{producto.nombre}</Titulo>
        <p className="flex-1 text-cuerpo text-texto-tenue">{producto.tagline}</p>

        {/* `superficieRecomendada` es nullable (ARCHITECTURE.md §3) — cuando
            no está confirmada (Waiki) esta línea se omite entera, no se
            muestra vacía ni con un "—". */}
        {producto.superficieRecomendada && (
          <p className="text-caption text-texto-tenue">
            Recomendado para {producto.superficieRecomendada.min}–{producto.superficieRecomendada.max} m²
          </p>
        )}

        <div className="mt-1 flex items-center justify-between gap-3 border-t border-borde pt-4">
          <span className="text-cuerpo font-semibold text-marca">{formatearPrecio(producto.precio)}</span>
          <Link href={href} className="text-caption font-semibold text-marca underline-offset-4 hover:underline">
            Ver ficha →
          </Link>
        </div>
      </div>
    </Tarjeta>
  );
}
