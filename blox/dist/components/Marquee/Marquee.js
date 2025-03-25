import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
export const Marquee = (props) => {
    const { children, direction = "left", speed = "normal", behavior = "scroll", pauseOnHover = true, pauseOnFocus = true, repeat = 2, gap = 40, duration, reverse = false, delay = 0, className = "", ...rest } = props;
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    // Calculate the actual duration based on speed if not explicitly provided
    const calculateDuration = () => {
        if (duration)
            return duration;
        // Simple speed factors
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
                case "left": return "right";
                case "right": return "left";
                case "up": return "down";
                case "down": return "up";
                default: return "right";
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
            default: keyframesName = "marquee-left";
        }
        const animationIterationCount = "infinite";
        const animationDirection = behavior === "alternate" ? "alternate" : "normal";
        return {
            animation: `${keyframesName} ${actualDuration}s ${animationDirection} linear ${delay}s ${animationIterationCount}`,
            animationPlayState: isPaused ? "paused" : "running",
        };
    };
    // Create array of repeated children
    const repeatedChildren = [];
    for (let i = 0; i < repeat; i++) {
        repeatedChildren.push(_jsx("div", { className: "flex-shrink-0", style: {
                marginRight: direction === "left" || direction === "right" ? `${gap}px` : 0,
                marginBottom: direction === "up" || direction === "down" ? `${gap}px` : 0,
            }, children: children }, i));
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
        100% { transform: translateX(calc(-50% - ${gap}px / 2)); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(calc(-50% - ${gap}px / 2)); }
        100% { transform: translateX(0); }
      }
      @keyframes marquee-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(calc(-50% - ${gap}px / 2)); }
      }
      @keyframes marquee-down {
        0% { transform: translateY(calc(-50% - ${gap}px / 2)); }
        100% { transform: translateY(0); }
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, [gap]);
    return (_jsx("div", { "data-blox": "marquee", className: `overflow-hidden ${className}`, ref: containerRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleFocus, onBlur: handleBlur, role: "marquee", "aria-live": ariaLive, ...rest, children: _jsx("div", { className: `flex ${directionClasses[direction]}`, style: getAnimationStyle(), children: repeatedChildren }) }));
};
//# sourceMappingURL=Marquee.js.map