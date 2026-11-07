import { describe, it, expect } from 'vitest';
import { blogData, REDACTION_POLICY } from '../src/data/blogData';
import { BlogPostSchema } from '../src/schemas/blogSchema';
import { portfolioData } from '../src/data/portfolioData';

describe('Blog censurado: integridad y política anti-filtración', () => {
  it('todas las entradas cumplen con BlogPostSchema', () => {
    for (const post of blogData) {
      expect(BlogPostSchema.safeParse(post).success).toBe(true);
    }
  });

  it('los slugs son únicos y con formato válido', () => {
    const slugs = blogData.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  it('cada entrada declara qué se censuró y próximos pasos', () => {
    expect(REDACTION_POLICY.length).toBeGreaterThan(0);
    blogData.forEach((post) => {
      expect(post.censoredNotes.length).toBeGreaterThan(0);
      expect(post.nextSteps.length).toBeGreaterThan(0);
      expect(post.progress).toBeGreaterThanOrEqual(0);
      expect(post.progress).toBeLessThanOrEqual(100);
    });
  });

  it('ninguna entrada expone URLs, correos, secretos ni IPs internas', () => {
    const forbidden = [
      /PENDIENTE:/,
      /@/,
      /https?:\/\//,
      /\b(?:password|passwd|secret|token|private key)\b/i,
      /\b(?:192\.168\.|10\.\d+\.|172\.(?:1[6-9]|2\d|3[01])\.)/,
    ];
    for (const post of blogData) {
      const serialized = JSON.stringify(post);
      forbidden.forEach((pattern) => expect(serialized).not.toMatch(pattern));
    }
  });

  it('ninguna entrada expone nombres de empleadores o clientes', () => {
    const forbidden = [/COOPAC/i, /Los Andes/, /Soluciones de Software/i, /SSP/i];
    for (const post of blogData) {
      const serialized = JSON.stringify(post);
      forbidden.forEach((pattern) => expect(serialized).not.toMatch(pattern));
    }
  });

  it('las referencias a proyectos relacionados existen en el portafolio', () => {
    const projectIds = new Set(portfolioData.projects.map((p) => p.id));
    blogData.forEach((post) => {
      if (post.relatedProjectId) expect(projectIds.has(post.relatedProjectId)).toBe(true);
    });
  });
});
