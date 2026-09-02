/**
 * ContactoDirecto — degradación grácil del formulario de contacto
 * (ARCHITECTURE.md §1.2: "Si `RESEND_API_KEY` no está presente en el build,
 * el formulario no se rompe: se renderiza como bloque de contacto directo
 * con WhatsApp y `mailto:`"; Bloque 10 de PHASE_1_PLAN.md, tarea 10.4 —
 * "criterio de aceptación del anti-lock-in" del proyecto).
 *
 * Server component puro: sin `"use client"`, sin estado, sin Turnstile, sin
 * ningún `fetch` a `/api/contacto`. Tres enlaces estáticos (WhatsApp,
 * `mailto:`, `tel:`) construidos desde `empresa` (`lib/contenido/empresa.ts`)
 * — los mismos datos que usa `components/layout/BotonWhatsapp.tsx` y el pie
 * de página, no un dato nuevo inventado para esta pantalla.
 *
 * La decide `app/contacto/page.tsx` en build (`process.env.RESEND_API_KEY`),
 * no este componente: este archivo no sabe ni le importa por qué se lo está
 * usando en vez de `Formulario`.
 */

import Boton from '@/components/ui/Boton';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import { empresa } from '@/lib/contenido/empresa';

const MENSAJE_PRELLENADO_WHATSAPP = 'Hola, quiero hacer una consulta sobre los equipos Waiki.';

export default function ContactoDirecto() {
  const numeroWhatsapp = empresa.whatsapp.replace(/\D/g, '');
  const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(
    MENSAJE_PRELLENADO_WHATSAPP
  )}`;

  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <Contenedor className="max-w-2xl">
        <Titulo nivel={1}>Contacto</Titulo>
        <p className="mt-3 text-cuerpo text-texto-tenue">
          Escríbenos directo por cualquiera de estas vías y te respondemos a la brevedad.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-imagen-principal border border-borde bg-superficie-alta p-8 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-caption font-medium text-texto-tenue">WhatsApp</span>
            <Boton href={enlaceWhatsapp} tamano="lg" className="self-start" target="_blank" rel="noopener noreferrer">
              Escribir por WhatsApp
            </Boton>
          </div>

          <div className="flex flex-col gap-1 border-t border-borde pt-4">
            <span className="text-caption font-medium text-texto-tenue">Correo</span>
            <a href={`mailto:${empresa.correo}`} className="text-cuerpo text-marca underline-offset-4 hover:underline">
              {empresa.correo}
            </a>
          </div>

          <div className="flex flex-col gap-1 border-t border-borde pt-4">
            <span className="text-caption font-medium text-texto-tenue">Teléfono</span>
            <a
              href={`tel:${empresa.telefono.replace(/\s+/g, '')}`}
              className="text-cuerpo text-marca underline-offset-4 hover:underline"
            >
              {empresa.telefono}
            </a>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
