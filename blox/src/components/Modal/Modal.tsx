// Modal.tsx
import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps, ModalComposition } from "./types";

// Sub-components
const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div
    className={`blox-modal-content ${className}`}
    {...props}>
    {children}
  </div>
);

const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <header
    className={`blox-modal-header ${className}`}
    {...props}>
    {children}
  </header>
);

const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <div
    className={`blox-modal-body ${className}`}
    {...props}>
    {children}
  </div>
);

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = "", ...props }) => (
  <footer
    className={`blox-modal-footer ${className}`}
    {...props}>
    {children}
  </footer>
);

const ModalCloseButton: React.FC<{
  onClose?: () => void;
  className?: string;
  [key: string]: any;
}> = ({ onClose, className = "", ...props }) => (
  <button
    type="button"
    className={`blox-modal-close-button ${className}`}
    onClick={onClose}
    aria-label="Close"
    {...props}>
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

const Modal: React.FC<ModalProps> & ModalComposition = ({ children, isOpen, onClose, size = "medium", title, footer, closeOnEsc = true, closeOnOverlayClick = true, overlayClassName = "", contentClassName = "", ariaLabelledby, ariaDescribedby, zIndex = 1050, isCentered = true, blockScroll = true, showCloseButton = true, initialFocusRef, animated = true, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Generate a unique ID for the modal
  const modalId = useRef(`blox-modal-${Math.random().toString(36).substr(2, 9)}`).current;

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Focus trap and management
  useEffect(() => {
    if (!isOpen) return;

    // Save the element that had focus before opening the modal
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Set focus to the specified element or the modal itself
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!modalRef.current || event.key !== "Tab") return;

      const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      // If shift+tab and on first element, move to last
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
      // If tab and on last element, move to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleFocusTrap);

    return () => {
      document.removeEventListener("keydown", handleFocusTrap);

      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, initialFocusRef]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen || !blockScroll) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, blockScroll]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  // Size styles based on size prop
  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return { width: "var(--blox-modal-width-small, 400px)" };
      case "medium":
        return { width: "var(--blox-modal-width-medium, 600px)" };
      case "large":
        return { width: "var(--blox-modal-width-large, 800px)" };
      case "full":
        return { width: "var(--blox-modal-width-full, calc(100% - 32px))" };
      default:
        return { width: "var(--blox-modal-width-medium, 600px)" };
    }
  };

  // Animation classes
  const getAnimationClass = () => {
    return animated ? "blox-modal-animated" : "";
  };

  // Create the modal element
  const modalElement = (
    <div
      className={`blox-modal-overlay ${getAnimationClass()} ${overlayClassName}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: isCentered ? "center" : "flex-start",
        justifyContent: "center",
        backgroundColor: "var(--blox-modal-overlay-bg, rgba(0, 0, 0, 0.5))",
        zIndex: zIndex,
        padding: "var(--blox-modal-overlay-padding, 16px)",
        overflow: "auto",
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledby || (title ? `${modalId}-title` : undefined)}
      aria-describedby={ariaDescribedby}
      {...props}>
      <div
        ref={modalRef}
        className={`blox-modal ${getAnimationClass()} ${contentClassName}`}
        style={{
          position: "relative",
          backgroundColor: "var(--blox-modal-bg, white)",
          borderRadius: "var(--blox-modal-border-radius, 4px)",
          boxShadow: "var(--blox-modal-box-shadow, 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08))",
          maxWidth: "100%",
          maxHeight: "var(--blox-modal-max-height, calc(100vh - 32px))",
          overflow: "auto",
          outline: "none",
          ...getSizeStyle(),
        }}
        tabIndex={-1}>
        {/* Modal header */}
        {(title || showCloseButton) && (
          <div
            className="blox-modal-header"
            style={{
              padding: "var(--blox-modal-header-padding, 16px)",
              borderBottom: title ? "var(--blox-modal-header-border, 1px solid #e0e0e0)" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}>
            {title && (
              <h3
                id={`${modalId}-title`}
                className="blox-modal-title"
                style={{
                  margin: 0,
                  fontSize: "var(--blox-modal-title-font-size, 1.25rem)",
                  fontWeight: "var(--blox-modal-title-font-weight, 500)",
                  color: "var(--blox-modal-title-color, inherit)",
                }}>
                {title}
              </h3>
            )}
            {showCloseButton && (
              <ModalCloseButton
                onClose={onClose}
                style={{
                  position: title ? "relative" : "absolute",
                  right: title ? "0" : "var(--blox-modal-close-button-right, 16px)",
                  top: title ? "0" : "var(--blox-modal-close-button-top, 16px)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "var(--blox-modal-close-button-padding, 4px)",
                  color: "var(--blox-modal-close-button-color, #666)",
                  borderRadius: "var(--blox-modal-close-button-border-radius, 50%)",
                }}
              />
            )}
          </div>
        )}

        {/* Modal body */}
        <div
          className="blox-modal-body"
          style={{
            padding: "var(--blox-modal-body-padding, 16px)",
          }}>
          {children}
        </div>

        {/* Modal footer */}
        {footer && (
          <div
            className="blox-modal-footer"
            style={{
              padding: "var(--blox-modal-footer-padding, 16px)",
              borderTop: "var(--blox-modal-footer-border, 1px solid #e0e0e0)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--blox-modal-footer-gap, 8px)",
            }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

// Attach sub-components
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;

export default Modal;
