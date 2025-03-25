// Radio.tsx
import React, { useRef, useContext, createContext, useMemo } from 'react';
import { RadioProps, RadioGroupProps } from './types';

// Create context for radio group
interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType>({});

// Main Radio component
const Radio: React.FC<RadioProps> = ({
  label,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  id,
  name,
  labelProps = {},
  labelPosition = 'right',
  helperText,
  errorMessage,
  hasError = false,
  ...props
}) => {
  // Get values from radio group context if available
  const radioGroup = useContext(RadioGroupContext);
  
  // Generate a unique ID if one is not provided
  const uniqueId = useRef(id || `blox-radio-${Math.random().toString(36).substring(2, 9)}`).current;
  
  // Use group props if available, otherwise use individual props
  const isWithinGroup = !!radioGroup.name;
  const groupName = radioGroup.name;
  const groupValue = radioGroup.value;
  const groupOnChange = radioGroup.onChange;
  const groupDisabled = radioGroup.disabled;
  const groupRequired = radioGroup.required;
  
  // Determine final props
  const finalDisabled = disabled || (isWithinGroup ? groupDisabled : false);
  const finalRequired = required || (isWithinGroup ? groupRequired : false);
  const finalName = isWithinGroup ? groupName : name;
  
  // Determine whether the radio is checked (for controlled usage within a group)
  const isChecked = isWithinGroup 
    ? groupValue === value 
    : checked;
  
  // Determine whether we're controlled or uncontrolled
  const isControlled = isWithinGroup
    ? groupValue !== undefined
    : checked !== undefined;
  
  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (finalDisabled) return;
    
    if (isWithinGroup) {
      groupOnChange?.(value, event);
    } else {
      onChange?.(value, event);
    }
  };
  
  return (
    <div 
      className={`blox-radio-container ${className}`}
      data-blox-radio=""
      data-checked={isControlled ? (isChecked ? 'true' : 'false') : undefined}
      data-disabled={finalDisabled ? 'true' : 'false'}
      data-error={hasError ? 'true' : 'false'}
      data-required={finalRequired ? 'true' : 'false'}
      data-label-position={labelPosition}
    >
      <input
        type="radio"
        id={uniqueId}
        name={finalName}
        value={value}
        checked={isChecked}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        disabled={finalDisabled}
        required={finalRequired}
        className={`blox-radio-input ${inputClassName}`}
        data-blox-radio-input=""
        aria-invalid={hasError}
        aria-describedby={
          (helperText || errorMessage) ? 
            `${uniqueId}-description` : 
            undefined
        }
        {...props}
      />
      
      {label && (
        <label
          htmlFor={uniqueId}
          className={`blox-radio-label ${labelClassName}`}
          data-blox-radio-label=""
          {...labelProps}
        >
          {label}
        </label>
      )}
      
      {(helperText || errorMessage) && (
        <div 
          id={`${uniqueId}-description`}
          className={`blox-radio-description ${hasError ? 'blox-radio-error' : ''}`}
          data-blox-radio-description=""
          data-error={hasError ? 'true' : 'false'}
        >
          {hasError ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

// Radio Group Component
const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  name,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  direction = 'vertical',
  className = '',
  label,
  helperText,
  errorMessage,
  hasError = false,
  ...props
}) => {
  // Handle change event in the group
  const handleChange = (radioValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(radioValue);
  };
  
  // Create context value
  const contextValue = useMemo(() => ({
    name,
    value,
    onChange: handleChange,
    disabled,
    required,
  }), [name, value, disabled, required]);
  
  // Generate a unique ID for the group
  const groupId = useRef(`blox-radio-group-${Math.random().toString(36).substring(2, 9)}`).current;
  
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div 
        className={`blox-radio-group ${className}`}
        data-blox-radio-group=""
        data-direction={direction}
        data-disabled={disabled ? 'true' : 'false'}
        data-error={hasError ? 'true' : 'false'}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={
          (helperText || errorMessage) ? 
            `${groupId}-description` : 
            undefined
        }
        {...props}
      >
        {label && (
          <div 
            id={`${groupId}-label`}
            className="blox-radio-group-label"
            data-blox-radio-group-label=""
          >
            {label}
          </div>
        )}
        
        <div 
          className="blox-radio-group-items"
          data-blox-radio-group-items=""
        >
          {children}
        </div>
        
        {(helperText || errorMessage) && (
          <div 
            id={`${groupId}-description`}
            className={`blox-radio-group-description ${hasError ? 'blox-radio-group-error' : ''}`}
            data-blox-radio-group-description=""
            data-error={hasError ? 'true' : 'false'}
          >
            {hasError ? errorMessage : helperText}
          </div>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
};

// Attach RadioGroup as a property of Radio
Radio.Group = RadioGroup;

export default Radio;