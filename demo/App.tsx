import React from 'react';
import { useSpring, Spring, FadeIn, SlideIn, springPresets } from 'primotion';

function App() {
  const [count, setCount] = React.useState(0);
  const { value, animate } = useSpring({ from: 0, to: count });

  const increment = () => {
    setCount(prev => prev + 1);
    animate(count + 1);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        React Spring Animations Demo
      </h1>
      
      {/* Counter with useSpring hook */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2>Animated Counter (useSpring Hook)</h2>
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '20px'
        }}>
          {Math.round(value)}
        </div>
        <button 
          onClick={increment}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#007bff'}
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
            marginBottom: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
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
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
  const [isScaled, setIsScaled] = React.useState(false);
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
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
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
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#5a32a3'}
        onMouseLeave={(e) => e.currentTarget.style.background = '#6f42c1'}
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
            fontSize: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {item}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export default App; 