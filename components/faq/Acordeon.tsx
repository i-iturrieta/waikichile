/**
 * `Acordeon` — preguntas frecuentes agrupadas por `TemaFAQ`
 * (ARCHITECTURE.md §2, tabla de islas de cliente: "Acordeón de FAQ — Abrir y
 * cerrar"; Bloque 9 de PHASE_1_PLAN.md, tarea 9.4).
 *
 * **No es una isla de cliente pese a lo que dice esa tabla de ARCHITECTURE.md
 * §2.** Se implementa con `<details>`/`<summary>`, que es interactivo de
 * forma nativa en el navegador: abrir y cerrar no necesita `useState` ni
 * `"use client"`, así que este componente es un server component normal, sin
 * JavaScript de cliente en absoluto — mejor que lo que esa tabla anticipaba,
 * no una desviación de la tarea 9.4, que pide explícitamente `<details>`/
 * `<summary>` "accesible sin JavaScript". Con JavaScript desactivado en el
 * navegador, cada `<summary>` sigue abriendo y cerrando su `<details>`: es
 * comportamiento del navegador, no del framework.
 *
 * Orden de los grupos: el orden de declaración de `TEMA_FAQ`
 * (`lib/contenido/esquemas.ts`), no el orden en que aparecen las preguntas
 * en `content/faq.ts`. Dentro de cada grupo, las preguntas se ordenan por
 * `orden` (ARCHITECTURE.md §3).
 */

import { TEMA_FAQ, type PreguntaFrecuente, type TemaFAQ } from '@/lib/contenido/esquemas';
import Titulo from '@/components/ui/Titulo';

const ETIQUETAS_TEMA: Record<TemaFAQ, string> = {
  uso: 'Uso',
  consumo: 'Consumo',
  mantencion: 'Mantención',
  garantia: 'Garantía',
  instalacion: 'Instalación',
  normativa: 'Normativa',
};

export interface AcordeonProps {
  preguntas: PreguntaFrecuente[];
}

export default function Acordeon({ preguntas }: AcordeonProps) {
  const grupos = TEMA_FAQ.map((tema) => ({
    tema,
    preguntas: preguntas.filter((pregunta) => pregunta.tema === tema).sort((a, b) => a.orden - b.orden),
  })).filter((grupo) => grupo.preguntas.length > 0);

  if (grupos.length === 0) {
    return <p className="text-cuerpo text-texto-tenue">Todavía no hay preguntas frecuentes publicadas.</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {grupos.map((grupo) => (
        <section key={grupo.tema}>
          <Titulo nivel={2}>{ETIQUETAS_TEMA[grupo.tema]}</Titulo>
          <div className="mt-4 flex flex-col gap-3">
            {grupo.preguntas.map((pregunta) => (
              <details
                key={pregunta.id}
                className="group rounded-tarjeta border border-borde bg-superficie-alta p-5 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-cuerpo font-semibold text-texto [&::-webkit-details-marker]:hidden">
                  {pregunta.pregunta}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-h3 leading-none text-marca transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-cuerpo text-texto-tenue">{pregunta.respuesta}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
