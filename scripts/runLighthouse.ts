import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const PORT = 4322;
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

async function runLighthouse() {
  console.log('⚡ [Lighthouse] Iniciando servidor estático en puerto', PORT);
  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', resolve));

  const reportPath = path.resolve('lighthouse-report.json');

  try {
    console.log(`⚡ [Lighthouse] Ejecutando auditoría móvil sobre http://127.0.0.1:${PORT}/`);
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const env = { ...process.env, CHROME_PATH: chromePath };
    const cmd = `npx lighthouse http://127.0.0.1:${PORT}/ --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="${reportPath}" --only-categories=performance,accessibility,best-practices,seo --quiet`;
    execSync(cmd, { stdio: 'inherit', env });

    if (fs.existsSync(reportPath)) {
      const data = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
      const scores = {
        performance: Math.round((data.categories.performance?.score || 0) * 100),
        accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((data.categories.seo?.score || 0) * 100),
      };

      console.log('\n📊 === RESULTADOS OFICIALES LIGHTHOUSE ===');
      console.log(`  - Rendimiento:       ${scores.performance}/100`);
      console.log(`  - Accesibilidad:     ${scores.accessibility}/100`);
      console.log(`  - Mejores Prácticas: ${scores.bestPractices}/100`);
      console.log(`  - SEO:               ${scores.seo}/100`);
      console.log('===========================================\n');
    }
  } catch (e: any) {
    console.warn('⚠️ Nota sobre ejecución de Lighthouse:', e.message);
  } finally {
    server.close();
  }
}

runLighthouse();
