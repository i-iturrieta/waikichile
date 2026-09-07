/**
 * BarraFija — barra de acción anclada al borde inferior en móvil.
 *
 * Componente nuevo de la ronda 05-09-2026 ("Home Movil A" de Claude
 * Design). Reemplaza al botón circular flotante de WhatsApp en pantallas
 * chicas, y `BotonWhatsapp.tsx` pasa a ser exclusivo de escritorio para que
 * los dos no convivan (ver el comentario de cabecera de ese archivo).
 *
 * Por qué una barra y no el botón circular: el círculo ofrecía una sola
 * acción y tapaba la esquina inferior derecha del contenido. La barra ocupa
 * el mismo alto útil pero entrega las dos acciones que el sitio quiere —ver
 * el catálogo y escribir— y, al ser una franja opaca con borde, el navegador
 * y el usuario la leen como cromo de la interfaz en vez de como algo
 * encima del texto.
 *
 * `env(safe-area-inset-bottom)` en el relleno inferior: sin eso, en un
 * iPhone con barra de gestos el botón queda parcialmente bajo la zona
 * reservada del sistema y el toque se lo lleva el gesto de "volver al
 * inicio", no el enlace. El `calc()` mantiene los 11px del diseño y suma
 * solo lo que el dispositivo declare (0 en un teléfono sin muesca).
 *
 * `z-30` la deja bajo el panel del menú móvil (`z-40`), que la tapa
 * completo mientras está abierto — el menú ya trae su propio CTA de
 * WhatsApp y dos barras superpuestas serían ruido.
 *
 * Se monta en `app/layout.tsx`, así que aparece en todas las páginas, no
 * solo en el home: es el reemplazo del botón flotante, que también era
 * global. La contrapartida conocida es que "Ver productos" queda redundante
 * mientras se está en `/productos/`. Se deja así a propósito: ocultarlo ahí
 * exige `usePathname()` y convertir esta barra —hoy HTML estático sin una
 * línea de JavaScript— en una isla de cliente, y ARCHITECTURE.md §2 pide que
 * cada isla sea una decisión consciente. Un enlace de más en una de nueve
 * páginas no la justifica.
 *
 * El separador de 74px que evita que la barra tape el final de la página
 * vive en `Pie.tsx`, no acá: un elemento `fixed` no ocupa espacio en el
 * flujo, así que el hueco tiene que crearlo el contenido.
 */

import Link from 'next/link';
import { enlaceWhatsapp } from './whatsapp';
import { IconoWhatsapp } from '@/components/ui/iconos';

export default function BarraFija() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2.5 border-t border-borde bg-superficie-alta/96 px-4 pt-[11px] backdrop-blur-[14px] pb-[calc(11px_+_env(safe-area-inset-bottom))] lg:hidden">
      <Link
        href="/productos/"
        className="flex min-h-[50px] flex-1 items-center justify-center rounded-xl bg-marca text-[16.5px] font-semibold text-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
      >
        Ver productos
      </Link>
      <a
        href={enlaceWhatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribirle a Waiki Chile por WhatsApp"
        className="inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-secundario text-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
      >
        <IconoWhatsapp tamano={24} />
      </a>
    </div>
  );
}
