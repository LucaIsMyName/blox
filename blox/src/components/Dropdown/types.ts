// types.ts
import { ReactNode, HTMLAttributes } from 'react';

export interface DropdownOption {
  /**
   * Display label for the option
   */
  label: ReactNode;
  
  /**
   * Value of the option (used for selection)
   */
  value: string | number;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  
  /**
   * Custom data attributes
   */
  [key: `data-${string}`]: string | undefined;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;
  
  /**
   * Callback when open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Currently selected value
   */
  value?: string | number;
  
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number) => void;
  
  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Children of the dropdown
   */
  children: ReactNode;
  
  /**
   * Placement of the dropdown menu
   * @default 'bottom-start'
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  
  /**
   * Custom class name for the dropdown
   */
  className?: string;
  
  /**
   * Width of the dropdown (either a string or a boolean for full width)
   */
  width?: string | boolean;
  
  /**
   * Callback function invoked when the dropdown is clicked outside
   */
  onClickOutside?: () => void;
  
  /**
   * Name attribute for the hidden input element
   */
  name?: string;
}

export interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Children of the trigger button
   */
  children: ReactNode;
  
  /**
   * Whether the trigger is disabled
   */
  disabled?: boolean;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the dropdown menu
   */
  children: ReactNode;
}

export interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the dropdown item
   */
  children: ReactNode;
  
  /**
   * Value of the dropdown item
   */
  value: string | number;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the item is currently selected
   */
  selected?: boolean;
  
  /**
   * Callback when the item is selected
   */
  onSelect?: (value: string | number) => void;
}

export interface DropdownContextValue {
  /**
   * Whether the dropdown is open
   */
  isOpen: boolean;
  
  /**
   * Callback to toggle dropdown
   */
  toggle: () => void;
  
  /**
   * Callback to open dropdown
   */
  open: () => void;
  
  /**
   * Callback to close dropdown
   */
  close: () => void;
  
  /**
   * Selected value
   */
  selectedValue?: string | number;
  
  /**
   * Callback when selection changes
   */
  onValueChange?: (value: string | number) => void;
  
  /**
   * Whether the dropdown is disabled
   */
  isDisabled: boolean;
}

export interface DropdownComposition {
  Trigger: React.FC<DropdownTriggerProps>;
  Menu: React.FC<DropdownMenuProps>;
  Item: React.FC<DropdownItemProps>;
}