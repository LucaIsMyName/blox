import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Tooltip } from "../components/Tooltip";
export const TooltipExample = () => {
    const [controlledOpen, setControlledOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Tooltip Examples" }), _jsxs("div", { className: "examples", children: [_jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "This is a simple tooltip", children: _jsx("button", { children: "Hover me" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Top placement", placement: "top", children: _jsx("button", { children: "Top" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Right placement", placement: "right", children: _jsx("button", { children: "Right" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Bottom placement", placement: "bottom", children: _jsx("button", { children: "Bottom" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Left placement", placement: "left", children: _jsx("button", { children: "Left" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Top-start placement", placement: "top-start", children: _jsx("button", { children: "Top-start" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Top-end placement", placement: "top-end", children: _jsx("button", { children: "Top-end" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Shows after 500ms delay", showDelay: 500, children: _jsx("button", { children: "Delayed show" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Stays visible for 1000ms after moving mouse away", hideDelay: 1000, children: _jsx("button", { children: "Delayed hide" }) }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: _jsxs("div", { children: [_jsx("p", { children: "Interactive tooltip with clickable content" }), _jsx("button", { onClick: () => alert("Clicked inside tooltip!"), children: "Click me" })] }), interactive: true, maxWidth: 250, children: _jsx("button", { children: "Interactive tooltip" }) }) }), _jsx("div", { className: "example-item", children: _jsxs("div", { children: [_jsx(Tooltip, { content: "This tooltip is controlled programmatically", isOpen: controlledOpen, children: _jsx("button", { children: "Controlled tooltip" }) }), _jsx("div", { style: { marginTop: 10 }, children: _jsxs("button", { onClick: () => setControlledOpen(!controlledOpen), children: [controlledOpen ? "Hide" : "Show", " tooltip"] }) })] }) }), _jsx("div", { className: "example-item", children: _jsx(Tooltip, { content: "Custom styled tooltip", tooltipClassName: "custom-tooltip", maxWidth: 200, children: _jsx("button", { children: "Custom styled" }) }) })] }), _jsx("style", { children: `
        .examples {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }
        
        .example-item {
          margin-bottom: 16px;
          min-width: 150px;
        }
        
        button {
          padding: 8px 12px;
          border: 1px solid #ccc;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
        }
        
        /* Custom tooltip styling example */
        .custom-tooltip {
          background-color: #4a4a4a;
          color: green;
          padding: 8px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        /* You can also use CSS custom properties defined by the component */
        .blox-tooltip {
          --blox-tooltip-background: white;
          --blox-tooltip-border: 1px solid #ddd;
          --blox-tooltip-border-radius: 4px;
          --blox-tooltip-padding: 8px;
          --blox-tooltip-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          
          background: var(--blox-tooltip-background);
          border: var(--blox-tooltip-border);
          border-radius: var(--blox-tooltip-border-radius);
          padding: var(--blox-tooltip-padding);
          box-shadow: var(--blox-tooltip-box-shadow);
        }
      ` })] }));
};
export default TooltipExample;
//# sourceMappingURL=TooltipExample.js.map