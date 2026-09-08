/**
 * Producto · Waiki (PHASE_1_PLAN.md, tarea 3b.1).
 *
 * Fuente: `contenido-rescatado/DATOS-ESTRUCTURADOS.md` ("Producto · Waiki") y
 * `contenido-rescatado/textos-sitio-anterior.txt` ("¿Qué es Waiki?" y la
 * ficha `product/waiki/`). Descripción reescrita: sin la marca anterior de
 * la empresa, sin el tono publicitario del original ("¡Únete a la
 * revolución Waiki!").
 *
 * `medidas`, `superficieRecomendada` y `plazoEntrega` quedan en `null`: no
 * están documentados para Waiki en ninguna fuente rescatada (a diferencia de
 * Nahuen, que sí trae ancho/alto/fondo). No se inventan (ARCHITECTURE.md
 * §1.6). Waiki va primero en el catálogo (`orden: 1`) — "Waiki primero,
 * siempre" (ARCHITECTURE.md §3).
 */

import type { Producto } from '../../lib/contenido/esquemas.ts';

const waiki: Producto = {
  slug: 'waiki',
  nombre: 'Waiki',
  tagline: 'El quemador que convierte tu combustión lenta en una estufa a pellets, sin electricidad.',
  descripcion:
    'Waiki es un quemador de pellets que se instala dentro de una combustión lenta existente. No reemplaza tu estufa: la convierte, y te permite alternar entre leña y pellet según lo que tengas disponible. Funciona con un sistema de tiro natural — sin electricidad, sin electrónica — por lo que nunca depende de que haya luz para calefaccionar.\n\n' +
    'Al instalarse sobre tu propia combustión, evita el gasto de ductos evacuadores nuevos o de hacer orificios adicionales, como piden otros sistemas de calefacción a pellets. Cada equipo se fabrica a medida a partir de las fotografías de la combustión que envía el cliente.\n\n' +
    'Para instalaciones en Chiloé, La Araucanía y Los Ríos se solicita un abono del ítem de instalación como reserva, no reembolsable, que compromete una fecha específica de trabajo; el saldo del equipo se cancela el día de la instalación. El valor publicado no incluye el controlador de presión, necesario cuando la cañería de salida supera los 3,5 metros.',
  precio: { tipo: 'consultar' },
  // Pendiente de la clienta — no documentado para Waiki en ninguna fuente
  // rescatada (AUDITORIA §6, DATOS-ESTRUCTURADOS.md).
  superficieRecomendada: null,
  medidas: null,
  especificaciones: [
    { etiqueta: 'Consumo', valor: '0,8 a 1,5 kg de pellet por hora, según el tiraje' },
    { etiqueta: 'Capacidad de la tolva', valor: '6,5 kg' },
    { etiqueta: 'Autonomía por carga', valor: '4 a 7 horas continuas' },
    { etiqueta: 'Rendimiento de un saco de 15 kg', valor: '~15 horas de calefacción a tiraje medio' },
    { etiqueta: 'Fabricación', valor: 'Corte CNC láser y plasma' },
    { etiqueta: 'Material del quemador', valor: 'Acero inoxidable de alta temperatura' },
  ],
  colores: [],
  // Sin plazo de entrega específico documentado (distinto de la condición de
  // reserva/abono, que es comercial, no un plazo — ver descripción).
  plazoEntrega: null,
  incluye: [],
  noIncluye: ['Controlador de presión (obligatorio sobre 3,5 m de cañería)'],
  // Segunda pasada de fotos (ver content/instalaciones.ts para el detalle
  // completo de la revisión): las 5 fotos originales de imagenes-cliente/
  // 1-productos/waiki/ seguían con el adhesivo de la marca anterior visible
  // en la tolva, así que se reemplazaron por 4 fotografías limpias elegidas
  // de imagenes-cliente/3-instalaciones/ (confirmadas sin el adhesivo,
  // revisadas de cerca antes de incluirlas). La galería completa de
  // instalaciones de Waiki (29 fotos) vive en content/instalaciones.ts y se
  // muestra debajo de esta ficha vía el mismo Visor de la página
  // Instalaciones.
  imagenes: [
    { archivo: 'producto-waiki-1.jpg', alt: 'Waiki instalado y encendido junto a bolsas de pellet, contra una pared de piedra' },
    { archivo: 'producto-waiki-2.jpg', alt: 'Waiki instalado y encendido, con un niño abrazando a un gato junto a la estufa' },
    { archivo: 'producto-waiki-3.jpg', alt: 'Waiki instalado, fotografía en blanco y negro con un niño y un gato' },
    { archivo: 'producto-waiki-4.jpg', alt: 'Waiki instalado junto a dos teteras esmaltadas azules, contra una pared de piedra' },
  ],
  requiereControlador: true,
  // Waiki no usa las condiciones estándar: su compra no se reserva con el
  // 30% sino con un abono del ítem de instalación —y solo en Chiloé, La
  // Araucanía y Los Ríos—, el saldo se paga el día de la instalación y no
  // hay despacho porque se instala en terreno. Está en su `descripcion`.
  usaCondicionesEstandar: false,
  destacado: true,
  orden: 1,
  borrador: false,
};

export default waiki;
