// types.ts
import { HTMLAttributes, ReactNode } from 'react';

export type TooltipPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end' 
  | 'right' 
  | 'right-start' 
  | 'right-end' 
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'left' 
  | 'left-start' 
  | 'left-end';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be shown inside the tooltip
   */
  content: ReactNode;
  
  /**
   * The element that triggers the tooltip
   */
  children: ReactNode;
  
  /**
   * The placement of the tooltip relative to the trigger element
   * @default 'bottom'
   */
  placement?: TooltipPlacement;
  
  /**
   * Minimum width of the tooltip
   */
  minWidth?: number | string;
  
  /**
   * Maximum width of the tooltip
   */
  maxWidth?: number | string;
  
  /**
   * The distance between the tooltip and the trigger element (in pixels)
   * @default 8
   */
  offset?: number;
  
  /**
   * Delay before showing the tooltip (in milliseconds)
   * @default 0
   */
  showDelay?: number;
  
  /**
   * Delay before hiding the tooltip (in milliseconds)
   * @default 0
   */
  hideDelay?: number;
  
  /**
   * Whether the tooltip should be shown on hover
   * @default true
   */
  showOnHover?: boolean;
  
  /**
   * Whether the tooltip should be shown on focus
   * @default true
   */
  showOnFocus?: boolean;
  
  /**
   * Controlled open state of the tooltip
   */
  isOpen?: boolean;
  
  /**
   * ID for accessibility
   */
  id?: string;
  
  /**
   * Whether to close the tooltip when pressing escape
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * Whether the tooltip should remain open when hovering over it
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Z-index for the tooltip
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * Additional className for the tooltip element
   */
  tooltipClassName?: string;
}