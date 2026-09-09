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
 *
 * Precio publicado 08-09-2026 — $1.010.000 IVA incluido. La clienta lo
 * confirmó por mensaje y el monto coincide exactamente con el del sitio
 * anterior (`contenido-rescatado/DATOS-ESTRUCTURADOS.md`), que es de febrero
 * de 2025 o anterior: son dos fuentes independientes diciendo lo mismo, no
 * un dato rescatado que se da por vigente. Es el primer precio de equipo del
 * sitio y el segundo precio publicado en total (el otro es el controlador).
 * Al dejar de ser `consultar`, esta ficha empieza a emitir `offers` en su
 * JSON-LD (`lib/seo/jsonld.ts`): el precio pasa a ser legible por Google.
 *
 * Lo que la clienta confirmó en el mismo mensaje y **ya estaba bien**: lo que
 * el equipo incluye (codo con registro y controlador de presión) y lo que no
 * (kit de caños). Venía del sitio anterior y no hubo que cambiarlo.
 */

import type { Producto } from "../../lib/contenido/esquemas.ts";

const chakay: Producto = {
  slug: "chakay",
  nombre: "Chakay",
  tagline:
    "Cocina de tiro natural que calefacciona por radiación y cocina sin horno.",
  descripcion:
    "Chakay es una cocina de tiro natural que calefacciona por radiación y quema pellet o leña. Incorpora una plancha superior de 32 × 42 cm pensada para cocinar sin horno ni cocina eléctrica: se usa con ollas y teteras directamente sobre la plancha. No es un accesorio secundario — es una de las dos funciones principales del equipo.\n\n" +
    "Se carga, se enciende y la intensidad de la llama se regula con el controlador de presión, que viene incluido. Según su ficha técnica, cubre entre 50 y 120 m².\n\n" +
    // Las condiciones de compra (reserva del 30%, saldo, despacho y
    // documento) salieron de este párrafo el 08-09-2026: ahora viven en
    // `content/condiciones-comerciales.ts` y la ficha las muestra en el
    // bloque "Cómo se compra". Repetirlas acá sería decir dos veces lo mismo
    // en la misma página. Queda solo lo propio de este equipo.
    "Se fabrica por temporada, con un plazo de 1 mes y medio a 2 meses desde la reserva. El kit de caños no está incluido. Cualquier duda sobre el equipo o la instalación se resuelve por WhatsApp, correo o teléfono.",
  // Precio confirmado por la clienta el 08-09-2026 ("la Chakay el precio es
  // de 1.010.000 (clp) iva incluido"). Coincide exactamente con el que
  // publicaba el sitio anterior en `/product/chakay/`
  // (`contenido-rescatado/DATOS-ESTRUCTURADOS.md`, "Producto · Chakay"): dos
  // fuentes independientes en el mismo monto, así que no hay inferencia acá.
  precio: { tipo: "fijo", monto: 1010000, incluyeIva: true },
  superficieRecomendada: { min: 50, max: 120 },
  medidas: { ancho: 67, alto: 93, fondo: 32, peso: 120 },
  especificaciones: [
    { etiqueta: "Sistema de calefacción", valor: "Radiación" },
    { etiqueta: "Salida de caño", valor: "4 pulgadas" },
    { etiqueta: "Plancha de cocción", valor: "32 × 42 cm" },
    { etiqueta: "Fabricación del quemador", valor: "Acero inoxidable" },
    { etiqueta: "Rejilla del quemador", valor: "Acero inoxidable refractario" },
    { etiqueta: "Tipo de fabricación", valor: "Corte láser" },
    { etiqueta: "Capacidad de carga", valor: "9 kg" },
    { etiqueta: "Consumo promedio", valor: "0,8 a 1,5 kg de pellet por hora" },
    {
      etiqueta: "Rendimiento de un saco de 15 kg",
      valor: "15 a 16 horas promedio",
    },
    { etiqueta: "Garantía", valor: "1 año por desperfecto de fabricación" },
  ],
  colores: ["Negro", "Mixto (negro y rojo)"],
  plazoEntrega: "1 mes y medio a 2 meses",
  incluye: ["Codo con registro"],
  noIncluye: ["Controlador de presión", "Kit de caños"],
  // Ver comentario de cabecera (ronda 01-09-2026): banco de fotos
  // reemplazado por el modelo vigente, no el descontinuado.
  imagenes: [
    {
      archivo: "producto-chakay-3.jpg",
      alt: "Chakay encendido, vista frontal con la marca visible, modelo actual",
    },
    {
      archivo: "producto-chakay-4.jpg",
      alt: "Chakay encendido, modelo actual, instalado junto a una ventana",
    },
    {
      archivo: "producto-chakay-5.jpg",
      alt: "Chakay encendido, modelo actual, instalado contra una pared clara",
    },
    {
      archivo: "producto-chakay-6.jpg",
      alt: "Chakay en su versión mixta negro y rojo, instalado junto a un comedor",
    },
    // Rescatadas del WordPress original el 08-09-2026, de la galería que la
    // propia ficha de WooCommerce declaraba para este producto. Las tres
    // llevan la placa de la marca anterior, que es la marca del modelo
    // VIGENTE: el descontinuado es el que lleva "CHAKAY" grabado (ver
    // `content/instalaciones.ts`). Se descartaron de esa misma galería las
    // que muestran el modelo descontinuado. Ver `PENDIENTES.md §1.5`.
    {
      archivo: "producto-chakay-7.jpg",
      alt: "Chakay encendido, modelo actual, instalado en el rincón de un living",
    },
    {
      archivo: "producto-chakay-8.jpg",
      alt: "Chakay encendido, modelo actual, con su salida de humos hacia el techo",
    },
    {
      archivo: "producto-chakay-9.jpg",
      alt: "Chakay encendido, modelo actual, instalado contra un muro claro",
    },
    // Planos de medidas del fabricante, rescatados de la página "Medidas de
    // equipo Chakay" del sitio anterior. Ver la nota de cabecera.
    {
      archivo: "medidas-chakay-1.png",
      alt: "Plano de medidas de Chakay: vista frontal de 67 cm de ancho por 93 de alto, vista lateral de 32 cm de fondo, y vista con la puerta de carga abierta",
    },
    {
      archivo: "medidas-chakay-2.png",
      alt: "Plano de la vista frontal de Chakay, acotada en 67 cm de ancho",
    },
    {
      archivo: "medidas-chakay-3.png",
      alt: "Plano de la vista lateral de Chakay, acotada en 93 cm de alto, con la entrada de aire abajo y la salida de aire arriba",
    },
    {
      archivo: "medidas-chakay-4.png",
      alt: "Plano de la vista superior de Chakay, acotada en 32 cm de fondo, con el detalle de la plancha de cocción y el quemador",
    },
  ],
  requiereControlador: false,
  usaCondicionesEstandar: true,
  destacado: true,
  orden: 2,
  borrador: false,
};

export default chakay;
