# Blox UI React

A headless UI component library for React applications. This library provides unstyled, accessible components that give you complete control over the styling while handling all the complex functionality, accessibility, and interactions.

## Installation

```bash
npm install blox-ui-react
# or
yarn add blox-ui-react
# or
pnpm add blox-ui-react
```

## Dependencies

Blox need `react` and `react-dom` to work

## Features

- 🎨 **Fully headless** - No styling opinions, complete visual freedom
- ♿ **Accessible** - ARIA attributes and keyboard navigation built-in
- 🪶 **Lightweight** - Only ship what you use with tree-shaking
- 🔄 **Flexible API** - Both controlled and uncontrolled usage
- 📦 **Modular** - Import only what you need
- 📱 **Responsive** - Works on all screen sizes
- 🔍 **TypeScript** - Full type definitions included

## Components

### Accordion

Expandable panels for showing and hiding content.

```jsx
import { Accordion } from 'blox-ui-react';

function AccordionExample() {
  return (
    <Accordion defaultActiveTab="item1">
      <Accordion.Item id="item1">
        <Accordion.Button>Section 1</Accordion.Button>
        <Accordion.Panel>Content for section 1</Accordion.Panel>
      </Accordion.Item>
      
      <Accordion.Item id="item2">
        <Accordion.Button>Section 2</Accordion.Button>
        <Accordion.Panel>Content for section 2</Accordion.Panel>
      </Accordion.Item>
      
      <Accordion.Item id="item3" disabled>
        <Accordion.Button>Section 3 (Disabled)</Accordion.Button>
        <Accordion.Panel>Content for section 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

### Checkbox

Selectable input control.

```jsx
import { Checkbox } from 'blox-ui-react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  
  return (
    <>
      {/* Uncontrolled */}
      <Checkbox label="Accept terms and conditions" defaultChecked={true} />
      
      {/* Controlled */}
      <Checkbox 
        label="Subscribe to newsletter" 
        checked={checked} 
        onChange={(isChecked) => setChecked(isChecked)} 
      />
      
      {/* Indeterminate */}
      <Checkbox 
        label="Select all items" 
        indeterminate={true} 
      />
      
      {/* Disabled */}
      <Checkbox 
        label="Disabled option" 
        disabled 
      />
    </>
  );
}
```

### Drawer

Sliding panel that appears from the edge of the screen.

```jsx
import { Drawer } from 'blox-ui-react';
import { useState } from 'react';

function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        placement="right"
      >
        <Drawer.Header>
          <h3>Drawer Title</h3>
        </Drawer.Header>
        
        <Drawer.Body>
          <p>This is the drawer content.</p>
        </Drawer.Body>
        
        <Drawer.Footer>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

### Dropdown

Menu that appears below an element when triggered.

```jsx
import { Dropdown } from 'blox-ui-react';
import { useState } from 'react';

function DropdownExample() {
  const [value, setValue] = useState('');
  
  return (
    <Dropdown onChange={setValue} value={value}>
      <Dropdown.Trigger>
        {value || 'Select an option'} ▼
      </Dropdown.Trigger>
      
      <Dropdown.Menu>
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
        <Dropdown.Item value="option3">Option 3</Dropdown.Item>
        <Dropdown.Item value="option4" disabled>Option 4 (Disabled)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
```

### Marquee

Scrolling text or content container.

```jsx
import { Marquee } from 'blox-ui-react';

function MarqueeExample() {
  return (
    <Marquee speed="normal" pauseOnHover direction="left">
      <div style={{ display: 'flex', gap: '20px' }}>
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
        <span>Item 4</span>
        <span>Item 5</span>
      </div>
    </Marquee>
  );
}
```

### Modal

Dialog that appears over the page content.

```jsx
import { Modal } from 'blox-ui-react';
import { useState } from 'react';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <Modal.Header>
          <h3>Modal Title</h3>
          <Modal.CloseButton onClose={() => setIsOpen(false)} />
        </Modal.Header>
        
        <Modal.Body>
          <p>This is the modal content.</p>
        </Modal.Body>
        
        <Modal.Footer>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => setIsOpen(false)}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### Radio

Radio button input for selecting a single option from a group.

```jsx
import { Radio } from 'blox-ui-react';
import { useState } from 'react';

