// Slider.tsx
import React, { useState, useRef, useEffect, useCallback, createContext, useContext, useMemo } from "react";
import { SliderProps, SliderTrackProps, SliderRangeProps, SliderThumbProps, SliderMarkProps, SliderContextValue, ThumbPosition, SliderRange, SliderComposition } from "./types";

// Create context for the slider
const SliderContext = createContext<SliderContextValue | null>(null);

// Hook to use slider context
const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within a Slider");
  }
  return context;
};

// Slider component
const Slider: React.FC<SliderProps> & SliderComposition = ({ value, defaultValue = 0, onChange, onDragStart, onDragEnd, min = 0, max = 100, step = 1, disabled = false, orientation = "horizontal", className = "", inverted = false, showMarks = false, marks, label, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, children, ...props }) => {
  // Reference to the root element
  const rootRef = useRef<HTMLDivElement>(null);

  // Parse and normalize the values
  const parseValues = (input: number | number[]): number[] => {
    if (typeof input === "number") {
      return [input];
    }
    return [...input].sort((a, b) => a - b);
  };

  // Internal state for controlled/uncontrolled usage
  const [internalValues, setInternalValues] = useState<number[]>(() => {
    return parseValues(defaultValue);
  });

  // Determine if we're controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValues = isControlled ? parseValues(value) : internalValues;

  // Track whether any thumb is being dragged
  const [isDragging, setIsDragging] = useState(false);
  const activeThumbIndex = useRef<number | null>(null);

  // Calculate thumb positions
  const thumbPositions = useMemo<ThumbPosition[]>(() => {
    return currentValues.map((value, index) => {
      // Clamp value to min/max
      const clampedValue = Math.min(Math.max(value, min), max);

      // Calculate percentage
      const percent = ((clampedValue - min) / (max - min)) * 100;

      return {
        value: clampedValue,
        index,
        percent: inverted ? 100 - percent : percent,
      };
    });
  }, [currentValues, min, max, inverted]);

  // Calculate ranges between thumbs
  const ranges = useMemo<SliderRange[]>(() => {
    const result: SliderRange[] = [];

    // For single thumb, range is from min to value
    if (currentValues.length === 1) {
      result.push({
        start: min,
        end: currentValues[0],
      });
    } else {
      // For multiple thumbs, create ranges between each pair of values
      // First range from min to first value
      result.push({
        start: min,
        end: currentValues[0],
      });

      // Ranges between thumbs
      for (let i = 0; i < currentValues.length - 1; i++) {
        result.push({
          start: currentValues[i],
          end: currentValues[i + 1],
        });
      }

      // Last range from last value to max
      result.push({
        start: currentValues[currentValues.length - 1],
        end: max,
      });
    }

    return result;
  }, [currentValues, min, max]);

  // Convert percentage (0-100) to a value
  const percentToValue = useCallback(
    (percent: number): number => {
      // Adjust for inverted slider
      const adjustedPercent = inverted ? 100 - percent : percent;

      // Convert to range value
      let value = (adjustedPercent / 100) * (max - min) + min;

      // Apply step
      if (step > 0) {
        value = Math.round(value / step) * step;
      }

      // Ensure value is within bounds
      return Math.min(Math.max(value, min), max);
    },
    [min, max, step, inverted]
  );

  // Convert value to percentage (0-100)
  const valueToPercent = useCallback(
    (value: number): number => {
      // Ensure value is within bounds
      const clampedValue = Math.min(Math.max(value, min), max);

      // Convert to percentage
      const percent = ((clampedValue - min) / (max - min)) * 100;

      // Adjust for inverted slider
      return inverted ? 100 - percent : percent;
    },
    [min, max, inverted]
  );

  // Get the closest thumb index to a given position
  const getClosestThumb = useCallback(
    (position: number): number => {
      if (currentValues.length === 1) return 0;

      // Convert position to value
      const positionValue = percentToValue(position);

      // Find the closest thumb
      let closestDistance = Math.abs(currentValues[0] - positionValue);
      let closestIndex = 0;

      for (let i = 1; i < currentValues.length; i++) {
        const distance = Math.abs(currentValues[i] - positionValue);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      return closestIndex;
    },
    [currentValues, percentToValue]
  );

  // Update a specific thumb value
  const updateThumb = useCallback(
    (index: number, newValue: number) => {
      // Clamp value to min/max
      const clampedValue = Math.min(Math.max(newValue, min), max);

      // Create new values array
      let newValues = [...currentValues];
      newValues[index] = clampedValue;

      // Keep thumbs in order (prevent crossover)
      if (index > 0 && newValues[index] < newValues[index - 1]) {
        newValues[index] = newValues[index - 1];
      }
      if (index < newValues.length - 1 && newValues[index] > newValues[index + 1]) {
        newValues[index] = newValues[index + 1];
      }

      // Update state for uncontrolled component
      if (!isControlled) {
        setInternalValues(newValues);
      }

      // Call onChange handler
      if (onChange) {
        onChange(newValues.length === 1 ? newValues[0] : newValues);
      }
    },
    [currentValues, min, max, isControlled, onChange]
  );

  // Handle pointer down event on track
  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Get position relative to track
    const trackRect = event.currentTarget.getBoundingClientRect();
    const position = orientation === "horizontal" ? ((event.clientX - trackRect.left) / trackRect.width) * 100 : ((event.clientY - trackRect.top) / trackRect.height) * 100;

    // Find closest thumb and activate it
    const thumbIndex = getClosestThumb(position);
    activeThumbIndex.current = thumbIndex;

    // Move the thumb to this position
    updateThumb(thumbIndex, percentToValue(position));

    // Start dragging
    setIsDragging(true);

    // Call onDragStart handler
    if (onDragStart) {
      onDragStart(currentValues.length === 1 ? currentValues[0] : currentValues);
    }

    // Capture pointer events
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  // Handle pointer move event
  const handleTrackPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !isDragging || activeThumbIndex.current === null) return;

    // Get position relative to track
    const trackRect = event.currentTarget.getBoundingClientRect();
    const position = orientation === "horizontal" ? ((event.clientX - trackRect.left) / trackRect.width) * 100 : ((event.clientY - trackRect.top) / trackRect.height) * 100;

    // Update thumb position
    updateThumb(activeThumbIndex.current, percentToValue(position));
  };

  // Handle pointer up event
  const handleTrackPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !isDragging) return;

    // End dragging
    setIsDragging(false);
    activeThumbIndex.current = null;

    // Call onDragEnd handler
    if (onDragEnd) {
      onDragEnd(currentValues.length === 1 ? currentValues[0] : currentValues);
    }

    // Release pointer capture
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  // Handle keyboard navigation
  const handleRootKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Find focused thumb
    const focusedThumbIndex = currentValues.findIndex((_, i) => document.activeElement === rootRef.current?.querySelector(`[data-thumb-index="${i}"]`));

    if (focusedThumbIndex === -1) return;

    // Determine the increment amount
    const increment = event.shiftKey ? step * 10 : step;
    let newValue = currentValues[focusedThumbIndex];

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = currentValues[focusedThumbIndex] + (inverted ? -increment : increment);
        event.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowDown":
        newValue = currentValues[focusedThumbIndex] + (inverted ? increment : -increment);
        event.preventDefault();
        break;
      case "Home":
        newValue = min;
        event.preventDefault();
        break;
      case "End":
        newValue = max;
        event.preventDefault();
        break;
      case "PageUp":
        newValue = currentValues[focusedThumbIndex] + (inverted ? -increment * 10 : increment * 10);
        event.preventDefault();
        break;
      case "PageDown":
        newValue = currentValues[focusedThumbIndex] + (inverted ? increment * 10 : -increment * 10);
        event.preventDefault();
        break;
      default:
        return;
    }

    // Update thumb position
    updateThumb(focusedThumbIndex, newValue);
  };

  // Create the context value
  const contextValue: SliderContextValue = {
    value: currentValues.length === 1 ? currentValues[0] : currentValues,
    min,
    max,
    step,
    disabled,
    orientation,
    inverted,
    isDragging,
    thumbPositions,
    ranges,
    updateThumb,
    setDragging: setIsDragging,
    getClosestThumb,
    valueToPercent,
    percentToValue,
  };

  // Determine the track direction CSS variables
  const directionProps: React.CSSProperties = {
    position: "relative",
    "--blox-slider-direction": orientation === "horizontal" ? "row" : "column",
    "--blox-slider-length": "100%",
    "--blox-slider-track-size": orientation === "horizontal" ? "100%" : "100%",
    "--blox-slider-track-thickness": orientation === "horizontal" ? "var(--blox-slider-thickness, 4px)" : "var(--blox-slider-thickness, 4px)",
  };

  // Custom render function using render props
  const renderContent = () => {
    if (typeof children === "function") {
      return children(contextValue);
    }

    return (
      children || (
        <>
          <SliderTrack
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}>
            {currentValues.length > 1 &&
              currentValues.map((_, index) => (
                <SliderRangeComponent
                  key={`range-${index}`}
                  index={index}
                />
              ))}
            {currentValues.length === 1 && <SliderRangeComponent />}
          </SliderTrack>

          {currentValues.map((_, index) => (
            <SliderThumb
              key={`thumb-${index}`}
              index={index}
            />
          ))}

          {showMarks && (
            <>
              {/* Default marks at min and max */}
              {!marks && (
                <>
                  <SliderMark value={min} />
                  <SliderMark value={max} />
                </>
              )}

              {/* Custom marks if provided */}
              {marks &&
                Object.entries(marks).map(([value, label]) => (
                  <SliderMark
                    key={`mark-${value}`}
                    value={Number(value)}>
                    {label}
                  </SliderMark>
                ))}
            </>
          )}
        </>
      )
    );
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        role="group"
        aria-disabled={disabled}
        aria-label={label || ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onKeyDown={handleRootKeyDown}
        className={`blox-slider ${className}`}
        data-blox-slider=""
        data-orientation={orientation}
        data-disabled={disabled ? "true" : "false"}
        data-inverted={inverted ? "true" : "false"}
        style={{
          width: "100%", // Add this
          height: orientation === "vertical" ? "100%" : "auto", // Add this
          ...directionProps,
          ...props.style,
        }}
        {...props}>
        {renderContent()}
      </div>
    </SliderContext.Provider>
  );
};

