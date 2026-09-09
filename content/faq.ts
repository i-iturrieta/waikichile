/**
 * Preguntas frecuentes (PHASE_1_PLAN.md, tarea 3b.3).
 *
 * Fuente: `contenido-rescatado/textos-sitio-anterior.txt`, sección
 * "Preguntas de los usuarios" (entre el encabezado "PREGUNTAS DE LOS
 * USUARIOS" y "Calculadora de consumo"). Recontadas contra la fuente:
 * **25 preguntas**, no 23 (AUDITORIA §2.1) — se cuentan los encabezados en
 * forma de pregunta uno por uno, incluida la que en el sitio original venía
 * en registro distinto ("Tengo una estufa a pellets, ¿puedo...", aquí
 * reformulada como pregunta directa).
 *
 * La pregunta original citaba la marca anterior de la empresa al preguntar
 * por la garantía de los equipos → reformulada con el nombre actual.
 *
 * **Garantía: 12 meses, confirmados por Ignacio el 09-09-2026.** Las dos
 * preguntas que citan el plazo quedan publicadas de forma definitiva. Es el
 * tercer movimiento de este dato y conviene la secuencia completa, porque
 * quien relea las fuentes rescatadas va a encontrar la contradicción y va a
 * creer que el sitio está mal:
 *
 *   1. 07-09-2026 — publicadas con 12 meses, provisorio ("por ahora, luego
 *      solucionamos").
 *   2. 08-09-2026 — devueltas a `borrador: true`. Al recuperar el WordPress
 *      original apareció una tercera fuente: su propia página de Preguntas
 *      de los usuarios, editada hasta julio de 2025, decía **6 meses**,
 *      explícito y en dos preguntas distintas. Empate de fuentes, y un plazo
 *      de garantía es una obligación legal: se retiró.
 *   3. 09-09-2026 — Ignacio confirma **12 meses**. Publicadas.
 *
 * O sea que el FAQ del sitio anterior que decía 6 meses **está obsoleto o
 * era incorrecto**. Coincide con el manual impreso y con la ficha técnica de
 * Chakay, que dice "1 año" (AUDITORIA §6.3b). Ver `PENDIENTES.md` §2.3 y
 * `content/paginas/garantia.md`.
 * `borrador: true` es el mecanismo exacto para eso: se renderiza en
 * desarrollo (volumen realista para diseñar) y se omite en el build de
 * producción (ARCHITECTURE.md §1.6). El esquema de `PreguntaFrecuente` no
 * tiene un campo de "no publicable" aparte — es `conBorrador`, así que
 * `borrador` es el campo correcto para esto.
 */

import type { PreguntaFrecuente } from '../lib/contenido/esquemas.ts';

