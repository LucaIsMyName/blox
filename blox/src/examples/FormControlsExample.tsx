import React from 'react';
import { Checkbox, Radio, Toggle } from '../components';

export const FormControlsExample: React.FC = () => {
  // Example of using the form controls with both internal state
  // and custom event handlers
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Checkbox changed:', e.target.checked);
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Radio changed:', e.target.value);
  };
  
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Toggle changed:', e.target.checked);
  };
  
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Form Controls with Internal State</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Checkboxes</h2>
        
        {/* Uncontrolled checkbox - manages its own state */}
        <div>
          <Checkbox 
            label="Uncontrolled checkbox (manages its own state)" 
            defaultChecked={true}
            onChange={handleCheckboxChange}
            inputClassName="border-gray-300 rounded text-blue-600 focus:ring-blue-500"
          />
        </div>
        
        {/* Checkbox with additional click handler */}
        <div>
          <Checkbox 
            label="Checkbox with extra click handler" 
            defaultChecked={false}
            onChange={handleCheckboxChange}
            onClick={() => alert('Checkbox clicked!')}
            inputClassName="border-gray-300 rounded text-blue-600 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Radio Buttons</h2>
        
        {/* Radio group with internal state */}
        <div className="space-y-2">
          <Radio 
            label="Option 1" 
            name="radio-group"
            value="option1"
            defaultChecked={true}
            onChange={handleRadioChange}
            inputClassName="border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          
          <Radio 
            label="Option 2" 
            name="radio-group"
            value="option2"
            onChange={handleRadioChange}
            inputClassName="border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          
          <Radio 
            label="Option 3 with click handler" 
            name="radio-group"
            value="option3"
            onChange={handleRadioChange}
            onClick={() => alert('Radio option 3 clicked!')}
            inputClassName="border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Toggle Switches</h2>
        
        {/* Uncontrolled toggle */}
        <div>
          <Toggle 
            label="Uncontrolled toggle (manages its own state)" 
            defaultChecked={true}
            onChange={handleToggleChange}
            trackClassName="bg-gray-200 peer-checked:bg-blue-600"
            thumbClassName="bg-white shadow-md"
          />
        </div>
        
        {/* Toggle with border */}
        <div>
          <Toggle 
            label="Toggle with border" 
            hasBorder={true}
            onChange={handleToggleChange}
            trackClassName="bg-gray-200 peer-checked:bg-blue-600"
            thumbClassName="bg-white shadow-md"
          />
        </div>
        
        {/* Toggle with click handler */}
        <div>
          <Toggle 
            label="Toggle with extra click handler" 
            onChange={handleToggleChange}
            onClick={() => alert('Toggle clicked!')}
            trackClassName="bg-gray-200 peer-checked:bg-blue-600"
            thumbClassName="bg-white shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default FormControlsExample;