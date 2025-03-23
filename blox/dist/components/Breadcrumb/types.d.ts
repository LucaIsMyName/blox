import { BaseProps } from "../../types";
import React from "react";
export interface BreadcrumbItem {
    /**
     * Label for the breadcrumb item
     */
    label: React.ReactNode;
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
    icon?: React.ReactNode;
    /**
     * Optional click handler
     */
    onClick?: React.MouseEventHandler;
}
export interface BreadcrumbProps extends BaseProps {
    /**
     * Array of breadcrumb items
     */
    items: BreadcrumbItem[];
    /**
     * Custom separator between items
     * @default '/' (forward slash)
     */
    separator?: React.ReactNode;
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
