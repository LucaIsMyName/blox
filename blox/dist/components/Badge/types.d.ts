import { BaseProps, Size } from '../../types';
import React from 'react';
export interface BadgeProps extends BaseProps {
    /**
     * Content to be displayed inside the badge
     */
    children: React.ReactNode;
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
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
}
