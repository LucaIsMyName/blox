// ToggleExample.tsx
import React, { useState } from "react";
import { Toggle } from "../components/Toggle";

export const ToggleExample: React.FC = () => {
  // State for standalone toggle
  const [standalone, setStandalone] = useState(false);

  // State for single selection toggle group
  const [singleValue, setSingleValue] = useState("option-1");

  // State for multiple selection toggle group
  const [multiValue, setMultiValue] = useState<string[]>(["option-1"]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Toggle & ToggleGroup Example</h2>

      <div className="space-y-6">
        {/* Standalone Toggle */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Standalone Toggle</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current state: {standalone ? "ON" : "OFF"}</p>

            <Toggle
              pressed={standalone}
              onChange={(pressed) => setStandalone(pressed)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Toggle Me
            </Toggle>
          </div>
        </div>

        {/* Single Selection Toggle Group */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Single Selection Toggle Group</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Selected: {singleValue}</p>

            <Toggle.Group
              type="single"
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              allowDeselect={true}
              className="inline-flex">
              <Toggle
                value="option-1"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-500 data-[pressed=true]:text-white rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Option 1
              </Toggle>
              <Toggle
                value="option-2"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-500 data-[pressed=true]:text-white border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Option 2
              </Toggle>
              <Toggle
                value="option-3"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-500 data-[pressed=true]:text-white rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Option 3
              </Toggle>
            </Toggle.Group>
          </div>
        </div>

        {/* Multiple Selection Toggle Group */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Multiple Selection Toggle Group</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Selected: {multiValue.join(", ") || "none"}</p>

            <Toggle.Group
              type="multiple"
              value={multiValue}
              onChange={(value) => setMultiValue(value as string[])}
              orientation="vertical"
              spacing="compact"
              className="inline-flex flex-col">
              <Toggle
                value="option-1"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-green-500 data-[pressed=true]:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                Option 1
              </Toggle>
              <Toggle
                value="option-2"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-green-500 data-[pressed=true]:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                Option 2
              </Toggle>
              <Toggle
                value="option-3"
                className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-green-500 data-[pressed=true]:text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                Option 3
              </Toggle>
            </Toggle.Group>
          </div>
        </div>

        {/* Disabled Toggle Group */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Disabled Toggle Group</h3>
          <Toggle.Group
            type="single"
            defaultValue="option-1"
            disabled={true}
            className="inline-flex">
            <Toggle
              value="option-1"
              className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-300 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 1
            </Toggle>
            <Toggle
              value="option-2"
              className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-300 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 2
            </Toggle>
            <Toggle
              value="option-3"
              className="px-4 py-2 bg-gray-100 data-[pressed=true]:bg-blue-300 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Option 3
            </Toggle>
          </Toggle.Group>
        </div>
      </div>
    </div>
  );
};

export default ToggleExample;
