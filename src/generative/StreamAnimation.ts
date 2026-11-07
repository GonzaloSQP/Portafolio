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

  // Estado interactivo y responsivo
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
  private cachedWidth = 600;
  private cachedHeight = 400;
  private isDarkTheme = true;
  private themeObserver: MutationObserver | null = null;

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

    this.cachedWidth = this.canvas.clientWidth || 600;
    this.cachedHeight = this.canvas.clientHeight || 400;
    this.updateTheme();

    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      this.themeObserver = new MutationObserver(() => this.updateTheme());
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

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

  private updateTheme(): void {
    if (typeof document !== 'undefined') {
      this.isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    }
  }

  private setupNodes(): void {
    const w = this.cachedWidth;
    const h = this.cachedHeight;
    const isMobile = w < 480;

    // Adaptación geométrica responsiva para evitar recortes de texto en pantallas pequeñas
    const colLeft = isMobile ? w * 0.20 : w * 0.16;
    const colMid = w * 0.50;
    const colRight = isMobile ? w * 0.80 : w * 0.84;

    const rSource = isMobile ? 11 : 14;
    const rWorker = isMobile ? 14 : 18;
    const rCore = isMobile ? 18 : 22;
    const rSink = isMobile ? 13 : 16;

    // Arquitectura de 3 capas: Ingesta -> Pipeline Reactivo -> Sinks
    this.nodes = [
      // Ingesta (Izquierda)
      { x: colLeft, y: h * 0.28, label: isMobile ? 'Oracle Cursor' : 'Oracle SQL (Cursor)', type: 'source', radius: rSource },
      { x: colLeft, y: h * 0.72, label: isMobile ? 'SUNAT Events' : 'SUNAT / Fiscal Events', type: 'source', radius: rSource },

      // Procesamiento Streaming (Centro)
      { x: colMid, y: h * 0.22, label: isMobile ? 'Buffer' : 'Jakarta Buffer', type: 'worker', radius: rWorker },
      { x: colMid, y: h * 0.50, label: isMobile ? 'Reactive' : 'Reactive Engine', type: 'worker', radius: rCore },
      { x: colMid, y: h * 0.78, label: isMobile ? 'Chunks' : 'Batch Chunks', type: 'worker', radius: rWorker },

      // Sinks & Destinos (Derecha)
      { x: colRight, y: h * 0.32, label: isMobile ? 'Microservices' : 'Microservices Core', type: 'sink', radius: rSink },
      { x: colRight, y: h * 0.68, label: isMobile ? 'DB Bulk' : 'DB Bulk Insert', type: 'sink', radius: rSink },
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
    this.cachedWidth = this.canvas.clientWidth || 600;
    this.cachedHeight = this.canvas.clientHeight || 400;

    this.canvas.width = Math.floor(this.cachedWidth * dpr);
    this.canvas.height = Math.floor(this.cachedHeight * dpr);

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
    // Pointer Events unificados para mouse, táctil y stylus
    this.canvas.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
  }

  private handleVisibilityChange = (): void => {
    this.isTabActive = !document.hidden;
    if (this.isTabActive && this.isVisible) this.start();
    else this.stop();
  };

  private handlePointerMove = (e: PointerEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    const isMobile = this.cachedWidth < 480;
    const hitPadding = isMobile ? 14 : 10;

    let foundHover: number | null = null;
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const dx = this.mouseX - node.x;
      const dy = this.mouseY - node.y;
      if (dx * dx + dy * dy <= (node.radius + hitPadding) * (node.radius + hitPadding)) {
        foundHover = i;
        break;
      }
    }

    this.hoveredNodeIndex = foundHover;
    this.canvas.style.cursor = foundHover !== null ? 'pointer' : 'default';
  };

  private handlePointerLeave = (): void => {
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.hoveredNodeIndex = null;
    this.canvas.style.cursor = 'default';
  };

  private handlePointerDown = (e: PointerEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const isMobile = this.cachedWidth < 480;
    const hitPadding = isMobile ? 18 : 12;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const dx = clickX - node.x;
      const dy = clickY - node.y;
      const targetR = node.radius + hitPadding;
      if (dx * dx + dy * dy <= targetR * targetR) {
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
    const w = this.cachedWidth;
    const h = this.cachedHeight;
    const isMobile = w < 480;

    this.ctx.clearRect(0, 0, w, h);

    const isDark = this.isDarkTheme;
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

    // 2. Paquetes de datos en tránsito - procesamiento por lotes para 60 FPS estables
    const glowRadiusOffset = 2;
    const normalRadius = isMobile ? 2 : 2.5;
    const selectedRadius = isMobile ? 3 : 3.5;

    // 2.1 Halo/Brillo de todos los paquetes agrupado en una sola operación de dibujo
    this.ctx.fillStyle = packetGlow;
    this.ctx.beginPath();
    for (let i = 0; i < this.packetCount; i++) {
      const isTargetingSelected =
        this.selectedNodeIndex !== null &&
        (this.packetSource[i] === this.selectedNodeIndex || this.packetTarget[i] === this.selectedNodeIndex);
      const r = (isTargetingSelected ? selectedRadius : normalRadius) + glowRadiusOffset;
      const x = this.packetX[i];
      const y = this.packetY[i];
      this.ctx.moveTo(x + r, y);
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    this.ctx.fill();

    // 2.2 Núcleos de paquetes normales
    this.ctx.fillStyle = packetColor;
    this.ctx.beginPath();
    for (let i = 0; i < this.packetCount; i++) {
      const isTargetingSelected =
        this.selectedNodeIndex !== null &&
        (this.packetSource[i] === this.selectedNodeIndex || this.packetTarget[i] === this.selectedNodeIndex);
      if (!isTargetingSelected) {
        const x = this.packetX[i];
        const y = this.packetY[i];
        this.ctx.moveTo(x + normalRadius, y);
        this.ctx.arc(x, y, normalRadius, 0, Math.PI * 2);
      }
    }
    this.ctx.fill();

    // 2.3 Núcleos de paquetes seleccionados / prioritarios
    if (this.selectedNodeIndex !== null) {
      this.ctx.fillStyle = selectedPacketColor;
      this.ctx.beginPath();
      for (let i = 0; i < this.packetCount; i++) {
        if (this.packetSource[i] === this.selectedNodeIndex || this.packetTarget[i] === this.selectedNodeIndex) {
          const x = this.packetX[i];
          const y = this.packetY[i];
          this.ctx.moveTo(x + selectedRadius, y);
          this.ctx.arc(x, y, selectedRadius, 0, Math.PI * 2);
        }
      }
      this.ctx.fill();
    }

    // 3. Nodos de arquitectura con etiquetas
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
      this.ctx.arc(n.x, n.y, isSelected ? 3.5 : 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Etiqueta del nodo
      this.ctx.fillStyle = isSelected ? (isDark ? '#38bdf8' : '#0284c7') : textColor;
      this.ctx.font = isSelected
        ? (isMobile ? 'bold 9px ui-monospace, monospace' : 'bold 11px ui-monospace, monospace')
        : (isMobile ? '8.5px ui-monospace, monospace' : '10px ui-monospace, monospace');
      this.ctx.fillText(n.label, n.x, n.y + n.radius + (isMobile ? 12 : 15));

      // Badge activo si está seleccionado
      if (isSelected) {
        this.ctx.fillStyle = '#34d399';
        this.ctx.font = isMobile ? 'bold 7px ui-monospace, monospace' : 'bold 8px ui-monospace, monospace';
        this.ctx.fillText('▼ ACTIVO', n.x, n.y - n.radius - (isMobile ? 3 : 5));
      }
    }
  }

  public destroy(): void {
    this.stop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.themeObserver) this.themeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
  }
}
