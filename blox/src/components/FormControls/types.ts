import { BaseProps } from "../../types";
import React from "react";

export type FormControlSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
  /**
   * Label for the checkbox
   */
  label?: React.ReactNode;
  
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  
  /**
   * Whether the checkbox is indeterminate
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: FormControlSize;
  
  /**
   * Additional class for the checkbox container
   */
  containerClassName?: string;
  
  /**
   * Additional class for the checkbox input
   */
  inputClassName?: string;
  
  /**
   * Additional class for the label
   */
  labelClassName?: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
  /**
   * Label for the radio
   */
  label?: React.ReactNode;
  
  /**
   * Whether the radio is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the radio is required
   */
  required?: boolean;
  
  /**
   * Size of the radio
   * @default 'md'
   */
  size?: FormControlSize;
  
  /**
   * Additional class for the radio container
   */
  containerClassName?: string;
  
  /**
   * Additional class for the radio input
   */
  inputClassName?: string;
  
  /**
   * Additional class for the label
   */
  labelClassName?: string;
}

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
  /**
   * Label for the toggle
   */
  label?: React.ReactNode;

  /**
   * Variant style of the toggle
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  
  /**
   * Whether the toggle is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean;
  
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the toggle is required
   */
  required?: boolean;
  
  /**
   * Size of the toggle
   * @default 'md'
   */
  size?: FormControlSize;
  
  /**
   * Additional class for the toggle container
   */
  containerClassName?: string;
  
  /**
   * Additional class for the toggle input
   */
  inputClassName?: string;
  
  /**
   * Additional class for the toggle track
   */
  trackClassName?: string;
  
  /**
   * Additional class for the toggle thumb/knob
   */
  thumbClassName?: string;
  
  /**
   * Additional class for the label
   */
  labelClassName?: string;
  
  /**
   * Whether to show a border around the toggle track
   * @default false
   */
  hasBorder?: boolean;
}