import { z } from 'zod';

export const BlogStatusSchema = z.enum(['en-curso', 'en-revision', 'publicable']);

export const BLOG_STATUS_LABELS: Record<z.infer<typeof BlogStatusSchema>, string> = {
  'en-curso': 'En curso',
  'en-revision': 'En revisión',
  publicable: 'Publicable',
};

export const BlogPostSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'El slug debe contener solo minúsculas, números y guiones'),
  title: z.string().min(10),
  summary: z.string().min(20),
  date: z.string().min(5),
  readTime: z.string().min(3),
  status: BlogStatusSchema,
  progress: z.number().int().min(0).max(100),
  sector: z.string().min(3),
  stack: z.array(z.string()).min(1),
  tags: z.array(z.string()).min(1),
  objectives: z.array(z.string()).min(1),
  decisions: z.array(z.string()).min(1),
  censoredNotes: z.array(z.string()).min(1),
  nextSteps: z.array(z.string()).min(1),
  relatedProjectId: z.string().optional(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogStatus = z.infer<typeof BlogStatusSchema>;
