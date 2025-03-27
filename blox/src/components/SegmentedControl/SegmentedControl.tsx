// SegmentedControl.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { SegmentedControlProps, SegmentItemProps, SegmentedControlContextType, SegmentedControlComposition } from "./types";

// Create context for segmented control state
const SegmentedControlContext = createContext<SegmentedControlContextType>({
  selectedValue: null,
  onChange: () => {},
  allowDeselect: false,
  disabled: false,
});

// Hook to use segmented control context
const useSegmentedControl = () => {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error("useSegmentedControl must be used within a SegmentedControl component");
  }
  return context;
};

// Segment Item Component
const SegmentItem: React.FC<SegmentItemProps> = ({ value, disabled = false, children, className = "", ...props }) => {
  const { selectedValue, onChange, allowDeselect, disabled: controlDisabled } = useSegmentedControl();
  const isSelected = selectedValue === value;
  const isDisabled = disabled || controlDisabled;

  const handleClick = () => {
    if (isDisabled) return;

    if (isSelected && allowDeselect) {
      onChange("");
    } else if (!isSelected) {
      onChange(value);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={isDisabled}
      className={`blox-segment-item ${className}`}
      data-blox-segment-item=""
      data-state={isSelected ? "selected" : "unselected"}
      data-disabled={isDisabled ? "true" : "false"}
      onClick={handleClick}
      {...props}>
      {children}
    </button>
  );
};

// Main SegmentedControl Component
const SegmentedControl: React.FC<SegmentedControlProps> & SegmentedControlComposition = ({ value, defaultValue = "", onChange, allowDeselect = false, disabled = false, children, className = "", ...props }) => {
  // For internal state (uncontrolled mode)
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  // Determine if we're in controlled mode
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  // Handle value change
  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }

      if (onChange) {
        onChange(newValue);
      }
    },
    [isControlled, onChange]
  );

  // Context value
  const contextValue = {
    selectedValue,
    onChange: handleChange,
    allowDeselect,
    disabled,
  };

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        className={`blox-segmented-control ${className}`}
        data-blox-segmented-control=""
        data-disabled={disabled ? "true" : "false"}
        {...props}>
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
};

// Attach sub-components
SegmentedControl.Item = SegmentItem;

export default SegmentedControl;
