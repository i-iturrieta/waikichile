/**
 * Esquemas Zod del modelo de contenido (ARCHITECTURE.md §3; Bloque 3 de
 * PHASE_1_PLAN.md, tareas 3.1, 3.3-3.6).
 *
 * Fuente de verdad del modelo de contenido: cuando este archivo y
 * ARCHITECTURE.md diverjan, se corrige uno de los dos deliberadamente
 * (ARCHITECTURE.md §3, "Notas del modelo").
 *
 * Convención de imports: dentro de `lib/contenido/` los imports relativos
 * llevan la extensión `.ts` explícita (`./cargar.ts`, no `./cargar`). Es lo
 * que exige el loader nativo de TypeScript de Node cuando este árbol se
 * ejecuta directo con `node scripts/reporte-contenido.ts` (sin `tsx`, ver
 * PHASE_1_PLAN.md, Setup): la resolución ESM de Node no adivina la
 * extensión. `tsconfig.json` habilita `allowImportingTsExtensions` (válido
 * porque el proyecto ya compila con `noEmit: true`) para que `tsc --noEmit`
 * acepte este estilo. Next.js (Turbopack) y Vitest (Vite) resuelven imports
 * con extensión explícita sin problema — es un subconjunto válido de la
 * resolución normal, no un caso especial.
 */

import { z } from 'zod';
import { TEMA_FAQ, ZONA, TIPO_LENA } from './enums.ts';

// Re-exportados tal cual para que nada que ya los importe desde aquí (el
// nombre "de siempre" antes de la tarea 11.7) tenga que cambiar: siguen
// siendo los mismos arreglos y tipos, solo que ahora `lib/contenido/
// enums.ts` es su fuente y este archivo los reusa para construir los
// esquemas Zod de abajo. Ver el comentario de cabecera de `enums.ts` para
// el porqué de la separación.
export { TEMA_FAQ, ZONA, TIPO_LENA } from './enums.ts';
export type { TemaFAQ, Zona, TipoLena } from './enums.ts';

// ---------------------------------------------------------------------------
// Imagen (ARCHITECTURE.md §3, tipo `Imagen`)
// ---------------------------------------------------------------------------

export const imagenSchema = z.object({
  /** Nombre del archivo dentro de `content/images/`. Debe existir en el
   * manifiesto de `lib/imagenes/` — eso lo valida `obtenerImagen`, no este
   * esquema: aquí solo se exige que el string no venga vacío. */
  archivo: z.string().min(1, 'archivo no puede venir vacío'),
  /** Obligatorio por esquema (ARCHITECTURE.md §9, accesibilidad). */
  alt: z.string().min(1, 'alt no puede venir vacío'),
});
export type Imagen = z.infer<typeof imagenSchema>;

// ---------------------------------------------------------------------------
// Precio (ARCHITECTURE.md §3, unión discriminada por `tipo`)
// ---------------------------------------------------------------------------

export const precioSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('consultar') }),
  z.object({
    tipo: z.literal('fijo'),
    monto: z.number().int().positive(),
    incluyeIva: z.boolean(),
  }),
]);
export type Precio = z.infer<typeof precioSchema>;

// ---------------------------------------------------------------------------
// `conBorrador` — campo común a todo esquema de contenido (ARCHITECTURE.md
// §3, "Campo común a todo el contenido"; decisión 1.6). `contactoSchema`
// (Bloque 10) es la única excepción, porque no es contenido sino entrada de
// usuario.
// ---------------------------------------------------------------------------

/**
 * Agrega `borrador: boolean` a cualquier forma de objeto de contenido.
 * Recibe la forma (`ZodRawShape`, el objeto de campo→esquema que se le
 * pasaría a `z.object()`), no un esquema ya construido — así el esquema
 * resultante puede seguir extendiéndose con `.extend()` como cualquier
 * `z.object()` normal (lo usa `accesorioSchema`, que parte de
 * `productoSchema.extend({...})`).
 */
