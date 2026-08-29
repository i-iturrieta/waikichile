/**
 * Carga y validación de la constante `Empresa` (ARCHITECTURE.md §3, tipo
 * `Empresa`; Bloque 5 de PHASE_1_PLAN.md, tarea 5.3).
 *
 * Sigue el mismo patrón que `lib/calculadora/calcular.ts` para
 * `content/calculadora/parametros.ts` (un solo objeto de configuración, no
 * una colección): `content/` no importa código (ARCHITECTURE.md §7), así
 * que `content/empresa.ts` solo tiene un import de tipo; la validación real
 * con Zod ocurre acá, una sola vez al cargar este módulo — si el contenido
 * quedara mal formado, esto lanza de inmediato al importar `empresa.ts`, no
 * en el sitio publicado (ARCHITECTURE.md §9, "Validación").
 *
 * El resto del proyecto (`Encabezado`, `Pie`, `BotonWhatsapp`, el JSON-LD de
 * `Organization`) importa `empresa` desde aquí, no directo de `content/`.
 */

import { empresaSchema } from './esquemas.ts';
import empresaCruda from '../../content/empresa.ts';

export const empresa = empresaSchema.parse(empresaCruda);
export type { Empresa, Redes } from './esquemas.ts';
