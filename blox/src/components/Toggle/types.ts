// types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Interface for the standalone Toggle component
export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * Whether the toggle is pressed/active
   */
  pressed?: boolean;
  
  /**
   * Default pressed state for uncontrolled usage
   */
  defaultPressed?: boolean;
  
  /**
   * Callback for when the toggle is pressed
   */
  onChange?: (pressed: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Value of the toggle, used within a toggle group
   */
  value?: string;
  
  /**
   * Whether the toggle is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom class name for the toggle button
   */
  className?: string;
  
  /**
   * Children of the toggle
   */
  children?: ReactNode;
}

// Interface for the toggle group
export interface ToggleGroupProps {
  /**
   * Children of the toggle group, should be Toggle components
   */
  children?: ReactNode;
  
  /**
   * Type of selection allowed in the group
   * @default 'single'
   */
  type?: 'single' | 'multiple';
  
  /**
   * Value(s) of the selected toggle(s)
   */
  value?: string | string[];
  
  /**
   * Default value(s) for uncontrolled usage
   */
  defaultValue?: string | string[];
  
  /**
   * Callback for when the selection changes
   */
  onChange?: (value: string | string[]) => void;
  
  /**
   * Whether toggles can be deselected in single selection mode
   * @default false
   */
  allowDeselect?: boolean;
  
  /**
   * Whether the toggle group is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom class name for the toggle group container
   */
  className?: string;
  
  /**
   * Layout direction of the toggle group
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Spacing between toggle items
   * @default 'normal'
   */
  spacing?: 'none' | 'compact' | 'normal' | 'loose';
}

// Context interface for the toggle group
export interface ToggleGroupContextValue {
  /**
   * Type of selection
   */
  type: 'single' | 'multiple';
  
  /**
   * Currently selected value(s)
   */
  value: string | string[] | undefined;
  
  /**
   * Callback for updating the value
   */
  updateValue: (itemValue: string, pressed: boolean) => void;
  
  /**
   * Whether the toggle group is disabled
   */
  disabled: boolean;
  
  /**
   * Whether toggles can be deselected in single selection mode
   */
  allowDeselect: boolean;
}

// Composition interface for Toggle component with Group
export interface ToggleComposition {
  Group: React.FC<ToggleGroupProps>;
}