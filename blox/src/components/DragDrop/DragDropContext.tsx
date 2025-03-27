// DragDropContext.tsx
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { DragContextValue, DragDropProviderProps, DragItem, Coordinates, DropTargetInfo, SortableItemInfo, DragStartEvent, DragMoveEvent, DragEndEvent } from "./types";

// Create context with default values
const DragDropContext = createContext<DragContextValue>({
  draggingItem: null,
  dragPosition: null,
  dropTargets: new Map(),
  sortableItems: new Map(),
  registerDropTarget: () => {},
  unregisterDropTarget: () => {},
  registerSortableItem: () => {},
  unregisterSortableItem: () => {},
  startDrag: () => {},
  endDrag: () => {},
  getDragOverTarget: () => null,
});

// Hook to use the drag and drop context
export const useDragDrop = () => useContext(DragDropContext);

// Provider component
export const DragDropProvider: React.FC<DragDropProviderProps> = ({ children, onDragStart, onDragMove, onDragEnd, onDragCancel }) => {
  // State for tracking the currently dragged item
  const [draggingItem, setDraggingItem] = useState<DragItem | null>(null);

  // State for tracking the current position of the drag
  const [dragPosition, setDragPosition] = useState<Coordinates | null>(null);

  // Refs for tracking drop targets and sortable items
  const dropTargetsRef = useRef(new Map<string, DropTargetInfo>());
  const sortableItemsRef = useRef(new Map<string, SortableItemInfo>());

  // Refs for tracking drag state
  const dragStartPositionRef = useRef<Coordinates | null>(null);
  const dragTargetRef = useRef<HTMLElement | null>(null);
  const draggingRef = useRef<boolean>(false);
  const lastPositionRef = useRef<Coordinates | null>(null);

  // Register a drop target
  const registerDropTarget = useCallback((target: DropTargetInfo) => {
    dropTargetsRef.current.set(target.id, target);
  }, []);

  // Unregister a drop target
  const unregisterDropTarget = useCallback((id: string) => {
    dropTargetsRef.current.delete(id);
  }, []);

  // Register a sortable item
  const registerSortableItem = useCallback((item: SortableItemInfo) => {
    sortableItemsRef.current.set(item.id, item);
  }, []);

  // Unregister a sortable item
  const unregisterSortableItem = useCallback((id: string) => {
    sortableItemsRef.current.delete(id);
  }, []);

  // Get the current drop target the cursor is over
  const getDragOverTarget = useCallback((): DropTargetInfo | null => {
    if (!dragPosition) return null;

    // Check each drop target to see if cursor is inside
    for (const target of dropTargetsRef.current.values()) {
      const { rect } = target;
      if (dragPosition.x >= rect.left && dragPosition.x <= rect.right && dragPosition.y >= rect.top && dragPosition.y <= rect.bottom) {
        return target;
      }
    }

    return null;
  }, [dragPosition]);

  // Start dragging an item
  const startDrag = useCallback(
    (item: DragItem, nativeEvent: MouseEvent | TouchEvent) => {
      const target = nativeEvent.target as HTMLElement;

      // Store the element that was clicked/touched
      dragTargetRef.current = target;

      // Calculate initial position
      let initialX: number;
      let initialY: number;

      if (nativeEvent instanceof MouseEvent) {
        initialX = nativeEvent.clientX;
        initialY = nativeEvent.clientY;
      } else {
        // TouchEvent
        initialX = nativeEvent.touches[0].clientX;
        initialY = nativeEvent.touches[0].clientY;
      }

      // Set initial position
      dragStartPositionRef.current = { x: initialX, y: initialY };
      setDragPosition({ x: initialX, y: initialY });

      // Set dragging state
      draggingRef.current = true;
      setDraggingItem(item);
      lastPositionRef.current = { x: initialX, y: initialY };

      // Emit drag start event
      if (onDragStart) {
        onDragStart({
          item,
          coordinates: { x: initialX, y: initialY },
          target,
          nativeEvent,
        });
      }

      // Add document event listeners for drag move and end
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchend", handleDragEnd);
      document.addEventListener("keydown", handleKeyDown);

      // Prevent text selection during drag
      document.body.style.userSelect = "none";
    },
    [onDragStart]
  );

  // Handle mouse move during drag
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current || !dragStartPositionRef.current || !lastPositionRef.current) return;

      // Prevent default to avoid text selection
      e.preventDefault();

      // Calculate new position
      const newX = e.clientX;
      const newY = e.clientY;
      const newPosition = { x: newX, y: newY };

      // Calculate delta from start and last position
      const delta = {
        x: newX - (lastPositionRef.current?.x || 0),
        y: newY - (lastPositionRef.current?.y || 0),
      };

      lastPositionRef.current = newPosition;
      setDragPosition(newPosition);

      // Find drop target
      const overTarget = getDragOverTarget();

      // Emit drag move event
      if (onDragMove && draggingItem) {
        onDragMove({
          item: draggingItem,
          coordinates: newPosition,
          delta,
          over: overTarget,
          nativeEvent: e,
        });
      }
    },
    [getDragOverTarget, draggingItem, onDragMove]
  );

  // Handle touch move during drag
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!draggingRef.current || !dragStartPositionRef.current || !lastPositionRef.current) return;

      // Prevent default to avoid scrolling
      e.preventDefault();

      // Calculate new position
      const touch = e.touches[0];
      const newX = touch.clientX;
      const newY = touch.clientY;
      const newPosition = { x: newX, y: newY };

      // Calculate delta from start and last position
      const delta = {
        x: newX - (lastPositionRef.current?.x || 0),
        y: newY - (lastPositionRef.current?.y || 0),
      };

      lastPositionRef.current = newPosition;
      setDragPosition(newPosition);

      // Find drop target
      const overTarget = getDragOverTarget();

      // Emit drag move event
      if (onDragMove && draggingItem) {
        onDragMove({
          item: draggingItem,
          coordinates: newPosition,
          delta,
          over: overTarget,
          nativeEvent: e,
        });
      }
    },
    [getDragOverTarget, draggingItem, onDragMove]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current || !dragStartPositionRef.current || !draggingItem || !lastPositionRef.current) return;

      // Calculate final position
      let finalX: number;
      let finalY: number;

      if (e instanceof MouseEvent) {
        finalX = e.clientX;
        finalY = e.clientY;
      } else {
        // TouchEvent
        if (e.changedTouches.length) {
          finalX = e.changedTouches[0].clientX;
          finalY = e.changedTouches[0].clientY;
        } else {
          // Fallback to last known position
          finalX = lastPositionRef.current.x;
          finalY = lastPositionRef.current.y;
        }
      }

      // Calculate total delta from start
      const totalDelta = {
        x: finalX - (dragStartPositionRef.current?.x || 0),
        y: finalY - (dragStartPositionRef.current?.y || 0),
      };

      // Find drop target
      const overTarget = getDragOverTarget();

      // Emit drag end event
      if (onDragEnd) {
        onDragEnd({
          item: draggingItem,
          coordinates: { x: finalX, y: finalY },
          delta: totalDelta,
          over: overTarget,
          nativeEvent: e,
        });
      }

      // Clean up
      endDrag();
    },
    [draggingItem, onDragEnd, getDragOverTarget]
  );

  // Handle keydown (for cancellation with Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onDragCancel) {
          onDragCancel();
        }
        endDrag();
      }
    },
    [onDragCancel]
  );

  // End drag and clean up
  const endDrag = useCallback(() => {
    // Reset drag state
    draggingRef.current = false;
    dragStartPositionRef.current = null;
    dragTargetRef.current = null;
    lastPositionRef.current = null;

    setDraggingItem(null);
    setDragPosition(null);

    // Remove event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchend", handleDragEnd);
    document.removeEventListener("keydown", handleKeyDown);

    // Re-enable text selection
    document.body.style.userSelect = "";
  }, [handleMouseMove, handleTouchMove, handleDragEnd, handleKeyDown]);

  // Clean up listeners when component unmounts
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("keydown", handleKeyDown);

      // Re-enable text selection
      document.body.style.userSelect = "";
    };
  }, [handleMouseMove, handleTouchMove, handleDragEnd, handleKeyDown]);

  // Context value
  const contextValue: DragContextValue = {
    draggingItem,
    dragPosition,
    dropTargets: dropTargetsRef.current,
    sortableItems: sortableItemsRef.current,
    registerDropTarget,
    unregisterDropTarget,
    registerSortableItem,
    unregisterSortableItem,
    startDrag,
    endDrag,
    getDragOverTarget,
  };

  return <DragDropContext.Provider value={contextValue}>{children}</DragDropContext.Provider>;
};
