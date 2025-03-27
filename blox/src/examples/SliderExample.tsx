// SliderExample.tsx
import React, { useState } from "react";
import { Slider } from "../components/Slider";

export const SliderExample: React.FC = () => {
  // State for single value slider
  const [singleValue, setSingleValue] = useState(50);

  // State for range slider (two thumbs)
  const [rangeValue, setRangeValue] = useState<number[]>([25, 75]);

  // State for multi-thumb slider
  const [multiValue, setMultiValue] = useState<number[]>([10, 50, 90]);

  // State for vertical slider
  const [verticalValue, setVerticalValue] = useState(30);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Slider Examples</h2>

      <div className="space-y-12">
        {/* Basic Single Slider */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Basic Slider</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Current value: {singleValue}</p>

            <Slider
              value={singleValue}
              onChange={(value) => setSingleValue(value as number)}
              min={0}
              max={100}
              step={1}
              className="max-w-md"
              style={
                {
                  // Custom style variables
                  "--slider-thickness": "6px",
                  "--slider-thumb-size": "18px",
                  "--slider-range-color": "#3b82f6",
                  "--slider-track-color": "#e5e7eb",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Range Slider (Two Thumbs) */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Range Slider</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Selected range: {rangeValue[0]} - {rangeValue[1]}
            </p>

            <Slider
              value={rangeValue}
              onChange={(value) => setRangeValue(value as number[])}
              min={0}
              max={100}
              step={1}
              className="max-w-md"
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
        </div>

        {/* Multi Thumb Slider */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Multi-Thumb Slider</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Selected points: {multiValue.join(", ")}</p>

            <Slider
              value={multiValue}
              onChange={(value) => setMultiValue(value as number[])}
              min={0}
              max={100}
              step={5}
              className="max-w-md"
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
        </div>

        {/* Slider with Marks */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Slider with Marks</h3>
          <div className="space-y-8">
            <Slider
              defaultValue={60}
              min={0}
              max={100}
              step={10}
              className="max-w-md"
              showMarks={true}
              marks={{
                0: "0%",
                25: "25%",
                50: "50%",
                75: "75%",
                100: "100%",
              }}
              style={
                {
                  "--slider-thickness": "4px",
                  "--slider-thumb-size": "20px",
                  "--slider-range-color": "#f59e0b",
                  "--slider-track-color": "#e5e7eb",
                  "--slider-thumb-color": "#f59e0b",
                  "--slider-mark-spacing": "10px",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Vertical Slider */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Vertical Slider</h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Current value: {verticalValue}</p>

            <div className="h-64">
              <Slider
                value={verticalValue}
                onChange={(value) => setVerticalValue(value as number)}
                min={0}
                max={100}
                step={1}
                orientation="vertical"
                className="h-full"
                style={
                  {
                    "--slider-thickness": "6px",
                    "--slider-thumb-size": "18px",
                    "--slider-range-color": "#ef4444",
                    "--slider-track-color": "#e5e7eb",
                    "--slider-thumb-color": "#ef4444",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>

        {/* Custom Styled Slider */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Custom Styled Slider</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[20, 80]}
              min={0}
              max={100}
              step={1}
              className="max-w-md">
              {(sliderState) => (
                <>
                  <Slider.Track className="bg-gray-200 rounded-full h-3">
                    <Slider.Range
                      index={1}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </Slider.Track>

                  {sliderState.thumbPositions.map((thumb, index) => (
                    <Slider.Thumb
                      key={index}
                      index={index}
                      className="w-6 h-6 bg-white border-2 border-purple-500 shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                      {/* Optional custom thumb content */}
                      <span className="sr-only">Thumb {index + 1}</span>
                    </Slider.Thumb>
                  ))}
                </>
              )}
            </Slider>
          </div>
        </div>

        {/* Disabled Slider */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Disabled Slider</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={35}
              min={0}
              max={100}
              step={1}
              disabled={true}
              className="max-w-md opacity-60 cursor-not-allowed"
              style={
                {
                  "--slider-thickness": "6px",
                  "--slider-thumb-size": "18px",
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderExample;
