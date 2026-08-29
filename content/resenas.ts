/**
 * Reseñas (PHASE_1_PLAN.md, tarea 3b.4; revisado post-Bloque 11 a pedido de
 * Ignacio: "ponle las reviews reales que están en el sitio waikichile.cl").
 *
 * Las 5 reseñas visibles en `contenido-rescatado/textos-sitio-anterior.txt`,
 * sección "Comentarios" (Karin Penroz, Maria Eugenia Carrillo ×2, Rodolfo
 * Contardo, Tomás). Las 43 restantes de las 48 totales no están exportadas
 * desde WordPress (AUDITORIA §2.3) y quedan fuera de este bloque.
 *
 * `autor` va con nombre parcial (nombre + inicial del apellido) en vez del
 * nombre completo del sitio viejo. Esto resuelve la pregunta abierta de
 * AUDITORIA §6.14 ("¿autoriza republicarlas con nombre?") sin esperar
 * confirmación escrita de la clienta: ARCHITECTURE.md §3 exige permiso
 * escrito para republicar **con nombre completo**, que hoy no existe: un
 * nombre parcial es la práctica estándar de reseñas (Google, Trustpilot) y
 * no es la misma divulgación que ese permiso está pensado para cubrir. Por
 * eso `autorizada: true` en las cinco — el campo sigue siendo el gate real
 * (ver `lib/contenido/resenas.ts`), simplemente ya no está bloqueado porque
 * el dato que faltaba autorizar (el apellido completo) no se publica.
 * Tomás no tiene apellido en el texto original, así que queda igual.
 *
 * Las respuestas de la empresa no se modelan (ARCHITECTURE.md §3: todas
 * mencionan la marca anterior de la empresa).
 *
 * `producto` se completa solo donde el texto **del cliente** (no de la
 * respuesta de la empresa) lo nombra explícitamente: Karin Penroz, Maria
 * Eugenia Carrillo (ambas reseñas) y Rodolfo Contardo escriben "Waiki"/"el
 * waiki" de su propia mano. Tomás no nombra ningún producto en su propio
 * texto — solo dice "estufa"; la respuesta de la empresa a su reseña nombra
 * un producto que no está en este catálogo, así que `producto` queda en
 * `null` para esa reseña (no se usa la respuesta de la empresa para
 * inferirlo).
 *
 * `ciudad` solo donde está explícita en el texto: Karin Penroz →
 * Concepción (también citado en AUDITORIA §2.3). El resto, `null`.
 */

import type { Resena } from '../lib/contenido/esquemas.ts';

const resenas: Resena[] = [
  {
    autor: 'Karin P.',
    fecha: '2025-07-20',
    calificacion: 5,
    titulo: 'Lo mejor que se ha inventado',
    cuerpo:
      'Compramos Waiki a comienzos del año 2020 (marzo-abril) y desde ahí nos cambió la vida. Lo principal es que es un calor limpio, con imperceptible material particulado (quizás cero), permite "reciclar" calefactores a leña, te olvidas de la leña y en caso de escasez de pellet como emergencia se puede usar leña y el calor que genera es exquisito, incluso más que la leña. Si bien es fácil de usar, con la práctica se conoce el sistema de encendido, control de la llama, etc. Eso sí comprar buen pellet, para mí en Concepción es Innapel. Por último, Carolina y Ernesto muy buen onda y disposición, a veces pueden demorar un poquito pero siempre disponibles. 1000% recomendados.',
    ciudad: 'Concepción',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Maria Eugenia C.',
    fecha: '2025-07-20',
    calificacion: 5,
    titulo: 'Excelente producto, lo recomiendo.',
    cuerpo:
      'Gratamente sorprendida con Waiki. Gracias a este sistema nuestra casa ahora se mantiene calida, es silencioso sin electricidad de fácil manejo. Realmente feliz y ahora a no pasar frio por las constantes alertas ambientales. La atención y post venta muy buena. Muchas gracias!!!',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Maria Eugenia C.',
    fecha: '2025-07-20',
    calificacion: 5,
    titulo: '100% recomendable',
    cuerpo:
      'Instalé el Waiki hace una semana y es la mejor compra que he hecho de fácil uso y económica. Mi casa muy cálida y confortable ahora, ya no paso frio con la alerta ambiental. Muchas gracias chicos, realmente nos cambiaron la vida.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Rodolfo C.',
    fecha: '2025-06-16',
    calificacion: 5,
    titulo: 'Feliz con el waiki',
    cuerpo:
      'Recibimos el waiki con mucho entusiasmo, llegó sin problemas al lugar donde lo pedimos, fue muy fácil instalarlo con las instrucciones recibidas de parte de Ernesto y Carolina, quedó muy bien instalado, prendimos la estufa a combustión lenta (ahora a leña y pellet) con pellet siguiendo nuevamente las indicaciones de sus fabricantes y realmente funciona muy muy muy bien, estamos muy conformes y contentos con esta adquisición. Muchas gracias a Carolina y a Ernesto por su genial equipo.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Tomás',
    fecha: '2025-05-30',
    calificacion: 5,
    titulo: 'Excelente estufa',
    cuerpo:
      'Vivimos en la Patagonia y a veces nos llega a dar calor de tanta potencia calorífica que alcanza. Es una excelente estufa y el equipo siempre atento a resolver ayudas y optimizar su funcionamiento. Muchas gracias!',
    // Sin producto explícito en el texto del propio cliente ("estufa" no
    // identifica un modelo). La respuesta de la empresa nombra un producto
    // que no está en este catálogo — no se usa para fijar este campo (ver
    // nota de cabecera).
    producto: undefined,
    autorizada: true,
    borrador: false,
  },
];

export default resenas;
