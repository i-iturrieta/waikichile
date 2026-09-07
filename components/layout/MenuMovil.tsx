'use client';

/**
 * Navegación principal del encabezado (ARCHITECTURE.md §2, tabla de islas
 * de cliente; Bloque 5 de PHASE_1_PLAN.md, tarea 5.2).
 *
 * Por qué la navegación de escritorio también vive en este archivo cliente
 * y no en `Encabezado.tsx` (servidor): `aria-current` en la ruta activa
 * exige saber la ruta actual, y en un sitio 100% estático (`output:
 * 'export'`, ARCHITECTURE.md §1.1) un server component no tiene forma de
 * conocerla — solo `usePathname()` la entrega, y eso exige `"use client"`.
 * La alternativa sería duplicar la lista de enlaces y la lógica de "cuál
 * está activo" en dos componentes; en vez de eso se resuelve una sola vez
 * acá: una única isla de interactividad para toda la navegación del
 * encabezado, que es el criterio de ARCHITECTURE.md §2.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * El panel móvil deja de ser un desplegable colgado bajo la barra y pasa a
 * ocupar la pantalla completa, con los enlaces en Bitter a 24px separados
 * por filetes. No es cosmético: el desplegable anterior dejaba el contenido
 * de la página visible y a medio tapar detrás, y con siete destinos obliga
 * a apuntar a renglones de 36px de alto. A pantalla completa cada destino
 * es una fila de ~50px, el foco no se escapa a lo que hay debajo, y el CTA
 * de WhatsApp puede anclarse abajo —donde llega el pulgar— en vez de quedar
 * al final de una lista que hay que recorrer.
 *
 * Los dos añadidos que el mockup no trae pero que un panel a pantalla
 * completa exige: bloqueo del scroll del documento mientras está abierto
 * (si no, el fondo se desplaza bajo el panel al arrastrar) y cierre con
 * Escape (ya existía). El foco no se atrapa con un `focus trap` completo:
 * el panel es lo primero en el DOM después del botón que lo abre y su
 * último elemento enfocable es el teléfono, así que tabular más allá sale
 * del panel hacia la barra del navegador, no hacia contenido tapado.
 *
 * Los enlaces secundarios (Garantía, Preguntas Frecuentes) ya no aparecen
 * en el panel: el mockup los saca de la navegación y los deja solo en el
 * pie, que es donde un sitio de este tamaño lista el mapa completo. Siguen
 * accesibles desde ahí y desde su URL — no desaparecen del sitio.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ENLACES_PRINCIPALES, ENLACE_CONTACTO } from './enlaces-navegacion';
import { IconoCerrar, IconoMenu, IconoWhatsapp } from '@/components/ui/iconos';

/** Los seis principales más Contacto — el orden exacto del panel del mockup. */
const ENLACES_PANEL = [...ENLACES_PRINCIPALES, ENLACE_CONTACTO];

/**
 * Los tres datos de contacto llegan resueltos por props desde `Encabezado`
 * (server component) en vez de importarse acá desde
 * `lib/contenido/empresa`. Ese módulo valida el contenido con Zod al
 * cargarse, y como este archivo es `"use client"`, importarlo arrastraría
 * Zod entero más `content/empresa.ts` al bundle del navegador para terminar
 * pintando un número de teléfono. Tres strings cruzan la frontera
 * servidor/cliente; el validador se queda en el servidor.
 */
interface MenuMovilProps {
  telefono: string;
  hrefTelefono: string;
  hrefWhatsapp: string;
}

