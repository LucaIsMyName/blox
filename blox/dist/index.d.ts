import React$1, { HTMLAttributes, ReactNode, InputHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, TableHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether multiple items can be expanded at once
     * @default false
     */
    allowMultiple?: boolean;
    /**
     * Default expanded item indices
     * @default []
     */
    defaultIndex?: number | number[];
    /**
     * Controlled expanded item indices
     */
    activeIndices?: number[];
    /**
     * Callback when items are expanded/collapsed
     */
    onChange?: (indices: number[]) => void;
    /**
     * Children of the accordion
     */
    children: ReactNode;
}
interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Index of the accordion item
     */
    index?: number;
    /**
     * Whether the item is disabled
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Children of the accordion item
     */
    children: ReactNode;
}
interface AccordionButtonProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * Children of the accordion button
     */
    children: ReactNode;
}
interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the accordion panel
     */
    children: ReactNode;
}
interface AccordionComposition {
    Item: React.FC<AccordionItemProps>;
    Button: React.FC<AccordionButtonProps>;
    Panel: React.FC<AccordionPanelProps>;
}

declare const Accordion: React$1.FC<AccordionProps> & AccordionComposition;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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

declare const Checkbox: React$1.FC<CheckboxProps>;

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The content of the drawer
     */
    children: ReactNode;
    /**
     * Whether the drawer is open
     */
    isOpen: boolean;
    /**
     * Callback function to close the drawer
     */
    onClose: () => void;
    /**
     * Placement of the drawer
     * @default 'right'
     */
    placement?: DrawerPlacement;
    /**
     * Minimum width of the drawer (for left/right placement)
     * @default '250px'
     */
    minWidth?: string | number;
    /**
     * Maximum width of the drawer (for left/right placement)
     * @default '100%'
     */
    maxWidth?: string | number;
    /**
     * Minimum height of the drawer (for top/bottom placement)
     * @default '250px'
     */
    minHeight?: string | number;
    /**
     * Maximum height of the drawer (for top/bottom placement)
     * @default '100%'
     */
    maxHeight?: string | number;
    /**
     * Whether to close the drawer when the escape key is pressed
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Whether to close the drawer when clicking outside of it
     * @default true
     */
    closeOnOutsideClick?: boolean;
    /**
     * Custom class name for the drawer backdrop
     */
    backdropClassName?: string;
    /**
     * Custom class name for the drawer content
     */
    contentClassName?: string;
    /**
     * Custom z-index for the drawer
     * @default 1000
     */
    zIndex?: number;
    /**
     * Whether to trap focus inside the drawer when open
     * @default true
     */
    trapFocus?: boolean;
    /**
     * Whether to render the drawer in a portal
     * @default true
     */
    usePortal?: boolean;
    /**
     * Whether to show a close button
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Whether to animate the drawer
     * @default true
     */
    animated?: boolean;
    /**
     * Whether to block scrolling when the drawer is open
     * @default true
     */
    lockScroll?: boolean;
    /**
     * Custom render function for the close button
     */
    renderCloseButton?: (props: {
        onClick: () => void;
    }) => React.ReactNode;
    /**
     * Custom close button content
     */
    closeButton?: ReactNode;
    /**
     * ARIA label for the drawer
     */
    "aria-label"?: string;
    /**
     * ID of the element that labels the drawer
     */
    "aria-labelledby"?: string;
    /**
     * ID of the element that describes the drawer
     */
    "aria-describedby"?: string;
    /**
     * Role for the drawer (for accessibility)
     * @default 'dialog'
     */
    role?: string;
}
interface DrawerComposition {
    Header: React.FC<DrawerHeaderProps>;
    Body: React.FC<DrawerBodyProps>;
    Footer: React.FC<DrawerFooterProps>;
    CloseButton: React.FC<DrawerCloseButtonProps>;
}
interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface DrawerCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClose?: () => void;
}

declare const Drawer: React$1.FC<DrawerProps> & DrawerComposition;

