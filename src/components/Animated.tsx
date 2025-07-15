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
    // Create individual springs for each property
    const springs = useMemo(() => {
      const springMap: { [key: string]: any } = {};
      
      Object.entries(springProps).forEach(([property, config]: [string, any]) => {
        springMap[property] = useSpring({
          from: config.from || 0,
          to: config.to || 0,
          config: config.config || {},
          immediate: config.immediate || false,
          delay: config.delay || 0,
        });
      });
      
      return springMap;
    }, [springProps]);

    const animatedStyle = useMemo(() => {
      const result = { ...style };

      Object.entries(springs).forEach(([property, spring]) => {
        const value = spring.value;
        
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
    }, [style, springs]);

    return React.createElement(
      Component as any,
      { ref, style: animatedStyle, className, ...props },
      children
    );
  }
);

Animated.displayName = 'Animated'; 