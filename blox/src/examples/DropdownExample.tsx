// DropdownExample.tsx
import React, { useState } from 'react';
import { Dropdown } from '../components/Dropdown';

export const DropdownExample: React.FC = () => {
  // For basic dropdown example
  const [selectedValue, setSelectedValue] = useState<string | number>('');
  
  // For controlled dropdown example
  const [controlledIsOpen, setControlledIsOpen] = useState(false);
  const [controlledValue, setControlledValue] = useState<string | number>('option2');
  
  // Options for different examples
  const fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Mango', value: 'mango' },
  ];
  
  const sizes = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl', disabled: true },
  ];

  return (
    <div className="dropdown-examples">
      <h2>Dropdown Examples</h2>
      
      <div className="example-section">
        <h3>Basic Dropdown</h3>
        <div className="current-selection">
          Selected value: <strong>{selectedValue || 'None'}</strong>
        </div>
        <Dropdown onChange={setSelectedValue} value={selectedValue} width="240px">
          <Dropdown.Trigger className="trigger-button">
            {selectedValue ? 
              fruits.find(item => item.value === selectedValue)?.label : 
              'Select a fruit'} 
            <span className="trigger-icon">▼</span>
          </Dropdown.Trigger>
          <Dropdown.Menu className="dropdown-menu">
            {fruits.map((fruit) => (
              <Dropdown.Item
                key={fruit.value}
                value={fruit.value}
                className="dropdown-item"
              >
                {fruit.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      <div className="example-section">
        <h3>Controlled Dropdown</h3>
        <div className="current-selection">
          Selected value: <strong>{controlledValue || 'None'}</strong>
          <br />
          Is open: <strong>{controlledIsOpen ? 'Yes' : 'No'}</strong>
        </div>
        <Dropdown 
          isOpen={controlledIsOpen}
          onOpenChange={setControlledIsOpen}
          value={controlledValue}
          onChange={setControlledValue}
          width="240px"
        >
          <Dropdown.Trigger className="trigger-button">
            {controlledValue ? 
              sizes.find(item => item.value === controlledValue)?.label : 
              'Select a size'} 
            <span className="trigger-icon">▼</span>
          </Dropdown.Trigger>
          <Dropdown.Menu className="dropdown-menu">
            {sizes.map((size) => (
              <Dropdown.Item
                key={size.value}
                value={size.value}
                disabled={size.disabled}
                className="dropdown-item"
              >
                {size.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="control-buttons">
          <button onClick={() => setControlledIsOpen(!controlledIsOpen)}>
            {controlledIsOpen ? 'Close Dropdown' : 'Open Dropdown'}
          </button>
          <button onClick={() => setControlledValue('sm')}>Set to Small</button>
          <button onClick={() => setControlledValue('md')}>Set to Medium</button>
          <button onClick={() => setControlledValue('lg')}>Set to Large</button>
        </div>
      </div>
      
      <div className="example-section">
        <h3>Different Placements</h3>
        <div className="placement-examples">
          <Dropdown placement="top" width="180px">
            <Dropdown.Trigger className="trigger-button">
              Top Placement <span className="trigger-icon">▼</span>
            </Dropdown.Trigger>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item value="item1" className="dropdown-item">Item 1</Dropdown.Item>
              <Dropdown.Item value="item2" className="dropdown-item">Item 2</Dropdown.Item>
              <Dropdown.Item value="item3" className="dropdown-item">Item 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown placement="bottom" width="180px">
            <Dropdown.Trigger className="trigger-button">
              Bottom Placement <span className="trigger-icon">▼</span>
            </Dropdown.Trigger>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item value="item1" className="dropdown-item">Item 1</Dropdown.Item>
              <Dropdown.Item value="item2" className="dropdown-item">Item 2</Dropdown.Item>
              <Dropdown.Item value="item3" className="dropdown-item">Item 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown placement="bottom-end" width="180px">
            <Dropdown.Trigger className="trigger-button">
              Bottom-End <span className="trigger-icon">▼</span>
            </Dropdown.Trigger>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item value="item1" className="dropdown-item">Item 1</Dropdown.Item>
              <Dropdown.Item value="item2" className="dropdown-item">Item 2</Dropdown.Item>
              <Dropdown.Item value="item3" className="dropdown-item">Item 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      
      <div className="example-section">
        <h3>Disabled Dropdown</h3>
        <Dropdown disabled width="240px">
          <Dropdown.Trigger className="trigger-button">
            Disabled Dropdown <span className="trigger-icon">▼</span>
          </Dropdown.Trigger>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item value="item1" className="dropdown-item">Item 1</Dropdown.Item>
            <Dropdown.Item value="item2" className="dropdown-item">Item 2</Dropdown.Item>
            <Dropdown.Item value="item3" className="dropdown-item">Item 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      <div className="example-section">
        <h3>Custom Styled Dropdown</h3>
        <Dropdown className="custom-dropdown" width="240px">
          <Dropdown.Trigger className="custom-trigger">
            Custom Styled Dropdown <span className="custom-icon">▼</span>
          </Dropdown.Trigger>
          <Dropdown.Menu className="custom-menu">
            <Dropdown.Item value="item1" className="custom-item">Option One</Dropdown.Item>
            <Dropdown.Item value="item2" className="custom-item">Option Two</Dropdown.Item>
            <Dropdown.Item value="item3" className="custom-item">Option Three</Dropdown.Item>
            <Dropdown.Item value="item4" className="custom-item" disabled>Option Four (Disabled)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
      {/* Styles for the examples */}
      <style>{`
        .dropdown-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 30px;
        }
        
        .example-section h3 {
          margin-bottom: 16px;
        }
        
        .current-selection {
          margin-bottom: 12px;
        }
        
        /* Basic Dropdown Styling */
        [data-blox-dropdown] {
          position: relative;
          display: inline-block;
        }
        
        .trigger-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          min-width: 120px;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .trigger-button:hover {
          background-color: #e9ecef;
        }
        
        .trigger-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
        }
        
        .trigger-button[data-disabled='true'] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .trigger-icon {
          font-size: 10px;
          margin-left: 8px;
          transition: transform 0.2s;
        }
        
        [data-state='open'] .trigger-icon {
          transform: rotate(180deg);
        }
        
        .dropdown-menu {
          position: absolute;
          z-index: 1000;
          min-width: 100%;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-top: 4px;
          max-height: 250px;
          overflow-y: auto;
        }
        
        [data-placement='top'] .dropdown-menu {
          bottom: 100%;
          margin-bottom: 4px;
          margin-top: 0;
        }
        
        [data-placement='bottom-end'] .dropdown-menu {
          right: 0;
        }
        
        .dropdown-item {
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        
        .dropdown-item[data-selected='true'] {
          background-color: #e9ecef;
          font-weight: 500;
        }
        
        .dropdown-item[data-disabled='true'] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Control buttons */
        .control-buttons {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }
        
        .control-buttons button {
          padding: 6px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        /* Multiple placement examples */
        .placement-examples {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        /* Custom Styled Dropdown */
        .custom-dropdown {
          --dropdown-bg: #4a1a8a;
          --dropdown-text: white;
          --dropdown-border: none;
          --dropdown-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --dropdown-item-hover-bg: #6927b8;
          --dropdown-item-selected-bg: #8347d1;
        }
        
        .custom-trigger {
          background-color: var(--dropdown-bg);
          color: var(--dropdown-text);
          border: var(--dropdown-border);
          padding: 10px 16px;
          border-radius: 6px;
          box-shadow: var(--dropdown-shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .custom-icon {
          font-size: 12px;
          transition: transform 0.2s;
        }
        
        [data-state='open'] .custom-icon {
          transform: rotate(180deg);
        }
        
        .custom-menu {
          background-color: var(--dropdown-bg);
          border: var(--dropdown-border);
          border-radius: 6px;
          box-shadow: var(--dropdown-shadow);
          margin-top: 6px;
          overflow: hidden;
        }
        
        .custom-item {
          color: var(--dropdown-text);
          padding: 10px 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .custom-item:hover:not([data-disabled='true']) {
          background-color: var(--dropdown-item-hover-bg);
        }
        
        .custom-item[data-selected='true'] {
          background-color: var(--dropdown-item-selected-bg);
        }
      `}</style>
    </div>
  );
};

export default DropdownExample;