interface DropdownOption {
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
interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
interface DropdownTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * Children of the trigger button
     */
    children: ReactNode;
    /**
     * Whether the trigger is disabled
     */
    disabled?: boolean;
}
interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the dropdown menu
     */
    children: ReactNode;
}
interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
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
interface DropdownComposition {
    Trigger: React.FC<DropdownTriggerProps>;
    Menu: React.FC<DropdownMenuProps>;
    Item: React.FC<DropdownItemProps>;
}

declare const Dropdown: React$1.FC<DropdownProps> & DropdownComposition;

type MarqueeDirection = "left" | "right" | "up" | "down";
type MarqueeSpeed = "slow" | "normal" | "fast";
type MarqueeBehavior = "scroll" | "slide" | "alternate";
interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Content to be displayed inside the marquee
     */
    children: ReactNode;
    /**
     * Direction of the marquee animation
     * @default 'left'
     */
    direction?: MarqueeDirection;
    /**
     * Speed of the marquee animation
     * @default 'normal'
     */
    speed?: MarqueeSpeed;
    /**
     * Behavior of the marquee animation
     * @default 'scroll'
     */
    behavior?: MarqueeBehavior;
    /**
     * Whether to pause the animation on hover
     * @default true
     */
    pauseOnHover?: boolean;
    /**
     * Whether to pause the animation on focus
     * @default true
     */
    pauseOnFocus?: boolean;
    /**
     * Number of times to repeat the content to create a smooth loop
     * @default 2
     */
    repeat?: number;
    /**
     * Space between repeated elements (in px)
     * @default 40
     */
    gap?: number;
    /**
     * Duration of the animation in seconds (overrides speed)
     */
    duration?: number;
    /**
     * Whether to reverse the animation direction
     * @default false
     */
    reverse?: boolean;
    /**
     * Delay before the animation starts (in seconds)
     * @default 0
     */
    delay?: number;
}

declare const Marquee: React$1.FC<MarqueeProps>;

type ModalSize = 'small' | 'medium' | 'large' | 'full';
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The content of the modal
     */
    children: ReactNode;
    /**
     * Whether the modal is open
     */
    isOpen: boolean;
    /**
     * Callback function to close the modal
     */
    onClose: () => void;
    /**
     * Size of the modal
     * @default 'medium'
     */
    size?: ModalSize;
    /**
     * Whether to close the modal when the escape key is pressed
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Whether to close the modal when clicking on the overlay
     * @default true
     */
    closeOnOverlayClick?: boolean;
    /**
     * Custom class name for the overlay
     */
    overlayClassName?: string;
    /**
     * Custom class name for the modal content
     */
    contentClassName?: string;
    /**
     * ID of the element that labels the modal
     */
    ariaLabelledby?: string;
    /**
     * ID of the element that describes the modal
     */
    ariaDescribedby?: string;
    /**
     * Custom z-index for the modal
     * @default 1050
     */
    zIndex?: number;
    /**
     * Whether to center the modal vertically
     * @default true
     */
    isCentered?: boolean;
    /**
     * Whether to block scrolling when the modal is open
     * @default true
     */
    blockScroll?: boolean;
    /**
     * Whether to show a close button
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Initial element to focus when the modal opens
     */
    initialFocusRef?: React.RefObject<HTMLElement>;
    /**
     * Footer content of the modal
     */
    footer?: ReactNode;
}
interface ModalComposition {
    Content: React.FC<ModalContentProps>;
    Header: React.FC<ModalHeaderProps>;
    Body: React.FC<ModalBodyProps>;
    Footer: React.FC<ModalFooterProps>;
    CloseButton: React.FC<ModalCloseButtonProps>;
}
interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ModalCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClose?: () => void;
}

declare const Modal: React$1.FC<ModalProps> & ModalComposition;

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

declare const Radio: React$1.FC<RadioProps>;

