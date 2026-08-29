/**
 * AccesoCalculadora — sección de Inicio (ARCHITECTURE.md §4, §5; Bloque 6
 * de PHASE_1_PLAN.md, tarea 6.2).
 *
 * Server component. Bloque promocional que invita a usar la calculadora
 * (`/calculadora/`, Bloque 7, ya construida) — no reimplementa ningún
 * cálculo ni cifra propia acá.
 *
 * Deliberadamente sin porcentaje de ahorro en el copy: ARCHITECTURE.md §5
 * es explícito en que el resultado depende de la zona y del tipo de leña
 * (contra leña seca certificada el pellet no gana en ninguna zona, y en la
 * zona austral pierde incluso contra leña húmeda), y su regla no negociable
 * es "la interfaz nunca presenta un ahorro negativo como ahorro". Poner un
 * "~50% de ahorro" genérico en la portada violaría esa honestidad para los
 * casos donde no aplica — el resultado real solo lo entrega la calculadora
 * misma, con el desglose y las excepciones ya resueltas ahí.
 */

import Boton from '@/components/ui/Boton';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';

export default function AccesoCalculadora() {
  return (
    <section className="py-16 lg:py-20">
      <Contenedor>
        <div className="flex flex-col items-start gap-6 rounded-imagen-principal border border-borde bg-superficie-alta p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <Titulo nivel={2}>¿Cuánto puedes ahorrar cambiándote a pellet?</Titulo>
            <p className="mt-3 text-cuerpo text-texto-tenue">
              Compara el costo de calefaccionar con pellet Waiki contra la leña, para la misma
              cantidad de calor, según tu superficie y tu zona. Un cálculo directo, sin dejar tus
              datos.
            </p>
          </div>
          <Boton href="/calculadora/" tamano="lg" className="shrink-0">
            Calcular mi ahorro
          </Boton>
        </div>
      </Contenedor>
    </section>
  );
}
