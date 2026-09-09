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
 * PRECIO: $790.000 IVA INCLUIDO. Este equipo **no incluye nada**.
 *
 * Este campo se movió **cuatro veces en 24 horas** y terminó donde había
 * empezado. Vale la secuencia entera, porque quien lea las fuentes va a
 * encontrar material contradictorio y necesita saber cuál ganó y por qué:
 *
 *   1. **07-02-2025 (fuente rescatada).** La página del sitio anterior le da
 *      $790.000 a este equipo, en la misma tabla que sus medidas
 *      50 × 93 × 32 cm y sus 40 a 70 m². Inequívocamente de este equipo.
 *   2. **08-09-2026 — no se publica.** El mismo monto aparece en la ficha
 *      técnica que la clienta envió por la Mini Nahuen. Se trata como
 *      imposible que dos equipos valgan lo mismo y se asume que uno de los
 *      datos está arrastrado. Los dos quedan en `consultar`.
 *   3. **08-09-2026 — se publica.** Ignacio: *"la mini-nahuen vale 790.000,
 *      pero sí incluye el kit de caño y el regulador manual. La nahuen normal
 *      no"*, y sobre este equipo *"vale 790.000 a secas, pero no incluye
 *      nada"*. La premisa de que no podían valer lo mismo era falsa.
 *   4. **09-09-2026 — se retira.** Ignacio corrige: *"me confundí. Son
 *      790.000 con el controlador manual, la Mini Nahuen"*. Vuelve a
 *      `consultar` y se despliega.
 *   5. **09-09-2026 — se restituye, y queda así.** Ignacio retira la
 *      corrección: *"fue un error inexistente. Efectivamente, la nahuen no
 *      trae nada, pero sí vale 790.000. Y la mini sí que trae el controlador
 *      manual y el kit de tubos"*.
 *
 * O sea: el estado 3 era el correcto y el 4 fue una confusión sobre una
 * confusión. **Los dos equipos valen $790.000 y se diferencian por lo que
 * traen**, que es exactamente lo que decían las dos fuentes desde el
 * principio. Ninguna estaba equivocada.
 *
 * ⚠️ Lo que NO cambia con esto, y conviene que sobreviva a la corrección:
 * cuando se pidió la confirmación en el paso 3, **la pregunta traía el número
 * puesto** —se preguntó "¿la Nahuen vale $790.000 a secas?" en vez de
 * "¿cuánto vale la Nahuen?"—, y esa respuesta se anotó acá como "una segunda
 * fuente independiente". No lo era: era un eco de la fuente de 2025. Que el
 * resultado haya terminado siendo correcto no valida el método; si la
 * respuesta hubiera sido la equivocada, no habría habido nada que la
 * detectara. **Para los precios que faltan (Waiki, y cualquier revisión de
 * estos), preguntar el monto abierto, sin proponerlo.**
 *
 * ⚠️ Y queda una tarea real: este monto lleva tres cambios de estado en un
 * día, y las dos veces que se movió fue por mensajes al paso. Conviene
 * **pedirle a la clienta o al dueño la lista de precios completa por
 * escrito, de una vez**, en lugar de seguir confirmando de a uno. Anotado en
 * `PENDIENTES.md §2.1`.
 *
 * `incluyeIva: true` — la página del sitio anterior dice literal "$790.000
 * IVA incluido", y el 09-09-2026 Ignacio confirmó "todos los precios con
 * IVA".
 *
 * `noIncluye` incorpora "Controlador de presión" desde el 08-09-2026, por la
 * misma frase de Ignacio que fijó el precio (*"la nahuen normal no"*), y
 * confirmada de nuevo el 09-09 (*"la nahuen no trae nada"*). Es coherente con
 * la página del sitio anterior, que ya declaraba que este equipo no incluye
 * kit ni instalación.
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
  // $790.000 IVA incluido. Este equipo **no incluye nada**; la Mini Nahuen
  // vale lo mismo pero trae kit de caños y controlador manual. Ver la nota de
  // cabecera: el campo se movió cuatro veces en 24 horas y volvió acá.
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