type SortDirection = 'asc' | 'desc' | 'none';
interface TableColumn<T = any> {
    /**
     * Unique identifier for the column
     */
    id: string;
    /**
     * Header content for the column
     */
    header: ReactNode;
    /**
     * Function to access the cell data for this column
     */
    accessor?: (row: T, rowIndex: number) => ReactNode;
    /**
     * Cell renderer function
     */
    cell?: (value: any, row: T, rowIndex: number) => ReactNode;
    /**
     * Whether this column is sortable
     * @default false
     */
    sortable?: boolean;
    /**
     * Whether this column should be centered
     * @default false
     */
    center?: boolean;
    /**
     * Column width (e.g., '100px', '10%')
     */
    width?: string;
    /**
     * Additional props to pass to the header cell
     */
    headerProps?: ThHTMLAttributes<HTMLTableHeaderCellElement>;
    /**
     * Additional props to pass to the data cells in this column
     */
    cellProps?: TdHTMLAttributes<HTMLTableDataCellElement>;
}
interface TableProps<T = any> extends TableHTMLAttributes<HTMLTableElement> {
    /**
     * Data array to be displayed in the table
     */
    data?: T[];
    /**
     * Column definitions
     */
    columns?: TableColumn<T>[];
    /**
     * Key for the currently sorted column
     */
    sortColumn?: string;
    /**
     * Current sort direction
     * @default 'none'
     */
    sortDirection?: SortDirection;
    /**
     * Handler for sort changes
     */
    onSort?: (columnId: string, direction: SortDirection) => void;
    /**
     * Whether to automatically generate row keys using the row index
     * @default true
     */
    autoGenerateRowKey?: boolean;
    /**
     * Function to generate a key for each row
     */
    getRowKey?: (row: T, index: number) => string | number;
    /**
     * Function to determine row class name
     */
    getRowClassName?: (row: T, index: number) => string;
    /**
     * Children of the table (when using the compositional API)
     */
    children?: ReactNode;
}
interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    /**
     * Children of the table header
     */
    children?: ReactNode;
}
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    /**
     * Children of the table body
     */
    children?: ReactNode;
}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /**
     * Children of the table row
     */
    children?: ReactNode;
}
interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
    /**
     * Children of the table header cell
     */
    children?: ReactNode;
    /**
     * Column ID for sorting
     */
    columnId?: string;
    /**
     * Whether this column is sortable
     */
    sortable?: boolean;
    /**
     * Whether this column is currently sorted
     */
    sorted?: boolean;
    /**
     * Current sort direction for this column
     */
    sortDirection?: SortDirection;
    /**
     * Handler for sort changes
     */
    onSort?: (columnId: string) => void;
    /**
     * Whether this column should be centered
     */
    center?: boolean;
    /**
     * Column width
     */
    width?: string;
}
interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
    /**
     * Children of the table cell
     */
    children?: ReactNode;
    /**
     * Column ID (for data attributes)
     */
    columnId?: string;
    /**
     * Whether this cell should be centered
     */
    center?: boolean;
}
interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
    /**
     * Children of the table caption
     */
    children?: ReactNode;
}
interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the table container
     */
    children?: ReactNode;
    /**
     * Whether the container should enable horizontal scrolling
     */
    horizontalScroll?: boolean;
}
interface TableEmptyStateProps extends HTMLAttributes<HTMLTableRowElement> {
    /**
     * Content to display when table has no data
     */
    children?: ReactNode;
    /**
     * Number of columns to span
     */
    colSpan?: number;
}
interface TableLoadingStateProps extends HTMLAttributes<HTMLTableRowElement> {
    /**
     * Content to display while table is loading
     */
    children?: ReactNode;
    /**
     * Number of columns to span
     */
    colSpan?: number;
}

declare const Table: {
    <T extends Record<string, any> = any>({ data, columns, sortColumn, sortDirection, onSort, autoGenerateRowKey, getRowKey, getRowClassName, children, className, ...props }: TableProps<T> & {
        children?: React$1.ReactNode;
    }): react_jsx_runtime.JSX.Element;
    Container: React$1.FC<TableContainerProps>;
    Caption: React$1.FC<TableCaptionProps>;
    Header: React$1.FC<TableHeaderProps>;
    Body: React$1.FC<TableBodyProps>;
    Row: React$1.FC<TableRowProps>;
    HeaderCell: React$1.FC<TableHeaderCellProps>;
    Cell: React$1.FC<TableCellProps>;
    Empty: React$1.FC<TableEmptyStateProps>;
    Loading: React$1.FC<TableLoadingStateProps>;
};

