/**
 * Test de `lib/contenido/blog.ts` (Bloque 3 de PHASE_1_PLAN.md, tarea 3.6).
 * "Done when: un .md de prueba con frontmatter válido se carga y su cuerpo
 * sale como HTML; uno con frontmatter incompleto rompe el build con
 * mensaje claro."
 *
 * Usa `parsearArticulo` con strings en memoria — no crea archivos en
 * `content/blog/`, que es contenido real (Bloque 3b), no un fixture de test.
 */

import { describe, expect, it } from 'vitest';
import { obtenerArticulos, obtenerSlugsArticulos, parsearArticulo } from './blog.ts';

const FRONTMATTER_VALIDO = `---
titulo: Por qué elegir pellets
slug: por-que-pellets
fecha: 2026-01-15
resumen: Ocho razones para calefaccionar con pellets.
tags:
  - pellets
  - calefaccion
publicado: true
---

# Título

Cuerpo en **Markdown** con una lista:

- uno
- dos
`;

describe('parsearArticulo', () => {
  it('carga un artículo con frontmatter válido y convierte el cuerpo a HTML', () => {
    const articulo = parsearArticulo('prueba.md', FRONTMATTER_VALIDO);
    expect(articulo.titulo).toBe('Por qué elegir pellets');
    expect(articulo.slug).toBe('por-que-pellets');
    expect(articulo.fecha).toBe('2026-01-15');
    expect(articulo.tags).toEqual(['pellets', 'calefaccion']);
    expect(articulo.html).toContain('<h1>Título</h1>');
    expect(articulo.html).toContain('<strong>Markdown</strong>');
    expect(articulo.html).toContain('<li>uno</li>');
  });

  it('acepta la fecha entre comillas igual que sin comillas', () => {
    const conComillas = FRONTMATTER_VALIDO.replace('fecha: 2026-01-15', 'fecha: "2026-01-15"');
    const articulo = parsearArticulo('prueba.md', conComillas);
    expect(articulo.fecha).toBe('2026-01-15');
  });

  it('rompe con un mensaje claro cuando el frontmatter está incompleto', () => {
    const incompleto = `---
titulo: Artículo sin resumen ni fecha
slug: incompleto
publicado: true
---

Cuerpo.
`;
    expect(() => parsearArticulo('incompleto.md', incompleto)).toThrowError(/blog\/incompleto\.md/);
    expect(() => parsearArticulo('incompleto.md', incompleto)).toThrowError(/fecha|resumen/);
  });
});

describe('obtenerArticulos (colección real, poblada en el Bloque 3b, tarea 3b.6)', () => {
  // Eran tres hasta el 07-09-2026, cuando se sumaron las dos entrevistas de
  // prensa. Se sigue afirmando la lista completa y su orden —no solo que haya
  // "al menos tres"— porque lo que este test cuida es el orden por fecha
  // descendente, y eso solo se puede comprobar contra una lista exacta.
  it('carga los artículos publicados, ordenados por fecha descendente', () => {
    expect(obtenerSlugsArticulos()).toEqual([
      'entrevista-disfruta-llanquihue',
      'entrevista-radio-puelche',
      'por-que-preferir-pellets',
      'conveccion-o-radiacion',
      'por-que-pellets',
    ]);
  });

  it('las entrevistas de prensa traen sus medios y apuntan a archivos propios', () => {
    const conMedios = obtenerArticulos().filter((articulo) => articulo.medios);
    expect(conMedios).toHaveLength(2);

    for (const articulo of conMedios) {
      for (const medio of articulo.medios!) {
        // Servidos por nosotros desde `public/medios/`, nunca desde un
        // tercero: es la razón por la que existe el reproductor propio.
        expect(medio.archivo).toMatch(/^\/medios\//);
        expect(medio.titulo.length).toBeGreaterThan(0);
      }
    }
  });

  it('ningún artículo enlaza al subdominio del desarrollador anterior', () => {
    for (const articulo of obtenerArticulos()) {
      expect(articulo.html.toLowerCase()).not.toContain('sebamit.com');
    }
  });

  it('ningún artículo menciona Wikái en el cierre reescrito de "Convección o radiación"', () => {
    const conveccion = obtenerArticulos().find((articulo) => articulo.slug === 'conveccion-o-radiacion');
    expect(conveccion).toBeDefined();
    expect(conveccion!.html.toLowerCase()).not.toMatch(/wik[aá]i/);
  });
});
