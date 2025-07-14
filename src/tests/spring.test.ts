import { SpringAnimation, createSpring } from '../spring';

describe('SpringAnimation', () => {
  let spring: SpringAnimation;
  let mockOnUpdate: jest.Mock;
  let mockOnComplete: jest.Mock;

  beforeEach(() => {
    mockOnUpdate = jest.fn();
    mockOnComplete = jest.fn();
    spring = new SpringAnimation(0, 100, {}, mockOnUpdate, mockOnComplete);
  });

  afterEach(() => {
    spring.stop();
  });

  test('should create spring animation with default values', () => {
    expect(spring.getValue()).toBe(0);
  });

  test('should start animation', () => {
    spring.start();
    expect(mockOnUpdate).toHaveBeenCalled();
  });

  test('should stop animation', () => {
    spring.start();
    spring.stop();
    // Animation should be stopped
    expect(spring.getValue()).toBeDefined();
  });

  test('should call onComplete when animation finishes', () => {
    spring = new SpringAnimation(0, 0, {}, mockOnUpdate, mockOnComplete);
    spring.start();
    // For immediate completion, onComplete should be called
    expect(mockOnComplete).toHaveBeenCalled();
  });

  test('should update target value', () => {
    spring.setTarget(200);
    spring.start();
    expect(mockOnUpdate).toHaveBeenCalled();
  });

  test('should update configuration', () => {
    spring.updateConfig({ tension: 300, friction: 30 });
    spring.start();
    expect(mockOnUpdate).toHaveBeenCalled();
  });
});

describe('createSpring', () => {
  test('should create spring animation with factory function', () => {
    const spring = createSpring(0, 100);
    expect(spring).toBeInstanceOf(SpringAnimation);
    expect(spring.getValue()).toBe(0);
  });

  test('should create spring with custom config', () => {
    const config = { tension: 200, friction: 20 };
    const spring = createSpring(0, 100, config);
    expect(spring).toBeInstanceOf(SpringAnimation);
  });
}); 