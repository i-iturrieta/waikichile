/**
 * Función de cálculo de la calculadora de consumo (ARCHITECTURE.md §5 "La
 * calculadora"; Bloque 7 de PHASE_1_PLAN.md, tarea 7.2).
 *
 * Fórmula exacta de ARCHITECTURE.md §5 ("Modelo"):
 *
 *   demandaUtil (kWh)  = superficie (m²) × factorZona (kWh/m²·temporada)
 *
 *   kgPellet           = demandaUtil / (poderCalorificoPellet × rendimientoPellet)
 *   sacos              = ceil(kgPellet / 15)
 *   costoPellet        = sacos × precioSacoZona
 *
 *   kgLena             = demandaUtil / (poderCalorificoLena × rendimientoLena)
 *   m3EstereoLena      = kgLena / densidadLena
 *   costoLena          = m3EstereoLena × precioM3Zona
 *
 *   ahorro             = costoLena − costoPellet
 *
 * Verificado a mano contra la tabla "Temporada completa, 80 m²" de
 * ARCHITECTURE.md §5 para las 4 zonas × 2 tipos de leña antes de darse por
 * completo (ver el reporte de este bloque) — cada resultado cae dentro de
 * ~0.02% de la tabla publicada, consistente con que la tabla redondeó algún
 * paso intermedio antes de este código. `lib/calculadora/calcular.test.ts`
 * deja esa verificación como test permanente con 1% de tolerancia.
 *
 * `poderCalorificoLena` y `rendimientoLena` dependen de `tipoLena`
 * (`'seca-certificada'` usa los valores "secos" de la tabla de constantes
 * físicas; `'humeda'` usa los "húmedos" — ARCHITECTURE.md §5 no da un tercer
 * juego de valores, así que estos dos son los únicos soportados, tal como
 * `TipoLena` los define en `lib/contenido/esquemas.ts`).
 *
 * Función pura: no importa nada de `components/` ni de `content/` salvo los
 * parámetros de la tarea 7.1 (`content/calculadora/parametros.ts`). Sin
 * formateo de moneda — eso es responsabilidad de la interfaz (tarea 7.4,
 * `Intl.NumberFormat('es-CL')`).
 *
 * Este módulo lo importa `components/calculadora/Formulario.tsx`
 * (`"use client"`), así que todo lo que importe se empaqueta para el
 * navegador y se re-ejecuta en cada visita. Por eso, desde la tarea 11.7
 * (Bloque 11, auditoría Lighthouse), este archivo **no** importa `zod` ni
 * valida `content/calculadora/parametros.ts` con
 * `parametrosCalculadoraSchema` — antes sí lo hacía aquí mismo, y eso
 * arrastraba `zod` completo al bundle del cliente solo para revalidar en
 * el navegador datos que ya se validaron al construir el sitio (420 ms de
 * "Total Blocking Time" en Lighthouse móvil, Performance en 85/100, bajo
 * el umbral de 90). `parametrosCrudos` ya viene tipado como
 * `ParametrosCalculadora` desde su propio archivo (`import type`, sin
 * costo de runtime) — se usa directo, confiando en que ya es válido.
 *
 * La validación real (que sigue rompiendo el build si el contenido queda
 * mal formado — la garantía original de la tarea 7.1) vive ahora en
 * `lib/calculadora/validarParametros.ts`, que solo importa
 * `app/calculadora/page.tsx` (Server Component: Next.js nunca lo empaqueta
 * para el cliente). Ver ese archivo para el detalle.
 */

import type { TipoLena, Zona } from '../contenido/esquemas.ts';
import parametros from '../../content/calculadora/parametros.ts';

/**
 * Los parámetros ya validados, para que la interfaz (tarea 7.4) construya
 * el selector de zonas (`zona` + `nombre` de cada fila) sin volver a
 * importar `content/calculadora/parametros.ts` sin validar por su cuenta.
 * `components/` sigue sin conocer `content/` directamente — pasa por
 * `lib/calculadora/`, igual que `calcularComparacion`.
 */
export { parametros as parametrosCalculadora };

export interface EntradaCalculadora {
  /** Superficie a calefaccionar, en m². Debe ser un número positivo — ver
   * la nota junto a `validarSuperficie` más abajo sobre por qué 0 y los
   * negativos lanzan en vez de devolver un resultado en ceros. */
  superficie: number;
  zona: Zona;
  tipoLena: TipoLena;
}

export interface DesglosePellet {
  /** kg de pellet necesarios para cubrir la demanda de la temporada. */
  kg: number;
  /** Sacos de 15 kg a comprar, redondeados hacia arriba: no se vende medio saco. */
  sacos: number;
  /** Costo total en CLP, sin decimales (siempre entero: `sacos` es entero y
   * el precio del saco se publica en pesos enteros). */
  costo: number;
}

