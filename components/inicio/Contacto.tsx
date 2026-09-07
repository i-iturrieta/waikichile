/**
 * Contacto ("Hablemos") — cierre de Inicio.
 *
 * Sección nueva de la ronda 05-09-2026 ("Home Movil A" de Claude Design).
 * El home terminaba en las reseñas y dejaba al visitante sin salida: para
 * escribir había que volver arriba, abrir el menú y entrar a `/contacto/`.
 * Cerrar con las dos vías directas —WhatsApp y teléfono— es lo que recoge a
 * quien llegó hasta el final ya convencido.
 *
 * No reemplaza a `/contacto/` ni duplica su formulario: son dos cosas
 * distintas. Acá van los dos canales que no necesitan escribir nada
 * (ARCHITECTURE.md §1.2 — el WhatsApp es la vía que sostiene la degradación
 * grácil del formulario, "no un adorno"); el formulario completo sigue
 * viviendo en su página.
 *
 * La pregunta del copy —los metros de la casa— no es retórica: es
 * exactamente el dato con el que la empresa decide qué equipo recomendar, y
 * pedirlo por adelantado ahorra el primer intercambio de mensajes.
 *
 * Mercado Pago: confirmado por Ignacio (05-09-2026). Acá aparece como
 * información operativa de cómo se paga, complementando la señal de
 * confianza de `PuntosClave.tsx` — ver el comentario de ese archivo.
 *
 * El teléfono sale de `content/empresa.ts`, no de un literal: es el mismo
 * número que usan el pie, el menú móvil y el JSON-LD de `Organization`, y
 * escribirlo a mano en un sexto lugar es garantizar que algún día uno de los
 * seis quede desactualizado.
 *
 * Escritorio (cocinado): pasa a dos columnas dentro de un panel con borde
 * —argumento a la izquierda, acciones a la derecha— para que el bloque se
 * lea como una unidad de cierre y no como texto suelto al final del scroll.
 */

import { IconoTarjeta, IconoWhatsapp } from '@/components/ui/iconos';
import { empresa } from '@/lib/contenido/empresa';
import { enlaceTelefono, enlaceWhatsapp } from '@/components/layout/whatsapp';

export default function Contacto() {
  return (
    <section className="px-5 pb-[30px] pt-[34px] md:px-8 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-sitio lg:flex lg:items-center lg:justify-between lg:gap-16 lg:rounded-[18px] lg:border lg:border-borde-suave lg:bg-superficie-alta lg:px-14 lg:py-14">
        <div className="lg:max-w-[46ch]">
          <h2 className="font-titulos text-[26px] font-semibold tracking-[-0.015em] text-texto lg:text-h2">
            Hablemos
          </h2>
          <p className="mt-[9px] text-cuerpo leading-[1.55] text-texto-tenue">
            Cuéntanos los metros de tu casa y te decimos qué equipo te sirve.
          </p>
        </div>

        <div className="lg:w-[22rem] lg:shrink-0">
          <div className="mt-[18px] flex flex-col gap-2.5 lg:mt-0">
            <a
              href={enlaceWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[54px] items-center justify-center gap-[9px] rounded-xl bg-secundario text-[17px] font-semibold text-claro transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            >
              <IconoWhatsapp tamano={20} />
              WhatsApp
            </a>
            <a
              href={enlaceTelefono()}
              className="flex min-h-[54px] items-center justify-center rounded-xl border border-borde-fuerte bg-superficie-alta text-[17px] font-semibold text-texto transition-colors hover:border-marca hover:text-marca focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
            >
              {empresa.telefono}
            </a>
          </div>

          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-borde-suave bg-superficie-baja px-3.5 py-[13px]">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[7px] border border-borde-suave bg-superficie-alta px-2.5 py-1.5 text-[12.5px] font-bold text-pago-claro">
              <IconoTarjeta tamano={14} />
              Mercado Pago
            </span>
            <span className="text-[13.5px] leading-[1.4] text-texto-tenue">
              Pagos con tarjeta o transferencia vía Mercado Pago
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
