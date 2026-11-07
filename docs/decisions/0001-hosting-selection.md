# 0001. Selección de Plataforma de Hosting y Despliegue Estático
Fecha: 2026-11-06
Estado: aceptada

## Contexto
El portafolio requiere alojar un sitio estático de alto rendimiento con costo de operación objetivo de $0/mes, alta disponibilidad global, certificado SSL/TLS automático, soporte de rutas profundas, página 404 real y capacidad de inyectar cabeceras HTTP de seguridad (`Content-Security-Policy`, etc.).

## Opciones evaluadas
1. **Cloudflare Pages**: Ancho de banda ilimitado, 500 builds mensuales en capa gratuita, red Anycast en >330 ciudades, soporte nativo de archivos de configuración `_headers` y `_redirects`.
2. **GitHub Pages**: Despliegue directo desde repositorio, pero no permite configuración nativa de cabeceras de respuesta HTTP (como CSP o Permissions-Policy) y tiene límite estricto de 100 GB/mes de ancho de banda.
3. **Vercel (Hobby)**: Excelente DX pero con riesgos de suspensión o penalizaciones por consumo en picos si el tráfico crece inesperadamente.

## Decisión
Se elige **Cloudflare Pages** como proveedor principal (con arquitectura 100% estática compatible con **GitHub Pages** como respaldo sin modificaciones de código).
Motivo: Prioridad 6 (Mantenibilidad y simplicidad), Prioridad 7 (Coste y facilidad operativa) y Prioridad 5 (Seguridad mediante soporte nativo de cabeceras `_headers`).

## Consecuencias
- La salida del compilador debe ser una carpeta estática estándar (`dist/`).
- Se configuran los archivos `public/_headers` y `public/_redirects` para garantizar seguridad y rutas canónicas.
- Si Cloudflare modificase sus cuotas, la migración a GitHub Pages, Netlify o cualquier servidor Nginx/Apache es trivial e inmediata.

## Fuentes
- `https://developers.cloudflare.com/pages/platform/limits/` (Noviembre 2026).
- `https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages` (Noviembre 2026).

