/**
 * Accesorio · Rejilla del quemador (PHASE_1_PLAN.md, tarea 3b.2).
 *
 * Fuente: `contenido-rescatado/DATOS-ESTRUCTURADOS.md` ("Accesorio ·
 * Rejilla del quemador") y las preguntas de usuarios en
 * `textos-sitio-anterior.txt`.
 *
 * Es la fuente número uno de fricción de posventa (ARCHITECTURE.md §3), así
 * que la ausencia de garantía queda explícita tanto en la descripción como
 * en `especificaciones`, no enterrada en un detalle técnico.
 *
 * `borrador: true` (Bloque 11, tarea 11.6): `imagenes-cliente/2-accesorios/
 * rejilla-quemador/` está vacía. Lo único que menciona "rejilla" en todo el
 * inventario recibido (`imagenes-cliente/INVENTARIO.md`) es
 * `_baja-resolucion/baja-05.jpg` (origen:
 * `Waiki_proceso-instalacion-waiki-soldadura-chispas-rejilla-11.jpg`) — una
 * foto de proceso de soldadura durante una instalación, a 1080 px y sin la
 * pieza aislada ni visible con claridad, no una fotografía de producto de
 * esta pieza. No cuenta como fotografía real del accesorio (mismo criterio
 * que Nahuen y el controlador de presión). Vuelve a `borrador: false` en
 * cuanto exista una fotografía real de `accesorio-rejilla-1.jpg`.
 *
 * **Precio $40.000 IVA incluido, confirmado por Ignacio el 09-09-2026**, y
 * la ficha **sigue en `borrador: true`** — que es la única razón por la que
 * ese precio no está hoy en el sitio. Sus palabras: *"dejemos la rejilla en
 * 40.000 por ahora. No podemos subirlo porque no tenemos imágenes, pero sí
 * vale 40.000"*. Se deja escrito el monto para que el día que llegue la foto
 * la ficha se publique con un solo cambio de `borrador`, sin tener que
 * volver a preguntar el precio.
 *
 * El dato rescatado del sitio anterior daba un rango de **$37.000 a
 * $40.000** (FAQ del sitio viejo). Ignacio fijó el extremo superior; no es
 * que se haya elegido el mayor de los dos, es el precio que él confirmó.
 */

import type { Accesorio } from '../../lib/contenido/esquemas.ts';

const rejillaQuemador: Accesorio = {
  slug: 'rejilla-quemador',
  nombre: 'Rejilla del quemador',
  tagline: 'La única pieza de recambio del equipo — pieza de desgaste, sin garantía.',
  descripcion:
    'La rejilla del quemador es la pieza que se desgasta con el uso normal del equipo. Se fabrica en acero inoxidable refractario y se recomienda cambiarla cada 1 a 2 años, según la intensidad de uso y la calidad del pellet.\n\n' +
    'Es la única pieza de repuesto que necesita el equipo en condiciones normales de uso. No tiene garantía: es un consumible, y su desgaste no se considera un defecto de fabricación.',
  // Confirmado por Ignacio el 09-09-2026. No se ve en el sitio todavía
  // porque la ficha está en `borrador: true` por falta de foto — ver la nota
  // de cabecera.
  precio: { tipo: 'fijo', monto: 40000, incluyeIva: true },
  superficieRecomendada: null,
  medidas: null,
  especificaciones: [
    { etiqueta: 'Material', valor: 'Acero inoxidable refractario' },
    { etiqueta: 'Garantía', valor: 'No tiene — pieza de desgaste' },
  ],
  colores: [],
  plazoEntrega: null,
  incluye: [],
  noIncluye: [],
  imagenes: [{ archivo: 'accesorio-rejilla-1.jpg', alt: 'Rejilla del quemador, vista de detalle' }],
  requiereControlador: false,
  // No se reserva un repuesto con un 30% del valor.
  usaCondicionesEstandar: false,
  destacado: false,
  orden: 3,
  esRepuesto: true,
  vidaUtil: '1 a 2 años',
  borrador: true,
};

export default rejillaQuemador;
