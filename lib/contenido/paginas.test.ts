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

  // Hasta el 07-09-2026 este test guardaba lo contrario: que la página
  // siguiera en borrador y que su cuerpo no publicara ningún plazo en meses,
  // porque había 6 y 12 meses documentados en fuentes distintas y publicar
  // cualquiera sin confirmar era un riesgo legal (AUDITORIA §6.3b). Ignacio
  // decidió publicar 12 meses de forma provisoria, así que el guardián cambia
  // de forma pero no de propósito: en vez de vigilar que no haya ningún
  // plazo, vigila que el plazo publicado sea exactamente el que se decidió.
  // Si alguien lo cambia a 6, o a 24, o lo borra, el test cae y obliga a que
  // sea una decisión y no un descuido.
  it('paginaGarantia se publica y su cuerpo dice 12 meses, no otro plazo', () => {
    expect(paginaGarantia.borrador).toBe(false);
    expect(paginaGarantia.html.length).toBeGreaterThan(0);

    const plazos = paginaGarantia.html.match(/\d+\s*mes(?:es)?/gi) ?? [];
    expect(plazos.length).toBeGreaterThan(0);
    for (const plazo of plazos) {
      expect(plazo.replace(/\s+/g, ' ')).toMatch(/^12 meses$/i);
    }
  });

  it('ninguna de las dos páginas menciona el correo de la marca anterior', () => {
    expect(paginaGarantia.html.toLowerCase()).not.toContain('ecopelletsur');
    expect(paginaNosotros.html.toLowerCase()).not.toContain('ecopelletsur');
  });
});
