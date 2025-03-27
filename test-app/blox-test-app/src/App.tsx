import { useState } from "react";
import "./App.css";

// Import your blox-ui components
// Assuming the components are exported from 'blox-ui-react'
// You'll need to adjust these imports based on your actual package structure
import { Slider, Toggle, Checkbox } from "blox-ui-react";

function App() {
  // State for Slider
  const [singleValue, setSingleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<number[]>([25, 75]);
  const [multiValue, setMultiValue] = useState<number[]>([10, 50, 90]);

  // State for Toggle
  const [toggleState, setToggleState] = useState(false);
  const [singleSelection, setSingleSelection] = useState("option-1");
  const [multiSelection, setMultiSelection] = useState<string[]>(["option-1"]);

  // State for Checkbox
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>Blox UI React Components</h1>
        <p>A test application for headless UI components</p>
      </header>

      <main>
        <section className="section">
          <h2>Slider Examples</h2>

          <div className="example-container">
            <h3>Basic Slider</h3>
            <p>Current value: {singleValue}</p>
            <Slider
              value={singleValue}
              onChange={(value) => setSingleValue(value as number)}
              min={0}
              max={100}
              step={1}
              className="slider-example"
              style={
                {
                  "--slider-thickness": "6px",
                  "--slider-thumb-size": "18px",
                  "--slider-range-color": "#3b82f6",
                  "--slider-track-color": "#e5e7eb",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="example-container">
            <h3>Range Slider</h3>
            <p>
              Selected range: {rangeValue[0]} - {rangeValue[1]}
            </p>
            <Slider
              value={rangeValue}
              onChange={(value) => setRangeValue(value as number[])}
              min={0}
              max={100}
              step={1}
              className="slider-example"
              style={
                {
                  "--slider-thickness": "8px",
                  "--slider-thumb-size": "22px",
                  "--slider-range-color": "#10b981",
                  "--slider-track-color": "#d1d5db",
                  "--slider-thumb-color": "#10b981",
                  "--slider-thumb-shadow": "0 2px 4px rgba(0,0,0,0.2)",
                } as React.CSSProperties
              }
            />
          </div>

          <div className="example-container">
            <h3>Multi-Thumb Slider</h3>
            <p>Selected points: {multiValue.join(", ")}</p>
            <Slider
              value={multiValue}
              onChange={(value) => setMultiValue(value as number[])}
              min={0}
              max={100}
              step={5}
              className="slider-example"
              style={
                {
                  "--slider-thickness": "6px",
                  "--slider-thumb-size": "16px",
                  "--slider-range-color": "#8b5cf6",
                  "--slider-track-color": "#e5e7eb",
                  "--slider-thumb-color": "#8b5cf6",
                } as React.CSSProperties
              }
            />
          </div>
        </section>

        <section className="section">
          <h2>Toggle Examples</h2>

          <div className="example-container">
            <h3>Standalone Toggle</h3>
            <p>Current state: {toggleState ? "ON" : "OFF"}</p>
            <Toggle
              pressed={toggleState}
              onChange={(pressed) => setToggleState(pressed)}
              className="toggle-button">
              Toggle Me
            </Toggle>
          </div>

          <div className="example-container">
            <h3>Single Selection Toggle Group</h3>
            <p>Selected: {singleSelection}</p>
            <Toggle.Group
              type="single"
              value={singleSelection}
              onChange={(value) => setSingleSelection(value as string)}
              allowDeselect={true}
              className="toggle-group">
              <Toggle
                value="option-1"
                className="toggle-item">
                Option 1
              </Toggle>
              <Toggle
                value="option-2"
                className="toggle-item">
                Option 2
              </Toggle>
              <Toggle
                value="option-3"
                className="toggle-item">
                Option 3
              </Toggle>
            </Toggle.Group>
          </div>

          <div className="example-container">
            <h3>Multiple Selection Toggle Group</h3>
            <p>Selected: {multiSelection.join(", ") || "none"}</p>
            <Toggle.Group
              type="multiple"
              value={multiSelection}
              onChange={(value) => setMultiSelection(value as string[])}
              orientation="vertical"
              spacing="compact"
              className="toggle-group vertical">
              <Toggle
                value="option-1"
                className="toggle-item">
                Option 1
              </Toggle>
              <Toggle
                value="option-2"
                className="toggle-item">
                Option 2
              </Toggle>
              <Toggle
                value="option-3"
                className="toggle-item">
                Option 3
              </Toggle>
            </Toggle.Group>
          </div>
        </section>

        <section className="section">
          <h2>Checkbox Example</h2>

          <div className="example-container">
            <Checkbox
              checked={isChecked}
              onChange={(checked) => setIsChecked(checked)}
              label="Check me"
              helperText="This is a simple checkbox example"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
