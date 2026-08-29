/**
 * Test de `contactoSchema` (Bloque 10 de PHASE_1_PLAN.md, tarea 10.1).
 *
 * Vive en `lib/contenido/` (no en `src/`) a propósito: la validación en sí
 * es pura Zod, sin nada del runtime de Workers, así que corre en el proyecto
 * `lib` de `vitest.config.mts` (entorno Node estándar) en vez de en el
 * proyecto `worker` (pool `@cloudflare/vitest-pool-workers`). Los tests del
 * endpoint HTTP en sí — que sí necesitan el runtime de Workers para el
 * binding de rate limiting — están en `src/worker.test.ts`.
 */

import { describe, expect, it } from 'vitest';
import { contactoSchema } from './esquemas.ts';

const payloadValido = {
  nombre: 'Juanita Pérez',
  email: 'juanita@example.com',
  mensaje: 'Hola, quería consultar por el modelo Nahuen para una casa de 60 m².',
  honeypot: '',
  tiempoLlenado: 4000,
  turnstileToken: 'un-token-de-turnstile',
};

describe('contactoSchema', () => {
  it('acepta un payload válido sin teléfono (opcional)', () => {
    const resultado = contactoSchema.safeParse(payloadValido);
    expect(resultado.success).toBe(true);
  });

  it('acepta un payload válido con teléfono', () => {
    const resultado = contactoSchema.safeParse({ ...payloadValido, telefono: '+56 9 1234 5678' });
    expect(resultado.success).toBe(true);
  });

  it('rechaza nombre de menos de 2 caracteres', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, nombre: 'J' }).success).toBe(false);
  });

  it('rechaza nombre de más de 100 caracteres', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, nombre: 'a'.repeat(101) }).success).toBe(false);
  });

  it('rechaza un email con formato inválido', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, email: 'no-es-un-email' }).success).toBe(false);
  });

  it('rechaza mensaje de menos de 10 caracteres', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, mensaje: 'muy corto' }).success).toBe(false);
  });

  it('rechaza mensaje de más de 2000 caracteres', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, mensaje: 'a'.repeat(2001) }).success).toBe(false);
  });

  it('rechaza honeypot no vacío (trampa antispam)', () => {
    const resultado = contactoSchema.safeParse({ ...payloadValido, honeypot: 'soy-un-bot' });
    expect(resultado.success).toBe(false);
  });

  it('rechaza tiempoLlenado menor a 3000 ms', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, tiempoLlenado: 2999 }).success).toBe(false);
  });

  it('acepta tiempoLlenado exactamente en 3000 ms (límite inclusivo)', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, tiempoLlenado: 3000 }).success).toBe(true);
  });

  it('rechaza turnstileToken vacío', () => {
    expect(contactoSchema.safeParse({ ...payloadValido, turnstileToken: '' }).success).toBe(false);
  });

  it('rechaza payload sin turnstileToken', () => {
    const sinToken: Record<string, unknown> = { ...payloadValido };
    delete sinToken.turnstileToken;
    expect(contactoSchema.safeParse(sinToken).success).toBe(false);
  });

  it('no exige (ni acepta como relevante) un campo `borrador`: no es contenido, es entrada de usuario', () => {
    // No lo rechaza por "additionalProperties" (Zod v4 por defecto ignora
    // claves extra en `.object()`), pero el punto de este test es documentar
    // la excepción explícita de ARCHITECTURE.md §3: `contactoSchema` no usa
    // `conBorrador`, a diferencia de todo el resto de este archivo.
    const resultado = contactoSchema.safeParse(payloadValido);
    expect(resultado.success && 'borrador' in resultado.data).toBe(false);
  });
});
