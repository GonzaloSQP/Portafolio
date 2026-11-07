import path from 'node:path';
import { chromium } from 'playwright';

async function generateOgImage() {
  console.log('🎨 [OG-Image] Generando imagen de previsualización para redes sociales (1200x630)...');

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      background-color: #090d16;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 56px 64px;
      border: 2px solid #1e293b;
      position: relative;
      overflow: hidden;
    }
    .background-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    .glow-spot {
      position: absolute;
      top: -100px;
      right: -100px;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }
    .header {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 3px;
      background-color: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      background-color: #34d399;
      border-radius: 1px;
    }
    .domain {
      font-family: ui-monospace, monospace;
      font-size: 14px;
      color: #cbd5e1;
      font-weight: 600;
    }
    .main-content {
      position: relative;
      z-index: 10;
      margin-top: 10px;
    }
    .title {
      font-size: 46px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #f8fafc;
      margin-bottom: 12px;
    }
    .title span {
      color: #38bdf8;
    }
    .subtitle {
      font-size: 21px;
      color: #cbd5e1;
      line-height: 1.4;
      max-width: 980px;
    }
    .metrics-rail {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      background-color: #0f1624;
      border: 1px solid #1e293b;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 18px;
    }
    .metric-cell {
      padding: 16px 20px;
      border-right: 1px solid #1e293b;
    }
    .metric-cell:last-child {
      border-right: none;
    }
    .metric-number {
      font-family: ui-monospace, monospace;
      font-size: 24px;
      font-weight: 900;
      color: #38bdf8;
      display: block;
      margin-bottom: 4px;
    }
    .metric-desc {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.35;
    }
    .footer {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #1e293b;
      padding-top: 18px;
    }
    .tags {
      display: flex;
      gap: 8px;
    }
    .tag {
      font-family: ui-monospace, monospace;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 2px;
      background-color: #0f1624;
      border: 1px solid #1e293b;
      color: #cbd5e1;
    }
    .author {
      font-family: ui-monospace, monospace;
      font-size: 13px;
      color: #34d399;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="background-grid"></div>
  <div class="glow-spot"></div>

  <div class="header">
    <div class="badge">
      <div class="badge-dot"></div>
      <span>ARQUITECTURA DE SOFTWARE & SISTEMAS DISTRIBUIDOS</span>
    </div>
    <div class="domain">dev.apiscusco.com</div>
  </div>

  <div class="main-content">
    <h1 class="title">Marcio Gonzalo Sequeiros Palomino</h1>
    <p class="subtitle">
      Streaming reactivo de <span>+1M registros en &lt;15 min</span> con Jakarta EE y Oracle SQL, y centralización tributaria UBL 2.1 para <span>+30 empresas</span>.
    </p>

    <div class="metrics-rail">
      <div class="metric-cell">
        <span class="metric-number">&gt; 1,000,000</span>
        <span class="metric-desc">Registros procesados por streaming reactivo sin agotar el Heap JVM.</span>
      </div>
      <div class="metric-cell">
        <span class="metric-number">&gt; 30 EMPRESAS</span>
        <span class="metric-desc">Centralizador de facturación electrónica con 95% menos de rechazos.</span>
      </div>
      <div class="metric-cell">
        <span class="metric-number">&lt; 120 MS</span>
        <span class="metric-desc">Latencia en microservicios públicos de consulta DNI, RUC y SOAT.</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="tags">
      <span class="tag">Jakarta EE</span>
      <span class="tag">Oracle SQL</span>
      <span class="tag">Reactive Streams</span>
      <span class="tag">UBL 2.1 / SUNAT</span>
      <span class="tag">Redis</span>
      <span class="tag">Microservicios</span>
    </div>
    <div class="author">
      [ DISPONIBILIDAD INMEDIATA ]
    </div>
  </div>
</body>
</html>
`;

  const outputPath = path.resolve('public/og-image.png');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  await page.setContent(htmlContent, { waitUntil: 'load' });
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();

  console.log(`✅ [OG-Image] Imagen generada con éxito en ${outputPath}`);
}

generateOgImage().catch((err) => {
  console.error('❌ Error generando og-image:', err);
  process.exit(1);
});

