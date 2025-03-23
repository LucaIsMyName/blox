import React, { useEffect, useState, useRef } from "react";
import { DropdownProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Dropdown: React.FC<DropdownProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<DropdownProps>("Dropdown");
  const { options = [], placeholder = "Select an option", variant = config.props.variant || "primary", size = config.props.size || "md", fullWidth = config.props.fullWidth || false, rounded = config.props.rounded || false, className = "", disabled, value, onChange, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | undefined>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Dropdown");
  }, []);

  // Update selected option when value prop changes
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Base classes using CSS variables
  const baseClasses = "inline-flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size classes using CSS variables for spacing and font sizes
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Border radius classes using CSS variables
  const getBorderRadiusClass = () => {
    if (rounded) {
      return "rounded-full";
    }
    return "rounded-none";
  };

  // Disabled classes
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  // Custom styles to apply CSS variables
  const customStyle = {
    backgroundColor: `var(--blox-dropdown-bg-color, var(--blox-color-${variant}-500, #0284c7))`,
    color: "var(--blox-dropdown-text-color, white)",
    border: "1px solid var(--blox-dropdown-border-color, rgba(0,0,0,0.2))",
  };

  // Handle option selection
  const handleSelectOption = (option: any) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    if (onChange) {
      // Create a synthetic event similar to a native select
      const syntheticEvent = {
        target: {
          value: option.value,
          name: rest.name,
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };

  // Find the selected option label
  const getSelectedLabel = () => {
    const selectedItem = options.find((option) => option.value === selectedOption);
    return selectedItem ? selectedItem.label : placeholder;
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      data-blox="dropdown">
      <div
        className={`${baseClasses} ${sizeClasses[size]} ${widthClasses} ${getBorderRadiusClass()} ${disabledClasses} ${className}`}
        style={customStyle}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        {...rest}>
        <span>{getSelectedLabel()}</span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown List */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-0 bg-white rounded-none shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.value === selectedOption ? "bg-gray-200" : ""}`}
              onClick={() => handleSelectOption(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Hidden native select for form submission */}
      <select
        value={selectedOption}
        onChange={onChange}
        className="sr-only"
        disabled={disabled}
        name={rest.name}>
        <option
          value=""
          disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
