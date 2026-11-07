# Control de Calidad y Registro de Evidencia (QA)

Última actualización: 2026-11-06

---

## 1. Entorno Detectado (Fase 0)

| Capacidad | Estado | Versión / Detalle | Si falta o riesgo |
| --- | --- | --- | --- |
| **Node.js** | **verificado** | v22.11.0 | Requisito cumplido |
| **npm** | **verificado** | 10.9.0 | Requisito cumplido |
| **Git** | **verificado** | 2.51.2.windows.1 | Inicializado y activo en workspace |
| **Navegador automatizable (Playwright)** | **verificado** | Playwright Chromium v1254 (Chrome for Testing 158.0.8127.18) | Ejecución exitosa de suite E2E |
| **Lighthouse** | **verificado** | 12.8.2 | Disponible vía CLI |
| **Credenciales del proveedor** | **bloqueado por diseño** | No suministradas en Sección 3 (Modo offline / SSG listo para deploy) | Guía reproducible y workflow CI listos en `docs/DEPLOYMENT.md` |

---

## 2. Requisitos y Criterios de Aceptación (Fase A2)

### Requisitos Funcionales (RF)
- **RF-01**: Portada con identidad de Marcio Gonzalo Sequeiros Palomino, especialidad técnica, métricas comprobadas y accesos directos.
- **RF-02**: Catálogo de proyectos con filtros semánticos por categoría (`Streaming & Big Data`, `Microservicios & Integraciones`, `Facturación Electrónica & Tributario`, `Web & Multimedia`).
- **RF-03**: Casos de estudio en profundidad con Contexto, Problema, Decisiones de Arquitectura, Implementación, Desafíos y Resultados Verificables.
- **RF-04**: Sección Sobre Mí con experiencia oficial verificada (SSP S.A.C.) y certificación **PMI Project Management Ready®** (ID: `FJpF-XMpP`).
- **RF-05**: Canales reales de contacto directo (Email `mailto:`, GitHub, LinkedIn) sin formularios simulados ni botones ficticios.
- **RF-06**: Selector triple de tema (Sistema, Claro, Oscuro) con prevención de FOUC mediante script inline crítico.
- **RF-07**: Visualización algorítmica interactiva en Canvas 2D (Reactive Stream Flow) con auto-pausa y alternativa estática SVG.
- **RF-08**: Página 404 personalizada con código de respuesta adecuado y enlace de retorno.

### Requisitos No Funcionales (RNF)
- **RNF-01**: Rendimiento de élite: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms.
- **RNF-02**: JavaScript transferido en portada: **1.82 kB comprimido gzip** (presupuesto: ≤ 100 kB).
- **RNF-03**: Accesibilidad WCAG 2.2 Nivel AA: contrastes ≥ 4.5:1, navegación por teclado, skip-link, tecla Escape en menú móvil.
- **RNF-04**: Integridad de datos: esquema Zod y guardián que aborta compilación si detecta `PENDIENTE:` en producción.
- **RNF-05**: Seguridad: Cero secretos, cabeceras HTTP estrictas (`public/_headers` con CSP, X-Frame-Options, HSTS).
- **RNF-06**: Coste de operación: $0/mes en Cloudflare Pages / GitHub Pages.

---

## 3. Tabla de Evidencia Verificada (Sección 18.1)

| Etapa | Requisito | Comprobación | Comando o herramienta | Resultado real | Estado | Fecha |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | RNF-06 | Detección de entorno Node/npm/Git | `node -v; npm -v; git --version` | Node v22.11.0, npm 10.9.0, git 2.51.2 | **verificado** | 2026-11-06 |
| A | RF-01..08 | ADRs y Requisitos | Documentación en `docs/decisions/` | ADR 0001 al 0005 aprobados | **verificado** | 2026-11-06 |
| B | RNF-03 | Tokens de diseño y contraste | `docs/DESIGN_SYSTEM.md` | Contrastes texto normal 16.8:1 (oscuro) y 15.2:1 (claro) | **verificado** | 2026-11-06 |
| C | RNF-04 | Validación de esquema y anti-PENDIENTE: | `npm run validate:data --production` | 5 proyectos validados, 0 marcadores pendientes | **verificado** | 2026-11-06 |
| C | RNF-04 | Detección de datos inválidos | `npm run test` (Vitest) | 13/13 pruebas unitarias aprobadas (325 ms) | **verificado** | 2026-11-06 |
| C | RNF-02 | Compilación estática de producción | `npm run build` | 10 páginas estáticas generadas en 0.96s | **verificado** | 2026-11-06 |
| C | RF-08 | Verificación de rutas generadas | `npm run check:links` | 10/10 rutas HTML estáticas validadas | **verificado** | 2026-11-06 |
| D | RF-06 | Selector triple de tema sin FOUC | Playwright Chromium E2E | data-theme actualizado a 'light', 'dark' y 'system' | **verificado** | 2026-11-06 |
| D | RF-01 | Enlace accesible "Saltar al contenido" | Playwright Chromium E2E | .skip-link enfoca `#main-content` | **verificado** | 2026-11-06 |
| D | RF-01 | Menú móvil responsive y tecla Escape | Playwright Chromium E2E | `aria-expanded` toggle y cierre con Escape | **verificado** | 2026-11-06 |
| E | RF-07 | Alternativa estática bajo prefers-reduced-motion | Playwright Chromium E2E | SVG estático renderizado, loop desactivado | **verificado** | 2026-11-06 |
| F | RF-03 | Navegación por rutas profundas de casos | Playwright Chromium E2E | 10 rutas probadas con HTTP 200 | **verificado** | 2026-11-06 |
| G | RNF-05 | Monitoreo de consola y red | Playwright Chromium E2E | 0 errores de consola y 0 excepciones no controladas | **verificado** | 2026-11-06 |
| G | RNF-02 | Peso de bundle JavaScript transferido | Vite build output | 4.82 kB bruto / **1.82 kB gzip** | **verificado** | 2026-11-06 |
| H | RNF-01 | Cadena de verificación unificada | `npm run verify` | Exit code 0 (validación, tipos, tests, build, links) | **verificado** | 2026-11-06 |

---

## 4. Registro de Defectos (Sección 18.2)

| ID | Descripción | Impacto | Causa probable | Corrección | Prueba de regresión | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| **D-001** | EISDIR al solicitar `/proyectos` sin trailing slash en servidor estático de tests | Medio | `fs.readFileSync` sobre directorio sin resolver `index.html` interno | Validación de `fs.statSync().isDirectory()` para mapear a `index.html` | `npm run test:e2e` pasando al 100% | **Corregido** |
