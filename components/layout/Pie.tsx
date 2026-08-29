/**
 * Pie de página (ARCHITECTURE.md §3 "Empresa", §4; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.3). Server component: contacto, redes (TikTok e
 * Instagram — Facebook queda fuera hasta resolver el handle, ver el
 * comentario junto a `redesSchema` en `lib/contenido/esquemas.ts` y
 * AUDITORIA_SITIO_ACTUAL.md §6, punto 12), enlaces a las secciones del
 * sitio, y razón social/RUT solo si la clienta ya los entregó.
 *
 * `empresa.razonSocial` y `empresa.rut` son `null` hoy (ver
 * `content/empresa.ts`) — la línea que los muestra se omite por completo en
 * vez de mostrar un placeholder visible ("Razón social: pendiente", por
 * ejemplo), tal como pide la tarea 5.3.
 */

import Image from 'next/image';
import Link from 'next/link';
import { empresa } from '@/lib/contenido/empresa';
import Contenedor from '@/components/ui/Contenedor';
import { ENLACES_NAVEGACION, ENLACE_CONTACTO } from './enlaces-navegacion';

function construirUrlTiktok(handle: string): string {
  // El handle ya se guarda con "@" (content/empresa.ts: '@waikichile'), y
  // así es como TikTok arma sus URLs de perfil: tiktok.com/@usuario.
  return `https://www.tiktok.com/${handle}`;
}

function construirUrlInstagram(handle: string): string {
  // Instagram, a diferencia de TikTok, no usa "@" en la URL de perfil.
  return `https://www.instagram.com/${handle.replace(/^@/, '')}/`;
}

export default function Pie() {
  const anioActual = new Date().getFullYear();
  const mostrarRazonSocial = empresa.razonSocial !== null && empresa.rut !== null;

  return (
    <footer className="border-t border-borde bg-superficie-alta">
      <Contenedor className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo-waiki-icono.png" alt="" width={217} height={330} className="h-7 w-auto" />
            <p className="font-titulos text-h3 font-semibold text-marca">Waiki Chile</p>
          </div>
          <p className="mt-3 text-cuerpo text-texto-tenue">
            Quemadores y estufas a pellet, con tiro natural: sin electricidad ni electrónica.
          </p>
        </div>

        <div>
          <h2 className="text-destacado font-titulos font-semibold text-texto">Contacto</h2>
          <ul className="mt-3 flex flex-col gap-2 text-cuerpo">
            <li>
              <a href={`tel:${empresa.telefono.replace(/\s+/g, '')}`} className="hover:text-marca hover:underline">
                {empresa.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${empresa.correo}`} className="hover:text-marca hover:underline">
                {empresa.correo}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-cuerpo">
            <a
              href={construirUrlTiktok(empresa.redes.tiktok)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-marca hover:underline"
            >
              TikTok
            </a>
            <a
              href={construirUrlInstagram(empresa.redes.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-marca hover:underline"
            >
              Instagram
            </a>
            {/* Facebook: sin enlace a propósito — ver comentario de cabecera. */}
          </div>
        </div>

        <div>
          <h2 className="text-destacado font-titulos font-semibold text-texto">Secciones</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-cuerpo">
            {[...ENLACES_NAVEGACION, ENLACE_CONTACTO].map(({ href, etiqueta }) => (
              <li key={href}>
                <Link href={href} className="hover:text-marca hover:underline">
                  {etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Contenedor>

      <div className="border-t border-borde">
        <Contenedor className="flex flex-col gap-1 py-6 text-caption text-texto-tenue sm:flex-row sm:items-center sm:justify-between">
          <p>© {anioActual} Waiki Chile. Todos los derechos reservados.</p>
          {mostrarRazonSocial && (
            <p>
              {empresa.razonSocial} — RUT {empresa.rut}
            </p>
          )}
        </Contenedor>
      </div>
    </footer>
  );
}
