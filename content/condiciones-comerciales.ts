/**
 * Condiciones comerciales — cómo se compra un equipo (08-09-2026).
 *
 * Fuente: la ficha de producto del sitio anterior, recuperada desde el
 * WordPress que seguía vivo en Hostinger
 * (`contenido-rescatado/wordpress-original/json/wc-productos.json`, producto
 * "Cocina de lujo Chakay"). Está escrito ahí literal: *"Para reservar tu
 * Chakay, solo necesitas abonar el 30% del valor total. Una vez que se
 * entregue el equipo, deberás cancelar el saldo restante. Si prefieres que se
 * envíe por Starken, deberás cancelar el saldo contra envío"*, *"Envío por
 * Starken, cruz del sur o casem express disponible (saldo contra envío)"* y
 * *"Posibilidad de solicitar factura o boleta"*.
 *
 * **La reserva del 30% está confirmada como vigente**: el dueño la repitió el
 * 08-09-2026, por su cuenta, hablando de otro equipo — *"este equipo se debe
 * solicitar al fono WhatsApp de la empresa con una reserva del 30% y el saldo
 * coordinarlo con el área de Venta"*. Que aparezca en la ficha de un producto
 * de 2025 y en un mensaje de hoy sobre otro producto es lo que la vuelve una
 * política de la empresa y no un dato suelto de una página vieja.
 *
 * ⚠️ **El despacho y el documento NO se reconfirmaron.** Vienen solo de la
 * ficha del sitio anterior. Se publican igual, con el mismo criterio con que
 * ya estaban publicados `plazoEntrega`, `incluye` y `noIncluye` de Chakay —
 * son datos que la empresa escribió de su propia mano— pero quedan anotados
 * en `PENDIENTES.md` para confirmar. El riesgo real es acotado: que hayan
 * cambiado de transportista.
 *
 * **Por qué esto existe como módulo y no como texto en cada ficha.** Hasta
 * hoy vivía dentro del párrafo de `descripcion` de Chakay, y solo ahí:
 * Nahuen y Mini Nahuen no decían nada sobre cómo se paga ni cómo llega el
 * equipo. Alguien decidiendo una compra de un millón de pesos necesita
 * encontrar eso de un vistazo, no leerlo en medio de un párrafo. Al ser un
 * módulo, además, se corrige en un solo lugar el día que cambie.
 *
 * `content/` no importa código (ARCHITECTURE.md §7) — el import de abajo es
 * de tipo y se borra en compilación. La validación con Zod ocurre en
 * `lib/contenido/condiciones-comerciales.ts`.
 */

import type { CondicionesComerciales } from '../lib/contenido/esquemas.ts';

const condicionesComerciales: CondicionesComerciales = {
  reserva: 'Se reserva con el 30% del valor total.',
  saldo: 'El saldo se paga contra entrega, o contra el envío si el equipo se despacha.',
  despacho: 'El despacho se coordina por Starken, Cruz del Sur o Casem Express.',
  documento: 'Emitimos boleta o factura, según lo que necesites.',
  solicitud: 'El pedido se hace por WhatsApp, y el saldo se coordina con el área de ventas.',
  borrador: false,
};

export default condicionesComerciales;
