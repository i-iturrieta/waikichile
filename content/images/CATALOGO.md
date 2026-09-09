# Catálogo de imágenes — Waiki Chile

**Generado por `scripts/generar-marcadores.ts`. No editar a mano: si cambia la lista, se edita el arreglo `CATALOGO` en el script y se vuelve a correr `pnpm generar-marcadores`.**

Nombre definitivo de cada imagen del sitio, patrón `{seccion}-{slug}-{n}.jpg` (ARCHITECTURE.md §9). Total: **150 archivos**, las secciones de abajo suman 52), de los cuales 5 quedan en disco sin referenciar en el código (`portada-1.jpg`, `producto-chakay-1.jpg`/`-2.jpg`, `instalacion-30.jpg`/`-31.jpg` — ver nota de la ronda 01-09-2026).

Todos parten como marcador de posición (fondo plano, nombre rotulado encima, generados por `scripts/generar-marcadores.ts`). Sustituir la foto real es sobrescribir el archivo con el mismo nombre en `content/images/` y recompilar — cero cambios de código (tarea 11.6 de PHASE_1_PLAN.md).

**Actualizado a mano** (no correr el generador — sobrescribiría fotos reales con marcadores en blanco):
- Segunda pasada de fotos (ver `content/instalaciones.ts`): `producto-waiki` de 5 a 4, `instalacion` de 25 a 31.
- Ronda de revisión 01-09-2026 (feedback directo de la clienta): `instalacion` de 31 a 27 (se quitaron 4 fotos del modelo de Chakay descontinuado — ver `content/instalaciones.ts`); `producto-chakay` de 2 a 4 fotos reales vigentes (`-3` a `-6`; `-1`/`-2` quedan en disco sin referenciar, del modelo descontinuado); `producto-mini-nahuen` nuevo (2 fotos); `portada-2.jpg` nuevo (reemplaza a `portada-1.jpg`, que queda sin usar en disco).
- Ronda de revisión 01-09-2026 (segunda pasada, feedback sobre el sitio ya publicado): `portada-2.jpg` **reemplazado de nuevo** — la primera portada de esta ronda resultó ser la misma foto que la clienta señaló como "la actual" a reemplazar (confirmado por hash contra la captura de pantalla que envió); ahora es la foto que ella marcó como "portada definitiva". `producto-mini-nahuen` de 2 a 3 fotos (se agrega la ficha técnica como imagen de galería, no solo como fuente de datos).
- Ronda 05-09-2026: `producto-nahuen` de 5 marcadores a **2 fotos reales** (`-1`, `-2`, copiadas de `imagenes-cliente/1-productos/nahuen/`). `producto-nahuen-3/4/5.jpg` se **borraron** del disco: eran marcadores en blanco sin foto que los sustituyera, y el pipeline seguía generando variantes de ellos. Con esto `nahuen.borrador` pasa a `false` y el producto entra al catálogo publicado.
- Ronda 07-09-2026: `accesorio-controlador` de 1 marcador a **2 fotos reales**, lo que saca al controlador de presión de `borrador: true`.
- Ronda 08-09-2026: aparece el **controlador de presión manual** como accesorio aparte, con `accesorio-controlador-manual-1.jpg` (1 foto real). Las dos fotos anteriores pasan a llamarse `accesorio-controlador-automatico-1/-2.jpg`, porque su placa (DIN 4795) dice que el equipo que muestran es el automático — ver `content/accesorios/controlador-de-presion-automatico.ts`.

## producto-waiki (8 + 1 esquema)

- `producto-waiki-1.jpg` … `producto-waiki-4.jpg`
- `producto-waiki-5.jpg` … `producto-waiki-8.jpg` — rescatadas del WordPress original (ronda 08-09-2026). Son las 4 fotos que la ficha de WooCommerce del sitio anterior declaraba como galería de este producto, así que la atribución al equipo no es nuestra.
- `esquema-waiki-1.jpg` — esquema del fabricante sobre una foto real: rotula tolva (6,5 kg de pellets), tiraje, toma de aire, estación del quemador y limpiador de ceniza. Es el único material que describe las partes del equipo.

## producto-chakay (7 en uso + 2 sin referenciar + 4 planos)

- `producto-chakay-3.jpg` … `producto-chakay-6.jpg` — modelo vigente, en uso
- `producto-chakay-7.jpg` … `producto-chakay-9.jpg` — modelo vigente, rescatadas del WordPress original (ronda 08-09-2026), de la galería que la ficha de WooCommerce declaraba para este producto
- `producto-chakay-1.jpg`, `producto-chakay-2.jpg` — modelo descontinuado, quedan en disco sin referenciar en `content/productos/chakay.ts`
- `medidas-chakay-1.png` … `medidas-chakay-4.png` — **planos de medidas del fabricante**, de la página "Medidas de equipo Chakay" del sitio anterior. Miden 2894 × 4093 px y son los únicos originales del sitio que superan holgadamente el contrato de ARCHITECTURE.md §9. Vistas: resumen, frontal (67 cm), lateral (93 cm, con entrada y salida de aire rotuladas) y superior (32 cm)

