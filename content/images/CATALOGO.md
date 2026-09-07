# Catálogo de imágenes — Waiki Chile

**Generado por `scripts/generar-marcadores.ts`. No editar a mano: si cambia la lista, se edita el arreglo `CATALOGO` en el script y se vuelve a correr `pnpm generar-marcadores`.**

Nombre definitivo de cada imagen del sitio, patrón `{seccion}-{slug}-{n}.jpg` (ARCHITECTURE.md §9). Total: **50 archivos**, de los cuales 5 quedan en disco sin referenciar en el código (`portada-1.jpg`, `producto-chakay-1.jpg`/`-2.jpg`, `instalacion-30.jpg`/`-31.jpg` — ver nota de la ronda 01-09-2026).

Todos parten como marcador de posición (fondo plano, nombre rotulado encima, generados por `scripts/generar-marcadores.ts`). Sustituir la foto real es sobrescribir el archivo con el mismo nombre en `content/images/` y recompilar — cero cambios de código (tarea 11.6 de PHASE_1_PLAN.md).

**Actualizado a mano** (no correr el generador — sobrescribiría fotos reales con marcadores en blanco):
- Segunda pasada de fotos (ver `content/instalaciones.ts`): `producto-waiki` de 5 a 4, `instalacion` de 25 a 31.
- Ronda de revisión 01-09-2026 (feedback directo de la clienta): `instalacion` de 31 a 27 (se quitaron 4 fotos del modelo de Chakay descontinuado — ver `content/instalaciones.ts`); `producto-chakay` de 2 a 4 fotos reales vigentes (`-3` a `-6`; `-1`/`-2` quedan en disco sin referenciar, del modelo descontinuado); `producto-mini-nahuen` nuevo (2 fotos); `portada-2.jpg` nuevo (reemplaza a `portada-1.jpg`, que queda sin usar en disco).
- Ronda de revisión 01-09-2026 (segunda pasada, feedback sobre el sitio ya publicado): `portada-2.jpg` **reemplazado de nuevo** — la primera portada de esta ronda resultó ser la misma foto que la clienta señaló como "la actual" a reemplazar (confirmado por hash contra la captura de pantalla que envió); ahora es la foto que ella marcó como "portada definitiva". `producto-mini-nahuen` de 2 a 3 fotos (se agrega la ficha técnica como imagen de galería, no solo como fuente de datos).
- Ronda 05-09-2026: `producto-nahuen` de 5 marcadores a **2 fotos reales** (`-1`, `-2`, copiadas de `imagenes-cliente/1-productos/nahuen/`). `producto-nahuen-3/4/5.jpg` se **borraron** del disco: eran marcadores en blanco sin foto que los sustituyera, y el pipeline seguía generando variantes de ellos. Con esto `nahuen.borrador` pasa a `false` y el producto entra al catálogo publicado.
- Ronda 07-09-2026: `accesorio-controlador` de 1 marcador a **2 fotos reales**, lo que saca al controlador de presión de `borrador: true`.

## producto-waiki (4)

- `producto-waiki-1.jpg`
- `producto-waiki-2.jpg`
- `producto-waiki-3.jpg`
- `producto-waiki-4.jpg`

## producto-chakay (4 en uso + 2 sin referenciar)

- `producto-chakay-3.jpg` … `producto-chakay-6.jpg` — modelo vigente, en uso
- `producto-chakay-1.jpg`, `producto-chakay-2.jpg` — modelo descontinuado, quedan en disco sin referenciar en `content/productos/chakay.ts`

## producto-nahuen (2)

- `producto-nahuen-1.jpg` — equipo encendido en un rincón, con tetera sobre la cubierta
- `producto-nahuen-2.jpg` — equipo encendido contra muro de cerámica

Nota: fotos reales desde la ronda 05-09-2026. Miden 1200×1600 y 900×1600 px — bajo los 2000 px del contrato de ARCHITECTURE.md §9, así que el pipeline las procesa con aviso. Pendiente pedirlas en resolución completa.

## producto-mini-nahuen (3)

- `producto-mini-nahuen-1.jpg`
- `producto-mini-nahuen-2.jpg`
- `producto-mini-nahuen-3.jpg` — ficha técnica fotografiada (medidas, potencia, valor)

## accesorio-controlador (2)

- `accesorio-controlador-1.jpg` — instalado en el caño, de frente, placa del fabricante legible
- `accesorio-controlador-2.jpg` — el mismo, en ángulo, se ve el montaje sobre el caño

Nota: fotos reales desde la ronda 07-09-2026. Miden 461 × 1024 px — bajo los 640 px de ancho que el pipeline usaba como mínimo. Se corrigió el pipeline para que un original más angosto que 640 px emita una variante a su ancho nativo en vez de ninguna (`scripts/procesar-imagenes.ts`, `anchosAGenerar`). No se amplía nada.

## accesorio-rejilla (1)

- `accesorio-rejilla-1.jpg`

## portada (1 en uso + 1 sin referenciar)

- `portada-2.jpg` — en uso
- `portada-1.jpg` — sin referenciar desde la ronda 01-09-2026

## instalacion (29 en uso + 2 sin referenciar)

- `instalacion-01.jpg` … `instalacion-29.jpg` — Waiki, en uso
- `instalacion-30.jpg`, `instalacion-31.jpg` — modelo de Chakay descontinuado, quedan en disco sin referenciar en `content/instalaciones.ts`. Chakay queda sin instalaciones reales publicadas por ahora.
