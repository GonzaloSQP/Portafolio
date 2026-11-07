import type { BlogPost } from '../schemas/blogSchema';

export const REDACTION_POLICY = [
  'Nombres de clientes, empleadores y empresas: se reemplazan por el sector genérico.',
  'Datos internos: esquema de base de datos, consultas exactas, endpoints, credenciales y certificados nunca se publican.',
  'Métricas sensibles: se expresan como rangos u órdenes de magnitud, no como cifras de producción exactas.',
  'Información bajo NDA o en curso: solo se comparte el patrón de arquitectura y las decisiones, sin datos operativos.',
] as const;

export const blogData: BlogPost[] = [
  {
    slug: 'bitacora-contingencia-caidas-sunat',
    title: 'Bitácora: resiliencia ante caídas del SEE de SUNAT y nuevas normativas de envío',
    summary:
      'Estrategias de arquitectura ante la indisponibilidad de los servicios SOAP de SUNAT: patrón Outbox, reintentos con backoff exponencial con jitter y cumplimiento del nuevo plazo reglamentario de envío.',
    date: 'Noviembre 2026',
    readTime: '5 min de lectura',
    status: 'publicable',
    progress: 95,
    sector: 'Facturación electrónica masiva',
    stack: ['TypeScript', 'Jakarta EE', 'PostgreSQL', 'Redis', 'UBL 2.1'],
    tags: ['SUNAT', 'Contingencia', 'Outbox Pattern', 'Circuit Breaker', 'Normativas'],
    objectives: [
      'Absorber caídas y timeouts de los endpoints SOAP de la sede electrónica de SUNAT sin bloquear el punto de venta.',
      'Garantizar el envío dentro de los nuevos plazos legales estrictos (hasta el día siguiente o máximo 3 días).',
      'Resolver comprobantes en estado ambiguo mediante consultas de validez antes de cualquier reintento.',
    ],
    decisions: [
      'Patrón Outbox con colas transaccionales: la firma y entrega al cliente son sincrónicas; el despacho a la sede electrónica es asíncrono.',
      'Circuit Breaker y backoff exponencial con jitter: protege la conexión y evita saturar la red al restaurarse el servicio.',
      'Consulta previa de CDR o validez de comprobante ante timeouts para garantizar idempotencia y evitar el error 2324.',
    ],
    censoredNotes: [
      'Identidad de los emisores electrónicos y razones sociales: censuradas.',
      'Clave SOL, certificados digitales y accesos de autenticación: nunca se publican.',
      'Endpoints privados y topología de red de los clientes: censurados.',
      'Cifras de facturación de las empresas: expresadas solo en órdenes de magnitud.',
    ],
    nextSteps: [
      'Consolidar la auditoría continua de plazos de caducidad de certificados digitales.',
      'Automatizar la conciliación de resúmenes de contingencia con los libros electrónicos.',
      'Publicar el análisis de patrones de falla en Notas de Ingeniería.',
    ],
    relatedProjectId: 'centralizador-facturacion-electronica',
  },
  {
    slug: 'bitacora-migracion-bancaria-streaming',
    title: 'Bitácora: migración de un reporteador bancario a streaming reactivo',
    summary:
      'Trabajo en curso sobre la modernización de un proceso batch heredado hacia microservicios con streaming por cursores. Se comparte el patrón de arquitectura y las decisiones tomadas, sin exponer datos del cliente ni de producción.',
    date: 'Noviembre 2026',
    readTime: '4 min de lectura',
    status: 'en-revision',
    progress: 80,
    sector: 'Sector financiero',
    stack: ['Jakarta EE', 'Oracle SQL', 'Reactive Streams', 'Microservicios'],
    tags: ['Streaming', 'Oracle SQL', 'Jakarta EE', 'Banca'],
    objectives: [
      'Reemplazar la lectura monolítica del reporteador heredado por un flujo continuo con un único puntero de lectura.',
      'Reducir el consumo de memoria de la JVM mediante procesamiento por lotes con contrapresión.',
      'Mantener idempotencia en las transacciones concurrentes durante la migración progresiva.',
    ],
    decisions: [
      'Cursor streaming frente a paginación OFFSET: el cursor mantiene consumo de memoria constante y evita la degradación cuadrática de OFFSET en volúmenes altos.',
      'Lotes atómicos independientes frente a una transacción global: ante un fallo solo se reintenta el lote afectado.',
      'Ajuste del FetchSize del driver para reducir los viajes de red entre la base de datos y la capa de aplicación.',
    ],
    censoredNotes: [
      'Nombre del cliente y de la entidad financiera: censurado.',
      'Esquema, tablas, índices y consultas exactas de producción: censurados.',
      'Cifras exactas de tiempo, memoria y throughput: expresadas solo como órdenes de magnitud.',
      'Fechas internas, responsables y entorno de despliegue: censurados.',
    ],
    nextSteps: [
      'Completar la revisión de idempotencia bajo cargas concurrentes.',
      'Documentar el patrón de cursor streaming como guía reutilizable, sin datos del cliente.',
      'Publicar la versión cerrada en Notas de Ingeniería cuando el trabajo deje de estar en curso.',
    ],
    relatedProjectId: 'banca-streaming-jakarta',
  },
  {
    slug: 'bitacora-preauditoria-facturacion-sunat',
    title: 'Bitácora: pre-auditoría de comprobantes electrónicos antes de la firma',
    summary:
      'Bitácora de trabajo sobre un motor de validación en memoria que intercepta comprobantes antes de la firma digital. Solo se publican las decisiones de diseño; las reglas tributarias internas y los datos de las empresas quedan censurados.',
    date: 'Noviembre 2026',
    readTime: '4 min de lectura',
    status: 'en-curso',
    progress: 65,
    sector: 'Facturación electrónica',
    stack: ['Jakarta EE', 'Microservicios', 'Redis', 'PostgreSQL'],
    tags: ['SUNAT', 'UBL 2.1', 'Redis', 'Facturación'],
    objectives: [
      'Validar aritmética y catálogos en memoria antes de invertir recursos en la firma digital.',
      'Desacoplar el despacho hacia la sede electrónica mediante colas asíncronas con reintentos.',
      'Aislar las reglas de negocio en un motor modular para absorber cambios normativos sin redesplegar el núcleo.',
    ],
    decisions: [
      'Validar antes de firmar: evita gastar ciclos criptográficos en comprobantes que serían rechazados.',
      'Despacho asíncrono con retroceso exponencial: el punto de venta responde al cliente sin esperar la sede electrónica.',
      'Custodia efímera de certificados por empresa para evitar colisiones entre clientes.',
    ],
    censoredNotes: [
      'Nombres y datos de las empresas atendidas: censurados.',
      'Reglas tributarias internas, catálogos y configuración de despliegue: censurados.',
      'Certificados, claves, endpoints y credenciales: nunca se publican.',
      'Tasas exactas de rechazo y volúmenes de producción: expresadas solo como rangos.',
    ],
    nextSteps: [
      'Extender el motor de pre-auditoría a nuevos tipos de comprobante.',
      'Reforzar la conciliación automática de constancias de recepción.',
      'Consolidar las lecciones aprendidas en una nota técnica cerrada.',
    ],
    relatedProjectId: 'centralizador-facturacion-electronica',
  },
  {
    slug: 'bitacora-microservicios-de-consulta',
    title: 'Bitácora: microservicios de consulta con caché y resiliencia',
    summary:
      'Seguimiento del trabajo en curso sobre servicios de consulta de alta concurrencia con caché en memoria. Se comparte la estrategia de resiliencia; proveedores, cuotas y credenciales permanecen censurados.',
    date: 'Noviembre 2026',
    readTime: '3 min de lectura',
    status: 'en-curso',
    progress: 70,
    sector: 'Servicios de consulta',
    stack: ['Microservicios', 'REST APIs', 'Redis', 'TypeScript'],
    tags: ['REST APIs', 'Redis', 'Resiliencia', 'Caché'],
    objectives: [
      'Responder consultas recurrentes desde caché con políticas de caducidad explícitas.',
      'Normalizar los contratos de respuesta y mantenerlos versionados.',
      'Degradar con gracia ante caídas o límites de los proveedores de datos externos.',
    ],
    decisions: [
      'Caché en memoria para consultas recurrentes, con caducidad por tipo de dato.',
      'Contratos REST limpios y documentados para desacoplar consumidores y proveedores.',
      'Health checks y reintentos acotados para proteger la disponibilidad en picos.',
    ],
    censoredNotes: [
      'Identidad de los proveedores de datos y sus condiciones comerciales: censurados.',
      'Claves de acceso, cuotas y configuración de infraestructura: nunca se publican.',
      'Latencias y disponibilidad exactas de producción: expresadas solo como rangos.',
      'Dominios internos y topología de despliegue: censurados.',
    ],
    nextSteps: [
      'Revisar las políticas de caducidad de caché por tipo de consulta.',
      'Ampliar la telemetría de disponibilidad sin exponer datos operativos.',
      'Evaluar nuevos conectores de consulta con el mismo patrón de resiliencia.',
    ],
    relatedProjectId: 'apis-cusco-consultas',
  },
  {
    slug: 'bitacora-publicacion-de-este-portafolio',
    title: 'Bitácora: publicación y mantenimiento de este portafolio',
    summary:
      'Registro transparente del trabajo en curso sobre este mismo sitio: publicación en GitHub, verificación automática de datos y enlaces, y evolución del blog censurado. Sin credenciales ni datos de despliegue.',
    date: 'Noviembre 2026',
    readTime: '3 min de lectura',
    status: 'publicable',
    progress: 90,
    sector: 'Sitio personal',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS'],
    tags: ['Astro', 'SSG', 'WCAG', 'GitHub'],
    objectives: [
      'Mantener el sitio como generación estática con cero JavaScript innecesario.',
      'Bloquear la publicación si quedan datos pendientes o enlaces rotos.',
      'Documentar cada cambio relevante en esta bitácora con datos censurados.',
    ],
    decisions: [
      'Validación tipada con esquemas en compilación antes de cada despliegue.',
      'Verificación integral de datos, tipos, pruebas, build y enlaces en un solo comando.',
      'Blog separado de las Notas de Ingeniería: la bitácora refleja trabajo en curso; las notas, casos cerrados.',
    ],
    censoredNotes: [
      'Credenciales de despliegue, tokens y configuración de infraestructura: nunca se publican.',
      'Datos personales distintos de los canales de contacto públicos: censurados.',
      'Métricas internas de tráfico y analítica: no se publican.',
    ],
    nextSteps: [
      'Añadir nuevas entradas a esta bitácora a medida que avance el trabajo.',
      'Revisar la política de censura cada vez que se incorpore una entrada nueva.',
      'Mantener la verificación automática en verde antes de cada publicación.',
    ],
  },
];
