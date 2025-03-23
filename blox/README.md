# Blox

A headless React component library built with TypeScript that prioritizes functionality over styling, giving you complete control over the appearance of your UI.

## Features

- **Truly Headless**: Components with minimal styling, only what's needed for functionality
- **Data Attributes**: All components expose rich data attributes for styling hooks
- **Accessibility-First**: Built with ARIA attributes and keyboard navigation
- **TypeScript Support**: Full type definitions for all components and props
- **Customizable**: Style any way you want - CSS, Tailwind, Styled Components, or any other styling solution

## Installation

```bash
npm install blox-ui-react
# or
yarn add blox-ui-react
```

## Usage

```jsx
import { Button, Table, Drawer } from 'blox';
import 'blox/style.css';
import './your-custom-styles.css'; // Your own styling

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      
      <Table 
        data={users}
        columns={columns}
        onSort={handleSort}
      />
    </div>
  );
}
```

## Available Components

### Accordion

A collapsible content component that allows toggling between showing and hiding sections of content.

```jsx
<Accordion
  items={[
    {
      title: "Section 1",
      content: "This is the content for section 1"
    },
    {
      title: "Section 2",
      content: "This is the content for section 2"
    }
  ]}
  allowMultiple={true}
  defaultIndex={[0]}
/>
```

**Key features:**
- Single or multiple section expansion
- Configurable default open sections
- Animated transitions
- Keyboard navigation

**Data attributes:**
- `data-blox="accordion"`
- `data-blox="accordion-item"`
- `data-active="true|false"`

### Badge

A small count and labeling component to highlight or display short information.

```jsx
<Badge variant="primary" pill>New</Badge>
<Badge dot>Notification</Badge>
<Badge outlined>42</Badge>
```

**Key features:**
- Multiple visual variants
- Pill shape option
- Dot indicator
- Outlined style

**Data attributes:**
- `data-blox="badge"`
- `data-variant="primary|secondary|success|danger|..."`
- `data-pill="true|false"`
- `data-dot="true|false"`
- `data-outlined="true|false"`

### Breadcrumb

A navigation component that shows the user's location in the site hierarchy.

```jsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", isActive: true }
  ]}
  separator="/"
  showHomeIcon
/>
```

**Key features:**
- Custom separators
- Home icon option
- Automatic collapsing for long paths
- Active state for current page
- Custom icon support

**Data attributes:**
- `data-blox="breadcrumb"`
- `data-separator="true"`
- `data-active="true|false"`

### Button

A clickable button component with various states and styles.

```jsx
<Button 
  variant="primary"
  size="md"
  isLoading={loading}
  disabled={!valid}
  leftIcon={<Icon />}
>
  Submit
</Button>
```

**Key features:**
- Multiple visual variants
- Different sizes
- Loading state
- Left and right icons
- Full width option
- Rounded style

**Data attributes:**
- `data-blox="button"`
- `data-variant="primary|secondary|success|danger|..."`
- `data-size="xs|sm|md|lg|xl"`
- `data-loading="true|false"`
- `data-disabled="true|false"`

### Drawer

A panel that slides in from the edge of the screen.

```jsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  placement="right"
  minWidth={300}
>
  <div>Drawer content</div>
</Drawer>
```

**Key features:**
- Four placement options (left, right, top, bottom)
- Configurable dimensions
- Close via button, ESC key, or backdrop click
- Focus trapping for accessibility
- Custom animation control

**Data attributes:**
- `data-blox="drawer"`
- `data-blox="drawer-backdrop"`
- `data-placement="left|right|top|bottom"`
- `data-animated="true|false"`

### Marquee

An accessible implementation of scrolling text or content.

```jsx
<Marquee
  direction="left"
  speed="normal"
  pauseOnHover
>
  This is scrolling text
</Marquee>
```

**Key features:**
- Multiple direction options
- Adjustable speed
- Pause on hover and focus
- Different animation behaviors
- Custom gap and delay

**Data attributes:**
- `data-blox="marquee"`
- `data-variant="primary|secondary|success|danger|..."`
- `data-direction="left|right|up|down"`
- `data-speed="slow|normal|fast"`
- `data-behavior="scroll|alternate"`
- `data-paused="true|false"`

