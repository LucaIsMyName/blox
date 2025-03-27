// Tooltip.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { TooltipProps, TooltipPlacement } from "./types";
import { STYLES } from "@/styles/STYLES";

const Tooltip: React.FC<TooltipProps> = ({ content, isOpen: controlledIsOpen, placement = "bottom", offset = 8, showDelay = 0, hideDelay = 0, showOnHover = true, showOnFocus = true, id, closeOnEsc = true, interactive = false, zIndex = 1000, isDisabled = false, tooltipClassName = "", minWidth, maxWidth, className = "", children, ...rest }) => {
  // For controlled/uncontrolled usage
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Refs for DOM elements
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLElement | null>(null);

  // Timers for delay
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for position
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    currentPlacement: placement,
  });

  // Save a reference to the child element
  useEffect(() => {
    if (childRef.current && React.isValidElement(children)) {
      triggerRef.current = childRef.current;
    }
  }, [children]);

  // Calculate tooltip position based on trigger element and placement
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current || !isOpen) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Available space in different directions
    const spaceTop = triggerRect.top;
    const spaceRight = window.innerWidth - triggerRect.right;
    const spaceBottom = window.innerHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;

    // Determine best placement based on available space
    let finalPlacement: TooltipPlacement = placement;
    const primaryPlacement = placement.split("-")[0] as "top" | "right" | "bottom" | "left";

    // Check if preferred placement has enough space, otherwise flip to opposite side
    switch (primaryPlacement) {
      case "top":
        if (spaceTop < tooltipRect.height + offset && spaceBottom > tooltipRect.height + offset) {
          finalPlacement = placement.includes("start") ? "bottom-start" : placement.includes("end") ? "bottom-end" : "bottom";
        }
        break;
      case "right":
        if (spaceRight < tooltipRect.width + offset && spaceLeft > tooltipRect.width + offset) {
          finalPlacement = placement.includes("start") ? "left-start" : placement.includes("end") ? "left-end" : "left";
        }
        break;
      case "bottom":
        if (spaceBottom < tooltipRect.height + offset && spaceTop > tooltipRect.height + offset) {
          finalPlacement = placement.includes("start") ? "top-start" : placement.includes("end") ? "top-end" : "top";
        }
        break;
      case "left":
        if (spaceLeft < tooltipRect.width + offset && spaceRight > tooltipRect.width + offset) {
          finalPlacement = placement.includes("start") ? "right-start" : placement.includes("end") ? "right-end" : "right";
        }
        break;
    }

    // Calculate position based on final placement
    let x = 0;
    let y = 0;

    switch (finalPlacement) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-start":
        x = triggerRect.left;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "right":
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right-start":
        x = triggerRect.right + offset;
        y = triggerRect.top;
        break;
      case "right-end":
        x = triggerRect.right + offset;
        y = triggerRect.bottom - tooltipRect.height;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-start":
        x = triggerRect.left;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.bottom + offset;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "left-start":
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top;
        break;
      case "left-end":
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.bottom - tooltipRect.height;
        break;
    }

    // Keep tooltip within viewport bounds
    // Adjust x position
    if (x < 10) {
      x = 10;
    } else if (x + tooltipRect.width > window.innerWidth - 10) {
      x = window.innerWidth - tooltipRect.width - 10;
    }

    // Adjust y position
    if (y < 10) {
      y = 10;
    } else if (y + tooltipRect.height > window.innerHeight - 10) {
      y = window.innerHeight - tooltipRect.height - 10;
    }

    setPosition({
      x,
      y,
      currentPlacement: finalPlacement,
    });
  }, [isOpen, placement, offset]);

  // Handle showing the tooltip
  const handleShow = useCallback(() => {
    if (isDisabled) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (!isControlled) {
      if (showDelay) {
        showTimeoutRef.current = setTimeout(() => {
          setUncontrolledIsOpen(true);
        }, showDelay) as unknown as NodeJS.Timeout;
      } else {
        setUncontrolledIsOpen(true);
      }
    }
  }, [isControlled, isDisabled, showDelay]);

  // Handle hiding the tooltip
  const handleHide = useCallback(() => {
    if (isDisabled) return;

    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    if (!isControlled) {
      if (hideDelay) {
        hideTimeoutRef.current = setTimeout(() => {
          setUncontrolledIsOpen(false);
        }, hideDelay) as unknown as NodeJS.Timeout;
      } else {
        setUncontrolledIsOpen(false);
      }
    }
  }, [isControlled, isDisabled, hideDelay]);

  // Prevent hiding when interacting with tooltip
  const handleTooltipMouseEnter = useCallback(() => {
    if (interactive && hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, [interactive]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleHide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, handleHide]);

  // Update position when tooltip opens or window resizes
  useEffect(() => {
    if (!isOpen) return;

    // Update position immediately
    updatePosition();

    // And then after a short delay to ensure content is fully rendered
    const delayedUpdate = setTimeout(updatePosition, 10);

    // Update on resize
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      clearTimeout(delayedUpdate);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Render tooltip
  const renderTooltip = () => {
    if (!isOpen) return null;

    const tooltipContent = (
      <div
        ref={tooltipRef}
        role="tooltip"
        id={id}
        className={`blox-tooltip ${tooltipClassName}`}
        style={
          {
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex,
            minWidth: minWidth,
            maxWidth: maxWidth,
            "--blox-tooltip-min-width": typeof minWidth === "number" ? `${minWidth}px` : minWidth,
            "--blox-tooltip-max-width": typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
            "--blox-tooltip-offset": `${offset || STYLES.Tooltip.offset}px`,
            "--blox-tooltip-placement": position.currentPlacement,
          } as React.CSSProperties
        }
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={interactive ? handleHide : undefined}
        data-placement={position.currentPlacement}>
        {content}
      </div>
    );

    return createPortal(tooltipContent, document.body);
  };

  // Clone the child element and attach event handlers
  const childElement = React.Children.only(children);

  if (!React.isValidElement(childElement)) {
    console.error("Tooltip children must be a valid React element");
    return <>{children}</>;
  }

  const childProps: React.HTMLAttributes<HTMLElement> = {};

  if (showOnHover) {
    childProps.onMouseEnter = (e) => {
      handleShow();
      childElement.props.onMouseEnter?.(e);
    };

    childProps.onMouseLeave = (e) => {
      handleHide();
      childElement.props.onMouseLeave?.(e);
    };
  }

  if (showOnFocus) {
    childProps.onFocus = (e) => {
      handleShow();
      childElement.props.onFocus?.(e);
    };

    childProps.onBlur = (e) => {
      handleHide();
      childElement.props.onBlur?.(e);
    };
  }

  // Add the ref to the child element
  const enhancedChild = React.cloneElement(childElement, {
    ...childProps,
    ref: (node: HTMLElement) => {
      // Forward the ref to the child if it has one
      if (typeof childElement.ref === "function") {
        childElement.ref(node);
      } else if (childElement.ref) {
        (childElement.ref as React.MutableRefObject<HTMLElement>).current = node;
      }

      childRef.current = node;
      triggerRef.current = node;
    },
    className: `${childElement.props.className || ""} ${className}`.trim(),
  });

  return (
    <>
      {enhancedChild}
      {renderTooltip()}
    </>
  );
};

export default Tooltip;
