import React, { forwardRef } from 'react';
import { SpringProps } from '../types';
import { useSpring } from '../hooks/useSpring';

interface SlideInProps extends Omit<SpringProps, 'from' | 'to'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const SlideIn = forwardRef<HTMLElement, SlideInProps>(
  (
    {
      children,
      direction = 'up',
      distance = 50,
      delay = 0,
      config = {},
      style = {},
      className = '',
      as: Component = 'div',
      onUpdate,
      onComplete,
      ...props
    },
    ref
  ) => {
    const getTransform = (value: number) => {
      switch (direction) {
        case 'up':
          return `translateY(${value}px)`;
        case 'down':
          return `translateY(${-value}px)`;
        case 'left':
          return `translateX(${value}px)`;
        case 'right':
          return `translateX(${-value}px)`;
        default:
          return `translateY(${value}px)`;
      }
    };

    const { value } = useSpring({
      from: distance,
      to: 0,
      config: {
        tension: 150,
        friction: 20,
        ...config,
      },
      immediate: true,
      delay,
      onUpdate,
      onComplete,
    });

    const animatedStyle = {
      ...style,
      transform: getTransform(value),
    };

    return React.createElement(
      Component as any,
      { ref, style: animatedStyle, className, ...props },
      children
    );
  }
);

SlideIn.displayName = 'SlideIn'; 