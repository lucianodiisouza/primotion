import React, { forwardRef } from 'react';
import { SpringProps } from '../types';
import { useSpring } from '../hooks/useSpring';

interface FadeInProps extends Omit<SpringProps, 'from' | 'to'> {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const FadeIn = forwardRef<HTMLElement, FadeInProps>(
  (
    {
      children,
      duration = 500,
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
    const { value } = useSpring({
      from: 0,
      to: 1,
      config: {
        tension: 100,
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
      opacity: value,
    };

    return (
      <Component
        ref={ref}
        style={animatedStyle}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

FadeIn.displayName = 'FadeIn'; 