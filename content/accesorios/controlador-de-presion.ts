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
 * `borrador: true` (actualizado en la segunda pasada de fotos, ver
 * `content/instalaciones.ts` para el criterio general de revisión):
 * llegaron 2 fotografías reales a `imagenes-cliente/2-accesorios/
 * controlador-de-presion/` (`controlador-presion-1.jpg`, `-2.jpg`), de
 * buena calidad y composición, pero **ambas miden 461 px de ancho** —
 * bajo los 640 px que exige como mínimo duro el pipeline de imágenes
 * (`scripts/procesar-imagenes.ts`, `MIN_LADO_MAYOR_DURO`/`ANCHOS`: genera
 * variantes en 640/1280/1920 px de ancho y no amplía). Es el mismo caso ya
 * documentado en `content/instalaciones.ts` para retratos angostos: el lado
 * mayor (alto, 1024 px) pasa cualquier validación de "resolución mínima",
 * pero el ancho específico es el que determina si el pipeline puede generar
 * una variante, y aquí no puede. No se sustituyen por versiones ampliadas
 * (invalidaría la fotografía real). Vuelve a `borrador: false` en cuanto
 * llegue una versión de mayor resolución de cualquiera de las dos, o una
 * fotografía nueva del accesorio con al menos 640 px de ancho.
 */

import type { Accesorio } from '../../lib/contenido/esquemas.ts';

const controladorDePresion: Accesorio = {
  slug: 'controlador-de-presion',
  nombre: 'Controlador de presión',
  tagline: 'Regula el tiro de tu combustión para un consumo estable de pellet.',
  descripcion:
    'El controlador de presión —también llamado regulador de tiro— es una válvula manual que regula los cambios de presión del conducto de salida de humos. Las condiciones climáticas de cada lugar y el funcionamiento particular de cada combustión varían con frecuencia, lo que hace que la depresión generada en la base cambie constantemente; el controlador mantiene esas condiciones estables y evita que el consumo de pellet aumente sin necesidad.\n\n' +
    'Se recomienda instalarlo cuando la cañería de salida supera los 3,5 metros —cada tira de cañería mide 1 metro, así que basta con contarlas— o cuando la instalación está en un sector con mucho viento. Es de acero inoxidable.',
  precio: { tipo: 'consultar' },
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
  imagenes: [{ archivo: 'accesorio-controlador-1.jpg', alt: 'Controlador de presión, vista de detalle' }],
  requiereControlador: false,
  destacado: false,
  orden: 1,
  esRepuesto: false,
  vidaUtil: null,
  borrador: true,
};

export default controladorDePresion;
