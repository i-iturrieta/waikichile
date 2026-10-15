/**
 * Kit de caños — lo que se vende aparte para instalar un equipo (15-10-2026).
 *
 * Fuente: mensaje de WhatsApp de la clienta (Carolina De Fuentes) a Ignacio,
 * con audio que pide agregarlo a la ficha de los equipos que no lo traen —
 * *"especificar que las instalaciones tanto de la Chakay como la Nahuén … no
 * incluyen el kit de instalación y que el kit de instalación es un costo
 * aparte, pero en ese sí deseas … incluye tal cosa"*, y que las mantas
 * vayan como costo extra.
 *
 * Se muestra en `FichaProducto` en cada equipo cuyo `noIncluye` nombra
 * "Kit de caños" (hoy Chakay y Nahuen). La Mini Nahuen lo trae incluido y
 * Waiki se instala en terreno, así que a ninguno de los dos le aparece.
 *
 * ⚠️ Por confirmar con la clienta:
 *   - El audio nombra un tercer equipo ("la Lul") que no existe en el
 *     catálogo.
 *   - "Es Antillón de techo" se transcribió tal cual no se pudo leer; se
 *     interpretó como descripción del gorro (sombrerete de techo).
 *   - "Y el codo con registro que se debe colocar en la Chakay" — Chakay ya
 *     lo declara en `incluye`; no se agregó nada por eso.
 */

export const kitCanos = {
  /** IVA incluido, como todos los precios del sitio. */
  precio: 170000,
  contenido: [
    '4 tiras de caños de acero inoxidable',
    '1 tapa cielo de acero inoxidable',
    'Lana mineral de revestimiento de protección',
    '2 caños exteriores de 8" zincados',
    '1 embudillo de 8" a 4"',
    '1 gorro de techo de 4" a 8"',
    '3 tirantes metálicos',
    'Remaches',
  ],
  extra: {
    nombre: 'Mantas',
    precioPorMetro: 5000,
    detalle: 'Láminas de plancha para techo, para acoplar la salida en la techumbre si es necesario.',
  },
};
