# Portafolio Tecnológico & Casos de Estudio

**Marcio Gonzalo Sequeiros Palomino**  
*Arquitecto de Software & Ingeniero Backend Senior*  
*Especialista en Sistemas Distribuidos, Streaming de Alto Volumen y Facturación Electrónica*  
*Credencial PMI Project Management Ready® (ID: FJpF-XMpP)*

---

## 🌟 Resumen de Arquitectura e Impacto

Este portafolio personal ha sido diseñado y construido con una arquitectura de ingeniería rigurosa, orientada a la máxima velocidad, accesibilidad universal y costo operativo de $0/mes en infraestructura Edge:

- **0 KB de JavaScript innecesario**: Generación estática pura (SSG) con Astro v5; la carga inicial de contenido se entrega como HTML semántico y CSS utilitario precompilado.
- **Pipeline Reactivo Procedural (Canvas 2D)**: Visualización algorítmica interactiva en tiempo real inspirada en arquitecturas de eventos y streaming de datos, optimizada con `Float32Array`, delta-time RAF, auto-pausa por visibilidad y fallback estático SVG bajo `prefers-reduced-motion: reduce`.
- **Selector Triple de Tema**: Soporte nativo para Sistema, Claro y Oscuro con script inline crítico en `<head>` para garantizar cero parpadeo visual (FOUC).
- **Accesibilidad WCAG 2.2 AA**: Ratios de contraste ≥ 4.5:1 para texto normal, navegación 100% operable por teclado con indicador visible, enlace «saltar al contenido» y menú móvil con escape y gestión de foco.
- **Guardián Anti-PENDIENTE:**: Validación tipada con esquemas Zod en compilación que bloquea cualquier publicación con marcadores incompletos o datos simulados.

---

## 🚀 Proyectos y Casos de Estudio Destacados

1. **Migración de Reporteador Bancario a Microservicios Jakarta & Streaming**
   - Modernización de monolito Visual Basic hacia Jakarta EE.
   - Optimización de consultas complejas en Oracle SQL.
   - Procesamiento de **más de 1,000,000 de registros en menos de 15 minutos** mediante streaming reactivo y carga por chunks continuos.
2. **Centralizador de Comprobantes Electrónicos & Pre-Auditoría SUNAT**
   - Plataforma multi-empresa para gestión, validación previa de XML/CDR y envío tributario para **más de 30 empresas**.
3. **APIS Cusco (SUNAT, RENIEC, Placas y SOAT)**
   - Microservicios REST de alta disponibilidad y respuestas sub-120ms para validación instantánea de identidad y vehículos (`apis.apiscusco.com`).
4. **ApisCusco Facturación a Gran Escala**
   - Sistema SaaS integral de emisión fiscal y facturación electrónica masiva en producción (`www.apiscusco.com`).
5. **XMusic - Streaming y Reproductor Web de Música**
   - Aplicación web reactiva con Web Audio API para procesamiento en tiempo real y transiciones sin pausas (`musica.apiscusco.com`).

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| --- | --- |
| **Framework Estático** | [Astro v5](https://astro.build) (Output: static SSG) |
| **Tipado y Esquemas** | TypeScript 5.7 & Zod 3.24 |
| **Estilos y Tokens** | Tailwind CSS 3.4 & CSS Custom Properties |
| **Animación Procedural** | Canvas 2D nativo con TypedArrays (`Float32Array`) |
| **Testing** | Vitest 2.1 (Unit & Schema) & Playwright Chromium (E2E & a11y) |
| **Hosting Objetivo** | Cloudflare Pages / GitHub Pages ($0/mes) |

---

## 📋 Comandos Rápidos

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev

# 3. Validar integridad de datos y marcadores pendientes
npm run validate:data

# 4. Ejecutar pruebas unitarias
npm run test

# 5. Ejecutar pruebas E2E y de accesibilidad en Chromium
npm run test:e2e

# 6. Compilar build de producción estática
npm run build

# 7. Verificación integral de calidad (Fase H)
npm run verify
```

---

## ✍️ Blog de trabajo (censurado)

- **Blog / bitácora en curso**: [`/blog`](src/pages/blog/index.astro) — objetivos, decisiones y próximos pasos con clientes, credenciales y datos internos censurados. Política y guía de nuevas entradas: [docs/BLOG.md](docs/BLOG.md).
- **Notas de Ingeniería**: [`/notas`](src/pages/notas/index.astro) — casos ya cerrados con evidencia completa.

---

## 📚 Documentación Técnica Detallada

- [Control de Calidad y Registro de Evidencias (QA.md)](docs/QA.md)
- [Arquitectura del Sistema y Flujo de Datos (ARCHITECTURE.md)](docs/ARCHITECTURE.md)
- [Sistema de Diseño, Tokens y Accesibilidad (DESIGN_SYSTEM.md)](docs/DESIGN_SYSTEM.md)
- [Estrategia y Matriz de Despliegue (DEPLOYMENT.md)](docs/DEPLOYMENT.md)
- [Guía de Mantenimiento y Extensión (MAINTENANCE.md)](docs/MAINTENANCE.md)
- [Bitácora de Progreso y Fases (PROGRESS.md)](docs/PROGRESS.md)
- [Blog y política de censura (BLOG.md)](docs/BLOG.md)
- [Registro de Decisiones de Arquitectura (ADRs)](docs/decisions/)

