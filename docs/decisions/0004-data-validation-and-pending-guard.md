# 0004. Validación Estricta de Datos y Guardián de Campos Pendientes
Fecha: 2026-11-06
Estado: aceptada

## Contexto
El prompt maestro establece la Invariante 1 y 4: "Sin información fabricada. Ni experiencia, formación, clientes, métricas, logros, enlaces, capturas, resultados de rendimiento, cobertura ni despliegues. Lo no confirmado es «pendiente»".
Además, la regla de build estipula que cualquier presencia del prefijo `PENDIENTE:` en el contenido publicable debe abortar el build de producción con error explícito.

## Opciones evaluadas
1. **Validación manual en tiempo de revisión**:
   - Riesgosa y propensa al error humano.
2. **Script de validación pre-build automatizado con Zod / TypeScript**:
   - Analiza la fuente de datos única (`src/data/portfolioData.ts`), comprueba tipado, formatos de URL HTTPS válidos, unicidad de IDs, integridad referencial de enlaces y escanea recursivamente la presencia de cadenas con el prefijo `PENDIENTE:`.
   - Si se ejecuta con flag `--production` o `NODE_ENV=production`, emite un código de salida `process.exit(1)` si encuentra pendientes.

## Decisión
Se implementa un script de validación estricto `scripts/validateData.ts` (integrado en `npm run validate:data` y dentro de `npm run build` y `npm run verify`), respaldado por esquemas Zod en `src/schemas/portfolioSchema.ts`.

## Consecuencias
- Cero fugas de datos simulados o marcadores inconclusos a producción.
- Datos totalmente estructurados y reutilizables para SEO (JSON-LD estructurado Schema.org `Person` y `SoftwareApplication`).

