# Blox UI React

A headless UI component library for React applications.

## Installation

```bash
npm install blox-ui-react
# or
yarn add blox-ui-react
# or
pnpm add blox-ui-react
```

## Usage

```jsx
import { Accordion, Drawer, Modal } from 'blox-ui-react';
import 'blox-ui-react/styles'; // Optional minimal styles

// Use components in your app
function App() {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Button>Click me</Accordion.Button>
        <Accordion.Panel>Content</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

## Features

- Fully headless components with zero styling opinions
- Accessible and keyboard navigable
- Lightweight and tree-shakeable
- TypeScript support
- Compatible with any styling solution (Tailwind CSS, CSS-in-JS, etc.)

## Components

- Accordion
- Checkbox
- Drawer
- Dropdown
- Marquee
- Modal
- Radio
- Table
- Tabs
- Tooltip

## Development

To run the development environment:

```bash
npm run dev
```

To build the library:

```bash
npm run build:lib
```

## License

MIT