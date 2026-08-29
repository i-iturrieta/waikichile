/**
 * Test de `lib/contenido/paginas.ts` (Bloque 9 de PHASE_1_PLAN.md, tareas
 * 9.5 y 9.6). Mismo patrón que `blog.test.ts`: `parsearPagina` con strings
 * en memoria, sin crear archivos en `content/paginas/`.
 *
 * El caso que más importa probar es el de la tarea 9.5: `borrador: true` no
 * debe impedir que la página cargue — es la tensión documentada en el
 * comentario de cabecera de `paginas.ts`.
 */

import { describe, expect, it } from 'vitest';
import { paginaGarantia, paginaNosotros, parsearPagina } from './paginas.ts';

const FRONTMATTER_VALIDO = `---
titulo: Nosotros
resumen: Quiénes somos.
borrador: false
---

Cuerpo en **Markdown**.
`;

describe('parsearPagina', () => {
  it('carga una página con frontmatter válido y convierte el cuerpo a HTML', () => {
    const pagina = parsearPagina('prueba.md', FRONTMATTER_VALIDO);
    expect(pagina.titulo).toBe('Nosotros');
    expect(pagina.resumen).toBe('Quiénes somos.');
    expect(pagina.borrador).toBe(false);
    expect(pagina.html).toContain('<strong>Markdown</strong>');
  });

  it('carga igual una página con borrador: true — no es un filtro de colección (ver paginas.ts)', () => {
    const enBorrador = FRONTMATTER_VALIDO.replace('borrador: false', 'borrador: true');
    const pagina = parsearPagina('prueba.md', enBorrador);
    expect(pagina.borrador).toBe(true);
    expect(pagina.html).toContain('<strong>Markdown</strong>');
  });

  it('rompe con un mensaje claro cuando falta un campo obligatorio', () => {
    const incompleto = `---
titulo: Sin resumen
borrador: false
---

Cuerpo.
`;
    expect(() => parsearPagina('incompleto.md', incompleto)).toThrowError(/paginas\/incompleto\.md/);
    expect(() => parsearPagina('incompleto.md', incompleto)).toThrowError(/resumen/);
  });
});

describe('paginaNosotros / paginaGarantia (contenido real, Bloque 3b)', () => {
  it('paginaNosotros es publicable (borrador: false)', () => {
    expect(paginaNosotros.borrador).toBe(false);
    expect(paginaNosotros.titulo).toBe('Nosotros');
    expect(paginaNosotros.html.length).toBeGreaterThan(0);
  });

  it('paginaGarantia se carga pese a borrador: true, y su cuerpo no publica ningún plazo en meses', () => {
    expect(paginaGarantia.borrador).toBe(true);
    expect(paginaGarantia.html.length).toBeGreaterThan(0);
    expect(paginaGarantia.html).not.toMatch(/\d+\s*mes/i);
  });

  it('ninguna de las dos páginas menciona el correo de la marca anterior', () => {
    expect(paginaGarantia.html.toLowerCase()).not.toContain('ecopelletsur');
    expect(paginaNosotros.html.toLowerCase()).not.toContain('ecopelletsur');
  });
});
