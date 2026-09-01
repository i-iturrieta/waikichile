/**
 * Producto · Mini Nahuen (ronda de revisión 01-09-2026).
 *
 * Producto nuevo, no existía en el catálogo hasta ahora. Fuente única:
 * la clienta envió una ficha técnica fotografiada (imagen "FICHA TÉCNICA:
 * MINI NAHUEN") más 2 fotos reales del equipo instalado
 * (`producto-mini-nahuen-1.jpg`, `-2.jpg`, copiadas de las fotos 5 y 7 de
 * la ronda de cambios del 01-09-2026).
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
 *     `noIncluye` queda vacío. Se deja `precio.tipo: 'consultar'` (no
 *     'fijo') porque son dos configuraciones, no un monto único, y no se
 *     sabe si esos montos incluyen IVA — el desglose completo va en la
 *     descripción como texto, sin perder el dato.
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
    'El valor es $790.000 e incluye el kit de caños y el controlador de presión manual. Con controlador de presión automático en vez del manual, el valor es $875.000. El valor exacto y la disponibilidad se confirman al consultar.',
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
  incluye: ['Kit de caños', 'Controlador de presión (manual o automático, según valor)'],
  noIncluye: [],
  imagenes: [
    { archivo: 'producto-mini-nahuen-1.jpg', alt: 'Mini Nahuen mixto negro y rojo, instalado y encendido junto a un sillón' },
    { archivo: 'producto-mini-nahuen-2.jpg', alt: 'Mini Nahuen negro, instalado y encendido, con un gato sentado junto al equipo' },
  ],
  requiereControlador: false,
  destacado: true,
  orden: 4,
  borrador: false,
};

export default miniNahuen;
