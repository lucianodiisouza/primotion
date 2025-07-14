import { SpringConfig, AnimationState } from './types';

const DEFAULT_CONFIG: Required<SpringConfig> = {
  tension: 170,
  friction: 26,
  mass: 1,
  damping: 0,
  stiffness: 100,
};

export class SpringAnimation {
  private state: AnimationState;
  private target: number;
  private config: Required<SpringConfig>;
  private animationId: number | null = null;
  private startTime: number = 0;
  private onUpdate?: (value: number) => void;
  private onComplete?: () => void;

  constructor(
    from: number,
    to: number,
    config: SpringConfig = {},
    onUpdate?: (value: number) => void,
    onComplete?: () => void
  ) {
    this.state = { value: from, velocity: 0 };
    this.target = to;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
  }

  start(): void {
    this.startTime = performance.now();
    this.animate();
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate = (): void => {
    const deltaTime = performance.now() - this.startTime;
    this.startTime = performance.now();

    // Spring physics calculation
    const dx = this.target - this.state.value;
    const springForce = this.config.stiffness * dx;
    const dampingForce = this.config.damping * this.state.velocity;
    const totalForce = springForce - dampingForce;
    const acceleration = totalForce / this.config.mass;

    // Update velocity and position
    this.state.velocity += acceleration * (deltaTime / 1000);
    this.state.value += this.state.velocity * (deltaTime / 1000);

    // Apply friction
    this.state.velocity *= (1 - this.config.friction / 1000);

    // Call update callback
    if (this.onUpdate) {
      this.onUpdate(this.state.value);
    }

    // Check if animation should continue
    const isAtRest = Math.abs(dx) < 0.01 && Math.abs(this.state.velocity) < 0.01;
    
    if (isAtRest) {
      this.state.value = this.target;
      if (this.onUpdate) {
        this.onUpdate(this.state.value);
      }
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // Continue animation
    this.animationId = requestAnimationFrame(this.animate);
  };

  getValue(): number {
    return this.state.value;
  }

  setTarget(target: number): void {
    this.target = target;
  }

  updateConfig(config: Partial<SpringConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export function createSpring(
  from: number,
  to: number,
  config?: SpringConfig,
  onUpdate?: (value: number) => void,
  onComplete?: () => void
): SpringAnimation {
  return new SpringAnimation(from, to, config, onUpdate, onComplete);
} 