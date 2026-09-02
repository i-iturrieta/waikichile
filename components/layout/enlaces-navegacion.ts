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
 * "Inicio" no entra en ninguno de los dos grupos de navegación: el logo ya
 * enlaza a "/" (convención estándar), y repetirlo como enlace de texto es
 * exactamente el tipo de redundancia que abultaba la barra. Sigue existiendo
 * como `ENLACE_INICIO` solo para el mapa completo del pie de página.
 *
 * "Contacto" sigue fuera de estos grupos a propósito (igual que antes): en
 * el encabezado va subordinado al CTA de WhatsApp, no como parte del nav.
 */

export interface EnlaceNavegacion {
  href: string;
  etiqueta: string;
}

export const ENLACE_INICIO: EnlaceNavegacion = { href: '/', etiqueta: 'Inicio' };

export const ENLACES_PRINCIPALES: EnlaceNavegacion[] = [
  { href: '/productos/', etiqueta: 'Productos' },
  { href: '/accesorios/', etiqueta: 'Accesorios' },
  { href: '/instalaciones/', etiqueta: 'Instalaciones' },
  { href: '/nosotros/', etiqueta: 'Nosotros' },
  { href: '/calculadora/', etiqueta: 'Calculadora' },
  { href: '/blog/', etiqueta: 'Noticias' },
];

export const ENLACES_SECUNDARIOS: EnlaceNavegacion[] = [
  { href: '/preguntas-frecuentes/', etiqueta: 'Preguntas Frecuentes' },
  { href: '/garantia/', etiqueta: 'Garantía' },
];

export const ENLACE_CONTACTO: EnlaceNavegacion = { href: '/contacto/', etiqueta: 'Contacto' };

/** Mapa completo, en orden, para el pie de página — no se usa en el encabezado. */
export const ENLACES_NAVEGACION: EnlaceNavegacion[] = [
  ENLACE_INICIO,
  ...ENLACES_PRINCIPALES,
  ...ENLACES_SECUNDARIOS,
];
