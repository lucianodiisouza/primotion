# Primotion

A lightweight, performant React library for adding smooth spring animations to any element. Built with TypeScript and optimized for modern React applications.

[![npm version](https://badge.fury.io/js/primotion.svg)](https://badge.fury.io/js/primotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

- 🎯 **Simple API** - Easy to use hooks and components
- ⚡ **High Performance** - Uses `requestAnimationFrame` for smooth 60fps animations
- 🎨 **Flexible** - Animate any CSS property with spring physics
- 📦 **Lightweight** - No external dependencies, just React
- 🔧 **TypeScript** - Full TypeScript support with type safety
- 🎪 **Preset Configurations** - Pre-configured spring settings for common use cases
- 🚀 **Zero Configuration** - Works out of the box with any React project

## 📦 Installation

```bash
npm install primotion
# or
yarn add primotion
# or
pnpm add primotion
```

## 🚀 Quick Start

### Using the `useSpring` Hook

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function AnimatedCounter() {
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

## 📚 API Reference

### `useSpring(options)`

A React hook that provides spring animation functionality.

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `from` | `number` | `0` | Starting value |
| `to` | `number` | `0` | Target value |
| `config` | `SpringConfig` | `{}` | Spring configuration |
| `immediate` | `boolean` | `false` | Start animation immediately |
| `delay` | `number` | `0` | Delay before starting animation (ms) |
| `onUpdate` | `(value: number) => void` | `undefined` | Callback on each animation frame |
| `onComplete` | `() => void` | `undefined` | Callback when animation completes |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `value` | `number` | Current animated value |
| `setValue` | `(value: number) => void` | Set value immediately |
| `animate` | `(to: number, config?: SpringConfig) => void` | Animate to a new value |
| `stop` | `() => void` | Stop current animation |
| `isAnimating` | `boolean` | Whether animation is currently running |

### `Spring` Component

A component that wraps elements with spring animation capabilities.

#### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `from` | `number` | `0` | Starting value |
| `to` | `number` | `0` | Target value |
| `config` | `SpringConfig` | `{}` | Spring configuration |
| `immediate` | `boolean` | `false` | Start animation immediately |
| `delay` | `number` | `0` | Delay before starting animation |
| `onUpdate` | `(value: number) => void` | `undefined` | Update callback |
| `onComplete` | `() => void` | `undefined` | Complete callback |
| `style` | `React.CSSProperties` | `{}` | Additional styles |
| `className` | `string` | `''` | CSS class name |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |

### `FadeIn` Component

A component for fade-in animations.

#### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `duration` | `number` | `500` | Animation duration (ms) |
| `delay` | `number` | `0` | Delay before starting |
| `config` | `SpringConfig` | `{}` | Spring configuration |
| `style` | `React.CSSProperties` | `{}` | Additional styles |
| `className` | `string` | `''` | CSS class name |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |

### `SlideIn` Component

A component for slide-in animations.

#### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Slide direction |
| `distance` | `number` | `50` | Distance to slide (px) |
| `delay` | `number` | `0` | Delay before starting |
| `config` | `SpringConfig` | `{}` | Spring configuration |
| `style` | `React.CSSProperties` | `{}` | Additional styles |
| `className` | `string` | `''` | CSS class name |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML element to render |

## ⚙️ Spring Configuration

### SpringConfig Interface

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

## 🎯 Examples

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

### Interactive Hover Effects

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

### Loading Spinner

```tsx
import React from 'react';
import { useSpring } from 'primotion';

function LoadingSpinner() {
  const { value } = useSpring({
    from: 0,
    to: 360,
    config: { tension: 100, friction: 20 },
    immediate: true,
  });

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        transform: `rotate(${value}deg)`,
      }}
    />
  );
}
```

### Progress Bar

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const { value, animate } = useSpring({
    from: 0,
    to: progress,
    config: { tension: 150, friction: 20 },
  });

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    animate(newProgress);
  };

  return (
    <div>
      <div
        style={{
          width: '300px',
          height: '20px',
          background: '#f0f0f0',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: '#007bff',
            transition: 'none',
          }}
        />
      </div>
      <button onClick={() => updateProgress(25)}>25%</button>
      <button onClick={() => updateProgress(50)}>50%</button>
      <button onClick={() => updateProgress(75)}>75%</button>
      <button onClick={() => updateProgress(100)}>100%</button>
    </div>
  );
}
```

### Card Flip Animation

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function AnimatedCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { value, animate } = useSpring({
    from: 0,
    to: isFlipped ? 180 : 0,
    config: { tension: 200, friction: 15 },
  });

  return (
    <div
      style={{
        perspective: '1000px',
        width: '200px',
        height: '300px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `rotateY(${value}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'none',
        }}
      >
        {/* Front side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#007bff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backfaceVisibility: 'hidden',
          }}
        >
          Front
        </div>
        
        {/* Back side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#28a745',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          Back
        </div>
      </div>
      
      <button
        onClick={() => {
          setIsFlipped(!isFlipped);
          animate(isFlipped ? 0 : 180);
        }}
        style={{ marginTop: '10px' }}
      >
        Flip Card
      </button>
    </div>
  );
}
```

## 🚀 Performance Tips

1. **Use `immediate: false`** for animations that should start on user interaction
2. **Batch animations** using delays for staggered effects
3. **Clean up animations** by calling `stop()` in useEffect cleanup
4. **Use `requestAnimationFrame`** (already handled by the library)
5. **Avoid animating layout-heavy properties** like `width` and `height`
6. **Use transform properties** for better performance

## 🌐 Browser Support

- React 16.8+ (for hooks support)
- Modern browsers with `requestAnimationFrame` support
- TypeScript 4.0+ (for type definitions)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

### 1.0.1
- Initial release
- Core spring animation engine
- `useSpring` hook
- `Spring`, `FadeIn`, `SlideIn` components
- TypeScript support
- Preset configurations

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/primotion)
- [Issue Tracker](https://github.com/yourusername/primotion/issues)
- [npm Package](https://www.npmjs.com/package/primotion)

---

Made with ❤️ by [Your Name] 