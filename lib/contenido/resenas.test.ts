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
  it('trae las 5 reseñas rescatadas, todas ya autorizadas (nombre parcial)', () => {
    expect(resenas).toHaveLength(5);
    expect(resenas.every((r) => r.autorizada)).toBe(true);
  });
});
