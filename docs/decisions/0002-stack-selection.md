# 0002. Selección del Stack Tecnológico
Fecha: 2026-11-06
Estado: aceptada

## Contexto
El sitio web debe presentar proyectos de ingeniería técnica y experiencia de alto volumen de datos (streaming de >1M de registros bancarios, facturación electrónica para 30+ empresas, APIs de consulta masiva). Se requiere máxima velocidad de carga (LCP ≤ 2.5s, 0 JS innecesario), SEO óptimo, accesibilidad WCAG 2.2 AA, validación tipada estricta de datos y soporte para animaciones algorítmicas procedurales.

## Opciones evaluadas
1. **Astro + TypeScript + Tailwind CSS**:
   - *Ventajas*: Arquitectura de islas, 0 kB de JavaScript transferido por defecto para contenido estático, generación SSG nativa ultrarrápida, validación de contenido en tiempo de compilación con Zod, soporte de CSS utilitario moderno con purge automático.
   - *Desventajas*: Curva mínima de sintaxis `.astro` (compensada por su simplicidad semántica HTML).
2. **Next.js (App Router)**:
   - *Ventajas*: Popularidad en el ecosistema React.
   - *Desventajas*: Exceso de JavaScript enviado al cliente (sobrecarga de hidratación React ~80-120 kB innecesaria para un portafolio estático), mayor complejidad operativa.
3. **Vite + Vanilla TypeScript (SPA puro)**:
   - *Ventajas*: Control total sin dependencias de framework.
   - *Desventajas*: No genera HTML estático prerenderizado para cada ruta profunda sin plugins complejos de SSG, lo que penaliza el SEO, el LCP y la accesibilidad sin JS.

## Decisión
Se elige **Astro (v5) + TypeScript + Tailwind CSS v3/v4**.
Motivo:
- Prioridad 1 y 3 (Correctitud, rendimiento y fiabilidad): Cero costo de hidratación en la lectura de contenido.
- Prioridad 4 (Diferenciación visual): El canvas algorítmico se carga como una isla aislada e independiente sin bloquear la renderización del texto crítico.
- Prioridad 6 (Mantenibilidad): Tipado estricto de extremo a extremo y validación preventiva de esquemas.

## Consecuencias
- Todo el marcado estructural es HTML semántico accesible puro.
- El bundle de JavaScript transferido en la carga inicial de la portada se reduce a < 15 KB (exclusivamente para lógica de cambio de tema y canvas procedimental).

## Fuentes
- `https://astro.build/blog/astro-5/` (Noviembre 2026).

