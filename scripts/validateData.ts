import { portfolioData } from '../src/data/portfolioData';
import { ProfileSchema } from '../src/schemas/portfolioSchema';
import { blogData } from '../src/data/blogData';
import { BlogPostSchema } from '../src/schemas/blogSchema';

const FORBIDDEN_BLOG_PATTERNS = [
  /PENDIENTE:/,
  /@/,
  /https?:\/\//,
  /\b(?:password|passwd|secret|token|credencial|clave privada|private key)\b/i,
  /\b(?:192\.168\.|10\.\d+\.|172\.(?:1[6-9]|2\d|3[01])\.)/,
  /COOPAC|SSP\s?S\.?A\.?C\.?|Los Andes|Soluciones de Software/i,
];

function checkForPending(obj: unknown, path = ''): string[] {
  const issues: string[] = [];
  if (typeof obj === 'string') {
    if (obj.includes('PENDIENTE:')) {
      issues.push(`Valor pendiente encontrado en [${path}]: "${obj}"`);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      issues.push(...checkForPending(item, `${path}[${index}]`));
    });
  } else if (obj !== null && typeof obj === 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      issues.push(...checkForPending(value, path ? `${path}.${key}` : key));
    });
  }
  return issues;
}

function runValidation() {
  console.log('🔍 [validate:data] Iniciando validación de datos del portafolio...');

  // 1. Zod Schema Validation
  const result = ProfileSchema.safeParse(portfolioData);
  if (!result.success) {
    console.error('❌ [validate:data] Error de validación en esquema Zod:');
    result.error.issues.forEach((issue) => {
      console.error(`  - En ${issue.path.join('.')}: ${issue.message}`);
    });
    process.exit(1);
  }

  // 2. Comprobar unicidad de IDs de proyectos
  const projectIds = new Set<string>();
  for (const project of portfolioData.projects) {
    if (projectIds.has(project.id)) {
      console.error(`❌ [validate:data] ID de proyecto duplicado: "${project.id}"`);
      process.exit(1);
    }
    projectIds.add(project.id);
  }

  // 3. Comprobar prefijo PENDIENTE:
  const pendingIssues = checkForPending(portfolioData);
  const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production';

  if (pendingIssues.length > 0) {
    console.warn(`⚠️ [validate:data] Se encontraron ${pendingIssues.length} campos pendientes:`);
    pendingIssues.forEach((issue) => console.warn(`  - ${issue}`));

    if (isProduction) {
      console.error('❌ [validate:data] Compilación de producción rechazada: no se permite ningún marcador PENDIENTE: en producción.');
      process.exit(1);
    }
  } else {
    console.log('✅ [validate:data] Cero marcadores PENDIENTE: detectados.');
  }

  // 4. Validar que los proyectos destacados tienen resultados verificables
  for (const project of portfolioData.projects) {
    if (project.results.length === 0) {
      console.error(`❌ [validate:data] El proyecto "${project.id}" no tiene resultados cuantitativos verificables declarados.`);
      process.exit(1);
    }
  }

  // 5. Validar blog censurado: esquema, slugs únicos y ausencia de datos sensibles
  const blogSlugs = new Set<string>();
  for (const post of blogData) {
    const blogResult = BlogPostSchema.safeParse(post);
    if (!blogResult.success) {
      console.error(`❌ [validate:data] Entrada de blog inválida "${post.slug}":`);
      blogResult.error.issues.forEach((issue) => console.error(`  - En ${issue.path.join('.')}: ${issue.message}`));
      process.exit(1);
    }
    if (blogSlugs.has(post.slug)) {
      console.error(`❌ [validate:data] Slug de blog duplicado: "${post.slug}"`);
      process.exit(1);
    }
    blogSlugs.add(post.slug);
    const serialized = JSON.stringify(post);
    for (const pattern of FORBIDDEN_BLOG_PATTERNS) {
      if (pattern.test(serialized)) {
        console.error(`❌ [validate:data] La entrada de blog "${post.slug}" contiene datos prohibidos (${pattern}). El blog solo admite contenido censurado.`);
        process.exit(1);
      }
    }
    if (post.relatedProjectId && !portfolioData.projects.some((p) => p.id === post.relatedProjectId)) {
      console.error(`❌ [validate:data] La entrada de blog "${post.slug}" enlaza un proyecto inexistente: "${post.relatedProjectId}"`);
      process.exit(1);
    }
  }
  console.log(`✅ [validate:data] Blog censurado válido. ${blogData.length} entradas validadas.`);

  console.log(`✅ [validate:data] Validación exitosa. ${portfolioData.projects.length} proyectos validados.`);
}

runValidation();

