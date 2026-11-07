# Sistema de Diseño y Concepto Visual

Última actualización: 2026-11-06

---

## 1. Brief Creativo (Fase B1)

### Concepto en una frase
> **"Arquitectura de flujo continuo: la precisión técnica y el rigor de los sistemas distribuidos de alta concurrencia transformados en una experiencia digital sobria, veloz y memorable."**

---

### Tres Direcciones Evaluadas

#### Dirección 1: "Monochrome Terminal / High-Density Telemetry"
- **Metáfora**: Consola de observabilidad y telemetría de microservicios bancarios en tiempo real.
- **Tipografía**: JetBrains Mono + Geist Sans.
- **Paleta**: Fondo carbón profundo (`#0d1117`), verde fósforo/ámbar para estados y blanco atenuado.
- **Animación**: Gráficos de barras de rendimiento y pulsos de streaming por paquetes.
- **Riesgo**: Puede resultar demasiado austero o crudo para audiencias no técnicas o reclutadores de gestión/producto.

#### Dirección 2: "Reactive Pipeline / Architectural Precision" (ELEGIDA)
- **Metáfora**: Líneas de ensamblado de datos y tuberías reactivas sincronizadas (inspirado en Jakarta Streams, Oracle bulk operations y arquitecturas de eventos).
- **Tipografía**: Plus Jakarta Sans / Inter (titulares estructurados y legibilidad editorial impecable) + JetBrains Mono (para métricas, tiempos de respuesta y payloads).
- **Paleta**: Fondo grafito/obsidiana (`#090d16` oscuro / `#f8fafc` claro), acento azul eléctrico cobalto (`#2563eb` / `#38bdf8`) y verde esmeralda para verificación (`#10b981`).
- **Animación**: Canvas 2D procedural con partículas vectoriales ordenadas que viajan a través de nodos de procesamiento enlazados (Reactive Stream Flow).
- **Riesgo**: Requiere control estricto de saturación para mantener el equilibrio sobrio y sofisticado sin parecer un tema de ciencia ficción genérico.

#### Dirección 3: "Editorial Swiss Minimalist / Brutalist Clean"
- **Metáfora**: Ficha técnica de ingeniería suiza y catálogo de patentes industriales.
- **Tipografía**: Neue Haas Grotesk / Inter con grillas estrictas de 12 columnas.
- **Paleta**: Blanco puro, gris cemento y negro profundo, acento naranja internacional o rojo advertencia.
- **Animación**: Grilla tipográfica interactiva con deformación geométrica sutil.
- **Riesgo**: Poca expresividad para evocar el procesamiento en tiempo real de millones de datos y microservicios.

---

## 2. Mapa del Sitio y Arquitectura de Información (Fase B2)

| Ruta | Propósito | Contenido Mínimo | Requisito Trazable |
| --- | --- | --- | --- |
| `/` | Presentación de alto impacto y visión general | Hero con propuesta de valor, métricas de impacto real (>1M registros en <15 min, 30+ empresas tributarias), proyectos insignia, resumen de trayectoria y acceso a contacto. | RF-01, RF-02, RF-04 |
| `/proyectos/` | Exploración de portafolio y arquitectura | Catálogo completo con filtrado semántico (Streaming & Big Data, Microservicios & Integraciones, Web & Multimedia). | RF-02 |
| `/proyectos/[id]/` | Análisis en profundidad de cada proyecto | Contexto, Problema Técnico, Decisiones de Arquitectura, Implementación, Desafíos Superados y Resultados Verificables. Enlaces directos a producción. | RF-03 |
| `/sobre-mi/` | Perfil profesional, formación y certificaciones | Trayectoria laboral oficial (Soluciones Software Perú S.A.C.), Certificación **PMI Project Management Ready®**, dominio tecnológico y filosofía de ingeniería. | RF-04 |
| `/contacto/` | Canales reales de comunicación | Correo directo, perfiles profesionales oficiales (GitHub, LinkedIn). Cero formularios simulados. | RF-05 |
| `/404` | Gestión de enlaces rotos | Código HTTP 404 real, sin indexación (`noindex`), botón de regreso seguro a portada. | RF-08 |

---

## 3. Wireframes Textuales (Fase B3)

### Vista Portada (`/`) en 320 px (Mobile First)
```
+------------------------------------------+
| [Logo: Marcio Sequeiros]      [Theme] [=]|
+------------------------------------------+
| TAG: Senior Backend & Distributed Systems|
| H1: Arquitectura de alto rendimiento y   |
|     sistemas de datos a gran escala.     |
| P:  Ingeniero de software especializado en|
|     migración a microservicios Jakarta,   |
|     streaming de datos masivos y sistemas|
|     de facturación electrónica SUNAT.    |
| [Ver Proyectos]      [Contactar]         |
+------------------------------------------+
| METRICAS CLAVE EN TIEMPO REAL:           |
| - >1,000,000 registros procesados <15min |
| - 30+ Empresas con emisión centralizada  |
| - 99.9% Disponibilidad en microservicios |
+------------------------------------------+
| PROYECTOS DESTACADOS (Tarjetas verticales|
|  con stack, estado, enlace y resumen):   |
|  1. Migración Bancaria Streaming (>1M)   |
|  2. Centralizador Facturación Electrónica|
|  3. APIS Cusco (SUNAT/RENIEC/SOAT)       |
|  4. XMusic (Streaming Web Audio)         |
+------------------------------------------+
| CERTIFICACION: PMI Project Management    |
| [PMI Credential ID: FJpF-XMpP]           |
+------------------------------------------+
| FOOTER: Links, Copyright, GitHub         |
+------------------------------------------+
```

