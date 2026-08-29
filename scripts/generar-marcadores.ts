/**
 * Marcadores de posición para el catálogo de imágenes (ARCHITECTURE.md §9;
 * PHASE_1_PLAN.md, tarea 2.4).
 *
 * "Las fotografías van al final, salvo una muestra" (Resumen del plan): el
 * sitio se construye entero contra estos 41 marcadores con los nombres
 * definitivos. Sustituir un marcador por la foto real es sobrescribir el
 * archivo en `content/images/` con el mismo nombre y recompilar — cero
 * cambios de código, porque el resto del sitio ya referencia ese `archivo`.
 *
 * Este script es la fuente de verdad de la lista: genera tanto los 41 JPG en
 * `content/images/` como `content/images/CATALOGO.md` a partir del mismo
 * arreglo, para que documento y archivos nunca diverjan.
 *
 * Se ejecuta una sola vez (a mano, `pnpm generar-marcadores`), NO forma
 * parte de `prebuild`: si corriera en cada build sobrescribiría las fotos
 * reales ya puestas en su lugar.
 *
 * Cada marcador: fondo plano, 2400×1600 px (lado mayor 2400, por encima del
 * mínimo de 2000 px de ARCHITECTURE.md §9), con el nombre de archivo
 * rotulado encima. El texto se compone como SVG (`sharp().composite()`)
 * porque el soporte de SVG (rsvg + pango, ambos presentes en el binario
 * precompilado de sharp) es la vía fiable — `sharp({ text: ... })` depende
 * de bindings de pango que no siempre vienen en el binario y no hizo falta
 * probarlos aparte: componer SVG funcionó a la primera.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const RAIZ = process.cwd();
const DIR_ORIGENES = join(RAIZ, 'content', 'images');
const RUTA_CATALOGO = join(DIR_ORIGENES, 'CATALOGO.md');

const ANCHO = 2400;
const ALTO = 1600;

interface ItemCatalogo {
  archivo: string;
  seccion: string;
  descripcion: string;
}

function rango(prefijo: string, desde: number, hasta: number, descripcion: string, pad = 0): ItemCatalogo[] {
  const items: ItemCatalogo[] = [];
  for (let n = desde; n <= hasta; n++) {
    const numero = pad > 0 ? String(n).padStart(pad, '0') : String(n);
    items.push({ archivo: `${prefijo}-${numero}.jpg`, seccion: prefijo, descripcion: `${descripcion} ${n}` });
  }
  return items;
}

// Lista exacta pedida en PHASE_1_PLAN.md, tarea 2.4 (41 archivos).
const CATALOGO: ItemCatalogo[] = [
  ...rango('producto-waiki', 1, 5, 'Producto Waiki — foto'),
  ...rango('producto-chakay', 1, 3, 'Producto Chakay — foto'),
  ...rango('producto-nahuen', 1, 5, 'Producto Nahuen — foto'),
  ...rango('accesorio-controlador', 1, 1, 'Accesorio — controlador de presión, foto'),
  ...rango('accesorio-rejilla', 1, 1, 'Accesorio — rejilla del quemador, foto'),
  ...rango('portada', 1, 1, 'Portada / Inicio — foto'),
  ...rango('instalacion', 1, 25, 'Instalación — foto', 2),
];

/** Escapa texto para insertarlo dentro de un `<text>` SVG. */
function escaparSvg(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function construirSvg(item: ItemCatalogo): string {
  const cx = ANCHO / 2;
  const cy = ALTO / 2;
  const archivo = escaparSvg(item.archivo);
  const descripcion = escaparSvg(item.descripcion);

  return `
<svg width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${ANCHO}" height="${ALTO}" fill="#3d3a36" />
  <rect x="24" y="24" width="${ANCHO - 48}" height="${ALTO - 48}" fill="none" stroke="#c9a876" stroke-width="6" stroke-dasharray="24 16" />

  <!-- Icono "sin foto": marco con una X -->
  <g transform="translate(${cx - 90}, ${cy - 260})" stroke="#c9a876" stroke-width="10" fill="none" stroke-linecap="round">
    <rect x="0" y="0" width="180" height="130" rx="10" />
    <line x1="0" y1="0" x2="180" y2="130" />
    <line x1="180" y1="0" x2="0" y2="130" />
  </g>

  <text x="${cx}" y="${cy + 40}" font-family="sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle">${archivo}</text>
  <text x="${cx}" y="${cy + 100}" font-family="sans-serif" font-size="34" fill="#c9a876" text-anchor="middle">MARCADOR DE POSICIÓN — reemplazar con foto real</text>
  <text x="${cx}" y="${cy + 150}" font-family="sans-serif" font-size="30" fill="#a9a49c" text-anchor="middle">${descripcion}</text>
</svg>`.trim();
}

function construirCatalogoMd(): string {
  const secciones = new Map<string, ItemCatalogo[]>();
  for (const item of CATALOGO) {
    const lista = secciones.get(item.seccion) ?? [];
    lista.push(item);
    secciones.set(item.seccion, lista);
  }

  const lineas: string[] = [
    '# Catálogo de imágenes — Waiki Chile',
    '',
    '**Generado por `scripts/generar-marcadores.ts`. No editar a mano: si cambia la lista, se edita el arreglo `CATALOGO` en el script y se vuelve a correr `pnpm generar-marcadores`.**',
    '',
    `Nombre definitivo de cada imagen del sitio, patrón \`{seccion}-{slug}-{n}.jpg\` (ARCHITECTURE.md §9). Total: **${CATALOGO.length} archivos**.`,
    '',
    'Todos parten como marcador de posición (fondo plano, nombre rotulado encima, generados por `scripts/generar-marcadores.ts`). Sustituir la foto real es sobrescribir el archivo con el mismo nombre en `content/images/` y recompilar — cero cambios de código (tarea 11.6 de PHASE_1_PLAN.md).',
    '',
  ];

  for (const [seccion, items] of secciones) {
    lineas.push(`## ${seccion} (${items.length})`);
    lineas.push('');
    for (const item of items) {
      lineas.push(`- \`${item.archivo}\``);
    }
    lineas.push('');
  }

  return lineas.join('\n');
}

async function generarMarcador(item: ItemCatalogo): Promise<void> {
  const svg = construirSvg(item);
  const rutaSalida = join(DIR_ORIGENES, item.archivo);

  await sharp({
    create: {
      width: ANCHO,
      height: ALTO,
      channels: 3,
      background: '#3d3a36',
    },
  })
    .composite([{ input: Buffer.from(svg) }])
    .jpeg({ quality: 85 })
    .toFile(rutaSalida);
}

async function main(): Promise<void> {
  mkdirSync(DIR_ORIGENES, { recursive: true });

  for (const item of CATALOGO) {
    await generarMarcador(item);
  }

  writeFileSync(RUTA_CATALOGO, construirCatalogoMd(), 'utf8');

  console.log(`[generar-marcadores] ${CATALOGO.length} marcador(es) escritos en content/images/. Catálogo: content/images/CATALOGO.md`);
}

main().catch((error: unknown) => {
  const mensaje = error instanceof Error ? error.message : String(error);
  console.error(`[generar-marcadores] ERROR: ${mensaje}`);
  process.exit(1);
});
