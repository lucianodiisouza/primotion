import React from 'react';

export interface SpringConfig {
  tension?: number;
  friction?: number;
  mass?: number;
  damping?: number;
  stiffness?: number;
}

export interface AnimationState {
  value: number;
  velocity: number;
}

export interface SpringAnimation {
  from: number;
  to: number;
  config?: SpringConfig;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}

export interface UseSpringOptions {
  from?: number;
  to?: number;
  config?: SpringConfig;
  immediate?: boolean;
  delay?: number;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}

export interface UseSpringReturn {
  value: number;
  setValue: (value: number) => void;
  animate: (to: number, config?: SpringConfig) => void;
  stop: () => void;
  isAnimating: boolean;
}

export interface SpringProps {
  children: React.ReactNode;
  from?: number;
  to?: number;
  config?: SpringConfig;
  immediate?: boolean;
  delay?: number;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export interface AnimatedProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  [key: string]: any;
} 