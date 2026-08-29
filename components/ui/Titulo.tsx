/**
 * `Titulo` — primitiva de UI (ARCHITECTURE.md §7; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.1).
 *
 * Niveles 1-4 mapeados a la escala tipográfica de `app/globals.css` (tarea
 * 4.3): 1→`text-h1`, 2→`text-h2`, 3→`text-h3`, 4→`text-destacado`. Los
 * cuatro con `font-titulos` (Bitter). El `nivel` decide también la
 * etiqueta HTML (`h1`..`h4`): semántica y estilo van juntos a propósito,
 * para que un `<h4>` no termine con las clases de un `<h1>` por accidente
 * de copiar/pegar.
 */

import type { ReactNode } from 'react';

export type NivelTitulo = 1 | 2 | 3 | 4;

interface TituloProps {
  nivel: NivelTitulo;
  children: ReactNode;
  className?: string;
}

const ESTILOS: Record<NivelTitulo, string> = {
  1: 'text-h1 font-semibold',
  2: 'text-h2 font-semibold',
  3: 'text-h3 font-medium',
  4: 'text-destacado font-semibold',
};

const ETIQUETAS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const;

export default function Titulo({ nivel, children, className }: TituloProps) {
  const Etiqueta = ETIQUETAS[nivel];
  const clase = ['font-titulos', ESTILOS[nivel], className].filter(Boolean).join(' ');
  return <Etiqueta className={clase}>{children}</Etiqueta>;
}
