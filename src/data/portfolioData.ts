import type { Profile } from '../schemas/portfolioSchema';

export const portfolioData: Profile = {
  name: "Marcio Gonzalo Sequeiros Palomino",
  age: 27,
  title: "Arquitecto de Software & Ingeniero Backend",
  location: "Cusco, Perú",
  summary: "Especialista en sistemas distribuidos, arquitecturas limpias y plataformas de misión crítica. Con experiencia comprobada modernizando arquitecturas financieras a microservicios Jakarta EE y optimizando consultas Oracle SQL masivas; diseñando plataformas ERP y de facturación electrónica multi-tenant en Go y .NET 8 con pre-auditoría UBL 2.1 para más de 30 empresas; construyendo suites de microservicios de alta concurrencia con conmutación por error entre múltiples proveedores en Node.js/TypeScript (APISCUSCO); y desarrollando plataformas de streaming multimedia de alta fidelidad con búsqueda vectorial semántica en PostgreSQL (pgvector) y FastAPI (AuraStream).",
  specialties: [
    "Sistemas Distribuidos & Microservicios",
    "Clean Architecture & Principios SOLID (Go, .NET, Node.js)",
    "Facturación Electrónica SUNAT (UBL 2.1, XSD, Firma Digital X.509)",
    "Bases de Datos & Búsqueda Vectorial (PostgreSQL, pgvector, Oracle SQL)",
    "Streaming Reactivo & Procesamiento Asíncrono (Jakarta EE, Celery, Redis)",
    "Seguridad, Hardening & Alta Disponibilidad (Turnstile, memfd, Multi-provider Failover)"
  ],
  contact: {
    email: "chalot_6@hotmail.com",
    phone: "+51 929 803 589",
    github: "https://github.com/GonzaloSQP",
    linkedin: "https://linkedin.com/in/marciosequeiros"
  },
  education: [
    {
      institution: "Universidad Continental",
      degree: "Grado en Ingeniería, Ingeniería de Sistemas e Informática",
      period: "2024 - 2029 (En curso)",
      detail: "Formación universitaria orientada a arquitectura de software, modelamiento de sistemas distribuidos y gestión estratégica de tecnologías de información."
    },
    {
      institution: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
      degree: "Técnico Analista de Sistemas, Análisis de Sistemas Informáticos",
      period: "2018 - 2020 (Egresado)",
      detail: "Fundamentos sólidos de algoritmia, estructuras de datos, diseño de bases de datos relacionales y análisis de requerimientos de software."
    }
  ],
  certifications: [
    {
      id: "pmi-pm-ready",
      name: "PMI Project Management Ready®",
      issuer: "Project Management Institute (PMI)",
      issueDate: "19 de Diciembre de 2025",
      credentialId: "FJpF-XMpP",
      verificationUrl: "https://verify.certiport.com",
      status: "vigente"
    }
  ],
  experience: [
    {
      company: "Cooperativa de Ahorro y Crédito Los Andes (COOPAC Los Andes)",
      role: "Desarrollador Backend & Especialista en Migración",
      period: "Abril 2025 - Julio 2025",
      location: "Abancay, Apurímac, Perú",
      highlights: [
        "Liderazgo técnico en la modernización de reporteador financiero monolítico en Visual Basic hacia microservicios Jakarta EE con REST API.",
        "Resolución de cuellos de botella críticos: reescritura de consultas Oracle SQL de más de 300 líneas con planes de ejecución degradados y creación de índices compuestos sobre fechas y estados de conciliación.",
        "Diseño e implementación de arquitectura de streaming reactivo por cursores JDBC (FETCH_FORWARD) con FetchSize de 2,500 para procesar más de 1,000,000 de registros en menos de 15 minutos sin desbordar memoria Heap JVM (acotada a 380 MB estables).",
        "Modularización de servicios transaccionales de pago de servicios y conciliación bancaria con idempotencia a nivel de registro."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios", "REST APIs"]
    },
    {
      company: "Soluciones de Software SAC (SSPSAC)",
      role: "Desarrollador Backend & Arquitectura de Facturación",
      period: "Mayo 2021 - Abril 2025 (4 años)",
      location: "Cusco, Perú",
      highlights: [
        "Desarrollo y evolución del centralizador de comprobantes electrónicos (SSP Envíos) para más de 30 empresas corporativas de comercio, retail y servicios.",
        "Diseño del servidor de workers asíncronos para pre-auditoría de reglas UBL 2.1 en memoria contra esquemas XSD oficiales antes de la firma digital, reduciendo rechazos en más del 95%.",
        "Módulos integrales de contingencia tributaria: resúmenes diarios de boletas (RC), gestión de bajas, validación de guías de remisión electrónica (GRE) y reconciliación masiva de CDRs con API REST de SUNAT.",
        "Automatización de despliegues ClickOnce con verificación de configuración cifrada hacia servidores Oracle Linux."
      ],
      technologies: ["C#", "VB.NET", "SQL Server", "SUNAT API", "REST APIs", "Visual Studio"]
    },
    {
      company: "Proyectos Independientes & Emprendimiento (APISCUSCO / AuraStream / FacturacionSOLID)",
      role: "Arquitecto de Software & Desarrollador Principal",
      period: "2024 - Presente",
      location: "Cusco, Perú",
      highlights: [
        "Arquitectura y despliegue en producción de APISCUSCO (apis.apiscusco.com): plataforma SaaS de consultas documentarias (DNI, RUC, Placas, SOAT) con motor de conmutación por error (failover) entre 7+ proveedores y latencia de 95 ms.",
        "Diseño de FacturacionSOLID: plataforma ERP modular en Go 1.26 bajo Clean Architecture con Google Wire, dominio puro desacoplado, precisión financiera decimal exacta y PostgreSQL 16 multi-tenant híbrido.",
        "Desarrollo de AuraStream (musica.apiscusco.com): plataforma privada de streaming multimedia en FastAPI con búsqueda vectorial semántica mediante pgvector, workers Celery/Redis, cliente SvelteKit y app nativa Android en Kotlin."
      ],
      technologies: ["Go", "Python", "FastAPI", "TypeScript", "Node.js", "PostgreSQL", "pgvector", "Redis", "Docker", "Next.js", "Android (Kotlin)"]
    }
  ],
  projects: [
    {
      id: "banca-streaming-jakarta",
      title: "Migración de Reporteador Bancario & Streaming de Datos",
      summary: "Modernización de monolito Visual Basic a microservicios Jakarta EE con streaming reactivo por cursores de más de un millón de registros bancarios en menos de 15 minutos.",
      problem: "El sistema financiero en Visual Basic sufría bloqueos críticos por consultas Oracle SQL de más de 300 líneas sin indexación compuesta, provocando tiempos de espera de más de 4 horas y saturación de memoria en periodos de cierre contable.",
      contribution: "Liderazgo en la reescritura de planes de ejecución en Oracle SQL, introducción del índice compuesto sobre fechas y estados, y diseño de un pipeline de streaming reactivo por cursores JDBC con FetchSize de 2,500 en Jakarta EE para inserciones concurrentes e idempotentes.",
      decisions: [
        "Sustitución de lecturas completas y paginación con OFFSET por cursor streaming (ResultSet.FETCH_FORWARD) para acotar la memoria Heap a 380 MB estables.",
        "Procesamiento en lotes atómicos de 2,500 registros con transaccionalidad independiente y control estricto de idempotencia.",
        "Optimización de planes de ejecución en Oracle reduciendo el costo de 42,850 a 124 y las lecturas lógicas de 1.8M a bloques indexados.",
        "Desacoplamiento de módulos de pago de servicios en microservicios independientes orientados al dominio."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios", "REST APIs"],
      category: "Streaming & Big Data",
      status: "Entregado",
      statusDetail: "Sector Financiero · Confidencial (Bajo NDA)",
      featured: true,
      ctaText: "Ver arquitectura y pipeline de streaming →",
      baseline: "Reporteador legado en Visual Basic tardaba más de 4 horas con consultas Oracle no indexadas de 300+ líneas y caídas recurrentes por OutOfMemory en periodos de cierre.",
      metricOutcome: "14 minutos y 20 segundos para 1,000,000+ registros procesados con Heap JVM plano en 380 MB.",
      measurementMethod: "Medición instrumentada con Oracle AWR / SQL Trace, Java VisualVM (análisis de Heap JVM) y pruebas de carga concurrente.",
      architectureFlow: [
        "Oracle DB (Cursor Streaming)",
        "Jakarta EE (Buffer Reactivo Chunks de 2,500)",
        "Pipeline Concurrente en Lote",
        "Core Bancario / Actualización Transaccional"
      ],
      benchmarks: [
        {
          label: "Tiempo de Procesamiento (>1M registros)",
          before: "4h 15m (con caídas)",
          after: "14m 20s",
          improvement: "94.4% más rápido"
        },
        {
          label: "Consumo de Memoria Heap JVM",
          before: "3.8 GB (riesgo OOM)",
          after: "380 MB estables",
          improvement: "90% menos memoria"
        },
        {
          label: "Tasa de Rendimiento Concurrente",
          before: "~65 registros/s",
          after: "> 1,200 registros/s",
          improvement: "18.4x throughput"
        }
      ],
      links: {},
      results: [
        "Tiempo de procesamiento reducido de 4h 15m a 14m 20s (94.4% de reducción de tiempo de ejecución).",
        "Consumo de memoria Heap acotado a 380 MB estables (reducción del 90% respecto a los 3.8 GB del monolito).",
        "Tasa de rendimiento transaccional incrementada de ~65 reg/s a >1,200 reg/s con conciliación idempotente.",
        "Cero tiempo de inactividad durante la migración y coexistencia progresiva hacia Jakarta EE."
      ],
      tradeoffs: [
        {
          decision: "Streaming por Cursores JDBC vs Paginación OFFSET/LIMIT",
          chosen: "Cursor Streaming con FetchSize de 2,500 registros y puntero forward-only",
          discarded: "Paginación tradicional con OFFSET/LIMIT en Oracle SQL",
          why: "Con más de un millón de registros, OFFSET sufre degradación cuadrática O(N) al obligar a Oracle a escanear y descartar millones de bloques lógicos en cada página. El streaming por cursor mantiene un único puntero activo con consumo de memoria constante en la JVM."
        },
        {
          decision: "Procesamiento por Chunks Concurrentes vs Transacción Monolítica Única",
          chosen: "Procesamiento en lotes atómicos de 2,500 registros con transaccionalidad independiente",
          discarded: "Una única transacción de base de datos abarcando el lote completo de 1M",
          why: "Una transacción global retenía bloqueos de fila durante horas y saturaba el espacio de UNDO/Rollback tablespace en Oracle. Al fragmentar en chunks desacoplados con control de idempotencia, se garantiza que ante cualquier fallo solo se reintenta el lote específico de 2,500 registros."
        }
      ],
      codeSnippet: {
        title: "Comparación de Planes de Ejecución (Oracle SQL Trace)",
        language: "sql",
        code: `-- PLAN ANTERIOR: Monolito Visual Basic (Consulta de 340 líneas sin índices)
-- SELECT * FROM MOVIMIENTOS WHERE ESTADO_CONCIL = 'P' AND FECHA_CORTE <= :1;
-- -----------------------------------------------------------------------------------------
-- | Id | Operation               | Name             | Rows   | Bytes  | Cost (%CPU) | Time     |
-- |  0 | SELECT STATEMENT        |                  |  1.15M |  1.2GB | 42850   (4) | 04:15:20 |
-- |* 1 |  TABLE ACCESS FULL      | MOVIMIENTOS_HIST |  1.15M |  1.2GB | 42850   (4) | 04:15:20 |
-- -----------------------------------------------------------------------------------------
-- Predicate Information: Filter(ESTADO_CONCIL='P' AND FECHA_CORTE<=:1) - Lecturas lógicas: 1,840,200

-- PLAN OPTIMIZADO: Microservicio Jakarta EE + Streaming de Cursores
-- SELECT /*+ INDEX(m IDX_MOV_FECHA_ESTADO) */ m.ID, m.CUENTA, m.MONTO, m.FECHA 
-- FROM MOVIMIENTOS_HIST m WHERE m.FECHA_CORTE <= :1 AND m.ESTADO_CONCIL = 'P';
-- -----------------------------------------------------------------------------------------
-- | Id | Operation                    | Name                 | Rows   | Cost (%CPU) | Time     |
-- |  0 | SELECT STATEMENT             |                      |  1.15M |   124   (1) | 00:14:20 |
-- |  1 |  TABLE ACCESS BY INDEX ROWID | MOVIMIENTOS_HIST     |  2,500 |   124   (1) | 00:00:01 |
-- |* 2 |   INDEX RANGE SCAN           | IDX_MOV_FECHA_ESTADO |  2,500 |     4   (0) | 00:00:01 |
-- -----------------------------------------------------------------------------------------
-- Cursor Fetch Size: 2,500 | Memoria Heap JVM: 380 MB estables | Throughput: > 1,200 reg/s`,
        explanation: "La reescritura de la consulta y la introducción del índice compuesto sobre (FECHA_CORTE, ESTADO_CONCIL), combinado con un Cursor FetchSize de 2,500 en JDBC, redujo el costo de 42,850 a 124 y el tiempo de más de 4 horas a 14 minutos y 20 segundos."
      },
      lessonsLearned: [
        "En procesamiento masivo en JVM, el cuello de botella crítico rara vez es la CPU: el 90% de la latencia y caídas provienen de la creación masiva de objetos efímeros en el Heap provocando pausas de Stop-the-World en el recolector de basura.",
        "El tuning de SQL y el diseño de concurrencia en la capa de microservicios son inseparables: sin afinar los buffers de red (fetch-size) del driver JDBC, el pipeline reactivo se ahoga por roundtrips de red excesivos.",
        "La idempotencia a nivel de registro mediante hashes de estado es el único seguro real frente a fallos parciales durante procesamiento batch concurrente en el sector bancario."
      ]
    },
    {
      id: "centralizador-facturacion-electronica",
      title: "SSP Envíos SUNAT — Centralizador Tributario & Worker Server",
      summary: "Plataforma empresarial en .NET 8 con servidor de workers asíncronos para pre-auditoría UBL 2.1, resúmenes diarios de boletas (RC), guías de remisión (GRE) y reconciliación de CDRs para más de 30 empresas.",
      problem: "Múltiples empresas con distintas reglas de negocio enfrentaban hasta un 25% de comprobantes fiscales rechazados o con observaciones SUNAT debido a discrepancias en catálogos y esquemas XML antes de la firma digital, además de la necesidad de operar sin interrupción ante caídas de la sede electrónica.",
      contribution: "Arquitectura y desarrollo del motor centralizador: pre-auditoría de reglas de negocio UBL 2.1 contra esquemas XSD oficiales, servidor de workers asíncronos en segundo plano para despacho por lotes, verificación masiva de CDRs vía API REST y despliegue ClickOnce automatizado con payload cifrado a servidores Oracle Linux.",
      decisions: [
        "Aislamiento multi-tenant con custodia y validación en memoria de certificados criptográficos X.509 por empresa cliente.",
        "WorkerServer desacoplado para despacho asíncrono y resolución de comprobantes en estado 'en duda' tras caídas o timeouts SOAP de SUNAT.",
        "Módulo integral de contingencia: resúmenes diarios de boletas (RC), gestión de bajas y validación de guías de remisión electrónica (GRE).",
        "Distribución y actualización silenciosa mediante ClickOnce con verificación de integridad de configuración cifrada."
      ],
      technologies: ["C#", "VB.NET", "SQL Server", "SUNAT API", "REST APIs", "Visual Studio"],
      category: "Facturación Electrónica & Tributario",
      status: "En Producción",
      statusDetail: "Centralizador multi-tenant activo · 30+ empresas corporativas",
      featured: true,
      ctaText: "Ver motor de auditoría y arquitectura →",
      baseline: "~25% de comprobantes fiscales sufrían observaciones o rechazos por SUNAT debido a inconsistencias de catálogo o errores de esquema XML UBL 2.1.",
      metricOutcome: "Reducción del 95% en comprobantes rechazados (tasa de rechazo en producción < 1.2%).",
      measurementMethod: "Métricas de trazabilidad en base de datos SQL Server, logs de auditoría de CDRs y telemetría de WorkerServer.",
      architectureFlow: [
        "Puntos de Venta (30+ Empresas)",
        "Motor de Pre-Auditoría XSD UBL 2.1",
        "WorkerServer Asíncrono en Background",
        "Firma X.509 & Web Services SUNAT",
        "Conciliador de CDRs y Reintentos"
      ],
      benchmarks: [
        {
          label: "Tasa de Rechazo / Observaciones SUNAT",
          before: "24.8% rechazados",
          after: "< 1.2% rechazados",
          improvement: "95.2% reducción de fallos"
        },
        {
          label: "Tiempo de Despacho y Firma por Lote",
          before: "45 a 60 segundos",
          after: "3.2 segundos",
          improvement: "14x más rápido"
        },
        {
          label: "Trazabilidad de Constancias CDR",
          before: "Revisión manual de rechazos",
          after: "100% automatizado con alertas",
          improvement: "Conciliación en tiempo real"
        }
      ],
      links: {},
      results: [
        "Reducción del 95.2% en comprobantes rechazados por SUNAT (de una tasa de error histórica del 24.8% a menos del 1.2% auditado en producción).",
        "Tiempo de despacho y firmado digital por lote reducido de 45-60s a 3.2s.",
        "Gestión centralizada de comprobantes fiscales operando en más de 30 empresas de comercio, manufactura y servicios.",
        "Conciliación y almacenamiento 100% automatizado de constancias CDR y firmas criptográficas."
      ],
      tradeoffs: [
        {
          decision: "Pre-Auditoría UBL 2.1 en Memoria vs Validación Asíncrona Post-Firma",
          chosen: "Validación de sintaxis, reglas tributarias y catálogos oficiales en memoria previo a la firma digital",
          discarded: "Firmar digitalmente todos los XML y esperar la validación en los servidores de SUNAT",
          why: "Firmar con certificados X.509 consume ciclos criptográficos significativos. Si el comprobante contiene una discrepancia de catálogo (ej. código de afectación al IGV o tipo de operación), enviarlo a SUNAT resulta en un CDR de rechazo que invalida el correlativo legal. La pre-auditoría filtra el 95% de los errores antes de gastar recursos criptográficos."
        },
        {
          decision: "WorkerServer Desacoplado vs Inserción Síncrona a Web Service",
          chosen: "WorkerServer asíncrono en segundo plano con reintentos con retroceso exponencial",
          discarded: "Llamada HTTP síncrona directa a los endpoints SOAP/REST de SUNAT desde la interfaz de usuario",
          why: "La sede electrónica de SUNAT experimenta caídas e intermitencias con latencias de más de 15 segundos en horas de alta facturación. Desacoplar el despacho permite a las empresas emitir comprobantes a sus clientes en <200ms mientras el WorkerServer gestiona los envíos y la recepción de CDRs en segundo plano."
        }
      ],
      codeSnippet: {
        title: "Motor de Validación y Pre-Auditoría contra Esquemas XSD SUNAT",
        language: "csharp",
        code: `// Validación previa en memoria contra esquemas XSD oficiales y catálogos SUNAT
public async Task<ResultadoValidacion> PreAuditarComprobanteAsync(ComprobanteFiscal documento)
{
    // 1. Verificación de integridad de catálogos tributarios (Catálogo 07: Afectación IGV)
    var erroresCatalogo = ValidarCodigosAfectacionIGV(documento.Items);
    if (erroresCatalogo.Count > 0)
    {
        return ResultadoValidacion.Rechazado("CATALOG_MISMATCH", erroresCatalogo);
    }

    // 2. Validación de precisión decimal y sumatorias aritméticas UBL 2.1
    decimal diferencia = CalcularDiferenciaAritmetica(documento);
    if (Math.Abs(diferencia) > 0.01m)
    {
        return ResultadoValidacion.Rechazado("ARITHMETIC_ERROR", "Discrepancia en sumatoria de líneas vs total.");
    }

    // 3. Verificación de vigencia y cadena de confianza del certificado digital X.509
    await _gestorCertificados.VerificarVigenciaCertificadoAsync(documento.EmisorRuc);

    return ResultadoValidacion.AprobadoParaFirma();
}`,
        explanation: "La pre-auditoría desacopla la validación aritmética y de catálogos oficiales antes de la firma digital X.509 y el envío SOAP, reduciendo la tasa de rechazo de CDRs de SUNAT a menos del 1.2%."
      },
      lessonsLearned: [
        "La normativa técnica de SUNAT (catálogos tributarios y anexos UBL) cambia con frecuencia sin previo aviso; aislar las reglas de validación en un motor modular desacoplado evita tener que recompilar y redesplegar todo el núcleo de la plataforma.",
        "El aislamiento multi-tenant de certificados digitales X.509 requiere custodia criptográfica en memoria efímera para evitar colisiones entre empresas cliente.",
        "Un sistema tributario de misión crítica no se juzga en condiciones ideales, sino en cómo tolera las caídas y demoras de horas en la recepción de CDRs de SUNAT."
      ]
    },
    {
      id: "apis-cusco-consultas",
      title: "APISCUSCO — Plataforma SaaS de APIs de Consulta & WhatsApp",
      summary: "Plataforma SaaS de alta concurrencia para consultas oficiales de DNI, RUC, tipo de cambio y datos vehiculares con motor de failover automático entre 7+ proveedores, Circuit Breakers y automatización de WhatsApp.",
      problem: "Las aplicaciones comerciales y sistemas POS en Perú requieren validación inmediata de clientes y vehículos sin depender de interfaces de terceros lentas (> 2,500 ms) o propensas a bloqueos recurrentes por caídas de servicios oficiales.",
      contribution: "Arquitectura backend en Node.js y TypeScript bajo Clean Architecture: motor de failover en cadena (Chain of Responsibility) entre 7+ proveedores oficiales con Circuit Breakers independientes, rate limiting por cuotas de suscripción con Redis, cliente web en Astro 4 + Vue 3 y automatización de mensajería transaccional WhatsApp con Baileys.",
      decisions: [
        "Motor de conmutación por error (Failover Engine): si un proveedor oficial de DNI/RUC falla o responde lento, el sistema conmuta al siguiente proveedor sin intervención manual ni interrupción para el cliente.",
        "Capa de almacenamiento en memoria con Redis para consultas frecuentes con TTL adaptativo, reduciendo la latencia media a 95 ms.",
        "Scrapers headless con técnicas stealth para consultas vehiculares (Placas, SOAT y revisión técnica) tolerantes a desafíos de detección.",
        "SDK oficial público en TypeScript para integración rápida en sistemas comerciales."
      ],
      technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Astro", "Vue.js", "Docker", "Nginx", "REST APIs"],
      category: "Microservicios & Integraciones",
      status: "En Producción",
      statusDetail: "Servicio público de alta disponibilidad en apis.apiscusco.com",
      featured: true,
      ctaText: "Ver arquitectura y playground en vivo →",
      baseline: "Consultas directas a fuentes oficiales tardaban entre 1,800 ms y 3,500 ms, con frecuentes bloqueos por rate-limiting en horarios pico.",
      metricOutcome: "Latencia promedio de 95 ms para peticiones cacheadas y SLA del 99.8% de disponibilidad ante caídas de proveedores upstream.",
      measurementMethod: "Telemetría de peticiones en tiempo real vía Prometheus/Grafana, Cloudflare Analytics y métricas internas APM.",
      architectureFlow: [
        "Client Apps / POS / ERPs",
        "Cloudflare Anycast CDN",
        "Gateway & Rate Limiter (Redis)",
        "Failover Engine (7+ Providers)",
        "Official Sources / WhatsApp Socket"
      ],
      benchmarks: [
        {
          label: "Latencia Promedio de Respuesta",
          before: "2,400 ms (sin caché)",
          after: "95 ms (con Redis)",
          improvement: "96% menor tiempo"
        },
        {
          label: "Disponibilidad en Picos de Concurrencia",
          before: "82% (bloqueos por límite)",
          after: "99.8% disponibilidad",
          improvement: "+17.8% fiabilidad"
        }
      ],
      links: {
        demo: "https://apis.apiscusco.com"
      },
      results: [
        "Latencia media de 95 ms en consultas con Redis (reducción del 96% frente a los 2,400 ms de consulta directa sin caché).",
        "SLA del 99.8% de disponibilidad ante caídas de proveedores individuales mediante conmutación automática entre 7+ proveedores.",
        "Suite en producción sirviendo activamente consultas a sistemas de facturación, pasarelas de pago y plataformas de despacho logístico."
      ],
      tradeoffs: [
        {
          decision: "Cadena de Proveedores con Failover vs Endpoint Único Directo",
          chosen: "Cadena de Responsabilidad (Chain of Responsibility) con Circuit Breakers independientes",
          discarded: "Acoplamiento a un único proveedor oficial gubernamental",
          why: "Los servidores de RENIEC y SUNAT experimentan degradaciones frecuentes sin previo aviso. La cadena de proveedores conmuta en milisegundos hacia el siguiente conector de respaldo, garantizando que el punto de venta cliente nunca reciba un error de timeout."
        },
        {
          decision: "Caché Redis en Memoria con TTL Adaptativo vs Consulta en Tiempo Real Siempre",
          chosen: "Almacenamiento en caché de identidades estables (DNI/RUC) con TTL de 24 horas y revalidación en background",
          discarded: "Petición HTTP externa en cada llamada del cliente",
          why: "Los datos de DNI y RUC cambian con muy baja frecuencia. Cachear respuestas válidas absorbe el 92% del tráfico, eliminando costos por consulta y reduciendo la latencia de 2.4s a 95ms."
        }
      ],
      codeSnippet: {
        title: "Motor de Failover en Cadena con Circuit Breaker",
        language: "typescript",
        code: `// Orquestador de Failover Automático entre Múltiples Proveedores Oficiales
export class ProveedorDocumentoChain {
  constructor(private readonly proveedores: IProveedorDocumento[]) {}

  async consultar(tipo: 'DNI' | 'RUC', numero: string): Promise<ResultadoConsulta> {
    for (const proveedor of this.proveedores) {
      if (proveedor.isCircuitOpen()) continue;

      try {
        const respuesta = await proveedor.ejecutarConsulta(tipo, numero);
        if (respuesta && respuesta.exito) {
          proveedor.recordSuccess();
          return respuesta;
        }
      } catch (error) {
        proveedor.recordFailure();
        // Log de telemetría interno y salto inmediato al siguiente proveedor en cadena
      }
    }
    throw new ServicioNoDisponibleError('Todos los proveedores upstream agotados');
  }
}`,
        explanation: "El patrón Chain of Responsibility permite conmutar transparentemente entre proveedores upstream ante timeouts o errores HTTP 5xx, garantizando un SLA del 99.8%."
      },
      lessonsLearned: [
        "En servicios de identidad y validación tributaria, ningún proveedor externo debe considerarse infalible: el diseño debe asumir caídas de red y rate-limiting desde el primer día.",
        "El uso de Circuit Breakers previene el agotamiento de sockets de red y memoria cuando un proveedor externo sufre una interrupción prolongada.",
        "El metering y control de cuotas en memoria con Redis debe ser atómico para evitar race conditions en peticiones concurrentes simultáneas."
      ]
    },
    {
      id: "apiscusco-facturacion-gran-escala",
      title: "FacturacionSOLID — Arquitectura Limpia & ERP Multi-Tenant en Go",
      summary: "Plataforma empresarial y de facturación electrónica diseñada bajo Clean Architecture y principios SOLID: backend Go modular con Google Wire DI, dominio puro desacoplado, precisión financiera decimal exacta, PostgreSQL 16 multi-tenant híbrido y frontend Next.js 15.",
      problem: "Sistemas ERP y de facturación tradicionales sufren de deuda técnica severa: acoplamiento de la lógica de negocio al ORM/base de datos, errores de redondeo por uso de floats en lugar de precisión decimal exacta y fugas de datos entre inquilinos (tenants) por falta de aislamiento estricto de esquemas.",
      contribution: "Diseño e implementación de la arquitectura integral del sistema: separación estricta de capas (cmd/di -> infraestructura -> aplicación -> dominio), inyección de dependencias generada en tiempo de compilación con Google Wire, modelo multi-tenant híbrido en PostgreSQL 16 (core por esquemas registrados search_path + módulos compartidos filtrados por empresa), transaccionalidad ligada a context.Context con UnitOfWork sin retención de locks durante I/O, y ledger contable inmutable con precisión decimal.",
      decisions: [
        "Dominio agnóstico y puro: cero dependencias de Gin, GORM, Redis o HTTP en las entidades e invariantes de negocio.",
        "Dinero exacto con decimal y NUMERIC: eliminación total de tipos de punto flotante para garantizar cuadratura contable estricta en comprobantes UBL 2.1.",
        "Aislamiento multi-tenant por esquemas físicos en PostgreSQL 16 con pools de conexiones dedicados y verificación en runtime.",
        "Observabilidad completa con métricas Prometheus, tracing OpenTelemetry (OTel) y dashboards Grafana."
      ],
      technologies: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker", "OpenTelemetry", "Prometheus", "Wire (DI)", "REST APIs"],
      category: "Facturación Electrónica & Tributario",
      status: "En Producción",
      statusDetail: "Arquitectura modular en Go & PostgreSQL 16 Multi-Tenant",
      featured: true,
      ctaText: "Ver arquitectura modular en Go →",
      baseline: "Monolitos tradicionales con acoplamiento a base de datos sufrían inconsistencias de redondeo y riesgos de colisión de datos entre empresas cliente.",
      metricOutcome: "Cero discrepancias en cuadratura aritmética decimal, inyección de dependencias 100% verificada en compilación con Wire y aislamiento de datos por esquema.",
      measurementMethod: "Suites de regresión en Go (go test), análisis estático con golangci-lint, auditoría de esquemas SQL en PostgreSQL y observabilidad OTel.",
      architectureFlow: [
        "Next.js 15 App Router",
        "Gin HTTP Layer (context.Context)",
        "Application Services & Ports",
        "Pure Domain (Decimal & Ledger)",
        "PostgreSQL 16 (Multi-Tenant Schemas)"
      ],
      benchmarks: [
        {
          label: "Inyección de Dependencias",
          before: "Reflexión en runtime (lento)",
          after: "Google Wire (tiempo de compilación)",
          improvement: "Cero sobrecosto en runtime"
        },
        {
          label: "Precisión Contable de Líneas",
          before: "Float64 (errores de redondeo)",
          after: "Fixed Decimal NUMERIC(18,4)",
          improvement: "100% exactitud matemática"
        },
        {
          label: "Aislamiento Multi-Tenant",
          before: "Filtro WHERE por tenant_id",
          after: "Esquemas PostgreSQL + Search_path",
          improvement: "Aislamiento físico estricto"
        }
      ],
      links: {},
      results: [
        "Arquitectura modular desacoplada con dominio puro que permite probar lógica tributaria sin levantar bases de datos ni servicios de red.",
        "Manejo de ledger contable inmutable con compensaciones y precisión decimal garantizada.",
        "Aislamiento multi-tenant híbrido en PostgreSQL 16 que previene colisiones accidentales de datos entre clientes corporativos."
      ],
      tradeoffs: [
        {
          decision: "Inyección de Dependencias en Compilación (Wire) vs Contenedores de Reflexión en Runtime",
          chosen: "Generación de código en compilación con Google Wire",
          discarded: "Contenedores IoC basados en reflexión en runtime",
          why: "Wire detecta dependencias faltantes, ciclos y errores de inicialización durante la compilación ('go build'). Esto elimina por completo los pánicos en tiempo de ejecución al arrancar el servidor en producción."
        },
        {
          decision: "Clean Architecture con Dominio Puro vs Arquitectura de Capas Tradicional Ligada a GORM",
          chosen: "Entidades de dominio puras que no importan Gin, GORM ni librerías de infraestructura",
          discarded: "Modelos GORM usados directamente como entidades de dominio y DTOs de API",
          why: "Acoplar el dominio a etiquetas de base de datos o frameworks HTTP dificulta las pruebas unitarias y hace que cualquier cambio en la base de datos impacte destructivamente las reglas de negocio tributarias."
        }
      ],
      codeSnippet: {
        title: "Unit of Work Contextual y Dominio con Precisión Decimal en Go",
        language: "go",
        code: `// Orquestación transaccional con contexto Go y precisión financiera exacta
func (s *ServicioComprobante) EmitirFactura(ctx context.Context, cmd ComadoEmitirFactura) (*ResultadoEmision, error) {
    // 1. Instanciación en dominio puro con validación de invariantes
    factura, err := dominio.NuevaFactura(cmd.Serie, cmd.Correlativo, cmd.ClienteRuc)
    if err != nil {
        return nil, fmt.Errorf("invariante de dominio violada: %w", err)
    }

    // 2. Cálculo financiero con precisión decimal estricta (sin floats)
    for _, item := range cmd.Lineas {
        if err := factura.AgregarLinea(item.Descripcion, item.Cantidad, item.PrecioUnitarioDecimal); err != nil {
            return nil, err
        }
    }

    // 3. Persistencia atómica en UnitOfWork sobre la transacción contextual del tenant
    return s.unitOfWork.EjecutarTransaccion(ctx, func(tx RepositorioTransaccional) (*ResultadoEmision, error) {
        if err := tx.GuardarComprobante(ctx, factura); err != nil {
            return nil, err
        }
        return &ResultadoEmision{ID: factura.ID, Estado: dominio.EstadoRegistrado}, nil
    })
}`,
        explanation: "El dominio permanece desacoplado de frameworks y bases de datos; la transacción respeta el contexto del tenant en context.Context y los cálculos monetarios usan decimales exactos."
      },
      lessonsLearned: [
        "En sistemas financieros y fiscales, el uso de tipos de punto flotante (float32/float64) es inaceptable: tarde o temprano produce descuadres de centavos que invalidan comprobantes ante SUNAT.",
        "La generación de inyección de dependencias en compilación (Google Wire) simplifica enormemente el mantenimiento de arquitecturas limpias complejas en Go.",
        "El aislamiento multi-tenant a nivel de esquema de base de datos ofrece una barrera de seguridad muy superior al simple filtrado por columna tenant_id en consultas SQL."
      ]
    },
    {
      id: "xmusic-web-app",
      title: "AuraStream — Streaming Multimedia, Búsqueda Vectorial & Transcodificación",
      summary: "Plataforma privada de streaming de audio de alta fidelidad: backend asíncrono en FastAPI, recomendaciones y búsqueda semántica con PostgreSQL pgvector, workers Celery/Redis, cliente SvelteKit, app nativa Android en Kotlin y sesiones en memoria efímera Linux memfd.",
      problem: "Construir un ecosistema de streaming multimedia privado de alto rendimiento con recomendaciones acústicas personalizadas, transcodificación de bajo consumo y protección estricta contra bots y scraping sin degradar la experiencia de usuario.",
      contribution: "Arquitectura integral full-stack: backend asíncrono en Python con FastAPI y asyncpg, motor de recomendación semántica mediante embeddings acústicos y búsqueda de vecinos más cercanos con PostgreSQL pgvector (HNSW), workers distribuidos con Celery y Redis para transcodificación y extracción de metadatos, bóveda de sesiones cifrada (Fernet + derivación HKDF) transferida vía descriptores memfd en Linux, integración de Cloudflare Turnstile Managed y cliente nativo Android en Kotlin.",
      decisions: [
        "Indexación vectorial con pgvector: generación de vectores de características acústicas para recomendaciones semánticas con distancia coseno en tiempo real sub-10ms.",
        "Seguridad de sesiones en memoria efímera: entrega de credenciales y cookies administrativas mediante memfd_create en el kernel Linux para evitar persistencia accidental en disco o logs.",
        "Desacoplamiento de transcodificación: pipeline asíncrono en segundo plano con Celery que optimiza y normaliza formatos de audio de alta fidelidad sin bloquear la API REST.",
        "Protección contra automatización: Cloudflare Turnstile Managed integrado con validación criptográfica en backend y presupuestos de rate limiting en Redis."
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Celery", "Redis", "Android (Kotlin)", "SvelteKit", "Docker", "Nginx"],
      category: "Web & Multimedia",
      status: "En Producción",
      statusDetail: "Plataforma activa en musica.apiscusco.com",
      featured: true,
      ctaText: "Ver arquitectura multimedia y vectorial →",
      baseline: "Reproductores convencionales carecían de búsqueda acústica semántica y sufrían bloqueos de I/O en transcodificación masiva de audio.",
      metricOutcome: "Búsqueda y recomendaciones vectoriales en <10 ms con pgvector, transcodificación asíncrona distribuida y streaming continuo a 60 FPS en Android y Web.",
      measurementMethod: "Telemetría interna en GET /metrics (Prometheus), análisis de rendimiento en Chromium DevTools y pg_stat_statements.",
      architectureFlow: [
        "Android Kotlin & SvelteKit Web",
        "Cloudflare Turnstile & Nginx Reverse Proxy",
        "FastAPI Async Engine (Python 3.12)",
        "PostgreSQL 16 + pgvector (HNSW)",
        "Celery Workers & memfd Linux Audio Pipeline"
      ],
      benchmarks: [
        {
          label: "Búsqueda Semántica de Pistas",
          before: "Búsqueda por texto ILIKE (lento)",
          after: "HNSW Cosine Distance (pgvector)",
          improvement: "Sub-10ms en similitud"
        },
        {
          label: "Transcodificación de Medios",
          before: "Procesamiento síncrono en API",
          after: "Worker Pool Celery distribuido",
          improvement: "Zero I/O blocking en API"
        },
        {
          label: "Seguridad de Sesiones en Host",
          before: "Archivos planos en staging",
          after: "memfd_create (memoria efímera)",
          improvement: "Cero rastro en almacenamiento"
        }
      ],
      links: {
        demo: "https://musica.apiscusco.com"
      },
      results: [
        "Búsqueda acústica y recomendación de pistas en tiempo real con latencias inferiores a 10 ms mediante índices HNSW en pgvector.",
        "Plataforma en producción con soporte multiplataforma en cliente web responsivo y aplicación nativa Android en Kotlin.",
        "Protección robusta contra scraping automatizado y abuso mediante Cloudflare Turnstile Managed y rate limiting en Redis."
      ],
      tradeoffs: [
        {
          decision: "Búsqueda Vectorial con pgvector en PostgreSQL vs Base de Datos Vectorial Separada (Pinecone/Milvus)",
          chosen: "Extensión pgvector integrada nativamente en PostgreSQL 16",
          discarded: "Despliegue de una base de datos vectorial externa dedicada",
          why: "Mantener los embeddings vectoriales dentro de PostgreSQL junto con los metadatos de las pistas elimina la necesidad de sincronización entre dos bases de datos y permite consultas combinadas relacionales y vectoriales en una única transacción ACID."
        },
        {
          decision: "Descriptores en Memoria Efímera (memfd) vs Archivos Temporales en Disco",
          chosen: "Uso de memfd_create en el kernel Linux para inyección de credenciales",
          discarded: "Escribir archivos de cookies/sesión en directorios /tmp o staging",
          why: "Los archivos en disco pueden filtrarse en respaldos, persistir tras reinicios o ser inspeccionados por otros procesos del host. memfd mantiene los datos exclusivamente en memoria volátil de ejecución."
        }
      ],
      codeSnippet: {
        title: "Búsqueda de Similitud Semántica de Audio con pgvector en FastAPI",
        language: "python",
        code: `# Búsqueda de pistas similares mediante distancia coseno sobre embeddings acústicos
@router.get("/tracks/{track_id}/recommendations", response_model=List[TrackOut])
async def get_recommended_tracks(
    track_id: uuid.UUID,
    limit: int = 10,
    db: AsyncSession = Depends(get_db_session)
):
    # 1. Recuperar el vector de incrustación (embedding) acústico de la pista objetivo
    target_track = await db.get(Track, track_id)
    if not target_track or target_track.embedding is None:
        raise HTTPException(status_code=404, detail="Embedding acústico no disponible")

    # 2. Consulta de vecinos más cercanos usando el operador de distancia coseno (<=>) en pgvector
    stmt = (
        select(Track)
        .where(Track.id != track_id)
        .order_by(Track.embedding.cosine_distance(target_track.embedding))
        .limit(limit)
    )
    result = await db.execute(stmt)
    return result.scalars().all()`,
        explanation: "La consulta aprovecha el índice HNSW en PostgreSQL 16 con pgvector para devolver pistas con características acústicas similares en menos de 10 milisegundos."
      },
      lessonsLearned: [
        "La búsqueda vectorial integrada con pgvector en PostgreSQL simplifica drásticamente la arquitectura al evitar la complejidad operacional de clusters vectoriales independientes.",
        "En procesamiento multimedia, delegar la transcodificación pesada a workers asíncronos desacoplados (Celery) es vital para mantener tiempos de respuesta HTTP ágiles.",
        "El uso de descriptores de memoria efímera Linux (memfd) es una de las mejores prácticas de hardening para evitar la persistencia accidental de credenciales y sesiones en disco."
      ]
    }
  ]
};
