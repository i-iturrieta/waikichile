/**
 * Instalaciones (PHASE_1_PLAN.md, tareas 3b.5 y 11.6).
 *
 * Segunda pasada sobre `imagenes-cliente/3-instalaciones/` (76 candidatas),
 * `imagenes-cliente/7-proceso-instalacion/` (11) y `imagenes-cliente/
 * 4-portada/` (6): se amplió de 12 a 33 entradas. Cada foto se revisó
 * individualmente (acercamiento sobre la zona de la tolva, cuando la tenía,
 * y sobre la ropa de los técnicos en las de proceso) antes de incluirla — el
 * criterio es el mismo que ya fijó la primera pasada (ver historial de este
 * archivo, y `content/resenas.ts` para el mismo criterio de no citar el
 * nombre de la marca anterior ni en comentarios): esa marca no puede
 * aparecer visible, ni en la tolva ni en la ropa de un técnico. Se confirmó
 * en esta pasada que aparece legible, como adhesivo en la tolva y en
 * poleras de técnicos, en varias de las fotos descartadas.
 *
 * `content/images/instalacion-01.jpg` .. `instalacion-29.jpg` son Waiki;
 * las últimas 4 entradas son Chakay — dos con archivo propio
 * (`instalacion-30.jpg`, `instalacion-31.jpg`) y dos que reutilizan los
 * archivos ya existentes de su ficha (`producto-chakay-1.jpg`/`-2.jpg`, vía
 * el campo `archivo` de `EntradaInstalacion`, que sobreescribe el nombre
 * derivado de `numero` — no hay una foto física `instalacion-32.jpg` ni
 * `instalacion-33.jpg`). Chakay queda con muchas menos fotos que Waiki no
 * por criterio de calidad — es lo único que llegó: de las 76 candidatas de
 * `3-instalaciones/`, solo `instalacion-14` (marca "CHAKAY" grabada,
 * legible) e `instalacion-49` se pudieron confirmar como Chakay real,
 * limpias y en foco. No hay ninguna fotografía de proceso de instalación de
 * Chakay utilizable.
 *
 * Se excluyó del todo un cuarto equipo que aparece en el lote (cuerpo negro
 * con su propio nombre grabado en el frontal, distinto de Chakay pese al
 * panel rojo perforado similar): no es parte del catálogo publicado hoy
 * (`ARCHITECTURE §0` lo asume descontinuado, `PROJECT_STATE.md` lo deja como
 * pregunta abierta) y varias fotos de este lote que el inventario original
 * rotulaba como "Chakai" resultaron ser ese otro equipo al revisarlas — no
 * hay que confiar en el nombre de archivo original sin mirar la foto.
 *
 * También se descartó una candidata que había quedado marcada como
 * "tentativa" en la revisión: una cocina a leña marca "Alcazar" sin ningún
 * quemador Waiki visible en el cuadro — no es una instalación real, es una
 * estufa huésped sola.
 *
 * `producto` se completa con `'waiki'` o `'chakay'` solo donde la propia
 * fotografía lo confirma (silueta de la tolva externa, o la placa/panel con
 * el nombre grabado). `ciudad` y `modeloCombustion` quedan en `null`: ese
 * dato no viene en ningún nombre de archivo ni acompaña a las fotos
 * recibidas.
 */

import type { Instalacion } from '../lib/contenido/esquemas.ts';

interface EntradaInstalacion {
  numero: string;
  producto: 'waiki' | 'chakay';
  alt: string;
  /** Solo cuando la foto no vive en `instalacion-{numero}.jpg` — p. ej. las
   * dos entradas que reutilizan los archivos propios de la ficha de Chakay. */
  archivo?: string;
}

