'use client';

/**
 * Formulario de la calculadora de consumo (ARCHITECTURE.md §5 "La
 * calculadora"; Bloque 7 de PHASE_1_PLAN.md, tarea 7.4).
 *
 * Isla de cliente (ARCHITECTURE.md §2, tabla de islas: "Calculadora de
 * consumo — Recalcula con cada cambio de input"): es la única razón por la
 * que este componente lleva `"use client"`.
 *
 * Interfaz utilitaria a propósito: los Bloques 4-6 (dirección visual,
 * layout, sistema de `components/ui/`) no se han construido todavía en
 * este proyecto (se saltaron porque requieren aprobación de diseño humana
 * que no existe aún). No hay Tailwind personalizado ni componentes de
 * layout que reutilizar, así que esta pantalla usa HTML semántico y clases
 * de Tailwind por defecto — funcional, no la versión visual final.
 *
 * Ningún número de negocio vive aquí (ARCHITECTURE.md §7): todos los
 * montos y factores salen de `lib/calculadora/calcularComparacion` y de
 * `lib/calculadora/parametrosCalculadora`, que a su vez vienen de
 * `content/calculadora/parametros.ts`. Este componente solo arma el
 * formulario, formatea con `Intl.NumberFormat('es-CL')` (ARCHITECTURE.md
 * §9) y decide qué mostrar según `pelletConviene`.
 *
 * Consecuencias de diseño no negociables de ARCHITECTURE.md §5 aplicadas
 * aquí:
 *   1. `tipoLena` es un input visible con default `'humeda'`, con nota de
 *      por qué la leña húmeda rinde la mitad.
 *   2. Cuando `pelletConviene` es `false`, nunca se muestra un ahorro
 *      negativo como si fuera un ahorro: se dice explícitamente que ahí la
 *      ventaja es de comodidad y limpieza, y se enumeran esas ventajas sin
 *      cifras de dinero.
 *   3. La zona austral se incluye en el selector (no se omite en
 *      silencio), con el mensaje honesto cuando el resultado es adverso —
 *      la opción 2 que ARCHITECTURE.md §5 ofrece para esa zona.
 *   4. La nota de "valores referenciales" está siempre visible, no solo
 *      cuando el resultado es adverso.
 */

import { useMemo, useState } from 'react';
import { calcularComparacion, parametrosCalculadora, type ResultadoCalculadora } from '@/lib/calculadora/calcular';
// Desde `enums.ts`, no desde `esquemas.ts` (Bloque 11, tarea 11.7): este
// componente es una isla de cliente y solo necesita los arreglos/tipos
// planos, no los esquemas Zod — importar desde `esquemas.ts` empaquetaría
// los ~15 esquemas del sitio (y `zod` completo) en el bundle del navegador.
// Ver el comentario de cabecera de `lib/contenido/enums.ts`.
import { TIPO_LENA, ZONA, type TipoLena, type Zona } from '@/lib/contenido/enums';

const formatoCLP = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });
const formatoKg = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });
const formatoM3 = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 });
const formatoPorcentaje = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });

const NOMBRE_ZONA: Record<Zona, string> = Object.fromEntries(
  parametrosCalculadora.zonas.map((z) => [z.zona, z.nombre])
) as Record<Zona, string>;

const ETIQUETA_TIPO_LENA: Record<TipoLena, string> = {
  humeda: 'Leña húmeda',
  'seca-certificada': 'Leña seca certificada',
};

const VENTAJAS_NO_ECONOMICAS = [
  'Sin electricidad: sigue calefaccionando aunque se corte la luz.',
  'Sin acarrear ni almacenar leña.',
  'Sin humo dentro de la casa.',
  'Sin quedar fuera de servicio en episodios de restricción ambiental (el pellet es una biomasa permitida).',
];

