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
 * `borrador: true` (Bloque 11, tarea 11.6): cero fotografías reales de este
 * accesorio en `imagenes-cliente/2-accesorios/controlador-de-presion/`
 * (carpeta vacía) ni en el resto de las 141 imágenes recibidas
 * (`imagenes-cliente/INVENTARIO.md`, búsqueda exhaustiva por nombre de
 * archivo). Misma regla que Nahuen (ver `content/productos/nahuen.ts`):
 * ningún producto se publica con solo el marcador. Vuelve a `borrador:
 * false` en cuanto exista una fotografía real de
 * `accesorio-controlador-1.jpg`.
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
