import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// DropdownExample.tsx
import { useState } from 'react';
import { Dropdown } from '../components/Dropdown';
export const DropdownExample = () => {
    var _a, _b;
    // For basic dropdown example
    const [selectedValue, setSelectedValue] = useState('');
    // For controlled dropdown example
    const [controlledIsOpen, setControlledIsOpen] = useState(false);
    const [controlledValue, setControlledValue] = useState('option2');
    // Options for different examples
    const fruits = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Grapes', value: 'grapes' },
        { label: 'Mango', value: 'mango' },
    ];
    const sizes = [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl', disabled: true },
    ];
    return (_jsxs("div", { className: "dropdown-examples", children: [_jsx("h2", { children: "Dropdown Examples" }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Basic Dropdown" }), _jsxs("div", { className: "current-selection", children: ["Selected value: ", _jsx("strong", { children: selectedValue || 'None' })] }), _jsxs(Dropdown, { onChange: setSelectedValue, value: selectedValue, width: "240px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: [selectedValue ?
                                        (_a = fruits.find(item => item.value === selectedValue)) === null || _a === void 0 ? void 0 : _a.label :
                                        'Select a fruit', _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsx(Dropdown.Menu, { className: "dropdown-menu", children: fruits.map((fruit) => (_jsx(Dropdown.Item, { value: fruit.value, className: "dropdown-item", children: fruit.label }, fruit.value))) })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Controlled Dropdown" }), _jsxs("div", { className: "current-selection", children: ["Selected value: ", _jsx("strong", { children: controlledValue || 'None' }), _jsx("br", {}), "Is open: ", _jsx("strong", { children: controlledIsOpen ? 'Yes' : 'No' })] }), _jsxs(Dropdown, { isOpen: controlledIsOpen, onOpenChange: setControlledIsOpen, value: controlledValue, onChange: setControlledValue, width: "240px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: [controlledValue ?
                                        (_b = sizes.find(item => item.value === controlledValue)) === null || _b === void 0 ? void 0 : _b.label :
                                        'Select a size', _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsx(Dropdown.Menu, { className: "dropdown-menu", children: sizes.map((size) => (_jsx(Dropdown.Item, { value: size.value, disabled: size.disabled, className: "dropdown-item", children: size.label }, size.value))) })] }), _jsxs("div", { className: "control-buttons", children: [_jsx("button", { onClick: () => setControlledIsOpen(!controlledIsOpen), children: controlledIsOpen ? 'Close Dropdown' : 'Open Dropdown' }), _jsx("button", { onClick: () => setControlledValue('sm'), children: "Set to Small" }), _jsx("button", { onClick: () => setControlledValue('md'), children: "Set to Medium" }), _jsx("button", { onClick: () => setControlledValue('lg'), children: "Set to Large" })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Different Placements" }), _jsxs("div", { className: "placement-examples", children: [_jsxs(Dropdown, { placement: "top", width: "180px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: ["Top Placement ", _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsxs(Dropdown.Menu, { className: "dropdown-menu", children: [_jsx(Dropdown.Item, { value: "item1", className: "dropdown-item", children: "Item 1" }), _jsx(Dropdown.Item, { value: "item2", className: "dropdown-item", children: "Item 2" }), _jsx(Dropdown.Item, { value: "item3", className: "dropdown-item", children: "Item 3" })] })] }), _jsxs(Dropdown, { placement: "bottom", width: "180px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: ["Bottom Placement ", _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsxs(Dropdown.Menu, { className: "dropdown-menu", children: [_jsx(Dropdown.Item, { value: "item1", className: "dropdown-item", children: "Item 1" }), _jsx(Dropdown.Item, { value: "item2", className: "dropdown-item", children: "Item 2" }), _jsx(Dropdown.Item, { value: "item3", className: "dropdown-item", children: "Item 3" })] })] }), _jsxs(Dropdown, { placement: "bottom-end", width: "180px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: ["Bottom-End ", _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsxs(Dropdown.Menu, { className: "dropdown-menu", children: [_jsx(Dropdown.Item, { value: "item1", className: "dropdown-item", children: "Item 1" }), _jsx(Dropdown.Item, { value: "item2", className: "dropdown-item", children: "Item 2" }), _jsx(Dropdown.Item, { value: "item3", className: "dropdown-item", children: "Item 3" })] })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Disabled Dropdown" }), _jsxs(Dropdown, { disabled: true, width: "240px", children: [_jsxs(Dropdown.Trigger, { className: "trigger-button", children: ["Disabled Dropdown ", _jsx("span", { className: "trigger-icon", children: "\u25BC" })] }), _jsxs(Dropdown.Menu, { className: "dropdown-menu", children: [_jsx(Dropdown.Item, { value: "item1", className: "dropdown-item", children: "Item 1" }), _jsx(Dropdown.Item, { value: "item2", className: "dropdown-item", children: "Item 2" }), _jsx(Dropdown.Item, { value: "item3", className: "dropdown-item", children: "Item 3" })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Custom Styled Dropdown" }), _jsxs(Dropdown, { className: "custom-dropdown", width: "240px", children: [_jsxs(Dropdown.Trigger, { className: "custom-trigger", children: ["Custom Styled Dropdown ", _jsx("span", { className: "custom-icon", children: "\u25BC" })] }), _jsxs(Dropdown.Menu, { className: "custom-menu", children: [_jsx(Dropdown.Item, { value: "item1", className: "custom-item", children: "Option One" }), _jsx(Dropdown.Item, { value: "item2", className: "custom-item", children: "Option Two" }), _jsx(Dropdown.Item, { value: "item3", className: "custom-item", children: "Option Three" }), _jsx(Dropdown.Item, { value: "item4", className: "custom-item", disabled: true, children: "Option Four (Disabled)" })] })] })] }), _jsx("style", { children: `
        .dropdown-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 30px;
        }
        
        .example-section h3 {
          margin-bottom: 16px;
        }
        
        .current-selection {
          margin-bottom: 12px;
        }
        
        /* Basic Dropdown Styling */
        [data-blox-dropdown] {
          position: relative;
          display: inline-block;
        }
        
        .trigger-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          min-width: 120px;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .trigger-button:hover {
          background-color: #e9ecef;
        }
        
        .trigger-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
        }
        
        .trigger-button[data-disabled='true'] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .trigger-icon {
          font-size: 10px;
          margin-left: 8px;
          transition: transform 0.2s;
        }
        
        [data-state='open'] .trigger-icon {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          z-index: 1000;
          min-width: 100%;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-top: 4px;
          max-height: 250px;
          overflow-y: auto;
        }
        
        [data-placement='top'] .dropdown-menu {
          bottom: 100%;
          margin-bottom: 4px;
          margin-top: 0;
        }
        
        [data-placement='bottom-end'] .dropdown-menu {
          right: 0;
        }
        
        .dropdown-item {
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-item[data-selected='true'] {
          background-color: #e9ecef;
          font-weight: 500;
        }
        
        .dropdown-item[data-disabled='true'] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Control buttons */
        .control-buttons {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }
        
        .control-buttons button {
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        /* Multiple placement examples */
        .placement-examples {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        /* Custom Styled Dropdown */
        .custom-dropdown {
          --dropdown-bg: #4a1a8a;
          --dropdown-text: white;
          --dropdown-border: none;
          --dropdown-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --dropdown-item-hover-bg: #6927b8;
          --dropdown-item-selected-bg: #8347d1;
        }
        
        .custom-trigger {
          background-color: var(--dropdown-bg);
          color: var(--dropdown-text);
          border: var(--dropdown-border);
          padding: 10px 16px;
          border-radius: 6px;
          box-shadow: var(--dropdown-shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .custom-icon {
          font-size: 12px;
          transition: transform 0.2s;
        }
        
        [data-state='open'] .custom-icon {
          transform: rotate(180deg);
        }
        
        .custom-menu {
          background-color: var(--dropdown-bg);
          border: var(--dropdown-border);
          border-radius: 6px;
          box-shadow: var(--dropdown-shadow);
          margin-top: 6px;
          overflow: hidden;
        }
        
        .custom-item {
          color: var(--dropdown-text);
          padding: 10px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .custom-item:hover:not([data-disabled='true']) {
          background-color: var(--dropdown-item-hover-bg);
        }
        
        .custom-item[data-selected='true'] {
          background-color: var(--dropdown-item-selected-bg);
        }
      ` })] }));
};
export default DropdownExample;
//# sourceMappingURL=DropdownExample.js.map