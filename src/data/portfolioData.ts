import type { Profile } from '../schemas/portfolioSchema';

export const portfolioData: Profile = {
  name: "Marcio Gonzalo Sequeiros Palomino",
  age: 27,
  title: "Arquitecto de Software & Ingeniero Backend",
  location: "Cusco, Perú",
  summary: "Especialista en sistemas distribuidos, procesamiento reactivo de datos de alto volumen y plataformas de misión crítica. Con experiencia comprobada modernizando arquitecturas financieras legadas a microservicios Jakarta EE con streaming reactivo (procesamiento de más de 1,000,000 de registros bancarios en menos de 15 minutos), y diseñando sistemas de facturación electrónica y pre-auditoría fiscal para más de 30 empresas.",
  specialties: [
    "Sistemas Distribuidos & Microservicios",
    "Streaming y Procesamiento Reactivo de Datos",
    "Optimización de Consultas Oracle SQL Masivas",
    "Facturación Electrónica SUNAT (UBL 2.1, XML, Firma X.509)",
    "APIs REST de Alta Concurrencia y Resiliencia",
    "Gestión Ágil y Predictiva de Proyectos de Software"
  ],
  contact: {
    email: "chalot_6@hotmail.com",
    phone: "+51 929 803 589",
    github: "https://github.com/marciosequeiros",
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
      period: "2018 - 2020",
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
      company: "COOPAC Los Andes",
      role: "Desarrollador de Software & Especialista en Migración",
      period: "Abril 2025 - Junio 2025",
      location: "Abancay, Apurímac, Perú",
      highlights: [
        "Liderazgo en la migración de un reporteador financiero legado en Visual Basic hacia microservicios Jakarta EE.",
        "Resolución del cuello de botella crítico: optimización de consultas Oracle SQL de más de 300 líneas con planes de ejecución degradados.",
        "Diseño e implementación de arquitectura de streaming reactivo por cursores para procesar más de 1,000,000 de registros en menos de 15 minutos sin desbordar memoria JVM.",
        "Modularización de servicios transaccionales de pago de servicios y conciliación bancaria con idempotencia."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios"]
    },
    {
      company: "Soluciones de Software SAC (SSP S.A.C.)",
      role: "Desarrollador Back-end & Arquitectura",
      period: "Mayo 2020 - Abril 2025 (5 años)",
      location: "Cusco, Perú",
      highlights: [
        "Desarrollo y mantenimiento de plataformas de facturación electrónica a gran escala y microservicios de consulta fiscal.",
        "Creación de un centralizador tributario para auditoría previa, firma digital de XML y despacho de comprobantes a SUNAT para más de 30 empresas de múltiples sectores.",
        "Diseño de la suite de microservicios APIS Cusco (DNI, RUC, Placas, SOAT) alcanzando disponibilidad continua y latencias sub-100ms con Redis.",
        "Integración de pasarelas de pago, procesamiento de inventarios masivos y seguridad criptográfica de certificados digitales X.509."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "RENIEC API", "PostgreSQL", "Docker", "Redis", "TypeScript"]
    }
  ],
  projects: [
    {
      id: "banca-streaming-jakarta",
      title: "Migración de Reporteador Bancario & Streaming de Datos",
      summary: "Modernización de monolito Visual Basic a microservicios Jakarta EE con streaming reactivo de más de un millón de registros bancarios en menos de 15 minutos.",
      problem: "El sistema legado en Visual Basic sufría cuellos de botella severos por consultas Oracle SQL complejas y extensas, provocando bloqueos de base de datos y tiempos inaceptables de más de 4 horas en el procesamiento de estados y pagos de servicios.",
      contribution: "Arquitectura integral de la solución: optimización de sentencias SQL y planes de ejecución en Oracle, y diseño de un pipeline de streaming reactivo en Jakarta EE para canalizar registros por lotes hacia microservicios para inserciones concurrentes y actualización atómica de estados.",
      decisions: [
        "Sustitución de lectura monolítica completa por procesamiento de flujo continuo (cursor streaming) para evitar desbordes de memoria Heap JVM.",
        "Desacoplamiento de módulos de pago de servicios en microservicios independientes orientados al dominio.",
        "Optimización de planes de ejecución y reducción drástica de lecturas lógicas en Oracle SQL.",
        "Garantía de idempotencia en transacciones bancarias concurrentes."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios"],
      category: "Streaming & Big Data",
      status: "Entregado",
      statusDetail: "Sector Financiero · COOPAC Los Andes (Bajo NDA)",
      featured: true,
      ctaText: "Ver arquitectura y pipeline de streaming →",
      baseline: "Reporteador legado en Visual Basic tardaba más de 4 horas con consultas Oracle no indexadas de 300+ líneas y caídas recurrentes por OutOfMemory en periodos de cierre.",
      metricOutcome: "14 minutos y 20 segundos para 1,000,000+ registros procesados, validados y conciliados.",
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
      links: {
        demo: "https://apis.apiscusco.com"
      },
      results: [
        "De > 4 horas a 14 minutos y 20 segundos para 1,000,000 de registros bancarios.",
        "Consumo de memoria Heap acotado a 380 MB mediante streaming reactivo.",
        "Cero tiempo de inactividad durante la migración desde Visual Basic a Jakarta EE.",
        "Actualización atómica de estados y conciliación de pagos de servicios."
      ]
    },
    {
      id: "centralizador-facturacion-electronica",
      title: "Centralizador de Comprobantes Electrónicos & Pre-Auditoría SUNAT",
      summary: "Plataforma multi-tenant de gestión, pre-auditoría de reglas UBL 2.1, envíos masivos y control de observaciones SUNAT para más de 30 empresas.",
      problem: "Múltiples empresas con distintas reglas de negocio enfrentaban hasta un 25% de comprobantes fiscales rechazados o con observaciones SUNAT debido a discrepancias en catálogos y esquemas XML antes de la firma digital.",
      contribution: "Desarrollo del motor de centralización y orquestación tributaria: pre-auditoría automática de reglas de negocio UBL 2.1 en memoria antes de la firma digital, colas de despacho asíncronas y conciliación automatizada de CDR.",
      decisions: [
        "Diseño multi-inquilino (multi-tenant) seguro con aislamiento de llaves criptográficas y certificados tributarios X.509.",
        "Mecanismo de reintentos exponenciales tolerante a fallos e interrupciones en la sede electrónica de SUNAT.",
        "Motor de reglas de negocio para advertir discrepancias fiscales antes de la emisión definitiva."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "PostgreSQL", "Docker", "Redis"],
      category: "Facturación Electrónica & Tributario",
      status: "En Producción",
      statusDetail: "Multi-tenant activo · 30+ empresas corporativas",
      featured: true,
      ctaText: "Ver motor de auditoría y arquitectura →",
      baseline: "~25% de comprobantes fiscales sufrían observaciones o rechazos por SUNAT debido a inconsistencias de catálogo o errores de esquema XML UBL 2.1.",
      metricOutcome: "Reducción del 95% en comprobantes rechazados (tasa de rechazo en producción < 1.2%).",
      measurementMethod: "Métricas de trazabilidad en base de datos PostgreSQL, logs de auditoría de CDRs y telemetría de colas de envío.",
      architectureFlow: [
        "ERPs / Puntos de Venta (30+ Empresas)",
        "API Gateway & Router Multi-tenant",
        "Motor de Pre-Auditoría UBL 2.1",
        "Cola de Despacho Asíncrono (Redis)",
        "Firma Digital X.509",
        "Web Services SUNAT & Conciliador CDR"
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
      links: {
        demo: "https://www.apiscusco.com"
      },
      results: [
        "Operación activa y auditada en más de 30 empresas comerciales, industriales y de servicios.",
        "Reducción superior al 95% en discrepancias y comprobantes rechazados por SUNAT.",
        "Trazabilidad en tiempo real de constancias de recepción (CDR) y resoluciones."
      ]
    },
    {
      id: "apis-cusco-consultas",
      title: "APIS Cusco - Microservicios SUNAT, RENIEC, Placas y SOAT",
      summary: "Suite de microservicios de alta concurrencia para consulta instantánea de DNI, RUC, datos vehiculares y estado de pólizas SOAT.",
      problem: "Las aplicaciones comerciales y sistemas POS requieren validación inmediata de clientes y vehículos sin depender de interfaces de terceros lentas (> 2,500 ms) o propensas a bloqueos.",
      contribution: "Diseño y despliegue de microservicios REST optimizados para responder en milisegundos, con normalización de esquemas de respuesta y balanceo de peticiones.",
      decisions: [
        "Capa de almacenamiento en memoria con Redis para consultas recurrentes respetando políticas de caducidad.",
        "Contratos REST limpios, documentados y versionados.",
        "Monitoreo continuo de salud (health checks) y resiliencia ante caídas de proveedores de datos externos."
      ],
      technologies: ["Microservicios", "REST APIs", "SUNAT API", "RENIEC API", "SOAT API", "Redis", "TypeScript"],
      category: "Microservicios & Integraciones",
      status: "En Producción",
      statusDetail: "Servicio público de alta disponibilidad en apis.apiscusco.com",
      featured: true,
      ctaText: "Ver arquitectura y playground en vivo →",
      baseline: "Consultas directas a fuentes oficiales tardaban entre 1,800 ms y 3,500 ms, con frecuentes bloqueos por rate-limiting en horarios pico.",
      metricOutcome: "Latencia promedio de 95 ms para peticiones cacheadas y SLA del 99.8% de disponibilidad.",
      measurementMethod: "Telemetría de peticiones en tiempo real vía Cloudflare Analytics y métricas internas APM.",
      architectureFlow: [
        "Apps Móviles / POS / ERPs",
        "Cloudflare Anycast CDN",
        "Microservicios REST (Node/TS)",
        "Capa Caché Redis en Memoria",
        "Conectores Oficiales SUNAT / RENIEC / SOAT"
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
        "Servicio en producción accesible públicamente en apis.apiscusco.com.",
        "Tiempos de respuesta verificados inferiores a 120 ms en consultas en caché.",
        "Integración adoptada por sistemas de facturación y plataformas de despacho."
      ]
    },
    {
      id: "apiscusco-facturacion-gran-escala",
      title: "ApisCusco - Facturación Electrónica a Gran Escala",
      summary: "Plataforma SaaS integral de emisión y procesamiento masivo de comprobantes tributarios para negocios con alta rotación de inventarios y ventas.",
      problem: "Sistemas comerciales tradicionales fallan al sincronizar catálogos extensos y emitir comprobantes en periodos de alto tráfico sin perder transacciones ni duplicar correlativos.",
      contribution: "Desarrollo full-stack de la plataforma, integración con servicios tributarios SUNAT, generación rápida de formatos de impresión PDF con códigos de barra bidimensionales (QR) y trazabilidad fiscal.",
      decisions: [
        "Generación asíncrona de representaciones impresas en PDF vectoriales de bajo peso.",
        "Persistencia relacional optimizada con particionamiento mensual para grandes volúmenes de facturas y boletas.",
        "Diseño responsivo optimizado para cajas y puntos de venta táctiles."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "PostgreSQL", "Docker", "TypeScript"],
      category: "Facturación Electrónica & Tributario",
      status: "En Producción",
      statusDetail: "Plataforma activa en www.apiscusco.com",
      featured: true,
      ctaText: "Ver arquitectura de facturación masiva →",
      links: {
        demo: "https://www.apiscusco.com"
      },
      results: [
        "Plataforma activa en www.apiscusco.com.",
        "Emisión ininterrumpida de miles de comprobantes diarios.",
        "Cumplimiento 100% de la normativa técnica de SUNAT."
      ]
    },
    {
      id: "xmusic-web-app",
      title: "XMusic - Reproductor y Streaming Web de Música",
      summary: "Aplicación web moderna de música y streaming de audio con interfaz reactiva, baja latencia y gestión interactiva de listas de reproducción.",
      problem: "Crear una experiencia web de reproducción de audio tan fluida y responsiva como una aplicación nativa, compatible con navegadores móviles y desktop.",
      contribution: "Desarrollo de la interfaz de usuario, orquestación del reproductor mediante Web Audio API, persistencia local de estado y optimización de carga de recursos multimedia.",
      decisions: [
        "Uso de Web Audio API para procesamiento de audio en tiempo real y transiciones suaves entre pistas.",
        "Almacenamiento de cola de reproducción y estado en almacenamiento local tolerante a recargas.",
        "Diseño táctil accesible con controles de tamaño ergonómico."
      ],
      technologies: ["TypeScript", "Web Audio API", "Node.js", "Tailwind CSS"],
      category: "Web & Multimedia",
      status: "En Producción",
      statusDetail: "Aplicación web activa en musica.apiscusco.com",
      featured: true,
      ctaText: "Ver reproductor web en vivo →",
      links: {
        demo: "https://musica.apiscusco.com"
      },
      results: [
        "Aplicación en producción en musica.apiscusco.com.",
        "Reproducción ininterrumpida y transiciones instantáneas.",
        "Experiencia de usuario calificada como rápida e intuitiva."
      ]
    }
  ]
};
