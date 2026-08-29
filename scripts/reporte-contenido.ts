/**
 * Reporte de completitud de contenido (ARCHITECTURE.md §1.6, §3; Bloque 3
 * de PHASE_1_PLAN.md, tarea 3.7).
 *
 * Recorre las colecciones de contenido y lista: lo marcado `borrador`
 * (incluidos los artículos de blog con `publicado: false`, que cumple el
 * mismo rol — ver la nota en `lib/contenido/esquemas.ts` sobre
 * `ArticuloBlog`), los campos nullable vacíos, y las reseñas sin autorizar.
 * Es el archivo que se le manda a la clienta para cerrar el checklist de
 * la propuesta (ARCHITECTURE.md §1.6, "Reporte de completitud").
 *
 * Se ejecuta con `node scripts/reporte-contenido.ts` (Node 24, sin `tsx`) y
 * se encadena al final de `prebuild` en package.json. **Nunca debe tumbar
 * el build**: cada colección se carga con su propio try/catch (usando
 * `import()` dinámico, no imports estáticos — un import estático que lanza
 * al evaluarse no se puede atrapar) y el proceso termina siempre con código
 * 0, incluso si todo falla. Un error de contenido real sigue rompiendo el
 * build de todas formas, por otra vía: `next build` (cuando haya páginas
 * que consuman estos mismos cargadores) y `pnpm test`/`tsc --noEmit`.
 */

import type { Producto } from '../lib/contenido/esquemas.ts';
import type { Accesorio } from '../lib/contenido/esquemas.ts';
import type { Instalacion } from '../lib/contenido/esquemas.ts';
import type { Resena } from '../lib/contenido/esquemas.ts';
import type { PreguntaFrecuente } from '../lib/contenido/esquemas.ts';
import type { ArticuloBlogCargado } from '../lib/contenido/blog.ts';

async function cargarSeguro<T>(etiqueta: string, cargar: () => Promise<T>): Promise<T | undefined> {
  try {
    return await cargar();
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.error(`[reporte-contenido] No se pudo cargar "${etiqueta}": ${mensaje}`);
    return undefined;
  }
}

function titulo(texto: string): void {
  console.log(`\n${texto}\n${'-'.repeat(texto.length)}`);
}

function imprimirLista(items: string[], vacio: string): void {
  if (items.length === 0) {
    console.log(`  (${vacio})`);
    return;
  }
  for (const item of items) console.log(`  - ${item}`);
}

async function main(): Promise<void> {
  console.log('=== Reporte de completitud de contenido — Waiki Chile ===');
  console.log(`Generado ${new Date().toISOString()}`);

  const productos =
    (await cargarSeguro('productos', async () => (await import('../lib/contenido/productos.ts')).todosLosProductos)) ??
    ([] as Producto[]);
  const accesorios =
    (await cargarSeguro(
      'accesorios',
      async () => (await import('../lib/contenido/accesorios.ts')).todosLosAccesorios
    )) ?? ([] as Accesorio[]);
  const instalaciones =
    (await cargarSeguro(
      'instalaciones',
      async () => (await import('../lib/contenido/instalaciones.ts')).todasLasInstalaciones
    )) ?? ([] as Instalacion[]);
  const resenas =
    (await cargarSeguro('resenas', async () => (await import('../lib/contenido/resenas.ts')).todasLasResenas)) ??
    ([] as Resena[]);
  const faq =
    (await cargarSeguro(
      'faq',
      async () => (await import('../lib/contenido/faq.ts')).todasLasPreguntasFrecuentes
    )) ?? ([] as PreguntaFrecuente[]);
  const articulosBlog =
    (await cargarSeguro('blog', async () => (await import('../lib/contenido/blog.ts')).obtenerTodosLosArticulos())) ??
    ([] as ArticuloBlogCargado[]);

  // --- Borradores ------------------------------------------------------
  titulo('Contenido en borrador (se omite del sitio cuando SITIO_PRODUCCION=true)');
  imprimirLista(
    [
      ...productos.filter((p) => p.borrador).map((p) => `producto: ${p.slug}`),
      ...accesorios.filter((a) => a.borrador).map((a) => `accesorio: ${a.slug}`),
      ...instalaciones.filter((i) => i.borrador).map((i) => `instalación: ${i.id}`),
      ...faq.filter((f) => f.borrador).map((f) => `faq: ${f.id}`),
      ...resenas.filter((r) => r.borrador).map((r) => `reseña de ${r.autor} (${r.fecha})`),
      ...articulosBlog
        .filter((a) => !a.publicado)
        .map((a) => `blog: ${a.slug} (publicado: false, equivalente a borrador)`),
    ],
    'nada en borrador'
  );

  // --- Campos nullable vacíos -------------------------------------------
  titulo('Campos nullable pendientes (ARCHITECTURE.md §3)');
  const pendientes: string[] = [];
  for (const p of productos) {
    if (p.superficieRecomendada === null) pendientes.push(`producto ${p.slug}: superficieRecomendada`);
    if (p.medidas === null) pendientes.push(`producto ${p.slug}: medidas`);
    if (p.plazoEntrega === null) pendientes.push(`producto ${p.slug}: plazoEntrega`);
  }
  for (const a of accesorios) {
    if (a.superficieRecomendada === null) pendientes.push(`accesorio ${a.slug}: superficieRecomendada`);
    if (a.medidas === null) pendientes.push(`accesorio ${a.slug}: medidas`);
    if (a.plazoEntrega === null) pendientes.push(`accesorio ${a.slug}: plazoEntrega`);
    if (a.vidaUtil === null) pendientes.push(`accesorio ${a.slug}: vidaUtil`);
  }
  for (const i of instalaciones) {
    if (i.ciudad === null) pendientes.push(`instalación ${i.id}: ciudad`);
    if (i.modeloCombustion === null) pendientes.push(`instalación ${i.id}: modeloCombustion`);
    if (i.producto === null) pendientes.push(`instalación ${i.id}: producto`);
  }
  imprimirLista(pendientes, 'nada pendiente');

  // --- Reseñas sin autorizar ----------------------------------------------
  titulo('Reseñas sin autorizar (no se publican nunca, en desarrollo ni en producción)');
  imprimirLista(
    resenas.filter((r) => !r.autorizada).map((r) => `${r.autor} — ${r.fecha}: "${r.titulo}"`),
    'nada pendiente de autorización'
  );

  console.log('\n=== Fin del reporte ===\n');
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('[reporte-contenido] Error inesperado generando el reporte (no rompe el build):', error);
    process.exit(0);
  });
