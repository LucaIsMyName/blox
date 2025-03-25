import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// DrawerExample.tsx
import { useState } from "react";
import { Drawer } from "../components/Drawer";
export const DrawerExample = () => {
    const [isRightOpen, setIsRightOpen] = useState(false);
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isTopOpen, setIsTopOpen] = useState(false);
    const [isBottomOpen, setIsBottomOpen] = useState(false);
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    return (_jsxs("div", { className: "drawer-examples", children: [_jsx("h2", { children: "Drawer Examples" }), _jsxs("div", { className: "examples-container", children: [_jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsRightOpen(true), children: "Open Right Drawer" }), _jsxs(Drawer, { isOpen: isRightOpen, onClose: () => setIsRightOpen(false), placement: "right", children: [_jsx(Drawer.Header, { children: _jsx("h3", { children: "Right Drawer" }) }), _jsxs(Drawer.Body, { children: [_jsx("p", { children: "This is a drawer that slides in from the right side." }), _jsx("p", { children: "Drawers are great for navigation menus, filters, or settings panels." })] }), _jsx(Drawer.Footer, { children: _jsx("button", { onClick: () => setIsRightOpen(false), children: "Close" }) })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsLeftOpen(true), children: "Open Left Drawer" }), _jsxs(Drawer, { isOpen: isLeftOpen, onClose: () => setIsLeftOpen(false), placement: "left", children: [_jsx(Drawer.Header, { children: _jsx("h3", { children: "Left Drawer" }) }), _jsxs(Drawer.Body, { children: [_jsx("p", { children: "This drawer slides in from the left side." }), _jsx("p", { children: "Left drawers are commonly used for navigation menus in applications." }), _jsx("nav", { children: _jsxs("ul", { style: { listStyle: "none", padding: 0 }, children: [_jsx("li", { children: _jsx("a", { href: "#", onClick: (e) => {
                                                                    e.preventDefault();
                                                                    setIsLeftOpen(false);
                                                                }, children: "Home" }) }), _jsx("li", { children: _jsx("a", { href: "#", onClick: (e) => {
                                                                    e.preventDefault();
                                                                    setIsLeftOpen(false);
                                                                }, children: "Dashboard" }) }), _jsx("li", { children: _jsx("a", { href: "#", onClick: (e) => {
                                                                    e.preventDefault();
                                                                    setIsLeftOpen(false);
                                                                }, children: "Settings" }) }), _jsx("li", { children: _jsx("a", { href: "#", onClick: (e) => {
                                                                    e.preventDefault();
                                                                    setIsLeftOpen(false);
                                                                }, children: "Profile" }) })] }) })] })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsTopOpen(true), children: "Open Top Drawer" }), _jsxs(Drawer, { isOpen: isTopOpen, onClose: () => setIsTopOpen(false), placement: "top", minHeight: "200px", children: [_jsx(Drawer.Header, { children: _jsx("h3", { children: "Top Drawer" }) }), _jsxs(Drawer.Body, { children: [_jsx("p", { children: "This drawer slides in from the top of the screen." }), _jsx("p", { children: "Top drawers can be used for notifications, alerts, or search interfaces." })] }), _jsx(Drawer.Footer, { children: _jsx("button", { onClick: () => setIsTopOpen(false), children: "Close" }) })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsBottomOpen(true), children: "Open Bottom Drawer" }), _jsxs(Drawer, { isOpen: isBottomOpen, onClose: () => setIsBottomOpen(false), placement: "bottom", minHeight: "200px", children: [_jsx(Drawer.Header, { children: _jsx("h3", { children: "Bottom Drawer" }) }), _jsxs(Drawer.Body, { children: [_jsx("p", { children: "This drawer slides in from the bottom of the screen." }), _jsx("p", { children: "Bottom drawers are often used for mobile interfaces, action sheets, or additional controls." })] }), _jsx(Drawer.Footer, { children: _jsx("button", { onClick: () => setIsBottomOpen(false), children: "Close" }) })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsCustomOpen(true), children: "Open Custom Styled Drawer" }), _jsx(Drawer, { isOpen: isCustomOpen, onClose: () => setIsCustomOpen(false), placement: "right", contentClassName: "custom-drawer", closeButton: _jsx("span", { children: "\u2715" }), children: _jsxs("div", { style: { padding: "20px" }, children: [_jsx("h3", { children: "Custom Drawer" }), _jsx("p", { children: "This drawer uses custom styling with CSS variables." }), _jsx("p", { children: "You can customize the appearance of the drawer using CSS variables or by adding your own class names." }), _jsx("div", { children: _jsx("button", { onClick: () => setIsCustomOpen(false), style: {
                                                    marginTop: "20px",
                                                    backgroundColor: "#6200ee",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "8px 16px",
                                                    borderRadius: "4px",
                                                }, children: "Close Drawer" }) })] }) })] })] }), _jsx("style", { children: `
        .drawer-examples {
          margin: 20px 0;
        }
        
        .examples-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .example-item {
          margin-bottom: 16px;
        }
        
        button {
          padding: 8px 16px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #e0e0e0;
        }
        
        /* Custom drawer styling */
        .custom-drawer {
          --blox-drawer-content-bg-color: #f9f6fd;
          --blox-drawer-backdrop-color: rgba(98, 0, 238, 0.2);
          --blox-drawer-backdrop-blur: 2px;
          width: 350px;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          border-left: 1px solid #e0e0e0;
        }
        
        /* Example of global drawer styling */
        :root {
          --blox-drawer-content-bg-color: white;
          --blox-drawer-backdrop-color: rgba(0, 0, 0, 0.5);
          --blox-drawer-backdrop-blur: 0px;
        }
        
        [data-blox-drawer-header] {
          padding: 16px;
          border-bottom: 1px solid #eee;
        }
        
        [data-blox-drawer-body] {
          padding: 16px;
        }
        
        [data-blox-drawer-footer] {
          padding: 16px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
        }
        
        [data-blox-drawer-close] {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #666;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        [data-blox-drawer-close]:hover {
          background-color: #f0f0f0;
        }
      ` })] }));
};
export default DrawerExample;
//# sourceMappingURL=DrawerExample.js.map