# Nivel de Despliegue y Matriz de Hosting

Fecha de consulta y elaboración: 2026-11-06

---

## 1. Matriz Ponderada de Opciones de Hosting (Fase A3)

| Criterio | Peso | Cloudflare Pages | GitHub Pages | Vercel (Hobby) |
| --- | --- | --- | --- | --- |
| **Costo y riesgo de superar cuotas** (solicitudes, ancho de banda, almacenamiento) | 25 | **5** (Ancho de banda ilimitado, 500 builds/mes, $0/mes) | **4** (100 GB ancho de banda/mes, 1 GB soft storage limit, $0/mes) | **3** (100 GB ancho de banda, riesgo de cobros o suspensión por picos en plan Hobby) |
| **Rutas, assets estáticos, página 404 real y rutas profundas** | 20 | **5** (`_routes.json`, soporte nativo de `404.html` con status 404 real, cabeceras `_headers`) | **4** (`404.html` nativo, sin configuración granular de cabeceras de seguridad) | **4** (Excelente soporte estático, `vercel.json`) |
| **Facilidad de despliegue y previsualización** | 15 | **5** (Git integration, Wrangler CLI para deploy directo desde terminal, previews automáticas) | **4** (GitHub Actions, sin URLs de preview independientes por rama nativas sin config extra) | **5** (CLI `vercel`, previews por PR) |
| **Dominio personalizado y HTTPS** | 10 | **5** (SSL automático, proxy Anycast global, DNS gratis) | **5** (SSL Let's Encrypt automático, CNAME) | **5** (SSL automático, gestión DNS) |
| **Facilidad de migración y dependencia del proveedor** | 10 | **5** (Archivos estáticos 100% estándar HTML/CSS/JS, sin vendor lock-in) | **5** (Archivos estáticos puros) | **4** (Orientado a ecosistema Vercel) |
| **Latencia y distribución (CDN)** | 10 | **5** (Red Anycast en >330 ciudades a nivel mundial) | **4** (Fastly CDN de GitHub) | **4** (Edge network global) |
| **Soporte de funciones edge (si se requieren en el futuro)** | 10 | **5** (Cloudflare Workers nativos con capa gratuita de 100k req/día) | **1** (Solo estático) | **4** (Serverless/Edge con límites de tiempo de ejecución en Hobby) |
| **TOTAL PONDERADO (/500)** | **100** | **495 / 500** | **405 / 500** | **410 / 500** |

### Fuente oficial consultada:
- Cloudflare Pages Pricing & Limits: `https://developers.cloudflare.com/pages/platform/limits/` (Consultado: Noviembre 2026).
  - Bandwidth: Ilimitado.
  - Builds: 500/mes gratuitos.
  - Almacenamiento: 20,000 archivos por proyecto, 25 MiB por archivo.
- GitHub Pages Limits: `https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#limits-on-use-of-github-pages` (Consultado: Noviembre 2026).
  - Límite de ancho de banda: 100 GB/mes.
  - Repositorio recomendado: ≤ 1 GB.
- Vercel Fair Use Guidelines: `https://vercel.com/docs/limits/overview` (Consultado: Noviembre 2026).

---

## 2. Recomendación de Arquitectura

**Recomendación principal:** **Cloudflare Pages** (o **GitHub Pages** como respaldo idéntico y portable).
Al compilar a un directorio estático puro (`dist/`), el portafolio puede desplegarse indistintamente en cualquiera de los dos con costo de operación de $0 y cero fricción de migración.

> [!IMPORTANT]
> **No se promete gratuidad perpetua:** Las cuotas gratuitas están sujetas a los Términos y Condiciones vigentes del proveedor a noviembre de 2026. Para el volumen esperado de un portafolio profesional de alta calidad, el consumo se sitúa muy por debajo del 1% de los límites de Cloudflare Pages.

---

## 3. Instrucciones Reproducibles de Despliegue

### Opción A: Despliegue en Cloudflare Pages vía Wrangler (Recomendado)
```bash
# 1. Compilar el proyecto en modo producción
npm run verify

# 2. Desplegar el directorio estático
npx wrangler pages deploy dist --project-name=marciosequeiros-portfolio
```

### Opción B: Despliegue en GitHub Pages vía Actions
El proyecto incluye el workflow `.github/workflows/deploy.yml` configurado para compilar con `npm run verify` y publicar en la rama `gh-pages` o mediante GitHub Pages Artifacts.

---

## 4. Estrategia de Cabeceras de Seguridad y Rutas

El build genera los siguientes artefactos en la raíz de salida:
- `_headers`: Define cabeceras HTTP de seguridad para Cloudflare Pages (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, y caché inmutable de 1 año para assets versionados en `/_astro/*`).
- `_redirects`: Reglas de enrutamiento y captura de 404 estricta.
- `404.html`: Página de error 404 semántica con diseño integrado y enlace de rescate.

