/**
 * `Tarjeta` — primitiva de UI (ARCHITECTURE.md §7; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.1).
 *
 * Contenedor con `--radius-tarjeta` y sombra. Dos niveles, los mismos que
 * documenta el comentario de sombras de `app/globals.css`: `shadow-sm` por
 * defecto (tarjetas de producto/instalación) y `elevada` sube a
 * `shadow-md` (imagen principal de ficha / paneles destacados).
 */

import type { ElementType, ReactNode } from 'react';

interface TarjetaProps {
  as?: ElementType;
  /** `true` usa `shadow-md` en vez de `shadow-sm` — para el elemento
   * destacado de una sección, no para tarjetas de listado repetidas. */
  elevada?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Tarjeta({ as: Etiqueta = 'div', elevada = false, children, className }: TarjetaProps) {
  const clase = [
    'rounded-tarjeta border border-borde bg-superficie-alta',
    elevada ? 'shadow-md' : 'shadow-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <Etiqueta className={clase}>{children}</Etiqueta>;
}
