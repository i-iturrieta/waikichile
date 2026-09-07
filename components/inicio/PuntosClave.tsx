/**
 * PuntosClave — franja oscura bajo la portada (Inicio).
 *
 * Sección nueva de la ronda 05-09-2026 ("Home Movil A" de Claude Design).
 * Antes estas tres afirmaciones vivían como viñetas dentro del hero, donde
 * competían con el título y la bajada por el mismo espacio y quedaban en
 * tipografía chica sobre fotografía. Sacarlas a una banda propia de color
 * sólido resuelve dos cosas a la vez: se leen (contraste garantizado, sin
 * depender de qué hay en la foto detrás) y le dan al scroll un corte duro
 * inmediatamente después del hero, que es lo que evita que el home se sienta
 * como una sola superficie beige continua.
 *
 * Las tres afirmaciones son universales a los tres equipos, sacadas de
 * `content/paginas/nosotros.md` — no de una ficha de producto concreta.
 * "Alterna con leña", por ejemplo, es específico de Waiki y Nahuen no lo
 * ofrece, así que no entra acá.
 *
 * Viven como constante de este componente y no en `content/`: son el
 * argumento de venta de la portada (copy de una sección), no una colección
 * de contenido que la clienta edite por su cuenta. Si más adelante hay que
 * editarlas sin tocar código, el movimiento correcto es un
 * `content/paginas/inicio.md` con su esquema, no un array suelto en
 * `content/`.
 *
 * Mercado Pago: confirmado por Ignacio (05-09-2026) como medio de pago real
 * de la empresa. Aparece dos veces en el home a propósito —acá y en
 * `Contacto.tsx`— porque son dos momentos distintos de la lectura: en la
 * franja es una señal de confianza temprana ("esto se puede comprar en
 * serio"), y en contacto es información operativa de cómo se paga.
 *
 * Escritorio (cocinado): los tres puntos pasan a tres columnas y Mercado
 * Pago se va al costado derecho, separado por un filete vertical en vez del
 * horizontal del móvil. Apilados a 1280px de ancho dejarían una banda de
 * casi 300px de alto con tres líneas de texto flotando en la izquierda.
 */

import { IconoCheck, IconoTarjeta } from '@/components/ui/iconos';

const PUNTOS_CLAVE = [
  'Tiro natural: funciona sin electricidad',
  'Empresa familiar chilena: te atiende quien fabrica el equipo',
  'El pellet sigue autorizado en episodios de restricción ambiental',
];

export default function PuntosClave() {
  return (
    <section className="bg-oscuro text-claro">
      <div className="mx-auto max-w-sitio px-5 pb-[22px] pt-5 md:px-8 lg:flex lg:items-center lg:gap-10 lg:px-16 lg:py-9">
        <ul className="grid gap-[13px] lg:flex-1 lg:grid-cols-3 lg:gap-8">
          {PUNTOS_CLAVE.map((punto) => (
            <li key={punto} className="flex items-start gap-[11px] text-[15.5px] leading-[1.45]">
              {/* `shrink-0` + `mt-0.5`: sin el primero el check se aplasta
                  cuando el texto ocupa dos líneas; sin el segundo queda
                  alineado al alto de caja y se ve alto respecto de la
                  primera línea de texto. */}
              <IconoCheck tamano={19} className="mt-0.5 shrink-0 text-ambar" />
              <span>{punto}</span>
            </li>
          ))}
        </ul>

        <div className="mt-[18px] flex items-center gap-[11px] border-t border-claro/15 pt-4 lg:mt-0 lg:max-w-[19rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <span className="inline-flex shrink-0 items-center gap-[7px] rounded-lg bg-claro px-[11px] py-[7px] text-[13.5px] font-bold tracking-[-0.01em] text-pago">
            <IconoTarjeta tamano={15} />
            Mercado Pago
          </span>
          <span className="text-caption leading-[1.4] text-claro/85">
            Aceptamos pagos con Mercado Pago
          </span>
        </div>
      </div>
    </section>
  );
}