function RadioExample() {
  const [selected, setSelected] = useState('option1');
  
  return (
    <Radio.Group 
      name="options" 
      value={selected} 
      onChange={setSelected}
    >
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
      <Radio value="option4" label="Option 4" disabled />
    </Radio.Group>
  );
}
```

### SegmentedControl

iOS-style selection control.

```jsx
import { SegmentedControl } from 'blox-ui-react';
import { useState } from 'react';

function SegmentedControlExample() {
  const [view, setView] = useState('day');
  
  return (
    <SegmentedControl 
      value={view} 
      onChange={setView}
    >
      <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
    </SegmentedControl>
  );
}
```

### Table

Data table for displaying structured information.

```jsx
import { Table } from 'blox-ui-react';
import { useState } from 'react';

function TableExample() {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('none');
  
  const handleSort = (columnId, direction) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };
  
  const columns = [
    { id: 'name', header: 'Name', sortable: true },
    { id: 'email', header: 'Email', sortable: true },
    { id: 'role', header: 'Role' }
  ];
  
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ];
  
  return (
    <Table.Container>
      <Table
        columns={columns}
        data={data}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      >
        <Table.Caption>User Data</Table.Caption>
      </Table>
    </Table.Container>
  );
}
```

### Tabs

Tabbed interface for organizing content.

```jsx
import { Tabs } from 'blox-ui-react';
import { useState } from 'react';

function TabsExample() {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab id="tab1">First Tab</Tabs.Tab>
        <Tabs.Tab id="tab2">Second Tab</Tabs.Tab>
        <Tabs.Tab id="tab3">Third Tab</Tabs.Tab>
        <Tabs.Tab id="tab4" disabled>Disabled Tab</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel tabId="tab1">
          <h3>First Tab Content</h3>
          <p>This is the content for the first tab.</p>
        </Tabs.Panel>
        
        <Tabs.Panel tabId="tab2">
          <h3>Second Tab Content</h3>
          <p>This is the content for the second tab.</p>
        </Tabs.Panel>
        
        <Tabs.Panel tabId="tab3">
          <h3>Third Tab Content</h3>
          <p>This is the content for the third tab.</p>
        </Tabs.Panel>
        
        <Tabs.Panel tabId="tab4">
          <h3>Disabled Tab Content</h3>
          <p>This content won't be seen because the tab is disabled.</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

### Tooltip

Popup that displays information when hovering over an element.

```jsx
import { Tooltip } from 'blox-ui-react';

function TooltipExample() {
  return (
    <Tooltip 
      content={<span>This is a helpful tooltip</span>}
      placement="top"
      showDelay={200}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Styling Components

Since Blox UI is headless, you can style components however you want. Here are examples using different styling approaches:

### With CSS Classes

```jsx
import { Button } from 'blox-ui-react';
import './button-styles.css'; // Your CSS file

<Button className="my-button primary-button">Click Me</Button>
```

### With Inline Styles

```jsx
import { Button } from 'blox-ui-react';

<Button 
  style={{ 
    backgroundColor: '#3182ce', 
    color: 'white',
    padding: '10px 16px',
    borderRadius: '4px'
  }}
>
  Click Me
</Button>
```

### With Tailwind CSS

```jsx
import { Button } from 'blox-ui-react';

<Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click Me
</Button>
```

### With CSS-in-JS (like styled-components or emotion)

```jsx
import { Button } from 'blox-ui-react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: #3182ce;
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  
  &:hover {
    background-color: #2c5282;
  }
`;

<StyledButton>Click Me</StyledButton>
```

## Data Attributes for Styling

All components expose data attributes for styling different states:

```css
/* Style the active tab */
[data-blox-tab][data-state="active"] {
  border-bottom: 2px solid blue;
}

/* Style a disabled checkbox */
[data-blox-checkbox][data-disabled="true"] {
  opacity: 0.5;
}
```

## Development

To contribute to this library:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build the library: `npm run build:lib`

## License

MIT