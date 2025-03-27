// DragOverlay.tsx
import React from "react";
import { createPortal } from "react-dom";
import { DragOverlayProps } from "./types";
import { useDragDrop } from "./DragDropContext";

export const DragOverlay: React.FC<DragOverlayProps> = ({ children, style, className = "", ...props }) => {
  const { draggingItem, dragPosition } = useDragDrop();

  // Don't render anything if not currently dragging
  if (!draggingItem || !dragPosition) {
    return null;
  }

  // Calculate position styles
  const positionStyles = {
    position: "fixed",
    left: 0,
    top: 0,
    transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
    pointerEvents: "none", // Make overlay non-interactive
    zIndex: 9999,
    transformOrigin: "0 0",
  } as React.CSSProperties;

  // Render the overlay as a portal
  return createPortal(
    <div
      className={`blox-drag-overlay ${className}`}
      data-blox-drag-overlay=""
      style={{
        ...positionStyles,
        ...style,
      }}
      {...props}>
      {typeof children === "function" ? children({ item: draggingItem }) : children}
    </div>,
    // Append to body to ensure it's above everything
    document.body
  );
};