export function conBorrador<Forma extends z.ZodRawShape>(campos: Forma) {
  return z.object({ ...campos, borrador: z.boolean() });
}

// ---------------------------------------------------------------------------
// Enums (ARCHITECTURE.md §3, "Enums" — valores copiados literalmente).
// Los arreglos (`TEMA_FAQ`, `ZONA`, `TIPO_LENA`) y sus tipos ya no se
// definen aquí — vienen de `./enums.ts` (import + re-export de arriba) y
// aquí solo se construyen los esquemas Zod a partir de ellos. `z.infer<>`
// sobre `z.enum(ARREGLO)` produce el mismo tipo unión literal que
// `(typeof ARREGLO)[number]`, así que los tipos re-exportados de
// `enums.ts` son idénticos a los que este archivo generaba antes.
// ---------------------------------------------------------------------------

export const temaFaqSchema = z.enum(TEMA_FAQ);
export const zonaSchema = z.enum(ZONA);
export const tipoLenaSchema = z.enum(TIPO_LENA);

// ---------------------------------------------------------------------------
// Producto (ARCHITECTURE.md §3, tabla `Producto`; tarea 3.3)
// ---------------------------------------------------------------------------

/** Par etiqueta/valor para la tabla de ficha técnica. */
const especificacionSchema = z.object({
  etiqueta: z.string().min(1),
  valor: z.string().min(1),
});
export type Especificacion = z.infer<typeof especificacionSchema>;

/** m². `null` cuando la clienta no lo ha confirmado (ARCHITECTURE.md §3). */
const superficieRecomendadaSchema = z.object({
  min: z.number().positive(),
  max: z.number().positive(),
});
export type SuperficieRecomendada = z.infer<typeof superficieRecomendadaSchema>;

/** cm y kg. `null` = pendiente de la clienta (ARCHITECTURE.md §3). */
const medidasSchema = z.object({
  ancho: z.number().positive(),
  alto: z.number().positive(),
  fondo: z.number().positive(),
  peso: z.number().positive(),
});
export type Medidas = z.infer<typeof medidasSchema>;

export const productoSchema = conBorrador({
  slug: z.string().min(1),
  nombre: z.string().min(1),
  tagline: z.string().min(1),
  descripcion: z.string().min(1),
  precio: precioSchema,
  superficieRecomendada: superficieRecomendadaSchema.nullable(),
  medidas: medidasSchema.nullable(),
  especificaciones: z.array(especificacionSchema),
  colores: z.array(z.string().min(1)),
  plazoEntrega: z.string().nullable(),
  incluye: z.array(z.string().min(1)),
  noIncluye: z.array(z.string().min(1)),
  // "Mínimo 1 para publicar" (ARCHITECTURE.md §3): se exige al esquema
  // directamente, no como filtro aparte — el catálogo de placeholders del
  // Bloque 2 cubre a todos los productos previstos, así que ninguna ficha
  // legítima (ni siquiera en borrador) debería carecer de al menos una imagen.
  imagenes: z.array(imagenSchema).min(1),
  requiereControlador: z.boolean(),
  destacado: z.boolean(),
  orden: z.number().int(),
});
export type Producto = z.infer<typeof productoSchema>;

// ---------------------------------------------------------------------------
// Accesorio (ARCHITECTURE.md §3: "misma forma que Producto" + 2 campos;
// tarea 3.4)
// ---------------------------------------------------------------------------

export const accesorioSchema = productoSchema.extend({
  esRepuesto: z.boolean(),
  vidaUtil: z.string().nullable(),
});
export type Accesorio = z.infer<typeof accesorioSchema>;

// ---------------------------------------------------------------------------
// Instalacion (ARCHITECTURE.md §3, tabla `Instalacion`; tarea 3.5)
// ---------------------------------------------------------------------------

