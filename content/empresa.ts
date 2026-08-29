/**
 * Constante `Empresa` (ARCHITECTURE.md §3 "Empresa"; Bloque 5 de
 * PHASE_1_PLAN.md, tarea 5.3). Contacto, redes y datos de la razón social
 * que consumen `components/layout/Encabezado.tsx`, `Pie.tsx`,
 * `BotonWhatsapp.tsx` y el JSON-LD de `Organization` (`lib/seo/jsonld.ts`).
 *
 * Datos confirmados en el proyecto a la fecha de este bloque:
 * - `telefono`/`whatsapp`: mismo número, `+56 9 7537 4940`.
 * - `correo`: `contacto@waikichile.cl` — confirmado en
 *   AUDITORIA_SITIO_ACTUAL.md ("✅ contacto@waikichile.cl. Solo confirmar
 *   que sigue vigente...").
 * - `razonSocial`/`rut`: no confirmados por la clienta todavía
 *   (AUDITORIA_SITIO_ACTUAL.md, "Bloquean la publicación", punto 5). `null`,
 *   no un valor inventado (ARCHITECTURE.md §1.6) — el pie omite esa línea
 *   mientras sigan así.
 * - `redes.tiktok` / `redes.instagram`: `@waikichile` en ambas.
 * - `redes.facebook`: **ausente a propósito**. El handle vigente en Facebook
 *   sigue siendo el de la marca anterior de la empresa, contradice la marca
 *   nueva y está pendiente de resolución con la clienta
 *   (AUDITORIA_SITIO_ACTUAL.md §6, punto 12). No se emite ningún valor — ni
 *   el viejo ni uno inventado. (No se cita el handle literal en este
 *   comentario a propósito: `lib/contenido/guardia.test.ts` — tarea 3.8 —
 *   falla el build si el nombre de la marca vieja aparece en `content/`,
 *   sin distinguir entre código y comentario.)
 *
 * `borrador: false` para el conjunto: el teléfono, el WhatsApp y el correo
 * son reales y confirmados, así que el registro completo es publicable. Los
 * dos campos individuales que faltan (`razonSocial`, `rut`) usan `null`, no
 * `borrador` — mismo patrón que 3b.1 usó para `medidas: null` en la ficha de
 * Waiki: un campo nullable pendiente de la clienta, no todo el contenido
 * marcado como no publicable.
 *
 * `content/` no importa código (ARCHITECTURE.md §7) — el único import de
 * abajo es de tipo, se borra en compilación. La validación real con Zod
 * ocurre en `lib/contenido/empresa.ts`, al cargar ese módulo.
 */

import type { Empresa } from '../lib/contenido/esquemas.ts';

const empresa: Empresa = {
  telefono: '+56 9 7537 4940',
  whatsapp: '+56 9 7537 4940',
  correo: 'contacto@waikichile.cl',
  razonSocial: null,
  rut: null,
  redes: {
    tiktok: '@waikichile',
    instagram: '@waikichile',
    // facebook: ausente — ver comentario de cabecera.
  },
  borrador: false,
};

export default empresa;
