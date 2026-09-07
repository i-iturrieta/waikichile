/**
 * Enlace de WhatsApp con mensaje prellenado.
 *
 * Vivía duplicado en tres archivos (`Encabezado.tsx`, `BotonWhatsapp.tsx` y
 * el mockup de Claude Design lo repite otras tres veces dentro de la misma
 * página): la misma constante de mensaje y la misma línea de
 * `replace(/\D/g, '')` copiadas. La ronda 05-09-2026 suma tres usos más
 * (menú móvil, sección "Hablemos" y barra fija de acción), así que la
 * duplicación pasa de molesta a problema real — si mañana cambia el texto
 * del mensaje hay que acordarse de seis lugares.
 *
 * Vive junto a `enlaces-navegacion.ts` y por el mismo motivo: es
 * infraestructura de navegación del cascarón del sitio, no contenido
 * editorial de `content/` ni un esquema de `lib/contenido/`.
 */

import { empresa } from '@/lib/contenido/empresa';

/** Mensaje que WhatsApp deja escrito en la caja de texto al abrir el chat. */
export const MENSAJE_PRELLENADO = 'Hola, tengo una consulta sobre los equipos Waiki.';

/**
 * URL de `api.whatsapp.com` para escribirle a la empresa.
 *
 * `api.whatsapp.com/send` y no `wa.me`: funciona igual en móvil (abre la
 * app) y en escritorio (abre WhatsApp Web), que es justo el rango que este
 * sitio necesita ahora que el CTA aparece también en la barra de escritorio.
 */
export function enlaceWhatsapp(mensaje: string = MENSAJE_PRELLENADO): string {
  const numero = empresa.whatsapp.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
}

/** Teléfono en formato `tel:` (sin espacios), para los enlaces de llamada. */
export function enlaceTelefono(): string {
  return `tel:${empresa.telefono.replace(/\s+/g, '')}`;
}
