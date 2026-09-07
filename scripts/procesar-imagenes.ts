/**
 * Pipeline de imágenes (ARCHITECTURE.md §1.4, §3, §9 — Bloque 2 de PHASE_1_PLAN.md).
 *
 * Recorre `content/images/**`, valida cada original, y genera en `public/img/`
 * variantes AVIF y WebP en los anchos 640, 1280 y 1920 (sin ampliar si el
 * original es menor). Escribe también `lib/imagenes/manifiesto.json` con las
 * dimensiones reales de cada original y los anchos de variante disponibles
 * por formato, que es lo que consume `lib/imagenes/index.ts` y en última
 * instancia `components/ui/Imagen.tsx`.
 *
 * Se ejecuta con `node scripts/procesar-imagenes.ts` (Node 24 soporta
 * TypeScript nativamente vía type-stripping; ver decisión en el reporte del
 * Bloque 2, no hace falta `tsx`). Enganchado como `prebuild` en package.json.
 *
 * Umbrales de validación — dos, no uno. Los dos números que aparecen en la
 * documentación no se contradicen: describen cosas distintas, y así los
 * separa `imagenes-cliente/LEEME.md` (OK >=2000 · reservas 640-2000 · no sirve <640).
 *
 *  - **Error duro**: peso sobre 4 MB (ARCHITECTURE.md §9), o lado mayor bajo
 *    640 px (PHASE_1_PLAN.md 2.1). Es un piso de calidad, no una
 *    imposibilidad técnica: desde la corrección del 07-09-2026 un original
 *    más angosto que 640 px sí genera variante (a su ancho nativo, ver
 *    `anchosAGenerar` más abajo). Lo que no pasa el umbral es una foto tan
 *    chica que no sirve ni para la tarjeta más pequeña del sitio.
 *  - **Aviso, sin romper el build**: lado mayor bajo 2000 px, que es el
 *    contrato de entrega de ARCHITECTURE.md §9 ("mínimo 2000 px de lado").
 *    La foto se procesa igual y queda anotada como incumplimiento, para que
 *    una sola foto blanda de la clienta no tumbe la compilación entera.
 *
 * El lado mayor se mide ya normalizado por orientación EXIF.
 */

