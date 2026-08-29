import type { Metadata } from "next";
import { Bitter, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Encabezado from "@/components/layout/Encabezado";
import Pie from "@/components/layout/Pie";
import BotonWhatsapp from "@/components/layout/BotonWhatsapp";
import { SITE_URL, generarOrganizationJsonLd } from "@/lib/seo/jsonld";

// Dirección visual "1a — Hogar y leña" (bloque 4, ARCHITECTURE §13):
// Bitter (serif) para encabezados, Archivo (sans) para cuerpo. Pesos
// 400/500/600/700 en ambas — son los que aparecen en el <link> del
// style tile de Claude Design. Las variables CSS que generan acá
// (--font-bitter, --font-archivo) las consume el bloque @theme de
// app/globals.css, que las mapea a los nombres de rol --font-titulos
// y --font-cuerpo.
const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata real de la empresa (tarea 5.4: "corrígelo con algo real de la
// empresa sin inventar SEO detallado, que es tarea del bloque 11"). El
// título/descripción salen del texto ya escrito para `content/paginas/
// nosotros.md` (tarea 3b.7) — nada nuevo se inventa acá. `generateMetadata`
// por ruta, canónicas absolutas y Open Graph detallado se agregan en el
// Bloque 11 (ARCHITECTURE.md §9) vía `lib/seo/metadata.ts`.
export const metadata: Metadata = {
  // Base para resolver a absolutas las URLs relativas de imagen que emite
  // Next (Bloque 11, tarea 11.1). En concreto, es lo que necesita la
  // convención de archivo `app/opengraph-image.jpg` (tarea 11.2) para que
  // el `<meta property="og:image">` que Next genera automáticamente en toda
  // página que no defina su propia imagen sea una URL absoluta y no una
  // ruta relativa que un validador de redes sociales no puede resolver.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Waiki Chile — Calefacción a pellet",
    template: "%s | Waiki Chile",
  },
  description:
    "Waiki Chile diseña y fabrica equipos para calefaccionar con pellet: Waiki, Chakay y Nahuen. Tiro natural, sin electricidad ni electrónica.",
};

/**
 * Cloudflare Web Analytics (ARCHITECTURE.md §9 "Analítica": "Un <script> en
 * el layout, gratis, sin cookies... Ya está en la cuenta de Cloudflare que
 * se usa para todo lo demás"; tarea 5.4).
 *
 * El token del beacon (`data-cf-beacon`) se obtiene desde el panel de
 * Cloudflare al activar Web Analytics para el dominio — parte de la
 * configuración de cuenta de los Bloques 11/12, no de este bloque. En vez
 * de dejar el <script> comentado (código muerto que alguien tiene que
 * acordarse de descomentar más adelante), se condiciona a una variable de
 * entorno pública que activa el script sin tocar código el día que el
 * token exista: sin la variable, no se renderiza nada, ni en desarrollo.
 *
 * `NEXT_PUBLIC_CF_BEACON_TOKEN` **no está** en la tabla "Variables de
 * entorno" de PHASE_1_PLAN.md — se introduce aquí porque la tarea 5.4 pide
 * dejar el punto de inserción listo y no había ninguna ya reservada para
 * esto. Falta agregarla a esa tabla cuando se confirme el nombre definitivo.
 */
const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generarOrganizationJsonLd();

  return (
    <html lang="es-CL">
      <body
        className={`${bitter.variable} ${archivo.variable} antialiased`}
      >
        {/* Enlace de salto (ARCHITECTURE.md §9 "Accesibilidad"; tarea 5.4).
            Va primero en el DOM, antes del encabezado, para ser el primer
            elemento enfocable con Tab. Oculto salvo con foco de teclado. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-boton focus:bg-marca focus:px-4 focus:py-2 focus:text-superficie"
        >
          Saltar al contenido
        </a>

        <Encabezado />
        <main id="contenido">{children}</main>
        <Pie />
        <BotonWhatsapp />

        {/* JSON-LD de Organization (ARCHITECTURE.md §9). Patrón recomendado
            por Next.js para datos estructurados en un server component: un
            <script type="application/ld+json"> plano, sin next/script. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {CF_BEACON_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
