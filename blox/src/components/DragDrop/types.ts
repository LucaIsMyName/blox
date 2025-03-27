// types.ts
import { ReactNode, HTMLAttributes, RefObject } from "react";

// Coordinates type
export interface Coordinates {
  x: number;
  y: number;
}

// Item type for drag operations
export interface DragItem {
  id: string;
  type: string;
  data?: any;
}

// Drag start event
export interface DragStartEvent {
  item: DragItem;
  coordinates: Coordinates;
  target: HTMLElement;
  nativeEvent: MouseEvent | TouchEvent;
}

// Drag move event
export interface DragMoveEvent {
  item: DragItem;
  coordinates: Coordinates;
  delta: Coordinates;
  nativeEvent: MouseEvent | TouchEvent;
  over?: DropTargetInfo | null;
}

// Drag end event
export interface DragEndEvent {
  item: DragItem;
  coordinates: Coordinates;
  delta: Coordinates;
  over?: DropTargetInfo | null;
  nativeEvent: MouseEvent | TouchEvent;
}

// Drop target information
export interface DropTargetInfo {
  id: string;
  type: string;
  data?: any;
  rect: DOMRect;
}

// Sortable related types
export interface SortableItemInfo {
  id: string;
  index: number;
  rect: DOMRect;
}

// Drag context value
export interface DragContextValue {
  draggingItem: DragItem | null;
  dragPosition: Coordinates | null;
  dropTargets: Map<string, DropTargetInfo>;
  sortableItems: Map<string, SortableItemInfo>;
  registerDropTarget: (target: DropTargetInfo) => void;
  unregisterDropTarget: (id: string) => void;
  registerSortableItem: (item: SortableItemInfo) => void;
  unregisterSortableItem: (id: string) => void;
  startDrag: (item: DragItem, event: MouseEvent | TouchEvent) => void;
  endDrag: () => void;
  getDragOverTarget: () => DropTargetInfo | null;
}

// Props for DragDrop.Provider component
export interface DragDropProviderProps {
  children: ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: () => void;
}

// Props for DragDrop.Draggable component
export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  type?: string;
  data?: any;
  disabled?: boolean;
  handle?: boolean;
  preview?: ReactNode | ((props: { isDragging: boolean }) => ReactNode);
  children: ReactNode | ((props: DraggableRenderProps) => ReactNode);
  ref?: RefObject<HTMLDivElement>;
}

// Render props for Draggable component
export interface DraggableRenderProps {
  isDragging: boolean;
  dragHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
}

// Props for DragDrop.DragHandle component
export interface DragHandleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// Props for DragDrop.Droppable component
export interface DroppableProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  type?: string | string[];
  data?: any;
  disabled?: boolean;
  accept?: string | string[] | ((item: DragItem) => boolean);
  onDrop?: () => void;
  // Remove isActive from the interface
  children: ReactNode | ((props: DroppableRenderProps) => ReactNode);
}

// Render props for Droppable component
export interface DroppableRenderProps {
  isOver: boolean;
  canDrop: boolean;
}

// Props for DragDrop.DragOverlay component
export interface DragOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ((props: { item: DragItem }) => ReactNode);
}

// Props for Sortable component
export interface SortableProps extends HTMLAttributes<HTMLDivElement> {
  items: any[];
  keyExtractor: (item: any) => string;
  onReorder: (newItems: any[]) => void;
  direction?: "horizontal" | "vertical";
  children: (item: any, renderProps: SortableItemRenderProps) => ReactNode;
}

// Props for SortableItem component
export interface SortableItemProps {
  item: any;
  itemId: string;
  index: number;
  isDragging: boolean;
  onDrop: (itemId: string, targetIndex: number) => void;
  direction: "horizontal" | "vertical";
  children: (renderProps: SortableItemRenderProps) => ReactNode;
}

// Render props for SortableItem component
export interface SortableItemRenderProps {
  isDragging: boolean;
  dragHandleProps: {
    draggableId: string;
    role: string;
    tabIndex: number;
    'aria-pressed': boolean;
    'aria-label': string;
  };
}