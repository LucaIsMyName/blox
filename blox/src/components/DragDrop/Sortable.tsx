// Sortable.tsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import { SortableProps, SortableItemProps, SortableItemRenderProps } from "./types";
import { useDragDrop } from "./DragDropContext";
import { DraggableWithContext } from "./Draggable";
import { Droppable } from "./Droppable";
import { STYLES } from "@/styles/STYLES";

// Sortable List Component
export const Sortable: React.FC<SortableProps> = ({ items, keyExtractor, onReorder, direction = "vertical", children, style, className = "", ...props }) => {
  const { draggingItem } = useDragDrop();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Determine if an item is currently being dragged
  const isDragging = draggedIndex !== null;

  // Find the index of the dragged item
  useEffect(() => {
    if (!draggingItem) {
      setDraggedIndex(null);
      return;
    }

    const index = items.findIndex((item) => keyExtractor(item) === draggingItem.id);
    if (index !== -1) {
      setDraggedIndex(index);
    }
  }, [draggingItem, items, keyExtractor]);

  // Handle reordering when an item is dropped
  const handleDrop = (itemId: string, targetIndex: number) => {
    if (draggedIndex === null) return;

    // Skip if dropping at the same position
    if (draggedIndex === targetIndex) return;

    // Create a copy of the items array
    const newItems = [...items];

    // Remove the dragged item
    const [draggedItem] = newItems.splice(draggedIndex, 1);

    // Insert the dragged item at the target position
    newItems.splice(targetIndex, 0, draggedItem);

    // Call the onReorder callback with the new order
    onReorder(newItems);
  };

  // Container style based on direction
  const containerStyle = {
    display: "flex",
    flexDirection: direction === "vertical" ? "column" : "row",
    position: "relative",
    ...style,
  } as React.CSSProperties;

  return (
    <div
      className={`blox-sortable ${className}`}
      data-blox-sortable=""
      style={containerStyle}
      {...props}>
      {items.map((item, index) => {
        const itemId = keyExtractor(item);
        const isBeingDragged = draggedIndex === index;

        // Render each sortable item
        return (
          <SortableItem
            key={itemId}
            item={item}
            itemId={itemId}
            index={index}
            isDragging={isBeingDragged}
            onDrop={handleDrop}
            direction={direction}>
            {(renderProps) => children(item, renderProps)}
          </SortableItem>
        );
      })}
    </div>
  );
};

// Individual Sortable Item
const SortableItem: React.FC<SortableItemProps> = ({ item, itemId, index, isDragging, onDrop, direction, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSortableItem, unregisterSortableItem } = useDragDrop();

  // Register this item with the drag drop context
  useEffect(() => {
    if (!ref.current) return;

    const updateSortableItem = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        registerSortableItem({
          id: itemId,
          index,
          rect,
        });
      }
    };

    // Initial registration
    updateSortableItem();

    // Update on resize or scroll
    window.addEventListener("resize", updateSortableItem);
    window.addEventListener("scroll", updateSortableItem);

    return () => {
      unregisterSortableItem(itemId);
      window.removeEventListener("resize", updateSortableItem);
      window.removeEventListener("scroll", updateSortableItem);
    };
  }, [itemId, index, registerSortableItem, unregisterSortableItem]);

  // Handle when another item is dropped on this item
  const handleDropOnItem = () => {
    onDrop(itemId, index);
  };

  // Prepare render props for the children
  const renderProps: SortableItemRenderProps = {
    isDragging,
    dragHandleProps: {
      draggableId: itemId,
      role: "button",
      tabIndex: 0,
      "aria-pressed": isDragging,
      "aria-label": `Drag to reorder item ${index + 1}`,
    },
  };

  return (
    <Droppable
      id={`droppable-${itemId}`}
      onDrop={handleDropOnItem}
      // Remove isActive prop - it's causing a DOM warning
      className="blox-sortable-droppable"
      style={{
        margin: direction === "vertical" ? "2px 0" : "0 2px",
      }}
      data-is-active="true" // Use data attribute instead
    >
      <DraggableWithContext
        id={itemId}
        type="sortable-item"
        data={item}
        className="blox-sortable-item"
        style={{
          opacity: isDragging ? `var(--blox-dragdrop-sortable-opacity, ${STYLES.DragDrop.sortable.opacity})` : 1,
          cursor: "grab",
          transition: "all 0.2s ease",
          backgroundColor: isDragging ? `var(--blox-dragdrop-sortable-bg-color, ${STYLES.DragDrop.sortable.backgroundColor})` : "transparent",
          borderRadius: `var(--blox-dragdrop-sortable-border-radius, ${STYLES.DragDrop.sortable.borderRadius})`,
        }}>
        {children(renderProps)}
      </DraggableWithContext>
    </Droppable>
  );
};

export default Sortable;
