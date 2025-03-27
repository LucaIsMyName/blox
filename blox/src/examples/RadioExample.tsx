// RadioExample.tsx
import React, { useState } from "react";
import { Radio, RadioProps } from "../components/Radio";

export const RadioExample: React.FC = () => {
  // For controlled radio button example
  const [selectedFruit, setSelectedFruit] = useState<string>("apple");
  const [selectedColor, setSelectedColor] = useState<string>("");

  return (
    <div className="radio-examples">
      <h2>Radio Button Examples</h2>

      <div className="example-section">
        <h3>Basic Radio Buttons</h3>
        <div className="space-y-4">
          <Radio
            name="basic-example"
            value="option1"
            label="Option 1"
          />
          <Radio
            name="basic-example"
            value="option2"
            label="Option 2"
            defaultChecked
          />
          <Radio
            name="basic-example"
            value="option3"
            label="Option 3"
          />
        </div>
      </div>

      <div className="example-section">
        <h3>Controlled Radio Buttons</h3>
        <div>
          <div className="current-selection">
            Selected fruit: <strong>{selectedFruit}</strong>
          </div>
          <div className="space-y-4">
            <Radio
              name="fruit"
              value="apple"
              label="Apple"
              checked={selectedFruit === "apple"}
              className="flex items-center gap-2"
              inputClassName="size-6 accent-green-100"
              onChange={(value) => setSelectedFruit(value)}
            />
            <Radio
              name="fruit"
              value="banana"
              label="Banana"
              checked={selectedFruit === "banana"}
              className="flex items-center gap-2"
              inputClassName="size-6 accent-green-100"
              onChange={(value) => setSelectedFruit(value)}
            />
            <Radio
              name="fruit"
              value="orange"
              label="Orange"
              checked={selectedFruit === "orange"}
              className="flex items-center gap-2"
              inputClassName="size-6 accent-green-100"
              onChange={(value) => setSelectedFruit(value)}
            />
          </div>
          <div className="control-buttons">
            <button onClick={() => setSelectedFruit("apple")}>Select Apple</button>
            <button onClick={() => setSelectedFruit("banana")}>Select Banana</button>
            <button onClick={() => setSelectedFruit("orange")}>Select Orange</button>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>Disabled Radio Buttons</h3>
        <div>
          <Radio
            name="disabled-example"
            value="option1"
            label="Enabled option"
          />
          <Radio
            name="disabled-example"
            value="option2"
            label="Disabled option"
            disabled
          />
          <Radio
            name="disabled-example"
            value="option3"
            label="Disabled checked option"
            disabled
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
};
