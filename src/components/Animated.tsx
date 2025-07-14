import React, { forwardRef, useMemo } from 'react';
import { AnimatedProps, SpringConfig } from '../types';
import { useSpring } from '../hooks/useSpring';

interface AnimatedComponentProps extends AnimatedProps {
  springProps?: {
    [key: string]: {
      from?: number;
      to?: number;
      config?: SpringConfig;
      immediate?: boolean;
      delay?: number;
    };
  };
}

export const Animated = forwardRef<HTMLElement, AnimatedComponentProps>(
  (
    {
      children,
      springProps = {},
      style = {},
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const springValues = useMemo(() => {
      const values: { [key: string]: number } = {};
      const animations: { [key: string]: any } = {};

      Object.entries(springProps).forEach(([property, config]) => {
        const spring = useSpring({
          from: config.from || 0,
          to: config.to || 0,
          config: config.config || {},
          immediate: config.immediate || false,
          delay: config.delay || 0,
        });

        values[property] = spring.value;
        animations[property] = spring;
      });

      return { values, animations };
    }, [springProps]);

    const animatedStyle = useMemo(() => {
      const result = { ...style };

      Object.entries(springValues.values).forEach(([property, value]) => {
        if (property === 'opacity') {
          result.opacity = value;
        } else if (property === 'scale') {
          result.transform = `scale(${value})`;
        } else if (property === 'rotate') {
          result.transform = `rotate(${value}deg)`;
        } else if (property === 'translateX') {
          result.transform = `translateX(${value}px)`;
        } else if (property === 'translateY') {
          result.transform = `translateY(${value}px)`;
        } else {
          result[property as keyof React.CSSProperties] = `${value}px`;
        }
      });

      return result;
    }, [style, springValues.values]);

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

Animated.displayName = 'Animated'; 