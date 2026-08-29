/**
 * Encabezado del sitio (ARCHITECTURE.md §4; Bloque 5 de PHASE_1_PLAN.md,
 * tarea 5.2). Server component: logo, CTA de Contacto, CTA de WhatsApp, y
 * el montaje de `<MenuMovil>` — la única isla de cliente de este
 * componente (ver el comentario de cabecera de `MenuMovil.tsx` para por
 * qué la navegación de escritorio vive ahí también, no acá).
 *
 * Los CTA de Contacto y WhatsApp se ocultan bajo el quiebre `md` para no
 * saturar el encabezado móvil (que solo muestra logo + hamburguesa): el
 * botón flotante de WhatsApp (`BotonWhatsapp.tsx`, tarea 5.5, montado en
 * `app/layout.tsx`) ya cubre esa función en todas las pantallas, incluido
 * el móvil, así que no hace falta duplicarla aquí. "Contacto" sigue
 * disponible en móvil dentro del panel de `MenuMovil`.
 *
 * Logo: `public/logo-waiki-icono.png`. Recortado del original entregado por
 * la clienta (`imagenes-cliente/5-logo/logo-waiki-1.jpeg`, 540×540) — ese
 * archivo trae el nombre apilado sobre el ícono (mano + brote), que no sirve
 * tal cual en una barra horizontal; se aisló solo el ícono y se le quitó el
 * fondo blanco (umbral de color, sin IA de recorte) para que se vea limpio
 * sobre `--color-superficie`. Vive en `public/`, no en `content/images/`: es
 * un activo de marca de un solo uso fijo, no fotografía de contenido — mismo
 * criterio que `ARCHITECTURE.md §9` ya usa para la imagen de Open Graph
 * ("un archivo estático... sin generación dinámica"), así que no pasa por el
 * pipeline del Bloque 2. Si más adelante aparece el logo vectorial original
 * (`ARCHITECTURE.md §13`), reemplaza este PNG por ese archivo sin tocar el
 * resto del componente.
 */

import Image from 'next/image';
import Link from 'next/link';
import { empresa } from '@/lib/contenido/empresa';
import Contenedor from '@/components/ui/Contenedor';
import MenuMovil from './MenuMovil';
import { ENLACE_CONTACTO } from './enlaces-navegacion';

const MENSAJE_PRELLENADO = 'Hola, tengo una consulta sobre los equipos Waiki.';

function construirEnlaceWhatsapp(whatsapp: string): string {
  const numero = whatsapp.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(MENSAJE_PRELLENADO)}`;
}

export default function Encabezado() {
  const enlaceWhatsapp = construirEnlaceWhatsapp(empresa.whatsapp);

  return (
    <header className="relative border-b border-borde bg-superficie">
      <Contenedor className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-waiki-icono.png"
            alt=""
            width={217}
            height={330}
            className="h-9 w-auto"
            priority
          />
          <span className="flex items-baseline gap-1.5 font-titulos text-h3 font-semibold text-marca">
            Waiki
            <span className="font-cuerpo text-cuerpo font-normal text-texto-tenue">Chile</span>
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <MenuMovil />
          {/* "Contacto" no es parte del nav del mockup (ver enlaces-navegacion.ts) —
              se agrega como enlace de texto simple, subordinado al CTA de
              WhatsApp, no como botón con borde compitiendo con él. */}
          <Link
            href={ENLACE_CONTACTO.href}
            className="hidden text-cuerpo text-texto transition-colors hover:text-marca md:inline-flex md:items-center"
          >
            {ENLACE_CONTACTO.etiqueta}
          </Link>
          {/* Chip/píldora del mockup — no es el mismo componente que los
              botones grandes (`Boton.tsx`, `rounded-boton` 8px): este CTA
              chico del header es `rounded-full`, un caso especial, así que
              no reutiliza esa primitiva. */}
          <a
            href={enlaceWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center gap-2 rounded-full bg-secundario px-5 py-2.5 text-sm font-semibold text-superficie transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca md:inline-flex"
          >
            WhatsApp
          </a>
        </div>
      </Contenedor>
    </header>
  );
}
