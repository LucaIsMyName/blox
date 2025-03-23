import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DrawerProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

// Default close button - only used when showCloseButton is true
const DefaultCloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Close drawer"
    style={{ 
      position: "absolute", 
      top: "10px", 
      right: "10px",
      background: "transparent",
      border: "none",
      cursor: "pointer"
    }}
    data-blox="drawer-close-btn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"></line>
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"></line>
    </svg>
  </button>
);

export const Drawer: React.FC<DrawerProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<DrawerProps>("Drawer");
  const {
    isOpen,
    onClose,
    placement = config.props.placement || "right",
    children,
    minWidth = config.props.minWidth || "250px",
    maxWidth = config.props.maxWidth || "100%",
    minHeight = config.props.minHeight || "250px",
    maxHeight = config.props.maxHeight || "100%",
    showCloseButton = config.props.showCloseButton !== undefined ? config.props.showCloseButton : true,
    closeOnEsc = config.props.closeOnEsc !== undefined ? config.props.closeOnEsc : true,
    closeOnOutsideClick = config.props.closeOnOutsideClick !== undefined ? config.props.closeOnOutsideClick : true,
    trapFocus = config.props.trapFocus !== undefined ? config.props.trapFocus : true,
    usePortal = config.props.usePortal !== undefined ? config.props.usePortal : true,
    zIndex = config.props.zIndex || 1000,
    contentClassName = "",
    backdropClassName = "",
    animated = config.props.animated !== undefined ? config.props.animated : true,
    lockScroll = config.props.lockScroll !== undefined ? config.props.lockScroll : true,
    renderCloseButton = config.props.renderCloseButton || DefaultCloseButton,
    role = config.props.role || "dialog",
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    variant = config.props.variant || "primary",
    className = "",
    ...rest
  } = props;

  // Ref for the drawer content
  const drawerRef = useRef<HTMLDivElement>(null);

  // Generate a unique ID if none provided
  const drawerId = id || `blox-drawer-${Math.random().toString(36).substr(2, 9)}`;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Drawer");
  }, []);

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock/unlock body scroll when drawer opens/closes
  useEffect(() => {
    if (lockScroll) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    return () => {
      if (lockScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, lockScroll]);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen || !trapFocus || !drawerRef.current) return;

    // Get all focusable elements in the drawer
    const focusableElements = drawerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus the first element when drawer opens
    firstElement.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      // Shift+Tab on first element should loop to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element should loop to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    drawerRef.current.addEventListener("keydown", handleTabKey);
    return () => {
      drawerRef.current?.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, trapFocus]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if drawer is not open
  if (!isOpen) return null;

  // Determine placement styling
  const getPlacementStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      position: "fixed",
      zIndex,
      backgroundColor: "white",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
    };

    switch (placement) {
      case "left":
        style.top = 0;
        style.bottom = 0;
        style.left = 0;
        style.height = "100%";
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
        style.width = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
        style.transform = animated ? "translateX(0)" : undefined;
        break;
      case "right":
        style.top = 0;
        style.bottom = 0;
        style.right = 0;
        style.height = "100%";
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
        style.width = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
        style.transform = animated ? "translateX(0)" : undefined;
        break;
      case "top":
        style.top = 0;
        style.left = 0;
        style.right = 0;
        style.width = "100%";
        style.minHeight = minHeight;
        style.maxHeight = maxHeight;
        style.height = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
        style.transform = animated ? "translateY(0)" : undefined;
        break;
      case "bottom":
        style.bottom = 0;
        style.left = 0;
        style.right = 0;
        style.width = "100%";
        style.minHeight = minHeight;
        style.maxHeight = maxHeight;
        style.height = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
        style.transform = animated ? "translateY(0)" : undefined;
        break;
    }

    return style;
  };

  // Backdrop style
  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: zIndex - 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  };

  // Create drawer element
  const drawerElement = (
    <div
      className={backdropClassName}
      onClick={handleBackdropClick}
      style={backdropStyle}
      data-blox="drawer-backdrop">
      <div
        ref={drawerRef}
        id={drawerId}
        className={`${contentClassName} ${className}`}
        style={getPlacementStyle()}
        role={role}
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        data-blox="drawer"
        data-variant={variant}
        data-placement={placement}
        data-animated={animated}
        {...rest}>
        {showCloseButton && renderCloseButton({ onClick: onClose })}
        {children}
      </div>
    </div>
  );

  // Use portal if specified
  return usePortal ? createPortal(drawerElement, document.body) : drawerElement;
};