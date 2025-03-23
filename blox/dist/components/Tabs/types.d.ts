import { BaseProps } from "../../types";
import React from "react";
export type TabOrientation = "horizontal" | "vertical";
export type TabVariantStyle = "line" | "enclosed" | "rounded" | "soft-rounded" | "pill";
export interface TabItem {
    /**
     * Unique identifier for the tab
     */
    id: string;
    /**
     * Tab label/title
     */
    label: React.ReactNode;
    /**
     * Tab content
     */
    content: React.ReactNode;
    /**
     * Whether the tab is disabled
     */
    disabled?: boolean;
    /**
     * Optional icon to display before the label
     */
    icon?: React.ReactNode;
}
export interface TabsProps extends BaseProps {
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
    leftContent?: React.ReactNode;
    /**
     * Optional content to display after tab list
     */
    rightContent?: React.ReactNode;
}
