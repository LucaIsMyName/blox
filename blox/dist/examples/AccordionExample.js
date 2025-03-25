import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AccordionExample.tsx
import { useState } from "react";
import { Accordion } from "../components/Accordion";
export const AccordionExample = () => {
    // For controlled accordion example
    const [activeIndices, setActiveIndices] = useState([0]);
    return (_jsxs("div", { className: "accordion-examples", children: [_jsx("h2", { children: "Accordion Examples" }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Basic Accordion (single expand)" }), _jsxs(Accordion, { defaultIndex: 0, children: [_jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "What is Blox UI?" }), _jsx("span", { className: "accordion-icon", children: "+" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "Blox UI is a headless component library for React that provides unstyled, accessible components that can be easily customized with your own styles." }) }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "How do I style components?" }), _jsx("span", { className: "accordion-icon", children: "+" })] }) }), _jsx(Accordion.Panel, { children: _jsxs("div", { className: "accordion-content", children: [_jsx("p", { children: "You can style components using:" }), _jsxs("ul", { children: [_jsx("li", { children: "CSS custom properties (variables)" }), _jsx("li", { children: "CSS classes" }), _jsx("li", { children: "Data attributes for targeted styling" }), _jsx("li", { children: "Direct style props" })] })] }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Is Blox UI accessible?" }), _jsx("span", { className: "accordion-icon", children: "+" })] }) }), _jsx(Accordion.Panel, { children: _jsxs("div", { className: "accordion-content", children: [_jsx("p", { children: "Yes! Blox UI components are built with accessibility in mind, following WAI-ARIA guidelines." }), _jsx("p", { children: "Each component includes appropriate ARIA attributes and keyboard navigation support." })] }) })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Multiple Expand Accordion" }), _jsxs(Accordion, { allowMultiple: true, defaultIndex: [0, 2], children: [_jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "First Item" }), _jsx("span", { className: "accordion-icon", children: "\u2193" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "Content for the first item." }) }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Second Item" }), _jsx("span", { className: "accordion-icon", children: "\u2193" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "Content for the second item." }) }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Third Item" }), _jsx("span", { className: "accordion-icon", children: "\u2193" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "Content for the third item." }) }) })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Controlled Accordion" }), _jsxs("p", { children: ["Active indices: ", JSON.stringify(activeIndices)] }), _jsxs(Accordion, { activeIndices: activeIndices, onChange: setActiveIndices, allowMultiple: true, children: [_jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "First Controlled Item" }), _jsx("span", { className: "accordion-icon", children: "\u21C5" })] }) }), _jsx(Accordion.Panel, { children: _jsxs("div", { className: "accordion-content", children: [_jsx("p", { children: "This is a controlled accordion item." }), _jsx("button", { onClick: () => setActiveIndices([]), className: "control-button", children: "Close All" })] }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Second Controlled Item" }), _jsx("span", { className: "accordion-icon", children: "\u21C5" })] }) }), _jsx(Accordion.Panel, { children: _jsxs("div", { className: "accordion-content", children: [_jsx("p", { children: "This is another controlled accordion item." }), _jsx("button", { onClick: () => setActiveIndices([0, 1, 2]), className: "control-button", children: "Open All" })] }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Third Controlled Item" }), _jsx("span", { className: "accordion-icon", children: "\u21C5" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "This is the third controlled accordion item." }) }) })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Disabled Item" }), _jsxs(Accordion, { children: [_jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Enabled Item" }), _jsx("span", { className: "accordion-icon", children: "+" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "This item can be toggled." }) }) })] }), _jsxs(Accordion.Item, { isDisabled: true, children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "accordion-header", children: [_jsx("span", { children: "Disabled Item" }), _jsx("span", { className: "accordion-icon", children: "+" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "accordion-content", children: _jsx("p", { children: "This content won't be displayed because the item is disabled." }) }) })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Custom Styled Accordion" }), _jsxs(Accordion, { className: "custom-accordion", children: [_jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "custom-header", children: [_jsx("span", { children: "Custom Styling" }), _jsx("span", { className: "custom-icon", children: "\u25BC" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "custom-content", children: _jsx("p", { children: "This accordion uses custom styling using CSS variables and data attributes." }) }) })] }), _jsxs(Accordion.Item, { children: [_jsx(Accordion.Button, { children: _jsxs("div", { className: "custom-header", children: [_jsx("span", { children: "More Options" }), _jsx("span", { className: "custom-icon", children: "\u25BC" })] }) }), _jsx(Accordion.Panel, { children: _jsx("div", { className: "custom-content", children: _jsx("p", { children: "You can completely customize the appearance while maintaining functionality." }) }) })] })] })] }), _jsx("style", { children: `
        .accordion-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 40px;
        }
        
        .example-section h3 {
          margin-bottom: 16px;
        }
        
        /* Basic accordion styling */
        [data-blox-accordion] {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        [data-blox-accordion-item] {
          border-bottom: 1px solid #e0e0e0;
        }
        
        [data-blox-accordion-item]:last-child {
          border-bottom: none;
        }
        
        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 16px;
        }
        
        [data-blox-accordion-button] {
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        
        [data-blox-accordion-button]:hover {
          background-color: #f5f5f5;
        }
        
        [data-blox-accordion-button][data-active="true"] .accordion-icon {
          transform: rotate(45deg);
        }
        
        .accordion-icon {
          transition: transform 0.2s ease;
        }
        
        .accordion-content {
          padding: 16px;
        }
        
        /* Disabled state */
        [data-blox-accordion-button][data-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Control buttons */
        .control-button {
          margin-top: 8px;
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-button:hover {
          background-color: #e0e0e0;
        }
        
        /* Custom styled accordion */
        .custom-accordion {
          --accordion-bg: #f9f6fd;
          --accordion-border: #c5c0db;
          --accordion-active-bg: #e9e4f9;
          --accordion-text: #4a3d81;
          
          background-color: var(--accordion-bg);
          border: 1px solid var(--accordion-border);
          border-radius: 8px;
        }
        
        .custom-accordion [data-blox-accordion-item] {
          border-bottom: 1px solid var(--accordion-border);
        }
        
        .custom-accordion [data-blox-accordion-button] {
          color: var(--accordion-text);
        }
        
        .custom-accordion [data-blox-accordion-button][data-active="true"] {
          background-color: var(--accordion-active-bg);
        }
        
        .custom-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 14px 16px;
          font-weight: 500;
        }
        
        .custom-icon {
          transition: transform 0.3s ease;
        }
        
        .custom-accordion [data-blox-accordion-button][data-active="true"] .custom-icon {
          transform: rotate(180deg);
        }
        
        .custom-content {
          padding: 16px;
          background-color: white;
          border-radius: 0 0 6px 6px;
        }
      ` })] }));
};
export default AccordionExample;
//# sourceMappingURL=AccordionExample.js.map