export default function MenuMovil({ telefono, hrefTelefono, hrefWhatsapp }: MenuMovilProps) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  // `createPortal` necesita un `document` real, que no existe durante el
  // prerenderizado estático (`output: 'export'`). Este interruptor deja el
  // primer render idéntico en servidor y cliente —sin panel— y habilita el
  // portal recién después de montar, que es cuando el panel puede abrirse.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  // Cerrar con Escape sin importar dónde esté el foco dentro del panel, y
  // congelar el scroll del documento mientras el panel tapa la pantalla.
  // Los dos efectos comparten la misma condición y el mismo ciclo de vida,
  // así que van juntos en vez de en dos `useEffect` con la misma guarda.
  useEffect(() => {
    if (!abierto) return;

    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') setAbierto(false);
    }

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', alPresionarTecla);

    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener('keydown', alPresionarTecla);
    };
  }, [abierto]);

  // Cerrar al navegar. Con `output: 'export'` cada enlace es una carga de
  // página completa y el estado se pierde solo, pero el prefetch de
  // `next/link` puede resolver algunas navegaciones sin recargar — sin
  // esto, el panel quedaría abierto sobre la página nueva.
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  const esActivo = (href: string) => pathname === href;

  return (
    <>
      {/* Navegación de escritorio — aparece recién en `lg`; ver el
          comentario de cabecera de `Encabezado.tsx` para el porqué. */}
      <nav aria-label="Principal" className="hidden lg:flex lg:items-center lg:gap-7">
        {ENLACES_PRINCIPALES.map(({ href, etiqueta }) => (
          <Link
            key={href}
            href={href}
            aria-current={esActivo(href) ? 'page' : undefined}
            className={`font-cuerpo text-caption transition-colors hover:text-marca ${
              esActivo(href) ? 'font-semibold text-marca' : 'text-texto'
            }`}
          >
            {etiqueta}
          </Link>
        ))}
      </nav>

      {/* Botón hamburguesa — 44×44 (objetivo táctil WCAG 2.5.5), ícono 22px. */}
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-borde bg-superficie-alta text-texto transition-colors hover:bg-superficie focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca lg:hidden"
        aria-expanded={abierto}
        aria-controls="menu-movil-panel"
        aria-label="Abrir menú"
        onClick={() => setAbierto(true)}
      >
        <IconoMenu tamano={22} />
      </button>

      {/*
        El panel se monta con `createPortal` directamente en `<body>` en vez
        de quedar donde está este componente, que es dentro de `<header>`.
        Motivo: el encabezado lleva `backdrop-filter` (el desenfoque
        translúcido del diseño) y, según la especificación de Filter Effects,
        un `backdrop-filter` distinto de `none` convierte al elemento en
        bloque contenedor de TODOS sus descendientes posicionados, incluidos
        los `position: fixed`. Sin el portal, el `inset-0` del panel se
        resuelve contra la caja del encabezado —390×55px— y el menú se
        renderiza recortado dentro de la barra en lugar de ocupar la
        pantalla. Es el mismo efecto colateral que provocan `transform`,
        `filter` y `perspective`, y no se arregla con z-index.
      */}
      {abierto && montado && createPortal(
        <div
          id="menu-movil-panel"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-superficie-alta px-[18px] pb-7 pt-3.5 lg:hidden"
        >
          <div className="mb-[22px] flex items-center justify-between">
            <span className="font-titulos text-[19px] font-semibold text-texto">Menú</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-borde bg-superficie text-texto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca"
              aria-label="Cerrar menú"
              onClick={() => setAbierto(false)}
            >
              <IconoCerrar tamano={20} />
            </button>
          </div>

          <nav aria-label="Principal (móvil)" className="flex flex-col gap-0.5">
            {ENLACES_PANEL.map(({ href, etiqueta }, indice) => (
              <Link
                key={href}
                href={href}
                aria-current={esActivo(href) ? 'page' : undefined}
                onClick={() => setAbierto(false)}
                className={`py-[13px] font-titulos text-2xl font-medium ${
                  // Filete entre filas, salvo la última: el separador
                  // agrupa, y bajo el último elemento no hay nada que
                  // separar — sería una línea suelta antes del CTA.
                  indice < ENLACES_PANEL.length - 1 ? 'border-b border-borde-suave' : ''
                } ${esActivo(href) ? 'text-marca' : 'text-texto'}`}
              >
                {etiqueta}
              </Link>
            ))}
          </nav>

          {/* `mt-auto` empuja el bloque de contacto al fondo del panel:
              queda donde alcanza el pulgar aunque la lista sea corta. */}
          <div className="mt-auto flex flex-col gap-2.5 pt-[26px]">
            <a
              href={hrefWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[52px] items-center justify-center gap-[9px] rounded-xl bg-secundario text-[17px] font-semibold text-claro"
            >
              <IconoWhatsapp tamano={20} />
              Escríbenos por WhatsApp
            </a>
            <a
              href={hrefTelefono}
              onClick={() => setAbierto(false)}
              className="text-center text-[15px] text-texto-tenue"
            >
              o llámanos: {telefono}
            </a>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
