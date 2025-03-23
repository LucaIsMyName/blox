import { BaseProps } from "../../types";
import React from "react";
export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export interface DrawerProps extends BaseProps {
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
    children: React.ReactNode;
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
    }) => React.ReactNode;
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
    style?: React.CSSProperties;
}
