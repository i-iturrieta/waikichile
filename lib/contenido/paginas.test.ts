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

  // Este guardián ha cambiado tres veces, y cada vez por una decisión real:
  //
  //   1. Antes del 07-09-2026 vigilaba que la página siguiera en borrador y
  //      que su cuerpo no publicara ningún plazo, porque había 6 y 12 meses
  //      documentados en fuentes distintas (AUDITORIA §6.3b).
  //   2. El 07-09-2026 Ignacio decidió publicar 12 meses de forma provisoria,
  //      y el guardián pasó a vigilar que el plazo publicado fuera ese.
  //   3. El 08-09-2026 se recuperó el WordPress original y apareció una
  //      tercera fuente: su FAQ, editado hasta julio de 2025, dice **6 meses**
  //      de forma explícita y en dos preguntas distintas. Con dos fuentes
  //      diciendo 6 (ese FAQ) y dos diciendo 12 (el manual impreso y la ficha
  //      de Chakay), Ignacio decidió retirar la página hasta que la clienta
  //      confirme. Ver `contenido-rescatado/wordpress-original/HALLAZGOS.md`.
  //
  // Un plazo de garantía es una obligación legal frente al consumidor: se
  // publica cuando se sabe, no mientras se averigua. El guardián vuelve a su
  // forma original — que no haya ningún plazo publicado — y con la página se
  // retiraron también las dos preguntas del FAQ que afirmaban los 12 meses.
  it('paginaGarantia está en borrador y su cuerpo no publica ningún plazo', () => {
    expect(paginaGarantia.borrador).toBe(true);
    expect(paginaGarantia.html.length).toBeGreaterThan(0);

    // El plazo de garantía se expresa en meses en todas las fuentes (6 en el
    // FAQ del sitio anterior, 12 en el manual) o como "1 año" en la ficha de
    // Chakay. Se prohíben las dos formas.
    expect(paginaGarantia.html).not.toMatch(/\d+\s*meses?\b/i);
    expect(paginaGarantia.html).not.toMatch(/(un|\d+)\s*años?\s+de\s+garant/i);

    // Ojo con endurecer esto de más: el cuerpo SÍ dice que la rejilla se
    // cambia "cada 1 a 2 años", y eso es vida útil de una pieza de desgaste,
    // no un plazo de garantía. Una regla que prohíba cualquier cifra con
    // unidad de tiempo rompe ese texto legítimo.
  });

  it('ninguna de las dos páginas menciona el correo de la marca anterior', () => {
    expect(paginaGarantia.html.toLowerCase()).not.toContain('ecopelletsur');
    expect(paginaNosotros.html.toLowerCase()).not.toContain('ecopelletsur');
  });
});
