/**
 * Producto · Chakay (PHASE_1_PLAN.md, tarea 3b.1).
 *
 * Ficha técnica completa desde `contenido-rescatado/DATOS-ESTRUCTURADOS.md`
 * ("Producto · Chakay"), que a su vez viene de la ficha técnica publicada en
 * `waikichile.cl/product/chakay/`. `ancho`/`alto`/`fondo`/`peso` van en
 * `medidas`; `colores` en su propio campo; el resto de la ficha técnica
 * (sistema de calefacción, salida de caño, plancha de cocción, fabricación,
 * capacidad de carga, consumo, rendimiento y garantía) va en
 * `especificaciones`.
 *
 * `superficieRecomendada` usa 50–120 m² (la ficha técnica), no 60–120 m² (la
 * descripción de la misma página) — DATOS-ESTRUCTURADOS.md señala la ficha
 * técnica como la fuente más probable.
 *
 * La línea de garantía ("1 año por desperfecto de fabricación") se incluye
 * deliberadamente pese a la contradicción de plazo sin resolver en el FAQ
 * (6 meses) — instrucción directa de la tarea 3b.1: dos fuentes
 * independientes (esta ficha y el manual impreso) coinciden en 12 meses/1
 * año contra una que dice 6. Ver el reporte de este bloque para el detalle
 * de la tensión.
 *
 * `requiereControlador: false` — el controlador de presión viene incluido
 * con el equipo (`incluye`), a diferencia de Waiki.
 */

import type { Producto } from '../../lib/contenido/esquemas.ts';

const chakay: Producto = {
  slug: 'chakay',
  nombre: 'Chakay',
  tagline: 'Cocina de tiro natural que calefacciona por radiación y cocina sin horno.',
  descripcion:
    'Chakay es una cocina de tiro natural que calefacciona por radiación y quema pellet o leña. Incorpora una plancha superior de 32 × 42 cm pensada para cocinar sin horno ni cocina eléctrica: se usa con ollas y teteras directamente sobre la plancha. No es un accesorio secundario — es una de las dos funciones principales del equipo.\n\n' +
    'Se carga, se enciende y la intensidad de la llama se regula con el controlador de presión, que viene incluido. Según su ficha técnica, cubre entre 50 y 120 m².\n\n' +
    'Se fabrica por temporada, con un plazo de 20 a 30 días hábiles desde la reserva (30% del valor total; el saldo se cancela contra entrega). El despacho se coordina por Starken, Cruz del Sur o Casem Express, con el saldo contra el envío. El kit de caños no está incluido.',
  precio: { tipo: 'consultar' },
  superficieRecomendada: { min: 50, max: 120 },
  medidas: { ancho: 67, alto: 93, fondo: 32, peso: 120 },
  especificaciones: [
    { etiqueta: 'Sistema de calefacción', valor: 'Radiación' },
    { etiqueta: 'Salida de caño', valor: '4 pulgadas' },
    { etiqueta: 'Plancha de cocción', valor: '32 × 42 cm' },
    { etiqueta: 'Fabricación del quemador', valor: 'Acero inoxidable' },
    { etiqueta: 'Rejilla del quemador', valor: 'Acero inoxidable refractario' },
    { etiqueta: 'Tipo de fabricación', valor: 'Corte láser' },
    { etiqueta: 'Capacidad de carga', valor: '9 kg' },
    { etiqueta: 'Consumo promedio', valor: '0,8 a 1,5 kg de pellet por hora' },
    { etiqueta: 'Rendimiento de un saco de 15 kg', valor: '15 a 16 horas promedio' },
    { etiqueta: 'Garantía', valor: '1 año por desperfecto de fabricación' },
  ],
  colores: ['Negro', 'Mixto (negro y rojo)'],
  plazoEntrega: '20 a 30 días hábiles',
  incluye: ['Codo con registro', 'Controlador de presión'],
  noIncluye: ['Kit de caños'],
  // Bloque 11, tarea 11.6: solo 2 imágenes reales de Chakay llegaron en
  // imagenes-cliente/1-productos/chakay/ (contra los 3 marcadores
  // originales) — mismo criterio que Waiki, se reduce el arreglo a lo real.
  imagenes: [
    { archivo: 'producto-chakay-1.jpg', alt: 'Chakay encendido, vista frontal con la marca visible' },
    { archivo: 'producto-chakay-2.jpg', alt: 'Chakay instalado en un rincón de cerámica, con la salida de caño visible' },
  ],
  requiereControlador: false,
  destacado: true,
  orden: 2,
  borrador: false,
};

export default chakay;
