import { HTMLAttributes, ReactNode } from 'react';
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Currently selected value (controlled mode)
     */
    value?: string;
    /**
     * Default selected value (uncontrolled mode)
     */
    defaultValue?: string;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string) => void;
    /**
     * Whether all options can be deselected
     * @default false
     */
    allowDeselect?: boolean;
    /**
     * Whether the control is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Children of the segmented control
     */
    children: ReactNode;
}
export interface SegmentItemProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * Value of the segment
     */
    value: string;
    /**
     * Whether the segment is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Children of the segment
     */
    children: ReactNode;
}
export interface SegmentedControlContextType {
    /**
     * Selected value
     */
    selectedValue: string | null;
    /**
     * Change handler
     */
    onChange: (value: string) => void;
    /**
     * Whether deselection is allowed
     */
    allowDeselect: boolean;
    /**
     * Whether the control is disabled
     */
    disabled: boolean;
}
export interface SegmentedControlComposition {
    Item: React.FC<SegmentItemProps>;
}
