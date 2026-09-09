/**
 * Accesorio · Controlador de presión automático (PHASE_1_PLAN.md, tarea 3b.2).
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
 * Las dos fotos entran a la galería (`accesorio-controlador-automatico-1.jpg`
 * y `-2.jpg`): la primera de frente, con la placa del fabricante legible, y
 * la segunda en ángulo, que es la que deja ver cómo se monta sobre el caño.
 *
 * ⚠️ **RENOMBRADO EL 08-09-2026: ERA `controlador-de-presion` a secas, y su
 * texto decía que era "una válvula manual".** Las dos cosas estaban mal, y
 * conviene dejar escrito cómo se detectó para que nadie lo revierta:
 *
 *   1. El 07-09-2026 Ignacio había confirmado que **hay un solo controlador**
 *      y que la variante automática **no existe**. Sobre esa base se descartó
 *      la mención al "controlador automático" de la ficha técnica de la
 *      clienta (ver `content/productos/mini-nahuen.ts`) como un dato suelto.
 *   2. El 08-09-2026 Ignacio aportó una foto nueva —una llave de tiro de
 *      palanca, montada en el caño justo sobre la cubierta del equipo— y dijo
 *      que **la Mini Nahuen es la única que incluye controlador, y es el
 *      manual**, que no existía en el sitio. O sea: son dos.
 *   3. La placa que se lee en `accesorio-controlador-automatico-1.jpg` cierra
 *      cuál es cuál: **"DRAUGHT REGULATOR RCO Ø80 · Norm DIN 4795 ·
 *      underpressure range 10–35 Pa"**. DIN 4795 es la norma de los
 *      reguladores de tiro **barométricos**, que son precisamente los
 *      automáticos: una compuerta con contrapeso que se abre sola cuando la
 *      depresión supera el valor al que se la reguló. En la foto se ve el
 *      dial de tensión y **no hay palanca**. El de la foto nueva sí la tiene.
 *
 * O sea que lo que estuvo publicado un día como "controlador de presión ·
 * válvula manual" es, según su propia placa, el automático. Con esto la
 * mención a los **$875.000 "si desean el controlador automático"** de la
 * ficha de la Mini Nahuen deja de ser un dato huérfano: describía este
 * equipo. Corregido también en `PENDIENTES.md` (decisión 3 de la ronda
 * 07-09-2026) y en `FICHAS-POR-CONFIRMAR.md`.
 *
 * La ruta anterior `/accesorios/controlador-de-presion/` queda redirigida
 * 301 a la nueva en `public/_redirects`, junto con las dos URLs del sitio
 * viejo que ya apuntaban ahí (`/regulador-de-tiro/` y la que nombraba a la
 * marca anterior; están las dos en `public/_redirects`, que es el único
 * lugar donde esos nombres pueden aparecer — ver `lib/contenido/guardia.test.ts`).
 *
 * **Precio $85.000 (08-09-2026)** por mensaje del dueño: "el valor del
 * controlador para los equipos de Waiki es de $85000". Antes decía
 * **$45.000**, que era el precio que publicaba el sitio anterior
 * (`contenido-rescatado/DATOS-ESTRUCTURADOS.md`, de febrero de 2025 o
 * anterior). No es la corrección de un dato mal leído: son dos precios
 * distintos en dos momentos distintos, y el vigente es el que dio el dueño.
 * Los $45.000 quedan registrados acá como el histórico, no en el sitio.
 *
 * ✅ **Confirmado por Ignacio el 09-09-2026: "45.000 el manual, 85.000 el
 * automático".** Ese mensaje del dueño se había recibido antes de que se
 * supiera que hay dos controladores y decía "el controlador" sin distinguir;
 * la asignación que hicimos —a este, por ser el que estaba publicado y el que
 * cotizaba `/regulador-de-tiro/`— resultó correcta. Deja de ser una
 * suposición nuestra.
 *
 * ✅ `incluyeIva: true` **confirmado el 09-09-2026** por Ignacio: "todos los
 * precios con IVA". Hasta ese día era una inferencia nuestra —ni la fuente
 * rescatada ("$45.000, adicional al equipo Waiki") ni el mensaje del dueño
 * mencionaban el IVA— y estaba anotado como tal. Ahora es un dato.
 *
 * ⚠️ La placa declara además "DIN 4795", "Ø80" y un rango de depresión de
 * 10–35 Pa. **El Ø80 no se incorporó a `especificaciones`**: es el diámetro
 * de esa unidad concreta, y la ficha de Chakay declara salida de caño de 4
 * pulgadas (~101,6 mm), así que no calzan y publicarlo podría describir mal
 * lo que venden. Queda en `PENDIENTES.md` para confirmar con la clienta. La
 * norma y el rango sí se publican ahora: se leen en la foto que está en la
 * galería, y son justamente lo que distingue este equipo del manual.
 */

