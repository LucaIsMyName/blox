// Dropdown.tsx
import React, { useRef, useState, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { DropdownProps, DropdownTriggerProps, DropdownMenuProps, DropdownItemProps, DropdownContextValue, DropdownComposition } from "./types";

// Create context for dropdown state
const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  toggle: () => {},
  open: () => {},
  close: () => {},
  isDisabled: false,
});

// Hook to use dropdown context
const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a Dropdown component");
  }
  return context;
};

// Dropdown Trigger Component
const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, disabled, className = "", ...props }) => {
  const { isOpen, toggle, isDisabled } = useDropdown();
  const finalDisabled = disabled || isDisabled;

  return (
    <button
      type="button"
      className={`blox-dropdown-trigger ${className}`}
      onClick={toggle}
      disabled={finalDisabled}
      aria-haspopup="true"
      aria-expanded={isOpen}
      data-blox-dropdown-trigger=""
      data-state={isOpen ? "open" : "closed"}
      data-disabled={finalDisabled ? "true" : "false"}
      {...props}>
      {children}
    </button>
  );
};

// Dropdown Menu Component
const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, className = "", ...props }) => {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      className={`blox-dropdown-menu ${className}`}
      data-blox-dropdown-menu=""
      data-state={isOpen ? "open" : "closed"}
      role="menu"
      style={{
        position: "absolute",
      }}
      {...props}>
      {children}
    </div>
  );
};

// Dropdown Item Component
const DropdownItem: React.FC<DropdownItemProps> = ({ children, value, disabled = false, selected, onSelect, className = "", ...props }) => {
  const { onValueChange, close, selectedValue } = useDropdown();
  const isSelected = selected !== undefined ? selected : selectedValue === value;

  const handleClick = () => {
    if (disabled) return;

    if (onSelect) {
      onSelect(value);
    }

    if (onValueChange) {
      onValueChange(value);
    }

    close();
  };

  return (
    <div
      className={`blox-dropdown-item ${className}`}
      onClick={handleClick}
      data-blox-dropdown-item=""
      data-disabled={disabled ? "true" : "false"}
      data-selected={isSelected ? "true" : "false"}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}>
      {children}
    </div>
  );
};

// Main Dropdown Component
const Dropdown: React.FC<DropdownProps> & DropdownComposition = ({ isOpen: controlledIsOpen, onOpenChange, value, onChange, disabled = false, children, placement = "bottom-start", className = "", width, onClickOutside, name, ...props }) => {
  // For internal state (uncontrolled mode)
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | undefined>(value);

  // Reference to the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if we're in controlled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Update internal value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Toggle dropdown
  const toggle = () => {
    if (disabled) return;

    const newState = !isOpen;

    if (!isControlled) {
      setInternalIsOpen(newState);
    }

    onOpenChange?.(newState);
  };

  // Open dropdown
  const open = () => {
    if (disabled || isOpen) return;

    if (!isControlled) {
      setInternalIsOpen(true);
    }

    onOpenChange?.(true);
  };

  // Close dropdown
  const close = () => {
    if (!isOpen) return;

    if (!isControlled) {
      setInternalIsOpen(false);
    }

    onOpenChange?.(false);
  };

  // Handle value change
  const handleValueChange = (newValue: string | number) => {
    if (disabled) return;

    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        if (onClickOutside) {
          onClickOutside();
        } else {
          close();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClickOutside]);

  // Context value
  const contextValue = {
    isOpen,
    toggle,
    open,
    close,
    selectedValue: value !== undefined ? value : internalValue,
    onValueChange: handleValueChange,
    isDisabled: disabled,
  };

  // Calculate width style
  const widthStyle = width ? { width: width === true ? "100%" : width } : {};

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        ref={dropdownRef}
        className={`blox-dropdown ${className}`}
        data-blox-dropdown=""
        data-state={isOpen ? "open" : "closed"}
        data-disabled={disabled ? "true" : "false"}
        data-placement={placement}
        style={widthStyle}
        {...props}>
        {children}

        {/* Hidden input for form submissions */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value !== undefined ? value : internalValue || ""}
          />
        )}
      </div>
    </DropdownContext.Provider>
  );
};

// Attach sub-components
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