const faq: PreguntaFrecuente[] = [
  {
    id: 'consumo-waiki',
    tema: 'consumo',
    orden: 1,
    pregunta: '¿Cuál es el consumo de Waiki?',
    respuesta: 'El consumo de Waiki varía entre 0,8 y 1,5 kg de pellet por hora, dependiendo del tiraje con el que se use.',
    borrador: false,
  },
  {
    id: 'funciona-con-electricidad',
    tema: 'uso',
    orden: 2,
    pregunta: '¿Waiki funciona con electricidad?',
    respuesta: 'No. Waiki funciona con un sistema de tiro natural, igual que una combustión lenta a leña.',
    borrador: false,
  },
  {
    id: 'es-programable',
    tema: 'uso',
    orden: 3,
    pregunta: '¿Es posible programar Waiki?',
    respuesta: 'No, Waiki no cuenta con mecanismos electrónicos, por lo que no se puede programar.',
    borrador: false,
  },
  {
    id: 'duracion-bolsa-pellets',
    tema: 'consumo',
    orden: 4,
    pregunta: '¿Cuánto dura una bolsa de pellets?',
    respuesta:
      'Depende del uso de calefacción de cada hogar y del tiraje con el que se use. En promedio, una bolsa de 15 kg entrega unas 15 horas de calefacción con un tiraje medio de 1 kg/h.',
    borrador: false,
  },
  {
    id: 'liberar-ceniza',
    tema: 'mantencion',
    orden: 5,
    pregunta: '¿Cómo se libera la ceniza del quemador?',
    respuesta: 'Waiki cuenta con un limpiador manual que se acciona durante el funcionamiento del equipo.',
    borrador: false,
  },
  {
    id: 'cuando-limpiar-ceniza',
    tema: 'mantencion',
    orden: 6,
    pregunta: '¿Cómo sé cuándo es necesario accionar el limpiador de ceniza?',
    respuesta: 'Si se observa una disminución en la llama, es señal de que hay acumulación de ceniza en el quemador y hay que liberarla.',
    borrador: false,
  },
  {
    id: 'frecuencia-liberar-ceniza',
    tema: 'mantencion',
    orden: 7,
    pregunta: '¿Con qué frecuencia debo liberar la ceniza?',
    respuesta:
      'Depende del tipo de pellet. Con pellet de alta densidad (como Río Claro) hay que liberar ceniza cada 4 a 5 horas; con pellet de baja densidad, que genera más ceniza, cada 1,5 a 2 horas.',
    borrador: false,
  },
  {
    id: 'capacidad-tolva',
    tema: 'consumo',
    orden: 8,
    pregunta: '¿Cuántos kilogramos de pellets caben en la tolva?',
    respuesta: 'La tolva de Waiki tiene una capacidad de 6,5 kg de pellets.',
    borrador: false,
  },
  {
    id: 'autonomia-carga-tolva',
    tema: 'consumo',
    orden: 9,
    pregunta: '¿Cuánto tiempo dura una carga completa de la tolva?',
    respuesta: 'Una carga de 6,5 kg de pellets entrega entre 4 y 7 horas de calefacción continua, dependiendo del tiraje utilizado.',
    borrador: false,
  },
  {
    id: 'mantenimiento-necesario',
    tema: 'mantencion',
    orden: 10,
    pregunta: '¿Qué mantenimiento necesita Waiki?',
    respuesta:
      'Hay que limpiar el quemador y la rejilla con una escobilla de fierro o acero una vez por semana. El equipo incluye una pletina de limpieza para el cuello de descarga, que se usa antes de llenar la tolva.',
    borrador: false,
  },
  {
    // 12 meses CONFIRMADOS por Ignacio el 09-09-2026. Ver cabecera.
    id: 'equipos-con-garantia',
    tema: 'garantia',
    orden: 11,
    pregunta: '¿Cuentan los equipos Waiki con garantía?',
    respuesta:
      'Sí. Todos los equipos Waiki Chile tienen 12 meses de garantía por defectos de fabricación, contados desde la compra. La rejilla del quemador queda fuera: es una pieza de desgaste, no un defecto.',
    borrador: false,
  },
  {
    // 12 meses CONFIRMADOS por Ignacio el 09-09-2026. Ver cabecera.
    id: 'en-que-consiste-garantia',
    tema: 'garantia',
    orden: 12,
    pregunta: '¿En qué consiste la garantía de los equipos Waiki?',
    respuesta:
      'Cubre desperfectos de fabricación durante 12 meses desde la compra. Si surge un problema, primero se intenta resolver por llamada o videollamada; si no es posible, se evalúa si corresponde una reparación o el reemplazo de piezas.',
    borrador: false,
  },
  {
    id: 'visitas-tecnicas-costo',
    tema: 'garantia',
    orden: 13,
    pregunta: '¿Las visitas técnicas tienen costo?',
    respuesta:
      'Sí. El costo depende de la región o ciudad donde se solicita la visita o el retiro del equipo para hacer efectiva la garantía. Por eso primero se agotan las alternativas de solución por teléfono o videollamada, para evitar el costo de traslado al cliente.',
    borrador: false,
  },
  {
    id: 'marcas-pellet-recomendadas',
    tema: 'consumo',
    orden: 14,
    pregunta: '¿Por qué se recomiendan ciertas marcas de pellet?',
    respuesta:
      'No todas las marcas de pellet son igual de compatibles con equipos de tiro natural. Se recomiendan las que se han probado y funcionan bien, para darle al usuario mayor autonomía — eso no significa que no se puedan usar otras marcas.',
    borrador: false,
  },
  {
    id: 'que-es-controlador-presion',
    tema: 'instalacion',
    orden: 15,
    pregunta: '¿Qué es el controlador de presión?',
    respuesta:
      'Es una válvula manual que se instala en la combustión para regular la presión de los primeros metros de cañería. Permite dosificar el aire que entra a la estufa, sobre todo en días de presión atmosférica baja o ráfagas de viento fuerte, evitando un sobreconsumo de pellet.',
    borrador: false,
  },
  {
    id: 'cuando-instalar-controlador',
    tema: 'instalacion',
    orden: 16,
    pregunta: '¿Cuándo se debe instalar el controlador de presión?',
    respuesta: 'Cuando la cañería, desde la combustión hasta el sombrero, supera los 3,5 metros de longitud.',
    borrador: false,
  },
  {
    id: 'metros-caneria',
    tema: 'instalacion',
    orden: 17,
    pregunta: '¿Cómo sé cuántos metros de cañería tiene mi combustión?',
    respuesta: 'Cada tira de cañería mide 1 metro. Basta con contar cuántas tiras tiene la instalación para saber si supera los 3,5 metros.',
    borrador: false,
  },
  {
    id: 'como-se-fabrican',
    tema: 'uso',
    orden: 18,
    pregunta: '¿Cómo se fabrican los equipos Waiki?',
    respuesta:
      'Se cortan con máquinas CNC láser, y algunas piezas con plasma. Los quemadores están fabricados en acero inoxidable resistente a altas temperaturas.',
    borrador: false,
  },
  {
    id: 'piezas-que-se-cambian',
    tema: 'mantencion',
    orden: 19,
    pregunta: '¿Hay alguna pieza que deba cambiarse con el uso?',
    respuesta: 'Sí, la rejilla del quemador se desgasta con el uso y se recomienda cambiarla cada 1 a 2 años.',
    borrador: false,
  },
  {
    id: 'garantia-rejilla',
    tema: 'garantia',
    orden: 20,
    pregunta: '¿Tiene garantía la rejilla del quemador?',
    respuesta:
      'No. La rejilla es una pieza de desgaste natural y no está cubierta por la garantía del equipo — es la única pieza que requiere reemplazo periódico según el uso.',
    borrador: false,
  },
  {
    id: 'templador-vs-controlador',
    tema: 'instalacion',
    orden: 21,
    pregunta: '¿El templador de la estufa es lo mismo que el controlador de presión?',
    respuesta:
      'No. El templador de la combustión cumple otra función: permite la doble combustión, reduce la emisión de material particulado y mejora la eficiencia de la estufa para la leña.',
    borrador: false,
  },
  {
    id: 'transformar-estufa-pellets',
    tema: 'uso',
    orden: 22,
    pregunta: '¿Puedo transformar una estufa a pellets para que use leña y pellet?',
    respuesta: 'No. El material de una estufa a pellets es demasiado delgado para soportar el equipo Waiki, y su electrónica no es compatible.',
    borrador: false,
  },
  {
    id: 'certificacion-sec',
    tema: 'normativa',
    orden: 23,
    pregunta: '¿Waiki necesita certificación SEC?',
    respuesta: 'No. Es un accesorio sin electricidad, y habría que certificar cada modelo de estufa existente en el mercado — por eso no aplica.',
    borrador: false,
  },
  {
    id: 'restriccion-ambiental',
    tema: 'normativa',
    orden: 24,
    pregunta: '¿Puedo usar Waiki en ciudades con restricción ambiental?',
    respuesta: 'Sí. El pellet es una biomasa permitida durante los episodios de restricción ambiental.',
    borrador: false,
  },
  {
    id: 'lena-y-pellet-simultaneo',
    tema: 'uso',
    orden: 25,
    pregunta: '¿Puedo usar leña y pellet al mismo tiempo?',
    respuesta: 'No. El poder calorífico combinado de ambos puede ser excesivo y representa un riesgo. Se usa uno u otro, nunca los dos a la vez.',
    borrador: false,
  },
  // Agregada el 08-09-2026. El dato existía en el sitio —en el artículo
  // `por-que-preferir-pellets`— pero no en el FAQ, que es donde la gente lo
  // busca: es la causa más común de que un equipo "no funcione bien", y ya
  // había una pregunta vecina ("¿por qué se recomiendan ciertas marcas?") que
  // hablaba de compatibilidad sin decir nunca en qué se mide.
  //
  // Fuente: el artículo "¿Por qué preferir pellets?" del sitio anterior,
  // literal — "densidad sobre 680 y cilindros de no más de 3 cm". La
  // referencia a la ceniza según densidad viene de la pregunta
  // `frecuencia-liberar-ceniza`, que ya estaba publicada.
  {
    id: 'que-pellet-usar',
    tema: 'consumo',
    orden: 26,
    pregunta: '¿Qué pellet conviene usar?',
    respuesta:
      'Un pellet de calidad tiene densidad sobre 680 y cilindros de no más de 3 cm. Arde más limpio, rinde más y genera menos ceniza: con pellet de alta densidad hay que liberar ceniza cada 4 a 5 horas, mientras que con uno de baja densidad toca cada 1,5 a 2 horas. Cualquier marca que cumpla eso sirve.',
    borrador: false,
  },
];

export default faq;
