/**
 * `Boton` — primitiva de UI (ARCHITECTURE.md §7: "`components/ui/` no
 * conoce el dominio. Si un componente de `ui/` menciona 'producto' o
 * 'pellet', está en el directorio equivocado"; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.1).
 *
 * Variantes: `primario` (relleno, color de marca), `secundario` (contorno),
 * `texto` (sin relleno ni borde, como un enlace con énfasis). Tamaños:
 * `sm`, `md` (por defecto), `lg`.
 *
 * Un solo componente sirve para "ir a" y "hacer algo": si recibe `href` se
 * renderiza como enlace (`next/link` para rutas internas que empiezan con
 * `/`, `<a>` normal para externas/`mailto:`/`tel:`); si no, como
 * `<button>`. Evita duplicar los estilos de variante/tamaño en dos
 * componentes separados.
 */

import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type BotonVariante = 'primario' | 'secundario' | 'texto';
export type BotonTamano = 'sm' | 'md' | 'lg';

interface BotonPropsComunes {
  variante?: BotonVariante;
  tamano?: BotonTamano;
  className?: string;
  children: ReactNode;
}

type BotonPropsEnlace = BotonPropsComunes &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & { href: string };

type BotonPropsBoton = BotonPropsComunes &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };

export type BotonProps = BotonPropsEnlace | BotonPropsBoton;

const ESTILOS_BASE =
  'inline-flex items-center justify-center gap-2 rounded-boton font-cuerpo font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca disabled:opacity-50 disabled:pointer-events-none';

const ESTILOS_VARIANTE: Record<BotonVariante, string> = {
  primario: 'bg-marca text-superficie shadow-sm hover:opacity-90',
  secundario: 'border border-marca text-marca hover:bg-marca/10',
  texto: 'text-marca underline-offset-4 hover:underline',
};

// Relleno + tamaño de fuente para `primario`/`secundario`. La variante
// `texto` reutiliza solo el tamaño de fuente (`TEXTO_FUENTE`), sin relleno:
// con padding se vería como un botón fantasma en vez de un enlace con
// énfasis.
const ESTILOS_TAMANO: Record<BotonTamano, string> = {
  sm: 'px-4 py-2 text-caption',
  md: 'px-6 py-3 text-cuerpo',
  lg: 'px-8 py-4 text-destacado',
};

const TEXTO_FUENTE: Record<BotonTamano, string> = {
  sm: 'text-caption',
  md: 'text-cuerpo',
  lg: 'text-destacado',
};

function construirClases(variante: BotonVariante, tamano: BotonTamano, className?: string): string {
  const tamanoClases = variante === 'texto' ? TEXTO_FUENTE[tamano] : ESTILOS_TAMANO[tamano];
  return [ESTILOS_BASE, ESTILOS_VARIANTE[variante], tamanoClases, className].filter(Boolean).join(' ');
}

export default function Boton({
  variante = 'primario',
  tamano = 'md',
  className,
  children,
  href,
  ...resto
}: BotonProps) {
  const clase = construirClases(variante, tamano, className);

  if (href !== undefined) {
    const esInterna = href.startsWith('/') || href.startsWith('#');
    if (esInterna) {
      return (
        <Link href={href} className={clase} {...(resto as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={clase} {...(resto as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={clase} {...(resto as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
