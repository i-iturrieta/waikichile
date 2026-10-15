# Waiki Chile — instrucciones para Claude

Sitio estático (Next.js `output: 'export'`) de Waiki Chile, publicado en
Cloudflare Workers. Contexto técnico en `README.md`. Todo el contenido y
los comentarios del código van en español de Chile.

## Cómo se publica (no hay que correr wrangler a mano)

GitHub Actions (`.github/workflows/desplegar.yml`) despliega en cada push:

- **Cualquier rama que no sea `main`** → sitio de prueba:
  https://waikichile-dev.spike-workers.workers.dev
  Es el link que se le manda a la clienta para revisar.
- **`main`** → sitio principal, https://waikichile.cl

Flujo de trabajo:

1. Trabajar en una rama nueva (nunca directo en `main`), commitear y hacer
   push. A los ~3 minutos queda en el sitio de prueba. Verificar con
   `gh run list` / `gh run watch` o abriendo el link.
2. Solo cuando Ignacio diga explícitamente que la clienta aprobó: fusionar
   la rama en `main` y hacer push. Eso publica en waikichile.cl.
   **Nunca hacer push a `main` sin esa confirmación explícita.**

El sitio de prueba es uno solo: muestra la última rama que se subió.

## Antes de hacer push

- `pnpm test` y `pnpm build` (el workflow los corre igual y no despliega si
  fallan).
- Datos comerciales (precios, qué incluye cada equipo) se toman solo de lo
  que la clienta o el dueño dijeron; cuando algo es ambiguo, preguntarle a
  Ignacio en vez de suponer. Anotar la fuente en el comentario de cabecera
  del archivo de contenido, como ya hacen los de `content/`.

## Dónde está cada cosa

- `content/productos/*.ts` — fichas de equipos (precio, incluye/no incluye).
- `content/kit-canos.ts` — kit de caños que se vende aparte (Chakay, Nahuen).
- `content/accesorios/`, `content/blog/`, `content/faq.ts`, `content/resenas.ts`.
- `content/images/` — fotos originales; `CATALOGO.md` explica los nombres.
- `components/productos/FichaProducto.tsx` — la página de cada producto.
- `public/_redirects` y `public/_headers` — configuración de Cloudflare, no
  borrar (redirecciones 301 del sitio antiguo).
