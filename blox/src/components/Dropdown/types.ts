import { BaseProps, Size } from '../../types';

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of options for the dropdown
   */
  options: DropdownOption[];
  
  /**
   * Currently selected value
   */
  value?: string | number;
  
  /**
   * Callback when selection changes
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  
  /**
   * Text to display when no option is selected
   */
  placeholder?: string;
  
  /**
   * Size of the dropdown
   * @default 'md'
   */
  size?: Size;
  
  /**
   * Whether the dropdown should take full width of container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the dropdown should have rounded corners
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Whether the dropdown is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Name attribute for the hidden select element
   */
  name?: string;
}