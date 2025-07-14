import React, { forwardRef } from 'react';
import { SpringProps } from '../types';
import { useSpring } from '../hooks/useSpring';

export const Spring = forwardRef<HTMLElement, SpringProps>(
  (
    {
      children,
      from = 0,
      to = 0,
      config = {},
      immediate = false,
      delay = 0,
      onUpdate,
      onComplete,
      style = {},
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const { value, animate } = useSpring({
      from,
      to,
      config,
      immediate,
      delay,
      onUpdate,
      onComplete,
    });

    const animatedStyle = {
      ...style,
      transform: `translateY(${value}px)`,
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

Spring.displayName = 'Spring'; 