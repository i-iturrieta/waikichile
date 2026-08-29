/**
 * Carga de `PaginaProsa` desde Markdown (ARCHITECTURE.md §1.3, §3 "Páginas
 * de prosa", §7; Bloque 9 de PHASE_1_PLAN.md, tareas 9.5 y 9.6).
 *
 * Mismo mecanismo que `lib/contenido/blog.ts` (`gray-matter` + `marked`),
 * pero sin colección: solo dos archivos fijos, `content/paginas/nosotros.md`
 * y `content/paginas/garantia.md` (ARCHITECTURE.md §3: "Son páginas fijas,
 * no colección: no llevan listado ni ruta dinámica").
 *
 * ---------------------------------------------------------------------------
 * Por qué NO se aplica `filtrarPublicables` aquí — la tensión de la tarea 9.5
 * ---------------------------------------------------------------------------
 *
 * `filtrarPublicables` (`lib/contenido/cargar.ts`) existe para omitir
 * *elementos de una colección* cuando `borrador: true` (decisión 1.6): con
 * `SITIO_PRODUCCION=true`, un producto o una pregunta en borrador
 * desaparece de la lista y ninguna otra página se rompe, porque hay otros
 * elementos y otras páginas alrededor.
 *
 * `nosotros.md` y `garantia.md` no son elementos de una colección: cada uno
 * *es* la página entera de una ruta fija (`/nosotros/`, `/garantia/`). Si se
 * les aplicara el mismo filtro, `garantia.md` (que hoy tiene `borrador:
 * true` — ver el comentario de cabecera de ese archivo) desaparecería del
 * todo en producción, y `/garantia/` quedaría sin contenido que mostrar. Eso
 * contradice directamente PHASE_1_PLAN.md, tarea 9.5: *"Si el contenido está
 * `borrador`, la página muestra un texto breve que remite a contacto en vez
 * de condiciones inventadas"* — la página debe existir siempre; lo que
 * cambia con `borrador` es qué tan específico puede ser su contenido, no si
 * se publica.
 *
 * La resolución: `paginaNosotros` y `paginaGarantia` se cargan y exportan
 * siempre, sin pasar por `filtrarPublicables`. El campo `borrador` de cada
 * una sigue siendo información real — documenta que el contenido de fondo
 * (plazos y condiciones específicas de garantía) sigue pendiente de
 * confirmación de la clienta — pero quien decide qué se ve en pantalla es el
 * propio cuerpo del Markdown, no un mecanismo de omisión automática. El
 * cuerpo de `garantia.md` ya fue escrito en el Bloque 3b exactamente para
 * ser ese "texto breve que remite a contacto": no contiene ningún plazo en
 * meses ni ninguna condición específica, así que `app/garantia/page.tsx`
 * puede renderizar `paginaGarantia.html` sin condicionales adicionales y
 * cumple la tarea 9.5 con el contenido tal como está. Un editor futuro que
 * agregue una cifra específica a ese cuerpo mientras `borrador` siga en
 * `true` sería un error de contenido, no de código — pero no es un error que
 * este cargador pueda detectar (no hay forma automática de saber si un
 * párrafo "inventa una condición"), así que sigue dependiendo de la
 * disciplina que ya documenta ARCHITECTURE.md §1.6.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { paginaProsaSchema, type PaginaProsa } from './esquemas.ts';
import { cargarColeccion } from './cargar.ts';

export interface PaginaProsaCargada extends PaginaProsa {
  /** Cuerpo ya convertido de Markdown a HTML. */
  html: string;
}

const DIR_PAGINAS = join(process.cwd(), 'content', 'paginas');

/**
 * Parsea y valida una página a partir de su contenido crudo (frontmatter +
 * cuerpo Markdown). Función pura, sin tocar el sistema de archivos — igual
 * que `parsearArticulo` en `blog.ts`, para poder probarla con strings de
 * prueba sin crear archivos en `content/paginas/`.
 */
export function parsearPagina(nombreArchivo: string, contenidoCrudo: string): PaginaProsaCargada {
  const { data, content } = matter(contenidoCrudo);
  const [validado] = cargarColeccion(`paginas/${nombreArchivo}`, paginaProsaSchema, [data]);
  return { ...validado, html: marked.parse(content, { async: false }) as string };
}

function cargarArchivo(nombreArchivo: string): PaginaProsaCargada {
  const contenidoCrudo = readFileSync(join(DIR_PAGINAS, nombreArchivo), 'utf8');
  return parsearPagina(nombreArchivo, contenidoCrudo);
}

/**
 * Siempre cargada, sin filtrar por `borrador` — ver el comentario de
 * cabecera de este archivo. `app/nosotros/page.tsx` la consume tal cual.
 */
export const paginaNosotros: PaginaProsaCargada = cargarArchivo('nosotros.md');

/**
 * Siempre cargada, sin filtrar por `borrador` — ver el comentario de
 * cabecera de este archivo. Hoy `borrador: true` (plazo de garantía
 * pendiente de confirmación), pero `app/garantia/page.tsx` la renderiza
 * igual: el cuerpo ya es el texto genérico que la tarea 9.5 pide.
 */
export const paginaGarantia: PaginaProsaCargada = cargarArchivo('garantia.md');
