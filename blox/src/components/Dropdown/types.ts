import { BaseProps, Size } from '../../types';

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: DropdownOption[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  size?: Size;
  fullWidth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  rest?: any;
}