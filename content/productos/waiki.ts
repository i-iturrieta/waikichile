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
  // Bloque 11, tarea 11.6: de las 5 fotos reales de Waiki en imagenes-cliente/
  // 1-productos/waiki/, las 5 muestran la tolva del quemador con un adhesivo
  // circular de la marca anterior de la empresa (ver el comentario de
  // cabecera de content/resenas.ts para el mismo criterio de no citar ese
  // nombre literal ni en comentarios) perfectamente visible al acercarse —
  // es una pieza física de fábrica de esa época, no ropa ni cartelería de un
  // técnico, así que aparece en todas las unidades instaladas de este lote.
  // Solo una (producto-waiki-1.jpg) se pudo salvar recortando la tolva fuera
  // del encuadre sin que se note el corte; en las otras cuatro la tolva está
  // demasiado cerca del visor de la llama para recortarla sin arruinar la
  // foto, así que se descartan en vez de publicar el logo de la marca
  // anterior (ARCHITECTURE.md §9: la regla de que esa marca no aparece no
  // distingue entre texto y fotografía). Por eso el arreglo queda en 1
  // imagen en vez de las 4-5 que hubiera alcanzado el material recibido.
  // Mismo criterio de "menos fotos reales que una mala" ya aplicado a Chakay
  // más abajo.
  imagenes: [
    { archivo: 'producto-waiki-1.jpg', alt: 'Waiki instalado, vista frontal con la llama encendida' },
  ],
  requiereControlador: true,
  destacado: true,
  orden: 1,
  borrador: false,
};

export default waiki;
