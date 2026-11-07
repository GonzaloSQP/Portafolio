import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Auditoría Técnica Verificada y Hallazgos Solucionados', () => {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distDir, 'index.html');

  it('el archivo dist/index.html existe', () => {
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  const indexHtml = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf-8') : '';

  it('og:image y twitter:image usan URL absoluta https://dev.apiscusco.com/og-image.png', () => {
    expect(indexHtml).toContain('property="og:image" content="https://dev.apiscusco.com/og-image.png"');
    expect(indexHtml).toContain('name="twitter:image" content="https://dev.apiscusco.com/og-image.png"');
  });

  it('título y descripción cumplen los límites de longitud de SEO (Google snippet)', () => {
    const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/);
    expect(titleMatch).toBeTruthy();
    const title = titleMatch ? titleMatch[1] : '';
    expect(title.length).toBeLessThanOrEqual(70);

    const descMatch = indexHtml.match(/<meta name="description" content="(.*?)"/);
    expect(descMatch).toBeTruthy();
    const desc = descMatch ? descMatch[1] : '';
    expect(desc.length).toBeLessThanOrEqual(165);
    expect(desc).toContain('+1M');
    expect(desc).toContain('+30 empresas');
  });

  it('existen dos etiquetas theme-color con media queries para modo claro y oscuro', () => {
    expect(indexHtml).toContain('name="theme-color" media="(prefers-color-scheme: dark)" content="#090d16"');
    expect(indexHtml).toContain('name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc"');
  });

  it('incluye transiciones de vista nativas y speculation rules para precarga', () => {
    expect(indexHtml).toContain('name="view-transition" content="same-origin"');
    expect(indexHtml).toContain('type="speculationrules"');
  });

  it('el menú móvil tiene el atributo HTML hidden cuando está cerrado', () => {
    expect(indexHtml).toMatch(/<nav[^>]*id="mobile-menu"[^>]*hidden/);
  });

  it('cada tarjeta de proyecto contiene un diagrama de arquitectura vectorial', () => {
    expect(indexHtml).toContain('Topología de Arquitectura');
    expect(indexHtml).toContain('THROUGHPUT:');
    expect(indexHtml).toContain('TASA RECHAZO:');
  });

  it('las métricas en la home incluyen contexto de medición (Antes, Ahora, Medición)', () => {
    expect(indexHtml).toContain('[ANTES]:');
    expect(indexHtml).toContain('[AHORA]:');
    expect(indexHtml).toContain('Medición:');
    expect(indexHtml).toContain('Oracle SQL Trace');
    expect(indexHtml).toContain('tabular-nums');
  });

  it('las direcciones de email están protegidas contra inyección de email-decode de Cloudflare', () => {
    expect(indexHtml).toContain('<!--email_off-->');
    expect(indexHtml).toContain('<!--/email_off-->');
  });
});
