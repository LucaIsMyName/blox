// index.ts - Barrel file for DragDrop components
import { DragDropProvider, useDragDrop } from "./DragDropContext";
import { Draggable, DraggableWithContext, DragHandle } from "./Draggable";
import { Droppable } from "./Droppable";
import { DragOverlay } from "./DragOverlay";
import { Sortable } from "./Sortable";

// Re-export all components and hooks
export {
  // Context and Provider
  DragDropProvider,
  useDragDrop,
  // Core Components
  Draggable,
  DraggableWithContext,
  DragHandle,
  Droppable,
  DragOverlay,
  Sortable,
};

// Re-export types
export type {
  // Coordinates and Items
  Coordinates,
  DragItem,

  // Events
  DragStartEvent,
  DragMoveEvent,
  DragEndEvent,

  // Target Information
  DropTargetInfo,
  SortableItemInfo,

  // Context Value
  DragContextValue,

  // Component Props
  DragDropProviderProps,
  DraggableProps,
  DraggableRenderProps,
  DragHandleProps,
  DroppableProps,
  DroppableRenderProps,
  DragOverlayProps,
  SortableProps,
  SortableItemProps,
  SortableItemRenderProps,
} from "./types";

// Default export as a namespace
export const DragDrop = {
  Provider: DragDropProvider,
  Draggable,
  DraggableWithContext,
  DragHandle,
  Droppable,
  DragOverlay,
  Sortable,
  useDragDrop,
};

export default DragDrop;
