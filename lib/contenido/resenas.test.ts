/**
 * Test de `lib/contenido/resenas.ts` (Bloque 3 de PHASE_1_PLAN.md, tarea
 * 3.5). "Done when: un test confirma que una reseña con `autorizada: false`
 * no aparece en la salida ni en desarrollo."
 *
 * No depende de `content/resenas.ts` (no existe todavía, llega en el
 * Bloque 3b): prueba `filtrarAutorizadas` directamente con datos sintéticos,
 * combinado con `filtrarPublicables` para cubrir también el caso de
 * producción.
 */

import { afterEach, describe, expect, it } from 'vitest';
import { filtrarPublicables } from './cargar.ts';
import { filtrarAutorizadas, resenas } from './resenas.ts';
import type { Resena } from './esquemas.ts';

const resenaNoAutorizada: Resena = {
  autor: 'Alguien',
  fecha: '2024-05-01',
  calificacion: 5,
  titulo: 'Buena estufa',
  cuerpo: 'Cuerpo de la reseña.',
  autorizada: false,
  borrador: false,
};

const resenaAutorizada: Resena = { ...resenaNoAutorizada, autor: 'Otra persona', autorizada: true };

describe('filtrarAutorizadas', () => {
  it('descarta las reseñas con autorizada: false', () => {
    expect(filtrarAutorizadas([resenaNoAutorizada, resenaAutorizada])).toEqual([resenaAutorizada]);
  });
});

describe('resenas: autorizada no es lo mismo que borrador', () => {
  const valorOriginal = process.env.SITIO_PRODUCCION;
  afterEach(() => {
    if (valorOriginal === undefined) delete process.env.SITIO_PRODUCCION;
    else process.env.SITIO_PRODUCCION = valorOriginal;
  });

  it('en desarrollo (sin SITIO_PRODUCCION), una reseña no autorizada no aparece igual', () => {
    delete process.env.SITIO_PRODUCCION;
    const resultado = filtrarPublicables(filtrarAutorizadas([resenaNoAutorizada]));
    expect(resultado).toEqual([]);
  });

  it('en producción tampoco aparece', () => {
    process.env.SITIO_PRODUCCION = 'true';
    const resultado = filtrarPublicables(filtrarAutorizadas([resenaNoAutorizada]));
    expect(resultado).toEqual([]);
  });
});

describe('resenas (colección real, content/resenas.ts)', () => {
  // Eran 5 hasta el 08-09-2026, cuando se recuperaron las 48 del sitio
  // anterior desde el WordPress que seguía vivo. De esas 48, 39 entran a
  // `content/resenas.ts` (38 publicadas + 1 en borrador, la única negativa) y
  // 9 quedan fuera porque nombran la marca anterior y `guardia.test.ts` no la
  // admite en `content/`. La cabecera de `content/resenas.ts` lo detalla.
  //
  // Los tests corren en desarrollo, donde `filtrarPublicables` deja pasar los
  // borradores: por eso acá son 39 y no 38.
  it('trae las 39 reseñas del archivo, todas ya autorizadas (nombre parcial)', () => {
    expect(resenas).toHaveLength(39);
    expect(resenas.every((r) => r.autorizada)).toBe(true);
  });

  // La reseña de 1 estrella es la única que NO debe publicarse todavía: es
  // decisión de la empresa. Si alguien la despublica por error, o publica una
  // negativa nueva sin pasar por esa decisión, este test avisa.
  it('la única reseña negativa sigue en borrador', () => {
    const negativas = resenas.filter((r) => r.calificacion < 4);
    expect(negativas).toHaveLength(1);
    expect(negativas[0]!.borrador).toBe(true);
  });

  // Ninguna reseña puede reintroducir la marca anterior. `guardia.test.ts` ya
  // recorre todo `content/`, pero acá el fallo dice de inmediato cuál es la
  // reseña culpable en vez de solo cuál es el archivo.
  it('ninguna reseña nombra la marca anterior', () => {
    const marca = /ecopelletsur|wik[aá]i/i;
    const culpables = resenas
      .filter((r) => marca.test(`${r.titulo} ${r.cuerpo}`))
      .map((r) => `${r.autor} (${r.fecha})`);
    expect(culpables).toEqual([]);
  });
});
