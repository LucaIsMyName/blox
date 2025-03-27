import { ReactNode, HTMLAttributes, RefObject } from "react";
export interface Coordinates {
    x: number;
    y: number;
}
export interface DragItem {
    id: string;
    type: string;
    data?: any;
}
export interface DragStartEvent {
    item: DragItem;
    coordinates: Coordinates;
    target: HTMLElement;
    nativeEvent: MouseEvent | TouchEvent;
}
export interface DragMoveEvent {
    item: DragItem;
    coordinates: Coordinates;
    delta: Coordinates;
    nativeEvent: MouseEvent | TouchEvent;
    over?: DropTargetInfo | null;
}
export interface DragEndEvent {
    item: DragItem;
    coordinates: Coordinates;
    delta: Coordinates;
    over?: DropTargetInfo | null;
    nativeEvent: MouseEvent | TouchEvent;
}
export interface DropTargetInfo {
    id: string;
    type: string;
    data?: any;
    rect: DOMRect;
}
export interface SortableItemInfo {
    id: string;
    index: number;
    rect: DOMRect;
}
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
export interface DragDropProviderProps {
    children: ReactNode;
    onDragStart?: (event: DragStartEvent) => void;
    onDragMove?: (event: DragMoveEvent) => void;
    onDragEnd?: (event: DragEndEvent) => void;
    onDragCancel?: () => void;
}
export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    type?: string;
    data?: any;
    disabled?: boolean;
    handle?: boolean;
    preview?: ReactNode | ((props: {
        isDragging: boolean;
    }) => ReactNode);
    children: ReactNode | ((props: DraggableRenderProps) => ReactNode);
    ref?: RefObject<HTMLDivElement>;
}
export interface DraggableRenderProps {
    isDragging: boolean;
    dragHandleProps: {
        onMouseDown: (e: React.MouseEvent) => void;
        onTouchStart: (e: React.TouchEvent) => void;
    };
}
export interface DragHandleProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export interface DroppableProps extends HTMLAttributes<HTMLDivElement> {
    id: string;
    type?: string | string[];
    data?: any;
    disabled?: boolean;
    accept?: string | string[] | ((item: DragItem) => boolean);
    onDrop?: () => void;
    children: ReactNode | ((props: DroppableRenderProps) => ReactNode);
}
export interface DroppableRenderProps {
    isOver: boolean;
    canDrop: boolean;
}
export interface DragOverlayProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode | ((props: {
        item: DragItem;
    }) => ReactNode);
}
export interface SortableProps extends HTMLAttributes<HTMLDivElement> {
    items: any[];
    keyExtractor: (item: any) => string;
    onReorder: (newItems: any[]) => void;
    direction?: "horizontal" | "vertical";
    children: (item: any, renderProps: SortableItemRenderProps) => ReactNode;
}
export interface SortableItemProps {
    item: any;
    itemId: string;
    index: number;
    isDragging: boolean;
    onDrop: (itemId: string, targetIndex: number) => void;
    direction: "horizontal" | "vertical";
    children: (renderProps: SortableItemRenderProps) => ReactNode;
}
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