import { readdirSync, statSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const RAIZ = process.cwd();
const DIR_ORIGENES = join(RAIZ, 'content', 'images');
const DIR_SALIDA = join(RAIZ, 'public', 'img');
const RUTA_MANIFIESTO = join(RAIZ, 'lib', 'imagenes', 'manifiesto.json');

const EXTENSIONES_VALIDAS = new Set(['.jpg', '.jpeg', '.png']);
const ANCHOS = [640, 1280, 1920] as const;
const FORMATOS = ['avif', 'webp'] as const;
type Formato = (typeof FORMATOS)[number];

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — ARCHITECTURE.md §9
const MIN_LADO_MAYOR_DURO = 640; // px — PHASE_1_PLAN.md 2.1: piso de calidad (ver cabecera)
const MIN_LADO_MAYOR_CONTRATO = 2000; // px — ARCHITECTURE.md §9: contrato de entrega; incumplirlo avisa, no rompe

/**
 * Originales que se procesan pero no cumplen el contrato de entrega de
 * ARCHITECTURE.md §9. No rompen el build; se listan al final para que
 * queden a la vista de quien compila y en el pendiente de la clienta.
 */
const avisos: string[] = [];

const CALIDAD: Record<Formato, number> = {
  avif: 60,
  webp: 75,
};

interface EntradaManifiesto {
  ancho: number;
  alto: number;
  variantes: {
    avif: number[];
    webp: number[];
  };
}

type Manifiesto = Record<string, EntradaManifiesto>;

/** Lista recursivamente los archivos con extensión válida bajo `dir`. */
function listarOriginales(dir: string): string[] {
  const resultado: string[] = [];
  let entradas: string[];
  try {
    entradas = readdirSync(dir);
  } catch {
    return resultado;
  }
  for (const nombre of entradas) {
    const rutaAbsoluta = join(dir, nombre);
    const info = statSync(rutaAbsoluta);
    if (info.isDirectory()) {
      resultado.push(...listarOriginales(rutaAbsoluta));
    } else if (EXTENSIONES_VALIDAS.has(extname(nombre).toLowerCase())) {
      resultado.push(rutaAbsoluta);
    }
  }
  return resultado;
}

/** Formatea bytes como MB con un decimal, para mensajes de error legibles. */
function formatoMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function procesarOriginal(rutaAbsoluta: string, manifiesto: Manifiesto): Promise<number> {
  const rutaRelativa = relative(DIR_ORIGENES, rutaAbsoluta).split('\\').join('/');
  const nombreBase = basename(rutaAbsoluta, extname(rutaAbsoluta));

  const info = statSync(rutaAbsoluta);
  if (info.size > MAX_BYTES) {
    throw new Error(
      `content/images/${rutaRelativa}: pesa ${formatoMB(info.size)}, supera el máximo de ${formatoMB(MAX_BYTES)} (ARCHITECTURE.md §9). Comprimir o reexportar el original antes de continuar.`
    );
  }

  const metadata = await sharp(rutaAbsoluta).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`content/images/${rutaRelativa}: no se pudieron leer sus dimensiones (archivo corrupto o formato no soportado).`);
  }

  // Normaliza por orientación EXIF (5/6/7/8 = rotación de 90°/270°): las
  // dimensiones "visibles" tras auto-rotar son las que importan para
  // validar el mínimo y para lo que el manifiesto reporta.
  const rotado90 = metadata.orientation !== undefined && metadata.orientation >= 5 && metadata.orientation <= 8;
  const anchoReal = rotado90 ? metadata.height : metadata.width;
  const altoReal = rotado90 ? metadata.width : metadata.height;

  const ladoMayor = Math.max(anchoReal, altoReal);
  if (ladoMayor < MIN_LADO_MAYOR_DURO) {
    throw new Error(
      `content/images/${rutaRelativa}: mide ${anchoReal}×${altoReal} px (lado mayor ${ladoMayor} px), bajo el mínimo absoluto de ${MIN_LADO_MAYOR_DURO} px (PHASE_1_PLAN.md 2.1). Es demasiado chica para cualquier lugar del sitio, y el pipeline no amplía. Reemplazar por una de mayor resolución.`
    );
  }
  if (ladoMayor < MIN_LADO_MAYOR_CONTRATO) {
    avisos.push(
      `content/images/${rutaRelativa}: mide ${anchoReal}×${altoReal} px (lado mayor ${ladoMayor} px), bajo los ${MIN_LADO_MAYOR_CONTRATO} px que pide el contrato de originales (ARCHITECTURE.md §9). Se procesa igual, pero se verá blanda en pantallas modernas.`
    );
  }

  const variantes: EntradaManifiesto['variantes'] = { avif: [], webp: [] };
  const subdirSalida = dirname(rutaRelativa);
  const dirSalidaFinal = subdirSalida === '.' ? DIR_SALIDA : join(DIR_SALIDA, subdirSalida);
  mkdirSync(dirSalidaFinal, { recursive: true });

  let archivosGenerados = 0;

  // "Sin ampliar si el original es menor": un ancho objetivo mayor que el
  // ancho real no se genera, en vez de emitir un archivo llamado "-1920" que
  // en realidad mide menos.
  const anchosQueCaben = ANCHOS.filter((ancho) => ancho <= anchoReal);

  // Y si NINGUNO cabe —el original es más angosto que 640 px— se emite una
  // sola variante a su ancho nativo, en vez de no emitir ninguna.
  //
  // Antes este caso terminaba en cero variantes, y eso convertía una foto
  // perfectamente utilizable en una imagen inservible: `<Imagen>` lanza
  // "no tiene ninguna variante generada" y el contenido que la referencia no
  // se puede publicar. Le pasó a las dos fotos del controlador de presión
  // (461 × 1024 px), que dejaron el accesorio en `borrador: true` durante
  // semanas por un detalle de tubería, no por falta de contenido.
  //
  // Esto NO relaja la regla de no ampliar — es exactamente lo contrario:
  // sirve los píxeles que la foto tiene y ni uno más. Una variante de 461 px
  // es honesta; una de 640 px hecha estirando 461 sería una mentira más
  // pesada y más borrosa. Y para el tamaño en que se muestran estas fotos
  // (~262 px en la tarjeta de escritorio) alcanza de sobra.
  const anchosAGenerar = anchosQueCaben.length > 0 ? anchosQueCaben : [anchoReal];

  for (const ancho of anchosAGenerar) {

    for (const formato of FORMATOS) {
      const nombreArchivo = `${nombreBase}-${ancho}.${formato}`;
      const rutaSalida = join(dirSalidaFinal, nombreArchivo);

      let pipeline = sharp(rutaAbsoluta).rotate().resize({ width: ancho, withoutEnlargement: true });
      pipeline = formato === 'avif' ? pipeline.avif({ quality: CALIDAD.avif }) : pipeline.webp({ quality: CALIDAD.webp });

      await pipeline.toFile(rutaSalida);
      variantes[formato].push(ancho);
      archivosGenerados += 1;
    }
  }

  manifiesto[rutaRelativa] = {
    ancho: anchoReal,
    alto: altoReal,
    variantes,
  };

  return archivosGenerados;
}

async function main(): Promise<void> {
  const originales = listarOriginales(DIR_ORIGENES);

  if (originales.length === 0) {
    console.warn(`[procesar-imagenes] No se encontró ningún original en content/images/. Nada que procesar.`);
  }

  // public/img/ es artefacto generado (2.3): se regenera desde cero en cada
  // corrida para que no queden variantes huérfanas de originales renombrados
  // o borrados.
  rmSync(DIR_SALIDA, { recursive: true, force: true });
  mkdirSync(DIR_SALIDA, { recursive: true });

  const manifiesto: Manifiesto = {};
  let totalGenerados = 0;

  for (const original of originales.sort()) {
    totalGenerados += await procesarOriginal(original, manifiesto);
  }

  mkdirSync(dirname(RUTA_MANIFIESTO), { recursive: true });
  const manifiestoOrdenado: Manifiesto = {};
  for (const clave of Object.keys(manifiesto).sort()) {
    manifiestoOrdenado[clave] = manifiesto[clave];
  }
  writeFileSync(RUTA_MANIFIESTO, JSON.stringify(manifiestoOrdenado, null, 2) + '\n', 'utf8');

  console.log(
    `[procesar-imagenes] ${originales.length} original(es) -> ${totalGenerados} archivo(s) en public/img/. Manifiesto: lib/imagenes/manifiesto.json`
  );

  if (avisos.length > 0) {
    console.warn(
      `[procesar-imagenes] ${avisos.length} original(es) bajo el contrato de ${MIN_LADO_MAYOR_CONTRATO} px (ARCHITECTURE.md §9). Se procesaron igual:`
    );
    for (const aviso of avisos) console.warn(`  - ${aviso}`);
  }
}

main().catch((error: unknown) => {
  const mensaje = error instanceof Error ? error.message : String(error);
  console.error(`[procesar-imagenes] ERROR: ${mensaje}`);
  process.exit(1);
});
