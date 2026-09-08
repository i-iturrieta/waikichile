/**
 * Producto · Mini Nahuen (ronda de revisión 01-09-2026).
 *
 * Producto nuevo, no existía en el catálogo hasta ahora. Fuente única:
 * la clienta envió una ficha técnica fotografiada (imagen "FICHA TÉCNICA:
 * MINI NAHUEN") más 2 fotos reales del equipo instalado
 * (`producto-mini-nahuen-1.jpg`, `-2.jpg`, copiadas de las fotos 5 y 7 de
 * la ronda de cambios del 01-09-2026).
 *
 * Ronda de revisión 01-09-2026 (segunda pasada): la propia ficha técnica se
 * suma como `producto-mini-nahuen-3.jpg` — la clienta la reenvió renombrada
 * (`foto-6-usar-incluye-ficha-tecnica-nahuen.jpeg`) para que no se volviera a
 * omitir del banco de fotos. Hasta ahora solo se había usado como fuente de
 * datos (ver transcripción abajo), no como imagen de la galería.
 *
 * Transcripción literal de la ficha:
 *   - Potencia: "6.5 kl calorías" — así lo dice la ficha; probablemente un
 *     error de tipeo (¿"6,5 kW"? ¿"6,5 kg/h"?) pero ARCHITECTURE.md §1.6
 *     prohíbe inventar/corregir datos de la clienta sin confirmar. Se deja
 *     literal en `especificaciones` — pendiente de que Ignacio confirme el
 *     valor correcto con la clienta.
 *   - Valor: "$790.000 con kit de cañaños y controlador MANUAL, para casa
 *     de $875.000 si desean el controlador automático" (la ficha tiene un
 *     salto de línea raro ahí, se interpreta como dos configuraciones de
 *     precio, no dos productos). A diferencia de Waiki/Chakay/Nahuen, acá
 *     el kit de caños SÍ viene incluido en el valor base — por eso
 *     `noIncluye` queda vacío.
 *
 * PRECIO: SE PUBLICÓ Y SE REVIRTIÓ EL MISMO DÍA (08-09-2026). Quedó en
 * `consultar`. Vale la historia completa, porque el próximo que lea la ficha
 * de la clienta va a querer publicar los $790.000 otra vez:
 *
 *   1. Se publicó tras el mensaje de la clienta ("la mini Nahuen también
 *      está con precio"), tomando la configuración con controlador MANUAL,
 *      que según Ignacio (07-09-2026) es la única que existe: la variante
 *      automática de $875.000 no está a la venta. Eso sigue siendo cierto y
 *      por eso `incluye` dice "Controlador de presión" a secas.
 *   2. `incluyeIva: true` habría sido INFERENCIA, no dato: la ficha no
 *      menciona el IVA.
 *   3. ⚠️ Y el motivo de fondo de la reversión: **$790.000 es exactamente el
 *      precio que una fuente fechada le da a la Nahuen GRANDE.** No es una
 *      coincidencia suelta — en `contenido-rescatado/DATOS-ESTRUCTURADOS.md`
 *      ("Producto · Nahuen", página del 07-02-2025) ese monto viene en la
 *      misma tabla que las medidas 50 × 93 × 32 cm y los 40 a 70 m², que son
 *      inequívocamente los del equipo grande y son los que esta misma
 *      codebase publica en `nahuen.ts`. O sea: hay evidencia verificable que
 *      ancla ese número a la Nahuen grande, y del otro lado una imagen sin
 *      fecha con el mismo número. Dos productos distintos con el monto
 *      idéntico es la forma que tiene un dato arrastrado de una ficha a otra.
 *
 *      Indicio en contra, que también hay que tener a la vista: la ficha no
 *      dice "$790.000" a secas, dice "con kit de cañaños y controlador
 *      MANUAL", mientras que la Nahuen a $790.000 NO incluía kit ni
 *      instalación. Quien copia un número no suele agregarle una condición
 *      distinta. No alcanza para decidir, sí para no descartar la ficha.
 *
 * **No republicar este precio sin que la clienta lo confirme**, y de paso
 * confirmar el de Nahuen: mientras los dos equipos compartan monto, uno de
 * los dos está mal. Ver `FICHAS-POR-CONFIRMAR.md` y `PENDIENTES.md §2.1`.
 *
 * ⚠️ La ficha técnica fotografiada se publica como imagen de galería
 * (`producto-mini-nahuen-3.jpg`) a pedido explícito de la clienta, y en esa
 * foto se lee el desglose completo, incluido el controlador automático de
 * $875.000. O sea: el texto de la ficha dice un precio y la foto muestra dos.
 * Es visible para cualquiera que amplíe la imagen. Está anotado en
 * `FICHAS-POR-CONFIRMAR.md` para resolverlo con ella — se resuelve sacando la
 * foto o actualizando la ficha impresa, y ninguna de las dos es decisión
 * nuestra.
 *   - No hay peso documentado (igual que Nahuen grande) → `medidas: null`,
 *     ancho/alto/fondo como especificaciones sueltas.
 *
 * Colores: se infieren de las 2 fotos reales (una unidad negra entera, una
 * mixta negro y rojo) — no vienen listados en la ficha técnica.
 *
 * `plazoEntrega: null` — no documentado, no se inventa.
 */

