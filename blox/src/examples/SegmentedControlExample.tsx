import React, { useState } from "react";
import { SegmentedControl } from "../components/SegmentedControl";

export const SegmentedControlExample: React.FC = () => {
  const [selectedView, setSelectedView] = useState("day");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>

      {/* Basic Segmented Control */}
      <SegmentedControl
        value={selectedView}
        onChange={setSelectedView}
        className="flex p-1 bg-gray-100 rounded-lg w-fit">
        <SegmentedControl.Item
          value="day"
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=selected]:bg-white data-[state=selected]:text-black data-[state=unselected]:text-gray-600">
          Day
        </SegmentedControl.Item>
        <SegmentedControl.Item
          value="week"
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=selected]:bg-white data-[state=selected]:text-black data-[state=unselected]:text-gray-600">
          Week
        </SegmentedControl.Item>
        <SegmentedControl.Item
          value="month"
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors data-[state=selected]:bg-white data-[state=selected]:text-black data-[state=unselected]:text-gray-600">
          Month
        </SegmentedControl.Item>
      </SegmentedControl>

      <div className="mt-4">
        Selected view: <strong>{selectedView}</strong>
      </div>
    </div>
  );
};
