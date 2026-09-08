/**
 * Producto · Nahuen (PHASE_1_PLAN.md, tarea 3b.1).
 *
 * Fuente: `contenido-rescatado/DATOS-ESTRUCTURADOS.md` ("Producto · Nahuen")
 * y la ficha `nahuen-el-equipo-a-pellets-sin-electricidad` en
 * `textos-sitio-anterior.txt`. AUDITORIA §2.2 la describe como "ficha
 * completa" y el plan (tarea 3b.1) la da por completa sin condiciones.
 *
 * ⚠️ Desviación respecto de esa expectativa, reportada explícitamente (no
 * improvisada): ninguna fuente rescatada trae el **peso** de Nahuen — solo
 * ancho/alto/fondo. `medidas` en el esquema es un objeto todo-o-nada
 * (ancho, alto, fondo, peso), así que no se puede completar sin inventar el
 * peso, y ARCHITECTURE.md §1.6 lo prohíbe explícitamente para `medidas`. Se
 * deja `medidas: null` y las tres dimensiones conocidas se preservan como
 * `especificaciones` sueltas, para no perder el dato. Esto hace que
 * `pnpm reporte` liste `producto nahuen: medidas` como pendiente, a
 * diferencia de lo que anticipaba el "Done when" de la tarea. Ver el reporte
 * de este bloque.
 *
 * Publicación 05-09-2026 — `borrador: false`.
 *
 * Nahuen estuvo en `borrador: true` desde el Bloque 11 (tarea 11.6) por una
 * única razón: no había llegado ni una fotografía real del equipo, y esa
 * tarea es explícita en que "ningún producto se publica con solo
 * marcadores". Esa condición ya no se cumple. Ignacio dejó dos fotos reales
 * en `imagenes-cliente/1-productos/nahuen/` (`nahuen1.jpeg`, `nahuen-2.jpeg`)
 * — las dos del equipo instalado y encendido en casa de un cliente — y son
 * las que ahora ocupan `producto-nahuen-1.jpg` y `-2.jpg`. Con eso el
 * producto entra al catálogo publicado, la ficha `/productos/nahuen/` se
 * genera y la tarjeta aparece en el home.
 *
 * La galería baja de 5 imágenes a 2, y no es una pérdida: las cinco
 * entradas anteriores eran marcadores en blanco con alt inventado ("vista
 * lateral", "detalle del cuerpo") describiendo fotos que no existían.
 * `producto-nahuen-3/4/5.jpg` se borraron de `content/images/` en vez de
 * quedar como marcadores huérfanos — el pipeline procesa todo lo que
 * encuentra ahí, y dejarlos habría seguido emitiendo variantes de
 * rectángulos grises a `public/img/`.
 *
 * Las dos fotos miden 1200×1600 y 900×1600 px: pasan el mínimo duro del
 * pipeline (640 px de lado mayor) pero quedan bajo los 2000 px que pide el
 * contrato de originales de ARCHITECTURE.md §9, así que `pnpm
 * procesar-imagenes` las anota como aviso. No es una excepción de Nahuen —
 * 37 de los 50 originales del sitio están en la misma situación, porque la
 * clienta fotografía con teléfono y envía por WhatsApp, que recomprime. Solo
 * generan variante de 640 px, y ese es el ancho que la tarjeta del home y la
 * galería de la ficha piden en móvil de todos modos.
 *
 * Los colores (`Negro`, `Rojo (según stock)`) NO se tocaron a la luz de las
 * fotos: las dos unidades fotografiadas son negras con la tapa lateral roja
 * —una combinación que el dato rescatado no describe— pero corregir el
 * catálogo de colores a partir de dos fotos sería inventar (§1.6). Queda
 * anotado para confirmar con la clienta.
 */

import type { Producto } from '../../lib/contenido/esquemas.ts';

const nahuen: Producto = {
  slug: 'nahuen',
  nombre: 'Nahuen',
  tagline: 'El equipo minimalista a pellets, sin electricidad y sin programación.',
  descripcion:
    'Nahuen es un equipo de tiro natural a pellets, pensado para cabañas y espacios de 40 a 70 m². No es programable, y eso se presenta como ventaja: al no depender de la electricidad, nunca deja de calefaccionar por un corte de luz.\n\n' +
    'Su entrega es de 1 a 1,5 meses desde la reserva. No incluye kit de caños ni instalación.',
  // ⚠️ 08-09-2026 — el dueño confirmó el monto, el IVA y las condiciones de
  // compra de los $790.000, pero NO a qué equipo corresponden: escribió
  // "faltaría el precio $790.000 IVA incluído. Este equipo se debe solicitar
  // al fono WhatsApp de la empresa con una reserva del 30% y el saldo
  // coordinarlo con el área de Venta", diciendo "aca" sin nombrarlo. El monto
  // sigue calzando con este equipo y con el otro Nahuen, así que sigue en
  // `consultar`. Cuando llegue la respuesta, todo lo demás ya está: el IVA
  // está confirmado y las condiciones de compra también. `PENDIENTES.md §2.1`.
  precio: { tipo: 'consultar' },
  superficieRecomendada: { min: 40, max: 70 },
  // Sin peso documentado en ninguna fuente rescatada — ver nota de cabecera.
  // Ancho/alto/fondo sí están documentados; se listan abajo como
  // especificaciones sueltas en vez de perderse.
  medidas: null,
  especificaciones: [
    { etiqueta: 'Ancho', valor: '50 cm' },
    { etiqueta: 'Alto', valor: '93 cm' },
    { etiqueta: 'Fondo', valor: '32 cm' },
    { etiqueta: 'Programable', valor: 'No — no depende de electricidad' },
  ],
  colores: ['Negro', 'Rojo (según stock)'],
  plazoEntrega: '1 a 1,5 meses desde la reserva',
  incluye: [],
  noIncluye: ['Kit de caños', 'Instalación'],
  imagenes: [
    {
      archivo: 'producto-nahuen-1.jpg',
      alt: 'Nahuen encendido en el rincón de una vivienda, cuerpo negro con tapa lateral roja y una tetera sobre la cubierta',
    },
    {
      archivo: 'producto-nahuen-2.jpg',
      alt: 'Nahuen encendido contra un muro de cerámica, con su salida de humos de acero hacia el techo',
    },
  ],
  requiereControlador: false,
  destacado: true,
  orden: 3,
  borrador: false,
};

export default nahuen;