export default function Formulario() {
  const [superficieTexto, setSuperficieTexto] = useState('80');
  const [zona, setZona] = useState<Zona>(parametrosCalculadora.zonas[0].zona);
  // Default `'humeda'`, no `'seca-certificada'`: es la leña que compra la
  // mayoría de los hogares, y es donde el pellet gana con claridad
  // (ARCHITECTURE.md §5, "Consecuencias de diseño no negociables", punto 1).
  const [tipoLena, setTipoLena] = useState<TipoLena>('humeda');

  const superficie = Number(superficieTexto);
  const superficieValida = Number.isFinite(superficie) && superficie > 0;

  // `calcularComparacion` lanza para superficie <= 0 (decisión de la tarea
  // 7.2/7.3, documentada en `lib/calculadora/calcular.ts`) — por eso se
  // guarda `superficieValida` antes de llamarla, en vez de envolver la
  // llamada en try/catch en cada render.
  const resultado: ResultadoCalculadora | null = useMemo(() => {
    if (!superficieValida) return null;
    return calcularComparacion({ superficie, zona, tipoLena });
  }, [superficie, superficieValida, zona, tipoLena]);

  const porcentajeDiferencia =
    resultado && resultado.lena.costo > 0 ? (resultado.diferencia / resultado.lena.costo) * 100 : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Calculadora de consumo</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Compara el costo de calefaccionar con pellet Waiki contra el costo de calefaccionar con leña, para la misma
        demanda de calor, según tu superficie y zona.
      </p>

      <form className="mt-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1">
          <label htmlFor="superficie" className="text-sm font-medium">
            Superficie a calefaccionar (m²)
          </label>
          <input
            id="superficie"
            name="superficie"
            type="number"
            inputMode="decimal"
            min={1}
            step={1}
            value={superficieTexto}
            onChange={(e) => setSuperficieTexto(e.target.value)}
            className="w-40 rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
            aria-describedby={superficieValida ? undefined : 'superficie-error'}
          />
          {!superficieValida && (
            <p id="superficie-error" className="text-sm text-red-600 dark:text-red-400">
              Ingresa una superficie mayor a 0 m².
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="zona" className="text-sm font-medium">
            Zona
          </label>
          <select
            id="zona"
            name="zona"
            value={zona}
            onChange={(e) => setZona(e.target.value as Zona)}
            className="w-full max-w-sm rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
          >
            {ZONA.map((z) => (
              <option key={z} value={z}>
                {NOMBRE_ZONA[z]}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Tipo de leña con la que comparar</legend>
          {TIPO_LENA.map((valor) => (
            <label key={valor} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="tipoLena"
                value={valor}
                checked={tipoLena === valor}
                onChange={() => setTipoLena(valor)}
              />
              {ETIQUETA_TIPO_LENA[valor]}
            </label>
          ))}
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            La leña húmeda (más del 35% de humedad) es la que compra la mayoría de los hogares, y rinde
            aproximadamente la mitad que la leña seca certificada: una parte importante del calor que produce se
            gasta primero en evaporar el agua que contiene, en vez de calefaccionar. Por eso el consumo — y el
            costo — sube tanto cuando la leña viene húmeda.
          </p>
        </fieldset>
      </form>

      <section className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800" aria-live="polite">
        <h2 className="text-lg font-semibold">Resultado</h2>

        {!resultado && <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">Ingresa una superficie válida para ver el resultado.</p>}

        {resultado && (
          <div className="mt-4 flex flex-col gap-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Demanda térmica estimada para la temporada en {NOMBRE_ZONA[zona]}: {formatoKg.format(resultado.demandaUtilKwh)} kWh.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded border border-neutral-200 p-4 dark:border-neutral-800">
                <h3 className="font-medium">Pellet Waiki</h3>
                <dl className="mt-2 flex flex-col gap-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-neutral-600 dark:text-neutral-400">Consumo</dt>
                    <dd>{formatoKg.format(resultado.pellet.kg)} kg</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-neutral-600 dark:text-neutral-400">Sacos de 15 kg</dt>
                    <dd>{resultado.pellet.sacos}</dd>
                  </div>
                  <div className="flex justify-between gap-2 font-medium">
                    <dt>Costo de temporada</dt>
                    <dd>${formatoCLP.format(resultado.pellet.costo)}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded border border-neutral-200 p-4 dark:border-neutral-800">
                <h3 className="font-medium">{ETIQUETA_TIPO_LENA[tipoLena]}</h3>
                <dl className="mt-2 flex flex-col gap-1 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-neutral-600 dark:text-neutral-400">Consumo</dt>
                    <dd>{formatoKg.format(resultado.lena.kg)} kg</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-neutral-600 dark:text-neutral-400">m³ estéreo</dt>
                    <dd>{formatoM3.format(resultado.lena.m3Estereo)}</dd>
                  </div>
                  <div className="flex justify-between gap-2 font-medium">
                    <dt>Costo de temporada</dt>
                    <dd>${formatoCLP.format(resultado.lena.costo)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {resultado.pelletConviene ? (
              <div className="rounded border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                <p className="font-medium text-green-900 dark:text-green-200">
                  Ahorras aproximadamente ${formatoCLP.format(resultado.diferencia)}
                  {porcentajeDiferencia !== null && ` (${formatoPorcentaje.format(porcentajeDiferencia)}%)`} en la
                  temporada usando pellet Waiki en vez de {ETIQUETA_TIPO_LENA[tipoLena].toLowerCase()}.
                </p>
              </div>
            ) : (
              <div className="rounded border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                <p className="font-medium text-amber-900 dark:text-amber-200">
                  En {NOMBRE_ZONA[zona]}, comparado con {ETIQUETA_TIPO_LENA[tipoLena].toLowerCase()}, el pellet Waiki
                  no resulta más barato en pesos para esta superficie. Ahí la ventaja no es de precio, es de
                  comodidad y limpieza:
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-amber-900 dark:text-amber-200">
                  {VENTAJAS_NO_ECONOMICAS.map((ventaja) => (
                    <li key={ventaja}>{ventaja}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="mt-8 text-xs text-neutral-500 dark:text-neutral-500">
          Valores referenciales: se calculan a partir de factores de consumo por zona y precios de mercado, y no
          reemplazan una cotización. El rendimiento del quemador con pellet es una estimación, no una medición del
          equipo. Los montos pueden variar según el hogar, el uso y el proveedor de combustible.
        </p>
      </section>
    </div>
  );
}
