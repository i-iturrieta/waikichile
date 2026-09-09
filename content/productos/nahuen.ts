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
 * PRECIO: $790.000 IVA INCLUIDO, publicado el 08-09-2026 — y con eso se
 * cierra la discusión más larga de esta codebase, que ocupó buena parte de
 * `PENDIENTES.md §2.1`. Conviene el resumen, porque la conclusión es
 * contraintuitiva y alguien va a querer "corregirla":
 *
 *   - El monto $790.000 aparecía en DOS equipos: acá, por la página del
 *     sitio anterior del 07-02-2025 (en la misma tabla que las medidas
 *     50 × 93 × 32 cm y los 40 a 70 m², inequívocamente de este equipo), y
 *     en `mini-nahuen.ts`, por la ficha técnica que envió la clienta.
 *   - Durante dos rondas se dio por sentado que **no podían valer lo mismo**
 *     y que uno de los dos datos estaba arrastrado de una ficha a otra. Sobre
 *     esa premisa el precio de la Mini se publicó, se revirtió y se volvió a
 *     publicar.
 *   - **La premisa era falsa.** Ignacio, 08-09-2026, en dos mensajes: *"la
 *     mini-nahuen vale 790.000, pero sí incluye el kit de caño y el regulador
 *     manual. La nahuen normal no"* y, sobre este equipo, *"la nahuen normal
 *     vale 790.000 a secas, pero no incluye nada"*.
 *
 * O sea: los dos equipos cuestan lo mismo y **se diferencian por lo que traen
 * por ese precio**, no por el precio. Nunca hubo un dato arrastrado.
 *
 * Y no es palabra contra nada: el monto de este equipo tiene ahora **dos
 * fuentes independientes que coinciden exacto** — la página de febrero de
 * 2025 y la confirmación de Ignacio de hoy. Es el mismo estándar de prueba
 * que tiene Chakay, el precio mejor respaldado del sitio.
 *
 * `incluyeIva: true` **no es inferencia acá**: la página del sitio anterior
 * dice literal "$790.000 IVA incluido". (En la Mini sí lo fue hasta que el
 * dueño lo confirmó por mensaje.)
 *
 * ✅ **Los dos equipos al mismo precio: confirmado deliberado** (Ignacio,
 * 09-09-2026: "sí, las dos nahuen valen lo mismo"). Se le planteó
 * explícitamente que el sitio queda mostrando dos equipos en $790.000 donde
 * el más chico incluye más —Nahuen cubre 40 a 80 m² y no trae nada; Mini
 * Nahuen cubre 20 a 50 m² y trae kit de caños y controlador manual— y que
 * cualquier comprador que compare las dos fichas lo va a notar. Es una
 * decisión comercial de la empresa, tomada a la vista de eso. Deja de ser un
 * pendiente.
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
    'Nahuen es un equipo de tiro natural a pellets, pensado para cabañas y espacios de 40 a 80 m². No es programable, y eso se presenta como ventaja: al no depender de la electricidad, nunca deja de calefaccionar por un corte de luz.\n\n' +
    'Su entrega es de 1 a 1,5 meses desde la reserva. No incluye kit de caños, controlador de presión ni instalación.',
  // $790.000 IVA incluido — publicado el 08-09-2026. Ver la nota de cabecera:
  // la colisión con Mini Nahuen no se resolvió descartando un monto, sino
  // constatando que **los dos equipos valen lo mismo y se diferencian por lo
  // que incluyen**. Este no incluye nada; la Mini trae kit de caños y
  // regulador manual. `PENDIENTES.md §2.1`.
  precio: { tipo: 'fijo', monto: 790000, incluyeIva: true },
  // 08-09-2026: pasa de 40-70 a 40-80 m². Los 40 a 70 venían de la página
  // del sitio anterior (07-02-2025); los 40 a 80 vienen de una pieza gráfica
  // de la propia empresa de marzo de 2025 —más nueva— donde se lee "para
  // casas de 40 a 80 mt²".
  //
  // ✅ **Confirmado por Ignacio el 09-09-2026** ("confirmo 40-80 nahuen"), lo
  // que importa porque la pieza que originó el dato se retiró de la galería
  // al día siguiente por otro motivo (ver `imagenes`). El dato queda
  // confirmado por su cuenta, no apoyado en una imagen que ya no está.
  superficieRecomendada: { min: 40, max: 80 },
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
  // "Controlador de presión" se agrega el 08-09-2026: Ignacio, al confirmar
  // que la Mini Nahuen sí lo incluye, precisó que "la nahuen normal no". No
  // se nombra cuál de los dos controladores (ver `content/accesorios/`),
  // porque lo confirmado es que no viene ninguno.
  noIncluye: ['Kit de caños', 'Controlador de presión', 'Instalación'],
  imagenes: [
    {
      archivo: 'producto-nahuen-1.jpg',
      alt: 'Nahuen encendido en el rincón de una vivienda, cuerpo negro con tapa lateral roja y una tetera sobre la cubierta',
    },
    {
      archivo: 'producto-nahuen-2.jpg',
      alt: 'Nahuen encendido contra un muro de cerámica, con su salida de humos de acero hacia el techo',
    },
    // Rescatadas del WordPress original el 08-09-2026. La primera es la
    // única foto que usaba la página `/nahuen-el-equipo-a-pellets-sin-
    // electricidad/` del sitio anterior, así que la atribución al equipo no
    // es nuestra. Ver `PENDIENTES.md §1.5`.
    {
      archivo: 'producto-nahuen-3.jpg',
      alt: 'Nahuen negro instalado en una cocina, con su salida de humos hacia el techo',
    },
    // ⚠️ `producto-nahuen-4.jpg` SE RETIRÓ DE LA GALERÍA EL 09-09-2026, un día
    // después de publicarla. El archivo queda en disco sin referenciar, igual
    // que `portada-1.jpg`, por si se decide reponerla.
    //
    // El motivo no es el precio impreso —ese coincide con el publicado— sino
    // el otro texto de la pieza: dice **"ENVÍO GRATIS"** en letras grandes.
    // El 09-09-2026 Ignacio confirmó que las visitas técnicas y los traslados
    // **se cobran**, "todo, desde llevar el equipo o mantenerlo", y de hecho
    // ese mismo día la página de Garantía pasó a decirlo. Ninguna otra fuente
    // —ni el sitio anterior, ni los textos rescatados, ni el WordPress
    // original— menciona envío gratuito en ninguna parte: se buscó
    // explícitamente. Esta pieza era el único lugar donde el sitio prometía
    // algo gratis, y prometía justo lo que la empresa cobra.
    //
    // Se retira porque una promesa comercial visible en una imagen es
    // exigible, y porque contradecía otra página del mismo sitio. El dato de
    // superficie que aportaba (40 a 80 m²) no se pierde: sigue en
    // `superficieRecomendada`, con la pieza citada como fuente más abajo.
  ],
  requiereControlador: false,
  usaCondicionesEstandar: true,
  destacado: true,
  orden: 3,
  borrador: false,
};

export default nahuen;
