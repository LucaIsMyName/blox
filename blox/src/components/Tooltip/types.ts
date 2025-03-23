import { BaseProps } from "../../types";
import React from "react";

export type TooltipPlacement = 
  | "top" 
  | "top-start" 
  | "top-end" 
  | "right" 
  | "right-start" 
  | "right-end" 
  | "bottom" 
  | "bottom-start" 
  | "bottom-end" 
  | "left" 
  | "left-start" 
  | "left-end";

export interface TooltipProps extends BaseProps {
  /**
   * Content to display in the tooltip
   */
  content: React.ReactNode;
  
  /**
   * Whether the tooltip is open
   * @default false
   */
  isOpen?: boolean;
  
  /**
   * Preferred placement of the tooltip
   * @default "bottom"
   */
  placement?: TooltipPlacement;
  
  /**
   * Space between tooltip and trigger (in pixels)
   * @default 8
   */
  offset?: number;
  
  /**
   * Delay before showing the tooltip (in ms)
   * @default 0
   */
  showDelay?: number;
  
  /**
   * Delay before hiding the tooltip (in ms)
   * @default 0
   */
  hideDelay?: number;
  
  /**
   * Whether to show the tooltip on hover
   * @default true
   */
  showOnHover?: boolean;
  
  /**
   * Whether to show the tooltip on focus
   * @default true
   */
  showOnFocus?: boolean;
  
  /**
   * ID used for accessibility
   */
  id?: string;
  
  /**
   * Whether to close when pressing escape
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * Whether to make the tooltip interactive (can hover over tooltip)
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Z-index for the tooltip
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * Whether to disable the tooltip
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * Additional class name for the tooltip content
   */
  tooltipClassName?: string;
  
  /**
   * Trigger/children to show the tooltip on
   */
  children: React.ReactNode;
}