import type { Accesorio } from '../../lib/contenido/esquemas.ts';

const controladorDePresionAutomatico: Accesorio = {
  slug: 'controlador-de-presion-automatico',
  nombre: 'Controlador de presión automático',
  tagline: 'Regula solo el tiro de tu combustión, para un consumo estable de pellet.',
  descripcion:
    'El controlador de presión automático —también llamado regulador de tiro barométrico— se instala en el conducto de salida de humos y compensa por sí solo los cambios de presión. Las condiciones climáticas de cada lugar y el funcionamiento particular de cada combustión varían con frecuencia, lo que hace que la depresión generada en la base cambie constantemente; el controlador mantiene esas condiciones estables y evita que el consumo de pellet aumente sin necesidad.\n\n' +
    'A diferencia del controlador manual, no hay que estar girando nada: una compuerta con contrapeso se abre sola cuando la depresión sube más de la cuenta, y el punto en que lo hace se ajusta una vez con el dial. Se recomienda instalarlo cuando la cañería de salida supera los 3,5 metros —cada tira de cañería mide 1 metro, así que basta con contarlas— o cuando la instalación está en un sector con mucho viento. Es de acero inoxidable.',
  precio: { tipo: 'fijo', monto: 85000, incluyeIva: true },
  superficieRecomendada: null,
  medidas: null,
  especificaciones: [
    { etiqueta: 'Material', valor: 'Acero inoxidable' },
    { etiqueta: 'Funcionamiento', valor: 'Automático: compuerta con contrapeso, se ajusta una vez con el dial' },
    { etiqueta: 'Norma', valor: 'DIN 4795 (regulador de tiro barométrico)' },
    { etiqueta: 'Rango de depresión', valor: '10 a 35 Pa' },
    { etiqueta: 'Cuándo se necesita', valor: 'Cañería sobre 3,5 m, o instalación en sector con mucho viento' },
  ],
  colores: [],
  plazoEntrega: null,
  incluye: [],
  noIncluye: [],
  imagenes: [
    {
      archivo: 'accesorio-controlador-automatico-1.jpg',
      alt: 'Controlador de presión automático instalado en el caño de salida de humos, visto de frente, con su placa y el dial de regulación',
    },
    {
      archivo: 'accesorio-controlador-automatico-2.jpg',
      alt: 'El mismo controlador visto en ángulo, montado sobre el caño de acero contra un muro de piedra',
    },
    // Rescatadas del WordPress original el 08-09-2026, de las galerías de
    // instalaciones del sitio anterior. Resuelven el peor problema de imagen
    // que tenía el sitio: las dos fotos de arriba miden 461 px de ancho —las
    // más pobres del catálogo, y las que obligaron a parchear el pipeline
    // (ver más arriba)—. Estas miden 2560, 1905 y 1280 px de lado mayor.
    {
      archivo: 'accesorio-controlador-automatico-3.jpg',
      alt: 'Controlador de presión automático montado en el caño de salida, con su placa y el dial de regulación a plena vista, contra un muro de piedra',
    },
    {
      archivo: 'accesorio-controlador-automatico-4.jpg',
      alt: 'El controlador visto de cerca sobre el caño de acero pulido, con la compuerta y el contrapeso en primer plano',
    },
    {
      archivo: 'accesorio-controlador-automatico-5.jpg',
      alt: 'El controlador instalado en el tramo vertical del caño, visto desde abajo',
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

export default controladorDePresionAutomatico;
