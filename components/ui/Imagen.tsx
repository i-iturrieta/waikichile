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
  className?: string;
}

function nombreBase(archivo: string): string {
  const punto = archivo.lastIndexOf('.');
  return punto === -1 ? archivo : archivo.slice(0, punto);
}

function construirSrcSet(base: string, anchos: number[], extension: 'avif' | 'webp'): string {
  return anchos.map((ancho) => `/img/${base}-${ancho}.${extension} ${ancho}w`).join(', ');
}

export default function Imagen({ archivo, alt, sizes, prioridad = false, className }: ImagenProps) {
  const { ancho, alto, variantes } = obtenerImagen(archivo);
  const base = nombreBase(archivo);

  const anchoFallback = variantes.webp.at(-1) ?? variantes.avif.at(-1);
  if (anchoFallback === undefined) {
    throw new Error(`<Imagen>: "${archivo}" no tiene ninguna variante generada. Corre pnpm procesar-imagenes.`);
  }

  const srcSetWebp = variantes.webp.length > 0 ? construirSrcSet(base, variantes.webp, 'webp') : undefined;
  const srcSetAvif = variantes.avif.length > 0 ? construirSrcSet(base, variantes.avif, 'avif') : undefined;
  const srcFallback = `/img/${base}-${anchoFallback}.webp`;

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
        className={className}
      />
    </picture>
  );
}
