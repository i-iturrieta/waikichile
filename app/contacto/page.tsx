/**
 * Página de contacto (ARCHITECTURE.md §4, ruta `/contacto/`).
 *
 * Sin formulario: contacto directo por WhatsApp, correo y teléfono
 * (`ContactoDirecto`). No hay backend ni Worker asociado a esta página.
 */

import type { Metadata } from 'next';
import ContactoDirecto from '@/components/contacto/ContactoDirecto';
import { construirMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = construirMetadata({
  titulo: 'Contacto',
  descripcion:
    'Escríbenos por WhatsApp, correo o teléfono. Te respondemos a la brevedad.',
  ruta: '/contacto/',
});

export default function PaginaContacto() {
  return <ContactoDirecto />;
}
