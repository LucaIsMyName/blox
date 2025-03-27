// Draggable.tsx
import React, { useRef, useEffect, useCallback } from "react";
import { DraggableProps, DraggableRenderProps } from "./types";
import { useDragDrop } from "./DragDropContext";

export const Draggable: React.FC<DraggableProps> = ({ id, type = "default", data, disabled = false, handle = false, preview, children, style, className = "", ...props }) => {
  const { draggingItem, startDrag } = useDragDrop();
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if this item is currently being dragged
  const isDragging = draggingItem?.id === id && draggingItem?.type === type;

  // Handler for starting drag operation
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || !elementRef.current) return;

      // Prevent default behavior to avoid browser's native drag and drop
      e.preventDefault();

      // Create the drag item
      const item = {
        id,
        type,
        data,
      };

      // Start the drag operation
      startDrag(item, e.nativeEvent);
    },
    [id, type, data, disabled, startDrag]
  );

  // Event handler props for drag handle
  const dragHandleProps = {
    onMouseDown: handleDragStart,
    onTouchStart: handleDragStart,
  };

  // Props to pass to render function
  const renderProps: DraggableRenderProps = {
    isDragging,
    dragHandleProps,
  };

  // Render the component
  return (
    <div
      ref={elementRef}
      className={`blox-draggable ${className}`}
      data-blox-draggable=""
      data-draggable-id={id}
      data-draggable-type={type}
      data-dragging={isDragging ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      style={{
        ...style,
        // Apply some styles when dragging
        opacity: isDragging ? 0.5 : 1,
        // Apply cursor style
        cursor: disabled ? "not-allowed" : handle ? "grab" : "move",
        // Prevent text selection during drag (for better UX)
        userSelect: "none",
        // Make element positioned so we can position the preview
        position: "relative",
        // Avoid layout shifts by setting a height when dragging
        ...(isDragging && { height: elementRef.current?.offsetHeight }),
      }}
      {...(!handle && !disabled ? dragHandleProps : {})}
      {...props}>
      {typeof children === "function" ? children(renderProps) : children}
    </div>
  );
};

// Handle component for partial draggable areas
export const DragHandle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "", ...props }) => {
  const renderProps = React.useContext(DraggableRenderPropsContext);

  if (!renderProps) {
    console.warn("DragHandle must be used within a Draggable component");
    return <>{children}</>;
  }

  return (
    <div
      className={`blox-drag-handle ${className}`}
      data-blox-drag-handle=""
      style={{ cursor: "grab" }}
      {...renderProps.dragHandleProps}
      {...props}>
      {children}
    </div>
  );
};

// Create a context to pass render props down to DragHandle
const DraggableRenderPropsContext = React.createContext<DraggableRenderProps | null>(null);

// Alternative implementation of Draggable that uses context to pass props to DragHandle
export const DraggableWithContext: React.FC<DraggableProps> = (props) => {
  const BaseComponent = Draggable;
  const { children, ...rest } = props;

  return <BaseComponent {...rest}>{(renderProps) => <DraggableRenderPropsContext.Provider value={renderProps}>{typeof children === "function" ? children(renderProps) : children}</DraggableRenderPropsContext.Provider>}</BaseComponent>;
};
