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

  // Este guardián ha cambiado cuatro veces, y cada vez por una decisión real.
  // La secuencia importa más que el estado actual, porque este dato es una
  // obligación legal frente al consumidor y ya se movió en las dos
  // direcciones:
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
  //      de Chakay), Ignacio decidió retirar la página hasta confirmar. Ver
  //      `contenido-rescatado/wordpress-original/HALLAZGOS.md`.
  //   4. El 09-09-2026 Ignacio confirma **12 meses**. La página se publica y
  //      el guardián vuelve a vigilar el plazo, ahora de forma definitiva: el
  //      FAQ del sitio anterior que decía 6 meses queda como obsoleto o
  //      incorrecto.
  //
  // Lo que este guardián protege no es "que diga 12": es que la página no
  // pueda quedar publicada diciendo un plazo distinto del confirmado, ni
  // volver a quedar publicada sin plazo alguno. Las dos cosas ya pasaron.
  it('paginaGarantia publica los 12 meses confirmados', () => {
    expect(paginaGarantia.borrador).toBe(false);
    expect(paginaGarantia.html.length).toBeGreaterThan(0);

    // El plazo tiene que estar, y tiene que ser 12 meses.
    expect(paginaGarantia.html).toMatch(/12\s*meses/i);

    // Y no puede aparecer ningún otro plazo de garantía. Se prohíben las dos
    // formas en que las fuentes lo expresan: en meses (6 en el FAQ del sitio
    // anterior) y en años ("1 año", la ficha de Chakay).
    expect(paginaGarantia.html).not.toMatch(/6\s*meses/i);
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
