import React, { useState } from 'react';
import { useSpring, Spring, FadeIn, SlideIn, springPresets } from 'primotion';

function BasicExample() {
  const [count, setCount] = useState(0);
  const { value, animate } = useSpring({ from: 0, to: count });

  const increment = () => {
    setCount(prev => prev + 1);
    animate(count + 1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Spring Animations - Basic Example</h1>
      
      {/* Counter with useSpring hook */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Animated Counter (useSpring Hook)</h2>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>
          {Math.round(value)}
        </div>
        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </section>

      {/* Spring component */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Spring Component</h2>
        <Spring from={0} to={100} immediate config={springPresets.gentle}>
          <div style={{
            padding: '20px',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            color: 'white',
            borderRadius: '10px',
            marginBottom: '10px'
          }}>
            This box slides down with a gentle spring animation!
          </div>
        </Spring>
      </section>

      {/* FadeIn component */}
      <section style={{ marginBottom: '40px' }}>
        <h2>FadeIn Component</h2>
        <FadeIn delay={200}>
          <div style={{
            padding: '15px',
            background: '#28a745',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            This text fades in smoothly!
          </div>
        </FadeIn>
      </section>

      {/* SlideIn components */}
      <section style={{ marginBottom: '40px' }}>
        <h2>SlideIn Components</h2>
        <SlideIn direction="up" delay={400}>
          <div style={{
            padding: '15px',
            background: '#17a2b8',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            Slides up from below
          </div>
        </SlideIn>
        
        <SlideIn direction="left" delay={600}>
          <div style={{
            padding: '15px',
            background: '#fd7e14',
            color: 'white',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            Slides in from the right
          </div>
        </SlideIn>
      </section>

      {/* Custom spring animation */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Custom Spring Animation</h2>
        <CustomScaleAnimation />
      </section>

      {/* Staggered animations */}
      <section>
        <h2>Staggered Animations</h2>
        <StaggeredList />
      </section>
    </div>
  );
}

function CustomScaleAnimation() {
  const [isScaled, setIsScaled] = useState(false);
  const { value, animate } = useSpring({
    from: 1,
    to: isScaled ? 1.5 : 1,
    config: { tension: 200, friction: 15 },
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          borderRadius: '50%',
          transform: `scale(${value})`,
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        {Math.round(value * 100)}%
      </div>
      <button 
        onClick={() => {
          setIsScaled(!isScaled);
          animate(isScaled ? 1 : 1.5);
        }}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          background: '#6f42c1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {isScaled ? 'Shrink' : 'Scale Up'}
      </button>
    </div>
  );
}

function StaggeredList() {
  const items = ['🍎 Apple', '🍌 Banana', '🍒 Cherry', '📅 Date', '🥝 Kiwi'];

  return (
    <div>
      {items.map((item, index) => (
        <FadeIn key={item} delay={index * 150}>
          <div style={{
            padding: '12px',
            margin: '8px 0',
            background: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #dee2e6',
            fontSize: '16px'
          }}>
            {item}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export default BasicExample; 