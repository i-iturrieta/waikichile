/**
 * Portada — sección principal de Inicio (ARCHITECTURE.md §4, §13; Bloque 6
 * de PHASE_1_PLAN.md, tarea 6.1). Server component, sin JavaScript.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design.
 *
 * Cambio de forma: el hero deja de ser dos columnas (texto | foto en marco
 * 4:5) y pasa a fotografía a sangre con el texto encima, anclado abajo. Lo
 * que gana es jerarquía — la foto de un living con el equipo encendido dice
 * "calor en tu casa" mejor que cualquier párrafo, y recortada en una
 * tarjeta al costado quedaba compitiendo con el título en vez de
 * sosteniéndolo.
 *
 * El degradado de cuatro paradas no es decoración: es lo que hace legible
 * texto blanco sobre una fotografía que no controlamos. Va de 0.94 de
 * opacidad abajo (donde está todo el texto) a 0.28 al 66% de la altura
 * (donde se ve la foto limpia) y vuelve a subir a 0.35 arriba, para que la
 * barra del encabezado —translúcida— tenga algo oscuro detrás y no se
 * pierda contra un techo claro. Sin esa última parada, el logo desaparece
 * en las fotos de interiores luminosos.
 *
 * `isolation: isolate` (`isolate` en Tailwind) crea un contexto de apilado
 * propio para que los `-z-10`/`-z-20` de la foto y el degradado se queden
 * dentro de la sección en vez de irse detrás del fondo de la página.
 *
 * `object-position: 58% 50%` está tomado del mockup: centra el encuadre en
 * el equipo encendido, que en `portada-2.jpg` no está al centro de la
 * imagen sino desplazado a la derecha. Con el `50% 50%` por defecto, en
 * pantallas angostas el recorte lo dejaba fuera de cuadro.
 *
 * Escritorio (cocinado — el mockup solo cubre móvil): la sección crece a
 * `min-h-[88vh]` con tope de 900px, el texto se acota a ~46rem para que el
 * título no cruce 1280px de ancho en una sola línea, y los dos botones
 * pasan de apilados a fila. El alto se limita con `max-h` porque en un
 * monitor vertical u ultraancho un `88vh` suelto convierte el hero en una
 * pantalla de bienvenida que hay que superar antes de ver el sitio.
 *
 * La foto es la que la clienta señaló como definitiva (ronda 01-09-2026,
 * segunda pasada): living con repisa de libros, sillón de cuero y leña
 * apilada. `prioridad` porque es el LCP de la página.
 *
 * El copy es el del mockup, que a su vez está anclado en lo que ya dice
 * `content/paginas/nosotros.md`: el tiro natural sin electricidad es la
 * idea que comparten todos los equipos. No se promete ninguna cifra de
 * ahorro acá — ver el comentario de `AccesoCalculadora.tsx` para por qué.
 *
 * El número del primer botón sale de `productos` en vez de estar escrito a
 * mano. El mockup dice "Ver los 3 equipos" porque tres eran los publicados
 * cuando se dibujó; al publicarse Nahuen (05-09-2026) pasaron a cuatro, y un
 * literal habría dejado el botón mintiendo sobre el catálogo hasta que
 * alguien lo notara. Derivarlo cuesta una línea y no vuelve a pasar.
 */

import Link from 'next/link';
import Imagen from '@/components/ui/Imagen';
import { productos } from '@/lib/contenido/productos';

export default function Portada() {
  const cantidadEquipos = productos.length;

  return (
    <section className="relative isolate flex min-h-[600px] flex-col justify-end px-5 pb-7 pt-24 text-claro md:px-8 lg:min-h-[88vh] lg:max-h-[900px] lg:px-16 lg:pb-16">
      <div className="absolute inset-0 -z-20">
        <Imagen
          archivo="portada-2.jpg"
          alt="Estufa a pellet encendida en un living con sillón de cuero y leña apilada"
          prioridad
          sizes="100vw"
          className="h-full w-full object-cover [object-position:58%_50%]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(18%_0.03_40/0.94)_0%,oklch(18%_0.03_40/0.78)_34%,oklch(18%_0.03_40/0.28)_66%,oklch(18%_0.03_40/0.35)_100%)]" />

      <div className="mx-auto w-full max-w-sitio">
        <span className="inline-flex items-center gap-[7px] rounded-full border border-claro/35 px-3.5 py-[7px] text-[12.5px] font-semibold uppercase tracking-[0.07em]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ambar" />
          Fabricación chilena
        </span>

        <h1 className="mt-4 max-w-[18ch] text-pretty font-titulos text-[clamp(2.1rem,9.2vw,2.85rem)] font-semibold leading-[1.07] tracking-[-0.02em] lg:max-w-[16ch] lg:text-[clamp(2.85rem,4.4vw,4.25rem)]">
          Calefacción a pellet que no depende de la luz
        </h1>

        <p className="mt-3.5 max-w-[34em] text-[16.5px] leading-[1.55] text-claro/90 lg:mt-5 lg:max-w-[46ch] lg:text-destacado">
          Equipos de tiro natural fabricados en Chile. Si se corta la electricidad, tu casa sigue
          caliente.
        </p>

        <div className="mt-[22px] flex flex-col gap-2.5 sm:flex-row sm:gap-3.5 lg:mt-8">
          <Link
            href="/productos/"
            className="flex min-h-[54px] items-center justify-center rounded-xl bg-marca px-7 text-[17px] font-semibold text-claro shadow-[0_16px_30px_-12px_oklch(18%_0.03_40/0.6)] transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claro"
          >
            Ver los {cantidadEquipos} equipos
          </Link>
          {/* Contorno translúcido con desenfoque en vez de un segundo relleno
              sólido: sobre fotografía, dos botones opacos se leen como dos
              acciones del mismo peso y ninguna gana. */}
          <Link
            href="/calculadora/"
            className="flex min-h-[54px] items-center justify-center rounded-xl border border-claro/50 bg-claro/10 px-7 text-[17px] font-semibold backdrop-blur-[6px] transition-colors hover:bg-claro/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-claro"
          >
            Calcular mi ahorro
          </Link>
        </div>
      </div>
    </section>
  );
}
