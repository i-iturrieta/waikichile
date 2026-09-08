/**
 * Reseñas (PHASE_1_PLAN.md, tarea 3b.4).
 *
 * **Las del sitio anterior, recuperadas completas** (08-09-2026). Hasta ese
 * día había 5 —las únicas que estaban en
 * `contenido-rescatado/textos-sitio-anterior.txt`— y el resto se daba por
 * perdido. No lo estaba: el WordPress original seguía vivo en Hostinger, y
 * las 48 se recuperaron desde el plugin de reseñas
 * (`contenido-rescatado/wordpress-original/RESENAS.md` y `.json`, extraídas
 * con `extraer-resenas.mjs`). Ignacio pidió expresamente "que queden todos
 * los comentarios posibles de la página anterior".
 *
 * Promedio del conjunto completo: **4,90 / 5** — 46 de cinco estrellas, una
 * de cuatro y una de una. La más antigua es de junio de 2020 y la más nueva
 * de julio de 2025.
 *
 * **De las 48, este archivo tiene 39: 38 publicadas y 1 en borrador.** Las
 * otras 9 no están acá, y las dos secciones de abajo explican exactamente
 * por qué.
 *
 * --- Nombres -------------------------------------------------------------
 * `autor` va con nombre parcial (nombre + inicial del apellido) en vez del
 * nombre completo del sitio viejo. Esto resuelve la pregunta abierta de
 * AUDITORIA §6.14 ("¿autoriza republicarlas con nombre?") sin esperar
 * confirmación escrita: ARCHITECTURE.md §3 exige permiso escrito para
 * republicar **con nombre completo**, que hoy no existe; un nombre parcial es
 * la práctica estándar de reseñas (Google, Trustpilot) y no es la misma
 * divulgación que ese permiso está pensado para cubrir. Por eso
 * `autorizada: true` en todas — el campo sigue siendo el gate real (ver
 * `lib/contenido/resenas.ts`), simplemente ya no está bloqueado porque el
 * dato que faltaba autorizar (el apellido completo) no se publica. Quien
 * firmó con un solo nombre queda igual.
 *
 * --- Las 9 que faltan: nombran la marca anterior --------------------------
 * Nueve clientes nombran la marca anterior —la de la empresa o la del
 * producto— con sus propias palabras: Rodrigo (17-04-2025), Marisol V.
 * (30-10-2023), Alfredo Q. (14-06-2023), Patricio S. (17-04-2023), Lilian
 * (16-11-2021), Jorge T. (30-08-2021), Alexis S. (28-07-2021), Cecilia
 * (03-06-2021) y Marcela (27-10-2020).
 *
 * **No están en este archivo ni siquiera en borrador**, y la razón es
 * concreta, no de criterio: `lib/contenido/guardia.test.ts` recorre
 * `content/`, `app/` y `components/` y falla si encuentra esa marca en
 * cualquier archivo de texto (ARCHITECTURE.md §9). `borrador: true` oculta
 * una reseña del sitio, pero no la saca del árbol que la guardia revisa.
 *
 * Tampoco se pueden reescribir sin falsear un testimonio: cuando alguien
 * cuenta que está feliz con su equipo y lo llama por el nombre que tenía
 * entonces, cambiárselo es ponerle en la boca algo que no dijo. **Es decisión
 * de Ignacio**, y tiene precedente en las dos direcciones: la reseña de
 * Tomás, publicada desde el Bloque 3b, lleva esa marca elidida.
 *
 * El texto completo de las nueve está en
 * `contenido-rescatado/wordpress-original/RESENAS.md`. Ver `PENDIENTES.md`.
 *
 * --- La que está en borrador: la única negativa ---------------------------
 * Luis M. (30-05-2025), 1 estrella, por la demora de un repuesto. Es la
 * única reseña no positiva de las 48 y es perfectamente publicable: queda en
 * borrador porque mostrarla o no es una decisión de la empresa sobre su
 * propia reputación, no nuestra. Basta cambiar `borrador` a `false`.
 *
 * --- Respuestas de la empresa --------------------------------------------
 * Las 13 respuestas de la empresa no se modelan (ARCHITECTURE.md §3): casi
 * todas mencionan la marca anterior. Están guardadas completas en
 * `contenido-rescatado/wordpress-original/RESENAS.md`.
 *
 * --- Ciudad y producto ---------------------------------------------------
 * `ciudad` y `producto` solo se completan cuando el texto **del cliente** los
 * nombra explícitamente; nunca se infieren de la respuesta de la empresa ni
 * del contexto. El texto se transcribe tal como lo escribió cada persona: lo
 * único que se corrigió son palabras que el volcado partió en dos ("encen
 * dido") y un resto de codificación HTML.
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
    titulo: '100 % recomendable',
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
    // que no está en este catálogo — no se usa para fijar este campo.
    //
    // ⚠️ El cuerpo dice "el equipo siempre atento"; el original decía "el
    // equipo de <marca anterior> siempre atento". La elisión se hizo al
    // publicarla en el Bloque 3b y se conserva tal cual. Es el precedente
    // que hay que resolver junto con las reseñas en borrador de más abajo.
    producto: undefined,
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Hernán',
    fecha: '2025-05-30',
    calificacion: 5,
    titulo: 'Excelente!',
    cuerpo:
      'Waiki me funciona perfecto, me simplificó el encendido de la estufa, la regulación y ya no tengo que andar preguntando si la leña que venden está seca. Además están pendientes de cómo está funcionando todo. La mejor elección! Gracias! Desde san pedro de la paz',
    ciudad: 'San Pedro de la Paz',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carlos',
    fecha: '2025-05-30',
    calificacion: 5,
    titulo: 'Maravilloso',
    cuerpo:
      'Muy contento con el sistema waiki, en un principio no estaba muy convencido, pero ahora que lo tenemos instalado , puedo decir que es muy buen sistema. Súper contento con la instalación, el equipo de trabajo muy amable, siempre preocupados que todo esté bien antes, durante y después, eso se agradece.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    // La única reseña negativa de las 48. Queda en borrador esperando que
    // Ignacio decida: mostrarla le da credibilidad al conjunto, y a la vez
    // es la reputación de la empresa. No es decisión nuestra.
    autor: 'Luis M.',
    fecha: '2025-05-30',
    calificacion: 1,
    titulo: 'Pésima post venta.',
    cuerpo:
      'Pague un repuesto el martes y recién me lo envían a Temuco el viernes. O sea, el lunes recién lo tendré. Una semana después. Para dar precios son ágiles pero luego ni contestan. Piensen en este comentario cuando tengan que decidir si comprar o no',
    ciudad: 'Temuco',
    autorizada: true,
    borrador: true,
  },
  {
    autor: 'Bárbara S.',
    fecha: '2025-03-12',
    calificacion: 5,
    titulo: 'Instalación equipo waiki',
    cuerpo:
      'Desde el día que me puse en contacto, tuve una atención increíble un nivel de respuesta alto. Todo muy claro y me agendaron instalación a Pucón en un par de días. El equipo waiki funciona increíble muy práctico y fácil de utilizar 1000% recomendado tanto el equipo como las personas que llegan al domicilio a instalar y dar la charla de funcionamiento. Quedamos felices con este cambio. Precio, calidad y atención maravilloso ☺️',
    ciudad: 'Pucón',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Rubelindo G.',
    fecha: '2024-06-01',
    calificacion: 5,
    titulo: 'Intalación',
    cuerpo:
      'Desde el momento que me comunique una atención directa y amable llegaron después de dos días del contacto, quedó instalado en perfecto estado, todas las dudas solucionadas una muy buena educación, ahora mi combustion es mixta leña/pellet, muchas gracias.',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Karin V.',
    fecha: '2024-05-01',
    calificacion: 5,
    titulo: 'Excelente producto, lo recomiendo!',
    cuerpo:
      'La Waiki es una excelente inversión que brinda la flexibilidad de emplear leña o pellets. Además, el confort y la calidez que proporciona son excepcionales. Solo necesitas llenarla una vez para disfrutar de varias horas de calor. Recientemente, nos instalaron nuestra Waiki en Osorno para utilizar calefacción a pellet. La atención de Carolina y Ernesto f ue excelente. ¡¡¡Muchas gracias por todo!!!',
    ciudad: 'Osorno',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Flor D.',
    fecha: '2023-10-05',
    calificacion: 5,
    titulo: 'Parrilla nueva',
    cuerpo:
      'Hace poco cambiamos la parrilla por el nuevo diseño, nos a funcionado súper bien, mejor y más constante la llama por lo que el calor es más uniforme y prolongado sin que limpiar tanto y tan seguido. Muchas gracias por la asesoría.',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Claudio',
    fecha: '2023-06-14',
    calificacion: 5,
    titulo: 'Satisfacción',
    cuerpo:
      'Hola, tenemos 2 waikis instalados en dos propiedades desde octubre de 2020 con total satisfacción. El hecho de que aún funcione a leña nos permitió pasar sin problemas el invierno cuando hubo escasez de pellet. Por su puesto el pellet es primera opción y ha funcionado y calefaccionado muy bien, con mayor limpieza y menor trabajo que con la leña. Además, que el caño se ensucia bastante menos.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Denisse',
    fecha: '2023-06-09',
    calificacion: 5,
    titulo: 'Calorcito',
    cuerpo:
      'Para mí ha sido fantástico este método , porque es un calor limpio y rápido , no dependo de la electricidad La recomiendo totalmente',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Cristian G.',
    fecha: '2023-06-09',
    calificacion: 5,
    titulo: 'Calor permanente',
    cuerpo:
      'Genial, mi estufa a leña hoy funciona con pellet y cambia mucho, un calor permanente, mucho más autonomía y no más leña qué tener en casa, gracias chicos por la solución y un buen costo',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Jorge M.',
    fecha: '2023-06-09',
    calificacion: 5,
    titulo: 'Nueva parrilla.',
    cuerpo:
      'Hace unas semanas partimos usando la nueva parrilla y ha sido todo un acierto,funciona impecable,gracias Carolina y Ernesto!!',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carolina',
    fecha: '2023-06-09',
    calificacion: 5,
    titulo: 'Maravillosamente Practica',
    cuerpo:
      'El sistema Waiki está pensado para los que no tenemos mucho tiempo o expertis en hacer fuego, lo recomiendo 100% Casa temperada sin mayor esfuerzo Gracias Carito y Ernesto',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Erich C.',
    fecha: '2023-06-08',
    calificacion: 5,
    titulo: 'Parrilla nueva!',
    cuerpo:
      'Hoy comencé a utilizar la nueva parrilla de Waiki, que funciona para todo tipo de pellet y la verdad es que funciona la raja! Tengo una llama mucho más potente, por lo tanto el calor es mucho mejor, sin duda súper recomendable, gracias al equipo por el asesoramiento. Saludos Erich Cárdenas',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Nicolás B.',
    fecha: '2023-04-06',
    calificacion: 5,
    titulo: 'Recomendado al 100%',
    cuerpo:
      'Tengo hace como 2 años, este nuevo sistema de calefacción vivo en un departamento, no he tenido ningun problema calor limpio y seguro. Y sobre todo bien informado de parte de la empresa.',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Alex M.',
    fecha: '2023-04-01',
    calificacion: 5,
    titulo: 'Excelente Dualidad',
    cuerpo:
      'Excelente inversión, entrega la dualidad de usar leña o Pellets, lo cual es de gran ayuda en los momentos que no hay stock de Pellets, además el calor y comodidad que brinda es magnífica, ya que lo rellenas una vez y tienes para varias horas de calor, excelente inversión y gran calidad',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carlos',
    fecha: '2023-03-24',
    calificacion: 4,
    titulo: 'Estufas',
    cuerpo:
      'Tenemos dos instaladas en nuestro hogar ha Sido fantástico se recomienda y mucho calor limpio y la casa más aseada a comparación del uso con leña y la verdad que la función mixta es extraordinario',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Genesis',
    fecha: '2021-10-12',
    calificacion: 5,
    titulo: 'Adios leña!!!',
    cuerpo:
      'Excelente no pensé que calentaria igual que la leña super rápido tempera y que mejor que sin perder tiempo feliz con el servicio ahora el restorant estará agradable muchas gracias totalmente recomendados',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carlos C.',
    fecha: '2021-09-03',
    calificacion: 5,
    titulo: 'Muy funcional y recomendable',
    cuerpo:
      'Funciona muy bien, fácil de manipular y mantener. Muy buena inversión. Destacar lo excelente que resultó el proceso de venta desde el primer contacto hasta la instalación. Natri-Chonchi, Chiloe',
    ciudad: 'Chonchi, Chiloé',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Valesca M.',
    fecha: '2021-07-28',
    calificacion: 5,
    titulo: 'Felices',
    cuerpo:
      'Excelente estamos muy contesto como familia mi mamá yo y próximamente mi suegra pero super económica ya no nos quita tiempo como la leña en limpiar ordenar',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Nadia V.',
    fecha: '2021-07-22',
    calificacion: 5,
    titulo: '100% recomendable',
    cuerpo:
      'Atención excelente, puntualidad con el producto excelente. El aparato Waiki es muy funcional, para nada engorroso y por sobre todo ecológico✨✨❣️❣️❣️ Lo recomendamos 100%',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carlos P.',
    fecha: '2021-06-18',
    calificacion: 5,
    titulo: 'Excelente opción',
    cuerpo:
      'Agradezco atención oportuna, servicio en fecha acordada y claridad de recomendaciones para manejo de uso adecuado de este sistema adaptado de calefacción. Felicitaciones por la iniciativa.',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Lucio',
    fecha: '2021-06-04',
    calificacion: 5,
    titulo: 'EXCELENTE CAMBIO 👍👍👍',
    cuerpo:
      'Hoy nos instalaron nuestra Waiki en Concepción para utilizar calefacción a pellet, fueron muy puntuales en los plazos y el trabajo quedó muy bueno, la atención de la empresa y del técnico excelente, el poder calorífico es genial, muchas gracias.',
    ciudad: 'Concepción',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Mauricio F.',
    fecha: '2021-04-14',
    calificacion: 5,
    titulo: 'La mejor atención y servicio',
    cuerpo:
      'Puntuales muy detallistas un tremendo servicio Ahora a disfrutar de waiki y los beneficios del pellet',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Alicia D.',
    fecha: '2020-12-11',
    calificacion: 5,
    titulo: 'Felices con Waiki',
    cuerpo:
      'Busque una solución de calefacción para mi papa que es adulto mayor, más cómoda y fácil . La encontramos en esta empresa, aclararon nuestras dudas, y en un trámite rápido coordinamos la instalación , muy conformes con el servicio, instalación y funcionamiento. 100% recomendado.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Juan M.',
    fecha: '2020-11-06',
    calificacion: 5,
    titulo: 'Waiki',
    cuerpo:
      'La verdad que al comienzo no tenía muchas espectativas e incluso hasta desconfianza, hacer un agujero a mi estufa, quedará utilizable? Preguntas que fueron resueltas por una atención muy amable y para que decir de los resultados una alternativa de calefacción para tiempos de invierno FELIZ 100%RECOMENDADO',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Verónica',
    fecha: '2020-10-17',
    calificacion: 5,
    titulo: 'Cumple',
    cuerpo:
      'Desde un tiempo atrás ya veníamos siguiendo la página (viendo videos, comentarios). Hasta que nos decidimos adquirir waiki, la cual a cumplido con las expectativas. La recomendamos 100% muy bueno el sistema quedamos muy contentos 😁😁',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Wilma N.',
    fecha: '2020-10-07',
    calificacion: 5,
    titulo: 'Se pensó y se hizo… Excelente desicion!!!',
    cuerpo:
      'Estamos muy felices y calentitos con nuestro Waiki, fue una excelente desicion invertir en este equipo y darle una nueva vida a la combustión lenta, de una forma amigable con nuestro medio ambiente. Agradecemos la amabilidad y profesionalismo con que realizan su trabajo, salta a la vista el gran compromiso con lo que hacen 100 % recomendable.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'José N.',
    fecha: '2020-10-03',
    calificacion: 5,
    titulo: 'El convencido',
    cuerpo:
      '"Sii,me convencieron ,no creía mucho en estás transformaciones ,pero me decidí y les diré que estoy muy conforme . Calienta más que la leña yo creo,un calor agradable ,la instalación perfecta ,muy buen trato de sus dueños ,hagan el cambio no se arrepentirán y es más demoles la oportunidad a los nuevos emprendedores.',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Carolina P.',
    fecha: '2020-09-30',
    calificacion: 5,
    titulo: 'La mejor decisión!!!!',
    cuerpo:
      'Estamos demasiado felices . Ha sido una excelente inversión. La casa está más calentita que antes . Y lo Mejor ayudamos al medio ambiente. La instalación es muy rápida y queda todo limpio . El especialista se preocupa de explicar detenidamente el funcionamiento de WAIKI y resuelve todas las dudas. La Empresa está muy atenta a resolver inquietudes y guiarnos cuando sea necesario. La recomendamos a todos !!!! No se arrepentirán. Mucho éxito y los mejores deseos para esta gran empresa familiar.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Álvaro',
    fecha: '2020-09-03',
    calificacion: 5,
    titulo: 'Excelente',
    cuerpo:
      'Perfecto buen funcionamiento.la casa calentita el mejor cambio que hemos hecho . Buena inversión la recomiendo 100% y excelente atención gracias',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Cristian B.',
    fecha: '2020-07-21',
    calificacion: 5,
    titulo: 'Feliz…impresionado',
    cuerpo:
      'Hace 1 año que los sigo en fb, al principio tenía muchas dudas respecto a Waiki y su funcionalidad,,a medida que fui conociendo más sobre el producto,,me convenci. Ahora que la tengo en uso ,,,superó por mucho mis espectativas,,,, fácil de prender, calor inmediato,facilidad de uso,,,,así que ya me voy olvidando de leña a veces mezclada(seca-mojada),destinar mucho espacio para su acopio,,,dejar de hacer astillitas para que puedan prender los leños,,,,así que todo se traduce en beneficios,,,,así que feliz,feliz,feliz,,,,gracias Waiki',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Erich C.',
    fecha: '2020-07-17',
    calificacion: 5,
    titulo: 'Excelente',
    cuerpo:
      'La verdad que en un principio tenía la duda de cómo funcionaria, pero cumplió al 1000% nuestras expectativas, totalmente recomendable, la instalación muy bien, la capacitación excelente y la post venta la verdad super bien, sigan así chiquillos la verdad que así como uds dan ganas de comprar cosas. Ahora a disfrutar del calorcito que la verdad es mejor que la leña..',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'José',
    fecha: '2020-07-07',
    calificacion: 5,
    titulo: 'WAIKI un Excelente equipo',
    cuerpo:
      'La atención e instalación son excelentes, tenemos un par de horas el equipo instalado y la diferencia es notable en comparación a la utilización de leña. Mayor poder calorífico, fácil encendido, nos olvidaremos del picado de leña. Estamos contentos con la inversión. 100% recomendable',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
  {
    autor: 'Macarena',
    fecha: '2020-06-16',
    calificacion: 5,
    titulo: 'Calentitos con waiki',
    cuerpo:
      'Supimos de waiki por mi hermano y decidimos probar y es el mejor cambio… Ahora todos calentitos con waiki.',
    producto: 'waiki',
    autorizada: true,
    borrador: false,
  },
];

export default resenas;
