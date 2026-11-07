import {
  distanceSquared,
  getSafeDevicePixelRatio,
  applyCursorDeflection,
  DEFAULT_CONFIG,
} from '../lib/animationMath';

export class StreamAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private lastTime = 0;
  private isRunning = false;
  private isVisible = true;
  private isTabActive = true;

  // Parámetros y buffers preasignados (Cero asignaciones por frame)
  private count: number;
  private maxDistanceSq: number;
  private pos!: Float32Array;
  private vel!: Float32Array;

  // Interacción
  private mouseX = -9999;
  private mouseY = -9999;
  private mouseRadius: number;

  // Observadores y oyentes
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private prefersReducedMotion = false;

  constructor(canvas: HTMLCanvasElement, count = DEFAULT_CONFIG.count) {
    this.canvas = canvas;
    this.count = count;
    this.maxDistanceSq = DEFAULT_CONFIG.maxDistance * DEFAULT_CONFIG.maxDistance;
    this.mouseRadius = DEFAULT_CONFIG.mouseRadius;
    this.init();
  }

  private init(): void {
    // 1. Comprobar preferencia de movimiento reducido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = motionQuery.matches;
    if (this.prefersReducedMotion) {
      return; // No iniciamos el bucle procedural si el usuario prefiere movimiento reducido
    }

    // 2. Obtener contexto 2D
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) {
      console.warn('Canvas 2D context not available');
      return;
    }

    // 3. Preasignar buffers contiguos de memoria
    this.pos = new Float32Array(this.count * 2);
    this.vel = new Float32Array(this.count * 2);

    this.resizeCanvas();
    this.initParticles();

    // 4. Configurar observadores de rendimiento
    this.setupObservers();
    this.setupListeners();

    // 5. Iniciar bucle
    this.start();
  }

  private initParticles(): void {
    const width = this.canvas.clientWidth || 800;
    const height = this.canvas.clientHeight || 500;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 2;
      this.pos[idx] = Math.random() * width;
      this.pos[idx + 1] = Math.random() * height;

      // Velocidades suaves simulando flujo continuo horizontal/diagonal
      this.vel[idx] = (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1) * 0.45;
      this.vel[idx + 1] = (Math.random() * 0.6 - 0.3) * 0.45;
    }
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    const dpr = getSafeDevicePixelRatio(window.devicePixelRatio);
    const width = this.canvas.clientWidth || 800;
    const height = this.canvas.clientHeight || 500;

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);

    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  private setupObservers(): void {
    // Redimensionar solo fuera del loop
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });
    this.resizeObserver.observe(this.canvas);

    // Pausar si no está en el viewport
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && this.isTabActive) {
          this.start();
        } else {
          this.stop();
        }
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(this.canvas);
  }

  private setupListeners(): void {
    // Pausar si la pestaña se oculta
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Interacción sutil con el puntero
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });
  }

  private handleVisibilityChange = (): void => {
    this.isTabActive = !document.hidden;
    if (this.isTabActive && this.isVisible) {
      this.start();
    } else {
      this.stop();
    }
  };

  private handleMouseMove = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  };

  private handleMouseLeave = (): void => {
    this.mouseX = -9999;
    this.mouseY = -9999;
  };

  private start(): void {
    if (this.isRunning || this.prefersReducedMotion) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  private stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop = (timestamp: number): void => {
    if (!this.isRunning || !this.ctx) return;

    // Control de delta time para independencia de framerate
    const dt = Math.min((timestamp - this.lastTime) / 16.667, 2.5);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    for (let i = 0; i < this.count; i++) {
      const idx = i * 2;
      let px = this.pos[idx];
      let py = this.pos[idx + 1];

      // Deflexión por puntero
      const { fx, fy } = applyCursorDeflection(px, py, this.mouseX, this.mouseY, this.mouseRadius);
      this.vel[idx] += fx * 0.15;
      this.vel[idx + 1] += fy * 0.15;

      // Amortiguación suave
      this.vel[idx] *= 0.985;
      this.vel[idx + 1] *= 0.985;

      // Actualizar posición con delta time
      px += this.vel[idx] * dt;
      py += this.vel[idx + 1] * dt;

      // Envoltura toroidal en los bordes
      if (px < 0) px = width;
      else if (px > width) px = 0;
      if (py < 0) py = height;
      else if (py > height) py = 0;

      this.pos[idx] = px;
      this.pos[idx + 1] = py;
    }
  }

  private render(): void {
    if (!this.ctx) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.ctx.clearRect(0, 0, width, height);

    // Obtener colores dinámicos según el tema activo
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nodeColor = isDark ? '#38bdf8' : '#0284c7';
    const lineColor = isDark ? 'rgba(56, 189, 248,' : 'rgba(2, 132, 199,';

    // 1. Dibujar conexiones de proximidad (Pipeline de Nodos)
    this.ctx.lineWidth = 0.85;
    for (let i = 0; i < this.count; i++) {
      const idx1 = i * 2;
      const x1 = this.pos[idx1];
      const y1 = this.pos[idx1 + 1];

      for (let j = i + 1; j < this.count; j++) {
        const idx2 = j * 2;
        const x2 = this.pos[idx2];
        const y2 = this.pos[idx2 + 1];

        const dSq = distanceSquared(x1, y1, x2, y2);
        if (dSq < this.maxDistanceSq) {
          const alpha = (1 - dSq / this.maxDistanceSq) * 0.35;
          this.ctx.strokeStyle = `${lineColor}${alpha})`;
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
        }
      }
    }

    // 2. Dibujar nodos / partículas
    this.ctx.fillStyle = nodeColor;
    for (let i = 0; i < this.count; i++) {
      const idx = i * 2;
      const x = this.pos[idx];
      const y = this.pos[idx + 1];

      this.ctx.beginPath();
      this.ctx.arc(x, y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  public destroy(): void {
    this.stop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

