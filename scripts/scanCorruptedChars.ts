import fs from 'node:fs';
import path from 'node:path';

// Expresión regular para detectar secuencias de Mojibake y caracteres de reemplazo o zero-width
// U+FFFD (carácter de reemplazo: ), Mojibake UTF-8 decodificado como Windows-1252 (Ã¡, Ã©, etc.)
const MOJIBAKE_PATTERNS = [
  /\uFFFD/, // 
  /Ã¡|Ã©|Ã­|Ã³|Ãº|Ã±|Ã|Ã‰|Ã|Ã“|Ãš|Ã‘/, // Mojibake de tildes y eñes
  /â€“|â€”|â€˜|â€™|â€œ|â€|â€¢|â€¦/, // Mojibake de comillas/guiones tipográficos
  /\u00C2\u00A0/, // Non-breaking space corrupto (Â )
  /\u00C3\u0082/,
  /[\u200B-\u200D\uFEFF]/, // Caracteres invisibles Zero-Width
];

const SCAN_DIRS = ['src', 'scripts', 'tests', 'public'];
let issuesFound = 0;

function scanDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        scanDirectory(fullPath);
      }
    } else if (/\.(astro|ts|js|json|css|md|html|txt)$/i.test(entry.name)) {
      if (entry.name === 'scanCorruptedChars.ts') continue;
      const buffer = fs.readFileSync(fullPath);
      // Validar si el buffer tiene bytes UTF-8 válidos
      const content = buffer.toString('utf-8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        for (const pattern of MOJIBAKE_PATTERNS) {
          if (pattern.test(line)) {
            console.error(`⚠️ [CORRUPCIÓN] ${fullPath}:${idx + 1} -> "${line.trim().slice(0, 100)}"`);
            issuesFound++;
            break;
          }
        }
      });
    }
  }
}

console.log('🔍 [scan:corrupted] Iniciando escaneo exhaustivo de caracteres corruptos...');
for (const dir of SCAN_DIRS) {
  scanDirectory(dir);
}

if (issuesFound === 0) {
  console.log('✅ [scan:corrupted] ¡Cero caracteres corruptos o mojibake encontrados en el proyecto!');
} else {
  console.warn(`⚠️ [scan:corrupted] Se detectaron ${issuesFound} ocurrencias con caracteres potencialmente corruptos.`);
}
