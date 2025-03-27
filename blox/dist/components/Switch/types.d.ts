import { HTMLAttributes, ReactNode, InputHTMLAttributes } from "react";
export interface SwitchProps extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
    /**
     * Whether the switch is checked
     */
    checked?: boolean;
    /**
     * Default checked state for uncontrolled usage
     */
    defaultChecked?: boolean;
    /**
     * Callback when the switch is toggled
     */
    onChange?: (checked: boolean) => void;
    /**
     * Whether the switch is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the switch is required
     * @default false
     */
    required?: boolean;
    /**
     * ID for the switch input
     */
    id?: string;
    /**
     * Name attribute for the switch input
     */
    name?: string;
    /**
     * Value attribute for the switch input
     */
    value?: string;
    /**
     * Label for the switch
     */
    label?: ReactNode;
    /**
     * Position of the label relative to the switch
     * @default 'right'
     */
    labelPosition?: "left" | "right";
    /**
     * Custom class name for the switch container
     */
    className?: string;
    /**
     * Custom class name for the switch thumb
     */
    thumbClassName?: string;
    /**
     * Custom class name for the switch track
     */
    trackClassName?: string;
    /**
     * Custom class name for the switch label
     */
    labelClassName?: string;
    /**
     * Helper text to display below the switch
     */
    helperText?: ReactNode;
    /**
     * Error message to display below the switch
     */
    errorMessage?: ReactNode;
    /**
     * Whether the switch is in an error state
     * @default false
     */
    hasError?: boolean;
    /**
     * Additional props for the hidden input element
     */
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "defaultChecked" | "onChange" | "disabled" | "required">;
}
