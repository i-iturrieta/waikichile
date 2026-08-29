/**
 * Los valores planos de los enums de contenido (`ZONA`, `TIPO_LENA`,
 * `TEMA_FAQ`), separados de `lib/contenido/esquemas.ts` a propósito
 * (Bloque 11 de PHASE_1_PLAN.md, tarea 11.7 — auditoría Lighthouse).
 *
 * `esquemas.ts` sigue siendo la fuente de verdad de los esquemas Zod
 * (`zonaSchema = z.enum(ZONA)`, etc., construidos a partir de estos mismos
 * arreglos) — este archivo no la duplica, la aísla. La razón: `esquemas.ts`
 * importa `zod` y define ahí los ~15 esquemas de todo el modelo de
 * contenido (Producto, Accesorio, Instalacion, Resena, Contacto...) en un
 * solo módulo. Un módulo ES ejecuta todas sus sentencias de nivel superior
 * una vez al cargarlo, sin importar qué export puntual se pidió — así que
 * cualquier import desde `esquemas.ts`, aunque sea solo de `ZONA`, arrastra
 * los ~15 esquemas completos.
 *
 * Eso es exactamente lo que hacía `components/calculadora/Formulario.tsx`
 * (`"use client"`, se empaqueta para el navegador): importaba `TIPO_LENA` y
 * `ZONA` directo de `esquemas.ts` solo para armar el selector del
 * formulario, sin necesitar validar nada ahí. El resultado: el bundle del
 * cliente de `/calculadora/` cargaba `zod` completo más los ~15 esquemas
 * del sitio. Lighthouse móvil medía 71 KiB de JavaScript sin usar (81.6%
 * de un chunk de 62.8 KiB) y 420 ms de "Total Blocking Time" — Performance
 * caía a 85/100, bajo el umbral de 90 de la tarea 11.7.
 *
 * Este archivo es el que debe importar cualquier código — especialmente
 * código que se empaqueta para el cliente — que solo necesita los valores o
 * los tipos, no la validación Zod. `esquemas.ts` sigue siendo la fuente
 * correcta para quien sí necesita el esquema (`zonaSchema.parse(...)`, etc.).
 */

export const TEMA_FAQ = ['uso', 'consumo', 'mantencion', 'garantia', 'instalacion', 'normativa'] as const;
export type TemaFAQ = (typeof TEMA_FAQ)[number];

export const ZONA = ['centro-sur', 'araucania-los-rios', 'los-lagos-chiloe', 'austral'] as const;
export type Zona = (typeof ZONA)[number];

export const TIPO_LENA = ['seca-certificada', 'humeda'] as const;
export type TipoLena = (typeof TIPO_LENA)[number];
