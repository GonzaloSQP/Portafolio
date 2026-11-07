import type { Profile } from '../schemas/portfolioSchema';

export const portfolioData: Profile = {
  name: "Marcio Gonzalo Sequeiros Palomino",
  age: 27,
  title: "Arquitecto de Software & Ingeniero Backend Senior",
  location: "Cusco, Perú",
  summary: "Especialista en sistemas distribuidos, procesamiento de datos de alto volumen y plataformas de misión crítica. Con sólida experiencia en la migración de sistemas legados a microservicios Jakarta EE con streaming reactivo (procesamiento de más de 1,000,000 de registros bancarios en menos de 15 minutos), y en el diseño de plataformas de facturación electrónica y auditoría tributaria para más de 30 empresas.",
  specialties: [
    "Sistemas Distribuidos & Microservicios",
    "Streaming y Procesamiento Reactivo de Datos",
    "Optimización de Consultas Oracle SQL Masivas",
    "Facturación Electrónica SUNAT (XML, CDR, Certificación Digital)",
    "APIs de Alta Concurrencia y Disponibilidad",
    "Gestión de Proyectos Tecnológicos (PMI Credential)"
  ],
  contact: {
    email: "marciosequeiros@gmail.com",
    github: "https://github.com/marciosequeiros",
    linkedin: "https://linkedin.com/in/marciosequeiros"
  },
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
      company: "Soluciones Software Perú S.A.C. (SSP S.A.C.)",
      role: "Ingeniero de Desarrollo & Arquitectura de Software",
      period: "01/05/2022 - Presente",
      location: "Perú",
      highlights: [
        "Liderazgo técnico en el diseño e implementación de sistemas de facturación electrónica a gran escala y microservicios de consulta fiscal.",
        "Desarrollo de un centralizador para gestión, auditoría previa, envío de comprobantes y control de observaciones SUNAT para más de 30 empresas de múltiples industrias.",
        "Arquitectura de microservicios REST para consultas de alta disponibilidad de RENIEC (DNI), SUNAT (RUC), consulta vehicular de placas y pólizas SOAT.",
        "Implementación de buenas prácticas de ingeniería, seguridad criptográfica en firmas XML y automatización de despliegues."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "RENIEC API", "PostgreSQL", "Docker", "Redis"]
    },
    {
      company: "Sector Banca & Finanzas",
      role: "Especialista Backend & Migración de Sistemas Legados",
      period: "Proyecto de Alta Complejidad",
      location: "Perú",
      highlights: [
        "Migración completa de un sistema crítico de reportería bancaria desarrollado originalmente en Visual Basic hacia una arquitectura moderna de microservicios Jakarta EE.",
        "Resolución del principal cuello de botella del sistema: reestructuración y optimización de consultas Oracle SQL extremadamente extensas y complejas.",
        "Implementación de arquitectura de streaming de datos reactivo para extraer, transformar y cargar más de 1,000,000 de registros desde Oracle SQL en menos de 15 minutos sin desbordamiento de memoria.",
        "Canalización de datos hacia microservicios para inserciones concurrentes por lotes, actualización de estados transaccionales y soporte a múltiples módulos de pago de servicios."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios"]
    }
  ],
  projects: [
    {
      id: "banca-streaming-jakarta",
      title: "Migración de Reporteador Bancario & Streaming de Datos",
      summary: "Modernización de monolito Visual Basic a microservicios Jakarta EE con streaming reactivo de más de un millón de registros bancarios en menos de 15 minutos.",
      problem: "El sistema legado en Visual Basic sufría cuellos de botella severos por consultas Oracle SQL complejas y extensas, provocando bloqueos de base de datos y tiempos inaceptables en el procesamiento de estados y pagos de servicios.",
      contribution: "Arquitectura integral de la solución: optimización a nivel de índices y planes de ejecución en Oracle SQL, e implementación de un mecanismo de streaming de datos en Jakarta EE para obtener registros gradualmente y transmitirlos a microservicios para inserciones masivas y actualización de estados.",
      decisions: [
        "Sustitución de lectura monolítica completa por procesamiento de flujo continuo (cursor streaming) para evitar desbordes de memoria Heap JVM.",
        "Desacoplamiento de módulos de pago de servicios en microservicios independientes orientados al dominio.",
        "Optimización de planes de ejecución y reducción drástica de lecturas lógicas en Oracle SQL.",
        "Garantía de idempotencia en transacciones bancarias concurrentes."
      ],
      technologies: ["Jakarta EE", "Java", "Oracle SQL", "Visual Basic", "Reactive Streams", "Microservicios"],
      category: "Streaming & Big Data",
      status: "activo",
      featured: true,
      links: {
        demo: "https://apis.apiscusco.com"
      },
      results: [
        "> 1,000,000 de registros bancarios procesados en menos de 15 minutos.",
        "Consumo de memoria estable y predecible mediante streaming reactivo.",
        "Cero tiempo de inactividad durante la migración desde Visual Basic a Jakarta EE.",
        "Actualización atómica de estados y conciliación de pagos de servicios."
      ]
    },
    {
      id: "centralizador-facturacion-electronica",
      title: "Centralizador de Comprobantes Electrónicos & Auditoría",
      summary: "Plataforma de gestión, pre-auditoría, envíos masivos y control de observaciones SUNAT para más de 30 empresas de distintos sectores económicos.",
      problem: "Múltiples empresas con distintas reglas de negocio enfrentaban altos índices de rechazo en comprobantes tributarios electrónicos debido a inconsistencias antes de la firma digital y falta de trazabilidad en los CDR.",
      contribution: "Desarrollo del motor de centralización y orquestación tributaria: auditoría de esquemas XML, validación de catálogos SUNAT previa al envío, control de colas de despacho y categorización automática de observaciones.",
      decisions: [
        "Diseño multi-inquilino (multi-tenant) seguro con aislamiento de llaves criptográficas y certificados tributarios.",
        "Mecanismo de reintentos exponenciales tolerante a fallos e interrupciones en la sede electrónica de SUNAT.",
        "Motor de reglas de negocio para advertir discrepancias fiscales antes de la emisión definitiva."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "PostgreSQL", "Docker"],
      category: "Facturación Electrónica & Tributario",
      status: "activo",
      featured: true,
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
      problem: "Las aplicaciones comerciales y sistemas POS requieren validación inmediata de clientes y vehículos sin depender de interfaces lentas o propensas a bloqueos.",
      contribution: "Diseño y despliegue de microservicios REST optimizados para responder en milisegundos, con normalización de esquemas de respuesta y balanceo de peticiones.",
      decisions: [
        "Capa de almacenamiento en memoria con Redis para consultas recurrentes respetando políticas de caducidad.",
        "Contratos REST limpios, documentados y versionados.",
        "Monitoreo continuo de salud (health checks) y resiliencia ante caídas de proveedores de datos externos."
      ],
      technologies: ["Microservicios", "REST APIs", "SUNAT API", "RENIEC API", "SOAT API", "Redis", "TypeScript"],
      category: "Microservicios & Integraciones",
      status: "activo",
      featured: true,
      links: {
        demo: "https://apis.apiscusco.com"
      },
      results: [
        "Servicio en producción accesible públicamente en apis.apiscusco.com.",
        "Tiempos de respuesta menores a 120 ms en consultas en caché.",
        "Integración adoptada por sistemas de facturación y plataformas de despacho."
      ]
    },
    {
      id: "apiscusco-facturacion-gran-escala",
      title: "ApisCusco - Facturación Electrónica a Gran Escala",
      summary: "Plataforma SaaS integral de emisión y procesamiento masivo de comprobantes tributarios para negocios con alta rotación de inventarios y ventas.",
      problem: "Sistemas comerciales tradicionales fallan al sincronizar catálogos extensos y emitir comprobantes en periodos de alto tráfico sin perder transacciones.",
      contribution: "Desarrollo full-stack de la plataforma, integración con servicios tributarios SUNAT, generación rápida de formatos de impresión PDF con códigos de barra bidimensionales (QR) y trazabilidad fiscal.",
      decisions: [
        "Generación asíncrona de representaciones impresas en PDF vectoriales de bajo peso.",
        "Persistencia relacional optimizada con particionamiento mensual para grandes volúmenes de facturas y boletas.",
        "Interfaz intuitiva de rápida adopción para cajeros y personal administrativo."
      ],
      technologies: ["Jakarta EE", "Java", "Microservicios", "SUNAT API", "PostgreSQL", "Docker", "TypeScript"],
      category: "Facturación Electrónica & Tributario",
      status: "activo",
      featured: true,
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
      problem: "Crear una experiencia web de reproducción de audio tan fluida y responsiva como una aplicación de escritorio nativa, compatible con navegadores móviles y desktop.",
      contribution: "Desarrollo de la interfaz de usuario, orquestación del reproductor mediante Web Audio API, persistencia local de estado y optimización de carga de recursos multimedia.",
      decisions: [
        "Uso de Web Audio API para procesamiento de audio en tiempo real y transiciones suaves entre pistas.",
        "Almacenamiento de cola de reproducción y estado en almacenamiento local tolerante a recargas.",
        "Diseño táctil accesible con controles de tamaño ergonómico."
      ],
      technologies: ["TypeScript", "Web Audio API", "Node.js", "Tailwind CSS"],
      category: "Web & Multimedia",
      status: "activo",
      featured: true,
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

