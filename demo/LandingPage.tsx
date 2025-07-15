import React, { useState } from 'react';
import { useSpring, Spring, FadeIn, SlideIn, springPresets } from '../src';
import './styles.css';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [counter, setCounter] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { value, animate } = useSpring({ from: 0, to: counter });

  const increment = () => {
    setCounter(prev => prev + 1);
    animate(counter + 1);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock: React.FC<{ code: string; label: string }> = ({ code, label }) => (
    <div className="code-block-wrapper">
      <div className="code-header">
        <span className="code-label">{label}</span>
        <button 
          className={`copy-btn ${copiedText === label ? 'copied' : ''}`}
          onClick={() => copyToClipboard(code, label)}
        >
          {copiedText === label ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <pre className="code-snippet">{code}</pre>
    </div>
  );

  const CodeBlockDark: React.FC<{ code: string; label: string }> = ({ code, label }) => (
    <div className="code-block-wrapper">
      <div className="code-header dark">
        <span className="code-label">{label}</span>
        <button 
          className={`copy-btn dark ${copiedText === label ? 'copied' : ''}`}
          onClick={() => copyToClipboard(code, label)}
        >
          {copiedText === label ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <pre className="code-block">{code}</pre>
    </div>
  );

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <FadeIn delay={100}>
            <div className="logo">
              <span className="logo-icon">🎬</span>
              <span className="logo-text">Primotion</span>
            </div>
          </FadeIn>
          
          <SlideIn direction="left" delay={200}>
            <div className="nav-links">
              <button 
                className={activeTab === 'hero' ? 'active' : ''} 
                onClick={() => setActiveTab('hero')}
              >
                Home
              </button>
              <button 
                className={activeTab === 'examples' ? 'active' : ''} 
                onClick={() => setActiveTab('examples')}
              >
                Examples
              </button>
              <button 
                className={activeTab === 'docs' ? 'active' : ''} 
                onClick={() => setActiveTab('docs')}
              >
                Documentation
              </button>
            </div>
          </SlideIn>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === 'hero' && (
        <section className="hero">
          <div className="hero-content">
            <FadeIn delay={300}>
              <h1 className="hero-title">
                Smooth Spring Animations
                <br />
                <span className="gradient-text">for React</span>
              </h1>
            </FadeIn>
            
            <SlideIn direction="up" delay={500}>
              <p className="hero-subtitle">
                A lightweight, performant React library for adding smooth spring animations to any element. 
                Built with TypeScript and optimized for modern React applications.
              </p>
            </SlideIn>

            <FadeIn delay={700}>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => setActiveTab('examples')}>
                  🎯 View Examples
                </button>
                <div className="install-section">
                  <button className="btn btn-secondary">
                    <a href="https://www.npmjs.com/package/primotion" target="_blank" rel="noopener noreferrer">
                      📦 Install on npm
                    </a>
                  </button>
                  <div className="install-command">
                    <code>npm install primotion</code>
                    <button 
                      className={`copy-btn-hero ${copiedText === 'npm-install' ? 'copied' : ''}`}
                      onClick={() => copyToClipboard('npm install primotion', 'npm-install')}
                    >
                      {copiedText === 'npm-install' ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Animated Counter Demo */}
            <FadeIn delay={900}>
              <div className="hero-demo">
                <div className="counter-demo">
                  <div className="counter-display">
                    <span className="counter-number">{Math.round(value)}</span>
                  </div>
                  <button className="counter-btn" onClick={increment}>
                    Increment
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Floating Animation Elements */}
          <div className="floating-elements">
            <Spring from={0} to={100} immediate config={springPresets.gentle}>
              <div className="floating-card">🚀</div>
            </Spring>
            <Spring from={0} to={80} immediate config={springPresets.wobbly} delay={200}>
              <div className="floating-card">✨</div>
            </Spring>
            <Spring from={0} to={120} immediate config={springPresets.stiff} delay={400}>
              <div className="floating-card">⚡</div>
            </Spring>
          </div>
        </section>
      )}

      {/* Examples Section */}
      {activeTab === 'examples' && (
        <section className="examples">
          <div className="container">
            <FadeIn>
              <h2 className="section-title">Animation Examples</h2>
            </FadeIn>

            <div className="examples-grid">
              {/* Fade In Example */}
              <FadeIn delay={200}>
                <div className="example-card">
                  <h3>Fade In</h3>
                  <div className="example-demo">
                    <div className="demo-box fade-demo">
                      <span>✨ Smooth Fade In</span>
                    </div>
                  </div>
                  <CodeBlock 
                    code={`<FadeIn delay={200}>
  <div>Your content here</div>
</FadeIn>`}
                    label="fade-in-example"
                  />
                </div>
              </FadeIn>

              {/* Slide In Example */}
              <SlideIn direction="up" delay={400}>
                <div className="example-card">
                  <h3>Slide In</h3>
                  <div className="example-demo">
                    <div className="demo-box slide-demo">
                      <span>🚀 Dynamic Slide In</span>
                    </div>
                  </div>
                  <CodeBlock 
                    code={`<SlideIn direction="up" delay={400}>
  <div>Your content here</div>
</SlideIn>`}
                    label="slide-in-example"
                  />
                </div>
              </SlideIn>

              {/* Spring Hook Example */}
              <FadeIn delay={600}>
                <div className="example-card">
                  <h3>useSpring Hook</h3>
                  <div className="example-demo">
                    <div className="spring-demo">
                      <div 
                        className="spring-box"
                        style={{
                          transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
                        }}
                      >
                        <span>🎯</span>
                      </div>
                    </div>
                  </div>
                  <CodeBlock 
                    code={`const { value, animate } = useSpring({
  from: 0,
  to: 1,
  config: { tension: 200, friction: 15 }
});`}
                    label="spring-hook-example"
                  />
                </div>
              </FadeIn>

              {/* Interactive Example */}
              <SlideIn direction="left" delay={800}>
                <div className="example-card">
                  <h3>Interactive</h3>
                  <div className="example-demo">
                    <div className="interactive-demo">
                      <button className="interactive-btn">
                        🎮 Try Me!
                      </button>
                    </div>
                  </div>
                  <CodeBlock 
                    code={`const { value, animate } = useSpring({
  from: 1,
  to: isHovered ? 1.1 : 1
});`}
                    label="interactive-example"
                  />
                </div>
              </SlideIn>
            </div>
          </div>
        </section>
      )}

      {/* Documentation Section */}
      {activeTab === 'docs' && (
        <section className="documentation">
          <div className="container">
            <FadeIn>
              <h2 className="section-title">Documentation</h2>
              <p className="section-subtitle">
                Learn how to add smooth spring animations to your React applications
              </p>
            </FadeIn>

            <div className="docs-content">
              {/* Getting Started */}
              <SlideIn direction="up" delay={200}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>🚀 Getting Started</h3>
                    <span className="card-badge">Quick Setup</span>
                  </div>
                  <p className="card-description">
                    Install Primotion and start adding animations to your React components in minutes.
                  </p>
                  <CodeBlockDark 
                    code={`npm install primotion
# or
yarn add primotion`}
                    label="installation-command"
                  />
                  <div className="card-tips">
                    <h4>💡 Pro Tips:</h4>
                    <ul>
                      <li>Works with React 16.8+ (hooks support required)</li>
                      <li>TypeScript support included</li>
                      <li>Zero dependencies beyond React</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>

              {/* Basic Usage */}
              <FadeIn delay={400}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>⚡ Basic Usage</h3>
                    <span className="card-badge">Core Concepts</span>
                  </div>
                  <p className="card-description">
                    Start with simple fade and slide animations using our pre-built components.
                  </p>
                  <CodeBlockDark 
                    code={`import { FadeIn, SlideIn } from 'primotion';

function MyComponent() {
  return (
    <div>
      <FadeIn delay={200}>
        <h1>Welcome!</h1>
      </FadeIn>
      
      <SlideIn direction="up" delay={400}>
        <p>This content slides in from below</p>
      </SlideIn>
    </div>
  );
}`}
                    label="basic-usage-example"
                  />
                  <div className="card-tips">
                    <h4>🎯 Key Features:</h4>
                    <ul>
                      <li><strong>FadeIn:</strong> Smooth opacity transitions</li>
                      <li><strong>SlideIn:</strong> Directional slide animations</li>
                      <li><strong>delay:</strong> Control timing with milliseconds</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Spring Hook */}
              <SlideIn direction="up" delay={600}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>🎢 useSpring Hook</h3>
                    <span className="card-badge">Advanced</span>
                  </div>
                  <p className="card-description">
                    Create custom spring animations with full control over physics parameters.
                  </p>
                  <CodeBlockDark 
                    code={`import { useSpring } from 'primotion';

function Counter() {
  const [count, setCount] = useState(0);
  const { value, animate } = useSpring({ 
    from: 0, 
    to: count,
    config: { tension: 200, friction: 15 }
  });

  const increment = () => {
    setCount(prev => prev + 1);
    animate(count + 1);
  };

  return (
    <div>
      <h2>{Math.round(value)}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`}
                    label="spring-hook-example"
                  />
                  <div className="card-tips">
                    <h4>🔧 Configuration Options:</h4>
                    <ul>
                      <li><strong>from/to:</strong> Animation start and end values</li>
                      <li><strong>tension:</strong> Spring stiffness (higher = faster)</li>
                      <li><strong>friction:</strong> Damping (higher = less bouncy)</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>

              {/* Spring Presets */}
              <FadeIn delay={800}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>⚙️ Spring Presets</h3>
                    <span className="card-badge">Configuration</span>
                  </div>
                  <p className="card-description">
                    Use pre-configured spring settings for different animation styles.
                  </p>
                  <CodeBlockDark 
                    code={`import { springPresets } from 'primotion';

// Gentle - smooth and subtle
springPresets.gentle    // { tension: 120, friction: 14 }

// Wobbly - bouncy and playful  
springPresets.wobbly    // { tension: 180, friction: 12 }

// Stiff - quick and precise
springPresets.stiff     // { tension: 210, friction: 20 }

// Slow - relaxed and smooth
springPresets.slow      // { tension: 40, friction: 10 }

// Default - balanced feel
springPresets.default   // { tension: 170, friction: 26 }`}
                    label="spring-presets-example"
                  />
                  <div className="card-tips">
                    <h4>🎨 When to Use Each:</h4>
                    <ul>
                      <li><strong>Gentle:</strong> UI transitions, subtle feedback</li>
                      <li><strong>Wobbly:</strong> Fun interactions, celebrations</li>
                      <li><strong>Stiff:</strong> Quick responses, precise movements</li>
                      <li><strong>Slow:</strong> Relaxed animations, loading states</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Interactive Examples */}
              <SlideIn direction="up" delay={1000}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>🎮 Interactive Animations</h3>
                    <span className="card-badge">Real-world</span>
                  </div>
                  <p className="card-description">
                    Create responsive animations that react to user interactions.
                  </p>
                  <CodeBlockDark 
                    code={`import { useSpring } from 'primotion';

function InteractiveButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { value } = useSpring({
    from: 1,
    to: isHovered ? 1.1 : 1,
    config: springPresets.gentle
  });

  return (
    <button
      style={{ transform: \`scale(\${value})\` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Hover me!
    </button>
  );
}`}
                    label="interactive-example"
                  />
                  <div className="card-tips">
                    <h4>🔄 Common Use Cases:</h4>
                    <ul>
                      <li>Button hover effects</li>
                      <li>Card scaling on focus</li>
                      <li>Progress indicators</li>
                      <li>Loading animations</li>
                    </ul>
                  </div>
                </div>
              </SlideIn>

              {/* Best Practices */}
              <FadeIn delay={1200}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>💡 Best Practices</h3>
                    <span className="card-badge">Guidelines</span>
                  </div>
                  <div className="best-practices">
                    <div className="practice-item">
                      <h4>🎯 Performance</h4>
                      <ul>
                        <li>Use <code>delay</code> to stagger animations</li>
                        <li>Keep spring tension under 300 for smooth motion</li>
                        <li>Avoid animating too many elements simultaneously</li>
                      </ul>
                    </div>
                    <div className="practice-item">
                      <h4>🎨 Design</h4>
                      <ul>
                        <li>Match animation style to your app's personality</li>
                        <li>Use consistent timing across similar interactions</li>
                        <li>Consider user preferences (reduced motion)</li>
                      </ul>
                    </div>
                    <div className="practice-item">
                      <h4>🔧 Development</h4>
                      <ul>
                        <li>Test animations on different devices</li>
                        <li>Use React DevTools to debug spring values</li>
                        <li>Consider accessibility guidelines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* API Reference */}
              <SlideIn direction="up" delay={1400}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>📚 API Reference</h3>
                    <span className="card-badge">Complete</span>
                  </div>
                  <p className="card-description">
                    Complete reference for all components, hooks, and configuration options.
                  </p>
                  
                  <div className="api-section">
                    <h4>🎬 FadeIn Component</h4>
                    <p>Creates smooth fade-in animations with opacity transitions.</p>
                    <CodeBlockDark 
                      code={`<FadeIn 
  delay={200}           // Animation delay in ms
  duration={300}        // Animation duration in ms
  from={0}             // Starting opacity (0-1)
  to={1}               // Ending opacity (0-1)
  config={{...}}       // Spring configuration
>
  <div>Your content</div>
</FadeIn>`}
                      label="fadein-api"
                    />
                  </div>

                  <div className="api-section">
                    <h4>🚀 SlideIn Component</h4>
                    <p>Creates directional slide animations from specified directions.</p>
                    <CodeBlockDark 
                      code={`<SlideIn 
  direction="up"        // "up" | "down" | "left" | "right"
  delay={200}          // Animation delay in ms
  distance={50}        // Slide distance in pixels
  duration={300}       // Animation duration in ms
  config={{...}}       // Spring configuration
>
  <div>Your content</div>
</SlideIn>`}
                      label="slidein-api"
                    />
                  </div>

                  <div className="api-section">
                    <h4>🎢 useSpring Hook</h4>
                    <p>Creates custom spring animations with full physics control.</p>
                    <CodeBlockDark 
                      code={`const { value, animate, isAnimating } = useSpring({
  from: 0,                    // Starting value
  to: 100,                    // Target value
  delay: 0,                   // Animation delay in ms
  duration: undefined,         // Override duration (optional)
  config: {                   // Spring configuration
    tension: 170,             // Spring stiffness
    friction: 26,             // Damping factor
    mass: 1                   // Mass of the spring
  },
  immediate: false,           // Skip animation on mount
  onStart: () => {},          // Callback when animation starts
  onComplete: () => {},       // Callback when animation completes
  onUpdate: (value) => {}     // Callback on each frame
});`}
                      label="usespring-api"
                    />
                  </div>

                  <div className="api-section">
                    <h4>⚙️ Spring Configuration</h4>
                    <p>Fine-tune animation physics with these parameters.</p>
                    <CodeBlockDark 
                      code={`const springConfig = {
  tension: 170,    // Higher = faster, stiffer spring
  friction: 26,    // Higher = less bouncy, more damped
  mass: 1          // Higher = slower, more inertia
};

// Available presets
springPresets.gentle    // { tension: 120, friction: 14 }
springPresets.wobbly    // { tension: 180, friction: 12 }
springPresets.stiff     // { tension: 210, friction: 20 }
springPresets.slow      // { tension: 40, friction: 10 }
springPresets.default   // { tension: 170, friction: 26 }`}
                      label="spring-config-api"
                    />
                  </div>

                  <div className="api-section">
                    <h4>🎯 Spring Component</h4>
                    <p>Direct spring animation wrapper for any element.</p>
                    <CodeBlockDark 
                      code={`<Spring 
  from={0}              // Starting value
  to={100}              // Target value
  delay={0}             // Animation delay
  config={{...}}        // Spring configuration
  immediate={false}     // Skip animation on mount
  onStart={() => {}}    // Animation start callback
  onComplete={() => {}} // Animation complete callback
  onUpdate={(value) => {}} // Frame update callback
>
  {(value) => (
    <div style={{ transform: \`scale(\${value / 100})\` }}>
      Animated content
    </div>
  )}
</Spring>`}
                      label="spring-component-api"
                    />
                  </div>

                  <div className="api-section">
                    <h4>🎨 Animated Component</h4>
                    <p>Universal animation wrapper for any component.</p>
                    <CodeBlockDark 
                      code={`<Animated 
  as="div"              // Element type or component
  from={{ opacity: 0 }} // Starting styles
  to={{ opacity: 1 }}   // Target styles
  delay={200}           // Animation delay
  duration={300}        // Animation duration
  config={{...}}        // Spring configuration
  onStart={() => {}}    // Animation start callback
  onComplete={() => {}} // Animation complete callback
>
  <div>Your animated content</div>
</Animated>`}
                      label="animated-component-api"
                    />
                  </div>
                </div>
              </SlideIn>

              {/* Browser Support & Performance */}
              <FadeIn delay={1600}>
                <div className="docs-card">
                  <div className="card-header">
                    <h3>🌐 Browser Support & Performance</h3>
                    <span className="card-badge">Technical</span>
                  </div>
                  <div className="tech-details">
                    <div className="tech-section">
                      <h4>✅ Supported Browsers</h4>
                      <ul>
                        <li><strong>Chrome:</strong> 60+ (with hardware acceleration)</li>
                        <li><strong>Firefox:</strong> 55+ (with hardware acceleration)</li>
                        <li><strong>Safari:</strong> 12+ (with hardware acceleration)</li>
                        <li><strong>Edge:</strong> 79+ (with hardware acceleration)</li>
                        <li><strong>Mobile:</strong> iOS Safari 12+, Chrome Mobile 60+</li>
                      </ul>
                    </div>
                    <div className="tech-section">
                      <h4>⚡ Performance Tips</h4>
                      <ul>
                        <li>Use <code>transform</code> and <code>opacity</code> for best performance</li>
                        <li>Avoid animating <code>width</code>, <code>height</code>, or <code>margin</code></li>
                        <li>Limit concurrent animations to 10-15 elements</li>
                        <li>Use <code>will-change</code> CSS property for complex animations</li>
                        <li>Consider <code>prefers-reduced-motion</code> for accessibility</li>
                      </ul>
                    </div>
                    <div className="tech-section">
                      <h4>🔧 Bundle Size</h4>
                      <ul>
                        <li><strong>Core:</strong> ~8KB gzipped</li>
                        <li><strong>Tree-shakeable:</strong> Import only what you need</li>
                        <li><strong>Zero dependencies:</strong> Only requires React</li>
                        <li><strong>TypeScript:</strong> Full type definitions included</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <FadeIn delay={100}>
            <div className="footer-content">
              <div className="footer-section">
                <h4>Primotion</h4>
                <p>A lightweight React animation library</p>
              </div>
              <div className="footer-section">
                <h4>Links</h4>
                <a href="https://www.npmjs.com/package/primotion" target="_blank" rel="noopener noreferrer">npm</a>
                <a href="https://github.com/lucianodiisouza/primotion" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              <div className="footer-section">
                <h4>License</h4>
                <p>MIT License</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 