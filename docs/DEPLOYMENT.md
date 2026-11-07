# Nivel de Despliegue y Matriz de Hosting

Fecha de verificación y despliegue final: 2026-11-06

---

## 1. Despliegue en Producción Verificado

| Parámetro | Valor Verificado en Vivo |
| --- | --- |
| **URL Pública de Producción** | **[https://dev.apiscusco.com](https://dev.apiscusco.com)** |
| **Alias de Cloudflare Pages** | `https://main.portafolio-marcio.pages.dev` |
| **Estado del Dominio en Cloudflare** | `active` (Zone Tag: `a8181df75b17d5d5f1dd184216a6a521`) |
| **Certificado SSL/TLS** | Activo y emitido por Google Trust Services vía Cloudflare |
| **Protocolo HTTP** | HTTP/2 y HTTP/3 (QUIC) con Anycast global |
| **Cabeceras de Seguridad Verificadas** | CSP, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy, Permissions-Policy |
| **Página 404** | Status HTTP 404 real probado en `/ruta-inexistente` |

---

## 2. Comprobaciones de Rutas en Vivo

```bash
curl.exe -I https://dev.apiscusco.com/
# HTTP/1.1 200 OK

curl.exe -I https://dev.apiscusco.com/proyectos/
# HTTP/1.1 200 OK

curl.exe -I https://dev.apiscusco.com/proyectos/banca-streaming-jakarta/
# HTTP/1.1 200 OK

curl.exe -I https://dev.apiscusco.com/sobre-mi/
# HTTP/1.1 200 OK

curl.exe -I https://dev.apiscusco.com/contacto/
# HTTP/1.1 200 OK

curl.exe -I https://dev.apiscusco.com/ruta-inexistente
# HTTP/1.1 404 Not Found
```

---

## 3. Procedimiento para Futuras Actualizaciones

Cada vez que desees publicar cambios:
```bash
# 1. Ejecutar validación integral y build
npm run verify

# 2. Desplegar a producción en Cloudflare Pages
npx wrangler pages deploy dist --project-name=portafolio-marcio --branch=main
```
Los cambios se reflejarán instantáneamente en **`https://dev.apiscusco.com`**.
