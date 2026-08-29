import { cloudflareTest } from '@cloudflare/vitest-pool-workers';
import { defineConfig } from 'vitest/config';

/**
 * Dos proyectos, según ARCHITECTURE.md §1.5 y §9:
 *
 * - `lib`: entorno Node estándar de Vitest, para `lib/**` (funciones puras,
 *   validación de esquemas — nada que dependa del runtime de Workers).
 * - `worker`: pool `@cloudflare/vitest-pool-workers`, para `src/**` — corre
 *   los tests dentro del runtime real de Workers (Miniflare), leyendo los
 *   bindings desde `wrangler.jsonc`.
 */
export default defineConfig({
  test: {
    // Bloque 1 no escribe tests todavía (llegan en bloques posteriores,
    // p. ej. `lib/calculadora/` en el Bloque 7). Sin esto, Vitest sale con
    // código de error cuando no encuentra ningún archivo de test.
    passWithNoTests: true,
    projects: [
      {
        test: {
          name: 'lib',
          environment: 'node',
          include: ['lib/**/*.{test,spec}.ts'],
        },
      },
      {
        plugins: [
          cloudflareTest({
            wrangler: { configPath: './wrangler.jsonc' },
          }),
        ],
        test: {
          name: 'worker',
          include: ['src/**/*.{test,spec}.ts'],
        },
      },
    ],
  },
});
