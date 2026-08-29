/**
 * Guardia contra la marca vieja (ARCHITECTURE.md §9 "Ortografía de marca",
 * §11; Bloque 3 de PHASE_1_PLAN.md, tarea 3.8).
 *
 * Recorre `content/`, `app/` y `components/` y falla si aparece
 * "ecopelletsur" (sin distinguir mayúsculas) o "wikái"/"wikai" en cualquier
 * archivo de texto.
 *
 * `public/_redirects` es la única excepción prevista por el plan — ahí
 * "wikái" va a aparecer legítimamente en las redirecciones 301 desde las
 * URLs viejas (Bloque 11). No hace falta excluirlo explícitamente aquí
 * porque `public/` no es uno de los tres árboles recorridos: ni esta
 * guardia ni el criterio de aceptación de la fase
 * (`rg -i ecopelletsur content/ app/ components/`, PHASE_1_PLAN.md
 * "Criterios de aceptación") tocan `public/`. Si algún día se amplía el
 * recorrido para incluir `public/`, `_redirects` debe seguir excluido por
 * nombre.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const RAIZ = process.cwd();
const DIRECTORIOS_A_REVISAR = ['content', 'app', 'components'];

// Extensiones de texto: basta con lo que puede contener prosa o código del
// sitio. Las imágenes de content/images/ (.jpg) se excluyen a propósito —
// son binarios, no texto, y no es donde viviría un error de ortografía de
// marca.
const EXTENSIONES_TEXTO = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.mdx', '.json', '.css', '.txt', '.html', '.svg']);

const PATRON_ECOPELLETSUR = /ecopelletsur/i;
// Cubre "wikai" y "wikái" (con o sin tilde), sin distinguir mayúsculas.
// No confunde con "Waiki" (orden de letras distinto: w-a-i-k-i vs w-i-k-a-i).
const PATRON_WIKAI = /wik[aá]i/i;

interface Hallazgo {
  archivo: string;
  patron: string;
}

function listarArchivos(dir: string): string[] {
  let entradas: string[];
  try {
    entradas = readdirSync(dir);
  } catch {
    return [];
  }
  const resultado: string[] = [];
  for (const entrada of entradas) {
    const ruta = join(dir, entrada);
    const info = statSync(ruta);
    if (info.isDirectory()) {
      resultado.push(...listarArchivos(ruta));
    } else {
      resultado.push(ruta);
    }
  }
  return resultado;
}

function extension(archivo: string): string {
  const punto = archivo.lastIndexOf('.');
  return punto === -1 ? '' : archivo.slice(punto).toLowerCase();
}

function buscarHallazgos(): Hallazgo[] {
  const hallazgos: Hallazgo[] = [];
  for (const directorio of DIRECTORIOS_A_REVISAR) {
    const raizDirectorio = join(RAIZ, directorio);
    for (const archivo of listarArchivos(raizDirectorio)) {
      if (!EXTENSIONES_TEXTO.has(extension(archivo))) continue;
      const contenido = readFileSync(archivo, 'utf8');
      const rutaRelativa = relative(RAIZ, archivo).split('\\').join('/');
      if (PATRON_ECOPELLETSUR.test(contenido)) {
        hallazgos.push({ archivo: rutaRelativa, patron: 'ecopelletsur' });
      }
      if (PATRON_WIKAI.test(contenido)) {
        hallazgos.push({ archivo: rutaRelativa, patron: 'wikái/wikai' });
      }
    }
  }
  return hallazgos;
}

describe('guardia contra la marca vieja', () => {
  it('no aparece "ecopelletsur" ni "wikái"/"wikai" en content/, app/ o components/', () => {
    const hallazgos = buscarHallazgos();
    if (hallazgos.length > 0) {
      const detalle = hallazgos.map((h) => `  - ${h.archivo}: contiene "${h.patron}"`).join('\n');
      throw new Error(`Marca vieja encontrada:\n${detalle}`);
    }
    expect(hallazgos).toEqual([]);
  });
});
