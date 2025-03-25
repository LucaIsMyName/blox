import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// RadioExample.tsx
import { useState } from "react";
import { Radio } from "../components/Radio";
export const RadioExample = () => {
    // For controlled radio button example
    const [selectedFruit, setSelectedFruit] = useState("apple");
    const [selectedColor, setSelectedColor] = useState("");
    return (_jsxs("div", { className: "radio-examples", children: [_jsx("h2", { children: "Radio Button Examples" }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Basic Radio Buttons" }), _jsxs("div", { children: [_jsx(Radio, { name: "basic-example", value: "option1", label: "Option 1" }), _jsx(Radio, { name: "basic-example", value: "option2", label: "Option 2", defaultChecked: true }), _jsx(Radio, { name: "basic-example", value: "option3", label: "Option 3" })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Controlled Radio Buttons" }), _jsxs("div", { children: [_jsxs("div", { className: "current-selection", children: ["Selected fruit: ", _jsx("strong", { children: selectedFruit })] }), _jsx(Radio, { name: "fruit", value: "apple", label: "Apple", checked: selectedFruit === "apple", onChange: (value) => setSelectedFruit(value) }), _jsx(Radio, { name: "fruit", value: "banana", label: "Banana", checked: selectedFruit === "banana", onChange: (value) => setSelectedFruit(value) }), _jsx(Radio, { name: "fruit", value: "orange", label: "Orange", checked: selectedFruit === "orange", onChange: (value) => setSelectedFruit(value) }), _jsxs("div", { className: "control-buttons", children: [_jsx("button", { onClick: () => setSelectedFruit("apple"), children: "Select Apple" }), _jsx("button", { onClick: () => setSelectedFruit("banana"), children: "Select Banana" }), _jsx("button", { onClick: () => setSelectedFruit("orange"), children: "Select Orange" })] })] })] }), _jsxs("div", { className: "example-section", children: [_jsx("h3", { children: "Disabled Radio Buttons" }), _jsxs("div", { children: [_jsx(Radio, { name: "disabled-example", value: "option1", label: "Enabled option" }), _jsx(Radio, { name: "disabled-example", value: "option2", label: "Disabled option", disabled: true }), _jsx(Radio, { name: "disabled-example", value: "option3", label: "Disabled checked option", disabled: true, defaultChecked: true })] })] })] }));
};
//# sourceMappingURL=RadioExample.js.map