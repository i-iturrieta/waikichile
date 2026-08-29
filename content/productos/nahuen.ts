/**
 * Producto · Nahuen (PHASE_1_PLAN.md, tarea 3b.1).
 *
 * Fuente: `contenido-rescatado/DATOS-ESTRUCTURADOS.md` ("Producto · Nahuen")
 * y la ficha `nahuen-el-equipo-a-pellets-sin-electricidad` en
 * `textos-sitio-anterior.txt`. AUDITORIA §2.2 la describe como "ficha
 * completa" y el plan (tarea 3b.1) la da por completa sin condiciones.
 *
 * ⚠️ Desviación respecto de esa expectativa, reportada explícitamente (no
 * improvisada): ninguna fuente rescatada trae el **peso** de Nahuen — solo
 * ancho/alto/fondo. `medidas` en el esquema es un objeto todo-o-nada
 * (ancho, alto, fondo, peso), así que no se puede completar sin inventar el
 * peso, y ARCHITECTURE.md §1.6 lo prohíbe explícitamente para `medidas`. Se
 * deja `medidas: null` y las tres dimensiones conocidas se preservan como
 * `especificaciones` sueltas, para no perder el dato. Esto hace que
 * `pnpm reporte` liste `producto nahuen: medidas` como pendiente, a
 * diferencia de lo que anticipaba el "Done when" de la tarea. Ver el reporte
 * de este bloque.
 *
 * `borrador: true` (Bloque 11, tarea 11.6): cero fotografías reales de
 * Nahuen llegaron en `imagenes-cliente/` — la carpeta
 * `1-productos/nahuen/` está vacía, y una búsqueda por nombre de archivo
 * contra el inventario completo de las 141 imágenes recibidas
 * (`imagenes-cliente/INVENTARIO.md`) no encuentra ninguna. La tarea 11.6 es
 * explícita: "Ningún producto se publica con solo marcadores [...] si un
 * equipo no tiene ni una fotografía real, se marca `borrador: true` y su
 * ficha no sale" — confirmado con Ignacio antes de aplicarlo, dado que
 * Nahuen es uno de los tres productos destacados del catálogo. Vuelve a
 * `borrador: false` en cuanto exista al menos una fotografía real (basta con
 * sobrescribir los marcadores en `content/images/producto-nahuen-*.jpg` y
 * revertir este campo — cero cambios de código adicionales).
 */

import type { Producto } from '../../lib/contenido/esquemas.ts';

const nahuen: Producto = {
  slug: 'nahuen',
  nombre: 'Nahuen',
  tagline: 'El equipo minimalista a pellets, sin electricidad y sin programación.',
  descripcion:
    'Nahuen es un equipo de tiro natural a pellets, pensado para cabañas y espacios de 40 a 70 m². No es programable, y eso se presenta como ventaja: al no depender de la electricidad, nunca deja de calefaccionar por un corte de luz.\n\n' +
    'Su entrega es de 1 a 1,5 meses desde la reserva. No incluye kit de caños ni instalación.',
  precio: { tipo: 'consultar' },
  superficieRecomendada: { min: 40, max: 70 },
  // Sin peso documentado en ninguna fuente rescatada — ver nota de cabecera.
  // Ancho/alto/fondo sí están documentados; se listan abajo como
  // especificaciones sueltas en vez de perderse.
  medidas: null,
  especificaciones: [
    { etiqueta: 'Ancho', valor: '50 cm' },
    { etiqueta: 'Alto', valor: '93 cm' },
    { etiqueta: 'Fondo', valor: '32 cm' },
    { etiqueta: 'Programable', valor: 'No — no depende de electricidad' },
  ],
  colores: ['Negro', 'Rojo (según stock)'],
  plazoEntrega: '1 a 1,5 meses desde la reserva',
  incluye: [],
  noIncluye: ['Kit de caños', 'Instalación'],
  imagenes: [
    { archivo: 'producto-nahuen-1.jpg', alt: 'Nahuen, vista frontal del equipo' },
    { archivo: 'producto-nahuen-2.jpg', alt: 'Nahuen, vista general instalado' },
    { archivo: 'producto-nahuen-3.jpg', alt: 'Nahuen, detalle del cuerpo del equipo' },
    { archivo: 'producto-nahuen-4.jpg', alt: 'Nahuen, vista lateral' },
    { archivo: 'producto-nahuen-5.jpg', alt: 'Nahuen encendido' },
  ],
  requiereControlador: false,
  destacado: true,
  orden: 3,
  borrador: true,
};

export default nahuen;
