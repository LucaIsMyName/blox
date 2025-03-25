// Example usage in App.tsx
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

function App() {
  return (
    <div className="app p-4">
      <h1>Blox UI Components</h1>
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
      <BlockLayout title="Dropdowns">
        <TableExample />
      </BlockLayout>
      <BlockLayout title="Dropdowns">
        <TabsExample />
      </BlockLayout>
    </div>
  );
}

export default App;
