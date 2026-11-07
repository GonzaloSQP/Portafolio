import { portfolioData } from '../src/data/portfolioData';
import { ProfileSchema } from '../src/schemas/portfolioSchema';

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

  console.log(`✅ [validate:data] Validación exitosa. ${portfolioData.projects.length} proyectos validados.`);
}

runValidation();

