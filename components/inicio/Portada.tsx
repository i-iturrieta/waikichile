/**
 * Portada — sección principal de Inicio (ARCHITECTURE.md §4, §13; Bloque 6
 * de PHASE_1_PLAN.md, tarea 6.1).
 *
 * Server component, sin JavaScript de cliente. Fotografía horizontal y
 * dos CTA: "Ver productos" (`/productos/`, todavía no
 * construido — Bloque 8, pero es el orden de construcción esperado) y
 * "Calcular mi ahorro" (`/calculadora/`, ya construido — Bloque 7).
 *
 * Ronda de revisión 01-09-2026 (primera pasada): la clienta pidió cambiar
 * la foto de portada (antes `portada-1.jpg`, un Waiki) por la que ella
 * señaló como acordada. La primera foto usada para ese reemplazo —una de
 * Chakay contra una pared amarilla— resultó ser exactamente la que la
 * clienta señaló como "la actual" a reemplazar, no la acordada (confirmado
 * por captura de pantalla que envió en la segunda pasada, coincide pixel a
 * pixel). `portada-2.jpg` se sobrescribió de nuevo con la foto correcta
 * ("verdadera foto 4 (portada definitiva)", ronda 01-09-2026 segunda
 * pasada): living con repisa de libros, sillón de cuero y leña apilada.
 * También pidió quitar "ni electrónica" del título por sentirse
 * repetitivo/grande en el celular — ver `PUNTOS_CLAVE` abajo, mismo ajuste.
 *
 * El copy es propio, no el del mockup de Claude Design (que trae datos de
 * relleno para maquetar: medidas, colores y testimonios que no existen en
 * el contenido real). Está anclado en lo que ya dice `content/paginas/
 * nosotros.md` y en las descripciones reales de los tres productos
 * (`content/productos/*.ts`): tiro natural sin electricidad es la idea que
 * comparten los tres equipos, no solo Waiki (que además puede alternar con
 * leña) — por eso el subtítulo nombra los tres sin generalizar una
 * característica que no es común a todos.
 *
 * Diseñada para funcionar sin video (ARCHITECTURE.md §13: el video actual
 * dice la marca anterior y su reemplazo está fuera de alcance de la
 * propuesta) — portada fotográfica únicamente.
 */

import Boton from '@/components/ui/Boton';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Imagen from '@/components/ui/Imagen';

// Afirmaciones universales a los tres equipos, sacadas de content/paginas/
// nosotros.md — no de una sola ficha de producto (p. ej. "alterna con leña"
// es específico de Waiki, Nahuen no lo ofrece, así que no entra aquí).
const PUNTOS_CLAVE = [
  'Tiro natural: sin electricidad',
  'Empresa familiar chilena, con soporte directo de quienes fabrican los equipos',
  'El pellet sigue siendo válido durante los episodios de restricción ambiental',
];

export default function Portada() {
  return (
    <section className="border-b border-borde bg-superficie">
      <Contenedor className="grid gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <Titulo nivel={1}>
            Calefacción a pellet, sin electricidad
          </Titulo>
          <p className="mt-6 text-destacado text-texto-tenue">
            Diseñamos y fabricamos equipos de tiro natural en Chile: Waiki se instala sobre tu
            combustión lenta, Chakay calefacciona y además cocina, y Nahuen es la opción
            minimalista para espacios más chicos. Ninguno depende de la electricidad, así que
            nunca dejan de darte calor por un corte de luz.
          </p>

          <ul className="mt-8 flex flex-col gap-2 text-cuerpo text-texto">
            {PUNTOS_CLAVE.map((punto) => (
              <li key={punto} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 text-acento">
                  ●
                </span>
                {punto}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <Boton href="/productos/" tamano="lg">
              Ver productos
            </Boton>
            <Boton href="/calculadora/" variante="secundario" tamano="lg">
              Calcular mi ahorro
            </Boton>
          </div>
        </div>

        <div className="aspect-[4/5] overflow-hidden rounded-imagen-principal shadow-brasa">
          <Imagen
            archivo="portada-2.jpg"
            alt="Equipo a pellet encendido en un living, junto a una repisa de libros, un sillón de cuero y leña apilada"
            prioridad
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </Contenedor>
    </section>
  );
}