export const instalacionSchema = conBorrador({
  id: z.string().min(1),
  imagen: imagenSchema,
  ciudad: z.string().nullable(),
  modeloCombustion: z.string().nullable(),
  /** Slug de `Producto`, o `null` si no se sabe sobre qué equipo se instaló. */
  producto: z.string().nullable(),
});
export type Instalacion = z.infer<typeof instalacionSchema>;

// ---------------------------------------------------------------------------
// Resena (ARCHITECTURE.md §3: `{ autor, fecha, calificacion, titulo, cuerpo,
// ciudad?, producto?, autorizada }`; tarea 3.5)
// ---------------------------------------------------------------------------

export const resenaSchema = conBorrador({
  autor: z.string().min(1),
  fecha: z.iso.date(),
  calificacion: z.number().int().min(1).max(5),
  titulo: z.string().min(1),
  cuerpo: z.string().min(1),
  ciudad: z.string().min(1).optional(),
  /** Slug de `Producto`, si la reseña menciona uno en particular. */
  producto: z.string().min(1).optional(),
  // Obligatorio y distinto de `borrador`: el cargador (`lib/contenido/resenas.ts`)
  // lo filtra siempre, en desarrollo y en producción, porque hoy no hay
  // permiso escrito para republicar las reseñas con nombre (ARCHITECTURE.md §3).
  autorizada: z.boolean(),
});
export type Resena = z.infer<typeof resenaSchema>;

// ---------------------------------------------------------------------------
// PreguntaFrecuente (ARCHITECTURE.md §3: `{ id, pregunta, respuesta, tema,
// orden }`; tarea 3.5)
// ---------------------------------------------------------------------------

export const preguntaFrecuenteSchema = conBorrador({
  id: z.string().min(1),
  pregunta: z.string().min(1),
  respuesta: z.string().min(1),
  tema: temaFaqSchema,
  orden: z.number().int(),
});
export type PreguntaFrecuente = z.infer<typeof preguntaFrecuenteSchema>;

// ---------------------------------------------------------------------------
// ArticuloBlog (ARCHITECTURE.md §3: frontmatter de `content/blog/*.md`;
// tarea 3.6)
//
// NOTA — posible tensión con "Campo común a todo el contenido" (ARCHITECTURE.md
// §3), que dice que todo esquema de contenido lleva `borrador: boolean` con
// `contactoSchema` como única excepción: la fila de `ArticuloBlog` en esa
// misma sección enumera su frontmatter completo y explícito sin `borrador`,
// usando en su lugar `publicado: boolean`. Se implementa aquí tal como está
// en la tabla específica (más específica gana sobre la nota general) y se
// reporta como posible inconsistencia a resolver en ARCHITECTURE.md — ver
// el reporte de este bloque.
// ---------------------------------------------------------------------------

/**
 * Un archivo de audio o video alojado por nosotros, asociado a un artículo
 * (agregado el 07-09-2026 para publicar las entrevistas de prensa).
 *
 * `archivo` es la ruta pública tal cual, bajo `/medios/`, NO una clave del
 * manifiesto de imágenes: estos archivos no pasan por
 * `scripts/procesar-imagenes.ts` —ese pipeline convierte fotos a AVIF/WebP y
 * no sabe nada de audio ni de video— sino que viven en `public/medios/` y se
 * copian al export tal como están. Por eso el campo es un string con la ruta
 * y no un `imagenSchema`.
 *
 * `poster` sí es opcional y solo aplica a `tipo: 'video'`... salvo el caso
 * que motivó esto: una entrevista de radio entregada como .mp4 cuyo "video"
 * era una placa fija. Ahí el audio se extrae y la placa se conserva como
 * `poster` para que el reproductor no sea una barra gris sin contexto.
 *
 * `duracion` es texto libre ("15:59") y es solo para mostrar: quien decide
 * si le da play a una entrevista quiere saber cuánto dura antes, no después.
 * No se deriva del archivo porque el sitio es estático y leer metadatos de
 * un .m4a en tiempo de build agregaría una dependencia por un dato que se
 * escribe una vez.
 */
