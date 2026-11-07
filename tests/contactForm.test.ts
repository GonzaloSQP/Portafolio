import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const contacto = fs.readFileSync(
  path.resolve('src/pages/contacto.astro'),
  'utf-8'
);
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

describe('Formulario de contacto con envío real (Web3Forms en cliente)', () => {
  it('existe un formulario con campos obligatorios nombre, correo y mensaje', () => {
    expect(contacto).toContain('id="contact-form"');
    expect(contacto).toContain('name="name"');
    expect(contacto).toContain('name="email"');
    expect(contacto).toContain('name="message"');
    expect(contacto).toContain('type="email"');
    expect(contacto).toContain('required');
    expect(contacto).toContain('id="contact-submit"');
  });

  it('envía a Web3Forms con clave inyectada por entorno, nunca hardcodeada', () => {
    expect(contacto).toContain('https://api.web3forms.com/submit');
    expect(contacto).toContain('PUBLIC_WEB3FORMS_ACCESS_KEY');
    expect(contacto).toContain('access_key: web3formsAccessKey');
    expect(contacto).toContain('result.success');
    expect(contacto).not.toContain('formsubmit.co');
    expect(contacto).not.toMatch(UUID_RE);
  });

  it('incluye honeypot anti-bots y respaldo mailto', () => {
    expect(contacto).toContain('name="_honey"');
    expect(contacto).toContain('mailto:');
    expect(contacto).toContain('aria-live="polite"');
  });

  it('la clave no está en ningún archivo versionado del repo', () => {
    const { execSync } = require('node:child_process');
    const tracked = execSync('git ls-files', { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean);
    for (const file of tracked) {
      if (file === 'package-lock.json') continue;
      const fullPath = path.resolve(file);
      if (!fs.existsSync(fullPath)) continue;
      const content = fs.readFileSync(fullPath, 'utf-8');
      expect(content, file).not.toMatch(UUID_RE);
    }
  });
});
