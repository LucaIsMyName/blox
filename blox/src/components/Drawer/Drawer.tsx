import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DrawerProps } from "./types";
import "./Drawer.css";

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, placement = "right", children, minWidth = "250px", maxWidth = "100%", minHeight = "250px", maxHeight = "100%", showCloseButton = true, closeOnEsc = true, closeOnOutsideClick = true, trapFocus = true, usePortal = true, zIndex = 1000, contentClassName = "", backdropClassName = "", animated = true, lockScroll = true, renderCloseButton, role = "dialog", "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, id, style, className, closeButton }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && lockScroll) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen && trapFocus && drawerRef.current) {
      firstFocusableRef.current?.focus();

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== "Tab" || !drawerRef.current) return;

        const focusableElements = drawerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => {
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [isOpen, trapFocus]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const drawerStyles: React.CSSProperties = {
    ...style,
    zIndex,
    ...(placement === "left" || placement === "right" ? { minWidth, maxWidth } : { minHeight, maxHeight }),
  };

  const drawerContent = (
    <>
      {isOpen && (
        <div
          data-blox-drawer-backdrop
          className={`${backdropClassName} ${animated ? "animated" : ""} fixed inset-0 flex`}
          onClick={handleBackdropClick}
          data-placement={placement}>
          <div
            data-blox-drawer-content
            ref={drawerRef}
            className={` ${contentClassName} ${className || ""}`}
            style={drawerStyles}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            id={id}
            data-blox-drawer-placement={placement}>
            <div
              ref={firstFocusableRef}
              tabIndex={-1}
            />

            {showCloseButton &&
              (renderCloseButton ? (
                renderCloseButton({ onClick: onClose })
              ) : (
                <button
                  data-blox-drawer-close
                  className=""
                  onClick={onClose}
                  aria-label="Close drawer">
                  {closeButton ? closeButton : "×"}
                </button>
              ))}

            {children}
          </div>
        </div>
      )}
    </>
  );

  return usePortal && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : drawerContent;
};