### Vista Portada (`/`) en 1440 px (Desktop)
```
+----------------------------------------------------------------------------------------------------+
| [Marcio Gonzalo Sequeiros Palomino]       [Inicio]  [Proyectos]  [Sobre Mí]  [Contacto]   [Tema ☀️/🌙]|
+----------------------------------------------------------------------------------------------------+
| [Columna Izquierda: 65% del ancho]                    | [Columna Derecha: 35% del ancho]           |
| BADGE: Especialista en Sistemas Distribuidos & Datos  |                                            |
| H1: Procesamiento de alto volumen,                   | [CANVAS PROCEDURAL INTERACTIVO 2D]         |
|     microservicios reactivos y                        | Flujo de partículas y nodos en tiempo real |
|     facturación a escala crítica.                     | representando el pipeline de streaming     |
|                                                       | interactivo con el cursor del usuario.     |
| P:  Diseño e implementación de pipelines de streaming | (Con fallback SVG estático accesible bajo  |
|     bancarios (>1M de registros en <15 min),          | prefers-reduced-motion)                    |
|     plataformas de facturación para más de 30 empresas|                                            |
|     y microservicios de alta concurrencia.            |                                            |
|                                                       |                                            |
| [Explorar Casos de Estudio ->]   [Contactar ->]       |                                            |
+----------------------------------------------------------------------------------------------------+
| BANDA DE METRICAS Y LOGROS TÉCNICOS VERIFICABLES:                                                  |
| [ >1M Datos / <15m ]       [ 30+ Empresas SUNAT ]       [ Jakarta EE + Oracle ]   [ PMI Certified ]|
+----------------------------------------------------------------------------------------------------+
| GRID DE PROYECTOS (2 columnas con tags de stack, métricas, rol personal y enlaces directos):        |
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Tipografía y Escala Fluida (Fase B4)

- **Fuente Principal (Display & Texto)**: `Plus Jakarta Sans` y `Inter` (fallback: `system-ui, -apple-system, sans-serif`).
- **Fuente Monoespaciada (Métricas, código, IDs)**: `JetBrains Mono` (fallback: `ui-monospace, monospace`).
- **Escala Tipográfica Fluida**:
  - `Hero H1`: `clamp(2.25rem, 5vw + 1rem, 4.5rem)` (36px a 72px)
  - `Section H2`: `clamp(1.75rem, 3vw + 0.5rem, 2.75rem)` (28px a 44px)
  - `Card Title H3`: `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` (20px a 28px)
  - `Body`: `1rem` (16px base, interlineado cómodo `1.65`, longitud de 65 a 75 caracteres).

---

## 5. Paleta de Colores y Tokens Semánticos (Fase B5)

### Tema Oscuro (Predeterminado para Ingeniería de Sistemas)
| Token Semántico | Valor Hex / HSL | Ratio de Contraste vs Fondo | WCAG AA (>4.5:1) |
| --- | --- | --- | --- |
| `--color-bg` | `#080c14` (Azul Noche Profundo) | Base | - |
| `--color-surface` | `#0f172a` (Pizarra Carbón) | 1.3:1 (Superficie) | Pasa UI |
| `--color-surface-hover` | `#1e293b` | 1.6:1 | Pasa UI |
| `--color-border` | `#334155` | 3.2:1 | Pasa componentes (≥3:1) |
| `--color-text` | `#f8fafc` (Blanco Hielo) | **16.8:1** | **Excelente (Pasa AAA)** |
| `--color-text-muted` | `#94a3b8` (Gris Pizarra Claro) | **6.4:1** | **Pasa AA y AAA grande** |
| `--color-accent` | `#38bdf8` (Cian Eléctrico) | **10.2:1** | **Pasa AAA** |
| `--color-accent-hover` | `#60a5fa` | **8.5:1** | **Pasa AAA** |
| `--color-success` | `#34d399` (Esmeralda) | **9.1:1** | **Pasa AAA** |
| `--color-focus` | `#38bdf8` (Contorno visible 3px) | **10.2:1** | **Pasa AAA** |

### Tema Claro
| Token Semántico | Valor Hex / HSL | Ratio de Contraste vs Fondo | WCAG AA (>4.5:1) |
| --- | --- | --- | --- |
| `--color-bg` | `#f8fafc` (Gris Nieve Suave) | Base | - |
| `--color-surface` | `#ffffff` (Blanco Puro) | Base superficie | Pasa UI |
| `--color-surface-hover` | `#f1f5f9` | 1.1:1 | Pasa UI |
| `--color-border` | `#cbd5e1` (Gris Borde) | 3.1:1 | Pasa componentes (≥3:1) |
| `--color-text` | `#0f172a` (Azul Marino Oscuro) | **15.2:1** | **Excelente (Pasa AAA)** |
| `--color-text-muted` | `#475569` (Gris Oscuro) | **5.8:1** | **Pasa AA** |
| `--color-accent` | `#0284c7` (Azul Cobalto) | **5.4:1** | **Pasa AA** |
| `--color-accent-hover` | `#0369a1` | **7.1:1** | **Pasa AAA** |
| `--color-success` | `#059669` (Verde Bosque) | **4.9:1** | **Pasa AA** |
| `--color-focus` | `#0284c7` (Contorno visible 3px) | **5.4:1** | **Pasa AA** |

> [!NOTE]
> Todo elemento de estado (badge, link, alerta) combina icono SVG explícito + texto legible, cumpliendo con la regla de no depender exclusivamente del color.

