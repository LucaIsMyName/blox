import React, { useRef, useEffect, useState } from "react";
import { CheckboxProps } from "./types";

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked: controlledChecked, defaultChecked = false, disabled, required, indeterminate = false, size = "md", containerClassName = "", inputClassName = "", labelClassName = "", className = "", id, onChange, onClick, ...rest }) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  // Use ref to access the checkbox input element
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Apply indeterminate state via DOM property (not available as an attribute)
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Generate a unique ID if not provided
  const uniqueId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

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
      className={`inline-flex items-center ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${containerClassName}`}
      data-blox="checkbox">
      <div className={`relative ${className}`}>
        <input
          ref={checkboxRef}
          type="checkbox"
          id={uniqueId}
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onClick={handleClick}
          className={`peer appearance-none ${getSizeClasses()} border rounded transition-colors 
          focus:outline-none focus:ring-2 ${inputClassName}`}
          {...rest}
        />

        {/* Visible check mark that appears when checked */}
        <div
          className={`absolute inset-0 flex items-center justify-center 
        pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${getSizeClasses()} text-current`}>
            <polyline className="" points="18 5 9 17 5 12"></polyline>
          </svg>
        </div>

        {/* Indeterminate indicator */}
        {indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`h-[2px] w-[60%] bg-current rounded-full`}></div>
          </div>
        )}
      </div>

      {label && <span className={`ml-2 ${disabled ? "opacity-60" : ""} ${labelClassName}`}>{label}</span>}
    </label>
  );
};
