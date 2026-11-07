import { describe, it, expect } from 'vitest';
import { portfolioData } from '../src/data/portfolioData';
import { ProfileSchema } from '../src/schemas/portfolioSchema';

describe('Integridad de Datos y Esquema', () => {
  it('portfolioData cumple estrictamente con el esquema Zod ProfileSchema', () => {
    const result = ProfileSchema.safeParse(portfolioData);
    expect(result.success).toBe(true);
  });

  it('no contiene ningún marcador PENDIENTE: en producción', () => {
    const jsonStr = JSON.stringify(portfolioData);
    expect(jsonStr.includes('PENDIENTE:')).toBe(false);
  });

  it('rechaza datos inválidos que violen el esquema Zod', () => {
    const invalidData = {
      name: 'M', // Menor a 3 caracteres
      age: -1, // Negativo
    };
    const result = ProfileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('detecta marcadores PENDIENTE:', () => {
    const mockDataWithPending = {
      ...portfolioData,
      title: 'PENDIENTE: Titular no confirmado',
    };
    const str = JSON.stringify(mockDataWithPending);
    expect(str.includes('PENDIENTE:')).toBe(true);
  });

  it('todos los proyectos tienen IDs únicos en minúsculas con guiones', () => {
    const ids = portfolioData.projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);

    ids.forEach((id) => {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it('todos los proyectos tienen resultados cuantificables verificables', () => {
    portfolioData.projects.forEach((p) => {
      expect(p.results.length).toBeGreaterThan(0);
      p.results.forEach((r) => expect(r.length).toBeGreaterThan(10));
    });
  });

  it('contiene la certificación verificada del PMI', () => {
    const pmi = portfolioData.certifications.find((c) => c.credentialId === 'FJpF-XMpP');
    expect(pmi).toBeDefined();
    expect(pmi?.issuer).toBe('Project Management Institute (PMI)');
    expect(pmi?.name).toBe('PMI Project Management Ready®');
  });

  it('todos los enlaces externos utilizan protocolo seguro HTTPS', () => {
    portfolioData.projects.forEach((p) => {
      if (p.links.demo) expect(p.links.demo).toMatch(/^https:\/\//);
      if (p.links.repo) expect(p.links.repo).toMatch(/^https:\/\//);
      if (p.links.docs) expect(p.links.docs).toMatch(/^https:\/\//);
    });
    expect(portfolioData.contact.github).toMatch(/^https:\/\//);
    expect(portfolioData.contact.linkedin).toMatch(/^https:\/\//);
  });
});
