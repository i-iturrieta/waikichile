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
 *   - No hay peso documentado (igual que Nahuen grande) → `medidas: null`,
 *     ancho/alto/fondo como especificaciones sueltas.
 *
 * PRECIO: $790.000 IVA INCLUIDO. Se publicó, se revirtió el mismo día y se
 * volvió a publicar — todo el 08-09-2026. Vale la historia completa, porque
 * es el dato más discutido de esta codebase y recién ahora está cerrado:
 *
 *   1. Se publicó tras el mensaje de la clienta ("la mini Nahuen también
 *      está con precio"), tomando la configuración con controlador MANUAL.
 *   2. Se revirtió a `consultar` horas después, por un motivo serio:
 *      **$790.000 es exactamente el monto que una fuente fechada le da a la
 *      Nahuen GRANDE.** En `contenido-rescatado/DATOS-ESTRUCTURADOS.md`
 *      ("Producto · Nahuen", página del 07-02-2025) viene en la misma tabla
 *      que las medidas 50 × 93 × 32 cm y los 40 a 70 m², que son
 *      inequívocamente los del equipo grande. Dos productos con el mismo
 *      monto es la forma que tiene un dato arrastrado de una ficha a otra, y
 *      no había cómo saber cuál de los dos estaba mal.
 *   3. Se volvió a publicar con el detalle que aportó Ignacio el 08-09-2026:
 *      *"la mini-nahuen vale 790.000, pero sí incluye el kit de caño y el
 *      regulador manual. La nahuen normal no."*
 *   4. Y el cierre, poco después, sobre el otro equipo: *"la nahuen normal
 *      vale 790.000 a secas, pero no incluye nada"*.
 *
 * **La colisión nunca existió: los dos equipos valen lo mismo.** Lo que los
 * diferencia es qué trae cada uno por ese precio. La premisa que sostuvo dos
 * rondas de análisis —"no pueden valer lo mismo, uno de los dos datos está
 * arrastrado"— era falsa, y por eso conviene dejarla escrita: era razonable y
 * era incorrecta. Ninguna de las dos fuentes estaba equivocada.
 *
 * Lo que sí resultó decisivo fue el detalle, no el monto:
 *
 *   - La ficha nunca dijo "$790.000" a secas: decía "con kit de cañaños y
 *     controlador MANUAL", mientras que la Nahuen a $790.000 **no incluía kit
 *     ni instalación**. Ese contraste —anotado en su momento como "indicio
 *     para no descartar la ficha"— era en realidad la explicación entera.
 *   - El **controlador manual existe**, y como accesorio aparte
 *     (`content/accesorios/controlador-de-presion-manual.ts`, 08-09-2026).
 *     Hasta ese día se creía que había un solo controlador, lo que dejaba la
 *     mención de la ficha en el aire; ahora encaja.
 *   - Y por lo mismo encajan los **$875.000 "si desean el controlador
 *     automático"** que se leen en la foto de la ficha, publicada en la
 *     galería a pedido de la clienta: describen una configuración de un
 *     producto que sí existe
 *     (`content/accesorios/controlador-de-presion-automatico.ts`). Dejan de
 *     ser un dato huérfano visible para cualquiera que amplíe la imagen.
 *
 * `content/productos/nahuen.ts` quedó publicado el mismo día en ese mismo
 * monto. ⚠️ Efecto que conviene que la empresa mire, anotado en
 * `PENDIENTES.md §2.1`: **el sitio muestra dos equipos al mismo precio donde
 * el más chico incluye más.** Este cubre 20 a 50 m² con kit y controlador;
 * Nahuen cubre 40 a 70 m² sin nada. Es lo que dicen las fuentes y así se
 * publica, pero cualquiera que compare las dos fichas lo va a notar.
 *
 * `incluyeIva: true` **ya no es inferencia**: el 08-09-2026 el dueño escribió
 * *"faltaría el precio $790.000 IVA incluído. Este equipo se debe solicitar
 * al fono WhatsApp de la empresa con una reserva del 30% y el saldo
 * coordinarlo con el área de Venta"*. Ese mensaje decía "aca" sin nombrar el
 * equipo, y por eso no alcanzaba por sí solo; con el equipo ya identificado,
 * aporta las tres cosas: monto, IVA y condiciones de compra (que son las
 * estándar, `usaCondicionesEstandar: true`).
 *
 * `incluye` nombra el controlador **manual** desde el 08-09-2026, no
 * "Controlador de presión" a secas: desde que son dos accesorios distintos,
 * decirlo a secas sería ambiguo, y la ficha de la clienta especifica cuál.
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
    'El valor incluye el kit de caños y el controlador de presión manual, que en los demás equipos se cotizan aparte. La disponibilidad se confirma al consultar por WhatsApp, correo o teléfono.',
  // $790.000 IVA incluido — confirmado por Ignacio el 08-09-2026, junto con
  // el detalle que zanjó la colisión con Nahuen: es el precio de este equipo
  // *porque* incluye kit de caños y regulador manual, cosa que la Nahuen
  // grande no. El IVA y las condiciones de compra vienen del mensaje del
  // dueño del mismo día. Ver la nota de cabecera y `PENDIENTES.md §2.1`.
  precio: { tipo: 'fijo', monto: 790000, incluyeIva: true },
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
  incluye: ['Kit de caños', 'Controlador de presión manual'],
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
