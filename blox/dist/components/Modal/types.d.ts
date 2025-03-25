import { HTMLAttributes, ReactNode } from 'react';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
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
export interface ModalComposition {
    Content: React.FC<ModalContentProps>;
    Header: React.FC<ModalHeaderProps>;
    Body: React.FC<ModalBodyProps>;
    Footer: React.FC<ModalFooterProps>;
    CloseButton: React.FC<ModalCloseButtonProps>;
}
export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export interface ModalCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClose?: () => void;
}
