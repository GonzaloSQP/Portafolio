# Blog y bitácora de trabajo (censurado)

El blog (`/blog`) es la bitácora de **lo que se está trabajando ahora**: objetivos,
decisiones y próximos pasos, con los datos clave censurados. Las **Notas de
Ingeniería** (`/notas`) quedan reservadas para casos ya cerrados con evidencia.

## Política de censura

1. **Sin clientes ni empleadores**: se usa el sector genérico (p. ej. «Sector financiero»).
2. **Sin datos internos**: nada de esquema de BD, consultas exactas, endpoints,
   certificados, claves o configuración de despliegue.
3. **Métricas como rangos**: órdenes de magnitud, no cifras exactas de producción.
4. **Sin datos personales**: solo los canales de contacto ya públicos del portafolio.
5. **Sin NDA**: si el trabajo está bajo confidencialidad, solo se comparte el patrón
   de arquitectura y las decisiones.

La validación automática (`scripts/validateData.ts`) bloquea el build si una
entrada del blog contiene URLs, correos, nombres de empleadores, secretos o IPs
internas. Los tests de `tests/blog.test.ts` refuerzan la misma regla.

## Cómo agregar una entrada

1. Añade un objeto a `blogData` en `src/data/blogData.ts` siguiendo `BlogPostSchema`
   (`src/schemas/blogSchema.ts`): `slug`, `title`, `summary`, `status`
   (`en-curso` | `en-revision` | `publicable`), `progress`, `sector`, `stack`,
   `tags`, `objectives`, `decisions`, `censoredNotes` (qué se retiró),
   `nextSteps` y, opcionalmente, `relatedProjectId`.
2. Las páginas `/blog` y `/blog/[slug]` se generan automáticamente.
3. Ejecuta `npm run verify`: valida datos, tipos, tests, build y enlaces.

## Diferencias con Notas

| | Blog (`/blog`) | Notas (`/notas`) |
| --- | --- | --- |
| Estado | Trabajo en curso | Caso cerrado |
| Datos | Censurados por política | Evidencia pública verificable |
| Objetivo | Mostrar el proceso | Demostrar el resultado |
