/**
 * Íconos del sitio — primitivas de UI (ARCHITECTURE.md §7: `components/ui/`
 * no conoce el dominio).
 *
 * Ronda 05-09-2026 ("Home Movil A" de Claude Design). El mockup usa siete
 * SVG inline y varios se repiten hasta cuatro veces en la misma página (el
 * check de la franja oscura ×3, WhatsApp en el menú, en "Hablemos" y en la
 * barra fija, la estrella ×5 por reseña). Copiar el `<path>` en cada lugar
 * es lo que hace el HTML exportado del diseño; acá se centralizan para que
 * cambiar un trazo sea un solo edit y no una cacería.
 *
 * No se instala una librería de íconos (lucide, heroicons): son siete
 * formas fijas, ya dibujadas en el mockup, y una dependencia nueva para
 * eso es más superficie de la que el proyecto necesita — mismo criterio que
 * `app/globals.css` ya aplicó al descartar `@tailwindcss/typography`.
 *
 * Todos son decorativos: `aria-hidden` por defecto. El significado siempre
 * lo aporta el texto que acompaña al ícono, o el `aria-label` del control
 * que lo contiene (los botones de menú y el enlace de WhatsApp de la barra
 * fija lo traen). Si alguna vez uno tuviera que ser el único portador de
 * significado, hay que pasarle `aria-hidden={false}` y un `<title>`.
 */

import type { SVGProps } from 'react';

interface PropsIcono extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /** Lado del cuadro en px. El mockup especifica tamaños distintos por
   * contexto (14, 15, 19, 20, 22, 24), así que no hay un valor "correcto"
   * único — 20 es solo el más frecuente. */
  tamano?: number;
}

function propsBase({ tamano = 20, ...resto }: PropsIcono) {
  return {
    width: tamano,
    height: tamano,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    ...resto,
  } as const;
}

/** Visto — viñetas de la franja de puntos clave. Trazo, hereda `stroke`. */
export function IconoCheck(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Estrella llena — calificación de reseñas. Relleno, hereda `fill`. */
export function IconoEstrella(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

/** Logotipo de WhatsApp. Relleno, hereda `fill`. */
export function IconoWhatsapp(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.53 1.36 5.07L2 22l5.19-1.44a9.87 9.87 0 0 0 4.85 1.27h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.37-.44.5-.15.15-.31.31-.13.6.18.29.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.47 1.53.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
    </svg>
  );
}

/** Tarjeta bancaria — acompaña la mención de Mercado Pago. */
export function IconoTarjeta(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <path d="M2 10h20" />
    </svg>
  );
}

/** Flecha a la derecha — pista de arrastre del carrusel, enlaces "seguir". */
export function IconoFlecha(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Hamburguesa — abrir el menú móvil. */
export function IconoMenu(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Aspa — cerrar el menú móvil. */
export function IconoCerrar(props: PropsIcono) {
  return (
    <svg {...propsBase(props)} fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
