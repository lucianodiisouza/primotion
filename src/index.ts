// Core animation engine
export { SpringAnimation, createSpring } from './spring';

// React hooks
export { useSpring } from './hooks/useSpring';

// React components
export { Spring } from './components/Spring';
export { Animated } from './components/Animated';
export { FadeIn } from './components/FadeIn';
export { SlideIn } from './components/SlideIn';

// Types
export type {
  SpringConfig,
  AnimationState,
  SpringAnimation as ISpringAnimation,
  UseSpringOptions,
  UseSpringReturn,
  SpringProps,
  AnimatedProps,
} from './types';

// Preset configurations
export const springPresets = {
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 40, friction: 10 },
  default: { tension: 170, friction: 26 },
} as const; 