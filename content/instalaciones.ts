/**
 * Instalaciones (PHASE_1_PLAN.md, tareas 3b.5 y 11.6).
 *
 * `content/images/instalacion-01.jpg` .. `instalacion-12.jpg` son fotos
 * reales, elegidas a mano de las ~74 recibidas en
 * `imagenes-cliente/3-instalaciones/` (tarea 11.6). No son 25 (el número de
 * marcadores originales) por la misma razón que Waiki quedó con 1 sola
 * imagen de producto (ver `content/productos/waiki.ts`): gran parte del
 * lote — sobre todo las fotos de cerca del quemador Waiki tipo "inserto"
 * (tolva externa conectada por un tubo, distinto del modelo autocontenido
 * que trae grabado el nombre del producto en la placa frontal y no tiene
 * tolva separada) — muestra esa misma tolva con el adhesivo circular de la
 * marca anterior de la empresa perfectamente legible (mismo criterio que
 * `content/productos/waiki.ts`, sin citar ese nombre literal ni en
 * comentarios — ver también `content/resenas.ts`), y varias fotos de
 * proceso de instalación muestran a los técnicos con esa marca impresa en
 * la ropa de trabajo. Se revisó cada foto usada individualmente
 * (acercamiento sobre la zona de la tolva, cuando la tenía) antes de
 * incluirla — no se filtró solo por nombre de archivo. La regla de
 * ARCHITECTURE.md §9 sobre esa marca no distingue entre texto y fotografía,
 * así que el resto del lote queda fuera en vez de publicarse.
 *
 * `producto` se completa con `'waiki'` o `'chakay'` solo donde la propia
 * fotografía lo confirma (la placa frontal grabada con el nombre del
 * producto, o la silueta inconfundible de la tolva externa del quemador
 * Waiki tipo inserto); queda en `null` donde no hay esa certeza visual
 * (p. ej. la foto de la instalación de la chimenea en el domo, tarea de
 * terreno sin el equipo en cuadro). `ciudad` y `modeloCombustion` quedan en
 * `null` en las 12: ese dato no viene en ningún nombre de archivo ni
 * acompaña a las fotos recibidas, así que no hay de dónde sacarlo sin
 * inventarlo (ARCHITECTURE.md §1.6).
 *
 * Una candidata más (la instalación diagonal de pared clara) se descartó
 * en esta pasada por un motivo técnico distinto, no de marca: su ancho real
 * (576 px) queda bajo los 640 px del ancho de variante más chico que genera
 * el pipeline (`scripts/procesar-imagenes.ts`), que no amplía imágenes — el
 * "lado mayor" que exige el contrato de `ARCHITECTURE.md §9` mide el lado
 * más largo (alto, en una foto vertical), así que una foto puede pasar esa
 * validación y aun así no generar ninguna variante si su ancho específico
 * es angosto. Next.js `output: 'export'` no compila con una imagen sin
 * variantes (`<Imagen>` lanza en build). Vale la pena tenerlo presente para
 * la próxima tanda de fotos: retratos muy angostos (bajo 640 px de ancho)
 * no sirven aunque su alto sea generoso.
 */

import type { Instalacion } from '../lib/contenido/esquemas.ts';

interface EntradaInstalacion {
  numero: string;
  producto: 'waiki' | 'chakay' | null;
}

// Orden y producto de cada foto, fijados a mano tras la revisión visual
// descrita en el comentario de cabecera — no es un patrón derivable del
// nombre de archivo, así que se lista explícitamente en vez de generarse.
const ENTRADAS: EntradaInstalacion[] = [
  { numero: '01', producto: 'chakay' },
  { numero: '02', producto: 'chakay' },
  { numero: '03', producto: 'chakay' },
  { numero: '04', producto: 'waiki' },
  { numero: '05', producto: 'waiki' },
  { numero: '06', producto: 'chakay' },
  { numero: '07', producto: 'waiki' },
  { numero: '08', producto: 'waiki' },
  { numero: '09', producto: 'waiki' },
  { numero: '10', producto: null },
  { numero: '11', producto: 'waiki' },
  { numero: '12', producto: 'waiki' },
];

const instalaciones: Instalacion[] = ENTRADAS.map(({ numero, producto }) => ({
  id: `instalacion-${numero}`,
  imagen: {
    archivo: `instalacion-${numero}.jpg`,
    alt: `Instalación de un equipo Waiki Chile, fotografía ${numero}`,
  },
  ciudad: null,
  modeloCombustion: null,
  producto,
  borrador: false,
}));

export default instalaciones;
