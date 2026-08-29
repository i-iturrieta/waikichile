/**
 * Página de contacto (ARCHITECTURE.md §4, ruta `/contacto/`; Bloque 10 de
 * PHASE_1_PLAN.md, tarea 10.4 — degradación grácil, "el criterio de
 * aceptación del anti-lock-in" de todo el proyecto).
 *
 * Server component. La decisión de qué renderizar se toma UNA vez, en
 * build: `output: 'export'` (ARCHITECTURE.md §1.1) congela esta página en
 * HTML estático en ese momento, así que `process.env.RESEND_API_KEY` se lee
 * aquí como variable del proceso de `next build` (Node), no como el
 * binding de `env` que lee `src/worker.ts` en el runtime de Workers — son
 * dos lecturas separadas de un mismo nombre, ver `.env.example`.
 *
 * Sin `RESEND_API_KEY` en build: se renderiza `ContactoDirecto` — sin
 * formulario, sin widget de Turnstile, sin `fetch` a `/api/contacto`. No es
 * un estado de error: es una página completa y funcional, distinta,
 * decidida en build. Si Ignacio desaparece o la cuenta de Resend se
 * cancela, borrar esa variable de entorno y volver a desplegar deja un
 * sitio íntegro (ARCHITECTURE.md §1.2).
 *
 * ⚠️ Límite verificado durante este bloque, para quien lea esto después: el
 * HTML exportado de `/contacto/` SÍ cambia limpio entre ambos casos (cero
 * marcado de Formulario cuando falta la variable — confirmado con
 * `grep` sobre `out/contacto/index.html`, ver el reporte del Bloque 10).
 * Lo que **no** se logró eliminar es que el chunk de JS de esa ruta siga
 * conteniendo el código de `Formulario` (incluidas las cadenas literales
 * "turnstile" y "api/contacto") aunque el build no tenga `RESEND_API_KEY`.
 * Se probaron dos estructuras — `import` estático con ternario en el JSX, y
 * `import()` dinámico dentro de un `if` en un Server Component async — con
 * Turbopack y con Webpack (`next build` sin `--turbopack`): las cuatro
 * combinaciones producen el mismo resultado. Es una característica del
 * compilador de Next.js para Server/Client Components: el manifiesto de
 * cliente de una ruta se construye a partir de qué módulos "use client" es
 * *alcanzable* desde el módulo de la página, no de qué rama realmente se
 * ejecutó en ese build — así que ambos componentes quedan alcanzables desde
 * este archivo pase lo que pase. Corregirlo del todo requeriría que ni
 * siquiera el código fuente de este archivo mencione `Formulario` en el
 * build sin Resend (p. ej. un paso de build que intercambie qué archivo de
 * página se usa antes de `next build`) — una estructura nueva, no algo que
 * corresponda decidir en silencio dentro de esta tarea. El componente nunca
 * se monta (cero markup, cero ejecución del widget, cero fetch) en ninguno
 * de los dos casos, así que el comportamiento visible para la persona que
 * visita la página es correcto; lo que queda pendiente es bytes de código
 * muerto en el chunk. Se documenta como hallazgo, no se resuelve con un
 * mecanismo nuevo no pedido.
 */

import type { Metadata } from 'next';
import Formulario from '@/components/contacto/Formulario';
import ContactoDirecto from '@/components/contacto/ContactoDirecto';
import { construirMetadata } from '@/lib/seo/metadata';

// Metadata vía `construirMetadata` (Bloque 11, tarea 11.1). Mismo ajuste que
// `app/calculadora/page.tsx`: el título ya no lleva "| Waiki Chile" a mano
// — lo agrega el `template` de `app/layout.tsx`, y repetirlo acá lo
// duplicaba en la pestaña del navegador.
export const metadata: Metadata = construirMetadata({
  titulo: 'Contacto',
  descripcion:
    'Escríbenos por el formulario de contacto o directo por WhatsApp, correo o teléfono. Te respondemos a la brevedad.',
  ruta: '/contacto/',
});

const TIENE_RESEND_CONFIGURADO = Boolean(process.env.RESEND_API_KEY);

export default function PaginaContacto() {
  return TIENE_RESEND_CONFIGURADO ? <Formulario /> : <ContactoDirecto />;
}
