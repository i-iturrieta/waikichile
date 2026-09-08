/**
 * Enlaces de navegación del sitio (ARCHITECTURE.md §4, árbol de rutas — las
 * 9 secciones del sitio; Bloque 5 de PHASE_1_PLAN.md, tarea 5.2).
 *
 * Vive en `components/layout/` porque es una lista de rutas internas del
 * sitio, no contenido editorial: no pertenece a `content/` (lo que edita
 * Ignacio en mantención, ARCHITECTURE.md §7) ni es un esquema Zod de
 * `lib/contenido/`. La comparten `Encabezado.tsx`, `MenuMovil.tsx` y
 * `Pie.tsx` para no declarar la misma lista tres veces.
 *
 * Corrección post-lanzamiento: la barra de escritorio mostraba las 9
 * secciones en una sola fila ("Preguntas Frecuentes" alcanzaba a partirse
 * en dos líneas) — desordenado y sin la curaduría que sí tiene el mockup
 * elegido ("1a — Hogar y leña"), cuyo nav solo trae Productos, Accesorios,
 * Instalaciones, Nosotros y Calculadora. Se separa en dos grupos:
 *
 * - `ENLACES_PRINCIPALES` — lo que alguien busca primero al llegar (qué
 *   venden, cuánto ahorra, quiénes son). Va en la barra de escritorio y
 *   arriba del panel móvil.
 * - `ENLACES_SECUNDARIOS` — Preguntas Frecuentes y Garantía. No
 *   desaparecen del sitio: siguen en el panel móvil (debajo de un
 *   separador) y en el pie de página, que es donde un sitio de este tamaño
 *   normalmente lista el mapa completo — igual que hace el propio mockup,
 *   que tampoco las trae en el header.
 *
 * Ronda de revisión 01-09-2026 (segunda pasada): "Blog" sube de
 * `ENLACES_SECUNDARIOS` a `ENLACES_PRINCIPALES` y se renombra a "Noticias" —
 * pedido directo de la clienta ("necesito el botón de noticias arriba"). El
 * sitio anterior también lo llamaba "Noticias" (`/noticias/` redirige a
 * `/blog/`, ver `public/_redirects`); la ruta `/blog/` no cambia, solo la
 * etiqueta visible y su jerarquía en el nav.
 *
 * Corrección 08-09-2026 — "Inicio" vuelve a la navegación, en los tres
 * lugares. Es un pedido directo de Ignacio a partir de lo que le reportaron
 * usuarios reales: **es confuso que no haya un enlace explícito al inicio.**
 *
 * La versión anterior de este comentario decía que "Inicio" quedaba fuera de
 * la navegación porque el logo ya enlaza a "/" y repetirlo era redundante,
 * pero que seguía existiendo "para el mapa completo del pie de página". Lo
 * segundo **era falso**: `ENLACES_NAVEGACION` —la única lista que incluía
 * `ENLACE_INICIO`— no la importaba nadie, y `Pie.tsx` armaba su propio mapa
 * con los principales más los secundarios. Resultado real: en todo el sitio
 * no había un solo enlace que dijera "Inicio", ni arriba, ni en el panel
 * móvil, ni en el pie. La única vía al home era descubrir que el logo es
 * clicable, que es justamente lo que la gente reportó como confuso.
 *
 * El argumento de la redundancia no era malo, pero se apoyaba en una
 * convención que hay que conocer para usar. El costo de un enlace de más es
 * un poco de densidad en la barra; el de no tenerlo es que alguien no sepa
 * volver. Se paga la densidad (ver `MenuMovil.tsx` para cómo).
 *
 * "Contacto" sigue fuera de estos grupos a propósito (igual que antes): en
 * el encabezado va subordinado al CTA de WhatsApp, no como parte del nav.
 */

export interface EnlaceNavegacion {
  href: string;
  etiqueta: string;
  /** Etiqueta corta para la grilla de dos columnas del pie de página, donde
   * "Preguntas Frecuentes" se parte en dos líneas y descuadra la retícula.
   * Solo se declara donde hace falta; el pie cae en `etiqueta` si falta. */
  etiquetaBreve?: string;
}

export const ENLACE_INICIO: EnlaceNavegacion = { href: '/', etiqueta: 'Inicio' };

/**
 * Ronda 05-09-2026: el orden pasa a ser el del mockup "Home Movil A"
 * (Productos → Accesorios → Instalaciones → Calculadora → Nosotros →
 * Noticias). El único cambio respecto de la ronda anterior es que
 * Calculadora sube antes de Nosotros: agrupa las tres páginas de "qué
 * compro" con la herramienta que ayuda a decidirlo, y deja "quiénes somos"
 * como penúltimo, que es donde el diseño lo puso.
 */
export const ENLACES_PRINCIPALES: EnlaceNavegacion[] = [
  { href: '/productos/', etiqueta: 'Productos' },
  { href: '/accesorios/', etiqueta: 'Accesorios' },
  { href: '/instalaciones/', etiqueta: 'Instalaciones' },
  { href: '/calculadora/', etiqueta: 'Calculadora' },
  { href: '/nosotros/', etiqueta: 'Nosotros' },
  { href: '/blog/', etiqueta: 'Noticias' },
];

/** Garantía primero, igual que en la grilla del pie del mockup. */
export const ENLACES_SECUNDARIOS: EnlaceNavegacion[] = [
  { href: '/garantia/', etiqueta: 'Garantía' },
  { href: '/preguntas-frecuentes/', etiqueta: 'Preguntas Frecuentes', etiquetaBreve: 'Preguntas' },
];

export const ENLACE_CONTACTO: EnlaceNavegacion = { href: '/contacto/', etiqueta: 'Contacto' };

/**
 * Lo que se ve en el encabezado: Inicio primero y después los principales.
 * La usan la barra de escritorio y el panel móvil (que además le suma
 * Contacto al final). Existe como constante propia para que "Inicio va
 * primero" se decida una sola vez y no en cada componente.
 */
export const ENLACES_ENCABEZADO: EnlaceNavegacion[] = [ENLACE_INICIO, ...ENLACES_PRINCIPALES];

/**
 * Mapa completo del sitio, en orden, para el pie de página. **Ahora sí la usa
 * `Pie.tsx`** — hasta el 08-09-2026 esta lista no la importaba nadie y el pie
 * armaba la suya sin Inicio (ver el comentario de cabecera).
 */
export const ENLACES_NAVEGACION: EnlaceNavegacion[] = [
  ENLACE_INICIO,
  ...ENLACES_PRINCIPALES,
  ...ENLACES_SECUNDARIOS,
];
