/**
 * Accesorio · Controlador de presión manual (ronda 08-09-2026).
 *
 * Producto nuevo: **no existía en el sitio**. Lo abrió Ignacio el 08-09-2026
 * con una nota corta —"la Mini Nahuen es la única que incluye un controlador
 * de presión, el manual; no existía en el sitio"— y una foto real,
 * `imagenes-cliente/2-accesorios/controlador-de-presion-manual/
 * controlador-manual-1.jpeg`, que entra a la galería como
 * `accesorio-controlador-manual-1.jpg` (900 × 805 px: pasa el piso duro de
 * 640 px del pipeline, pero queda bajo los 2000 px del contrato de
 * ARCHITECTURE.md §9, así que se procesa **con aviso**. Pendiente pedirla en
 * resolución completa).
 *
 * ⚠️ **Este accesorio es el que obligó a renombrar al otro.** El que estaba
 * publicado como `controlador-de-presion` describía "una válvula manual",
 * pero su propia placa dice "DRAUGHT REGULATOR RCO Ø80 · Norm DIN 4795",
 * que es la norma de los reguladores **barométricos**, o sea automáticos —
 * y en la foto se ve el dial de tensión, sin palanca. El manual es este: en
 * la foto se ve una llave de tiro de palanca, montada en el tramo de caño
 * justo sobre la cubierta del equipo, que se gira a mano. La historia
 * completa está en `content/accesorios/controlador-de-presion-automatico.ts`
 * y en `PENDIENTES.md`; acá basta con que no se vuelvan a fusionar.
 *
 * De paso, esto explica el desglose de la ficha técnica de la clienta que
 * hasta ayer se leía como un dato huérfano: *"$790.000 con kit de cañaños y
 * controlador MANUAL, para casa de $875.000 si desean el controlador
 * automático"*. Los dos existen. Ver `content/productos/mini-nahuen.ts`.
 *
 * **Precio $45.000 IVA incluido**, confirmado por Ignacio el 08-09-2026 al
 * revisar esta ficha. Vale dejar la advertencia escrita porque el número
 * tiene un homónimo peligroso: $45.000 es **exactamente** el monto que el
 * sitio anterior publicaba en `/regulador-de-tiro/` para el OTRO controlador
 * (`contenido-rescatado/DATOS-ESTRUCTURADOS.md`), y que el dueño reemplazó
 * por $85.000 el mismo 08-09-2026. Se le preguntó a Ignacio explícitamente
 * si no era un arrastre del borrador y respondió que el precio del manual es
 * ese. Queda igual en `PENDIENTES.md` para que el dueño confirme los dos
 * montos en un mismo mensaje, porque hoy ningún mensaje suyo distingue entre
 * ambos equipos.
 *
 * ⚠️ `incluyeIva: true` es **inferencia**, igual que en el automático: nadie
 * lo dijo. Se asume incluido porque así se declaran todos los demás precios
 * de la empresa y porque un precio a consumidor final en Chile se publica
 * con IVA.
 *
 * ⚠️ "Acero inoxidable" se lee de la foto (el tramo es cromado/inoxidable),
 * no de una ficha. Anotado en `PENDIENTES.md`.
 *
 * NO se copian del automático las condiciones de uso ("sobre 3,5 m de
 * cañería, o sector con mucho viento"): ese texto viene de la página
 * `/regulador-de-tiro/` del sitio anterior, que describe al automático. Lo
 * único documentado de este es que la Mini Nahuen lo trae incluido.
 *
 * `medidas`, `plazoEntrega` y `vidaUtil` en `null` — no documentados, no se
 * inventan (ARCHITECTURE.md §1.6).
 */

import type { Accesorio } from '../../lib/contenido/esquemas.ts';

const controladorDePresionManual: Accesorio = {
  slug: 'controlador-de-presion-manual',
  nombre: 'Controlador de presión manual',
  tagline: 'La llave de tiro que regulas a mano, para un consumo estable de pellet.',
  descripcion:
    'El controlador de presión —también llamado regulador de tiro— es una válvula que se instala en el conducto de salida de humos y regula sus cambios de presión. Las condiciones climáticas de cada lugar y el funcionamiento particular de cada combustión varían con frecuencia, lo que hace que la depresión generada en la base cambie constantemente; el controlador mantiene esas condiciones estables y evita que el consumo de pellet aumente sin necesidad.\n\n' +
    'Esta es la versión manual: una palanca en el tramo de caño, justo sobre la cubierta del equipo, que se gira a mano para abrir o cerrar el paso. Es la que viene incluida en el valor de la Mini Nahuen. Si prefieres que el ajuste se haga solo, existe además el controlador de presión automático.',
  precio: { tipo: 'fijo', monto: 45000, incluyeIva: true },
  superficieRecomendada: null,
  medidas: null,
  especificaciones: [
    { etiqueta: 'Material', valor: 'Acero inoxidable' },
    { etiqueta: 'Funcionamiento', valor: 'Manual: se regula girando la palanca' },
    { etiqueta: 'Incluido en', valor: 'Mini Nahuen' },
  ],
  colores: [],
  plazoEntrega: null,
  incluye: [],
  noIncluye: [],
  imagenes: [
    {
      archivo: 'accesorio-controlador-manual-1.jpg',
      alt: 'Controlador de presión manual: tramo de caño de acero inoxidable con la palanca de regulación hacia afuera, montado sobre la cubierta del equipo',
    },
  ],
  requiereControlador: false,
  // No se reserva un accesorio con un 30% del valor.
  usaCondicionesEstandar: false,
  destacado: false,
  orden: 2,
  esRepuesto: false,
  vidaUtil: null,
  borrador: false,
};

export default controladorDePresionManual;
