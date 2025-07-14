import { useState, useEffect, useRef, useCallback } from 'react';
import { UseSpringOptions, UseSpringReturn, SpringConfig } from '../types';
import { SpringAnimation } from '../spring';

export function useSpring(options: UseSpringOptions = {}): UseSpringReturn {
  const {
    from = 0,
    to = 0,
    config = {},
    immediate = false,
    delay = 0,
    onUpdate,
    onComplete,
  } = options;

  const [value, setValueState] = useState(from);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<SpringAnimation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setValue = useCallback((newValue: number) => {
    setValueState(newValue);
    if (animationRef.current) {
      animationRef.current.stop();
    }
    setIsAnimating(false);
  }, []);

  const animate = useCallback((newTo: number, newConfig?: SpringConfig) => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const spring = new SpringAnimation(
      value,
      newTo,
      { ...config, ...newConfig },
      (animatedValue) => {
        setValueState(animatedValue);
        onUpdate?.(animatedValue);
      },
      () => {
        setIsAnimating(false);
        onComplete?.();
      }
    );

    animationRef.current = spring;
    setIsAnimating(true);

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        spring.start();
      }, delay);
    } else {
      spring.start();
    }
  }, [value, config, delay, onUpdate, onComplete]);

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsAnimating(false);
  }, []);

  // Start initial animation if immediate is true
  useEffect(() => {
    if (immediate && to !== from) {
      animate(to, config);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    value,
    setValue,
    animate,
    stop,
    isAnimating,
  };
} 