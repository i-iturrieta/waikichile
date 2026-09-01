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
 * Ronda de revisión 01-09-2026 (feedback directo de la clienta sobre el
 * sitio publicado): las 2 fotos originales (`producto-chakay-1.jpg`,
 * `-2.jpg`, con la placa "CHAKAY" grabada) son del modelo que ya no se
 * fabrica — la clienta las señaló explícitamente como descontinuadas. El
 * modelo que se vende ahora es el que ya estaba fotografiado con otra
 * marca previa en el panel (carpeta fuente `imagenes-cliente/1-productos/`,
 * subcarpeta del nombre antiguo — NO repetir ese nombre acá: hay una prueba
 * automatizada en `lib/contenido/guardia.test.ts` que falla si aparece en
 * content/app/components, ARCHITECTURE.md §9). La clienta confirmó en esa
 * misma conversación que ese equipo y Chakay "son lo mismo ahora", así que
 * esas 4 fotos + la de `4-portada/portada-01.jpg` (variante mixta
 * negro/rojo) pasan a ser el banco de fotos real de Chakay, en
 * `producto-chakay-3.jpg` a `-6.jpg`. Las fotos 1-2 originales se dejan sin
 * referenciar (no se borran del disco) por si hace falta revertir. El
 * plazo de entrega también se corrigió de "20 a 30 días hábiles" a "1 mes y
 * medio a 2 meses" — dato entregado directamente por la clienta.
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
    'Se fabrica por temporada, con un plazo de 1 mes y medio a 2 meses desde la reserva (30% del valor total; el saldo se cancela contra entrega). El despacho se coordina por Starken, Cruz del Sur o Casem Express, con el saldo contra el envío. El kit de caños no está incluido. El valor exacto depende del equipo y la instalación: se confirma al consultar, escribiendo por WhatsApp o el formulario de contacto.',
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
  plazoEntrega: '1 mes y medio a 2 meses',
  incluye: ['Codo con registro', 'Controlador de presión'],
  noIncluye: ['Kit de caños'],
  // Ver comentario de cabecera (ronda 01-09-2026): banco de fotos
  // reemplazado por el modelo vigente, no el descontinuado.
  imagenes: [
    { archivo: 'producto-chakay-3.jpg', alt: 'Chakay encendido, vista frontal con la marca visible, modelo actual' },
    { archivo: 'producto-chakay-4.jpg', alt: 'Chakay encendido, modelo actual, instalado junto a una ventana' },
    { archivo: 'producto-chakay-5.jpg', alt: 'Chakay encendido, modelo actual, instalado contra una pared clara' },
    { archivo: 'producto-chakay-6.jpg', alt: 'Chakay en su versión mixta negro y rojo, instalado junto a un comedor' },
  ],
  requiereControlador: false,
  destacado: true,
  orden: 2,
  borrador: false,
};

export default chakay;
