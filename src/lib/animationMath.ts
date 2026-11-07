/**
 * Utilidades matemáticas puras y sin efectos secundarios para el sistema de partículas procedural.
 * Cero asignaciones por frame.
 */

export interface ParticleConfig {
  count: number;
  maxDistance: number;
  speedMultiplier: number;
  mouseRadius: number;
}

export const DEFAULT_CONFIG: ParticleConfig = {
  count: 65,
  maxDistance: 110,
  speedMultiplier: 0.65,
  mouseRadius: 130,
};

/**
 * Calcula la distancia euclidiana al cuadrado (evita Math.sqrt para comparaciones rápidas).
 */
export function distanceSquared(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

/**
 * Normaliza y acota el ratio de píxeles del dispositivo para evitar sobrecalentamiento en pantallas HiDPI/Retina.
 */
export function getSafeDevicePixelRatio(dpr = 1): number {
  return Math.min(Math.max(dpr, 1), 2);
}

/**
 * Aplica fuerza de dispersión sutil ante la presencia del cursor.
 */
export function applyCursorDeflection(
  px: number,
  py: number,
  mx: number,
  my: number,
  radius: number
): { fx: number; fy: number } {
  const dx = px - mx;
  const dy = py - my;
  const distSq = dx * dx + dy * dy;
  const radSq = radius * radius;

  if (distSq > 0 && distSq < radSq) {
    const force = (1 - Math.sqrt(distSq) / radius) * 0.8;
    return {
      fx: (dx / Math.sqrt(distSq)) * force,
      fy: (dy / Math.sqrt(distSq)) * force,
    };
  }
  return { fx: 0, fy: 0 };
}

