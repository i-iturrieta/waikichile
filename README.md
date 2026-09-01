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
pnpm test             # Vitest — lib/calculadora/ y validación de contenido
pnpm reporte           # lista contenido en borrador / campos pendientes
pnpm build             # build de producción completo (export estático a out/)
```

`pnpm build` corre automáticamente `scripts/procesar-imagenes.ts` (genera las variantes AVIF/WebP de `content/images/` en `public/img/`) y `scripts/reporte-contenido.ts` antes de compilar (hook `prebuild`).

## Estructura de contenido

Todo el contenido editable vive en `content/`, separado del código:

| Ruta | Qué es |
|---|---|
| `content/productos/*.ts` | Waiki, Chakay, Nahuen |
| `content/accesorios/*.ts` | Controlador de presión, rejilla del quemador |
| `content/instalaciones.ts` | Galería de instalaciones reales |
| `content/resenas.ts` | Reseñas de clientes |
| `content/faq.ts` | Preguntas frecuentes |
| `content/blog/*.md` | Artículos del blog |
| `content/paginas/*.md` | Nosotros, Garantía |
| `content/empresa.ts` | Teléfono, correo, redes sociales |
| `content/calculadora/parametros.ts` | Constantes de la calculadora leña vs. pellet |
| `content/images/` | Fotografías originales (el pipeline genera las variantes; no tocar `public/img/` a mano) |

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

```bash
npx wrangler login    # una vez
SITIO_PRODUCCION=true NEXT_PUBLIC_SITE_URL=https://waikichile.cl pnpm build
npx wrangler deploy
```
