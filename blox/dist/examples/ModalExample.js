import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// ModalExample.tsx
import { useState } from "react";
import { Modal } from "../components/Modal";
export const ModalExample = () => {
    const [isBasicOpen, setIsBasicOpen] = useState(false);
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    const [isFullOpen, setIsFullOpen] = useState(false);
    const [isCompoundOpen, setIsCompoundOpen] = useState(false);
    return (_jsxs("div", { className: "modal-examples", children: [_jsx("h2", { children: "Modal Examples" }), _jsxs("div", { className: "examples-container", children: [_jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsBasicOpen(true), children: "Open Basic Modal" }), _jsxs(Modal, { isOpen: isBasicOpen, onClose: () => setIsBasicOpen(false), title: "Basic Modal", footer: _jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsBasicOpen(false), style: { marginRight: "8px" }, children: "Cancel" }), _jsx("button", { onClick: () => setIsBasicOpen(false), className: "bg-green-500 text-white border-black", children: "Confirm" })] }), children: [_jsx("p", { children: "This is a basic modal with a title and footer buttons." }), _jsx("p", { children: "Modal components can be easily customized using CSS variables." })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsCustomOpen(true), children: "Open Custom Styled Modal" }), _jsxs(Modal, { isOpen: isCustomOpen, onClose: () => setIsCustomOpen(false), title: "Custom Styled Modal", size: "small", contentClassName: "custom-modal", children: [_jsx("p", { children: "This modal has custom styling applied via the contentClassName." }), _jsx("button", { onClick: () => setIsCustomOpen(false), style: {
                                            backgroundColor: "#f56565",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 16px",
                                            borderRadius: "4px",
                                        }, children: "Close" })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsFullOpen(true), children: "Open Full Width Modal" }), _jsxs(Modal, { isOpen: isFullOpen, onClose: () => setIsFullOpen(false), title: "Full Width Modal", size: "full", children: [_jsx("p", { children: "This modal uses the full width of the screen (with margins)." }), _jsx("p", { children: "It's useful for displaying large amounts of content or complex interfaces." }), _jsx("button", { onClick: () => setIsFullOpen(false), style: {
                                            marginTop: "16px",
                                            padding: "8px 16px",
                                        }, children: "Close" })] })] }), _jsxs("div", { className: "example-item", children: [_jsx("button", { onClick: () => setIsCompoundOpen(true), children: "Open Compound Modal" }), _jsxs(Modal, { isOpen: isCompoundOpen, onClose: () => setIsCompoundOpen(false), size: "large", children: [_jsxs(Modal.Header, { children: [_jsx("h3", { style: { margin: 0 }, children: "Compound Modal Example" }), _jsx(Modal.CloseButton, { onClose: () => setIsCompoundOpen(false) })] }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "This modal uses the compound component pattern." }), _jsx("p", { children: "You can construct more complex layouts using Modal.Header, Modal.Body, and Modal.Footer subcomponents." }), _jsxs("div", { style: {
                                                    backgroundColor: "#f3f4f6",
                                                    padding: "16px",
                                                    borderRadius: "4px",
                                                    marginTop: "16px",
                                                }, children: [_jsx("h4", { children: "Custom Section" }), _jsx("p", { children: "You can add any content you want here." })] })] }), _jsxs(Modal.Footer, { children: [_jsx("button", { onClick: () => setIsCompoundOpen(false), style: { marginRight: "8px" }, children: "Cancel" }), _jsx("button", { onClick: () => setIsCompoundOpen(false), style: {
                                                    backgroundColor: "#4f46e5",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "8px 16px",
                                                    borderRadius: "4px",
                                                }, children: "Save Changes" })] })] })] })] }), _jsx("style", { children: `
        .modal-examples {
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
        
        /* Custom modal styling using CSS custom properties */
        .custom-modal {
          --blox-modal-bg: #2d3748;
          --blox-modal-title-color: white;
          --blox-modal-border-radius: 8px;
          --blox-modal-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          color: white;
        }
      ` })] }));
};
export default ModalExample;
//# sourceMappingURL=ModalExample.js.map