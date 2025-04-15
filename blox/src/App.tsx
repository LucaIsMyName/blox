/**
 * This the internal Test App
 * we are testing the `./examples/*` folder
 */
import { scan } from "react-scan";
import { BloxLayout } from "./app/BloxLayout";
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
      <BloxLayout title="Tooltips">
        <TooltipExample />
      </BloxLayout>
      <BloxLayout title="Modals">
        <ModalExample />
      </BloxLayout>
      <BloxLayout title="Drawers">
        <DrawerExample />
      </BloxLayout>
      <BloxLayout title="Accordions">
        <AccordionExample />
      </BloxLayout>
      <BloxLayout title="Checkboxes">
        <CheckboxExample />
      </BloxLayout>
      <BloxLayout title="Radio Buttons">
        <RadioExample />
      </BloxLayout>
      <BloxLayout title="Dropdowns">
        <DropdownExample />
      </BloxLayout>
      <BloxLayout title="Table">
        <TableExample />
      </BloxLayout>
      <BloxLayout title="Tabs">
        <TabsExample />
      </BloxLayout>
      <BloxLayout title="Marquees">
        <MarqueeExample />
      </BloxLayout>
      <BloxLayout title="Segmented Controls">
        <SegmentedControlExample />
      </BloxLayout>
      <BloxLayout title="Switches">
        <SwitchExample />
      </BloxLayout>
      <BloxLayout title="Context Menus">
        <ContextMenuExample />
      </BloxLayout>
      <BloxLayout
        title="Drag & Drop"
        subtitle="Work in Progress">
        <DragDropExample />
      </BloxLayout>
      <BloxLayout title="Toggles">
        <ToggleExample />
      </BloxLayout>
      <BloxLayout title="Sliders">
        <SliderExample />
      </BloxLayout>
    </div>
  );
}

export default App;