// Slider Track component
const SliderTrack: React.FC<SliderTrackProps> = ({ children, className = "", onPointerDown, onPointerMove, onPointerUp, ...props }) => {
  const { orientation, disabled } = useSlider();

  // Handle pointer events for the track
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (onPointerDown) {
      onPointerDown(event);
    } else {
      // Forward the event to the parent handler
      const parent = event.currentTarget.parentElement;
      if (parent) {
        const customEvent = new PointerEvent("pointerdown", {
          bubbles: true,
          cancelable: true,
          clientX: event.clientX,
          clientY: event.clientY,
          pointerId: event.pointerId,
        });

        parent.dispatchEvent(customEvent);

        // Prevent default browser behavior
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // Handle pointer move
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (onPointerMove) {
      onPointerMove(event);
    } else {
      // Forward the event to the parent handler
      const parent = event.currentTarget.parentElement;
      if (parent) {
        const customEvent = new PointerEvent("pointermove", {
          bubbles: true,
          cancelable: true,
          clientX: event.clientX,
          clientY: event.clientY,
          pointerId: event.pointerId,
        });

        parent.dispatchEvent(customEvent);

        // Prevent default browser behavior
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // Handle pointer up
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (onPointerUp) {
      onPointerUp(event);
    } else {
      // Forward the event to the parent handler
      const parent = event.currentTarget.parentElement;
      if (parent) {
        const customEvent = new PointerEvent("pointerup", {
          bubbles: true,
          cancelable: true,
          clientX: event.clientX,
          clientY: event.clientY,
          pointerId: event.pointerId,
        });

        parent.dispatchEvent(customEvent);

        // Prevent default browser behavior
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  return (
    <div
      className={`blox-slider-track ${className}`}
      data-blox-slider-track=""
      data-orientation={orientation}
      data-disabled={disabled ? "true" : "false"}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "relative",
        width: orientation === "horizontal" ? "100%" : "var(--blox-slider-thickness, 4px)",
        height: orientation === "horizontal" ? "var(--blox-slider-thickness, 4px)" : "100%",
        borderRadius: "var(--blox-slider-border-radius, 9999px)",
        backgroundColor: "var(--blox-slider-track-color, #e5e7eb)",
        ...props.style,
      }}
      {...props}>
      {children}
    </div>
  );
};

// Slider Range component - renamed to avoid conflict
const SliderRangeComponent: React.FC<SliderRangeProps> = ({ index = 0, children, className = "", ...props }) => {
  const { orientation, disabled, inverted, ranges, min, max, valueToPercent } = useSlider();

  // Get the range information
  const range = ranges[index] || ranges[0];

  // Calculate start and end percentages
  const startPercent = valueToPercent(range.start);
  const endPercent = valueToPercent(range.end);

  // Determine range style based on orientation
  const rangeStyle: React.CSSProperties = {
    // position: "absolute", // Keep this
    borderRadius: "var(--blox-slider-border-radius, 9999px)",
    backgroundColor: "var(--blox-slider-range-color, #3b82f6)",
  };

  if (orientation === "horizontal") {
    const leftPercent = Math.min(startPercent, endPercent);
    const widthPercent = Math.abs(endPercent - startPercent);

    rangeStyle.left = `${leftPercent}%`;
    rangeStyle.width = `${widthPercent}%`;
    rangeStyle.height = "100%";
  } else {
    const bottomPercent = Math.min(startPercent, endPercent);
    const heightPercent = Math.abs(endPercent - startPercent);

    rangeStyle.bottom = `${bottomPercent}%`;
    rangeStyle.height = `${heightPercent}%`;
    rangeStyle.width = "100%";
  }

  return (
    <div
      className={`blox-slider-range ${className}`}
      data-blox-slider-range=""
      data-range-index={index}
      data-orientation={orientation}
      data-disabled={disabled ? "true" : "false"}
      style={{
        ...rangeStyle,
        ...props.style,
        position: "absolute",
      }}
      {...props}>
      {children}
    </div>
  );
};

// Slider Thumb component
const SliderThumb: React.FC<SliderThumbProps> = ({ index = 0, children, className = "", ...props }) => {
  const { orientation, disabled, thumbPositions, isDragging, value, min, max, updateThumb, setDragging } = useSlider();

  // Get this thumb's position
  const thumbPosition = thumbPositions[index] || thumbPositions[0];

  // Handler for thumb key down
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Let the parent handle keyboard navigation
    // The event will bubble up to the root handler
  };

  // Calculate accessibility values
  const valueNow = Array.isArray(value) ? value[index] : value;
  const valueText = `${valueNow}`;

  // Determine thumb style based on orientation
  const thumbStyle: React.CSSProperties = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: "var(--blox-slider-thumb-size, 16px)",
    height: "var(--blox-slider-thumb-size, 16px)",
    borderRadius: "var(--blox-slider-thumb-radius, 9999px)",
    backgroundColor: "var(--blox-slider-thumb-color, #3b82f6)",
    boxShadow: "var(--blox-slider-thumb-shadow, 0 1px 3px rgba(0,0,0,0.1))",
    cursor: disabled ? "not-allowed" : "grab",
    // Add grab cursor when dragging
    ...(isDragging && { cursor: disabled ? "not-allowed" : "grabbing" }),
  };

  if (orientation === "horizontal") {
    thumbStyle.left = `${thumbPosition.percent}%`;
    thumbStyle.top = "50%";
  } else {
    thumbStyle.bottom = `${thumbPosition.percent}%`;
    thumbStyle.left = "50%";
  }

  return (
    <div
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={valueNow}
      aria-valuetext={valueText}
      aria-disabled={disabled}
      aria-orientation={orientation}
      className={`blox-slider-thumb ${className}`}
      data-blox-slider-thumb=""
      data-thumb-index={index}
      data-orientation={orientation}
      data-disabled={disabled ? "true" : "false"}
      data-dragging={isDragging ? "true" : "false"}
      onKeyDown={handleKeyDown}
      style={{
        ...thumbStyle,
        ...props.style,
      }}
      {...props}>
      {children}
    </div>
  );
};

// Slider Mark component
const SliderMark: React.FC<SliderMarkProps> = ({ value, children, className = "", ...props }) => {
  const { orientation, disabled, min, max, valueToPercent } = useSlider();

  // Calculate position percentage
  const positionPercent = valueToPercent(value);

  // Determine mark style based on orientation
  const markStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (orientation === "horizontal") {
    markStyle.left = `${positionPercent}%`;
    markStyle.top = "100%";
    markStyle.transform = "translateX(-50%)";
    markStyle.marginTop = "var(--blox-slider-mark-spacing, 8px)";
  } else {
    markStyle.bottom = `${positionPercent}%`;
    markStyle.left = "100%";
    markStyle.transform = "translateY(50%)";
    markStyle.marginLeft = "var(--blox-slider-mark-spacing, 8px)";
  }

  return (
    <div
      className={`blox-slider-mark ${className}`}
      data-blox-slider-mark=""
      data-mark-value={value}
      data-orientation={orientation}
      data-disabled={disabled ? "true" : "false"}
      style={{
        ...markStyle,
        ...props.style,
      }}
      {...props}>
      {/* Mark line indicator */}
      <div
        className="blox-slider-mark-line"
        data-blox-slider-mark-line=""
        style={{
          position: "absolute",
          backgroundColor: "var(--blox-slider-mark-color, #e5e7eb)",
          width: orientation === "horizontal" ? "2px" : "8px",
          height: orientation === "horizontal" ? "8px" : "2px",
          transform: orientation === "horizontal" ? "translateY(-100%)" : "translateX(-100%)",
        }}
      />

      {/* Mark label */}
      {children && (
        <div
          className="blox-slider-mark-label"
          data-blox-slider-mark-label=""
          style={{
            fontSize: "var(--blox-slider-mark-font-size, 12px)",
            marginTop: orientation === "horizontal" ? "var(--blox-slider-mark-label-spacing, 4px)" : 0,
            marginLeft: orientation === "vertical" ? "var(--blox-slider-mark-label-spacing, 4px)" : 0,
          }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Attach the original interfaces to maintain component structure
// const SliderRange = SliderRangeComponent;

// Attach subcomponents to Slider
Slider.Track = SliderTrack;
Slider.Range = SliderRangeComponent;
Slider.Thumb = SliderThumb;
Slider.Mark = SliderMark;

export default Slider;
