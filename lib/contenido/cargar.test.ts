/**
 * Tests de `lib/contenido/cargar.ts` (Bloque 3 de PHASE_1_PLAN.md, tarea
 * 3.2). "Done when: un test verifica que `filtrarPublicables` descarta
 * borradores con `SITIO_PRODUCCION=true` y los conserva sin la variable" —
 * se cubren ambos lados explícitamente.
 */

import { afterEach, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { cargarColeccion, filtrarPublicables } from './cargar.ts';

describe('cargarColeccion', () => {
  const schema = z.object({ nombre: z.string(), borrador: z.boolean() });

  it('valida y devuelve los elementos cuando todos son válidos', () => {
    const resultado = cargarColeccion('prueba', schema, [{ nombre: 'a', borrador: false }]);
    expect(resultado).toEqual([{ nombre: 'a', borrador: false }]);
  });

  it('nombra la colección, el índice y el campo cuando un elemento falla', () => {
    const datos = [
      { nombre: 'a', borrador: false },
      { nombre: 123, borrador: false },
    ];
    expect(() => cargarColeccion('prueba', schema, datos)).toThrowError(/prueba\[1\]/);
    expect(() => cargarColeccion('prueba', schema, datos)).toThrowError(/nombre/);
  });
});

describe('filtrarPublicables', () => {
  const valorOriginal = process.env.SITIO_PRODUCCION;
  const items = [
    { id: 1, borrador: false },
    { id: 2, borrador: true },
  ];

  afterEach(() => {
    if (valorOriginal === undefined) delete process.env.SITIO_PRODUCCION;
    else process.env.SITIO_PRODUCCION = valorOriginal;
  });

  it('descarta los borradores cuando SITIO_PRODUCCION=true', () => {
    process.env.SITIO_PRODUCCION = 'true';
    expect(filtrarPublicables(items)).toEqual([{ id: 1, borrador: false }]);
  });

  it('conserva todo cuando SITIO_PRODUCCION no está definida (desarrollo)', () => {
    delete process.env.SITIO_PRODUCCION;
    expect(filtrarPublicables(items)).toEqual(items);
  });

  it('conserva todo cuando SITIO_PRODUCCION tiene un valor distinto de "true"', () => {
    process.env.SITIO_PRODUCCION = 'false';
    expect(filtrarPublicables(items)).toEqual(items);
  });
});
