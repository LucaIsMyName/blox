import React, { useState } from "react";
import { Tooltip } from "../components/Tooltip";

export const TooltipExample: React.FC = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <>
      <h2>Tooltip Examples</h2>
      <div className="examples">
        {/* Basic usage */}
        <div className="example-item">
          <Tooltip content="This is a simple tooltip">
            <button>Hover me</button>
          </Tooltip>
        </div>

        {/* Different placements */}
        <div className="example-item">
          <Tooltip
            content="Top placement"
            placement="top">
            <button>Top</button>
          </Tooltip>
        </div>

        <div className="example-item">
          <Tooltip
            content="Right placement"
            placement="right">
            <button>Right</button>
          </Tooltip>
        </div>

        <div className="example-item">
          <Tooltip
            content="Bottom placement"
            placement="bottom">
            <button>Bottom</button>
          </Tooltip>
        </div>

        <div className="example-item">
          <Tooltip
            content="Left placement"
            placement="left">
            <button>Left</button>
          </Tooltip>
        </div>

        {/* Corner placements */}
        <div className="example-item">
          <Tooltip
            content="Top-start placement"
            placement="top-start">
            <button>Top-start</button>
          </Tooltip>
        </div>

        <div className="example-item">
          <Tooltip
            content="Top-end placement"
            placement="top-end">
            <button>Top-end</button>
          </Tooltip>
        </div>

        {/* With delay */}
        <div className="example-item">
          <Tooltip
            content="Shows after 500ms delay"
            showDelay={500}>
            <button>Delayed show</button>
          </Tooltip>
        </div>

        <div className="example-item">
          <Tooltip
            content="Stays visible for 1000ms after moving mouse away"
            hideDelay={1000}>
            <button>Delayed hide</button>
          </Tooltip>
        </div>

        {/* Interactive tooltip */}
        <div className="example-item">
          <Tooltip
            content={
              <div>
                <p>Interactive tooltip with clickable content</p>
                <button onClick={() => alert("Clicked inside tooltip!")}>Click me</button>
              </div>
            }
            interactive={true}
            maxWidth={250}>
            <button>Interactive tooltip</button>
          </Tooltip>
        </div>

        {/* Controlled tooltip */}
        <div className="example-item">
          <div>
            <Tooltip
              content="This tooltip is controlled programmatically"
              isOpen={controlledOpen}>
              <button>Controlled tooltip</button>
            </Tooltip>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => setControlledOpen(!controlledOpen)}>{controlledOpen ? "Hide" : "Show"} tooltip</button>
            </div>
          </div>
        </div>

        {/* With custom styling */}
        <div className="example-item">
          <Tooltip
            content="Custom styled tooltip"
            tooltipClassName="custom-tooltip"
            maxWidth={200}>
            <button>Custom styled</button>
          </Tooltip>
        </div>
      </div>
      {/* CSS for the examples */}
      <style>{`
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
      `}</style>
    </>
  );
};

export default TooltipExample;
