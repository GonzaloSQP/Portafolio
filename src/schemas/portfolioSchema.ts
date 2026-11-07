import { z } from 'zod';

export const ALLOWED_CATEGORIES = [
  'Streaming & Big Data',
  'Microservicios & Integraciones',
  'Facturación Electrónica & Tributario',
  'Web & Multimedia'
] as const;

export const ALLOWED_TECHNOLOGIES = [
  'Jakarta EE',
  'Java',
  'Oracle SQL',
  'Visual Basic',
  'C# (ASP.NET)',
  'Reactive Streams',
  'Microservicios',
  'REST APIs',
  'SUNAT API',
  'RENIEC API',
  'SOAT API',
  'Node.js',
  'TypeScript',
  'Web Audio API',
  'Docker',
  'PostgreSQL',
  'Redis',
  'Astro',
  'Tailwind CSS'
] as const;

export const ProjectStatusSchema = z.enum([
  'En Producción',
  'Entregado',
  'Confidencial (Bajo NDA)',
  'activo',
  'mantenimiento',
  'archivado',
  'prototipo'
]);

export const BenchmarkMetricSchema = z.object({
  label: z.string(),
  before: z.string(),
  after: z.string(),
  improvement: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'El ID debe contener solo minúsculas, números y guiones'),
  title: z.string().min(3),
  summary: z.string().min(10),
  problem: z.string().min(15),
  contribution: z.string().min(15),
  decisions: z.array(z.string()).min(1),
  technologies: z.array(z.enum(ALLOWED_TECHNOLOGIES)).min(1),
  category: z.enum(ALLOWED_CATEGORIES),
  status: ProjectStatusSchema,
  statusDetail: z.string().optional(),
  featured: z.boolean(),
  ctaText: z.string().optional(),
  baseline: z.string().optional(),
  metricOutcome: z.string().optional(),
  measurementMethod: z.string().optional(),
  architectureFlow: z.array(z.string()).optional(),
  benchmarks: z.array(BenchmarkMetricSchema).optional(),
  links: z.object({
    demo: z.string().url().regex(/^https:\/\//, 'Las URLs de demo deben ser HTTPS').optional(),
    repo: z.string().url().regex(/^https:\/\//, 'Las URLs de repositorio deben ser HTTPS').optional(),
    docs: z.string().url().regex(/^https:\/\//, 'Las URLs de documentación deben ser HTTPS').optional(),
  }),
  media: z.array(
    z.object({
      src: z.string(),
      alt: z.string().min(3),
      width: z.number().positive(),
      height: z.number().positive(),
    })
  ).optional(),
  results: z.array(z.string()).min(1),
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialId: z.string(),
  verificationUrl: z.string().url().regex(/^https:\/\//),
  status: z.enum(['vigente', 'en_renovacion', 'expirado']),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  period: z.string(),
  detail: z.string().optional(),
});

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  highlights: z.array(z.string()),
  technologies: z.array(z.string()),
});

export const ProfileSchema = z.object({
  name: z.string().min(3),
  age: z.number().int().positive(),
  title: z.string().min(5),
  location: z.string(),
  summary: z.string().min(20),
  specialties: z.array(z.string()).min(2),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    github: z.string().url().regex(/^https:\/\//),
    linkedin: z.string().url().regex(/^https:\/\//),
  }),
  certifications: z.array(CertificationSchema),
  education: z.array(EducationSchema).optional(),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type BenchmarkMetric = z.infer<typeof BenchmarkMetricSchema>;
