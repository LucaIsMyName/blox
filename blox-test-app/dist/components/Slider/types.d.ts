import { HTMLAttributes, ReactNode } from "react";
export interface ThumbPosition {
    /**
     * The value of this thumb
     */
    value: number;
    /**
     * The index of this thumb
     */
    index: number;
    /**
     * Percentage position of this thumb (0-100)
     */
    percent: number;
}
export interface SliderRange {
    /**
     * Start value for this range
     */
    start: number;
    /**
     * End value for this range
     */
    end: number;
}
export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Current value(s) of the slider
     */
    value?: number | number[];
    /**
     * Default value(s) for uncontrolled usage
     */
    defaultValue?: number | number[];
    /**
     * Callback for when the value changes
     */
    onChange?: (value: number | number[]) => void;
    /**
     * Callback for when the slider starts being dragged
     */
    onDragStart?: (value: number | number[]) => void;
    /**
     * Callback for when the slider stops being dragged
     */
    onDragEnd?: (value: number | number[]) => void;
    /**
     * Minimum value of the slider
     * @default 0
     */
    min?: number;
    /**
     * Maximum value of the slider
     * @default 100
     */
    max?: number;
    /**
     * Step size for value changes
     * @default 1
     */
    step?: number;
    /**
     * Whether the slider is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Orientation of the slider
     * @default 'horizontal'
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Custom class name for the slider root
     */
    className?: string;
    /**
     * Whether to invert the direction
     * @default false
     */
    inverted?: boolean;
    /**
     * Whether to show marks on the slider
     * @default false
     */
    showMarks?: boolean;
    /**
     * Custom marks to display on the slider
     * Format: {value: ReactNode}
     */
    marks?: Record<number, ReactNode>;
    /**
     * The slider label (for accessibility)
     */
    label?: string;
    /**
     * The ARIA label for the slider (if label prop is not provided)
     */
    "aria-label"?: string;
    /**
     * ID of an element that describes the slider
     */
    "aria-labelledby"?: string;
    /**
     * ID of an element that describes the slider value
     */
    "aria-describedby"?: string;
    /**
     * Children of the slider (for custom rendering)
     */
    children?: ReactNode | ((props: SliderContextValue) => ReactNode);
}
export interface SliderTrackProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the track
     */
    children?: ReactNode;
}
export interface SliderRangeProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The index of the range to show
     * If multiple values, range index refers to the span between thumbs
     * @default 0
     */
    index?: number;
    /**
     * Children of the range
     */
    children?: ReactNode;
}
export interface SliderThumbProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The index of the thumb
     * @default 0
     */
    index?: number;
    /**
     * Children of the thumb
     */
    children?: ReactNode;
}
export interface SliderMarkProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The value at which to show this mark
     */
    value: number;
    /**
     * Children of the mark
     */
    children?: ReactNode;
}
export interface SliderContextValue {
    /**
     * Current value(s) of the slider
     */
    value: number | number[];
    /**
     * Minimum value of the slider
     */
    min: number;
    /**
     * Maximum value of the slider
     */
    max: number;
    /**
     * Step size for value changes
     */
    step: number;
    /**
     * Whether the slider is disabled
     */
    disabled: boolean;
    /**
     * Orientation of the slider
     */
    orientation: "horizontal" | "vertical";
    /**
     * Whether the direction is inverted
     */
    inverted: boolean;
    /**
     * Whether any thumb is currently being dragged
     */
    isDragging: boolean;
    /**
     * Current position of each thumb
     */
    thumbPositions: ThumbPosition[];
    /**
     * Range information (for multiple thumbs)
     */
    ranges: SliderRange[];
    /**
     * Update a specific thumb value
     */
    updateThumb: (index: number, value: number) => void;
    /**
     * Set dragging state
     */
    setDragging: (dragging: boolean) => void;
    /**
     * Get the closest thumb index to a given position
     */
    getClosestThumb: (position: number) => number;
    /**
     * Convert a value to a percentage position (0-100)
     */
    valueToPercent: (value: number) => number;
    /**
     * Convert a percentage position (0-100) to a value
     */
    percentToValue: (percent: number) => number;
}
export interface SliderComposition {
    Track: React.FC<SliderTrackProps>;
    Range: React.FC<SliderRangeProps>;
    Thumb: React.FC<SliderThumbProps>;
    Mark: React.FC<SliderMarkProps>;
}