export const medioSchema = z.object({
  tipo: z.enum(['audio', 'video']),
  archivo: z.string().min(1).startsWith('/medios/'),
  titulo: z.string().min(1),
  poster: z.string().min(1).startsWith('/medios/').optional(),
  duracion: z.string().min(1).optional(),
});
export type Medio = z.infer<typeof medioSchema>;

export const articuloBlogSchema = z.object({
  titulo: z.string().min(1),
  slug: z.string().min(1),
  fecha: z.iso.date(),
  actualizado: z.iso.date().optional(),
  resumen: z.string().min(1),
  imagenPortada: imagenSchema.optional(),
  // Opcional y en plural: una entrevista puede venir partida en dos archivos,
  // que es exactamente el caso de Radio Frutillar. Ausente en los tres
  // artículos de texto, que no necesitan reproductor.
  medios: z.array(medioSchema).min(1).optional(),
  /**
   * Oculta la fecha en pantalla — en el listado, en el home y en la propia
   * nota (07-09-2026).
   *
   * `fecha` sigue siendo obligatoria porque es la clave de orden de toda la
   * colección: sin ella un artículo no sabría dónde ubicarse. Lo que este
   * campo apaga es **mostrarla**, y existe por un caso concreto: las dos
   * entrevistas de prensa llegaron sin fecha de emisión documentada, así que
   * su `fecha` es la de incorporación al sitio. Eso es correcto como fecha de
   * publicación —el artículo se publicó ese día, y es lo que sigue diciendo
   * el JSON-LD— pero cualquiera que lo lea arriba de una nota de prensa va a
   * entenderlo como la fecha en que se emitió la entrevista, que es otra cosa
   * y que no sabemos.
   *
   * Ante la duda entre poner una fecha que se lee mal y no poner ninguna,
   * Ignacio eligió no ponerla. Esto es exactamente eso, sin mentirle al
   * ordenamiento ni a los buscadores.
   */
  ocultarFecha: z.boolean().optional(),
  /**
   * El medio que publicó o emitió esto — "Radio Puelche 90.5 FM", "Disfruta
   * Llanquihue" (07-09-2026).
   *
   * Es lo que separa una nota de prensa de un artículo propio, y por eso es
   * el campo que decide en qué sección de `/blog/` aparece cada cosa. Se
   * eligió esto y no la etiqueta `prensa` ni "¿tiene `medios`?" por dos
   * razones: una etiqueta es libre y cualquiera puede escribirla mal sin que
   * nada avise, y un artículo propio bien puede llevar un video embebido sin
   * dejar de ser nuestro. Que un contenido tenga `fuente` significa
   * exactamente una cosa —lo publicó otro— y eso no admite interpretación.
   *
   * Se muestra como antetítulo en la tarjeta de prensa: en una sección de
   * apariciones en medios, quién lo dijo es la mitad de la información.
   */
  fuente: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)),
  publicado: z.boolean(),
});
export type ArticuloBlog = z.infer<typeof articuloBlogSchema>;

