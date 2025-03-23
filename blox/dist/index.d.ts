import * as React$1 from 'react';
import React__default from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface BaseProps {
    variant?: Variant;
    className?: string;
}

interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: Size;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    asChild?: boolean;
}

declare const Button: React__default.FC<ButtonProps>;

interface AccordionProps extends BaseProps {
    items: AccordionItemProps[];
    allowMultiple?: boolean;
    defaultIndex?: number | number[];
}
interface AccordionItemProps {
    title: React__default.ReactNode;
    content: React__default.ReactNode;
    isDisabled?: boolean;
}

declare const Accordion: React__default.FC<AccordionProps>;

type MarqueeDirection = 'left' | 'right' | 'up' | 'down';
type MarqueeSpeed = 'slow' | 'normal' | 'fast';
type MarqueeBehavior = 'scroll' | 'slide' | 'alternate';
interface MarqueeProps extends BaseProps {
    /**
     * Content to be displayed inside the marquee
     */
    children: React__default.ReactNode;
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

declare const Marquee: React__default.FC<MarqueeProps>;

interface BadgeProps extends BaseProps {
    /**
     * Content to be displayed inside the badge
     */
    children: React__default.ReactNode;
    /**
     * Size of the badge
     * @default 'md'
     */
    size?: Size;
    /**
     * Whether the badge is pill-shaped (fully rounded)
     * @default false
     */
    pill?: boolean;
    /**
     * Whether the badge has a dot indicator
     * @default false
     */
    dot?: boolean;
    /**
     * Whether the badge is outlined instead of filled
     * @default false
     */
    outlined?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Optional click handler
     */
    onClick?: React__default.MouseEventHandler<HTMLSpanElement>;
}

declare const Badge: React__default.FC<BadgeProps>;

interface BreadcrumbItem {
    /**
     * Label for the breadcrumb item
     */
    label: React__default.ReactNode;
    /**
     * URL for the breadcrumb item
     */
    href?: string;
    /**
     * Whether this item is the active/current page
     */
    isActive?: boolean;
    /**
     * Optional icon to display before the label
     */
    icon?: React__default.ReactNode;
    /**
     * Optional click handler
     */
    onClick?: React__default.MouseEventHandler;
}
interface BreadcrumbProps extends BaseProps {
    /**
     * Array of breadcrumb items
     */
    items: BreadcrumbItem[];
    /**
     * Custom separator between items
     * @default '/' (forward slash)
     */
    separator?: React__default.ReactNode;
    /**
     * Whether to show a home icon for the first item
     * @default false
     */
    showHomeIcon?: boolean;
    /**
     * Maximum number of visible items before collapsing
     * Set to 0 to show all items
     * @default 0
     */
    maxItems?: number;
    /**
     * Additional CSS class name
     */
    className?: string;
}

declare const Breadcrumb: React__default.FC<BreadcrumbProps>;

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
interface ModalProps extends BaseProps {
    /**
     * Whether the modal is open/visible
     */
    isOpen: boolean;
    /**
     * Callback when the modal should close
     */
    onClose: () => void;
    /**
     * Modal title
     */
    title?: React__default.ReactNode;
    /**
     * Modal content
     */
    children: React__default.ReactNode;
    /**
     * Modal footer content
     */
    footer?: React__default.ReactNode;
    /**
     * Size of the modal
     * @default 'md'
     */
    size?: ModalSize;
    /**
     * Whether to close the modal when clicking the overlay
     * @default true
     */
    closeOnOverlayClick?: boolean;
    /**
     * Whether to close the modal when pressing the Escape key
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Whether to show a close button in the header
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Whether to center the modal vertically
     * @default true
     */
    centered?: boolean;
    /**
     * Custom z-index for the modal
     */
    zIndex?: number;
    /**
     * Additional class name for the overlay
     */
    overlayClassName?: string;
    /**
     * Additional class name for the modal content
     */
    contentClassName?: string;
    /**
     * Whether the modal should be rendered with a slide-in animation
     * @default true
     */
    animated?: boolean;
    /**
     * Whether to lock body scroll when modal is open
     * @default true
     */
    lockScroll?: boolean;
    /**
     * ID for the modal for accessibility purposes
     */
    id?: string;
}

declare const Modal: React__default.FC<ModalProps>;

type TabOrientation = "horizontal" | "vertical";
type TabVariantStyle = "line" | "enclosed" | "rounded" | "soft-rounded" | "pill";
interface TabItem {
    /**
     * Unique identifier for the tab
     */
    id: string;
    /**
     * Tab label/title
     */
    label: React__default.ReactNode;
    /**
     * Tab content
     */
    content: React__default.ReactNode;
    /**
     * Whether the tab is disabled
     */
    disabled?: boolean;
    /**
     * Optional icon to display before the label
     */
    icon?: React__default.ReactNode;
}
interface TabsProps extends BaseProps {
    /**
     * Array of tab items
     */
    items: TabItem[];
    /**
     * ID of the active tab
     */
    activeTab?: string;
    /**
     * Callback when tab is changed
     */
    onChange?: (tabId: string) => void;
    /**
     * Default active tab ID (uncontrolled mode)
     */
    defaultActiveTab?: string;
    /**
     * Orientation of the tabs
     * @default 'horizontal'
     */
    orientation?: TabOrientation;
    /**
     * Style variant for the tabs
     * @default 'line'
     */
    variantStyle?: TabVariantStyle;
    /**
     * Whether tabs should take full width
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Whether to animate the tab indicator
     * @default true
     */
    animated?: boolean;
    /**
     * Additional CSS class for the tab list
     */
    tabListClassName?: string;
    /**
     * Additional CSS class for the tab panels
     */
    tabPanelClassName?: string;
    /**
     * Whether to render the content of all tabs always
     * When false, only the active tab content is rendered
     * @default false
     */
    alwaysRenderContent?: boolean;
    /**
     * Optional content to display before tab list
     */
    leftContent?: React__default.ReactNode;
    /**
     * Optional content to display after tab list
     */
    rightContent?: React__default.ReactNode;
}

declare const Tabs: React__default.FC<TabsProps>;

type DrawerPlacement = "left" | "right" | "top" | "bottom";
interface DrawerProps extends BaseProps {
    /**
     * Whether the drawer is open
     */
    isOpen: boolean;
    /**
     *
     *
     */
    closeButton?: string;
    /**
     * Callback when the drawer should close
     */
    onClose: () => void;
    /**
     * Placement of the drawer
     * @default 'right'
     */
    placement?: DrawerPlacement;
    /**
     * Drawer content
     */
    children: React__default.ReactNode;
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
     * Whether to show a close button
     * @default true
     */
    showCloseButton?: boolean;
    /**
     * Whether to close the drawer when pressing the Escape key
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Whether to close the drawer when clicking outside of it
     * @default true
     */
    closeOnOutsideClick?: boolean;
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
     * Z-index for the drawer
     * @default 1000
     */
    zIndex?: number;
    /**
     * Additional class name for the drawer content
     */
    contentClassName?: string;
    /**
     * Additional class name for the drawer backdrop
     */
    backdropClassName?: string;
    /**
     * Whether to animate the drawer
     * @default true
     */
    animated?: boolean;
    /**
     * Whether to lock body scroll when drawer is open
     * @default true
     */
    lockScroll?: boolean;
    /**
     * Custom render function for the close button
     */
    renderCloseButton?: (props: {
        onClick: () => void;
    }) => React__default.ReactNode;
    /**
     * Role for the drawer (for accessibility)
     * @default 'dialog'
     */
    role?: string;
    /**
     * Aria label for the drawer
     */
    "aria-label"?: string;
    /**
     * Aria labelledby for the drawer
     */
    "aria-labelledby"?: string;
    /**
     * Aria describedby for the drawer
     */
    "aria-describedby"?: string;
    /**
     * ID for the drawer
     */
    id?: string;
    /**
     * style object for the drawer
     * */
    style?: React__default.CSSProperties;
}

declare const Drawer: React__default.FC<DrawerProps>;

type SortDirection = "asc" | "desc" | "none";
interface TableColumn<T = any> {
    /**
     * Unique identifier for the column
     */
    id: string;
    /**
     * Header content for the column
     */
    header: React__default.ReactNode;
    /**
     * Function to access the cell data for this column
     */
    accessor?: (row: T, rowIndex: number) => React__default.ReactNode;
    /**
     * Cell renderer function
     */
    cell?: (value: any, row: T, rowIndex: number) => React__default.ReactNode;
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
    headerProps?: React__default.ThHTMLAttributes<HTMLTableHeaderCellElement>;
    /**
     * Additional props to pass to the data cells in this column
     */
    cellProps?: React__default.TdHTMLAttributes<HTMLTableDataCellElement>;
}
interface TableProps<T = any> extends BaseProps {
    /**
     * Data array to be displayed in the table
     */
    data: T[];
    /**
     * Column definitions
     */
    columns: TableColumn<T>[];
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
     * Whether the table has striped rows
     * @default false
     */
    striped?: boolean;
    /**
     * Whether the table has borders
     * @default false
     */
    bordered?: boolean;
    /**
     * Whether the table has hover effects
     * @default false
     */
    hover?: boolean;
    /**
     * Whether the table is compact
     * @default false
     */
    compact?: boolean;
    /**
     * Whether the table header should stick to the top when scrolling
     * @default false
     */
    stickyHeader?: boolean;
    /**
     * Whether the table has horizontal scrolling
     * @default false
     */
    horizontalScroll?: boolean;
    /**
     * Function to determine row class name
     */
    getRowClassName?: (row: T, index: number) => string;
    /**
     * Additional props for the table element
     */
    tableProps?: React__default.TableHTMLAttributes<HTMLTableElement>;
    /**
     * Additional props for the thead element
     */
    theadProps?: React__default.HTMLAttributes<HTMLTableSectionElement>;
    /**
     * Additional props for the tbody element
     */
    tbodyProps?: React__default.HTMLAttributes<HTMLTableSectionElement>;
    /**
     * Whether to show a loading state
     * @default false
     */
    loading?: boolean;
    /**
     * Content to display when there is no data
     */
    emptyContent?: React__default.ReactNode;
    /**
     * Content to display while loading
     */
    loadingContent?: React__default.ReactNode;
    /**
     * Component for rendering the table container
     */
    containerComponent?: React__default.ComponentType<React__default.HTMLAttributes<HTMLDivElement>>;
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
     * Custom table caption (for accessibility)
     */
    caption?: React__default.ReactNode;
    /**
     * Whether to show the table caption
     * @default true
     */
    showCaption?: boolean;
}

declare const Table: <T extends Record<string, any>>(props: TableProps<T>) => react_jsx_runtime.JSX.Element;

interface DropdownOption {
    label: string;
    value: string | number;
}
interface DropdownProps extends BaseProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

declare const Dropdown: React__default.FC<DropdownProps>;

type FormControlSize = 'sm' | 'md' | 'lg';
interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
    /**
     * Label for the checkbox
     */
    label?: React__default.ReactNode;
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
interface RadioProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
    /**
     * Label for the radio
     */
    label?: React__default.ReactNode;
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
interface ToggleProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, BaseProps {
    /**
     * Label for the toggle
     */
    label?: React__default.ReactNode;
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

declare const Checkbox: React__default.FC<CheckboxProps>;

declare const Radio: React__default.FC<RadioProps>;

declare const Toggle: React__default.FC<ToggleProps>;

type ThemeColorScale = {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
};
type ThemeColors = {
    primary: ThemeColorScale;
    secondary: ThemeColorScale;
    success: ThemeColorScale;
    danger: ThemeColorScale;
    warning: ThemeColorScale;
    info: ThemeColorScale;
    gray: ThemeColorScale;
};
type ThemeSpacing = {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
};
type ThemeFontSizes = {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
};
type ThemeBorderRadius = {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
};
type ThemeConfig = {
    colors: ThemeColors;
    spacing: ThemeSpacing;
    fontSizes: ThemeFontSizes;
    borderRadius: ThemeBorderRadius;
};
declare const defaultTheme: ThemeConfig;
declare const ThemeContext: React$1.Context<ThemeConfig>;
declare const useTheme: () => ThemeConfig;
declare const generateCssVariables: (theme?: ThemeConfig) => string;
declare const generateThemeInjectionScript: (theme?: ThemeConfig) => string;

interface ThemeProviderProps {
    theme?: Partial<ThemeConfig>;
    children: React__default.ReactNode;
}
declare const ThemeProvider: React__default.FC<ThemeProviderProps>;

interface BloxProviderProps {
    theme?: Partial<ThemeConfig>;
    children: React__default.ReactNode;
}
declare const BloxProvider: React__default.FC<BloxProviderProps>;

interface ComponentConfig {
    defaultProps?: Record<string, any>;
    styles?: Record<string, string>;
}
interface BloxConfig {
    theme?: Partial<ThemeConfig>;
    components?: Record<string, ComponentConfig>;
}
/**
 * This function would typically load configuration from a file
 * In a browser context, it would be pre-processed during build
 */
declare const loadConfig: () => BloxConfig;
declare const getComponentConfig: <T>(componentName: string) => ComponentConfig & {
    props: T;
};

export { Accordion, AccordionItemProps, AccordionProps, Badge, BadgeProps, BaseProps, BloxProvider, Breadcrumb, BreadcrumbItem, BreadcrumbProps, Button, ButtonProps, Checkbox, CheckboxProps, Drawer, DrawerPlacement, DrawerProps, Dropdown, DropdownOption, DropdownProps, Marquee, MarqueeBehavior, MarqueeDirection, MarqueeProps, MarqueeSpeed, Modal, ModalProps, ModalSize, Radio, RadioProps, Size, SortDirection, TabItem, TabOrientation, TabVariantStyle, Table, TableColumn, TableProps, Tabs, TabsProps, ThemeBorderRadius, ThemeColorScale, ThemeColors, ThemeConfig, ThemeContext, ThemeFontSizes, ThemeProvider, ThemeSpacing, Toggle, ToggleProps, Variant, defaultTheme, generateCssVariables, generateThemeInjectionScript, getComponentConfig, loadConfig, useTheme };
