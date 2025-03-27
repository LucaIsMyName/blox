// Droppable.tsx
import React, { useRef, useEffect, useCallback } from "react";
import { DroppableProps, DroppableRenderProps } from "./types";
import { useDragDrop } from "./DragDropContext";
import { STYLES } from "@/styles/STYLES";

export const Droppable: React.FC<DroppableProps> = ({
  id,
  type = "default",
  data,
  disabled = false,
  accept,
  children,
  style,
  className = "",
  onDrop,
  // isActive, // Remove from props destructuring
  ...props
}) => {
  const { draggingItem, dragPosition, registerDropTarget, unregisterDropTarget, getDragOverTarget } = useDragDrop();
  const elementRef = useRef<HTMLDivElement>(null);

  // Determine if the current drag item can be dropped here
  const canDrop = useCallback(() => {
    if (!draggingItem || disabled) return false;

    if (accept === undefined) {
      // If no accept prop, accept everything
      return true;
    }

    if (typeof accept === "function") {
      // If accept is a function, use it
      return accept(draggingItem);
    }

    // Handle string or array of strings
    const acceptTypes = Array.isArray(accept) ? accept : [accept];
    return acceptTypes.includes(draggingItem.type);
  }, [draggingItem, disabled, accept]);

  // Determine if the droppable is currently being hovered over
  const isOver = useCallback(() => {
    if (!draggingItem || !dragPosition || !canDrop()) return false;

    const overTarget = getDragOverTarget();
    return overTarget?.id === id;
  }, [draggingItem, dragPosition, id, canDrop, getDragOverTarget]);

  // Handle drop event
  const handleDrop = useCallback(() => {
    if (onDrop && isOver() && canDrop()) {
      onDrop();
    }
  }, [onDrop, isOver, canDrop]);

  // Register this droppable with the context
  useEffect(() => {
    if (!elementRef.current) return;

    const updateDropTarget = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        registerDropTarget({
          id,
          type,
          data,
          rect,
        });
      }
    };

    // Initial registration
    updateDropTarget();

    // Update on resize or scroll
    window.addEventListener("resize", updateDropTarget);
    window.addEventListener("scroll", updateDropTarget);

    return () => {
      unregisterDropTarget(id);
      window.removeEventListener("resize", updateDropTarget);
      window.removeEventListener("scroll", updateDropTarget);
    };
  }, [id, type, data, registerDropTarget, unregisterDropTarget]);

  // Listen for drop events
  useEffect(() => {
    const isCurrentlyOver = isOver();
    const canCurrentlyDrop = canDrop();

    if (isCurrentlyOver && canCurrentlyDrop && !draggingItem) {
      handleDrop();
    }
  }, [draggingItem, isOver, canDrop, handleDrop]);

  // Props to pass to render function
  const renderProps: DroppableRenderProps = {
    isOver: isOver(),
    canDrop: canDrop(),
  };

  // Render the component
  return (
    <div
      ref={elementRef}
      className={`blox-droppable ${className}`}
      data-blox-droppable=""
      data-droppable-id={id}
      data-droppable-type={type}
      data-over={isOver() ? "true" : "false"}
      data-can-drop={canDrop() ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      // Add data attribute instead of prop
      data-is-active={props["data-is-active"] || "false"}
      style={{
        ...style,
        // Add visual feedback when dragging over
        ...(isOver() &&
          canDrop() && {
            outline: `var(--blox-dragdrop-droppable-oultine, ${STYLES.DragDrop.droppable.outline})`,
            backgroundColor: `var(--blox-dragdrop-droppable-bg-color, ${STYLES.DragDrop.droppable.bgColor})`,
          }),
      }}
      {...props}>
      {typeof children === "function" ? children(renderProps) : children}
    </div>
  );
};