// ---------------------------------------------------------------------------
// PaginaProsa (ARCHITECTURE.md §3, "Páginas de prosa": "content/paginas/*.md
// — nosotros.md y garantia.md. Mismo frontmatter mínimo que el blog más
// borrador. Son páginas fijas, no colección: no llevan listado ni ruta
// dinámica." — Bloque 9 de PHASE_1_PLAN.md, tareas 9.5/9.6. No existía este
// esquema antes del Bloque 9: el Bloque 3 (3.1-3.6) no lo tenía entre sus
// tareas explícitas, pese a que ARCHITECTURE.md §3 sí lo define, igual que
// pasó con `Empresa` (ver esa nota más abajo).
//
// "Mismo frontmatter mínimo que el blog" se lee como "el subconjunto de
// campos que ambos formatos comparten" (`titulo`, `resumen`), no como
// "idéntico al frontmatter completo de ArticuloBlog" — los dos `.md` reales
// en `content/paginas/` (escritos en el Bloque 3b, antes de este bloque)
// solo traen `titulo`, `resumen` y `borrador`; ninguno trae `slug`, `fecha`,
// `tags` ni `publicado`, que son campos que existen para poder listar y
// enrutar dinámicamente una colección — exactamente lo que esta sección de
// ARCHITECTURE.md dice que estas dos páginas fijas no necesitan. Se
// implementa el esquema contra el frontmatter real en vez de inventarle
// campos que el contenido no tiene.
// ---------------------------------------------------------------------------

export const paginaProsaSchema = conBorrador({
  titulo: z.string().min(1),
  resumen: z.string().min(1),
});
export type PaginaProsa = z.infer<typeof paginaProsaSchema>;

// ---------------------------------------------------------------------------
// Empresa (ARCHITECTURE.md §3 "Empresa"; Bloque 5 de PHASE_1_PLAN.md, tarea
// 5.3). Constante única en `content/empresa.ts` — no es una colección de
// contenido (no hay `content/empresa/*.ts`), así que no lleva `slug` ni
// `id`. No existía este esquema antes del Bloque 5: el Bloque 3 no lo tenía
// entre sus tareas explícitas (3.1-3.6 cubren Imagen/Precio/Producto/
// Accesorio/Instalacion/Resena/PreguntaFrecuente/ArticuloBlog, no Empresa),
// pese a que ARCHITECTURE.md §3 sí lo define. Se agrega aquí siguiendo el
// mismo patrón `conBorrador` que el resto — un único `borrador` para todo el
// objeto, no por campo, porque no hay mecanismo para "omitir un campo
// individual" (a diferencia de `medidas`/`plazoEntrega` en `Producto`, que
// son nullable en vez de booleanos: `razonSocial` y `rut` siguen ese mismo
// patrón nullable, no `borrador`, porque son campos individuales pendientes
// de la clienta, no todo el registro de la empresa).
// ---------------------------------------------------------------------------

const redesSchema = z.object({
  tiktok: z.string().min(1),
  instagram: z.string().min(1),
  /** Opcional a propósito (ARCHITECTURE.md §3: "`facebook` es opcional a
   * propósito"): el handle actual (`/ecopelletsur/`) contradice la marca
   * nueva y está pendiente de resolución con la clienta
   * (AUDITORIA_SITIO_ACTUAL.md §6, punto 12, "Decisiones de marca"). Se
   * omite el campo en vez de publicar un enlace a la marca vieja o
   * inventar un handle nuevo. */
  facebook: z.string().min(1).optional(),
});
export type Redes = z.infer<typeof redesSchema>;

export const empresaSchema = conBorrador({
  telefono: z.string().min(1),
  whatsapp: z.string().min(1),
  correo: z.email(),
  // `razonSocial` y `rut` van al pie de página (ARCHITECTURE.md §3) y hoy no
  // los tenemos (AUDITORIA_SITIO_ACTUAL.md, "Bloquean la publicación",
  // punto 5: "Razón social y RUT para el pie de página. ⛔ Sigue faltando.").
  // No se inventan (ARCHITECTURE.md §1.6) — `null` hasta que la clienta los
  // entregue; el pie los omite mientras sea así, sin placeholder visible.
  razonSocial: z.string().min(1).nullable(),
  rut: z.string().min(1).nullable(),
  redes: redesSchema,
});
export type Empresa = z.infer<typeof empresaSchema>;

