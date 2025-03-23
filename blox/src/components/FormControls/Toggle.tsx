import React, { useState } from "react";
import { ToggleProps } from "./types";

export const Toggle: React.FC<ToggleProps> = ({ label, checked: controlledChecked, defaultChecked = false, disabled, required, size = "md", containerClassName = "", inputClassName = "", trackClassName = "", thumbClassName = "", labelClassName = "", className = "", id, variant = "", onChange, onClick, ...rest }) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  // Generate a unique ID if not provided
  const uniqueId = id || `toggle-${Math.random().toString(36).substring(2, 9)}`;

  // Size classes for the toggle track and thumb
  const getTrackSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-7 h-4";
      case "lg":
        return "w-14 h-7";
      case "md":
      default:
        return "w-10 h-5";
    }
  };

  const getThumbSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-[calc(theme(size.4)+1px)] h-[calc(theme(size.4)+1px)]";
      case "lg":
        return "w-[calc(theme(size.6)+1px)] h-[calc(theme(size.6)+1px)]";
      case "md":
      default:
        return "w-[calc(theme(size.5)+1px)] h-[calc(theme(size.5)+1px)]";
    }
  };

  const getThumbTransform = () => {
    switch (size) {
      case "sm":
        return "translate-x-3";
      case "lg":
        return "translate-x-7";
      case "md":
      default:
        return "translate-x-5";
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
      data-blox="toggle">
      <span className={`relative ${className}`}>
        <input
          type="checkbox"
          id={uniqueId}
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onClick={handleClick}
          className={`sr-only ${inputClassName}`}
          {...rest}
        />

        {/* Track (background) */}
        <span
          style={{
            borderWidth: rest.hasBorder ? "1px" : "0",
            borderColor: isChecked ? `var(--blox-toggle-active-border-color, var(--blox-color-${variant || ""}-300, rgba(0,0,0,0.1)))` : `var(--blox-toggle-inactive-border-color, var(--blox-color-${variant || ""}-300, rgba(0,0,0,0.1)))`,
            backgroundColor: `var(--blox-toggle-active-bg-color, var(--blox-color-${variant || ""}-300, rgba(0,0,0,0.1)))`,
          }}
          className={`block ${getTrackSizeClasses()} rounded-full transition-colors ${trackClassName}`}
          aria-hidden="true">
          {/* Thumb (circle that moves) */}
          <span
            style={{
              backgroundColor: isChecked ? "var(--blox-toggle-dot-active-bg-color, var(--blox-color-primary-600, lightblue))" : "#fff",
            }}
            className={`block rounded-full ${getThumbSizeClasses()} transform transition-transform ${isChecked ? `${getThumbTransform()}` : "translate-x-0"} ${thumbClassName}`}
            aria-hidden="true"
          />
        </span>
      </span>

      {label && <span className={`ml-2 ${disabled ? "opacity-60" : ""} ${labelClassName}`}>{label}</span>}
    </label>
  );
};
