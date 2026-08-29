/**
 * Página de la calculadora de consumo (ARCHITECTURE.md §4, ruta
 * `/calculadora/`; Bloque 7 de PHASE_1_PLAN.md, tarea 7.4).
 *
 * Server component (sin `"use client"`): el formulario mismo es la única
 * isla de cliente (`components/calculadora/Formulario.tsx`). Esta página
 * no tiene números propios — pero desde la tarea 11.7 (Bloque 11, auditoría
 * Lighthouse) sí dispara la validación de
 * `content/calculadora/parametros.ts` (el import de efecto de abajo): tiene
 * que ser aquí, un Server Component, y no dentro de `lib/calculadora/
 * calcular.ts` como antes, porque `calcular.ts` lo importa el formulario
 * cliente — ver `lib/calculadora/validarParametros.ts` para el porqué
 * completo.
 *
 * Metadata vía `construirMetadata` (Bloque 11, tarea 11.1). El título ya no
 * incluye "| Waiki Chile" a mano como antes de este bloque: el `template`
 * de `app/layout.tsx` lo agrega solo, y dejarlo también acá lo habría
 * duplicado en la pestaña del navegador ("Calculadora de consumo | Waiki
 * Chile | Waiki Chile").
 */

import type { Metadata } from 'next';
import Formulario from '@/components/calculadora/Formulario';
import { construirMetadata } from '@/lib/seo/metadata';
// Import de efecto, no de valor: valida `content/calculadora/parametros.ts`
// al cargar este Server Component (build/dev), nunca en el navegador. Ver
// `lib/calculadora/validarParametros.ts`.
import '@/lib/calculadora/validarParametros';

export const metadata: Metadata = construirMetadata({
  titulo: 'Calculadora de consumo',
  descripcion:
    'Compara el costo de calefaccionar con pellet Waiki contra leña, para la misma demanda de calor, según tu superficie y zona.',
  ruta: '/calculadora/',
});

export default function PaginaCalculadora() {
  return <Formulario />;
}
