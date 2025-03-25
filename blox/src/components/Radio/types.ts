// types.ts
import { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * The label for the radio button
   */
  label?: ReactNode;
  
  /**
   * The value of the radio button
   */
  value: string;
  
  /**
   * Whether the radio button is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean;
  
  /**
   * Callback for when the radio button is toggled
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Whether the radio button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the radio button is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Custom class name for the radio container
   */
  className?: string;
  
  /**
   * Custom class name for the radio input
   */
  inputClassName?: string;
  
  /**
   * Custom class name for the radio label
   */
  labelClassName?: string;
  
  /**
   * ID for the radio input
   */
  id?: string;
  
  /**
   * Name attribute for the radio group
   */
  name: string;
  
  /**
   * Additional props for the label element
   */
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  
  /**
   * Position of the label relative to the radio
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
  
  /**
   * Helper text to display below the radio
   */
  helperText?: ReactNode;
  
  /**
   * Error message to display below the radio
   */
  errorMessage?: ReactNode;
  
  /**
   * Whether the radio is in an error state
   * @default false
   */
  hasError?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Children of the radio group
   */
  children: ReactNode;
  
  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;
  
  /**
   * Currently selected value
   */
  value?: string;
  
  /**
   * Default selected value for uncontrolled usage
   */
  defaultValue?: string;
  
  /**
   * Callback for when selection changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Whether all radio buttons are disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether radio buttons are required
   * @default false
   */
  required?: boolean;
  
  /**
   * Layout direction of the radio group
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * Custom class name for the radio group
   */
  className?: string;
  
  /**
   * Label for the radio group
   */
  label?: ReactNode;
  
  /**
   * Helper text for the radio group
   */
  helperText?: ReactNode;
  
  /**
   * Error message for the radio group
   */
  errorMessage?: ReactNode;
  
  /**
   * Whether the radio group has an error
   * @default false
   */
  hasError?: boolean;
}