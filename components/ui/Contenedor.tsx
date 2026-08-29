/**
 * `Contenedor` — primitiva de UI (ARCHITECTURE.md §7; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.1).
 *
 * Ancho máximo y padding horizontal. `app/globals.css` documenta el patrón
 * `mx-auto max-w-sitio px-16` (64px, el margen del mockup de la dirección
 * visual elegida), pero 64px fijos desbordan en pantallas angostas: baja a
 * `px-6` (24px) por defecto y solo sube a `px-16` desde el quiebre `md`.
 */

import type { ElementType, ReactNode } from 'react';

interface ContenedorProps {
  /** Etiqueta HTML a usar (`div` por defecto). Útil para `<section>`,
   * `<header>` interno, etc. sin envolver en un `<div>` extra. */
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export default function Contenedor({ as: Etiqueta = 'div', children, className }: ContenedorProps) {
  const clase = ['mx-auto max-w-sitio px-6 md:px-16', className].filter(Boolean).join(' ');
  return <Etiqueta className={clase}>{children}</Etiqueta>;
}
