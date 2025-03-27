// SwitchExample.tsx
import React, { useState } from 'react';
import { Switch } from '../components/Switch';

export const SwitchExample: React.FC = () => {
  // For controlled switch
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  return (
    <div className="switch-examples">
      <h2>Switch Examples</h2>
      
      <div className="example-section">
        <h3>Basic Switch (Uncontrolled)</h3>
        <Switch 
          label="Accept terms and conditions" 
          defaultChecked={false}
          className="mb-4"
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600"
          thumbClassName="bg-white shadow-md"
        />
      </div>
      
      <div className="example-section">
        <h3>Controlled Switches</h3>
        <div className="mb-4">
          <Switch 
            label="Dark Mode" 
            checked={darkMode}
            onChange={setDarkMode}
            trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600"
            thumbClassName="bg-white shadow-md"
          />
          <div className="mt-2 text-sm text-gray-600">
            Dark mode is {darkMode ? 'enabled' : 'disabled'}
          </div>
        </div>
        
        <div className="mb-4">
          <Switch 
            label="Email Notifications" 
            checked={emailNotifications}
            onChange={setEmailNotifications}
            trackClassName="bg-gray-300 data-[state=checked]:bg-green-600"
            thumbClassName="bg-white shadow-md"
          />
          <div className="mt-2 text-sm text-gray-600">
            Email notifications are {emailNotifications ? 'enabled' : 'disabled'}
          </div>
        </div>
      </div>
      
      <div className="example-section">
        <h3>With Helper Text</h3>
        <Switch 
          label="Subscribe to newsletter" 
          helperText="You will receive weekly updates about our products"
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600"
          thumbClassName="bg-white shadow-md"
          className="mb-4"
        />
      </div>
      
      <div className="example-section">
        <h3>With Error State</h3>
        <Switch 
          label="I agree to the terms" 
          hasError={true}
          errorMessage="You must agree to the terms to continue"
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600 data-[disabled=true]:bg-gray-200"
          thumbClassName="bg-white shadow-md"
          className="mb-4"
        />
      </div>
      
      <div className="example-section">
        <h3>Disabled State</h3>
        <Switch 
          label="Airplane Mode (Disabled)" 
          disabled
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600 data-[disabled=true]:bg-gray-200 data-[disabled=true]:opacity-50"
          thumbClassName="bg-white shadow-md data-[disabled=true]:opacity-70"
          className="mb-4"
        />
        <Switch 
          label="Feature Preview (Disabled)" 
          disabled
          defaultChecked
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600 data-[disabled=true]:bg-gray-200 data-[disabled=true]:opacity-50"
          thumbClassName="bg-white shadow-md data-[disabled=true]:opacity-70"
          className="mb-4"
        />
      </div>
      
      <div className="example-section">
        <h3>Label Position</h3>
        <Switch 
          label="Label on right (default)" 
          labelPosition="right"
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600"
          thumbClassName="bg-white shadow-md"
          className="mb-4"
        />
        <Switch 
          label="Label on left" 
          labelPosition="left"
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600"
          thumbClassName="bg-white shadow-md"
          className="mb-4"
        />
      </div>
      
      <div className="example-section">
        <h3>Custom Styled Switches</h3>
        <Switch 
          label="iOS Style" 
          trackClassName="bg-gray-300 data-[state=checked]:bg-green-500 w-12 h-7 rounded-full"
          thumbClassName="bg-white shadow-sm w-5 h-5 rounded-full translate-x-1 data-[state=checked]:translate-x-6"
          className="mb-4"
        />
        
        <Switch 
          label="Material Style" 
          trackClassName="bg-gray-300 data-[state=checked]:bg-purple-600 w-10 h-4 rounded-full"
          thumbClassName="bg-white shadow-lg w-5 h-5 rounded-full -translate-y-0.5 data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
          className="mb-4"
        />
        
        <Switch 
          label="Square Style" 
          trackClassName="bg-gray-300 data-[state=checked]:bg-blue-600 w-10 h-6 rounded"
          thumbClassName="bg-white shadow-md w-4 h-4 rounded translate-x-1 data-[state=checked]:translate-x-5"
          className="mb-4"
        />
      </div>
    </div>
  );
};

export default SwitchExample;