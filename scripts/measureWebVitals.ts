import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { chromium } from 'playwright';

const PORT = 4323;
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

async function measurePerformance() {
  console.log('⚡ [Perf] Iniciando servidor estático en puerto', PORT);
  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', resolve));

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();

    // Emulación móvil de gama media (Moto G Power / Pixel 5)
    await page.setViewportSize({ width: 390, height: 844 });

    let totalTransferBytes = 0;
    const resources: { url: string; size: number }[] = [];

    page.on('response', async (response) => {
      try {
        const buffer = await response.body();
        totalTransferBytes += buffer.length;
        resources.push({ url: response.url(), size: buffer.length });
      } catch (e) {}
    });

    const startTime = performance.now();
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    const loadDuration = performance.now() - startTime;

    // Métricas del navegador vía Performance API
    const metrics = await page.evaluate(() => {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find((e) => e.name === 'first-contentful-paint')?.startTime || 0;

      return {
        dns: navEntry ? navEntry.domainLookupEnd - navEntry.domainLookupStart : 0,
        tcp: navEntry ? navEntry.connectEnd - navEntry.connectStart : 0,
        ttfb: navEntry ? navEntry.responseStart - navEntry.requestStart : 0,
        domInteractive: navEntry ? navEntry.domInteractive - navEntry.startTime : 0,
        domComplete: navEntry ? navEntry.domComplete - navEntry.startTime : 0,
        fcp,
      };
    });

    console.log('\n📊 === MÉTRICAS REALES DE RENDIMIENTO (PERFIL MÓVIL) ===');
    console.log(`  - FCP (First Contentful Paint): ${metrics.fcp.toFixed(2)} ms (Objetivo: ≤ 1800 ms)`);
    console.log(`  - DOM Interactive:              ${metrics.domInteractive.toFixed(2)} ms`);
    console.log(`  - DOM Complete:                 ${metrics.domComplete.toFixed(2)} ms`);
    console.log(`  - Tiempo Total de Carga:        ${loadDuration.toFixed(2)} ms`);
    console.log(`  - Transferencia Total Portada:  ${(totalTransferBytes / 1024).toFixed(2)} KB (Presupuesto: ≤ 500 KB)`);
    console.log(`  - Recursos Solicitados:         ${resources.length} peticiones`);
    console.log('========================================================\n');
  } finally {
    await browser.close();
    server.close();
  }
}

measurePerformance();

