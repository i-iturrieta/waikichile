/**
 * `FichaProducto` — ficha completa de un producto o accesorio
 * (ARCHITECTURE.md §3, tabla `Producto`/`Accesorio`; Bloque 8 de
 * PHASE_1_PLAN.md, tareas 8.2 y 8.3).
 *
 * Reutilizada para accesorios en vez de una `FichaAccesorio` aparte: la
 * fricción real entre `Producto` y `Accesorio` son sus dos campos extra
 * (`esRepuesto`, `vidaUtil`), que no existen en `Producto`. Se resuelve con
 * dos props opcionales (`esRepuesto`, `vidaUtil`) en vez de tipar `producto`
 * como `Producto | Accesorio` — así el componente sigue sin saber qué es un
 * "accesorio", solo que opcionalmente le pasan dos datos más, y
 * `app/productos/[slug]/page.tsx` no tiene que pasar nada nuevo. La sección
 * que esos dos props activan solo aparece cuando vienen definidos (ver
 * `app/accesorios/[slug]/page.tsx`).
 *
 * Mecanismo de omisión (ARCHITECTURE.md §3: "Las secciones cuyo campo es
 * `null` o array vacío se omiten enteras, no se muestran vacías o con
 * '—'"): cada sección de abajo es un `{condición && <section>...}` de React
 * — cuando la condición es `false`/`null`/`[].length === 0`, React no
 * renderiza nada ahí, ni el `<section>`, ni un título, ni un guion. Es la
 * misma técnica que ya usan `LineasProducto`/`UltimasEntradas`/`Resenas`
 * del Bloque 6 para colecciones vacías, aplicada aquí a campos individuales
 * de un solo producto.
 *
 * La especificación de "Garantía" (cuando existe dentro de
 * `especificaciones`) se separa de la tabla general y se muestra en su
 * propio recuadro destacado, no como una fila más — así lo pide la tarea
 * 8.3 para la rejilla del quemador ("no lo dejes implícito en una
 * especificación entre otras, dale visibilidad") y de paso resuelve la
 * ficha de la rejilla sin necesitar lógica específica de accesorio: es el
 * mismo mecanismo genérico para cualquier producto que traiga una fila
 * "Garantía" en sus especificaciones (hoy también aplica a Chakay, en
 * sentido positivo).
 *
 * Galería (rehecho mobile-first, ronda 01-09-2026): la clienta pidió
 * explícitamente que la galería fuera más protagonista en el celular en vez
 * de competir con el precio por espacio (video 6 de la ronda de cambios) —
 * "sería más amigable que en vez de consultar precio vayan imágenes". En
 * mobile, todas las fotos (principal + resto) viven en una sola tira
 * horizontal con scroll-snap nativo (sin JavaScript: `overflow-x-auto
 * snap-x`), cada una casi a ancho completo con un asomo de la siguiente
 * para señalar que hay más — eso es "el banco de fotos" que pidió, no una
 * sola foto grande con miniaturas chicas al lado. Desde `lg:` la misma
 * lista de imágenes se reacomoda a la grilla original (imagen principal
 * grande + miniaturas debajo) con las clases `lg:` — mismos elementos, sin
 * duplicar el DOM, solo cambia `flex`+scroll por `grid`.
 *
 * Ronda 09-09-2026: ese layout se movió sin tocarlo a
 * `components/productos/GaleriaProducto.tsx`, porque las imágenes pasaron a
 * ser ampliables al hacer clic (pedido de Ignacio) y eso pide estado de
 * cliente. Esta ficha sigue siendo componente de servidor: la única isla es
 * la galería. El diálogo ampliado es `components/ui/VisorAmpliado.tsx`, el
 * mismo que usa la galería de Instalaciones desde el Bloque 9.
 */

import Link from 'next/link';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Boton from '@/components/ui/Boton';
import GaleriaProducto from './GaleriaProducto';
import Tarjeta from '@/components/ui/Tarjeta';
import type { Producto } from '@/lib/contenido/esquemas';
import { obtenerAccesorio } from '@/lib/contenido/accesorios';
import { formatearPrecio } from './formatearPrecio';
import CondicionesCompra from './CondicionesCompra';
import KitCanos from './KitCanos';

export interface FichaProductoProps {
  producto: Producto;
  /** Solo accesorios (`Accesorio.vidaUtil`, ARCHITECTURE.md §3). Se omite
   * (queda `undefined`) en fichas de producto normales. */
  vidaUtil?: string | null;
  /** Solo accesorios (`Accesorio.esRepuesto`). */
  esRepuesto?: boolean;
}