import type { Producto } from '../../lib/contenido/esquemas.ts';

const miniNahuen: Producto = {
  slug: 'mini-nahuen',
  nombre: 'Mini Nahuen',
  tagline: 'La versión más compacta de Nahuen: tiro natural a pellets, sin electricidad, para espacios chicos.',
  descripcion:
    'Mini Nahuen es la versión más compacta de la línea Nahuen: un equipo de tiro natural a pellets o briquetas, pensado para espacios de 20 a 50 m². No depende de la electricidad, así que sigue calefaccionando aunque se corte la luz.\n\n' +
    'El valor incluye el kit de caños y el controlador de presión, que en otros equipos se cotiza aparte. La disponibilidad se confirma al consultar por WhatsApp, correo o teléfono.',
  // Vuelve a 'consultar' el 08-09-2026, el mismo día en que se había
  // publicado. Ver el comentario de cabecera: el monto descansa en dos
  // supuestos nuestros, y el segundo es serio — $790.000 es el precio que una
  // fuente fechada y con medidas verificables le da a la Nahuen GRANDE.
  // ⚠️ 08-09-2026 — el dueño confirmó el monto, el IVA y las condiciones de
  // compra de los $790.000, pero NO a qué equipo corresponden: escribió
  // "faltaría el precio $790.000 IVA incluído. Este equipo se debe solicitar
  // al fono WhatsApp de la empresa con una reserva del 30% y el saldo
  // coordinarlo con el área de Venta", diciendo "aca" sin nombrarlo. El monto
  // sigue calzando con este equipo y con el otro Nahuen, así que sigue en
  // `consultar`. Cuando llegue la respuesta, todo lo demás ya está: el IVA
  // está confirmado y las condiciones de compra también. `PENDIENTES.md §2.1`.
  precio: { tipo: 'consultar' },
  superficieRecomendada: { min: 20, max: 50 },
  medidas: null,
  especificaciones: [
    { etiqueta: 'Ancho', valor: '26 cm' },
    { etiqueta: 'Alto', valor: '90 cm' },
    { etiqueta: 'Fondo', valor: '40 cm' },
    { etiqueta: 'Potencia', valor: '6,5 kl calorías (dato tal cual lo entregó la clienta, a confirmar)' },
    { etiqueta: 'Capacidad del contenedor', valor: '9,5 kg' },
    { etiqueta: 'Autonomía de calefacción', valor: '8 a 12 horas' },
    { etiqueta: 'Combustible', valor: 'Pellets o briquetas' },
  ],
  colores: ['Negro', 'Mixto (negro y rojo)'],
  plazoEntrega: null,
  incluye: ['Kit de caños', 'Controlador de presión'],
  noIncluye: [],
  imagenes: [
    { archivo: 'producto-mini-nahuen-1.jpg', alt: 'Mini Nahuen mixto negro y rojo, instalado y encendido junto a un sillón' },
    { archivo: 'producto-mini-nahuen-2.jpg', alt: 'Mini Nahuen negro, instalado y encendido, con un gato sentado junto al equipo' },
    { archivo: 'producto-mini-nahuen-3.jpg', alt: 'Ficha técnica de Mini Nahuen: medidas, potencia, valor y capacidad del contenedor' },
  ],
  requiereControlador: false,
  usaCondicionesEstandar: true,
  destacado: true,
  orden: 4,
  borrador: false,
};

export default miniNahuen;
