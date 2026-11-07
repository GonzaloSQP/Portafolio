import { getSafeDevicePixelRatio } from '../lib/animationMath';

export interface PipelineNode {
  x: number;
  y: number;
  label: string;
  type: 'source' | 'worker' | 'sink';
  radius: number;
}

export class StreamAnimation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;
  private lastTime = 0;
  private isRunning = false;
  private isVisible = true;
  private isTabActive = true;

  // Parámetros del pipeline
  private nodes: PipelineNode[] = [];
  private packetCount = 48;
  // TypedArrays contiguos para paquetes
  private packetX!: Float32Array;
  private packetY!: Float32Array;
  private packetSpeed!: Float32Array;
  private packetSource!: Uint8Array;
  private packetTarget!: Uint8Array;
  private packetProgress!: Float32Array;

  // Estado interactivo
  private mouseX = -9999;
  private mouseY = -9999;
  private selectedNodeIndex: number | null = 3; // Reactive Engine por defecto
  private hoveredNodeIndex: number | null = null;
  private isPaused = false;
  private speedMultiplier = 1.0;
  private pulsePhase = 0;
  private nodeSelectListeners: ((index: number, node: PipelineNode) => void)[] = [];

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private prefersReducedMotion = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.init();
  }

  private init(): void {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = motionQuery.matches;
    if (this.prefersReducedMotion) return;

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.packetX = new Float32Array(this.packetCount);
    this.packetY = new Float32Array(this.packetCount);
    this.packetSpeed = new Float32Array(this.packetCount);
    this.packetSource = new Uint8Array(this.packetCount);
    this.packetTarget = new Uint8Array(this.packetCount);
    this.packetProgress = new Float32Array(this.packetCount);

    this.setupNodes();
    this.resizeCanvas();
    this.initPackets();
    this.setupObservers();
    this.setupListeners();
    this.start();
  }

  private setupNodes(): void {
    const w = this.canvas.clientWidth || 600;
    const h = this.canvas.clientHeight || 400;

    // Arquitectura de 3 capas: Ingesta -> Pipeline Reactivo -> Sinks
    this.nodes = [
      // Ingesta (Izquierda)
      { x: w * 0.15, y: h * 0.28, label: 'Oracle SQL (Cursor)', type: 'source', radius: 14 },
      { x: w * 0.15, y: h * 0.72, label: 'SUNAT / Fiscal Events', type: 'source', radius: 14 },

      // Procesamiento Streaming (Centro)
      { x: w * 0.50, y: h * 0.22, label: 'Jakarta Buffer', type: 'worker', radius: 18 },
      { x: w * 0.50, y: h * 0.50, label: 'Reactive Engine', type: 'worker', radius: 22 },
      { x: w * 0.50, y: h * 0.78, label: 'Batch Chunks', type: 'worker', radius: 18 },

      // Sinks & Destinos (Derecha)
      { x: w * 0.85, y: h * 0.32, label: 'Microservices Core', type: 'sink', radius: 16 },
      { x: w * 0.85, y: h * 0.68, label: 'DB Bulk Insert', type: 'sink', radius: 16 },
    ];
  }

  private initPackets(): void {
    for (let i = 0; i < this.packetCount; i++) {
      this.resetPacket(i);
      this.packetProgress[i] = Math.random();
    }
  }

  private resetPacket(i: number): void {
    const isStageTwo = Math.random() > 0.5;
    if (!isStageTwo) {
      this.packetSource[i] = Math.random() > 0.5 ? 0 : 1;
      this.packetTarget[i] = 2 + Math.floor(Math.random() * 3);
    } else {
      this.packetSource[i] = 2 + Math.floor(Math.random() * 3);
      this.packetTarget[i] = Math.random() > 0.5 ? 5 : 6;
    }

    this.packetProgress[i] = 0;
    this.packetSpeed[i] = 0.006 + Math.random() * 0.009;
  }

  public resizeCanvas(): void {
    if (!this.canvas) return;
    const dpr = getSafeDevicePixelRatio(window.devicePixelRatio);
    const w = this.canvas.clientWidth || 600;
    const h = this.canvas.clientHeight || 400;

    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);

    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    this.setupNodes();
  }

  private setupObservers(): void {
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.canvas);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      this.isVisible = entry.isIntersecting;
      if (this.isVisible && this.isTabActive) this.start();
      else this.stop();
    }, { threshold: 0.05 });
    this.intersectionObserver.observe(this.canvas);
  }

  private setupListeners(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.canvas.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave, { passive: true });
    this.canvas.addEventListener('click', this.handleClick);
  }

  private handleVisibilityChange = (): void => {
    this.isTabActive = !document.hidden;
    if (this.isTabActive && this.isVisible) this.start();
    else this.stop();
  };

  private handleMouseMove = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    let foundHover: number | null = null;
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const dx = this.mouseX - node.x;
      const dy = this.mouseY - node.y;
      if (dx * dx + dy * dy <= (node.radius + 10) * (node.radius + 10)) {
        foundHover = i;
        break;
      }
    }

    this.hoveredNodeIndex = foundHover;
    this.canvas.style.cursor = foundHover !== null ? 'pointer' : 'default';
  };

  private handleMouseLeave = (): void => {
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.hoveredNodeIndex = null;
    this.canvas.style.cursor = 'default';
  };

  private handleClick = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      if (dx * dx + dy * dy <= (node.radius + 12) * (node.radius + 12)) {
        this.selectNode(i);
        break;
      }
    }
  };

  public selectNode(index: number | null, emit = true): void {
    if (this.selectedNodeIndex === index) return;
    this.selectedNodeIndex = index;
    if (emit && index !== null && this.nodes[index]) {
      this.nodeSelectListeners.forEach((fn) => fn(index, this.nodes[index]));
    }
  }

  public getSelectedNodeIndex(): number | null {
    return this.selectedNodeIndex;
  }

  public onNodeSelect(callback: (index: number, node: PipelineNode) => void): void {
    this.nodeSelectListeners.push(callback);
  }

  public setSpeed(multiplier: number): void {
    this.speedMultiplier = Math.max(0.1, Math.min(multiplier, 4.0));
  }

  public togglePause(): boolean {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  public isAnimationPaused(): boolean {
    return this.isPaused;
  }

  public burst(count = 20): void {
    for (let k = 0; k < count; k++) {
      const i = Math.floor(Math.random() * this.packetCount);
      this.resetPacket(i);
      this.packetSpeed[i] *= 2.2;
    }
  }

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
    const dt = Math.min((timestamp - this.lastTime) / 16.667, 2.5);
    this.lastTime = timestamp;

    this.pulsePhase = (this.pulsePhase + 0.05 * dt) % (Math.PI * 2);

    if (!this.isPaused) {
      this.update(dt * this.speedMultiplier);
    }
    this.render();

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(dt: number): void {
    for (let i = 0; i < this.packetCount; i++) {
      let speed = this.packetSpeed[i];

      // Aceleración reactiva si el cursor está cerca del paquete
      const px = this.packetX[i];
      const py = this.packetY[i];
      const dx = px - this.mouseX;
      const dy = py - this.mouseY;
      if (dx * dx + dy * dy < 8000) {
        speed *= 1.8;
      }

      // Si el paquete viaja hacia/desde el nodo seleccionado, aumenta su velocidad y foco
      if (
        this.selectedNodeIndex !== null &&
        (this.packetSource[i] === this.selectedNodeIndex || this.packetTarget[i] === this.selectedNodeIndex)
      ) {
        speed *= 1.35;
      }

      this.packetProgress[i] += speed * dt;

      if (this.packetProgress[i] >= 1) {
        this.resetPacket(i);
      }

      const src = this.nodes[this.packetSource[i]];
      const tgt = this.nodes[this.packetTarget[i]];
      if (src && tgt) {
        const t = this.packetProgress[i];
        this.packetX[i] = src.x + (tgt.x - src.x) * t;
        this.packetY[i] = src.y + (tgt.y - src.y) * t + Math.sin(t * Math.PI) * (i % 2 === 0 ? 8 : -8);
      }
    }
  }

  private render(): void {
    if (!this.ctx) return;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;

    this.ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const pipeColor = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.12)';
    const activePipeColor = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(2, 132, 199, 0.35)';
    const packetColor = isDark ? '#38bdf8' : '#0284c7';
    const selectedPacketColor = isDark ? '#34d399' : '#059669';
    const packetGlow = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)';
    const nodeBg = isDark ? '#0f172a' : '#ffffff';
    const nodeBorder = isDark ? '#334155' : '#cbd5e1';
    const textColor = isDark ? '#cbd5e1' : '#334155';

    // 1. Tuberías fijas de la arquitectura
    const connections: [number, number][] = [
      [0, 2], [0, 3], [1, 3], [1, 4],
      [2, 5], [3, 5], [3, 6], [4, 6]
    ];

    for (const [from, to] of connections) {
      const src = this.nodes[from];
      const tgt = this.nodes[to];
      if (!src || !tgt) continue;

      const isConnectedToSelected =
        this.selectedNodeIndex !== null &&
        (from === this.selectedNodeIndex || to === this.selectedNodeIndex);

      this.ctx.lineWidth = isConnectedToSelected ? 2.5 : 1.5;
      this.ctx.strokeStyle = isConnectedToSelected ? activePipeColor : pipeColor;
      this.ctx.beginPath();
      this.ctx.moveTo(src.x, src.y);
      this.ctx.lineTo(tgt.x, tgt.y);
      this.ctx.stroke();
    }

    // 2. Paquetes de datos en tránsito
    for (let i = 0; i < this.packetCount; i++) {
      const x = this.packetX[i];
      const y = this.packetY[i];

      const isTargetingSelected =
        this.selectedNodeIndex !== null &&
        (this.packetSource[i] === this.selectedNodeIndex || this.packetTarget[i] === this.selectedNodeIndex);

      const color = isTargetingSelected ? selectedPacketColor : packetColor;
      const radius = isTargetingSelected ? 3.5 : 2.5;

      // Brillo del paquete
      this.ctx.fillStyle = packetGlow;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Centro del paquete
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 3. Nodos de arquitectura con etiquetas
    this.ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
    this.ctx.textAlign = 'center';

    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const isSelected = i === this.selectedNodeIndex;
      const isHovered = i === this.hoveredNodeIndex;

      // Pulso alrededor del nodo seleccionado o del motor reactivo
      if (isSelected || (this.selectedNodeIndex === null && i === 3)) {
        const pulseSize = 4 + Math.sin(this.pulsePhase) * 3;
        this.ctx.strokeStyle = isSelected ? 'rgba(52, 211, 153, 0.6)' : activePipeColor;
        this.ctx.lineWidth = isSelected ? 2.5 : 1.5;
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.radius + pulseSize, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // Hover halo
      if (isHovered && !isSelected) {
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // Círculo del nodo
      this.ctx.fillStyle = nodeBg;
      this.ctx.strokeStyle = isSelected ? '#34d399' : (i === 3 ? packetColor : nodeBorder);
      this.ctx.lineWidth = isSelected ? 3 : 2;
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Núcleo del estado del nodo
      this.ctx.fillStyle = isSelected ? '#34d399' : (i === 3 ? '#10b981' : packetColor);
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, isSelected ? 4 : 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Etiqueta del nodo
      this.ctx.fillStyle = isSelected ? (isDark ? '#38bdf8' : '#0284c7') : textColor;
      this.ctx.font = isSelected
        ? 'bold 11px ui-monospace, SFMono-Regular, Menlo, monospace'
        : '10px ui-monospace, SFMono-Regular, Menlo, monospace';
      this.ctx.fillText(n.label, n.x, n.y + n.radius + 15);

      // Badge activo si está seleccionado
      if (isSelected) {
        this.ctx.fillStyle = '#34d399';
        this.ctx.font = 'bold 8px ui-monospace, monospace';
        this.ctx.fillText('▼ SELECCIONADO', n.x, n.y - n.radius - 5);
      }
    }
  }

  public destroy(): void {
    this.stop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.removeEventListener('click', this.handleClick);
  }
}
