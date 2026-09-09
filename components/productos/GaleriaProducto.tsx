'use client';

/**
 * `GaleriaProducto` — la galería de la ficha de producto, ahora ampliable
 * (ronda 09-09-2026, pedido de Ignacio: "que el listado de imágenes de los
 * productos sea clickeable y se haga grande para verlo en detalle, algo como
 * lo que se hace con las imágenes de las instalaciones").
 *
 * El layout es **el mismo que tenía dentro de `FichaProducto`** y se movió
 * acá tal cual, sin retocar clases: en móvil, una sola tira horizontal con
 * scroll-snap nativo (`overflow-x-auto snap-x`), cada imagen casi a ancho
 * completo con un asomo de la siguiente; desde `lg:`, la misma lista se
 * reacomoda a la grilla original (principal grande + miniaturas debajo). Ver
 * el comentario de cabecera de `FichaProducto` para el porqué de ese diseño
 * — lo pidió la clienta en la ronda del 01-09-2026.
 *
 * Lo único que cambia es que cada imagen pasa de `<div>` a `<button>`, y que
 * el componente monta `VisorAmpliado`. Se convierte en isla de cliente por
 * eso; `FichaProducto` sigue siendo componente de servidor.
 *
 * **Por qué esto importa más que en Instalaciones:** desde la ronda del
 * 08-09-2026 la ficha de Chakay incluye los cuatro planos de medidas del
 * fabricante (2894 × 4093 px), y en la miniatura de la grilla las cotas no se
 * leen. Sin ampliar, ese material —que es el mejor que tiene la empresa— era
 * decorativo. Por lo mismo el diálogo se monta en `max-w-5xl` en vez del
 * `max-w-3xl` que usa Instalaciones: son dibujos técnicos, no fotos, y la
 * diferencia entre leer un "67" y no leerlo es todo el valor de la imagen.
 *
 * `object-cover` en la grilla y `object-contain` en el diálogo, que es lo que
 * ya hacía el visor de instalaciones: recortado para que la grilla quede
 * pareja, completo cuando se amplía.
 */

import { useState } from 'react';
import Imagen from '@/components/ui/Imagen';
import VisorAmpliado, { type ImagenAmpliable } from '@/components/ui/VisorAmpliado';

export interface GaleriaProductoProps {
  imagenes: ImagenAmpliable[];
  /** Nombre del equipo, solo para las etiquetas accesibles de los botones. */
  nombre: string;
}

export default function GaleriaProducto({ imagenes, nombre }: GaleriaProductoProps) {
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);
  const [principal, ...resto] = imagenes;

  const claseBoton =
    'group relative flex-none snap-center overflow-hidden text-left transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca';

  return (
    <>
      <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 md:-mx-16 md:px-16 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        <button
          type="button"
          onClick={() => setIndiceAbierto(0)}
          aria-label={`Ampliar imagen 1 de ${imagenes.length} de ${nombre}`}
          className={`${claseBoton} aspect-[4/5] w-[78%] rounded-imagen-principal border border-superficie shadow-brasa sm:w-[45%] lg:col-span-4 lg:w-full`}
        >
          <Imagen
            archivo={principal.archivo}
            alt={principal.alt}
            prioridad
            sizes="(min-width: 1024px) 50vw, 80vw"
            llenar
            className="object-cover transition-transform group-hover:scale-105"
          />
        </button>
        {resto.map((imagen, indice) => (
          <button
            key={imagen.archivo}
            type="button"
            onClick={() => setIndiceAbierto(indice + 1)}
            aria-label={`Ampliar imagen ${indice + 2} de ${imagenes.length} de ${nombre}`}
            className={`${claseBoton} aspect-[4/5] w-[78%] rounded-tarjeta border border-superficie shadow-sm sm:w-[45%] lg:col-span-1 lg:w-full`}
          >
            <Imagen
              archivo={imagen.archivo}
              alt={imagen.alt}
              sizes="(min-width: 1024px) 12vw, 80vw"
              llenar
              className="object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <VisorAmpliado
        imagenes={imagenes}
        indice={indiceAbierto}
        alCambiar={setIndiceAbierto}
        alCerrar={() => setIndiceAbierto(null)}
        singular="Imagen"
        anchoMaximo="max-w-5xl"
      />
    </>
  );
}
