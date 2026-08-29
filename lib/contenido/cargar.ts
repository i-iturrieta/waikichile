/**
 * Cargador genérico de contenido (ARCHITECTURE.md §2, §3; Bloque 3 de
 * PHASE_1_PLAN.md, tarea 3.2).
 *
 * Dos responsabilidades separadas:
 *
 * 1. `cargarColeccion` / `filtrarPublicables`: validar y filtrar, puras,
 *    sin tocar el sistema de archivos. Fáciles de testear con datos
 *    sintéticos.
 * 2. `importarModuloContenido` / `importarModulosDirectorio`: leer los
 *    módulos reales desde `content/` con `fs` + `import()` dinámico.
 *
 * La separación importa porque el Bloque 3 (este) construye los cargadores
 * sin que el Bloque 3b (contenido real) haya corrido todavía: `content/`
 * está vacío salvo por `.gitkeep`. Las funciones de lectura de archivo
 * devuelven `[]`/`undefined` cuando el archivo o directorio no existe en
 * vez de lanzar, para que cada colección "funcione con la colección vacía"
 * tal como piden los "Done when" de 3.3-3.6.
 */

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { z } from 'zod';

// ---------------------------------------------------------------------------
// Validación y filtrado (puro)
// ---------------------------------------------------------------------------

/**
 * Valida cada elemento de `datos` contra `schema`. Si alguno falla, lanza un
 * `Error` que nombra la colección (`nombre`), el índice del elemento y el
 * campo que falló — para que un error de contenido señale exactamente dónde
 * mirar en vez de un mensaje genérico de Zod.
 */
export function cargarColeccion<Schema extends z.ZodTypeAny>(
  nombre: string,
  schema: Schema,
  datos: unknown[]
): z.infer<Schema>[] {
  return datos.map((item, indice) => {
    const resultado = schema.safeParse(item);
    if (!resultado.success) {
      const detalles = resultado.error.issues
        .map((issue) => `${issue.path.length > 0 ? issue.path.join('.') : '(raíz)'}: ${issue.message}`)
        .join('; ');
      throw new Error(`[contenido] ${nombre}[${indice}]: ${detalles}`);
    }
    return resultado.data as z.infer<Schema>;
  });
}

/**
 * En producción (`SITIO_PRODUCCION === 'true'`) descarta los elementos con
 * `borrador: true`. En cualquier otro caso (desarrollo, o la variable sin
 * definir) devuelve todo — el contenido en borrador se renderiza igual para
 * poder revisar el diseño con volumen realista (ARCHITECTURE.md §1.6).
 */
export function filtrarPublicables<T extends { borrador: boolean }>(items: T[]): T[] {
  const produccion = process.env.SITIO_PRODUCCION === 'true';
  if (!produccion) return items;
  return items.filter((item) => !item.borrador);
}

// ---------------------------------------------------------------------------
// Lectura de módulos de `content/` (I/O)
// ---------------------------------------------------------------------------

const RAIZ_CONTENT = () => join(process.cwd(), 'content');

/**
 * Importa dinámicamente `content/{rutaRelativa}` (p. ej. `'faq.ts'`,
 * `'resenas.ts'`) y devuelve su `export default`. Si el archivo no existe
 * todavía, devuelve `undefined` en vez de lanzar — el contenido de ese
 * módulo lo puebla el Bloque 3b, del turno siguiente.
 *
 * `/* webpackIgnore: true *\/` `/* turbopackIgnore: true *\/` (Bloque 6,
 * tarea 6.3 — bug encontrado, no una decisión de arquitectura nueva): el
 * especificador de `import()` es una URL `file://` calculada enteramente en
 * runtime (`fs.readdirSync` + `pathToFileURL`), sin ningún prefijo literal
 * que el bundler pueda analizar estáticamente. Next.js/Turbopack necesita
 * poder enumerar los módulos posibles de un `import()` dinámico para
 * empaquetarlo; cuando no puede, en vez de dejarlo como un `import()` real
 * de Node (que es como ya funcionaba al ejecutar `scripts/reporte-contenido.ts`
 * directo con `node`), lanza `Error: Cannot find module as expression is too
 * dynamic` al "collect page data" — recién visible ahora porque el Bloque 6
 * es el primer bloque que importa `productos`/`resenas` (vía este cargador)
 * dentro de un componente que Next.js empaqueta para una página real. Los
 * comentarios mágicos le dicen a ambos bundlers (webpack y Turbopack, que
 * comparten la convención) que dejen el `import()` intacto y lo resuelvan en
 * runtime — que es exactamente el comportamiento original que este archivo
 * ya asumía.
 */
export async function importarModuloContenido(rutaRelativa: string): Promise<unknown> {
  const ruta = join(RAIZ_CONTENT(), rutaRelativa);
  if (!existsSync(ruta)) return undefined;
  const modulo = (await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ pathToFileURL(ruta).href)) as {
    default?: unknown;
  };
  return modulo.default;
}

/**
 * Importa dinámicamente cada archivo `.ts` dentro de `content/{directorioRelativo}`
 * (un objeto de contenido por archivo, vía `export default`) y devuelve la
 * lista de sus exports, en orden alfabético de nombre de archivo. Si el
 * directorio no existe o no tiene archivos `.ts` (solo `.gitkeep`, por
 * ejemplo), devuelve `[]`.
 */
export async function importarModulosDirectorio(directorioRelativo: string): Promise<unknown[]> {
  const dir = join(RAIZ_CONTENT(), directorioRelativo);
  let archivos: string[];
  try {
    archivos = readdirSync(dir)
      .filter((archivo) => archivo.endsWith('.ts'))
      .sort();
  } catch {
    return [];
  }

  // Mismos comentarios mágicos que `importarModuloContenido` y por la misma
  // razón — ver ese comentario de cabecera.
  const modulos: unknown[] = [];
  for (const archivo of archivos) {
    const modulo = (await import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ pathToFileURL(join(dir, archivo)).href
    )) as { default?: unknown };
    if (modulo.default !== undefined) modulos.push(modulo.default);
  }
  return modulos;
}
