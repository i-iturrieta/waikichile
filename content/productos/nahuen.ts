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
 * ⛔ PRECIO: `consultar`. NO PUBLICAR SIN CONFIRMACIÓN EXPRESA.
 *
 * Este campo se publicó y se retiró el 09-09-2026, con unas horas de sitio
 * en vivo mostrando $790.000. La historia completa importa más que el estado
 * actual, porque el error se repitió dos veces y en las dos el razonamiento
 * parecía sólido:
 *
 *   - El monto $790.000 aparecía en DOS equipos: acá, por la página del
 *     sitio anterior del 07-02-2025 (en la misma tabla que las medidas
 *     50 × 93 × 32 cm y los 40 a 70 m², inequívocamente de este equipo), y
 *     en `mini-nahuen.ts`, por la ficha técnica que envió la clienta.
 *   - Durante dos rondas se trató como imposible que los dos valieran lo
 *     mismo, y el precio de la Mini se publicó, se revirtió y se volvió a
 *     publicar sobre esa premisa.
 *   - El 08-09-2026 Ignacio dijo *"la mini-nahuen vale 790.000, pero sí
 *     incluye el kit de caño y el regulador manual. La nahuen normal no"* y,
 *     al preguntársele por este equipo, *"la nahuen normal vale 790.000 a
 *     secas, pero no incluye nada"*. Sobre eso se publicó acá el monto, y se
 *     dio la colisión por resuelta: dos equipos al mismo precio,
 *     diferenciados por lo que incluyen.
 *   - **El 09-09-2026 Ignacio corrigió**: *"me confundí. Son 790.000 con el
 *     controlador manual, la Mini Nahuen"*. O sea que los $790.000 son de la
 *     Mini, y de este equipo **no sabemos el precio**.
 *
 * Qué aprender de esto, para quien venga después:
 *
 *   1. **La fuente fechada tenía razón desde el principio, pero por el motivo
 *      equivocado.** La página de 2025 atribuía $790.000 a este equipo; hoy
 *      sabemos que ese monto es de la Mini. Que una fuente sea antigua y
 *      verificable no la vuelve correcta sobre el presente.
 *   2. **Una confirmación verbal no es una fuente independiente si responde a
 *      una pregunta que ya sugería la respuesta.** Se le preguntó a Ignacio
 *      si la Nahuen valía $790.000 "a secas", y contestó que sí. La pregunta
 *      traía el número puesto.
 *   3. Por eso este campo no vuelve a publicarse con una confirmación al
 *      paso. Hace falta que la clienta o el dueño **digan el precio de la
 *      Nahuen sin que se lo propongamos nosotros**.
 *
 * `PENDIENTES.md §2.1` y `FICHAS-POR-CONFIRMAR.md`.
 *
 * ⚠️ `noIncluye` conserva "Controlador de presión", que entró el 08-09-2026
 * por la misma frase que resultó estar confundida. Se deja porque no depende
 * de ella: la página del sitio anterior ya decía que este equipo no incluye
 * kit ni instalación, ningún otro equipo salvo la Mini trae controlador, y
 * declarar de menos lo que viene incluido es el error seguro de los dos.
 * Anotado igual para confirmar.
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
  // ⛔ VUELVE A `consultar` EL 09-09-2026, y esta vez NO se vuelve a publicar
  // sin confirmación de la clienta o del dueño. Ver la nota de cabecera.
  //
  // Los $790.000 son de la **Mini Nahuen**, con el controlador manual
  // incluido. Este equipo **no tiene precio confirmado**.
  precio: { tipo: 'consultar' },
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
