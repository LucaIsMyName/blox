import React from 'react';
import { Button, Accordion } from './components';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blox Component Library Demo</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Button Component</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2">States</h3>
              <div className="flex flex-wrap gap-2">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Styles</h3>
              <div className="flex flex-wrap gap-2">
                <Button rounded>Rounded</Button>
                <Button fullWidth>Full Width</Button>
                <Button leftIcon={<span>👈</span>}>Left Icon</Button>
                <Button rightIcon={<span>👉</span>}>Right Icon</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Accordion Component</h2>
          
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Basic Accordion</h3>
              <Accordion
                items={[
                  {
                    title: 'Section 1',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                  },
                  {
                    title: 'Section 2',
                    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                  },
                  {
                    title: 'Section 3',
                    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                  }
                ]}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Allow Multiple</h3>
              <Accordion
                allowMultiple
                defaultIndex={[0]}
                items={[
                  {
                    title: 'Section 1',
                    content: 'This section is expanded by default.'
                  },
                  {
                    title: 'Section 2',
                    content: 'You can expand multiple sections at once.'
                  },
                  {
                    title: 'Section 3',
                    content: 'Try clicking on different headers!'
                  }
                ]}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Variants</h3>
              <div className="grid gap-4">
                <Accordion
                  variant="primary"
                  items={[
                    {
                      title: 'Primary Variant',
                      content: 'This accordion uses the primary variant.'
                    }
                  ]}
                />
                <Accordion
                  variant="secondary"
                  items={[
                    {
                      title: 'Secondary Variant',
                      content: 'This accordion uses the secondary variant.'
                    }
                  ]}
                />
                <Accordion
                  variant="success"
                  items={[
                    {
                      title: 'Success Variant',
                      content: 'This accordion uses the success variant.'
                    }
                  ]}
                />
                <Accordion
                  variant="danger"
                  items={[
                    {
                      title: 'Danger Variant',
                      content: 'This accordion uses the danger variant.'
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;