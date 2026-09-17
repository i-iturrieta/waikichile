/**
 * Pie de página (ARCHITECTURE.md §3 "Empresa", §4; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.3). Server component: marca, mapa del sitio,
 * contacto, redes y razón social/RUT solo si la clienta ya los entregó.
 *
 * Redes: TikTok e Instagram. Facebook queda fuera hasta resolver el handle
 * —el vigente sigue siendo el de la marca anterior de la empresa— ver el
 * comentario junto a `redesSchema` en `lib/contenido/esquemas.ts` y
 * AUDITORIA_SITIO_ACTUAL.md §6, punto 12.
 *
 * `empresa.razonSocial` y `empresa.rut` son `null` hoy (ver
 * `content/empresa.ts`): la línea que los muestra se omite por completo en
 * vez de mostrar un placeholder visible, tal como pide la tarea 5.3.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * El pie pasa de claro con borde superior a bloque oscuro. Con el nuevo
 * ritmo de bandas del home —hero fotográfico, franja oscura, calculadora
 * oscura— un pie color crema quedaba como el final más pálido de la página
 * justo donde hace falta un cierre. En oscuro, además, cumple la función que
 * un pie tiene en cualquier sitio: marcar sin ambigüedad dónde termina el
 * contenido.
 *
 * Es también donde vive el mapa completo del sitio. Garantía y Preguntas
 * Frecuentes salieron de la navegación del encabezado en esta misma ronda
 * (ver `enlaces-navegacion.ts`) y este es su lugar: nadie las busca en el
 * menú, se las busca abajo.
 *
 * El separador de 74px del final solo existe bajo `lg`, y solo por
 * `BarraFija.tsx`: la barra de acción es `position: fixed` y, sin ese
 * espacio, taparía la última línea del pie de forma permanente. En `lg` la
 * barra desaparece y el separador con ella — dejarlo puesto sería un hueco
 * inexplicable al final de la página en escritorio.
 *
 * Escritorio (cocinado): tres columnas —marca, secciones, contacto— en vez
 * de la pila del móvil, con la línea legal separada abajo. Ese es el reparto
 * estándar de un pie a 1280px y no hay razón para inventar otro.
 */

import Image from 'next/image';
import Link from 'next/link';
import { empresa } from '@/lib/contenido/empresa';
import { ENLACES_NAVEGACION, ENLACE_CONTACTO } from './enlaces-navegacion';
import { enlaceTelefono } from './whatsapp';

/** Mapa del sitio del pie: los seis principales más los dos secundarios. */
/**
 * El mapa del pie pasa a ser `ENLACES_NAVEGACION` (08-09-2026), que es la
 * lista completa **con Inicio**. Antes se armaba acá a mano con principales
 * + secundarios, y por eso el pie —que se supone es el mapa completo del
 * sitio— era el único lugar donde faltaba justamente la página principal.
 */
const ENLACES_MAPA = ENLACES_NAVEGACION;

function construirUrlTiktok(handle: string): string {
  // El handle ya se guarda con "@" (content/empresa.ts: '@waikichile'), y
  // así es como TikTok arma sus URLs de perfil: tiktok.com/@usuario.
  return `https://www.tiktok.com/${handle}`;
}

function construirUrlInstagram(handle: string): string {
  // Instagram, a diferencia de TikTok, no usa "@" en la URL de perfil.
  return `https://www.instagram.com/${handle.replace(/^@/, '')}/`;
}

const CLASE_ENLACE =
  'text-claro/95 transition-colors hover:text-ambar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar';

