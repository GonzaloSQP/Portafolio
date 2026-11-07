import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const contacto = fs.readFileSync(
  path.resolve('src/pages/contacto.astro'),
  'utf-8'
);

describe('Formulario de contacto con envío real', () => {
  it('existe un formulario con campos obligatorios nombre, correo y mensaje', () => {
    expect(contacto).toContain('id="contact-form"');
    expect(contacto).toContain('name="name"');
    expect(contacto).toContain('name="email"');
    expect(contacto).toContain('name="message"');
    expect(contacto).toContain('type="email"');
    expect(contacto).toContain('required');
    expect(contacto).toContain('id="contact-submit"');
  });

  it('envía por AJAX al endpoint de FormSubmit del correo del propietario', () => {
    expect(contacto).toContain('formsubmit.co/ajax/');
    expect(contacto).toContain("method: 'POST'");
    expect(contacto).toContain('_replyto');
    expect(contacto).toContain('PUBLIC_CONTACT_FORM_ENDPOINT');
  });

  it('incluye honeypot anti-bots y respaldo mailto con mensaje redactado', () => {
    expect(contacto).toContain('name="_honey"');
    expect(contacto).toContain('mailto:');
    expect(contacto).toContain('aria-live="polite"');
  });

  it('el formulario está en la página de contacto (fuente Astro)', () => {
    expect(contacto).toContain('Envíame un mensaje');
    expect(contacto).toContain('id="form-status"');
  });
});
