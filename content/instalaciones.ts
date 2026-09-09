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
 * `content/images/instalacion-01.jpg` .. `instalacion-29.jpg` son Waiki.
 *
 * Ronda de revisión 01-09-2026 — actualización importante: las entradas
 * 30-33 que existían acá (dos con `instalacion-30.jpg`/`-31.jpg`, dos que
 * reutilizaban `producto-chakay-1.jpg`/`-2.jpg`) mostraban todas el modelo
 * de Chakay con la placa "CHAKAY" grabada — la clienta confirmó
 * explícitamente que ese modelo ya no se fabrica ni se vende. Se eliminaron
 * las 4 entradas en vez de dejarlas mal etiquetadas. El "cuarto equipo"
 * que este comentario excluía antes por precaución (cuerpo negro/mixto con
 * otra placa de marca previa, panel rojo perforado — no repetir ese nombre
 * acá, ver `lib/contenido/guardia.test.ts`) resultó ser, según la misma
 * confirmación de la clienta, el modelo VIGENTE de Chakay — no está en
 * `content/instalaciones.ts` (no hay fotos de instalación reales de ese
 * equipo todavía, solo fotos de producto, ya en `content/productos/
 * chakay.ts`), pero ya no debe tratarse como excluido si aparecen fotos de
 * instalación suyas más adelante: agregarlas acá con `producto: 'chakay'`.
 *
 * Chakay queda sin ninguna instalación real por ahora (la sección
 * "Instalaciones de Chakay" de la ficha se omite sola mientras el arreglo
 * filtrado quede vacío — mismo mecanismo que ya usa el resto del sitio para
 * colecciones vacías).
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
  /** `null` cuando la foto no permite distinguir el equipo — ver la nota
   * de la ronda 08-09-2026 en el arreglo de entradas. */
  producto: 'waiki' | 'chakay' | null;
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
  // ── Ronda 08-09-2026: 81 fotos rescatadas del WordPress original ──────────
  // Vienen de las galerías `/imagenes-waiki/` e `/imagenes-de-instalaciones-y-
  // cocinas-.../` del sitio anterior. Se partió de 234 imágenes únicas nuevas,
  // se descartó el stock del theme de WordPress (animales, retratos, paisajes:
  // más de 100), y sobre las 110 candidatas reales se aplicó **la misma regla
  // de marca que fijó la pasada anterior**, con acercamiento sobre la tolva y
  // sobre la ropa de los técnicos: 26 quedaron fuera porque la marca anterior
  // se lee. Detalle de por qué, en `PENDIENTES.md §1.5`.
  //
  // `producto` va en `'waiki'` solo cuando la tolva externa acoplada a una
  // combustión huésped es inequívoca en la foto. Queda en `null` cuando el
  // equipo es un cuerpo completo: Chakay y Nahuen son dos cajas negras de 67 y
  // 50 cm de ancho, y en una foto de interior sin referencia no se distinguen.
  // Etiquetarlas a ojo sería inventar (ARCHITECTURE.md §1.6).
  { numero: '32', producto: 'waiki', alt: 'Waiki instalado en una combustión negra encendida, con bolsas de pellet apiladas al lado' },
  { numero: '33', producto: 'waiki', alt: 'Persona agachada frente a una combustión con Waiki encendida, durante la puesta en marcha' },
  { numero: '34', producto: 'waiki', alt: 'Instalación de Waiki en curso en un living, con el equipo ya encendido' },
  { numero: '35', producto: 'waiki', alt: 'Combustión con Waiki encendida junto a un saco de pellet, en una vivienda de interior de madera' },
  { numero: '36', producto: 'waiki', alt: 'Waiki instalado y encendido junto a sacos de pellet, bajo plantas colgantes' },
  { numero: '37', producto: 'waiki', alt: 'Combustión de acero con Waiki encendida sobre un piso de parquet rojo' },
  { numero: '38', producto: 'waiki', alt: 'Waiki encendido contra un muro revestido en piedra, junto a una puerta blanca' },
  { numero: '39', producto: 'waiki', alt: 'Waiki instalado sobre una tarima de madera, contra un muro de ladrillo amarillo' },
  { numero: '40', producto: 'waiki', alt: 'Interior de la cámara de combustión con dos trozos de leña, vista de cerca' },
  { numero: '41', producto: 'waiki', alt: 'Técnico ajustando el cuerpo del equipo contra la pared durante la instalación' },
  { numero: '42', producto: 'waiki', alt: 'Waiki encendido visto desde el comedor, con la cocina al fondo' },
  { numero: '43', producto: 'waiki', alt: 'Waiki instalado junto a sacos de pellet, en una vivienda de piso de madera' },
  { numero: '44', producto: 'waiki', alt: 'Combustión con Waiki encendida junto a sacos de pellet y muebles de madera' },
  { numero: '45', producto: 'waiki', alt: 'Waiki encendido contra un muro de madera, con sacos de pellet a un costado' },
  { numero: '46', producto: null, alt: 'Equipo encendido junto a una ventana luminosa, en el rincón de un living con escritorio' },
  { numero: '47', producto: 'waiki', alt: 'Waiki encendido junto a una lámpara de cobre y un cajón de plantas' },
  { numero: '48', producto: 'waiki', alt: 'Waiki instalado contra un muro de ladrillo blanco, con sillas de madera al fondo' },
  { numero: '49', producto: 'waiki', alt: 'Waiki encendido junto a un saco de pellet, sobre piso de madera' },
  { numero: '50', producto: 'waiki', alt: 'Técnico esmerilando junto al equipo durante una instalación, con chispas a la vista' },
  { numero: '51', producto: 'waiki', alt: 'Waiki encendido en un living, con plantas y cuadros alrededor' },
  { numero: '52', producto: 'waiki', alt: 'Waiki instalado contra un muro de OSB, junto a un piso alto blanco' },
  { numero: '53', producto: 'waiki', alt: 'Familia observando al técnico mientras termina la instalación del equipo' },
  { numero: '54', producto: null, alt: 'Dos equipos completos, uno negro y uno negro con rojo, en un mismo recinto' },
  { numero: '55', producto: null, alt: 'Equipo completo encendido contra una pared clara, con la salida de humos hacia el cielo raso' },
  { numero: '56', producto: 'waiki', alt: 'Persona abriendo un paquete junto al equipo recién instalado' },
  { numero: '57', producto: null, alt: 'Pan de molde recién horneado sobre la rejilla del horno del equipo' },
  { numero: '58', producto: null, alt: 'Pan horneándose dentro del horno del equipo, con el termómetro de la puerta a la vista' },
  { numero: '59', producto: null, alt: 'Horno del equipo abierto, con su termómetro, y una tetera roja sobre la cubierta' },
  { numero: '60', producto: 'waiki', alt: 'Waiki encendido junto a un saco de pellet, sobre una alfombra' },
  { numero: '61', producto: 'waiki', alt: 'Niño abrazando a un gato gris frente a la combustión con Waiki encendida' },
  { numero: '62', producto: 'waiki', alt: 'Waiki acoplado a una combustión de otra marca, encendido, en una habitación de colores' },
  { numero: '63', producto: 'waiki', alt: 'Waiki encendido con dos teteras esmaltadas azules sobre la cubierta' },
  { numero: '64', producto: 'waiki', alt: 'Persona con gorro verde junto a la combustión con Waiki encendida' },
  { numero: '65', producto: 'waiki', alt: 'Dos técnicos trabajando en el piso durante una instalación de Waiki' },
  { numero: '66', producto: 'waiki', alt: 'Waiki encendido en una combustión de puerta vidriada, junto a un canasto con leña' },
  { numero: '67', producto: 'waiki', alt: 'Waiki instalado en el rincón de una vivienda, contra un muro revestido en piedra' },
  { numero: '68', producto: 'waiki', alt: 'Waiki encendido sobre piso de cerámica, contra una pared blanca' },
  { numero: '69', producto: 'waiki', alt: 'Waiki encendido con una tetera floreada sobre la cubierta, en un interior de madera' },
  { numero: '70', producto: 'waiki', alt: 'Persona señalando la llama del equipo recién encendido, sobre piso de cerámica' },
  { numero: '71', producto: 'waiki', alt: 'Manos de una persona junto a la combustión con Waiki encendida' },
  { numero: '72', producto: 'waiki', alt: 'Dos técnicos instalando el equipo sobre una plancha de fibrocemento' },
  { numero: '73', producto: null, alt: 'Equipo completo visto desde el exterior a través de la puerta de una vivienda' },
  { numero: '74', producto: null, alt: 'Dos equipos completos, negro y negro con rojo, contra un muro de madera' },
  { numero: '75', producto: null, alt: 'Equipo completo encendido contra una pared clara, con la salida de humos al cielo raso' },
  { numero: '76', producto: null, alt: 'Equipo completo alto instalado en una cocina, junto a muebles verdes' },
  { numero: '77', producto: null, alt: 'Equipo negro con rojo encendido contra una pared burdeos' },
  { numero: '78', producto: 'waiki', alt: 'Waiki encendido en el rincón de una vivienda, sobre piso de cerámica' },
  { numero: '79', producto: null, alt: 'Cúpula geodésica de vidrio sobre una terraza de madera, uno de los recintos calefaccionados' },
  { numero: '80', producto: null, alt: 'Equipo completo encendido junto a un juego de atizadores, contra un muro de ladrillo' },
  { numero: '81', producto: 'waiki', alt: 'Combustión con Waiki encendida contra un muro de bloques de cemento' },
  { numero: '82', producto: null, alt: 'Equipo negro con rojo encendido entre dos apliques, contra un muro de madera' },
  { numero: '83', producto: null, alt: 'Equipo negro con rojo con ollas de acero sobre la cubierta, junto a una puerta blanca' },
  { numero: '84', producto: null, alt: 'Equipo completo encendido en el rincón de una vivienda, sobre piso de madera' },
  { numero: '85', producto: null, alt: 'Equipo negro con rojo con dos ollas de acero sobre la cubierta' },
  { numero: '86', producto: 'waiki', alt: 'Waiki encendido sobre un piso de pizarra, contra un muro de madera' },
  { numero: '87', producto: 'waiki', alt: 'Waiki encendido contra un muro revestido en piedra, en un living' },
  { numero: '88', producto: null, alt: 'Cocina a leña de fierro fundido encendida en una habitación con piso de madera' },
  { numero: '89', producto: null, alt: 'Montaje de una cúpula geodésica, con la salida de humos ya instalada en la cubierta' },
  { numero: '90', producto: null, alt: 'Equipo negro con rojo con ollas sobre la cubierta, junto a una puerta blanca' },
  { numero: '91', producto: null, alt: 'Equipo negro con rojo encendido entre dos sillones, sobre piso de cerámica' },
  { numero: '92', producto: null, alt: 'El mismo equipo negro con rojo entre los dos sillones, en otra toma' },
  { numero: '93', producto: null, alt: 'Equipo negro con rojo con ollas sobre la cubierta, contra un muro de madera' },
  { numero: '94', producto: 'waiki', alt: 'Waiki encendido junto a un banco de madera, contra un muro entablado' },
  { numero: '95', producto: 'waiki', alt: 'Waiki acoplado a una combustión grande, encendido, con sombreros colgados en el muro' },
  { numero: '96', producto: 'waiki', alt: 'Waiki encendido visto detrás de un sillón, junto a una lámpara de pie' },
  { numero: '97', producto: 'waiki', alt: 'Waiki encendido junto a leña apilada y plantas, contra un muro de ladrillo' },
  { numero: '98', producto: null, alt: 'Equipo negro con rojo instalado entre dos apliques, contra un muro entablado' },
  { numero: '99', producto: 'waiki', alt: 'Waiki encendido junto a un saco de pellet, sobre piso de madera' },
  { numero: '100', producto: 'waiki', alt: 'Waiki acoplado a una combustión de otra marca, encendido, contra una pared celeste' },
  { numero: '101', producto: null, alt: 'Equipo completo junto a sacos de pellet, en un living con sofá blanco y ventanal' },
  { numero: '102', producto: 'waiki', alt: 'Waiki acoplado a una combustión de otra marca, con la llama a plena vista' },
  { numero: '103', producto: 'waiki', alt: 'Waiki encendido en un nicho junto a leña apilada, con muro de cerámica blanca' },
  { numero: '104', producto: 'waiki', alt: 'Waiki encendido junto a un canasto de leña, sobre una alfombra' },
  { numero: '105', producto: 'waiki', alt: 'Waiki acoplado a una combustión con parrilla superior, contra un muro de ladrillo' },
  { numero: '106', producto: 'waiki', alt: 'Waiki encendido con herramientas al lado, contra un muro de madera' },
  { numero: '107', producto: 'waiki', alt: 'Waiki encendido junto a plantas y un mueble de madera' },
  { numero: '108', producto: null, alt: 'Montaje de una cúpula geodésica con una escalera apoyada en la cubierta' },
  { numero: '109', producto: 'waiki', alt: 'Waiki encendido contra un muro de madera, junto a un tablón apoyado' },
  { numero: '110', producto: 'waiki', alt: 'Waiki encendido junto a un sillón y un saco de pellet' },
  { numero: '111', producto: 'waiki', alt: 'Waiki acoplado a una combustión de otra marca, con la llama alta tras el vidrio' },
  { numero: '112', producto: 'waiki', alt: 'Waiki encendido junto a una lámpara y un sillón tapizado' },
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
