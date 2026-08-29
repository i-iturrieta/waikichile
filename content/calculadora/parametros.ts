/**
 * Parámetros de la calculadora de consumo (ARCHITECTURE.md §3
 * "ParametrosCalculadora" y §5 "La calculadora"; Bloque 7 de
 * PHASE_1_PLAN.md, tarea 7.1).
 *
 * "El archivo que más se va a editar en la vida del sitio" (ARCHITECTURE.md
 * §3) — por eso cada valor lleva su fuente y su fecha en el comentario que
 * lo antecede, copiados literalmente de la tabla de ARCHITECTURE.md §5 (v1.2,
 * 21-ago-2026), sin reinterpretar. Donde esa tabla deja la celda de
 * "Fuente" en blanco, el comentario lo dice tal cual — no se inventa una
 * procedencia que el documento no da.
 *
 * La tabla por zona está marcada en ARCHITECTURE.md §5 como "provisional,
 * requiere confirmación [de la clienta]". Se copia igual, sin `borrador`
 * (ver la nota junto a `parametrosCalculadoraSchema` en
 * `lib/contenido/esquemas.ts` sobre por qué ese campo no aplica aquí): la
 * confirmación pendiente es un asunto de negocio con la clienta, no algo
 * que este archivo deba resolver improvisando un número distinto.
 *
 * `content/` no importa código (ARCHITECTURE.md §7) — el único import de
 * abajo es de tipo (`import type`), se borra en tiempo de compilación y no
 * deja dependencia en tiempo de ejecución. La validación real con Zod
 * ocurre al cargar este módulo desde `lib/calculadora/validarParametros.ts`,
 * contra `parametrosCalculadoraSchema` — antes ocurría desde
 * `lib/calculadora/calcular.ts` (tarea 7.2), pero se movió en la tarea 11.7
 * (Bloque 11, auditoría Lighthouse) para que `zod` no viajara al bundle del
 * cliente de `/calculadora/` (ver ese archivo para el detalle).
 */

import type { ParametrosCalculadora } from '../../lib/contenido/esquemas.ts';

const parametrosCalculadora: ParametrosCalculadora = {
  constantes: {
    // Fuente: Estándar ENplus A1. (ARCHITECTURE.md §5, tabla "Constantes
    // físicas". Sin fecha específica: es una constante del estándar, no un
    // dato con vigencia temporal.)
    poderCalorificoPelletKwhKg: 4.8,

    // Poder calorífico de leña seca (25% humedad). Fuente: no especificada
    // en ARCHITECTURE.md §5 (celda de fuente en blanco en la tabla original).
    poderCalorificoLenaSecaKwhKg: 3.5,

    // Poder calorífico de leña húmeda (>35% humedad). Fuente: no
    // especificada en ARCHITECTURE.md §5 (celda de fuente en blanco).
    poderCalorificoLenaHumedaKwhKg: 2.5,

    // Densidad de leña por m³ estéreo. Fuente: "Nativa seca" (ARCHITECTURE.md
    // §5, tabla "Constantes físicas"). Sin fecha específica.
    densidadLenaKgM3Estereo: 400,

    // Rendimiento con pellet (quemador Waiki). Fuente: "Estimado — ver
    // riesgo abajo" (ARCHITECTURE.md §5). ⚠️ Es el parámetro más frágil de
    // todos según el propio documento: "no es un dato medido del quemador
    // Waiki. Mueve el resultado más que ningún otro." Contraste disponible
    // (no una medición): la clienta declara 0,8-1,5 kg/h de consumo,
    // ~1 kg/h a tiraje medio, y que Nahuen cubre 40-70 m² — ese cruce da
    // coherencia al 0,75, pero ARCHITECTURE.md §5 pide validarlo con ella
    // explícitamente antes de darlo por definitivo.
    rendimientoPellet: 0.75,

    // Rendimiento con leña seca en combustión lenta. Fuente: no especificada
    // en ARCHITECTURE.md §5 (celda de fuente en blanco).
    rendimientoLenaSeca: 0.55,

    // Rendimiento con leña húmeda. Fuente: no especificada en
    // ARCHITECTURE.md §5 (celda de fuente en blanco).
    rendimientoLenaHumeda: 0.35,

    // Peso del saco. Fuente: no especificada en ARCHITECTURE.md §5 (celda de
    // fuente en blanco) — es el tamaño de venta estándar del pellet (15 kg).
    pesoSacoKg: 15,
  },

  // Tabla por zona (ARCHITECTURE.md §5, "provisional, requiere
  // confirmación"). Los factores kWh/m²·temporada están calibrados hacia
  // atrás desde el consumo real de leña por vivienda que reporta el
  // Ministerio del Medio Ambiente (Temuco 5,8 m³ sólidos/año; Coyhaique
  // 17,3), asumiendo una vivienda promedio de 85 m² — sin fecha específica
  // de esa fuente en ARCHITECTURE.md más allá de "Ministerio del Medio
  // Ambiente". Los precios de pellet y de leña certificada vienen de
  // "sondeos SERNAC 2026" (fecha: 2026, sin mes específico en la fuente).
  zonas: [
    {
      zona: 'centro-sur',
      nombre: 'Centro-sur (Maule, Ñuble, Biobío)',
      meses: 5,
      kwhPorM2Temporada: 60,
      precioSacoPellet15kg: 4500,
      precioM3EstereoLena: 55000,
    },
    {
      zona: 'araucania-los-rios',
      nombre: 'Araucanía y Los Ríos',
      meses: 6,
      kwhPorM2Temporada: 80,
      precioSacoPellet15kg: 4850,
      precioM3EstereoLena: 65000,
    },
    {
      zona: 'los-lagos-chiloe',
      nombre: 'Los Lagos y Chiloé',
      meses: 6,
      kwhPorM2Temporada: 90,
      precioSacoPellet15kg: 5000,
      precioM3EstereoLena: 60000,
    },
    {
      // ⚠️ Zona adversa para el mensaje comercial (ARCHITECTURE.md §5,
      // "Riesgo mayor: contra leña seca, el pellet no ahorra", punto 2): la
      // leña certificada en Coyhaique cuesta menos que en Temuco mientras
      // la demanda térmica es 2,5 veces mayor, así que el pellet sale al
      // doble contra leña seca aquí. Se incluye igual (ARCHITECTURE.md §5,
      // "Consecuencias de diseño no negociables", punto 3, opción 2: "hay
      // clientes reales en la Patagonia... omitirla en silencio tampoco
      // corresponde") — la interfaz de 7.4 es la que debe presentar el
      // resultado adverso con honestidad, no este archivo.
      zona: 'austral',
      nombre: 'Austral (Aysén, Magallanes)',
      meses: 8,
      kwhPorM2Temporada: 200,
      precioSacoPellet15kg: 5500,
      precioM3EstereoLena: 40000,
    },
  ],
};

export default parametrosCalculadora;
