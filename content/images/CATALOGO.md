# Catálogo de imágenes — Waiki Chile

**Generado por `scripts/generar-marcadores.ts`. No editar a mano: si cambia la lista, se edita el arreglo `CATALOGO` en el script y se vuelve a correr `pnpm generar-marcadores`.**

Nombre definitivo de cada imagen del sitio, patrón `{seccion}-{slug}-{n}.jpg` (ARCHITECTURE.md §9). Total: **52 archivos**, de los cuales 5 quedan en disco sin referenciar en el código (`portada-1.jpg`, `producto-chakay-1.jpg`/`-2.jpg`, `instalacion-30.jpg`/`-31.jpg` — ver nota de la ronda 01-09-2026).

Todos parten como marcador de posición (fondo plano, nombre rotulado encima, generados por `scripts/generar-marcadores.ts`). Sustituir la foto real es sobrescribir el archivo con el mismo nombre en `content/images/` y recompilar — cero cambios de código (tarea 11.6 de PHASE_1_PLAN.md).

**Actualizado a mano** (no correr el generador — sobrescribiría fotos reales con marcadores en blanco):
- Segunda pasada de fotos (ver `content/instalaciones.ts`): `producto-waiki` de 5 a 4, `instalacion` de 25 a 31.
- Ronda de revisión 01-09-2026 (feedback directo de la clienta): `instalacion` de 31 a 27 (se quitaron 4 fotos del modelo de Chakay descontinuado — ver `content/instalaciones.ts`); `producto-chakay` de 2 a 4 fotos reales vigentes (`-3` a `-6`; `-1`/`-2` quedan en disco sin referenciar, del modelo descontinuado); `producto-mini-nahuen` nuevo (2 fotos); `portada-2.jpg` nuevo (reemplaza a `portada-1.jpg`, que queda sin usar en disco).

## producto-waiki (4)

- `producto-waiki-1.jpg`
- `producto-waiki-2.jpg`
- `producto-waiki-3.jpg`
- `producto-waiki-4.jpg`

## producto-chakay (4 en uso + 2 sin referenciar)

- `producto-chakay-3.jpg` … `producto-chakay-6.jpg` — modelo vigente, en uso
- `producto-chakay-1.jpg`, `producto-chakay-2.jpg` — modelo descontinuado, quedan en disco sin referenciar en `content/productos/chakay.ts`

## producto-nahuen (5)

- `producto-nahuen-1.jpg`
- `producto-nahuen-2.jpg`
- `producto-nahuen-3.jpg`
- `producto-nahuen-4.jpg`
- `producto-nahuen-5.jpg`

Nota: son marcadores/placeholders, no fotos reales — por eso `nahuen.borrador: true`. Pendiente que la clienta envíe fotos reales.

## producto-mini-nahuen (2)

- `producto-mini-nahuen-1.jpg`
- `producto-mini-nahuen-2.jpg`

## accesorio-controlador (1)

- `accesorio-controlador-1.jpg`

## accesorio-rejilla (1)

- `accesorio-rejilla-1.jpg`

## portada (1 en uso + 1 sin referenciar)

- `portada-2.jpg` — en uso
- `portada-1.jpg` — sin referenciar desde la ronda 01-09-2026

## instalacion (29 en uso + 2 sin referenciar)

- `instalacion-01.jpg` … `instalacion-29.jpg` — Waiki, en uso
- `instalacion-30.jpg`, `instalacion-31.jpg` — modelo de Chakay descontinuado, quedan en disco sin referenciar en `content/instalaciones.ts`. Chakay queda sin instalaciones reales publicadas por ahora.