### Modal

A dialog component that focuses the user's attention.

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirmation"
  size="md"
  footer={<Button onClick={confirm}>OK</Button>}
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

**Key features:**
- Multiple size options
- Custom header and footer sections
- Close via button, ESC key, or backdrop click
- Focus trapping
- Scroll locking

**Data attributes:**
- `data-blox="modal-overlay"`
- `data-blox="modal-content"`
- `data-blox="modal-header"`
- `data-blox="modal-body"`
- `data-blox="modal-footer"`
- `data-size="sm|md|lg|xl|full"`

### Table

A data table component with sorting and custom cell rendering.

```jsx
<Table
  data={users}
  columns={[
    { id: 'name', header: 'Name', sortable: true },
    { id: 'email', header: 'Email' },
    { id: 'role', header: 'Role', cell: (value) => <Badge>{value}</Badge> }
  ]}
  sortColumn="name"
  sortDirection="asc"
  onSort={handleSort}
  striped
  hover
/>
```

**Key features:**
- Column-based configuration
- Sortable columns
- Custom cell rendering
- Loading and empty states
- Responsive options
- Row customization

**Data attributes:**
- `data-blox="table"`
- `data-blox="table-head"`
- `data-blox="table-body"`
- `data-sortable="true|false"`
- `data-sorted="true|false"`
- `data-sort-direction="asc|desc|none"`
- `data-center="true|false"`
- `data-striped="true|false"`
- `data-bordered="true|false"`
- `data-hover="true|false"`

### Tabs

A component for organizing content into selectable sections.

```jsx
<Tabs
  items={[
    { id: 'tab1', label: 'Overview', content: <Overview /> },
    { id: 'tab2', label: 'Details', content: <Details /> }
  ]}
  variantStyle="line"
  orientation="horizontal"
/>
```

**Key features:**
- Multiple style variants (line, enclosed, rounded, pill)
- Horizontal and vertical orientation
- Icon support
- Controlled and uncontrolled modes
- Animated indicator

**Data attributes:**
- `data-blox="tabs"`
- `data-blox="tab-list"`
- `data-blox="tab"`
- `data-blox="tab-panel"`
- `data-variant="primary|secondary|success|danger|..."`
- `data-orientation="horizontal|vertical"`
- `data-variant-style="line|enclosed|rounded|soft-rounded|pill"`
- `data-active="true|false"`
- `data-disabled="true|false"`

## Styling Approach

Blox components are intentionally unstyled, with styling hooks exposed via data attributes. This gives you complete control over the appearance of your UI.

Example CSS targeting Blox components:

```css
/* Style the button component */
[data-blox="button"] {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

/* Style active tabs */
[data-blox="tab"][data-active="true"] {
  color: #1d4ed8;
  border-bottom: 2px solid #1d4ed8;
}

/* Style the table */
[data-blox="table"] {
  width: 100%;
  border-collapse: collapse;
}

[data-blox="table-head"] th {
  background-color: #f3f4f6;
  font-weight: 600;
  padding: 0.75rem;
}
```

## Accessibility

All components are built with accessibility in mind, including:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader announcements
- Semantic HTML

## Configuration

Blox components can be configured globally through our configuration system:

```jsx
// blox.config.js
module.exports = {
  theme: {
    colors: {
      primary: {
        // Your color values
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'primary',
        size: 'md',
      }
    }
  }
};

// In your app
import { BloxProvider } from 'blox';
import config from './blox.config.js';

function App() {
  return (
    <BloxProvider config={config}>
      <YourApp />
    </BloxProvider>
  );
}
```

## Why Headless?

Headless components provide several advantages:

1. **No style conflicts**: Use any CSS framework without fighting with pre-existing styles
2. **Maximum flexibility**: Complete control over the appearance of your UI
3. **Smaller bundle size**: Only ship the functionality, not the styles
4. **Better performance**: Fewer style recalculations and simpler DOM

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build the library
npm run build:lib
```

## License

MIT
