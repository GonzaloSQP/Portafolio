import { describe, it, expect } from 'vitest';
import {
  distanceSquared,
  getSafeDevicePixelRatio,
  applyCursorDeflection,
  DEFAULT_CONFIG,
} from '../src/lib/animationMath';

describe('Matemáticas y Parámetros del Canvas Algorítmico', () => {
  it('distanceSquared calcula correctamente la distancia cuadrática', () => {
    expect(distanceSquared(0, 0, 3, 4)).toBe(25);
    expect(distanceSquared(10, 10, 10, 10)).toBe(0);
  });

  it('getSafeDevicePixelRatio limita el DPR a un rango seguro entre 1 y 2', () => {
    expect(getSafeDevicePixelRatio(0.5)).toBe(1);
    expect(getSafeDevicePixelRatio(1)).toBe(1);
    expect(getSafeDevicePixelRatio(1.5)).toBe(1.5);
    expect(getSafeDevicePixelRatio(2)).toBe(2);
    expect(getSafeDevicePixelRatio(3.5)).toBe(2); // Capped at 2
  });

  it('applyCursorDeflection repele suavemente dentro del radio', () => {
    const res = applyCursorDeflection(100, 100, 105, 100, 50);
    expect(res.fx).toBeLessThan(0); // Empuja hacia la izquierda
    expect(res.fy).toBe(0);
  });

  it('applyCursorDeflection devuelve 0 fuera del radio de influencia', () => {
    const res = applyCursorDeflection(100, 100, 300, 300, 50);
    expect(res.fx).toBe(0);
    expect(res.fy).toBe(0);
  });

  it('DEFAULT_CONFIG cumple con los presupuestos de rendimiento', () => {
    expect(DEFAULT_CONFIG.count).toBeLessThanOrEqual(100);
    expect(DEFAULT_CONFIG.maxDistance).toBeGreaterThan(50);
  });
});

