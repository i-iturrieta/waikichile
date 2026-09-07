/**
 * Inicio (ARCHITECTURE.md §4: "Inicio → `app/page.tsx` · estático"; Bloque
 * 6 de PHASE_1_PLAN.md, tarea 6.3). Reemplaza el boilerplate de
 * `create-next-app` que quedó desde el Bloque 1.
 *
 * Server component, completamente estático. Ninguna sección trae estado ni
 * lógica propia — cada una decide sola si tiene algo que mostrar
 * (`LineasProducto`, `Resenas` y `UltimasEntradas` devuelven `null` si su
 * colección está vacía), así que esta página no necesita condicionales.
 *
 * Ronda 05-09-2026 — "Home Movil A" de Claude Design. El orden pasa a ser
 * el del mockup, con dos secciones nuevas (`PuntosClave`, `Contacto`) y un
 * añadido fuera de él (`UltimasEntradas`, conservada por decisión de
 * Ignacio pese a que el diseño saca el blog del home):
 *
 *   Portada          — hero fotográfico, promesa y dos CTA
 *   PuntosClave      — franja oscura: por qué este equipo y no otro
 *   LineasProducto   — qué se vende (el catálogo de equipos)
 *   AccesoCalculadora— cuánto cuesta / cuánto ahorro
 *   Resenas          — prueba social
 *   UltimasEntradas  — profundizar, para quien todavía no decide
 *   Contacto         — cierre: escribir o llamar
 *
 * La secuencia es deliberada y es la que sigue el mockup: argumento →
 * producto → dinero → prueba → cierre. Las reseñas van *después* de la
 * calculadora y no antes porque la prueba social pesa más cuando ya se sabe
 * qué se compra y cuánto cuesta, no cuando todavía no hay nada que validar.
 * `UltimasEntradas` se intercala antes del cierre, nunca al final: la
 * página tiene que terminar en la invitación a escribir y no en tres
 * enlaces que se llevan al visitante a leer otra cosa.
 *
 * `export const metadata` en vez de `generateMetadata`: Inicio no depende
 * de ningún parámetro de ruta ni de datos que cambien en build-time más
 * allá de lo que ya es estático, así que no hace falta la variante función
 * (PHASE_1_PLAN.md, tarea 6.3, segunda opción explícita). `title.absolute`
 * evita que el `template` de `app/layout.tsx` ("%s | Waiki Chile") le
 * agregue el sufijo de marca dos veces sobre un título que Inicio ya trae
 * completo.
 *
 * Canónica absoluta, Open Graph y Twitter Card (Bloque 11, tarea 11.1) se
 * arman con `construirMetadata` como cualquier otra ruta — solo que acá se
 * sobrescribe `title` después, con el spread, para conservar el
 * `title.absolute` de arriba en vez del `template` que usaría el resto del
 * sitio. `openGraph.title` sí queda con el string completo (vía `titulo`
 * más abajo): a diferencia de `<title>`, no pasa por ningún `template`, así
 * que no hay nada que evitar ahí.
 */

import type { Metadata } from 'next';
import Portada from '@/components/inicio/Portada';
import PuntosClave from '@/components/inicio/PuntosClave';
import LineasProducto from '@/components/inicio/LineasProducto';
import AccesoCalculadora from '@/components/inicio/AccesoCalculadora';
import Resenas from '@/components/inicio/Resenas';
import UltimasEntradas from '@/components/inicio/UltimasEntradas';
import Contacto from '@/components/inicio/Contacto';
import { construirMetadata } from '@/lib/seo/metadata';

const TITULO_INICIO = 'Waiki Chile — Calefacción a pellet sin electricidad';

export const metadata: Metadata = {
  ...construirMetadata({
    titulo: TITULO_INICIO,
    descripcion:
      'Waiki, Chakay, Nahuen y Mini Nahuen: equipos de tiro natural a pellet, sin electricidad ni electrónica. Compara tu ahorro frente a la leña y conoce los cuatro modelos.',
    ruta: '/',
  }),
  title: { absolute: TITULO_INICIO },
};

export default function Inicio() {
  return (
    <>
      <Portada />
      <PuntosClave />
      <LineasProducto />
      <AccesoCalculadora />
      <Resenas />
      <UltimasEntradas />
      <Contacto />
    </>
  );
}
