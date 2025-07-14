# Primotion

A lightweight, performant React library for adding smooth spring animations to any element. Built with TypeScript and optimized for modern React applications.

## Features

- 🎯 **Simple API** - Easy to use hooks and components
- ⚡ **High Performance** - Uses `requestAnimationFrame` for smooth animations
- 🎨 **Flexible** - Animate any CSS property with spring physics
- 📦 **Lightweight** - No external dependencies, just React
- 🔧 **TypeScript** - Full TypeScript support with type safety
- 🎪 **Preset Configurations** - Pre-configured spring settings for common use cases

## Installation

```bash
npm install primotion
# or
yarn add primotion
```

## Quick Start

### Using the `useSpring` Hook

```tsx
import React from 'react';
import { useSpring } from 'primotion';

function AnimatedCounter() {
  const { value, animate } = useSpring({ from: 0, to: 100 });

  return (
    <div>
      <h1>{Math.round(value)}</h1>
      <button onClick={() => animate(200)}>Animate to 200</button>
    </div>
  );
}
```

### Using the `Spring` Component

```tsx
import React from 'react';
import { Spring } from 'primotion';

function AnimatedBox() {
  return (
    <Spring from={0} to={100} immediate>
      <div style={{ padding: '20px', background: 'blue', color: 'white' }}>
        This box will slide down from the top!
      </div>
    </Spring>
  );
}
```

### Using Pre-built Components

```tsx
import React from 'react';
import { FadeIn, SlideIn } from 'primotion';

function App() {
  return (
    <div>
      <FadeIn delay={200}>
        <h1>This will fade in!</h1>
      </FadeIn>
      
      <SlideIn direction="up" delay={400}>
        <p>This will slide up from below!</p>
      </SlideIn>
    </div>
  );
}
```

## API Reference

### `useSpring(options)`

A React hook that provides spring animation functionality.

#### Options

- `from` (number): Starting value (default: 0)
- `to` (number): Target value (default: 0)
- `config` (SpringConfig): Spring configuration
- `immediate` (boolean): Start animation immediately (default: false)
- `delay` (number): Delay before starting animation in ms (default: 0)
- `onUpdate` (function): Callback called on each animation frame
- `onComplete` (function): Callback called when animation completes

#### Returns

- `value` (number): Current animated value
- `setValue` (function): Set value immediately
- `animate` (function): Animate to a new value
- `stop` (function): Stop current animation
- `isAnimating` (boolean): Whether animation is currently running

### `Spring` Component

A component that wraps elements with spring animation capabilities.

#### Props

- `from` (number): Starting value
- `to` (number): Target value
- `config` (SpringConfig): Spring configuration
- `immediate` (boolean): Start animation immediately
- `delay` (number): Delay before starting animation
- `onUpdate` (function): Update callback
- `onComplete` (function): Complete callback
- `style` (object): Additional styles
- `className` (string): CSS class name
- `as` (string): HTML element to render (default: 'div')

### `FadeIn` Component

A component for fade-in animations.

#### Props

- `children` (ReactNode): Content to animate
- `duration` (number): Animation duration in ms
- `delay` (number): Delay before starting
- `config` (SpringConfig): Spring configuration
- `style` (object): Additional styles
- `className` (string): CSS class name
- `as` (string): HTML element to render

### `SlideIn` Component

A component for slide-in animations.

#### Props

- `children` (ReactNode): Content to animate
- `direction` ('up' | 'down' | 'left' | 'right'): Slide direction
- `distance` (number): Distance to slide in pixels
- `delay` (number): Delay before starting
- `config` (SpringConfig): Spring configuration
- `style` (object): Additional styles
- `className` (string): CSS class name
- `as` (string): HTML element to render

## Spring Configuration

### SpringConfig

```typescript
interface SpringConfig {
  tension?: number;    // Spring stiffness (default: 170)
  friction?: number;   // Damping factor (default: 26)
  mass?: number;       // Mass of the spring (default: 1)
  damping?: number;    // Additional damping (default: 0)
  stiffness?: number;  // Alternative to tension (default: 100)
}
```

### Preset Configurations

```typescript
import { springPresets } from 'primotion';

// Available presets
springPresets.gentle    // { tension: 120, friction: 14 }
springPresets.wobbly    // { tension: 180, friction: 12 }
springPresets.stiff     // { tension: 210, friction: 20 }
springPresets.slow      // { tension: 40, friction: 10 }
springPresets.default   // { tension: 170, friction: 26 }
```

## Examples

### Animated Counter

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function Counter() {
  const [count, setCount] = useState(0);
  const { value, animate } = useSpring({ from: 0, to: count });

  const increment = () => {
    setCount(prev => prev + 1);
    animate(count + 1);
  };

  return (
    <div>
      <h1>{Math.round(value)}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Staggered Animations

```tsx
import React from 'react';
import { FadeIn } from 'primotion';

function StaggeredList() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div>
      {items.map((item, index) => (
        <FadeIn key={item} delay={index * 100}>
          <div style={{ padding: '10px', margin: '5px', background: '#f0f0f0' }}>
            {item}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
```

### Custom Spring Animation

```tsx
import React from 'react';
import { useSpring } from 'primotion';

function CustomAnimation() {
  const { value, animate } = useSpring({
    from: 0,
    to: 1,
    config: { tension: 200, friction: 15 },
    immediate: true,
  });

  return (
    <div>
      <div
        style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          borderRadius: '50%',
          transform: `scale(${value})`,
          transition: 'none',
        }}
      />
      <button onClick={() => animate(value === 1 ? 0.5 : 1)}>
        Toggle Scale
      </button>
    </div>
  );
}
```

### Animated List with Hover Effects

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function AnimatedList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const items = ['Apple', 'Banana', 'Cherry', 'Date'];

  return (
    <div>
      {items.map((item, index) => {
        const { value, animate } = useSpring({
          from: 0,
          to: hoveredIndex === index ? 1 : 0,
          config: { tension: 150, friction: 20 },
        });

        return (
          <div
            key={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              padding: '15px',
              margin: '5px',
              background: '#f8f9fa',
              borderRadius: '8px',
              transform: `translateX(${value * 20}px)`,
              transition: 'none',
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
```

## Performance Tips

1. **Use `immediate: false`** for animations that should start on user interaction
2. **Batch animations** using delays for staggered effects
3. **Clean up animations** by calling `stop()` in useEffect cleanup
4. **Use `requestAnimationFrame`** (already handled by the library)
5. **Avoid animating layout-heavy properties** like `width` and `height`

## Browser Support

- React 16.8+ (for hooks support)
- Modern browsers with `requestAnimationFrame` support
- TypeScript 4.0+ (for type definitions)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### 1.0.0
- Initial release
- Core spring animation engine
- `useSpring` hook
- `Spring`, `FadeIn`, `SlideIn` components
- TypeScript support
- Preset configurations 