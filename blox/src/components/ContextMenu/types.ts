// types.ts
import { HTMLAttributes, ReactNode } from "react";

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children elements that will trigger the context menu on right-click
   */
  children: ReactNode;

  /**
   * Custom function to open the context menu (useful for custom triggers)
   */
  onOpen?: (event: React.MouseEvent | React.KeyboardEvent) => void;

  /**
   * Custom function to close the context menu
   */
  onClose?: () => void;

  /**
   * Whether the context menu is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to enable keyboard shortcuts to open context menu
   * @default true
   */
  enableKeyboard?: boolean;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children elements that will trigger the context menu on right-click
   */
  children: ReactNode;

  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
}

export interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the context menu content
   */
  children: ReactNode;

  /**
   * Whether to close the menu when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether to close the menu when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Additional offset from the cursor position (x, y) in pixels
   * @default [0, 0]
   */
  offset?: [number, number];

  /**
   * Width of the context menu
   */
  width?: number | string;

  /**
   * Maximum height of the context menu before scrolling
   */
  maxHeight?: number | string;
}

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content of the menu item
   */
  children: ReactNode;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Function to execute when item is clicked
   */
  onSelect?: () => void;

  /**
   * Whether to close the menu after selection
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Icon or element to display before the item text
   */
  icon?: ReactNode;

  /**
   * Keyboard shortcut to display
   */
  shortcut?: string;
}

export interface ContextMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the group
   */
  children: ReactNode;

  /**
   * Label for the group
   */
  label?: string;
}

export interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuContextValue {
  /**
   * Whether the context menu is open
   */
  isOpen: boolean;

  /**
   * Function to open the context menu
   */
  open: (event: React.MouseEvent | React.KeyboardEvent) => void;

  /**
   * Function to close the context menu
   */
  close: () => void;

  /**
   * Current position of the context menu
   */
  position: { x: number; y: number };

  /**
   * Whether the context menu trigger is disabled
   */
  disabled: boolean;
}

export interface ContextMenuComposition {
  Trigger: React.FC<ContextMenuTriggerProps>;
  Content: React.FC<ContextMenuContentProps>;
  Item: React.FC<ContextMenuItemProps>;
  Group: React.FC<ContextMenuGroupProps>;
  Separator: React.FC<ContextMenuSeparatorProps>;
}
