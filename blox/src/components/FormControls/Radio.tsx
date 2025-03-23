import React, { useState } from "react";
import { RadioProps } from "./types";

export const Radio: React.FC<RadioProps> = ({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  disabled,
  required,
  size = "md",
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  className = "",
  id,
  onChange,
  onClick,
  ...rest
}) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;
  
  // Generate a unique ID if not provided
  const uniqueId = id || `radio-${Math.random().toString(36).substring(2, 9)}`;
  
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3";
      case "lg":
        return "h-5 w-5";
      case "md":
      default:
        return "h-4 w-4";
    }
  };
  
  // Size for inner dot
  const getDotSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-1.5 w-1.5";
      case "lg":
        return "h-3 w-3";
      case "md":
      default:
        return "h-2 w-2";
    }
  };
  
  // Handle change events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If uncontrolled, update internal state
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    
    // Call the external onChange handler if provided
    if (onChange) {
      onChange(e);
    }
  };
  
  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Call the external onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <label 
      htmlFor={uniqueId}
      className={`inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${containerClassName}`}
      data-blox="radio"
    >
      <div className={`relative ${className}`}>
        <input
          type="radio"
          id={uniqueId}
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onClick={handleClick}
          className={`peer appearance-none rounded-full ${getSizeClasses()} border 
          transition-colors focus:outline-none focus:ring-2 ${inputClassName}`}
          {...rest}
        />
        
        {/* Visible dot that appears when checked */}
        <div className={`absolute inset-0 flex items-center justify-center 
        pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity`}>
          <div className={`${getDotSizeClasses()} rounded-full bg-current`}></div>
        </div>
      </div>
      
      {label && (
        <span className={`ml-2 ${disabled ? 'opacity-60' : ''} ${labelClassName}`}>
          {label}
        </span>
      )}
    </label>
  );
};