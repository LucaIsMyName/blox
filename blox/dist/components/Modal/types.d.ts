import { BaseProps } from '../../types';
import React from 'react';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export interface ModalProps extends BaseProps {
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
    title?: React.ReactNode;
    /**
     * Modal content
     */
    children: React.ReactNode;
    /**
     * Modal footer content
     */
    footer?: React.ReactNode;
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
