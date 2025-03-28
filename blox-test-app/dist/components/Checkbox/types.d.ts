import { InputHTMLAttributes, ReactNode } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    /**
     * The label for the checkbox
     */
    label?: ReactNode;
    /**
     * Whether the checkbox is checked
     */
    checked?: boolean;
    /**
     * Default checked state for uncontrolled usage
     */
    defaultChecked?: boolean;
    /**
     * Callback for when the checkbox is toggled
     */
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Whether the checkbox is indeterminate
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the checkbox is required
     * @default false
     */
    required?: boolean;
    /**
     * Custom class name for the checkbox container
     */
    className?: string;
    /**
     * Custom class name for the checkbox input
     */
    inputClassName?: string;
    /**
     * Custom class name for the checkbox label
     */
    labelClassName?: string;
    /**
     * ID for the checkbox input
     */
    id?: string;
    /**
     * Additional props for the label element
     */
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /**
     * Position of the label relative to the checkbox
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
    /**
     * Helper text to display below the checkbox
     */
    helperText?: ReactNode;
    /**
     * Error message to display below the checkbox
     */
    errorMessage?: ReactNode;
    /**
     * Whether the checkbox is in an error state
     * @default false
     */
    hasError?: boolean;
}
