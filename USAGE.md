# Primotion - Usage Guide

This guide shows you how to use the Primotion library in your projects.

## Installation

```bash
npm install primotion
# or
yarn add primotion
```

## Basic Usage

### 1. Simple Counter Animation

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

### 2. Fade In Animation

```tsx
import React from 'react';
import { FadeIn } from 'primotion';

function WelcomeMessage() {
  return (
    <FadeIn delay={500}>
      <h1>Welcome to our app!</h1>
    </FadeIn>
  );
}
```

### 3. Slide In Animation

```tsx
import React from 'react';
import { SlideIn } from 'primotion';

function AnimatedCard() {
  return (
    <SlideIn direction="up" delay={200}>
      <div className="card">
        <h2>Animated Card</h2>
        <p>This card slides up from below!</p>
      </div>
    </SlideIn>
  );
}
```

### 4. Custom Spring Animation

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function ScaleButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { value, animate } = useSpring({
    from: 1,
    to: isHovered ? 1.1 : 1,
    config: { tension: 200, friction: 15 },
  });

  return (
    <button
      onMouseEnter={() => {
        setIsHovered(true);
        animate(1.1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        animate(1);
      }}
      style={{
        transform: `scale(${value})`,
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        background: '#007bff',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      Hover me!
    </button>
  );
}
```

## Advanced Usage

### 1. Staggered Animations

```tsx
import React from 'react';
import { FadeIn } from 'primotion';

function TodoList() {
  const todos = [
    'Buy groceries',
    'Walk the dog',
    'Read a book',
    'Call mom',
  ];

  return (
    <div>
      {todos.map((todo, index) => (
        <FadeIn key={todo} delay={index * 100}>
          <div className="todo-item">
            {todo}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
```

### 2. Interactive Animations

```tsx
import React, { useState } from 'react';
import { useSpring } from 'primotion';

function InteractiveBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { value, animate } = useSpring({
    from: 100,
    to: isExpanded ? 200 : 100,
    config: { tension: 150, friction: 20 },
  });

  return (
    <div>
      <div
        style={{
          width: `${value}px`,
          height: `${value}px`,
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          borderRadius: '8px',
          transition: 'none',
        }}
      />
      <button onClick={() => {
        setIsExpanded(!isExpanded);
        animate(isExpanded ? 100 : 200);
      }}>
        {isExpanded ? 'Shrink' : 'Expand'}
      </button>
    </div>
  );
}
```

### 3. Complex Animations

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

## Spring Configuration

### Using Presets

```tsx
import { useSpring, springPresets } from 'primotion';

function AnimatedElement() {
  const { value, animate } = useSpring({
    from: 0,
    to: 100,
    config: springPresets.gentle, // or wobbly, stiff, slow, default
  });

  return <div style={{ transform: `translateX(${value}px)` }}>Animated</div>;
}
```

### Custom Configuration

```tsx
import { useSpring } from 'primotion';

function CustomAnimation() {
  const { value, animate } = useSpring({
    from: 0,
    to: 100,
    config: {
      tension: 200,    // Higher = faster
      friction: 15,    // Lower = more bouncy
      mass: 1,         // Higher = slower
      damping: 0,      // Additional damping
      stiffness: 150,  // Alternative to tension
    },
  });

  return <div style={{ transform: `translateY(${value}px)` }}>Custom</div>;
}
```

## Performance Tips

1. **Use `immediate: false`** for user-triggered animations
2. **Batch animations** with delays for staggered effects
3. **Clean up animations** in useEffect cleanup
4. **Avoid layout-heavy properties** like width/height
5. **Use transform properties** for better performance

## Common Patterns

### Loading States

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

### Progress Bars

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

This library provides a simple yet powerful way to add spring animations to your React applications. The physics-based animations create natural, pleasing motion that enhances user experience. 