// Toggle.tsx
import React, { useRef, useState, useContext, createContext, useEffect } from "react";
import { ToggleProps, ToggleGroupProps, ToggleGroupContextValue, ToggleComposition } from "./types";

// Create context for the toggle group
const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

// Hook to use toggle group context
const useToggleGroup = () => {
  const context = useContext(ToggleGroupContext);
  return context;
};

// Standalone Toggle component
const Toggle: React.FC<ToggleProps> & ToggleComposition = ({ pressed, defaultPressed, onChange, value, disabled = false, className = "", children, ...props }) => {
  // Get toggle group context (if any)
  const groupContext = useToggleGroup();

  // Determine if we're controlled internally or by the group
  const isGrouped = groupContext !== null;

  // For non-grouped usage, manage internal pressed state
  const [internalPressed, setInternalPressed] = useState<boolean>(defaultPressed ?? false);

  // Determine if this toggle is pressed based on group context or internal state
  const isPressed = isGrouped ? (groupContext!.type === "single" ? groupContext!.value === value : Array.isArray(groupContext!.value) && value !== undefined ? groupContext!.value.includes(value) : false) : pressed !== undefined ? pressed : internalPressed;

  // Handle toggle press
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // If disabled, do nothing
    if (disabled || (isGrouped && groupContext!.disabled)) {
      event.preventDefault();
      return;
    }

    // If part of a group, update group value
    if (isGrouped && value !== undefined) {
      groupContext!.updateValue(value, !isPressed);
    } else {
      // Otherwise update internal state for uncontrolled usage
      if (pressed === undefined) {
        setInternalPressed(!internalPressed);
      }

      // Call onChange handler if provided
      if (onChange) {
        onChange(!isPressed, event);
      }
    }
  };

  return (
    <button
      type="button"
      role="button"
      aria-pressed={isPressed}
      disabled={disabled || (isGrouped && groupContext!.disabled)}
      className={`blox-toggle ${isPressed ? "blox-toggle-pressed" : ""} ${className}`}
      data-blox-toggle=""
      data-pressed={isPressed ? "true" : "false"}
      data-disabled={disabled || (isGrouped && groupContext!.disabled) ? "true" : "false"}
      onClick={handleToggle}
      {...props}>
      {children}
    </button>
  );
};

// Toggle Group component
const ToggleGroup: React.FC<ToggleGroupProps> = ({ children, type = "single", value, defaultValue, onChange, allowDeselect = false, disabled = false, className = "", orientation = "horizontal", spacing = "normal" }) => {
  // Store the internal value for uncontrolled usage
  const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue ?? (type === "single" ? "" : []));

  // Determine if we're controlled or uncontrolled
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handle value updates from toggle items
  const updateValue = (itemValue: string, pressed: boolean) => {
    let newValue: string | string[];

    if (type === "single") {
      // For single selection, set the value to the item value or empty if deselecting
      newValue = pressed ? itemValue : allowDeselect ? "" : itemValue;
    } else {
      // For multiple selection, add or remove the item value from the array
      const valueArray = Array.isArray(currentValue) ? currentValue : [];
      newValue = pressed ? [...valueArray, itemValue] : valueArray.filter((v) => v !== itemValue);
    }

    // Update internal state for uncontrolled usage
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Call onChange handler if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  // Create the context value for children
  const contextValue: ToggleGroupContextValue = {
    type,
    value: currentValue,
    updateValue,
    disabled,
    allowDeselect,
  };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        role="group"
        className={`blox-toggle-group ${className}`}
        data-blox-toggle-group=""
        data-orientation={orientation}
        data-spacing={spacing}
        data-disabled={disabled ? "true" : "false"}
        style={{
          display: "flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          gap: spacing === "none" ? "" : spacing === "compact" ? "var(--blox-toggle-spacing-1, 0.25rem)" : spacing === "loose" ? "var(--blox-toggle-spacing-3, 0.75rem)" : "var(--blox-toggle-spacing-2, 0.5rem)",
        }}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

// Attach Group component to Toggle
Toggle.Group = ToggleGroup;

export default Toggle;