⚠️ **Cómo se distingue el modelo vigente del descontinuado, porque no es obvio:** los dos vienen en negro y en negro con rojo. Lo que los separa es **la placa**: el descontinuado lleva **"CHAKAY"** grabado al frente; el vigente lleva la placa de la marca anterior. Lo fija `content/instalaciones.ts` y lo confirmó la clienta. Es lo contrario de lo que sugiere la intuición, y ya llevó a descartar una foto de taller de 1920 × 2560 px que parecía la mejor del lote.

⚠️ **`medidas-chakay-2.png` está retocada.** El original tenía la marca anterior dibujada en el frente del equipo; se pintó de blanco esa zona (520 × 230 px sobre fondo liso, sin tocar ninguna línea del dibujo). Decisión de Ignacio, 08-09-2026, para poder publicar el set completo sin incumplir `lib/contenido/guardia.test.ts`. Los otros tres planos no llevan marca y están intactos.

## producto-nahuen (4)

- `producto-nahuen-1.jpg` — equipo encendido en un rincón, con tetera sobre la cubierta
- `producto-nahuen-2.jpg` — equipo encendido contra muro de cerámica
- `producto-nahuen-3.jpg` — rescatada del WordPress original: es la única foto que usaba la página `/nahuen-el-equipo-a-pellets-sin-electricidad/`
- `producto-nahuen-4.jpg` — pieza gráfica de la empresa (marzo 2025): "Nahuen a solo $790.000, envío gratis", y al pie "para casas de 40 a 80 mt², no incluye kit de caños". ⚠️ **Lleva el precio impreso.** Se publica por decisión de Ignacio y hoy coincide con el precio del sitio; si el precio cambia hay que sacarla o rehacerla

Nota: `-1` y `-2` miden 1200×1600 y 900×1600 px — bajo los 2000 px del contrato, así que el pipeline las procesa con aviso. Pendiente pedirlas en resolución completa.

## producto-mini-nahuen (3)

- `producto-mini-nahuen-1.jpg`
- `producto-mini-nahuen-2.jpg`
- `producto-mini-nahuen-3.jpg` — ficha técnica fotografiada (medidas, potencia, valor)

## accesorio-controlador-automatico (5)

- `accesorio-controlador-automatico-1.jpg` — instalado en el caño, de frente, placa del fabricante legible
- `accesorio-controlador-automatico-2.jpg` — el mismo, en ángulo, se ve el montaje sobre el caño
- `accesorio-controlador-automatico-3.jpg` (2560 px), `-4.jpg` (1905 px), `-5.jpg` (1280 px) — rescatadas del WordPress original (ronda 08-09-2026). Resuelven el peor problema de imagen que tenía el sitio: las dos de arriba miden 461 px de ancho

Nota: fotos reales desde la ronda 07-09-2026. Miden 461 × 1024 px — bajo los 640 px de ancho que el pipeline usaba como mínimo. Se corrigió el pipeline para que un original más angosto que 640 px emita una variante a su ancho nativo en vez de ninguna (`scripts/procesar-imagenes.ts`, `anchosAGenerar`). No se amplía nada.

Nota: se llamaban `accesorio-controlador-1/-2.jpg` hasta la ronda 08-09-2026. Se renombraron junto con el slug de la ficha, al aparecer el controlador manual como accesorio aparte — el patrón `{seccion}-{slug}-{n}.jpg` lo pide.

## accesorio-controlador-manual (1)

- `accesorio-controlador-manual-1.jpg` — llave de tiro de palanca en el tramo de caño, sobre la cubierta del equipo

Nota: foto real desde la ronda 08-09-2026, de `imagenes-cliente/2-accesorios/controlador-de-presion-manual/`. Mide 900 × 805 px: pasa el piso duro de 640 px del pipeline, pero queda bajo los 2000 px del contrato de ARCHITECTURE.md §9, así que se procesa con aviso. Pendiente pedirla en resolución completa.

## accesorio-rejilla (1)

- `accesorio-rejilla-1.jpg`

## portada (1 en uso + 1 sin referenciar)

- `portada-2.jpg` — en uso
- `portada-1.jpg` — sin referenciar desde la ronda 01-09-2026

## instalacion (110 en uso + 2 sin referenciar)

- `instalacion-01.jpg` … `instalacion-29.jpg` — Waiki, en uso
- `instalacion-32.jpg` … `instalacion-112.jpg` — **81 fotos nuevas**, rescatadas del WordPress original (ronda 08-09-2026), de las galerías `/imagenes-waiki/` e `/imagenes-de-instalaciones-y-cocinas-.../` del sitio anterior
- `instalacion-30.jpg`, `instalacion-31.jpg` — modelo de Chakay descontinuado, quedan en disco sin referenciar en `content/instalaciones.ts`

De dónde salen las 81: el rescate tenía **3.395 archivos**, que se redujeron a **338 originales** (descartando las miniaturas que genera WordPress) y a **321 fotos visualmente únicas**. De ahí, 35 ya estaban en el sitio, 52 no llegaban al piso de 640 px, y de las **234 candidatas nuevas** se descartó todo el stock del theme de WordPress —animales, retratos, paisajes, ilustraciones: más de 100 archivos— más pantallazos y documentos escaneados. Quedaron **110 fotos reales de instalación**, y sobre ellas se aplicó la regla de marca de `content/instalaciones.ts`: **26 se descartaron porque la marca anterior se lee**, sea grabada en el frente del equipo, en la ropa de un técnico o en el adhesivo de la tolva. Las 3 restantes eran primeros planos del controlador de presión y se fueron a su ficha.