// ---------------------------------------------------------------------------
// ParametrosCalculadora (ARCHITECTURE.md §3 "ParametrosCalculadora" y §5 "La
// calculadora"; Bloque 7 de PHASE_1_PLAN.md, tarea 7.1)
//
// NOTA — `borrador` deliberadamente NO se aplica aquí, aunque §3 dice "todo
// esquema de contenido incluye `borrador: boolean`" con `contactoSchema`
// como "la" excepción. Igual que `articuloBlogSchema` arriba (que tampoco
// lleva `borrador`, por la misma razón de "la sección específica manda
// sobre la nota general"): la subsección de §3 dedicada a
// `ParametrosCalculadora` describe el archivo completo ("un solo módulo...
// comentado línea por línea con su fuente y su fecha") sin mencionar
// `borrador`, y el mecanismo real de `borrador` (`filtrarPublicables` en
// `lib/contenido/cargar.ts`) filtra elementos de un arreglo — no tiene
// sentido operacional para un único objeto de configuración del que
// depende toda la función de cálculo: marcarlo "borrador" no "omite una
// sección", apaga la calculadora entera, y no hay maquinaria en el proyecto
// para eso. La tabla por zona está anotada en §5 como "provisional,
// requiere confirmación", pero esa es la conversación con la clienta que
// PHASE_1_PLAN.md pide adelantar (§5, "Consecuencias de diseño no
// negociables", punto 4) resolviéndola con diseño honesto (zona austral
// con el mensaje de ventajas no económicas — punto 3, opción 2), no
// posponiéndola con un booleano. Se reporta como posible inconsistencia a
// resolver en ARCHITECTURE.md, igual que la de `ArticuloBlog`.
// ---------------------------------------------------------------------------

/** Constantes físicas (ARCHITECTURE.md §5, tabla "Constantes físicas"): no
 * las define la clienta, son de la literatura o estimaciones técnicas. */
const constantesFisicasCalculadoraSchema = z.object({
  poderCalorificoPelletKwhKg: z.number().positive(),
  poderCalorificoLenaSecaKwhKg: z.number().positive(),
  poderCalorificoLenaHumedaKwhKg: z.number().positive(),
  densidadLenaKgM3Estereo: z.number().positive(),
  rendimientoPellet: z.number().positive().max(1),
  rendimientoLenaSeca: z.number().positive().max(1),
  rendimientoLenaHumeda: z.number().positive().max(1),
  pesoSacoKg: z.number().positive(),
});
export type ConstantesFisicasCalculadora = z.infer<typeof constantesFisicasCalculadoraSchema>;

/** Una fila de la "Tabla por zona" (ARCHITECTURE.md §5): las 4 zonas de
 * `ZONA`, cada una con su demanda térmica calibrada y sus precios locales. */
const zonaCalculadoraSchema = z.object({
  zona: zonaSchema,
  /** Nombre para mostrar, tal como aparece en la tabla de ARCHITECTURE.md §5
   * (incluye las regiones que agrupa, p. ej. "Centro-sur (Maule, Ñuble,
   * Biobío)"). */
  nombre: z.string().min(1),
  meses: z.number().int().positive(),
  kwhPorM2Temporada: z.number().positive(),
  precioSacoPellet15kg: z.number().int().positive(),
  precioM3EstereoLena: z.number().int().positive(),
});
export type ZonaCalculadora = z.infer<typeof zonaCalculadoraSchema>;

export const parametrosCalculadoraSchema = z
  .object({
    constantes: constantesFisicasCalculadoraSchema,
    zonas: z.array(zonaCalculadoraSchema),
  })
  .refine(
    (datos) => {
      const presentes = [...datos.zonas.map((z) => z.zona)].sort();
      const esperadas = [...ZONA].sort();
      return presentes.length === esperadas.length && presentes.every((valor, i) => valor === esperadas[i]);
    },
    { message: `zonas debe traer exactamente las 4 zonas de ZONA, sin duplicados ni faltantes: ${ZONA.join(', ')}` }
  );
export type ParametrosCalculadora = z.infer<typeof parametrosCalculadoraSchema>;
