// Marquee.tsx
import React, { useRef, useState, useEffect } from 'react';
import { MarqueeProps } from './types';

const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 'normal',
  behavior = 'scroll',
  pauseOnHover = true,
  pauseOnFocus = true,
  repeat = 2,
  gap = 40,
  duration,
  reverse = false,
  delay = 0,
  className = '',
  ...props
}) => {
  // Use refs to store references to DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State to track whether the animation is paused
  const [isPaused, setIsPaused] = useState(false);
  
  // Generate a unique ID for this marquee instance (for CSS animations)
  const marqueeId = useRef(`marquee-${Math.random().toString(36).substr(2, 9)}`);
  
  // Calculate the actual duration based on speed if not explicitly provided
  const calculateDuration = () => {
    if (duration !== undefined) return duration;
    
    // Speed factors in seconds
    const speedFactors = {
      slow: 30,
      normal: 20,
      fast: 10,
    };
    
    return speedFactors[speed] || 20;
  };
  
  // Determine the animation direction
  const getAnimationDirection = () => {
    if (reverse) {
      switch (direction) {
        case 'left': return 'right';
        case 'right': return 'left';
        case 'up': return 'down';
        case 'down': return 'up';
        default: return 'right';
      }
    }
    return direction;
  };
  
  // Create the animation keyframes based on direction
  useEffect(() => {
    const actualDirection = getAnimationDirection();
    
    // Only create keyframes once for this instance
    const styleId = `style-${marqueeId.current}`;
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    // Define keyframes based on direction
    let keyframes = '';
    switch (actualDirection) {
      case 'left':
        keyframes = `
          @keyframes ${marqueeId.current} {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - ${gap}px / 2)); }
          }
        `;
        break;
      case 'right':
        keyframes = `
          @keyframes ${marqueeId.current} {
            0% { transform: translateX(calc(-50% - ${gap}px / 2)); }
            100% { transform: translateX(0); }
          }
        `;
        break;
      case 'up':
        keyframes = `
          @keyframes ${marqueeId.current} {
            0% { transform: translateY(0); }
            100% { transform: translateY(calc(-50% - ${gap}px / 2)); }
          }
        `;
        break;
      case 'down':
        keyframes = `
          @keyframes ${marqueeId.current} {
            0% { transform: translateY(calc(-50% - ${gap}px / 2)); }
            100% { transform: translateY(0); }
          }
        `;
        break;
    }
    
    styleEl.innerHTML = keyframes;
    
    // Clean up the style element when component unmounts
    return () => {
      if (styleEl && document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [direction, gap, reverse]);
  
  // Create the animation style
  const getAnimationStyle = () => {
    const actualDuration = calculateDuration();
    const animationName = marqueeId.current;
    const animationIterationCount = 'infinite';
    const animationDirection = behavior === 'alternate' ? 'alternate' : 'normal';
    
    return {
      animation: `${animationName} ${actualDuration}s ${animationDirection} linear ${delay}s ${animationIterationCount}`,
      animationPlayState: isPaused ? 'paused' : 'running',
    };
  };
  
  // Create array of repeated children
  const repeatedChildren = [];
  for (let i = 0; i < repeat; i++) {
    repeatedChildren.push(
      <div
        key={i}
        className="blox-marquee-item"
        data-blox-marquee-item=""
        style={{
          ...(direction === 'left' || direction === 'right' 
            ? { marginRight: `${gap}px` } 
            : { marginBottom: `${gap}px` }),
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    );
  }
  
  // Event handlers for pausing
  const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
  const handleMouseLeave = () => pauseOnHover && setIsPaused(false);
  const handleFocus = () => pauseOnFocus && setIsPaused(true);
  const handleBlur = () => pauseOnFocus && setIsPaused(false);
  
  // ARIA live settings based on behavior
  const ariaLive = behavior === 'scroll' ? 'off' : 'polite';
  
  return (
    <div
      className={`blox-marquee ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="marquee"
      aria-live={ariaLive}
      data-blox-marquee=""
      data-direction={direction}
      data-behavior={behavior}
      data-paused={isPaused ? 'true' : 'false'}
      style={{
        overflow: 'hidden',
      }}
      {...props}
    >
      <div
        ref={contentRef}
        className="blox-marquee-content"
        data-blox-marquee-content=""
        style={{
          display: 'flex',
          flexDirection: direction === 'left' || direction === 'right' ? 'row' : 'column',
          ...getAnimationStyle(),
        }}
      >
        {repeatedChildren}
      </div>
    </div>
  );
};

export default Marquee;