// types.ts
import { HTMLAttributes, ReactNode } from 'react';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether multiple items can be expanded at once
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * Default expanded item indices
   * @default []
   */
  defaultIndex?: number | number[];
  
  /**
   * Controlled expanded item indices
   */
  activeIndices?: number[];
  
  /**
   * Callback when items are expanded/collapsed
   */
  onChange?: (indices: number[]) => void;
  
  /**
   * Children of the accordion
   */
  children: ReactNode;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Index of the accordion item
   */
  index?: number;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * Children of the accordion item
   */
  children: ReactNode;
}

export interface AccordionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Children of the accordion button
   */
  children: ReactNode;
}

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the accordion panel
   */
  children: ReactNode;
}

export interface AccordionContextType {
  /**
   * Currently active indices
   */
  activeIndices: number[];
  
  /**
   * Toggle an item's expanded state
   */
  toggleItem: (index: number) => void;
  
  /**
   * Check if an item is active
   */
  isItemActive: (index: number) => boolean;
}

export interface AccordionItemContextType {
  /**
   * Whether the item is active (expanded)
   */
  isActive: boolean;
  
  /**
   * Whether the item is disabled
   */
  isDisabled: boolean;
  
  /**
   * Item index
   */
  index: number;
  
  /**
   * Toggle this item
   */
  toggleItem: () => void;
}

export interface AccordionComposition {
  Item: React.FC<AccordionItemProps>;
  Button: React.FC<AccordionButtonProps>;
  Panel: React.FC<AccordionPanelProps>;
}