import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const contacto = fs.readFileSync(path.resolve('src/pages/contacto.astro'), 'utf-8');
const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

describe('Contacto directo en tres vías, sin formulario largo', () => {
  it('ofrece WhatsApp, agenda y correo', () => {
    expect(contacto).toContain('wa.me/');
    expect(contacto).toContain('Reserva una llamada');
    expect(contacto).toContain('mailto:');
    expect(contacto).toContain('TRES VÍAS');
  });

  it('no usa formulario largo ni Web3Forms', () => {
    expect(contacto).not.toContain('id="contact-form"');
    expect(contacto).not.toContain('api.web3forms.com');
  });

  it('la clave no está en ningún archivo versionado del repo', () => {
    const { execSync } = require('node:child_process');
    const tracked = execSync('git ls-files', { encoding: 'utf-8' }).split('\n').filter(Boolean);
    for (const file of tracked) {
      if (file === 'package-lock.json') continue;
      const content = fs.readFileSync(path.resolve(file), 'utf-8');
      expect(content, file).not.toMatch(UUID_RE);
    }
  });
});
