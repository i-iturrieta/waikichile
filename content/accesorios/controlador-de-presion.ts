/**
 * Accesorio · Controlador de presión (PHASE_1_PLAN.md, tarea 3b.2).
 *
 * Fuente: `contenido-rescatado/DATOS-ESTRUCTURADOS.md` ("Accesorio ·
 * Regulador de tiro"), que reutiliza el texto publicado en
 * `/regulador-de-tiro/` (`textos-sitio-anterior.txt`).
 *
 * Nomenclatura: "controlador de presión" como nombre principal y "regulador
 * de tiro" como sinónimo en el texto — así lo usa el resto del sitio (FAQ,
 * ficha de Chakay) y lo sugiere DATOS-ESTRUCTURADOS.md §10c.
 *
 * Publicación 07-09-2026 — `borrador: false`.
 *
 * Estuvo en `borrador: true` por un detalle de tubería, no por falta de
 * contenido: la ficha estaba completa y redactada, pero las dos fotografías
 * reales que llegaron a `imagenes-cliente/2-accesorios/
 * controlador-de-presion/` miden **461 × 1024 px**, y el pipeline generaba
 * variantes solo en 640/1280/1920 px de ancho sin ampliar nunca — con 461 px
 * de ancho no producía ninguna, y `<Imagen>` lanza si un archivo no tiene
 * variantes. Se corrigió el pipeline (`scripts/procesar-imagenes.ts`,
 * `anchosAGenerar`): un original más angosto que 640 px ahora emite una
 * variante **a su ancho nativo**. No se amplía nada; se sirven los 461 px
 * que la foto tiene, y para los ~262 px en que se muestra la tarjeta en
 * escritorio alcanzan de sobra.
 *
 * Las dos fotos entran a la galería (`accesorio-controlador-1.jpg` y
 * `-2.jpg`): la primera de frente, con la placa del fabricante legible, y la
 * segunda en ángulo, que es la que deja ver cómo se monta sobre el caño.
 *
 * **Un solo controlador** (decisión de Ignacio, 07-09-2026). La clienta había
 * mencionado un "controlador de presión automático […] para las estufas
 * enteras", lo que hacía pensar en un segundo producto; Ignacio confirmó que
 * no existe tal variante y que este es el único. La mención al "controlador
 * automático" que aparece transcrita en `content/productos/mini-nahuen.ts`
 * viene de la ficha técnica que envió la clienta y **no se tocó** — es una
 * cita literal de un documento de ella, y queda como pregunta abierta en
 * `PENDIENTES.md`, no como un producto del catálogo.
 *
 * **Precio actualizado a $85.000 el 08-09-2026** por mensaje del dueño:
 * "el valor del controlador para los equipos de Waiki es de $85000". Antes
 * decía **$45.000**, que era el precio que publicaba el sitio anterior
 * (`contenido-rescatado/DATOS-ESTRUCTURADOS.md`, de febrero de 2025 o
 * anterior). No es la corrección de un dato mal leído: son dos precios
 * distintos en dos momentos distintos, y el vigente es el que dio el dueño.
 * Los $45.000 quedan registrados acá como el histórico, no en el sitio.
 *
 * ⚠️ `incluyeIva: true` **sigue siendo una inferencia, no un dato**. Ni la
 * fuente rescatada ("$45.000, adicional al equipo Waiki") ni el mensaje del
 * dueño mencionan el IVA. Se asume incluido porque todos los demás precios
 * de la empresa se declaran así (Chakay "$1.010.000 IVA incluido", Nahuen
 * "$790.000 IVA incluido", rejilla "$37.000 a $40.000 IVA incluido") y
 * porque un precio a consumidor final en Chile se publica con IVA. Está
 * anotado en `PENDIENTES.md` para confirmar.
 *
 * ⚠️ Las fotos muestran la placa del fabricante: "DRAUGHT REGULATOR RCO
 * Ø80", norma DIN 4795, rango de depresión 10–35 Pa. **No se incorporó a
 * `especificaciones`.** El Ø80 mm es el diámetro de esa unidad concreta, y
 * la ficha de Chakay declara salida de caño de 4 pulgadas (~101,6 mm): no
 * calzan, así que publicar ese diámetro podría describir mal lo que venden.
 * Queda en `PENDIENTES.md` para confirmar con la clienta.
 */

import type { Accesorio } from '../../lib/contenido/esquemas.ts';

const controladorDePresion: Accesorio = {
  slug: 'controlador-de-presion',
  nombre: 'Controlador de presión',
  tagline: 'Regula el tiro de tu combustión para un consumo estable de pellet.',
  descripcion:
    'El controlador de presión —también llamado regulador de tiro— es una válvula manual que regula los cambios de presión del conducto de salida de humos. Las condiciones climáticas de cada lugar y el funcionamiento particular de cada combustión varían con frecuencia, lo que hace que la depresión generada en la base cambie constantemente; el controlador mantiene esas condiciones estables y evita que el consumo de pellet aumente sin necesidad.\n\n' +
    'Se recomienda instalarlo cuando la cañería de salida supera los 3,5 metros —cada tira de cañería mide 1 metro, así que basta con contarlas— o cuando la instalación está en un sector con mucho viento. Es de acero inoxidable.',
  precio: { tipo: 'fijo', monto: 85000, incluyeIva: true },
  superficieRecomendada: null,
  medidas: null,
  especificaciones: [
    { etiqueta: 'Material', valor: 'Acero inoxidable' },
    { etiqueta: 'Cuándo se necesita', valor: 'Cañería sobre 3,5 m, o instalación en sector con mucho viento' },
  ],
  colores: [],
  plazoEntrega: null,
  incluye: [],
  noIncluye: [],
  imagenes: [
    {
      archivo: 'accesorio-controlador-1.jpg',
      alt: 'Controlador de presión instalado en el caño de salida de humos, visto de frente, con su placa y el regulador circular',
    },
    {
      archivo: 'accesorio-controlador-2.jpg',
      alt: 'El mismo controlador visto en ángulo, montado sobre el caño de acero contra un muro de piedra',
    },
  ],
  requiereControlador: false,
  // No se reserva un accesorio con un 30% del valor.
  usaCondicionesEstandar: false,
  destacado: false,
  orden: 1,
  esRepuesto: false,
  vidaUtil: null,
  borrador: false,
};

export default controladorDePresion;
