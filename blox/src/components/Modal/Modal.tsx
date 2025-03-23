import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Modal: React.FC<ModalProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<ModalProps>("Modal");
  const { isOpen, onClose, title, children, footer, variant = config.props.variant || "primary", size = config.props.size || "md", closeOnOverlayClick = config.props.closeOnOverlayClick !== undefined ? config.props.closeOnOverlayClick : true, closeOnEsc = config.props.closeOnEsc !== undefined ? config.props.closeOnEsc : true, showCloseButton = config.props.showCloseButton !== undefined ? config.props.showCloseButton : true, centered = config.props.centered !== undefined ? config.props.centered : true, zIndex = config.props.zIndex || 1000, overlayClassName = "", contentClassName = "", animated = config.props.animated !== undefined ? config.props.animated : true, lockScroll = config.props.lockScroll !== undefined ? config.props.lockScroll : true, id, ...rest } = props;

  // Ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);

  // Modal ID for accessibility
  const modalId = id || `blox-modal-${Math.random().toString(36).substr(2, 9)}`;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Modal");
  }, []);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock/unlock body scroll when modal opens/closes
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

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Size classes for the modal
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
    full: "max-w-full m-4",
  };

  // Style for overlay and modal
  const overlayStyle = {
    backgroundColor: `var(--blox-modal-overlay-bg, rgba(0, 0, 0, 0.5))`,
    zIndex,
  };

  const modalStyle = {
    backgroundColor: `var(--blox-modal-bg-color, white)`,
    borderRadius: `var(--blox-modal-border-radius, 0.375rem)`,
    boxShadow: `var(--blox-modal-box-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))`,
  };

  const headerStyle = {
    borderBottom: title ? `1px solid var(--blox-color-${variant}-100, var(--blox-modal-border-color, #e0f2fe))` : "none",
  };

  const footerStyle = {
    borderTop: footer ? `1px solid var(--blox-color-${variant}-100, var(--blox-modal-border-color, #e0f2fe))` : "none",
  };

  const closeButtonStyle = {
    color: `var(--blox-color-${variant}-500, var(--blox-modal-close-button-color, #0ea5e9))`,
  };

  // Animation classes
  const animationClasses = animated ? "transition-opacity duration-300 ease-in-out" : "";

  const contentAnimationClasses = animated ? "transition-transform duration-300 ease-in-out" : "";

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  // Close button component
  const CloseButton = () => (
    <button
      type="button"
      className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      onClick={onClose}
      aria-label="Close"
      style={closeButtonStyle}>
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

  // Create the modal element
  const modalElement = (
    <div
      className={`fixed inset-0 overflow-y-auto ${animationClasses} ${overlayClassName}`}
      style={overlayStyle}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${modalId}-title` : undefined}
      {...rest}>
      <div className={`flex min-h-screen ${centered ? "items-center" : "items-start"} justify-center p-4 text-center`}>
        <div
          ref={modalRef}
          className={`blox-modal w-full ${sizeClasses[size]} ${contentAnimationClasses} ${contentClassName}`}
          style={modalStyle}>
          {/* Modal header */}
          {(title || showCloseButton) && (
            <div
              className="px-6 py-4 relative"
              style={headerStyle}>
              {title && (
                <h3
                  id={`${modalId}-title`}
                  className="text-lg font-medium"
                  style={{ color: `var(--blox-color-${variant}-900, var(--blox-modal-title-color, #0c4a6e))` }}>
                  {title}
                </h3>
              )}
              {showCloseButton && <CloseButton />}
            </div>
          )}

          {/* Modal body */}
          <div className="px-6 py-4">{children}</div>

          {/* Modal footer */}
          {footer && (
            <div
              className="px-6 py-4 flex justify-end space-x-2"
              style={footerStyle}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the end of the document body
  return createPortal(modalElement, document.body);
};
