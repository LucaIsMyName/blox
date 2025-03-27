// Example usage in App.tsx
import {scan} from "react-scan"
import React, { useState } from "react";
import { BlockLayout } from "./app/BlockLayout";

import { TooltipExample } from "./examples/TooltipExample";
import { ModalExample } from "./examples/ModalExample";
import { DrawerExample } from "./examples/DrawerExample";
import { AccordionExample } from "./examples/AccordionExample";
import { CheckboxExample } from "./examples/CheckboxExample";
import { RadioExample } from "./examples/RadioExample";
import { DropdownExample } from "./examples/DropdownExample";
import { TableExample } from "./examples/TableExample";
import { TabsExample } from "./examples/TabsExample";
import { MarqueeExample } from "./examples/MarqueeExample";
import { SegmentedControlExample } from "./examples/SegmentedControlExample";
import { SwitchExample } from "./examples/SwitchExample";
import { ContextMenuExample } from "./examples/ContextMenuExample";
import { DragDropExample } from "./examples/DragDropExample";
import { ToggleExample } from "./examples/ToggleExample";
import { SliderExample } from "./examples/SliderExample";


// use react scan


scan({
  enabled: true,
});

function App() {
  return (
    <div className="app p-4">
      <h1 className="border-b mb-4 pb-4">Blox UI Components</h1>
      <BlockLayout title="Tooltips">
        <TooltipExample />
      </BlockLayout>
      <BlockLayout title="Modals">
        <ModalExample />
      </BlockLayout>
      <BlockLayout title="Drawers">
        <DrawerExample />
      </BlockLayout>
      <BlockLayout title="Accordions">
        <AccordionExample />
      </BlockLayout>
      <BlockLayout title="Checkboxes">
        <CheckboxExample />
      </BlockLayout>
      <BlockLayout title="Radio Buttons">
        <RadioExample />
      </BlockLayout>
      <BlockLayout title="Dropdowns">
        <DropdownExample />
      </BlockLayout>
      <BlockLayout title="Table">
        <TableExample />
      </BlockLayout>
      <BlockLayout title="Tabs">
        <TabsExample />
      </BlockLayout>
      <BlockLayout title="Marquees">
        <MarqueeExample />
      </BlockLayout>
      <BlockLayout title="Segmented Controls">
        <SegmentedControlExample />
      </BlockLayout>
      <BlockLayout title="Switches">
        <SwitchExample />
      </BlockLayout>
      <BlockLayout title="Context Menus">
        <ContextMenuExample />
      </BlockLayout>
      <BlockLayout
        title="Drag & Drop"
        subtitle="Work in Progress">
        <DragDropExample />
      </BlockLayout>
      <BlockLayout title="Toggles">
        <ToggleExample />
      </BlockLayout>
      <BlockLayout title="Sliders">
        <SliderExample />
      </BlockLayout>
    </div>
  );
}

export default App;
