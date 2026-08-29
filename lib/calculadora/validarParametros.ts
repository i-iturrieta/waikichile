/**
 * Valida `content/calculadora/parametros.ts` contra
 * `parametrosCalculadoraSchema` (ARCHITECTURE.md §3 "ParametrosCalculadora";
 * Bloque 7 de PHASE_1_PLAN.md, tarea 7.1: "Done when: los parámetros cargan
 * validados").
 *
 * Vive separado de `lib/calculadora/calcular.ts` a propósito (Bloque 11,
 * tarea 11.7 — auditoría Lighthouse): `calcular.ts` lo importa
 * `components/calculadora/Formulario.tsx` (`"use client"`), así que
 * cualquier módulo que `calcular.ts` importara se empaquetaría para el
 * navegador y se re-ejecutaría en cada visita. Antes, la llamada a
 * `parametrosCalculadoraSchema.parse` vivía justo ahí y arrastraba `zod`
 * completo al bundle del cliente solo para revalidar en el navegador datos
 * que ya se validaron al construir el sitio — Lighthouse móvil medía 420 ms
 * de "Total Blocking Time" en `/calculadora/`, la mayor parte en esa
 * ejecución repetida, y Performance caía a 85/100 (bajo el umbral de 90).
 *
 * Este archivo aísla la validación en un módulo que **solo** importa
 * `app/calculadora/page.tsx` (Server Component sin `"use client"`): Next.js
 * nunca empaqueta el código de un Server Component para el cliente, así que
 * esto corre una sola vez, durante `next build` (o `next dev`), y nunca en
 * el navegador de una visitante. La garantía original — "un error de
 * contenido rompe el build" — se mantiene igual: si
 * `content/calculadora/parametros.ts` alguna vez queda mal formado, este
 * módulo lanza al importarse, y como `page.tsx` se evalúa siempre al
 * generar `/calculadora/`, el build sigue rompiendo.
 *
 * `lib/calculadora/calcular.ts` ya no revalida: usa `parametrosCrudos`
 * directo, tipado como `ParametrosCalculadora` desde su propio archivo
 * (`import type`, sin costo de runtime), confiando en que este módulo ya lo
 * comprobó.
 */

import { parametrosCalculadoraSchema } from '../contenido/esquemas.ts';
import parametrosCrudos from '../../content/calculadora/parametros.ts';

// Efecto de import: lanza si el contenido no calza con el esquema. No se
// exporta el resultado — `calcular.ts` ya tiene su propia copia tipada de
// los mismos datos; este módulo solo se importa por el efecto de la
// validación (`import '@/lib/calculadora/validarParametros'` en
// `app/calculadora/page.tsx`).
parametrosCalculadoraSchema.parse(parametrosCrudos);
