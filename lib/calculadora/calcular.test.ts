/**
 * Tests de `lib/calculadora/calcular.ts` (Bloque 7 de PHASE_1_PLAN.md,
 * tarea 7.3). "Done when: `pnpm test` pasa los 11 casos."
 *
 * Los 11 casos:
 *   1-8. Las 4 zonas × 2 tipos de leña, a 80 m², contra la tabla "Temporada
 *        completa, 80 m²" de ARCHITECTURE.md §5, con 1% de tolerancia (la
 *        tabla del documento redondea algún paso intermedio antes de llegar
 *        al costo final — ver el cálculo a mano en el reporte de este
 *        bloque, que reproduce la aritmética completa para Araucanía +
 *        leña seca y para austral + leña seca).
 *   9.    superficie === 0 lanza.
 *   10.   superficie negativa lanza.
 *   11.   austral + leña seca (certificada) da `pelletConviene: false` —
 *        el caso adverso explícito de ARCHITECTURE.md §5 ("el pellet sale
 *        al doble" ahí). Es un test aparte del caso 7 (que solo compara
 *        los montos contra la tabla) para dejar la afirmación de negocio
 *        nombrada y visible por sí sola, no enterrada dentro de una
 *        comparación numérica.
 */

import { describe, expect, it } from 'vitest';
import { calcularComparacion } from './calcular.ts';
import type { TipoLena, Zona } from '../contenido/esquemas.ts';

/** Compara `actual` contra `esperado` con una tolerancia relativa (1% por
 * defecto) en vez de exactitud perfecta — ver la nota de cabecera. */
function esperarDentroDeTolerancia(actual: number, esperado: number, toleranciaRelativa = 0.01): void {
  const diferenciaMaxima = Math.abs(esperado) * toleranciaRelativa;
  expect(
    Math.abs(actual - esperado),
    `esperaba ${actual} dentro de ${(toleranciaRelativa * 100).toFixed(0)}% de ${esperado} (diferencia máxima permitida: ${diferenciaMaxima.toFixed(2)}, diferencia real: ${Math.abs(actual - esperado).toFixed(2)})`
  ).toBeLessThanOrEqual(diferenciaMaxima);
}

// Tabla "Temporada completa, 80 m²" de ARCHITECTURE.md §5, copiada
// literalmente (los mismos 4 valores en pesos por zona: pellet, leña seca,
// leña húmeda — el cuarto, "Ahorro vs húmeda", es derivado y no se repite
// aquí como dato de entrada).
const TABLA_ARCHITECTURE_80M2: Record<Zona, { pellet: number; lenaSeca: number; lenaHumeda: number }> = {
  'centro-sur': { pellet: 400_500, lenaSeca: 342_900, lenaHumeda: 754_300 },
  'araucania-los-rios': { pellet: 577_200, lenaSeca: 540_300, lenaHumeda: 1_188_600 },
  'los-lagos-chiloe': { pellet: 670_000, lenaSeca: 561_000, lenaHumeda: 1_234_300 },
  austral: { pellet: 1_633_500, lenaSeca: 831_200, lenaHumeda: 1_828_600 },
};

const ZONAS: Zona[] = ['centro-sur', 'araucania-los-rios', 'los-lagos-chiloe', 'austral'];
const TIPOS_LENA: { tipo: TipoLena; columna: 'lenaSeca' | 'lenaHumeda' }[] = [
  { tipo: 'seca-certificada', columna: 'lenaSeca' },
  { tipo: 'humeda', columna: 'lenaHumeda' },
];

describe('calcularComparacion — casos 1-8: las 4 zonas × 2 tipos de leña a 80 m², contra ARCHITECTURE.md §5', () => {
  for (const zona of ZONAS) {
    for (const { tipo, columna } of TIPOS_LENA) {
      it(`${zona} + ${tipo}: costo de pellet y de leña dentro de 1% de la tabla`, () => {
        const resultado = calcularComparacion({ superficie: 80, zona, tipoLena: tipo });
        const esperado = TABLA_ARCHITECTURE_80M2[zona];

        esperarDentroDeTolerancia(resultado.pellet.costo, esperado.pellet);
        esperarDentroDeTolerancia(resultado.lena.costo, esperado[columna]);
      });
    }
  }
});

describe('calcularComparacion — caso 9: superficie === 0', () => {
  it('lanza en vez de devolver un resultado en ceros', () => {
    expect(() => calcularComparacion({ superficie: 0, zona: 'araucania-los-rios', tipoLena: 'humeda' })).toThrow(
      RangeError
    );
  });
});

describe('calcularComparacion — caso 10: superficie negativa', () => {
  it('lanza, igual que superficie === 0', () => {
    expect(() => calcularComparacion({ superficie: -80, zona: 'araucania-los-rios', tipoLena: 'humeda' })).toThrow(
      RangeError
    );
  });
});

describe('calcularComparacion — caso 11: austral + leña seca certificada, el caso adverso de ARCHITECTURE.md §5', () => {
  it('da pelletConviene: false — ahí el pellet sale al doble, no ahorra', () => {
    const resultado = calcularComparacion({ superficie: 80, zona: 'austral', tipoLena: 'seca-certificada' });

    expect(resultado.pelletConviene).toBe(false);
    expect(resultado.diferencia).toBeLessThan(0);
    // "El pellet sale al doble" (ARCHITECTURE.md §5): el costo de pellet es
    // aproximadamente el doble del costo de leña seca en esta zona.
    expect(resultado.pellet.costo / resultado.lena.costo).toBeGreaterThan(1.8);
    expect(resultado.pellet.costo / resultado.lena.costo).toBeLessThan(2.2);
  });
});

describe('calcularComparacion — sacos redondea hacia arriba', () => {
  it('Math.ceil: nunca compra una fracción de saco', () => {
    const resultado = calcularComparacion({ superficie: 80, zona: 'araucania-los-rios', tipoLena: 'humeda' });
    expect(Number.isInteger(resultado.pellet.sacos)).toBe(true);
    expect(resultado.pellet.sacos).toBe(Math.ceil(resultado.pellet.kg / 15));
  });
});
