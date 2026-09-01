import { defineConfig } from 'vitest/config';

/**
 * Sitio 100% estático (sin Worker de backend): un único proyecto, entorno
 * Node estándar de Vitest, para `lib/**` (funciones puras, validación de
 * esquemas).
 */
export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: 'node',
    include: ['lib/**/*.{test,spec}.ts'],
  },
});