const ETIQUETA_GARANTIA = 'Garantía';
// Ítem de `noIncluye` que activa el recuadro del kit (`content/kit-canos.ts`).
const ITEM_KIT_CANOS = 'Kit de caños';

export default function FichaProducto({ producto, vidaUtil, esRepuesto }: FichaProductoProps) {
  const especificacionGarantia = producto.especificaciones.find((e) => e.etiqueta === ETIQUETA_GARANTIA);
  const especificacionesResto = producto.especificaciones.filter((e) => e.etiqueta !== ETIQUETA_GARANTIA);
  const parrafosDescripcion = producto.descripcion.split('\n\n');
  const mostrarSeccionRepuesto = esRepuesto !== undefined && (esRepuesto || vidaUtil != null);

  return (
    <Contenedor as="article" className="py-10 sm:py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Galería — ver comentario de cabecera. El layout (tira con
            scroll-snap en móvil, grilla desde `lg:`) se movió tal cual a
            `GaleriaProducto` en la ronda del 09-09-2026, cuando las imágenes
            pasaron a ser ampliables: eso obliga a estado de cliente, y esta
            ficha sigue siendo componente de servidor. El diálogo es el mismo
            `VisorAmpliado` que usa Instalaciones. */}
        <GaleriaProducto imagenes={producto.imagenes} nombre={producto.nombre} />

        <div className="flex flex-col gap-8">
          <div>
            <Titulo nivel={1}>{producto.nombre}</Titulo>
            <p className="mt-2 text-destacado text-texto-tenue">{producto.tagline}</p>

            {producto.superficieRecomendada && (
              <p className="mt-3 text-cuerpo text-texto-tenue">
                Recomendado para {producto.superficieRecomendada.min}–{producto.superficieRecomendada.max} m²
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-borde pt-6">
              <span className="inline-block rounded-full bg-acento/25 px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-secundario">
                {formatearPrecio(producto.precio)}
              </span>
              <Boton href="/contacto/" variante="primario">
                Consultar por este equipo
              </Boton>
            </div>
          </div>

          {/* Aviso del controlador de presión (ARCHITECTURE.md §6: "el
              controlador de presión condiciona la compra — obligatorio
              sobre 3,5 m de cañería"; tarea 8.2). Solo Waiki lo dispara hoy.
              El enlace a su ficha es condicional (Bloque 11, tarea 11.6):
              mientras la ficha del controlador esté en `borrador: true` su
              página no se genera, así que un `<Link>` fijo apuntaría a un
              404. `obtenerAccesorio` ya devuelve `undefined` para contenido
              en borrador (filtrado en el cargador), así que esto se resuelve
              solo cuando la ficha vuelva a publicarse.

              Apunta al AUTOMÁTICO (08-09-2026). Desde que se descubrió que
              hay dos controladores hay que elegir uno, y es este: es el que
              cotizaba la página `/regulador-de-tiro/` del sitio anterior —
              de donde sale textualmente la regla de los 3,5 metros que este
              mismo aviso repite— y el que el dueño valorizó en $85.000. El
              manual no tiene documentada ninguna condición de uso; lo único
              que se sabe de él es que la Mini Nahuen lo trae incluido. */}
          {producto.requiereControlador && (
            <div className="rounded-r-[10px] border-l-[3px] border-marca bg-marca/10 p-4">
              <p className="text-cuerpo text-texto">
                <strong>Con cañería de salida sobre 3,5 metros</strong>, este equipo necesita un{' '}
                {obtenerAccesorio('controlador-de-presion-automatico') ? (
                  <Link
                    href="/accesorios/controlador-de-presion-automatico/"
                    className="font-semibold text-marca underline-offset-4 hover:underline"
                  >
                    controlador de presión
                  </Link>
                ) : (
                  <strong>controlador de presión</strong>
                )}{' '}
                para mantener estable el consumo de pellet. Cada tira de cañería mide 1 metro, así que basta
                con contarlas.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {parrafosDescripcion.map((parrafo, indice) => (
              <p key={indice} className="text-cuerpo text-texto-tenue">
                {parrafo}
              </p>
            ))}
          </div>

          {/* Garantía, destacada aparte de la tabla general — ver el
              comentario de cabecera. Omitida entera si ninguna
              especificación trae la etiqueta "Garantía" (p. ej. el
              controlador de presión). */}
          {especificacionGarantia && (
            <div className="rounded-r-[10px] border-l-[3px] border-acento bg-acento/10 p-4">
              <Titulo nivel={4} className="text-texto">
                Garantía
              </Titulo>
              <p className="mt-1 text-cuerpo text-texto">{especificacionGarantia.valor}</p>
            </div>
          )}

          {/* Repuesto / vida útil — solo accesorios (`esRepuesto`/`vidaUtil`
              vienen `undefined` en fichas de producto normales). */}
          {mostrarSeccionRepuesto && (
            <Tarjeta className="p-5">
              {esRepuesto && <p className="text-cuerpo text-texto">Es una pieza de repuesto o consumible.</p>}
              {vidaUtil != null && (
                <p className={esRepuesto ? 'mt-1 text-cuerpo text-texto-tenue' : 'text-cuerpo text-texto-tenue'}>
                  Vida útil estimada: {vidaUtil}
                </p>
              )}
            </Tarjeta>
          )}

          {especificacionesResto.length > 0 && (
            <Tarjeta className="p-6">
              <Titulo nivel={3}>Especificaciones técnicas</Titulo>
              <table className="mt-4 w-full border-collapse text-cuerpo">
                <caption className="sr-only">Especificaciones técnicas de {producto.nombre}</caption>
                <tbody>
                  {especificacionesResto.map((especificacion) => (
                    <tr key={especificacion.etiqueta} className="border-b border-borde">
                      <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-texto-tenue">
                        {especificacion.etiqueta}
                      </th>
                      <td className="py-3 text-texto">{especificacion.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tarjeta>
          )}

          {/* `medidas` es nullable a propósito (ARCHITECTURE.md §3): hoy solo
              Chakay la tiene completa. `null` omite la tabla entera — sin
              esta tabla, sin fila vacía, sin "null" visible (Waiki y
              Nahuen). */}
          {producto.medidas && (
            <Tarjeta className="p-6">
              <Titulo nivel={3}>Medidas</Titulo>
              <table className="mt-4 w-full border-collapse text-cuerpo">
                <caption className="sr-only">Medidas de {producto.nombre}</caption>
                <tbody>
                  <tr className="border-b border-borde">
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-texto-tenue">
                      Ancho
                    </th>
                    <td className="py-3 text-texto">{producto.medidas.ancho} cm</td>
                  </tr>
                  <tr className="border-b border-borde">
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-texto-tenue">
                      Alto
                    </th>
                    <td className="py-3 text-texto">{producto.medidas.alto} cm</td>
                  </tr>
                  <tr className="border-b border-borde">
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-texto-tenue">
                      Fondo
                    </th>
                    <td className="py-3 text-texto">{producto.medidas.fondo} cm</td>
                  </tr>
                  <tr className="border-b border-borde">
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-medium text-texto-tenue">
                      Peso
                    </th>
                    <td className="py-3 text-texto">{producto.medidas.peso} kg</td>
                  </tr>
                </tbody>
              </table>
            </Tarjeta>
          )}

          {producto.colores.length > 0 && (
            <div>
              <Titulo nivel={3}>Colores</Titulo>
              <ul className="mt-3 flex flex-wrap gap-2">
                {producto.colores.map((color) => (
                  <li
                    key={color}
                    className="rounded-full border border-borde bg-superficie-alta px-4 py-1.5 text-caption text-texto"
                  >
                    {color}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {producto.plazoEntrega && (
            <div>
              <Titulo nivel={3}>Plazo de entrega</Titulo>
              <p className="mt-3 text-cuerpo text-texto-tenue">{producto.plazoEntrega}</p>
            </div>
          )}

          {(producto.incluye.length > 0 || producto.noIncluye.length > 0) && (
            <div className="grid gap-8 sm:grid-cols-2">
              {producto.incluye.length > 0 && (
                <div>
                  <Titulo nivel={3}>Incluye</Titulo>
                  <ul className="mt-3 flex flex-col gap-2">
                    {producto.incluye.map((item) => (
                      <li key={item} className="flex gap-2 text-cuerpo text-texto-tenue">
                        <span aria-hidden="true" className="text-secundario">
                          +
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {producto.noIncluye.length > 0 && (
                <div>
                  <Titulo nivel={3}>No incluye</Titulo>
                  <ul className="mt-3 flex flex-col gap-2">
                    {producto.noIncluye.map((item) => (
                      <li key={item} className="flex gap-2 text-cuerpo text-texto-tenue">
                        <span aria-hidden="true" className="text-texto-tenue">
                          −
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {producto.noIncluye.includes(ITEM_KIT_CANOS) && <KitCanos />}

          {producto.usaCondicionesEstandar && <CondicionesCompra />}
        </div>
      </div>
    </Contenedor>
  );
}
