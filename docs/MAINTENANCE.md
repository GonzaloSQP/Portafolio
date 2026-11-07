# Guía de Mantenimiento y Extensión

Última actualización: 2026-11-06

---

## 1. Filosofía de Mantenimiento
Este proyecto está diseñado para mantenerse con un esfuerzo mínimo y costo operativo de $0/mes.
- **Sin base de datos que mantener**: Los datos residen en código fuertemente tipado (`src/data/portfolioData.ts`).
- **Sin backend con parches de seguridad recurrentes**: La salida es un conjunto de archivos estáticos HTML/CSS/JS servidos directamente por CDN.
- **Validación automática**: Cualquier error en la estructura de datos o la presencia de marcadores `PENDIENTE:` es detectado antes de compilar.

---

## 2. Cómo Añadir o Modificar un Proyecto

1. Abrir `src/data/portfolioData.ts`.
2. En el arreglo `projects`, añadir un objeto que cumpla con el tipo `Project`:
   ```typescript
   {
     id: "nuevo-proyecto-slug", // Minúsculas, números y guiones únicamente
     title: "Título Descriptivo",
     summary: "Resumen conciso en 1-2 oraciones.",
     problem: "Descripción técnica del problema y restricciones.",
     contribution: "Rol personal específico e implementación.",
     decisions: [
       "Decisión de arquitectura 1",
       "Decisión de arquitectura 2"
     ],
     technologies: ["Jakarta EE", "Microservicios"], // Solo tecnologías de ALLOWED_TECHNOLOGIES
     category: "Streaming & Big Data",               // Solo categorías de ALLOWED_CATEGORIES
     status: "activo",
     featured: true,
     links: {
       demo: "https://demo.apiscusco.com"             // URL HTTPS obligatoria
     },
     results: [
       "Resultado medible o cuantitativo comprobado 1",
       "Resultado medible 2"
     ]
   }
   ```
3. Ejecutar la suite de validación:
   ```bash
   npm run verify
   ```
   Si la validación tiene éxito, Astro generará automáticamente la nueva página en `/proyectos/nuevo-proyecto-slug/` y actualizará el catálogo y los filtros.

---

## 3. Comandos de Trabajo Diario

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida en `http://localhost:4321` |
| `npm run test` | Ejecuta las pruebas unitarias y de esquema con Vitest |
| `npm run test:e2e` | Ejecuta las pruebas automatizadas de navegación, accesibilidad y temas en Chromium |
| `npm run validate:data` | Audita la integridad de datos y bloquea marcadores `PENDIENTE:` |
| `npm run build` | Compila el sitio estático optimizado en la carpeta `dist/` |
| `npm run preview` | Previsualiza la salida estática de `dist/` localmente |
| `npm run verify` | Ejecuta la cadena completa de validación (datos, tipos, tests, build y enlaces) |

---

## 4. Política Anti-PENDIENTE:
Por diseño, la compilación de producción (`npm run build` / `npm run verify`) **fallará intencionalmente** si encuentra la palabra clave `PENDIENTE:` en cualquier campo de datos publicable.
- En desarrollo: Se permite para identificar campos faltantes.
- En producción: Asegura que jamás se filtre contenido provisional o datos ficticios a internet.

