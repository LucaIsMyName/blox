import React, { useRef, useState, useEffect } from "react";
import { MarqueeProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Marquee: React.FC<MarqueeProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<MarqueeProps>("Marquee");
  const { children, variant = config.props.variant || "primary", direction = config.props.direction || "left", speed = config.props.speed || "normal", behavior = config.props.behavior || "scroll", pauseOnHover = config.props.pauseOnHover !== undefined ? config.props.pauseOnHover : true, pauseOnFocus = config.props.pauseOnFocus !== undefined ? config.props.pauseOnFocus : true, repeat = config.props.repeat || 2, gap = config.props.gap || 40, duration = config.props.duration, reverse = config.props.reverse || false, delay = config.props.delay || 0, className = "", ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Marquee");
  }, []);

  // Calculate the actual duration based on speed if not explicitly provided
  const calculateDuration = () => {
    if (duration) return duration;

    // Use CSS variables for speed factors with fallbacks
    const speedFactors = {
      slow: "var(--blox-marquee-speed-slow, 30)",
      normal: "var(--blox-marquee-speed-normal, 20)",
      fast: "var(--blox-marquee-speed-fast, 10)",
    };

    return parseInt(speedFactors[speed], 10) || 20;
  };

  // Determine the animation direction
  const getAnimationDirection = () => {
    if (reverse) {
      switch (direction) {
        case "left":
          return "right";
        case "right":
          return "left";
        case "up":
          return "down";
        case "down":
          return "up";
        default:
          return "right";
      }
    }
    return direction;
  };

  // ARIA live settings based on behavior
  const ariaLive = behavior === "scroll" ? "off" : "polite";

  // Direction classes for animation and flex settings
  const directionClasses = {
    left: "flex-row",
    right: "flex-row",
    up: "flex-col",
    down: "flex-col",
  };

  // Create the animation style based on direction
  const getAnimationStyle = () => {
    const actualDuration = calculateDuration();
    const actualDirection = getAnimationDirection();

    let keyframesName;
    switch (actualDirection) {
      case "left":
        keyframesName = "marquee-left";
        break;
      case "right":
        keyframesName = "marquee-right";
        break;
      case "up":
        keyframesName = "marquee-up";
        break;
      case "down":
        keyframesName = "marquee-down";
        break;
      default:
        keyframesName = "marquee-left";
    }

    const animationIterationCount = behavior === "alternate" ? "infinite" : "infinite";
    const animationDirection = behavior === "alternate" ? "alternate" : "normal";

    return {
      animation: `${keyframesName} ${actualDuration}s ${animationDirection} linear ${delay}s ${animationIterationCount}`,
      animationPlayState: isPaused ? "paused" : "running",
    };
  };

  // Create custom style using CSS variables
  const getContainerStyle = () => {
    return {
      backgroundColor: `var(--blox-color-${variant}-50, var(--blox-marquee-bg-color, #f0f9ff))`,
      color: `var(--blox-color-${variant}-900, var(--blox-marquee-text-color, #0c4a6e))`,
      borderColor: `var(--blox-color-${variant}-200, var(--blox-marquee-border-color, #bae6fd))`,
      borderWidth: "var(--blox-marquee-border-width, 1px)",
      borderRadius: "var(--blox-border-radius-md, var(--blox-marquee-border-radius, 0.25rem))",
      padding: "var(--blox-marquee-padding, 0.5rem 0)",
    };
  };

  // Create array of repeated children
  const repeatedChildren = [];
  for (let i = 0; i < repeat; i++) {
    repeatedChildren.push(
      <div
        key={i}
        className="flex-shrink-0"
        style={{
          marginRight: direction === "left" || direction === "right" ? `${gap}px` : 0,
          marginBottom: direction === "up" || direction === "down" ? `${gap}px` : 0,
        }}>
        {children}
      </div>
    );
  }

  // Event handlers for pausing
  const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
  const handleMouseLeave = () => pauseOnHover && setIsPaused(false);
  const handleFocus = () => pauseOnFocus && setIsPaused(true);
  const handleBlur = () => pauseOnFocus && setIsPaused(false);

  useEffect(() => {
    // Add keyframe styles to document head
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes marquee-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-50% - var(--blox-marquee-gap, ${gap}px) / 2)); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(calc(-50% - var(--blox-marquee-gap, ${gap}px) / 2)); }
        100% { transform: translateX(0); }
      }
      @keyframes marquee-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(calc(-50% - var(--blox-marquee-gap, ${gap}px) / 2)); }
      }
      @keyframes marquee-down {
        0% { transform: translateY(calc(-50% - var(--blox-marquee-gap, ${gap}px) / 2)); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [gap]);

  return (
    <div
      data-blox="marquee"
      className={`overflow-hidden ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="marquee"
      aria-live={ariaLive}
      style={getContainerStyle()}
      {...rest}>
      <div
        className={`flex ${directionClasses[direction]}`}
        style={getAnimationStyle()}>
        {repeatedChildren}
      </div>
    </div>
  );
};
