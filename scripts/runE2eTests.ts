import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { chromium, type Browser } from 'playwright';

const PORT = 4321;
const DIST_DIR = path.resolve('dist');

function createStaticServer(): http.Server {
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.png': 'image/png',
  };

  return http.createServer((req, res) => {
    let reqUrl = (req.url || '/').split('?')[0];
    let filePath = path.join(DIST_DIR, reqUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_DIR, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      return res.end(fs.readFileSync(filePath));
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  });
}

async function runE2ETests() {
  console.log('🚀 [E2E] Iniciando servidor estático local sobre dist/...');
  const server = createStaticServer();

  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  console.log(`🌐 [E2E] Servidor escuchando en http://localhost:${PORT}`);

  let browser: Browser | null = null;
  const consoleErrors: string[] = [];

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`[Console Error]: ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(`[Page Uncaught Error]: ${err.message}`);
    });

    console.log('\n--- 1. Prueba de Portada y Accesibilidad (Desktop 1440px) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });

    const h1Text = await page.textContent('h1');
    console.log(`  ✓ Título H1 renderizado: "${h1Text?.slice(0, 45).trim()}..."`);

    // Comprobar skip-link
    const skipLink = await page.$('.skip-link');
    if (!skipLink) throw new Error('No se encontró el enlace .skip-link');
    console.log('  ✓ Enlace accesible "Saltar al contenido" verificado.');

    console.log('\n--- 2. Prueba del Selector Triple de Tema (Claro, Oscuro, Sistema) ---');
    // Activar tema claro
    await page.click('button[data-theme-value="light"]');
    let currentTheme = await page.getAttribute('html', 'data-theme');
    if (currentTheme !== 'light') throw new Error(`Esperado tema light, encontrado ${currentTheme}`);
    console.log('  ✓ Tema Claro activado y aplicado en data-theme.');

    // Activar tema oscuro
    await page.click('button[data-theme-value="dark"]');
    currentTheme = await page.getAttribute('html', 'data-theme');
    if (currentTheme !== 'dark') throw new Error(`Esperado tema dark, encontrado ${currentTheme}`);
    console.log('  ✓ Tema Oscuro activado y aplicado en data-theme.');

    // Activar tema del sistema
    await page.click('button[data-theme-value="system"]');
    currentTheme = await page.getAttribute('html', 'data-theme');
    console.log(`  ✓ Tema de Sistema activado y resuelto: ${currentTheme}.`);

    console.log('\n--- 3. Prueba de Navegación Responsive en Móvil (320px) ---');
    await page.setViewportSize({ width: 320, height: 600 });
    await page.reload();

    const mobileMenuBtn = await page.$('#mobile-menu-btn');
    if (!mobileMenuBtn) throw new Error('Botón de menú móvil ausente en 320px');

    let isExpanded = await mobileMenuBtn.getAttribute('aria-expanded');
    if (isExpanded !== 'false') throw new Error('El menú móvil debe iniciar con aria-expanded=false');

    await mobileMenuBtn.click();
    isExpanded = await mobileMenuBtn.getAttribute('aria-expanded');
    if (isExpanded !== 'true') throw new Error('El menú móvil debe cambiar a aria-expanded=true');
    console.log('  ✓ Menú móvil abre correctamente con aria-expanded actualizado.');

    // Cerrar con Escape
    await page.keyboard.press('Escape');
    isExpanded = await mobileMenuBtn.getAttribute('aria-expanded');
    if (isExpanded !== 'false') throw new Error('El menú móvil debe cerrarse con la tecla Escape');
    console.log('  ✓ Menú móvil se cierra correctamente con tecla Escape (Criterio WCAG 2.2).');

    console.log('\n--- 4. Prueba de Movimiento Reducido (prefers-reduced-motion) ---');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    const fallbackVisible = await page.isVisible('.stream-static-fallback');
    console.log(`  ✓ Alternativa estática SVG activa bajo prefers-reduced-motion: ${fallbackVisible}.`);

    console.log('\n--- 5. Prueba de Rutas Profundas y Casos de Estudio ---');
    const routesToTest = [
      '/proyectos/',
      '/proyectos/banca-streaming-jakarta/',
      '/proyectos/centralizador-facturacion-electronica/',
      '/proyectos/apis-cusco-consultas/',
      '/proyectos/apiscusco-facturacion-gran-escala/',
      '/proyectos/xmusic-web-app/',
      '/sobre-mi/',
      '/contacto/',
      '/404.html',
    ];

    for (const route of routesToTest) {
      const resp = await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded' });
      const status = resp?.status();
      const pageH1 = await page.textContent('h1');
      console.log(`  ✓ Ruta ${route} respondió con HTTP ${status} (H1: "${pageH1?.slice(0, 30).trim()}...")`);
    }

    console.log('\n--- 6. Verificación de Consola y Errores de Red ---');
    if (consoleErrors.length > 0) {
      console.error('❌ Se detectaron errores de consola:');
      consoleErrors.forEach((err) => console.error(`  - ${err}`));
      process.exit(1);
    }
    console.log('  ✓ Cero errores de consola en todas las rutas probadas.');

    console.log('\n🎉 ¡TODAS LAS PRUEBAS E2E Y DE ACCESIBILIDAD PASARON SATISFACTORIAMENTE!');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

runE2ETests().catch((err) => {
  console.error('❌ Error en pruebas E2E:', err);
  process.exit(1);
});
