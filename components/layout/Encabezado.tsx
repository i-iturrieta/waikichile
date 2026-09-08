/**
 * Encabezado del sitio (ARCHITECTURE.md §4; Bloque 5 de PHASE_1_PLAN.md,
 * tarea 5.2). Server component: logo, CTA de WhatsApp y el montaje de
 * `<MenuMovil>` — la única isla de cliente (ver su comentario de cabecera
 * para por qué la navegación de escritorio también vive ahí).
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * Móvil (calcado del mockup): barra `sticky` translúcida con desenfoque,
 * borde inferior de 1px, alto de 12px de relleno vertical, y solo dos
 * elementos — logo a la izquierda, botón de menú de 44×44 a la derecha. El
 * 44 no es arbitrario: es el objetivo táctil mínimo de las WCAG 2.5.5, y
 * por eso el botón es más grande que su propio ícono de 22px.
 *
 * El encabezado dejó de ser opaco y estático. `sticky` + `backdrop-blur`
 * mantiene la navegación al alcance durante todo el scroll de un home que
 * ahora es largo, sin robarle altura al hero: la barra se apoya *sobre* la
 * fotografía en vez de empujarla hacia abajo.
 *
 * Escritorio (cocinado, no viene del mockup — que solo cubre móvil): a
 * partir de `lg` aparecen la navegación horizontal y la píldora de
 * WhatsApp, y el botón de menú desaparece. El quiebre es `lg` y no `md`
 * porque son seis enlaces más el logo más el CTA: a 768px entran, pero
 * apretados y sin aire entre ellos. Entre 768 y 1023px se usa el mismo
 * panel a pantalla completa que en el teléfono, que es lo que hace
 * cualquier sitio de este tamaño en tablet.
 *
 * El relleno horizontal sube por pasos (18px móvil → 32px → 64px) en vez de
 * saltar directo a los 64px de la retícula: 18px es el valor literal del
 * mockup, y 64px en una tablet dejaría el logo flotando lejos del borde.
 *
 * Logo: `public/logo-waiki-icono.png`. Recortado del original entregado por
 * la clienta (`imagenes-cliente/5-logo/logo-waiki-1.jpeg`, 540×540) — ese
 * archivo trae el nombre apilado sobre el ícono (mano + brote), que no sirve
 * tal cual en una barra horizontal; se aisló solo el ícono y se le quitó el
 * fondo blanco (umbral de color, sin IA de recorte). Vive en `public/`, no
 * en `content/images/`: es un activo de marca de un solo uso fijo, no
 * fotografía de contenido, así que no pasa por el pipeline del Bloque 2. Si
 * más adelante aparece el logo vectorial original (`ARCHITECTURE.md §13`),
 * reemplaza este PNG sin tocar el resto del componente.
 */

import Image from 'next/image';
import Link from 'next/link';
import MenuMovil from './MenuMovil';
import { enlaceTelefono, enlaceWhatsapp } from './whatsapp';
import { IconoWhatsapp } from '@/components/ui/iconos';
import { empresa } from '@/lib/contenido/empresa';

export default function Encabezado() {
  // Resueltos acá, en el servidor, y pasados como strings a `MenuMovil`
  // (cliente) — ver el comentario de `MenuMovilProps` en ese archivo.
  const hrefWhatsapp = enlaceWhatsapp();
  const hrefTelefono = enlaceTelefono();

  return (
    <header className="sticky top-0 z-30 border-b border-borde bg-superficie/94 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-sitio items-center justify-between px-[18px] py-3 md:px-8 lg:px-16">
        {/* `aria-label` explícito: sin él el nombre accesible del enlace es
            "Waiki Chile", que dice de quién es el sitio pero no a dónde
            lleva. Con lector de pantalla se anuncia "Waiki Chile, ir al
            inicio". Es la versión no visual del mismo problema que reportaron
            los usuarios y que resuelve el enlace "Inicio" del nav. */}
        <Link href="/" aria-label="Waiki Chile, ir al inicio" className="flex items-center gap-[9px]">
          <Image
            src="/logo-waiki-icono.png"
            alt=""
            width={217}
            height={330}
            className="h-[30px] w-auto"
            priority
          />
          {/* "Waiki" en Bitter y "Chile" en Archivo, más chico y tenue: el
              mockup trata el nombre como logotipo compuesto, no como una
              sola palabra. `items-baseline` alinea las dos familias por la
              línea de base y no por el alto de caja, que es lo que hace que
              se lean como una unidad pese al salto de tamaño. */}
          <span className="flex items-baseline font-titulos text-[21px] font-semibold tracking-[-0.01em] text-marca">
            Waiki
            <span className="ml-1 font-cuerpo text-[13px] font-normal tracking-normal text-texto-tenue">
              Chile
            </span>
          </span>
        </Link>

        {/* Navegación de escritorio + botón de menú móvil. Los dos viven en
            MenuMovil (cliente) porque ambos necesitan `usePathname()` para
            marcar la ruta activa. */}
        <MenuMovil
          telefono={empresa.telefono}
          hrefTelefono={hrefTelefono}
          hrefWhatsapp={hrefWhatsapp}
        />

        <a
          href={hrefWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center justify-center gap-2 rounded-full bg-secundario px-5 py-2.5 text-caption font-semibold text-claro transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca lg:inline-flex"
        >
          <IconoWhatsapp tamano={17} />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
