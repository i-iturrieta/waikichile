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

  // -------------------------------------------------------------------------
  // Alternativas más allá de la leña (08-09-2026 — decisión 10 de Ignacio).
  //
  // El sitio anterior comparaba contra estos mismos combustibles, pero con un
  // modelo mucho más pobre: una tabla de pesos por m² y por hora (pellets 6,
  // leña 6,5, aire acondicionado 8,5, parafina 12,5, gas licuado 14,
  // eléctrico 25) multiplicada por horas y por metros. Esos números **no se
  // copiaron**, y conviene decir por qué: no distinguen el rendimiento del
  // aparato del contenido energético del combustible, así que no se pueden
  // auditar ni corregir por partes, y le dan al aire acondicionado un costo
  // 1,4 veces el del pellet cuando en realidad suele ser al revés —una bomba
  // de calor entrega ~3 kWh de calor por cada kWh que consume, y ese factor
  // simplemente no existe en esa tabla. Se conservan como referencia
  // histórica en `contenido-rescatado/wordpress-original/HALLAZGOS.md §1`.
  //
  // Acá cada alternativa se descompone en las tres cosas que sí se pueden
  // verificar por separado: cuánta energía trae una unidad, qué fracción de
  // esa energía llega al ambiente, y cuánto cuesta la unidad.
  //
  // ⚠️ **Los tres precios son referencias de mercado, no un sondeo nuestro**,
  // y son lo más frágil de este bloque: cambian con la tarifa eléctrica, con
  // la distribuidora y con la temporada. Están anotados en `PENDIENTES.md`
  // para confirmar con la clienta. Los contenidos energéticos y los
  // rendimientos, en cambio, son constantes físicas y de equipo bien
  // establecidas, y no cambian de un mes a otro.
  //
  // Que un precio esté algo desfasado **no invierte ninguna conclusión**,
  // salvo en el caso del aire acondicionado, que es justamente el que suele
  // ganarle al pellet y que por eso la interfaz oculta cuando gana. Contra
  // calefacción eléctrica por resistencia el pellet cuesta del orden de la
  // mitad o menos; ahí no hay precio que dé vuelta el resultado.
  // -------------------------------------------------------------------------
  alternativas: [
    {
      id: 'electrico',
      nombre: 'Calefactor eléctrico',
      // Una resistencia eléctrica convierte en calor prácticamente todo lo que
      // consume: 1 kWh de electricidad, 1 kWh de calor.
      kwhPorUnidad: 1,
      rendimiento: 1,
      // ⚠️ Referencia de tarifa residencial BT1. Varía bastante entre
      // distribuidoras y con las alzas del período. Pendiente de confirmar.
      precioPorUnidad: 180,
      unidad: 'kWh',
    },
    {
      id: 'aire-acondicionado',
      nombre: 'Aire acondicionado',
      kwhPorUnidad: 1,
      // Coeficiente de rendimiento (COP) de una bomba de calor en modo calor.
      // 3 es un valor conservador para un split moderno; los inverter buenos
      // llegan a 4 en condiciones favorables y bajan con frío exterior fuerte.
      // Se toma el extremo conservador a propósito: exagerar el COP haría
      // aparecer al aire acondicionado como más caro de lo que es, que es
      // justo el sesgo que este sitio no debe tener.
      rendimiento: 3,
      precioPorUnidad: 180,
      unidad: 'kWh',
    },
    {
      id: 'gas-licuado',
      nombre: 'Gas licuado',
      // Poder calorífico del GLP: ~12,8 kWh por kilo.
      kwhPorUnidad: 12.8,
      // Estufa a gas sin ducto de evacuación. No pierde calor por un caño,
      // pero sí en combustión incompleta y en el aire que hay que renovar.
      rendimiento: 0.85,
      // ⚠️ Precio por kilo, derivado del balón de 15 kg a ~$25.000.
      // Pendiente de confirmar.
      precioPorUnidad: 1667,
      unidad: 'kg',
    },
    {
      id: 'parafina',
      nombre: 'Parafina',
      // ~10,2 kWh por litro (≈12,8 kWh/kg a una densidad de ~0,8 kg/L).
      kwhPorUnidad: 10.2,
      rendimiento: 0.85,
      // ⚠️ Precio por litro. Pendiente de confirmar.
      precioPorUnidad: 1200,
      unidad: 'litro',
    },
  ],
};

export default parametrosCalculadora;
