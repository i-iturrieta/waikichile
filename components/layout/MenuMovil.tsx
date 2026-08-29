'use client';

/**
 * Navegación principal del encabezado (ARCHITECTURE.md §2, tabla de islas
 * de cliente; Bloque 5 de PHASE_1_PLAN.md, tarea 5.2 — "el menú móvil es la
 * única parte cliente" del encabezado).
 *
 * Por qué la navegación de escritorio también vive en este archivo cliente
 * y no en `Encabezado.tsx` (servidor): `aria-current` en la ruta activa
 * exige saber la ruta actual, y en un sitio 100% estático (`output:
 * 'export'`, ARCHITECTURE.md §1.1) un server component no tiene forma de
 * conocerla — solo `usePathname()` de `next/navigation` la entrega, y eso
 * exige `"use client"`. La alternativa sería duplicar la lista de enlaces y
 * la lógica de "cuál está activo" en dos componentes (uno servidor para
 * escritorio, uno cliente para el menú móvil); en vez de eso, se resuelve
 * una sola vez acá: una única isla de interactividad para toda la
 * navegación del encabezado, que es el criterio de ARCHITECTURE.md §2
 * ("cada isla es una decisión consciente"). `Encabezado.tsx` sigue siendo
 * servidor: solo monta `<MenuMovil>` junto al logo y los CTA.
 *
 * El botón hamburguesa y el panel desplegable son la parte que da nombre al
 * componente y la única con estado (`abierto`) — la lista de escritorio no
 * tiene estado propio, solo reutiliza `pathname` para `aria-current`.
 *
 * Nav en dos grupos (ver `enlaces-navegacion.ts`): la barra de escritorio y
 * la parte superior del panel móvil solo muestran `ENLACES_PRINCIPALES` (5).
 * `ENLACES_SECUNDARIOS` (Blog, Preguntas Frecuentes, Garantía) aparece solo
 * en el panel móvil, debajo de un separador y con menor peso visual — no
 * desaparecieron del sitio, solo bajaron de jerarquía.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ENLACES_PRINCIPALES, ENLACES_SECUNDARIOS, ENLACE_CONTACTO } from './enlaces-navegacion';

export default function MenuMovil() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  // Cerrar con Escape sin importar dónde esté el foco dentro del panel.
  useEffect(() => {
    if (!abierto) return;
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') setAbierto(false);
    }
    window.addEventListener('keydown', alPresionarTecla);
    return () => window.removeEventListener('keydown', alPresionarTecla);
  }, [abierto]);

  const esActivo = (href: string) => pathname === href;

  return (
    <>
      {/* Navegación de escritorio — solo los 5 enlaces principales, igual
          que el mockup elegido. Blog/Preguntas Frecuentes/Garantía viven en
          el panel móvil (más abajo) y en el pie de página. */}
      <nav aria-label="Principal" className="hidden md:flex md:items-center md:gap-6">
        {ENLACES_PRINCIPALES.map(({ href, etiqueta }) => (
          <Link
            key={href}
            href={href}
            aria-current={esActivo(href) ? 'page' : undefined}
            className={`text-cuerpo font-cuerpo transition-colors hover:text-marca ${
              esActivo(href) ? 'font-semibold text-marca' : 'text-texto'
            }`}
          >
            {etiqueta}
          </Link>
        ))}
      </nav>

      {/* Botón hamburguesa — visible solo bajo el quiebre md */}
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-boton text-texto md:hidden"
        aria-expanded={abierto}
        aria-controls="menu-movil-panel"
        aria-label={abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
          {abierto ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Panel móvil */}
      {abierto && (
        <div
          id="menu-movil-panel"
          className="absolute inset-x-0 top-full z-40 border-t border-borde bg-superficie-alta shadow-md md:hidden"
        >
          <nav aria-label="Principal (móvil)" className="flex flex-col gap-1 px-6 py-4">
            {ENLACES_PRINCIPALES.map(({ href, etiqueta }) => (
              <Link
                key={href}
                href={href}
                aria-current={esActivo(href) ? 'page' : undefined}
                onClick={() => setAbierto(false)}
                className={`rounded-boton px-3 py-2 text-cuerpo ${
                  esActivo(href) ? 'bg-marca/10 font-semibold text-marca' : 'text-texto hover:bg-superficie'
                }`}
              >
                {etiqueta}
              </Link>
            ))}

            {/* Secundarios: mismo destino que antes, un nivel de jerarquía
                más abajo — separador + texto más chico y tenue, en vez de
                mezclados con los principales. */}
            <div className="my-2 border-t border-borde" />
            {ENLACES_SECUNDARIOS.map(({ href, etiqueta }) => (
              <Link
                key={href}
                href={href}
                aria-current={esActivo(href) ? 'page' : undefined}
                onClick={() => setAbierto(false)}
                className={`rounded-boton px-3 py-1.5 text-caption ${
                  esActivo(href) ? 'font-semibold text-marca' : 'text-texto-tenue hover:text-marca'
                }`}
              >
                {etiqueta}
              </Link>
            ))}

            <Link
              href={ENLACE_CONTACTO.href}
              onClick={() => setAbierto(false)}
              className="mt-3 rounded-boton bg-marca px-3 py-2 text-center text-cuerpo font-semibold text-superficie"
            >
              {ENLACE_CONTACTO.etiqueta}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
