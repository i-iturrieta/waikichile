import { obtenerImagen } from '@/lib/imagenes';

/**
 * `<Imagen>` — componente de presentación puro (ARCHITECTURE.md §7:
 * `components/ui/` no conoce el dominio, solo recibe `archivo` y `alt`).
 *
 * Server component (sin `"use client"`): resuelve el manifiesto en build/
 * render de servidor y emite HTML plano, sin JavaScript de cliente.
 *
 * Arma un `<picture>` con `<source>` AVIF y WebP (en ese orden — el
 * navegador usa el primer `type` que soporte) con `srcset` de los anchos
 * realmente generados por `scripts/procesar-imagenes.ts`, y un `<img>` de
 * respaldo con `width`/`height` reales del manifiesto para reservar el
 * espacio y no producir salto de layout.
 *
 * El pipeline (Bloque 2) solo genera variantes AVIF y WebP — no copia el
 * original JPG/PNG a `public/img/`. Por eso el `src` de respaldo del
 * `<img>` usa la variante WebP más ancha disponible (soporte de navegador
 * más amplio que AVIF) en vez del original.
 *
 * Corrección 06-09-2026 — la prop `llenar`.
 *
 * Siete de las ocho llamadas del sitio estaban escritas con el mismo patrón:
 * una caja con proporción fija (`aspect-[4/5]`) y, dentro, `h-full w-full
 * object-cover` sobre la imagen. Ese patrón no funcionaba, en ninguna de las
 * siete.
 *
 * `h-full` es `height: 100%`, y un porcentaje necesita que el padre tenga
 * altura definida para resolverse. Una caja con `aspect-ratio` y altura
 * automática no la tiene: la proporción propone una altura, pero si el
 * contenido en flujo pide más, gana el contenido. Y el contenido pedía más,
 * porque al no resolverse `h-full` caía a `auto` y la foto se dibujaba con
 * su proporción original. El resultado es circular y siempre termina igual:
 * la caja adopta la forma de la foto, y `object-cover`/`object-contain`
 * quedan inertes — no hay nada que recortar ni encajar cuando la caja ya
 * tiene exactamente la forma de la imagen.
 *
 * Medido en `/productos/` a 1440px: la caja de Chakay daba 262×582 donde la
 * proporción pedía 262×328, y los cuatro títulos de la fila quedaban a 687,
 * 941, 708 y 709 px de altura. Donde el contenedor llevaba `overflow-hidden`
 * (el visor de instalaciones, la ficha de producto, el listado del blog) el
 * defecto no se veía como descuadre sino como recorte, siempre desde el
 * borde superior y nunca centrado, que es justo lo que `object-cover` existe
 * para evitar.
 *
 * `llenar` posiciona la imagen en absoluto contra el contenedor
 * (`absolute inset-0 h-full w-full`), que es la única forma de que llene una
 * caja con proporción: con `inset` la altura ya no depende de un porcentaje
 * y la proporción manda. Es el mismo mecanismo que usa `fill` de
 * `next/image`, y el que `LineasProducto` ya venía escribiendo a mano — esta
 * prop es esa solución, dejada donde no hay que volver a recordarla.
 *
 * **El contenedor tiene que ser `relative`** (o cualquier otro valor
 * posicionado): sin eso la imagen se ancla al ancestro posicionado más
 * cercano, o al viewport. No se puede verificar desde acá, así que va dicho
 * en el JSDoc de la prop, donde se lee al escribir la llamada.
 *
 * Sin `llenar`, la imagen sigue siendo un bloque normal que se dibuja con su
 * proporción original — el modo correcto cuando el alto lo pone la foto y no
 * el diseño.
 */

export interface ImagenProps {
  /** Nombre del archivo dentro de `content/images/` (la clave del manifiesto). */
  archivo: string;
  /** Texto alternativo. Obligatorio: la accesibilidad no es opcional (ARCHITECTURE.md §9). */
  alt: string;
  /** Atributo `sizes` del `<picture>`/`<img>`. Si se omite, el navegador asume 100vw. */
  sizes?: string;
  /** `true` desactiva `loading="lazy"` para imágenes visibles sin scroll (LCP). */
  prioridad?: boolean;
  /**
   * Hace que la imagen llene su contenedor, recortándose según el
   * `object-fit` que traiga `className`. **El contenedor debe ser
   * `relative`** — ver el comentario de cabecera.
   */
  llenar?: boolean;
  className?: string;
}

function nombreBase(archivo: string): string {
  const punto = archivo.lastIndexOf('.');
  return punto === -1 ? archivo : archivo.slice(0, punto);
}

function construirSrcSet(base: string, anchos: number[], extension: 'avif' | 'webp'): string {
  return anchos.map((ancho) => `/img/${base}-${ancho}.${extension} ${ancho}w`).join(', ');
}

export default function Imagen({
  archivo,
  alt,
  sizes,
  prioridad = false,
  llenar = false,
  className,
}: ImagenProps) {
  const { ancho, alto, variantes } = obtenerImagen(archivo);
  const base = nombreBase(archivo);

  const anchoFallback = variantes.webp.at(-1) ?? variantes.avif.at(-1);
  if (anchoFallback === undefined) {
    throw new Error(`<Imagen>: "${archivo}" no tiene ninguna variante generada. Corre pnpm procesar-imagenes.`);
  }

  const srcSetWebp = variantes.webp.length > 0 ? construirSrcSet(base, variantes.webp, 'webp') : undefined;
  const srcSetAvif = variantes.avif.length > 0 ? construirSrcSet(base, variantes.avif, 'avif') : undefined;
  const srcFallback = `/img/${base}-${anchoFallback}.webp`;

  // El `object-fit` lo decide quien llama y por eso va al final: si pasa
  // `object-contain`, gana sobre cualquier valor previo de la misma clase.
  const clases = llenar ? `absolute inset-0 h-full w-full ${className ?? ''}`.trim() : className;

  return (
    <picture>
      {srcSetAvif && <source type="image/avif" srcSet={srcSetAvif} sizes={sizes} />}
      {srcSetWebp && <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />}
      <img
        src={srcFallback}
        srcSet={srcSetWebp}
        sizes={sizes}
        width={ancho}
        height={alto}
        alt={alt}
        loading={prioridad ? undefined : 'lazy'}
        decoding={prioridad ? undefined : 'async'}
        className={clases}
      />
    </picture>
  );
}
