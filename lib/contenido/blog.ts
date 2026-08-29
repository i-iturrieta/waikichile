/**
 * Carga de `ArticuloBlog` desde Markdown (ARCHITECTURE.md §1.3, §3, §7;
 * Bloque 3 de PHASE_1_PLAN.md, tarea 3.6). `gray-matter` separa frontmatter
 * de cuerpo; `marked` convierte el cuerpo a HTML. MDX se descartó
 * explícitamente (ARCHITECTURE.md §1.3): Markdown plano, sin componentes.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { articuloBlogSchema, type ArticuloBlog } from './esquemas.ts';
import { cargarColeccion } from './cargar.ts';

export interface ArticuloBlogCargado extends ArticuloBlog {
  /** Cuerpo ya convertido de Markdown a HTML. */
  html: string;
}

const DIR_BLOG = join(process.cwd(), 'content', 'blog');

/**
 * `gray-matter` usa `js-yaml`, que interpreta una fecha YAML sin comillas
 * (`fecha: 2026-01-15`) como un objeto `Date`, no como el string que espera
 * `articuloBlogSchema` (`z.iso.date()`, formato `YYYY-MM-DD`). Se normaliza
 * antes de validar para que ambos estilos de frontmatter — con o sin
 * comillas — funcionen igual. Verificado empíricamente: `fecha: 2026-01-15`
 * llega como `Date` a medianoche UTC; `fecha: "2026-01-15"` llega como
 * string tal cual.
 */
function normalizarFecha(valor: unknown): unknown {
  if (valor instanceof Date) return valor.toISOString().slice(0, 10);
  return valor;
}

/**
 * Parsea y valida un artículo a partir de su contenido crudo (frontmatter +
 * cuerpo Markdown). Función pura, sin tocar el sistema de archivos — así se
 * puede probar con strings de prueba sin crear archivos en `content/blog/`.
 */
export function parsearArticulo(nombreArchivo: string, contenidoCrudo: string): ArticuloBlogCargado {
  const { data, content } = matter(contenidoCrudo);
  const frontmatterNormalizado = {
    ...data,
    fecha: normalizarFecha(data.fecha),
    actualizado: normalizarFecha(data.actualizado),
  };
  const [validado] = cargarColeccion(`blog/${nombreArchivo}`, articuloBlogSchema, [frontmatterNormalizado]);
  return { ...validado, html: marked.parse(content, { async: false }) as string };
}

function listarArchivosMarkdown(): string[] {
  try {
    return readdirSync(DIR_BLOG)
      .filter((archivo) => archivo.endsWith('.md'))
      .sort();
  } catch {
    return [];
  }
}

function porFechaDescendente(a: ArticuloBlogCargado, b: ArticuloBlogCargado): number {
  return a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0;
}

function cargarTodos(): ArticuloBlogCargado[] {
  const articulos = listarArchivosMarkdown().map((archivo) => {
    const contenidoCrudo = readFileSync(join(DIR_BLOG, archivo), 'utf8');
    return parsearArticulo(archivo, contenidoCrudo);
  });
  return articulos.sort(porFechaDescendente);
}

/**
 * Todos los artículos válidos, incluidos los `publicado: false` — para
 * `scripts/reporte-contenido.ts` (3.7).
 */
const todosLosArticulos: ArticuloBlogCargado[] = cargarTodos();

export function obtenerTodosLosArticulos(): ArticuloBlogCargado[] {
  return todosLosArticulos;
}

// Publicado, no borrador (ver nota en esquemas.ts): se descartan los
// artículos con `publicado: false` incondicionalmente — a diferencia de
// `borrador`, este campo no distingue desarrollo de producción.
const articulosCargados: ArticuloBlogCargado[] = todosLosArticulos.filter((articulo) => articulo.publicado);

export function obtenerArticulos(): ArticuloBlogCargado[] {
  return articulosCargados;
}

export function obtenerArticulo(slug: string): ArticuloBlogCargado | undefined {
  return articulosCargados.find((articulo) => articulo.slug === slug);
}

export function obtenerSlugsArticulos(): string[] {
  return articulosCargados.map((articulo) => articulo.slug);
}
