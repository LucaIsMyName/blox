// types.ts
import { HTMLAttributes, ReactNode } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the drawer
   */
  children: ReactNode;
  
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  
  /**
   * Callback function to close the drawer
   */
  onClose: () => void;
  
  /**
   * Placement of the drawer
   * @default 'right'
   */
  placement?: DrawerPlacement;
  
  /**
   * Minimum width of the drawer (for left/right placement)
   * @default '250px'
   */
  minWidth?: string | number;
  
  /**
   * Maximum width of the drawer (for left/right placement)
   * @default '100%'
   */
  maxWidth?: string | number;
  
  /**
   * Minimum height of the drawer (for top/bottom placement)
   * @default '250px'
   */
  minHeight?: string | number;
  
  /**
   * Maximum height of the drawer (for top/bottom placement)
   * @default '100%'
   */
  maxHeight?: string | number;
  
  /**
   * Whether to close the drawer when the escape key is pressed
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * Whether to close the drawer when clicking outside of it
   * @default true
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Custom class name for the drawer backdrop
   */
  backdropClassName?: string;
  
  /**
   * Custom class name for the drawer content
   */
  contentClassName?: string;
  
  /**
   * Custom z-index for the drawer
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * Whether to trap focus inside the drawer when open
   * @default true
   */
  trapFocus?: boolean;
  
  /**
   * Whether to render the drawer in a portal
   * @default true
   */
  usePortal?: boolean;
  
  /**
   * Whether to show a close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to animate the drawer
   * @default true
   */
  animated?: boolean;
  
  /**
   * Whether to block scrolling when the drawer is open
   * @default true
   */
  lockScroll?: boolean;
  
  /**
   * Custom render function for the close button
   */
  renderCloseButton?: (props: { onClick: () => void }) => React.ReactNode;
  
  /**
   * Custom close button content
   */
  closeButton?: ReactNode;
  
  /**
   * ARIA label for the drawer
   */
  "aria-label"?: string;
  
  /**
   * ID of the element that labels the drawer
   */
  "aria-labelledby"?: string;
  
  /**
   * ID of the element that describes the drawer
   */
  "aria-describedby"?: string;
  
  /**
   * Role for the drawer (for accessibility)
   * @default 'dialog'
   */
  role?: string;
}

export interface DrawerComposition {
  Header: React.FC<DrawerHeaderProps>;
  Body: React.FC<DrawerBodyProps>;
  Footer: React.FC<DrawerFooterProps>;
  CloseButton: React.FC<DrawerCloseButtonProps>;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DrawerCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}