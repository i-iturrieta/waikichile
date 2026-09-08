/**
 * Carga y validación de `CondicionesComerciales` (08-09-2026).
 *
 * Mismo patrón que `lib/contenido/empresa.ts` y que
 * `lib/calculadora/calcular.ts`: una constante única, no una colección.
 * `content/` no importa código (ARCHITECTURE.md §7), así que la validación
 * con Zod ocurre acá, una sola vez al cargar este módulo — si el contenido
 * quedara mal formado, esto lanza al importar, no en el sitio publicado.
 *
 * `borrador` se respeta con el criterio de siempre (`filtrarPublicables`):
 * en producción, unas condiciones en borrador dejan de mostrarse y el bloque
 * "Cómo se compra" simplemente no aparece — nunca un bloque a medias. Por eso
 * se exporta `condicionesComerciales` como **nullable**: quien lo consume
 * tiene que decidir explícitamente qué hacer cuando no hay nada que mostrar,
 * en vez de renderizar campos vacíos sin darse cuenta.
 */

import { condicionesComercialesSchema, type CondicionesComerciales } from './esquemas.ts';
import { filtrarPublicables } from './cargar.ts';
import condicionesCrudas from '../../content/condiciones-comerciales.ts';

const validadas = condicionesComercialesSchema.parse(condicionesCrudas);

/** `null` cuando están en borrador y el entorno es producción. */
export const condicionesComerciales: CondicionesComerciales | null =
  filtrarPublicables([validadas])[0] ?? null;

export type { CondicionesComerciales } from './esquemas.ts';
