

import React, { useState } from 'react';
import { Checkbox } from '../components/Checkbox';

/**
 * @file `@/examples/CheckboxExample.tsx`
 * @description Examples of using the Checkbox component
 */
export const CheckboxExample: React.FC = () => {
  // For controlled checkbox example
  const [isChecked, setIsChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  
  // For multiple checkboxes in a group
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['option1']);
  
  const handleOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, option]);
    } else {
      setSelectedOptions(prev => prev.filter(item => item !== option));
    }
  };

  return (
    <div className="checkbox-examples">
      <h2>Checkbox Examples</h2>
      
      <div className="example-section">
        <h3>Basic Checkbox</h3>
        <Checkbox 
          label="Accept terms and conditions" 
        />
      </div>
      
      <div className="example-section">
        <h3>Controlled Checkbox</h3>
        <div className="control-group">
          <Checkbox 
            label="Controlled checkbox" 
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
          />
          <div className="control-buttons">
            <button onClick={() => setIsChecked(true)}>Check</button>
            <button onClick={() => setIsChecked(false)}>Uncheck</button>
          </div>
        </div>
      </div>
      
      <div className="example-section">
        <h3>Disabled Checkbox</h3>
        <Checkbox 
          label="Disabled checkbox" 
          disabled
        />
        <Checkbox 
          label="Disabled checked checkbox" 
          checked={true}
          disabled
        />
      </div>
      
      <div className="example-section">
        <h3>Indeterminate Checkbox</h3>
        <div className="control-group">
          <Checkbox 
            label="Parent checkbox (indeterminate)" 
            checked={selectedOptions.length === 3}
            indeterminate={indeterminate}
            onChange={(checked) => {
              if (checked) {
                setSelectedOptions(['option1', 'option2', 'option3']);
              } else {
                setSelectedOptions([]);
              }
              setIndeterminate(false);
            }}
          />
          <div className="checkbox-group">
            <Checkbox 
              label="Option 1" 
              checked={selectedOptions.includes('option1')}
              onChange={(checked) => {
                handleOptionChange('option1', checked);
                setIndeterminate(selectedOptions.length > 0 && selectedOptions.length < 3);
              }}
            />
            <Checkbox 
              label="Option 2" 
              checked={selectedOptions.includes('option2')}
              onChange={(checked) => {
                handleOptionChange('option2', checked);
                setIndeterminate(selectedOptions.length > 0 && selectedOptions.length < 3);
              }}
            />
            <Checkbox 
              label="Option 3" 
              checked={selectedOptions.includes('option3')}
              onChange={(checked) => {
                handleOptionChange('option3', checked);
                setIndeterminate(selectedOptions.length > 0 && selectedOptions.length < 3);
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="example-section">
        <h3>Label Positions</h3>
        <div className="label-positions">
          <Checkbox 
            label="Label on right (default)" 
            labelPosition="right"
          />
          <Checkbox 
            label="Label on left" 
            labelPosition="left"
          />
        </div>
      </div>
      
      <div className="example-section">
        <h3>Error and Helper Text</h3>
        <Checkbox 
          label="Checkbox with helper text" 
          helperText="This is some helpful information about this checkbox."
        />
        <Checkbox 
          label="Checkbox with error" 
          hasError={true}
          errorMessage="This field is required."
        />
      </div>
      
      <div className="example-section">
        <h3>Custom Styled Checkbox</h3>
        <Checkbox 
          label="Custom styled checkbox" 
          className="custom-checkbox"
        />
      </div>
      
      {/* Styles for the examples */}
      <style>{`
        .checkbox-examples {
          margin: 20px 0;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .example-section {
          margin-bottom: 30px;
        }
        
        .example-section h3 {
          margin-bottom: 16px;
        }
        
        .control-group {
          margin-bottom: 16px;
        }
        
        .control-buttons {
          margin-top: 8px;
        }
        
        .control-buttons button {
          margin-right: 8px;
          padding: 4px 8px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .control-buttons button:hover {
          background-color: #e0e0e0;
        }
        
        .checkbox-group {
          margin-left: 24px;
          margin-top: 8px;
        }
        
        .checkbox-group [data-blox-checkbox] {
          margin-bottom: 8px;
        }
        
        .label-positions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* Basic styling for all checkboxes */
        [data-blox-checkbox] {
          margin-bottom: 12px;
        }
        
        [data-blox-checkbox-label] {
          margin-left: 8px;
          cursor: pointer;
        }
        
        [data-blox-checkbox][data-label-position="left"] [data-blox-checkbox-label] {
          margin-left: 0;
          margin-right: 8px;
        }
        
        [data-blox-checkbox][data-disabled="true"] [data-blox-checkbox-label] {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        [data-blox-checkbox-description] {
          margin-top: 4px;
          font-size: 0.875em;
          color: #666;
          margin-left: 24px;
        }
        
        [data-blox-checkbox-description][data-error="true"] {
          color: #d32f2f;
        }
        
        /* Custom checkbox styling */
        .custom-checkbox {
          --checkbox-bg-color: #f9f6fd;
          --checkbox-border-color: #8a3ffc;
          --checkbox-checked-bg-color: #8a3ffc;
          --checkbox-checked-color: white;
          --checkbox-size: 20px;
          --checkbox-label-color: #333;
        }
        
        .custom-checkbox [data-blox-checkbox-input] {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          width: var(--checkbox-size);
          height: var(--checkbox-size);
          border: 2px solid var(--checkbox-border-color);
          border-radius: 4px;
          background-color: var(--checkbox-bg-color);
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        
        .custom-checkbox [data-blox-checkbox-input]:checked {
          background-color: var(--checkbox-checked-bg-color);
        }
        
        .custom-checkbox [data-blox-checkbox-input]:checked::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 6px;
          width: 5px;
          height: 10px;
          border: solid var(--checkbox-checked-color);
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .custom-checkbox [data-blox-checkbox-input]:indeterminate::after {
          content: '';
          position: absolute;
          top: 8px;
          left: 4px;
          width: 10px;
          height: 2px;
          background-color: var(--checkbox-checked-bg-color);
        }
        
        .custom-checkbox [data-blox-checkbox-label] {
          color: var(--checkbox-label-color);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default CheckboxExample;