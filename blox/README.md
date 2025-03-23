# Blox Component Library

A modern React component library built with Vite, TypeScript, and Tailwind CSS.

## Installation

```bash
npm install blox
# or
yarn add blox
```

## Usage

```jsx
import { Button, Accordion } from 'blox';
import 'blox/styles.css'; // Import styles

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      
      <Accordion
        items={[
          {
            title: 'Section 1',
            content: 'Content for section 1'
          },
          {
            title: 'Section 2',
            content: 'Content for section 2'
          }
        ]}
      />
    </div>
  );
}
```

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building the library

```bash
npm run build:lib
```

## How to Maintain and Add Components

### Component Structure

Each component follows a consistent directory structure:

```
src/components/ComponentName/
├── ComponentName.tsx    # Main component implementation
├── index.ts             # Export file
└── types.ts             # Type definitions
```

### Adding a New Component

1. **Create the directory structure**:
   ```
   mkdir -p src/components/NewComponent
   ```

2. **Create type definitions** in `src/components/NewComponent/types.ts`:
   ```typescript
   import { BaseProps } from '../../types';

   export interface NewComponentProps extends BaseProps {
     // Add component-specific props here
     label?: string;
     // All components must have a variant prop that controls its layout/styling
   }
   ```

3. **Implement the component** in `src/components/NewComponent/NewComponent.tsx`:
   ```typescript
   import React from 'react';
   import { NewComponentProps } from './types';

   export const NewComponent: React.FC<NewComponentProps> = ({
     variant = 'primary',
     label,
     className = '',
     ...rest
   }) => {
     // Define variant-specific styles
     const variantClasses = {
       primary: 'bg-primary-600 text-white',
       secondary: 'bg-gray-600 text-white',
       // Define styles for other variants
     };

     return (
       <div 
         className={`${variantClasses[variant]} ${className}`}
         {...rest}
       >
         {label}
       </div>
     );
   };
   ```

4. **Create the export file** in `src/components/NewComponent/index.ts`:
   ```typescript
   export { NewComponent } from './NewComponent';
   export type { NewComponentProps } from './types';
   ```

5. **Update the barrel file** in `src/components/index.ts`:
   ```typescript
   // Add this line
   export * from './NewComponent';
   ```

### Component Design Guidelines

1. **Consistent Props**:
   - All components must accept a `variant` prop that controls the main styling/layout
   - Use the common `BaseProps` interface as a base for component props
   - Add component-specific props as needed

2. **Tailwind CSS Classes**:
   - Use Tailwind utility classes for styling
   - Define variant-specific classes in the component
   - Allow className prop for additional customization

3. **Accessibility**:
   - Ensure components are accessible (proper ARIA attributes, keyboard navigation)
   - Include proper focus states

4. **Responsive Design**:
   - Components should be responsive by default
   - Consider various screen sizes

### Testing New Components

1. Add your new component to the demo app in `src/App.tsx`
2. Test all variants and props
3. Check for responsiveness and accessibility

### Publishing Updates

1. Update the version in `package.json`
2. Build the library: `npm run build:lib`
3. Publish to npm: `npm publish`

## Available Components

- Button: A versatile button component with various variants, sizes, and states
- Accordion: A collapsible content component with customizable sections

## License

MIT