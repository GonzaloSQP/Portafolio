import fs from 'node:fs';
import path from 'node:path';
import { portfolioData } from '../src/data/portfolioData';

async function checkLinks() {
  console.log('🔗 [check:links] Verificando integridad de rutas y enlaces...');
  const distDir = path.resolve('dist');

  // Si existe el directorio dist (post-build), verificamos la existencia de las rutas HTML
  if (fs.existsSync(distDir)) {
    const requiredPages = [
      'index.html',
      '404.html',
      path.join('sobre-mi', 'index.html'),
      path.join('contacto', 'index.html'),
      path.join('cv', 'index.html'),
      path.join('notas', 'index.html'),
      path.join('notas', 'streaming-reactivo-oracle-jakarta', 'index.html'),
      path.join('notas', 'pre-auditoria-ubl-sunat', 'index.html'),
      path.join('proyectos', 'index.html'),
      ...portfolioData.projects.map((p) => path.join('proyectos', p.id, 'index.html')),
    ];

    let missing = 0;
    for (const page of requiredPages) {
      const fullPath = path.join(distDir, page);
      if (!fs.existsSync(fullPath)) {
        console.error(`❌ [check:links] Página generada ausente: ${page}`);
        missing++;
      }
    }

    if (missing > 0) {
      console.error(`❌ [check:links] Se encontraron ${missing} páginas estáticas faltantes.`);
      process.exit(1);
    }
    console.log(`✅ [check:links] Todas las ${requiredPages.length} rutas HTML estáticas existen en dist/.`);
  } else {
    console.log('ℹ️ [check:links] Directorio dist/ aún no compilado. Verificando estructura de datos en memoria.');
  }

  // Verificación de formato seguro de URLs en datos
  for (const project of portfolioData.projects) {
    if (project.links.demo && !project.links.demo.startsWith('https://')) {
      console.error(`❌ [check:links] Demo URL no segura (debe ser https://): ${project.links.demo}`);
      process.exit(1);
    }
  }

  console.log('✅ [check:links] Verificación de enlaces completada sin errores.');
}

checkLinks();

