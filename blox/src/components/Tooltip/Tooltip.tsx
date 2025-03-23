import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { TooltipProps } from "./types";

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  isOpen: controlledIsOpen,
  placement = "bottom",
  offset = 8,
  showDelay = 0,
  hideDelay = 0,
  showOnHover = true,
  showOnFocus = true,
  id,
  closeOnEsc = true,
  interactive = false,
  zIndex = 1000,
  isDisabled = false,
  tooltipClassName = "",
  className = "",
  children,
  ...rest
}) => {
  // For controlled/uncontrolled usage
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  // Refs for DOM elements
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Timers for delay
  const showTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  
  // State for position
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    currentPlacement: placement
  });

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
    let finalPlacement = placement;
    const primaryPlacement = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left';

    // Check if preferred placement has enough space, otherwise flip to opposite side
    switch (primaryPlacement) {
      case 'top':
        if (spaceTop < tooltipRect.height + offset && spaceBottom > tooltipRect.height + offset) {
          finalPlacement = finalPlacement.replace('top', 'bottom') as TooltipProps['placement'];
        }
        break;
      case 'right':
        if (spaceRight < tooltipRect.width + offset && spaceLeft > tooltipRect.width + offset) {
          finalPlacement = finalPlacement.replace('right', 'left') as TooltipProps['placement'];
        }
        break;
      case 'bottom':
        if (spaceBottom < tooltipRect.height + offset && spaceTop > tooltipRect.height + offset) {
          finalPlacement = finalPlacement.replace('bottom', 'top') as TooltipProps['placement'];
        }
        break;
      case 'left':
        if (spaceLeft < tooltipRect.width + offset && spaceRight > tooltipRect.width + offset) {
          finalPlacement = finalPlacement.replace('left', 'right') as TooltipProps['placement'];
        }
        break;
    }

    // Calculate position based on final placement
    let x = 0;
    let y = 0;

    switch (finalPlacement) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'top-start':
        x = triggerRect.left;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'top-end':
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'right':
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right-start':
        x = triggerRect.right + offset;
        y = triggerRect.top;
        break;
      case 'right-end':
        x = triggerRect.right + offset;
        y = triggerRect.bottom - tooltipRect.height;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case 'bottom-start':
        x = triggerRect.left;
        y = triggerRect.bottom + offset;
        break;
      case 'bottom-end':
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.bottom + offset;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'left-start':
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top;
        break;
      case 'left-end':
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
      currentPlacement: finalPlacement
    });
  }, [isOpen, placement, offset]);

  // Handle showing the tooltip
  const handleShow = useCallback(() => {
    if (isDisabled) return;
    
    clearTimeout(hideTimeoutRef.current);
    
    if (!isControlled) {
      if (showDelay) {
        showTimeoutRef.current = setTimeout(() => {
          setUncontrolledIsOpen(true);
        }, showDelay);
      } else {
        setUncontrolledIsOpen(true);
      }
    }
  }, [isControlled, isDisabled, showDelay]);

  // Handle hiding the tooltip
  const handleHide = useCallback(() => {
    if (isDisabled) return;
    
    clearTimeout(showTimeoutRef.current);
    
    if (!isControlled) {
      if (hideDelay) {
        hideTimeoutRef.current = setTimeout(() => {
          setUncontrolledIsOpen(false);
        }, hideDelay);
      } else {
        setUncontrolledIsOpen(false);
      }
    }
  }, [isControlled, isDisabled, hideDelay]);

  // Prevent hiding when interacting with tooltip
  const handleTooltipMouseEnter = useCallback(() => {
    if (interactive) {
      clearTimeout(hideTimeoutRef.current);
    }
  }, [interactive]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleHide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    
    return () => {
      clearTimeout(delayedUpdate);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(showTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Create props for trigger element
  const getTriggerProps = () => {
    const triggerProps: React.HTMLAttributes<HTMLDivElement> = {
      ref: triggerRef,
      className: `inline-block ${className}`.trim(),
      ...rest,
    };

    if (!isControlled) {
      if (showOnHover) {
        triggerProps.onMouseEnter = (e) => {
          handleShow();
          rest.onMouseEnter?.(e);
        };
        triggerProps.onMouseLeave = (e) => {
          handleHide();
          rest.onMouseLeave?.(e);
        };
      }
      
      if (showOnFocus) {
        triggerProps.onFocus = (e) => {
          handleShow();
          rest.onFocus?.(e);
        };
        triggerProps.onBlur = (e) => {
          handleHide();
          rest.onBlur?.(e);
        };
      }
    }

    return triggerProps;
  };

  // Wrap children with tooltip functionality
  const renderTrigger = () => {
    return <div {...getTriggerProps()}>{children}</div>;
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!isOpen) return null;

    const tooltipContent = (
      <div
        ref={tooltipRef}
        role="tooltip"
        id={id}
        className={`fixed ${tooltipClassName}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex,
        }}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={interactive ? handleHide : undefined}
        data-placement={position.currentPlacement}
      >
        {content}
      </div>
    );

    return createPortal(tooltipContent, document.body);
  };

  return (
    <>
      {renderTrigger()}
      {renderTooltip()}
    </>
  );
};