/**
 * Ficha de producto (ARCHITECTURE.md §4, ruta `/productos/[slug]/`; Bloque
 * 8 de PHASE_1_PLAN.md, tareas 8.2 y 8.4).
 *
 * `generateStaticParams` desde `obtenerSlugsProductos()` (ya filtrado por
 * `borrador`, tarea 3.3) — genera exactamente las rutas publicables; ningún
 * slug en borrador llega a tener página en un build de producción.
 *
 * `params` es una promesa (Next.js 15, App Router: firma de página
 * dinámica) — se resuelve antes de buscar el producto, tanto en
 * `generateMetadata` como en el componente de página.
 *
 * JSON-LD de `Product` (tarea 8.4, `lib/seo/jsonld.ts`): igual que
 * `Organization` en `app/layout.tsx` (Bloque 5), es un objeto plano que
 * esta página serializa con `JSON.stringify` dentro de un
 * `<script type="application/ld+json">`.
 *
 * Metadata (Bloque 11, tarea 11.1): `construirMetadata` recibe
 * `producto.imagenes[0]` como `imagen` de Open Graph — el esquema exige
 * mínimo una imagen (`productoSchema`, tarea 3.3), así que siempre hay una
 * de la que partir, mismo supuesto que ya usa `urlImagenProducto` en
 * `lib/seo/jsonld.ts` para `Product.image`.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contenedor from '@/components/ui/Contenedor';
import Titulo from '@/components/ui/Titulo';
import Visor from '@/components/instalaciones/Visor';
import FichaProducto from '@/components/productos/FichaProducto';
import { obtenerProducto, obtenerSlugsProductos } from '@/lib/contenido/productos';
import { instalaciones } from '@/lib/contenido/instalaciones';
import { resumirResenasDeProducto } from '@/lib/contenido/resenas';
import { generarProductJsonLd } from '@/lib/seo/jsonld';
import { construirMetadata } from '@/lib/seo/metadata';

interface ParametrosRuta {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return obtenerSlugsProductos().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ParametrosRuta): Promise<Metadata> {
  const { slug } = await params;
  const producto = obtenerProducto(slug);
  if (!producto) return {};
  return construirMetadata({
    titulo: producto.nombre,
    descripcion: producto.tagline,
    ruta: `/productos/${producto.slug}/`,
    imagen: producto.imagenes[0],
  });
}

export default async function PaginaProducto({ params }: ParametrosRuta) {
  const { slug } = await params;
  const producto = obtenerProducto(slug);
  if (!producto) notFound();

  // `aggregateRating` del JSON-LD: solo las reseñas que nombran este equipo
  // (ver `resumirResenasDeProducto`). Se filtra acá y no dentro de
  // `lib/seo/jsonld.ts` porque ese módulo no puede importar contenido con
  // `await` de nivel superior sin arrastrarlo a todo el sitio — el porqué
  // está en el comentario de `CalificacionAgregada`.
  const valoracion = resumirResenasDeProducto(producto.slug);
  const productoJsonLd = generarProductJsonLd(producto, '/productos', valoracion);

  // Galería de instalaciones de este producto (content/instalaciones.ts,
  // filtrada por `producto === slug`). Reutiliza el mismo `Visor` con
  // lightbox de la página /instalaciones/ en vez de duplicar la retícula
  // pequeña de `FichaProducto` — esa sigue siendo solo la imagen principal +
  // unas pocas secundarias, esto es la galería completa por equipo.
  const galeriaInstalaciones = instalaciones.filter((instalacion) => instalacion.producto === producto.slug);

  return (
    <>
      <FichaProducto producto={producto} />

      {galeriaInstalaciones.length > 0 && (
        <Contenedor as="section" className="pb-16 lg:pb-24">
          <Titulo nivel={2}>Instalaciones de {producto.nombre}</Titulo>
          <p className="mt-3 max-w-2xl text-cuerpo text-texto-tenue">
            Equipos {producto.nombre} ya instalados en casas de clientes. Haz clic en cualquiera para verla
            ampliada.
          </p>
          <div className="mt-10">
            <Visor instalaciones={galeriaInstalaciones} />
          </div>
        </Contenedor>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productoJsonLd) }} />
    </>
  );
}
