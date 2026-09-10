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
  // anterior desde el WordPress que seguía vivo. De esas 48 quedan 38 en
  // `content/resenas.ts`: 9 fuera porque nombran la marca anterior y
  // `guardia.test.ts` no la admite en `content/`, y 1 —la única negativa—
  // borrada el 10-09-2026 a pedido de Ignacio (su texto sigue en
  // `contenido-rescatado/wordpress-original/RESENAS.md`).
  //
  // Ya no hay ninguna en borrador, así que el número es 38 tanto en
  // desarrollo como en producción — antes eran 39 en desarrollo, donde
  // `filtrarPublicables` deja pasar los borradores.
  it('trae las 38 reseñas del archivo, todas ya autorizadas (nombre parcial)', () => {
    expect(resenas).toHaveLength(38);
    expect(resenas.every((r) => r.autorizada)).toBe(true);
  });

  // La única negativa de las 48 se borró por decisión de la empresa. Este
  // test ya no vigila que siga en borrador —no existe—, sino que no entre
  // una negativa nueva sin pasar por esa misma decisión: si mañana se agrega
  // una reseña de 1 a 3 estrellas, acá se entera alguien antes de publicarla.
  it('no hay reseñas negativas publicadas', () => {
    const negativas = resenas.filter((r) => r.calificacion < 4);
    expect(negativas).toEqual([]);
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