type TabOrientation = 'horizontal' | 'vertical';
type TabVariantStyle = 'line' | 'enclosed' | 'rounded' | 'soft-rounded' | 'pill';
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The ID of the active tab (controlled mode)
     */
    activeTab?: string;
    /**
     * Default active tab ID (uncontrolled mode)
     */
    defaultActiveTab?: string;
    /**
     * Callback when tab is changed
     */
    onChange?: (tabId: string) => void;
    /**
     * Orientation of the tabs
     * @default 'horizontal'
     */
    orientation?: TabOrientation;
    /**
     * Whether to animate tab transitions
     * @default true
     */
    animated?: boolean;
    /**
     * Children of the Tabs component
     */
    children: ReactNode;
}
interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the TabList component
     */
    children: ReactNode;
    /**
     * Orientation of the tabs
     */
    orientation?: TabOrientation;
}
interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /**
     * Tab ID (must be unique within a Tabs component)
     */
    id: string;
    /**
     * Children of the Tab component
     */
    children: ReactNode;
    /**
     * Whether the tab is disabled
     * @default false
     */
    disabled?: boolean;
}
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Tab ID this panel is associated with
     */
    tabId: string;
    /**
     * Children of the TabPanel component
     */
    children: ReactNode;
}
interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Children of the TabPanels component
     */
    children: ReactNode;
}
interface TabsComposition {
    List: React.FC<TabListProps>;
    Tab: React.FC<TabProps>;
    Panels: React.FC<TabPanelsProps>;
    Panel: React.FC<TabPanelProps>;
}

declare const Tabs: React$1.FC<TabsProps> & TabsComposition;

type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The content to be shown inside the tooltip
     */
    content: ReactNode;
    /**
     * The element that triggers the tooltip
     */
    children: ReactNode;
    /**
     * The placement of the tooltip relative to the trigger element
     * @default 'bottom'
     */
    placement?: TooltipPlacement;
    /**
     * Minimum width of the tooltip
     */
    minWidth?: number | string;
    /**
     * Maximum width of the tooltip
     */
    maxWidth?: number | string;
    /**
     * The distance between the tooltip and the trigger element (in pixels)
     * @default 8
     */
    offset?: number;
    /**
     * Delay before showing the tooltip (in milliseconds)
     * @default 0
     */
    showDelay?: number;
    /**
     * Delay before hiding the tooltip (in milliseconds)
     * @default 0
     */
    hideDelay?: number;
    /**
     * Whether the tooltip should be shown on hover
     * @default true
     */
    showOnHover?: boolean;
    /**
     * Whether the tooltip should be shown on focus
     * @default true
     */
    showOnFocus?: boolean;
    /**
     * Controlled open state of the tooltip
     */
    isOpen?: boolean;
    /**
     * ID for accessibility
     */
    id?: string;
    /**
     * Whether to close the tooltip when pressing escape
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Whether the tooltip should remain open when hovering over it
     * @default false
     */
    interactive?: boolean;
    /**
     * Z-index for the tooltip
     * @default 1000
     */
    zIndex?: number;
    /**
     * Whether the tooltip is disabled
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Additional className for the tooltip element
     */
    tooltipClassName?: string;
}

declare const Tooltip: React$1.FC<TooltipProps>;

interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
interface SegmentItemProps extends HTMLAttributes<HTMLButtonElement> {
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
interface SegmentedControlComposition {
    Item: React.FC<SegmentItemProps>;
}

declare const SegmentedControl: React$1.FC<SegmentedControlProps> & SegmentedControlComposition;

export { Accordion, AccordionItemProps, AccordionProps, Checkbox, CheckboxProps, Drawer, DrawerPlacement, DrawerProps, Dropdown, DropdownOption, DropdownProps, Marquee, MarqueeBehavior, MarqueeDirection, MarqueeProps, MarqueeSpeed, Modal, ModalProps, ModalSize, Radio, RadioGroupProps, RadioProps, SegmentedControl, SegmentedControlProps, SortDirection, TabOrientation, TabVariantStyle, Table, TableColumn, TableProps, Tabs, TabsProps, Tooltip, TooltipPlacement, TooltipProps };
