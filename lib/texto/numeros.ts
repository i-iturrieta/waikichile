/**
 * Numerales en palabras para el copy de la interfaz.
 *
 * Nace el 05-09-2026, al publicarse Nahuen. El home y el índice de productos
 * escribían "Tres líneas de tiro natural" y "Desliza para ver los tres" como
 * literales, y el catálogo pasó de tres a cuatro equipos: dos frases quedaron
 * mintiendo en cuanto cambió `content/`, en dos archivos distintos, sin que
 * nada avisara. Derivar la palabra de `productos.length` cierra esa clase de
 * error entera — es el mismo criterio de ARCHITECTURE.md §7 (el contenido
 * manda sobre el componente), aplicado a un número.
 *
 * Solo llega hasta seis a propósito. Pasado ese punto "Desliza para ver los
 * siete" deja de ser útil como pista de navegación y el catálogo pediría otro
 * tratamiento igual (paginación, filtros), no una palabra más en la tabla.
 * Fuera de rango cae al dígito, que siempre se lee bien.
 *
 * Género: la tabla está en femenino ("una", "dos"…) porque los dos usos
 * actuales cuentan *líneas* de producto. Si algún día hace falta el masculino
 * ("un equipo"), se agrega un parámetro; inventarlo ahora sería una opción
 * sin llamador.
 */

const EN_PALABRAS: Record<number, string> = {
  1: 'una',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
};

/** "cuatro" para 4; el dígito como texto si el número queda fuera de tabla. */
export function enPalabras(cantidad: number): string {
  return EN_PALABRAS[cantidad] ?? String(cantidad);
}

/** Igual que `enPalabras`, con la inicial en mayúscula para abrir frase. */
export function enPalabrasCapital(cantidad: number): string {
  const palabra = enPalabras(cantidad);
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