export interface DesgloseLena {
  /** kg de leña necesarios para cubrir la demanda de la temporada. */
  kg: number;
  /** m³ estéreo equivalentes. */
  m3Estereo: number;
  /** Costo total en CLP. No necesariamente entero (`m3Estereo` es
   * fraccionario) — la interfaz redondea al formatear, esta función no. */
  costo: number;
}

export interface ResultadoCalculadora {
  /** Demanda térmica útil de la temporada, en kWh. */
  demandaUtilKwh: number;
  pellet: DesglosePellet;
  lena: DesgloseLena;
  /** `costoLena − costoPellet`. Positivo cuando el pellet es más barato.
   * Nombrada `diferencia` (no `ahorro`) porque puede ser negativa — ver
   * `pelletConviene`, que es la que decide cómo presentarla. */
  diferencia: number;
  /** `true` solo cuando `diferencia > 0` (el pellet cuesta menos que la
   * leña para la misma demanda). En la zona austral contra leña seca esto
   * da `false` — ARCHITECTURE.md §5 lo documenta como resultado esperado,
   * no como error ("el pellet sale al doble" ahí). Un empate exacto
   * (`diferencia === 0`) también da `false`: no hay ahorro que anunciar. */
  pelletConviene: boolean;
}

/**
 * Decisión de diseño (tarea 7.3 la pide explícita, ARCHITECTURE.md §5 no
 * especifica el comportamiento): `superficie` debe ser un número positivo.
 * `0` y los negativos **lanzan** un `RangeError`, en vez de devolver un
 * resultado en ceros.
 *
 * Por qué lanzar y no devolver 0: una superficie de 0 m² o negativa no
 * describe ninguna vivienda real — no hay una "respuesta correcta en
 * pesos" para esa entrada, hay una entrada inválida. Devolver un resultado
 * en ceros lo dejaría indistinguible de "esta superficie no gasta nada",
 * que es un mensaje distinto y falso. Lanzar obliga a quien llama (el
 * formulario cliente de la tarea 7.4) a validar el campo antes de invocar
 * la función y a mostrar un mensaje de validación en vez de un resultado —
 * separación de responsabilidades limpia para una función que se describe
 * como pura y sin formateo: la política de "qué mostrar cuando el input
 * todavía no es válido" es de la interfaz, no de la función de cálculo.
 */
function validarSuperficie(superficie: number): void {
  if (!Number.isFinite(superficie) || superficie <= 0) {
    throw new RangeError(`calcularComparacion: "superficie" debe ser un número positivo (recibido: ${superficie})`);
  }
}

function obtenerZona(zona: Zona) {
  const fila = parametros.zonas.find((z) => z.zona === zona);
  if (!fila) {
    // No debería ocurrir nunca: `parametrosCalculadoraSchema` ya exige que
    // `zonas` cubra exactamente las 4 zonas de `ZONA`. Si esto lanza, hay un
    // error de programación (p. ej. `Zona` se extendió sin actualizar
    // `content/calculadora/parametros.ts`), no un dato de contenido faltante.
    throw new Error(`calcularComparacion: no hay parámetros cargados para la zona "${zona}"`);
  }
  return fila;
}

export function calcularComparacion({ superficie, zona, tipoLena }: EntradaCalculadora): ResultadoCalculadora {
  validarSuperficie(superficie);

  const { constantes } = parametros;
  const filaZona = obtenerZona(zona);

  const demandaUtilKwh = superficie * filaZona.kwhPorM2Temporada;

  // --- Pellet ---------------------------------------------------------
  const kgPellet = demandaUtilKwh / (constantes.poderCalorificoPelletKwhKg * constantes.rendimientoPellet);
  const sacos = Math.ceil(kgPellet / constantes.pesoSacoKg);
  const costoPellet = sacos * filaZona.precioSacoPellet15kg;

  // --- Leña: el poder calorífico y el rendimiento dependen de tipoLena ---
  const poderCalorificoLena =
    tipoLena === 'seca-certificada' ? constantes.poderCalorificoLenaSecaKwhKg : constantes.poderCalorificoLenaHumedaKwhKg;
  const rendimientoLena = tipoLena === 'seca-certificada' ? constantes.rendimientoLenaSeca : constantes.rendimientoLenaHumeda;

  const kgLena = demandaUtilKwh / (poderCalorificoLena * rendimientoLena);
  const m3EstereoLena = kgLena / constantes.densidadLenaKgM3Estereo;
  const costoLena = m3EstereoLena * filaZona.precioM3EstereoLena;

  const diferencia = costoLena - costoPellet;

  return {
    demandaUtilKwh,
    pellet: { kg: kgPellet, sacos, costo: costoPellet },
    lena: { kg: kgLena, m3Estereo: m3EstereoLena, costo: costoLena },
    diferencia,
    pelletConviene: diferencia > 0,
  };
}