export default function Pie() {
  const anioActual = new Date().getFullYear();
  const mostrarRazonSocial = empresa.razonSocial !== null && empresa.rut !== null;

  return (
    <footer className="bg-oscuro px-5 pb-[26px] pt-[30px] text-claro md:px-8 lg:px-16 lg:pb-10 lg:pt-16">
      <div className="mx-auto max-w-sitio">
        <div className="lg:grid lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-[9px]">
              <Image
                src="/logo-waiki-icono.png"
                alt=""
                width={217}
                height={330}
                className="h-[26px] w-auto"
              />
              <span className="font-titulos text-[20px] font-semibold">Waiki Chile</span>
            </div>
            <p className="mt-[11px] max-w-[38ch] text-[15px] leading-[1.5] text-claro/85">
              Quemadores y estufas a pellet, con tiro natural y sin electricidad.
            </p>
          </div>

          <nav aria-label="Mapa del sitio" className="mt-5 lg:mt-0">
            <h2 className="sr-only">Secciones</h2>
            <ul className="grid grid-cols-2 gap-x-3.5 gap-y-[11px] text-[15px] lg:grid-cols-1 lg:gap-y-2.5">
              {ENLACES_MAPA.map(({ href, etiqueta, etiquetaBreve }) => (
                <li key={href}>
                  {/* `etiquetaBreve` solo en la grilla de dos columnas del
                      móvil, donde "Preguntas Frecuentes" se parte en dos
                      líneas y descuadra la retícula. En la columna única de
                      escritorio hay ancho de sobra para el nombre completo. */}
                  <Link href={href} className={CLASE_ENLACE}>
                    <span className="lg:hidden">{etiquetaBreve ?? etiqueta}</span>
                    <span className="hidden lg:inline">{etiqueta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 lg:mt-0">
            <h2 className="sr-only">Contacto</h2>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li>
                <a href={enlaceTelefono()} className={CLASE_ENLACE}>
                  {empresa.telefono}
                </a>
              </li>
              <li>
                <a href={`mailto:${empresa.correo}`} className={CLASE_ENLACE}>
                  {empresa.correo}
                </a>
              </li>
              <li>
                <Link href={ENLACE_CONTACTO.href} className={CLASE_ENLACE}>
                  {ENLACE_CONTACTO.etiqueta}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-claro/15 pt-4 lg:mt-12 lg:flex-row lg:items-center lg:justify-between lg:pt-6">
          <div className="flex gap-4 text-[15px]">
            <a
              href={construirUrlInstagram(empresa.redes.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className={CLASE_ENLACE}
            >
              Instagram
            </a>
            <a
              href={construirUrlTiktok(empresa.redes.tiktok)}
              target="_blank"
              rel="noopener noreferrer"
              className={CLASE_ENLACE}
            >
              TikTok
            </a>
            <a href={`mailto:${empresa.correo}`} className={CLASE_ENLACE}>
              Email
            </a>
            {/* Facebook: sin enlace a propósito — ver comentario de cabecera. */}
          </div>

          {/* `lg:pr-20` reserva el rincón inferior derecho, que en desktop lo
              ocupa el botón flotante de WhatsApp (fixed bottom-6 right-6, 56px).
              Sin esto, lo último de esta fila queda debajo del botón: le pasaba
              al crédito de abajo y le pasaría también a la razón social el día
              que se active. */}
          <div className="flex flex-col gap-1 text-[12.5px] text-claro/75 lg:flex-row lg:gap-4 lg:pr-20">
            <p className="mt-1.5 lg:mt-0">© {anioActual} Waiki Chile. Todos los derechos reservados.</p>
            {mostrarRazonSocial && (
              <p>
                {empresa.razonSocial} — RUT {empresa.rut}
              </p>
            )}
            {/* Crédito del estudio que hizo el sitio. Va como <p> hermano para
                que entre en la misma fila que el resto en desktop y se apile
                solo en móvil, igual que los otros dos. Enlace normal, sin
                nofollow y sin abrir pestaña: es una referencia real. */}
            <p>
              <a
                href="https://celeri.cl"
                className="underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
              >
                Diseño y desarrollo por Celeri
              </a>
            </p>
          </div>
        </div>

        {/* Espacio para la barra fija de acción; ver comentario de cabecera. */}
        <div aria-hidden className="h-[74px] lg:hidden" />
      </div>
    </footer>
  );
}