// Orden, producto y alt de cada foto, fijados a mano tras la revisión visual
// descrita en el comentario de cabecera.
const ENTRADAS: EntradaInstalacion[] = [
  { numero: '01', producto: 'waiki', alt: 'Waiki instalado y encendido en un living moderno, junto a un sillón de cuero' },
  { numero: '02', producto: 'waiki', alt: 'Waiki instalado junto a bolsas de pellet, contra una pared de piedra' },
  { numero: '03', producto: 'waiki', alt: 'Waiki instalado y encendido, con un niño abrazando a un gato junto a la estufa' },
  { numero: '04', producto: 'waiki', alt: 'Waiki instalado, fotografía en blanco y negro con un niño y un gato' },
  { numero: '05', producto: 'waiki', alt: 'Waiki instalado junto a un perro pequeño y una tetera floreada' },
  { numero: '06', producto: 'waiki', alt: 'Waiki instalado junto a dos teteras esmaltadas azules, contra una pared de piedra' },
  { numero: '07', producto: 'waiki', alt: 'Waiki instalado, vista más cercana junto a las teteras esmaltadas' },
  { numero: '08', producto: 'waiki', alt: 'Waiki instalado y encendido junto a un canasto de mimbre con leña' },
  { numero: '09', producto: 'waiki', alt: 'Waiki instalado y encendido junto a una ventana luminosa' },
  { numero: '10', producto: 'waiki', alt: 'Waiki instalado junto a bolsas de pellet apiladas, contra una pared de piedra' },
  { numero: '11', producto: 'waiki', alt: 'Waiki instalado contra una pared verde agua' },
  { numero: '12', producto: 'waiki', alt: 'Waiki instalado y encendido sobre un piso de cerámica roja' },
  { numero: '13', producto: 'waiki', alt: 'Waiki instalado y encendido contra una pared amarilla' },
  { numero: '14', producto: 'waiki', alt: 'Waiki instalado y encendido sobre una alfombra' },
  { numero: '15', producto: 'waiki', alt: 'Waiki instalado en un ambiente moderno, junto a un sillón blanco' },
  { numero: '16', producto: 'waiki', alt: 'Waiki instalado en un living de tonos beige' },
  { numero: '17', producto: 'waiki', alt: 'Waiki instalado junto a un dibujo infantil colgado en la pared' },
  { numero: '18', producto: 'waiki', alt: 'Waiki instalado y encendido contra una pared de piedra cálida' },
  { numero: '19', producto: 'waiki', alt: 'Waiki instalado y encendido contra una pared celeste' },
  { numero: '20', producto: 'waiki', alt: 'Waiki instalado y encendido en una cabaña de madera' },
  { numero: '21', producto: 'waiki', alt: 'Waiki instalado junto a la entrada de una casa, sobre piso flotante' },
  { numero: '22', producto: 'waiki', alt: 'Primer plano de la combustión encendida de un Waiki instalado' },
  { numero: '23', producto: 'waiki', alt: 'Waiki instalado, con pátina de uso en el cuerpo del quemador' },
  { numero: '24', producto: 'waiki', alt: 'Waiki instalado sobre un piso de cerámica con motivo floral' },
  { numero: '25', producto: 'waiki', alt: 'Waiki instalado junto a un perro echado en el living' },
  { numero: '26', producto: 'waiki', alt: 'Técnico soldando la estructura de un quemador Waiki durante su fabricación' },
  { numero: '27', producto: 'waiki', alt: 'Waiki instalado y encendido, contra una pared de piedra, recién terminada la instalación' },
  { numero: '28', producto: 'waiki', alt: 'Técnico esmerilando el cuerpo del quemador durante una instalación de Waiki' },
  { numero: '29', producto: 'waiki', alt: 'Técnico revisando la combustión encendida al finalizar una instalación de Waiki' },
  { numero: '30', producto: 'chakay', alt: 'Chakay instalado en un rincón, junto a un televisor, con la marca CHAKAY visible' },
  { numero: '31', producto: 'chakay', alt: 'Chakay instalado y encendido contra una pared roja, en un comedor' },
  {
    numero: '32',
    producto: 'chakay',
    archivo: 'producto-chakay-1.jpg',
    alt: 'Chakay encendido, vista frontal con la marca visible',
  },
  {
    numero: '33',
    producto: 'chakay',
    archivo: 'producto-chakay-2.jpg',
    alt: 'Chakay instalado en un rincón de cerámica, con la salida de caño visible',
  },
];

const instalaciones: Instalacion[] = ENTRADAS.map(({ numero, producto, alt, archivo }) => ({
  id: `instalacion-${numero}`,
  imagen: {
    archivo: archivo ?? `instalacion-${numero}.jpg`,
    alt,
  },
  ciudad: null,
  modeloCombustion: null,
  producto,
  borrador: false,
}));

export default instalaciones;
