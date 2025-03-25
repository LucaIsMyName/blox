import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Drawer.tsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// Sub-components
const DrawerHeader = ({ children, className = "", ...props }) => (_jsx("header", { className: `blox-drawer-header ${className}`, "data-blox-drawer-header": "", ...props, children: children }));
const DrawerBody = ({ children, className = "", ...props }) => (_jsx("div", { className: `blox-drawer-body ${className}`, "data-blox-drawer-body": "", ...props, children: children }));
const DrawerFooter = ({ children, className = "", ...props }) => (_jsx("footer", { className: `blox-drawer-footer ${className}`, "data-blox-drawer-footer": "", ...props, children: children }));
const DrawerCloseButton = ({ onClose, className = "", children, ...props }) => (_jsx("button", { type: "button", className: `blox-drawer-close-button ${className}`, onClick: onClose, "aria-label": "Close drawer", "data-blox-drawer-close": "", ...props, children: children || (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] })) }));
const Drawer = ({ children, isOpen, onClose, placement = "right", minWidth = "250px", maxWidth = "100%", minHeight = "250px", maxHeight = "100%", closeOnEsc = true, closeOnOutsideClick = true, contentClassName = "", backdropClassName = "", zIndex = 1000, trapFocus = true, usePortal = true, showCloseButton = true, animated = true, lockScroll = true, renderCloseButton, closeButton, role = "dialog", "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, id, style, className = "", ...props }) => {
    const drawerRef = useRef(null);
    const firstFocusableRef = useRef(null);
    // Generate a unique ID for the drawer if not provided
    const drawerId = useRef(id || `blox-drawer-${Math.random().toString(36).substr(2, 9)}`).current;
    // Handle body scroll locking
    useEffect(() => {
        if (isOpen && lockScroll) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            if (lockScroll) {
                document.body.style.overflow = "";
            }
        };
    }, [isOpen, lockScroll]);
    // Handle ESC key press
    useEffect(() => {
        if (!isOpen || !closeOnEsc)
            return;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);
    // Focus trap management
    useEffect(() => {
        var _a;
        if (isOpen && trapFocus && drawerRef.current) {
            // Focus the first focusable element
            (_a = firstFocusableRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            const handleTabKey = (event) => {
                if (event.key !== "Tab" || !drawerRef.current)
                    return;
                const focusableElements = drawerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length === 0)
                    return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                // If shift+tab and on first element, move to last
                if (event.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
                // If tab and on last element, move to first
                else if (!event.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            };
            document.addEventListener("keydown", handleTabKey);
            return () => {
                document.removeEventListener("keydown", handleTabKey);
            };
        }
    }, [isOpen, trapFocus]);
    const handleBackdropClick = (e) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
            onClose();
        }
    };
    // Calculate styles based on placement
    const getDrawerStyles = () => {
        const baseStyles = {
            ...style,
            position: "absolute",
            backgroundColor: "var(--blox-drawer-content-bg-color, white)",
        };
        // Add size constraints based on placement
        if (placement === "left" || placement === "right") {
            baseStyles.top = "var(--blox-drawer-top, 0)";
            baseStyles.bottom = "var(--blox-drawer-bottom, 0)";
            baseStyles.minWidth = minWidth;
            baseStyles.maxWidth = maxWidth;
            baseStyles.height = "100%";
            if (placement === "left") {
                baseStyles.left = "var(--blox-drawer-left, 0)";
            }
            else {
                baseStyles.right = "var(--blox-drawer-right, 0)";
            }
        }
        else {
            baseStyles.left = "var(--blox-drawer-left, 0)";
            baseStyles.right = "var(--blox-drawer-right, 0)";
            baseStyles.minHeight = minHeight;
            baseStyles.maxHeight = maxHeight;
            baseStyles.width = "100%";
            if (placement === "top") {
                baseStyles.top = "var(--blox-drawer-top, 0)";
            }
            else {
                baseStyles.bottom = "var(--blox-drawer-bottom, 0)";
            }
        }
        return baseStyles;
    };
    // Don't render anything if drawer is not open
    if (!isOpen)
        return null;
    const drawerContent = (_jsx("div", { className: `blox-drawer-backdrop ${backdropClassName} ${animated ? "blox-drawer-animated" : ""}`, "data-blox-drawer-backdrop": "", onClick: handleBackdropClick, style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            zIndex: zIndex,
            backdropFilter: "var(--blox-drawer-backdrop-blur, 0px)",
            backgroundColor: "var(--blox-drawer-backdrop-color, rgba(0, 0, 0, 0.5))",
        }, children: _jsxs("div", { ref: drawerRef, className: `blox-drawer-content ${contentClassName} ${className}`, "data-blox-drawer-content": "", "data-blox-drawer-placement": placement, style: getDrawerStyles(), role: role, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, id: drawerId, ...props, children: [_jsx("div", { ref: firstFocusableRef, tabIndex: -1, style: { outline: "none" } }), showCloseButton && (renderCloseButton ? renderCloseButton({ onClick: onClose }) : _jsx(DrawerCloseButton, { onClose: onClose, children: closeButton })), children] }) }));
    return usePortal && typeof document !== "undefined" ? createPortal(drawerContent, document.body) : drawerContent;
};
// Attach sub-components
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.CloseButton = DrawerCloseButton;
export default Drawer;
//# sourceMappingURL=Drawer.js.map