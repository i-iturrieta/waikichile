# Waiki Chile — waikichile.cl

Sitio estático de Waiki Chile (equipos de calefacción a pellet de tiro natural), construido con Next.js 15 (`output: 'export'`) y desplegado como assets estáticos en Cloudflare Workers — sin backend, sin formulario de contacto (contacto directo por WhatsApp/correo/teléfono). Ver `../ARCHITECTURE.md` para las decisiones de arquitectura y `../PROJECT_STATE.md` para el estado actual del sitio y las decisiones tomadas durante la construcción.

## Correr en local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Verificar antes de un cambio

```bash
npx tsc --noEmit      # tipos
pnpm test             # Vitest — 35 tests: lib/calculadora/ y validación de contenido
pnpm reporte          # lista contenido en borrador / campos pendientes
pnpm build            # build de producción completo (export estático a out/) — 29 rutas
```

> `pnpm reporte` corre con **`node`**, no con `tsx`: usa el soporte nativo de TypeScript de Node 24 y top-level await. Si lo lanzas con `npx tsx` falla al cargar la mitad de las colecciones y **te dice "nada en borrador" cuando sí lo hay**. Usa siempre el script de `package.json`.

`pnpm build` corre automáticamente `scripts/procesar-imagenes.ts` (genera las variantes AVIF/WebP de `content/images/` en `public/img/`) y `scripts/reporte-contenido.ts` antes de compilar (hook `prebuild`).

## Estructura de contenido

Todo el contenido editable vive en `content/`, separado del código:

| Ruta | Qué es |
|---|---|
| `content/productos/*.ts` | Waiki, Chakay, Nahuen, Mini Nahuen |
| `content/accesorios/*.ts` | Controlador de presión, rejilla del quemador |
| `content/instalaciones.ts` | Galería de 29 instalaciones reales |
| `content/resenas.ts` | Reseñas de clientes |
| `content/faq.ts` | Preguntas frecuentes |
| `content/blog/*.md` | Noticias: artículos propios y entrevistas de prensa |
| `content/paginas/*.md` | Nosotros, Garantía |
| `content/empresa.ts` | Teléfono, correo, redes sociales |
| `content/calculadora/parametros.ts` | Constantes de la calculadora leña vs. pellet |
| `content/images/` | Fotografías originales (el pipeline genera las variantes; no tocar `public/img/` a mano) |
| `public/medios/` | Audio y video de las entrevistas de prensa — **no pasan por el pipeline**, van tal cual |

Todo el contenido se valida con Zod en tiempo de build (`lib/contenido/esquemas.ts`) — un dato mal formado rompe el build, nunca el sitio publicado.

### El campo `borrador`

Casi todo el contenido tiene un campo `borrador: boolean`. En desarrollo (`pnpm dev`, sin `SITIO_PRODUCCION=true`) se ve igual, con `borrador: true` para poder revisarlo. En producción (`SITIO_PRODUCCION=true`, el build real) se omite por completo — no aparece la ficha, no aparece en el sitemap, la ruta no se genera. Para publicar algo que hoy está en `borrador: true`, cambia el campo a `false` en su archivo de `content/` (revisa antes que ningún dato dentro sea un placeholder — ver `PROJECT_STATE.md §3` para lo que sigue en borrador y por qué).

### Cambiar un precio

Los precios de producto son del tipo `{ tipo: 'consultar' }` o `{ tipo: 'fijo', monto, incluyeIva }` — edita el campo `precio` en `content/productos/<slug>.ts` o `content/accesorios/<slug>.ts`.

### Agregar una entrada de blog

Crea un archivo `.md` nuevo en `content/blog/` con el mismo frontmatter que uno existente (`titulo`, `fecha`, `resumen`, `slug`, `publicado`). El slug del archivo define la URL.

### Actualizar la calculadora

Las constantes físicas (poder calorífico, rendimiento) y los precios por zona viven en `content/calculadora/parametros.ts`, validados contra `parametrosCalculadoraSchema`.

## Variables de entorno

Ver `.env.example` para la lista completa. Resumen:

- `NEXT_PUBLIC_SITE_URL`: canónicas absolutas y `app/sitemap.ts`.
- `SITIO_PRODUCCION=true` solo en el despliegue de `main`: gobierna el filtro de `borrador` y `robots.ts`.

## Despliegue

Sitio 100% estático, sin backend: `wrangler.jsonc` publica el export de `out/` como assets de Cloudflare Workers (sin Worker script). La página de contacto no tiene formulario — es contacto directo por WhatsApp, correo y teléfono (`components/contacto/ContactoDirecto.tsx`).

**Estado al 07-09-2026:** ya se desplegó con éxito una vez y **hoy está pausado a pedido de la clienta** mientras se hacen cambios. El dominio `waikichile.cl` todavía no apunta acá: eso depende del Bloque 0 (`PROJECT_STATE.md §6`).

Dos archivos de `public/` gobiernan el borde y **no son código, son configuración de Cloudflare**: `_redirects` (30 redirecciones 301 desde las URLs de WordPress — perderlas es perder posicionamiento) y `_headers` (caché y cabeceras de seguridad, incluida la CSP que habilita `media-src` para las entrevistas). Cloudflare tiene un **techo de 25 MiB por archivo**: cualquier medio nuevo en `public/medios/` tiene que quedar por debajo.

```bash
npx wrangler login    # una vez
SITIO_PRODUCCION=true NEXT_PUBLIC_SITE_URL=https://waikichile.cl pnpm build
npx wrangler deploy
```
