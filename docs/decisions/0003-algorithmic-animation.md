# 0003. Selección de la Técnica y Concepto de Animación Algorítmica
Fecha: 2026-11-06
Estado: aceptada

## Contexto
El perfil técnico de Marcio Gonzalo Sequeiros Palomino se enfoca en sistemas de procesamiento de datos por lotes/streaming a gran escala (>1M de registros bancarios procesados en <15 min), pasarelas transaccionales y microservicios de alta concurrencia. La animación algorítmica debe materializar esta identidad: un sistema de flujo de datos continuo (*Reactive Data Stream Flow / Constelación de Nodos Pipeline*), sin penalizar el rendimiento ni la accesibilidad.

## Opciones evaluadas
1. **Canvas 2D nativo con TypedArrays (`Float32Array`)**:
   - *Ventajas*: Consumo mínimo de memoria, sin sobrecarga de shaders WebGL ni dependencias externas (Three.js/Pixi.js pesadas de >150 kB), 60/120 fps constantes en equipos móviles y de escritorio, control absoluto de ciclos de vida (`requestAnimationFrame` con delta time y pausa inteligente).
   - *Desventajas*: Requiere cálculo matemático manual de partículas y vectores.
2. **WebGL / Three.js**:
   - *Ventajas*: Efectos 3D complejos.
   - *Desventajas*: Inicialización pesada (~300-500 KB de bundle), sobrecalentamiento de GPU en dispositivos móviles, mayor consumo de batería, complejidad innecesaria para un fondo procedural 2D/2.5D.
3. **CSS / SVG animado con SMIL**:
   - *Ventajas*: Declarativo.
   - *Desventajas*: Ineficiente para cientos de partículas dinámicas interactivas (miles de nodos en el DOM provocan recálculo de estilo continuo y caídas de fps).

## Decisión
Se elige **Canvas 2D nativo sin librerías**, implementado con:
- `Float32Array` preasignado (cero recolección de basura o asignaciones en el bucle).
- Delta time para regular la velocidad con independencia de la frecuencia de refresco (60Hz, 120Hz, 144Hz).
- Indexación espacial para el cálculo de proximidad entre nodos (evita complejidad O(N²)).
- Pausa estricta en segundo plano (`document.visibilitychange`) y cuando el canvas sale de pantalla (`IntersectionObserver`).
- Alternativa estática SVG para usuarios con `prefers-reduced-motion: reduce` o navegadores sin soporte 2D.
- `aria-hidden="true"` y `pointer-events: none` para no entorpecer la interacción del usuario.

## Consecuencias
- Presupuesto de cálculo por frame ≤ 3 ms.
- Bundle transferido: ~3 KB de JavaScript puro.
- Experiencia visual fluida, sofisticada y directamente vinculada a la ingeniería de streaming.

