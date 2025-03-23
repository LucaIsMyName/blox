import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { AccordionProps, AccordionItemProps, AccordionContextType } from "./types";

// Create context for accordion state
const AccordionContext = createContext<AccordionContextType>({
  activeIndices: [],
  toggleItem: () => {},
  isItemActive: () => false,
});

// Accordion Item Component
const AccordionItem: React.FC<AccordionItemProps & { index: number }> = ({ title, content, isDisabled = false, index }) => {
  const { isItemActive, toggleItem } = useContext(AccordionContext);
  const isActive = isItemActive(index);

  // Variant classes will be applied to the parent Accordion component

  return (
    <div className="border-b border-gray-200">
      <button
        className={`flex justify-between w-full focus:outline-none ${isDisabled ? "opacity-50 cursor-not-allowed" : "focus:ring-2 focus:ring-offset-2"}`}
        onClick={() => !isDisabled && toggleItem(index)}
        disabled={isDisabled}
        aria-expanded={isActive}>
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isActive ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isActive && <div className="">{content}</div>}
    </div>
  );
};

// Main Accordion Component
export const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, defaultIndex = [], variant = "primary", className = "", ...rest }) => {
  // Convert single defaultIndex to array
  const initialIndices = useMemo(() => {
    if (typeof defaultIndex === "number") {
      return [defaultIndex];
    }
    return defaultIndex;
  }, [defaultIndex]);

  // State for active indices
  const [activeIndices, setActiveIndices] = useState<number[]>(initialIndices);

  // Toggle accordion item
  const toggleItem = useCallback(
    (index: number) => {
      setActiveIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((i) => i !== index);
        } else {
          return allowMultiple ? [...prevIndices, index] : [index];
        }
      });
    },
    [allowMultiple]
  );

  // Check if an item is active
  const isItemActive = useCallback(
    (index: number) => {
      return activeIndices.includes(index);
    },
    [activeIndices]
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      activeIndices,
      toggleItem,
      isItemActive,
    }),
    [activeIndices, toggleItem, isItemActive]
  );

  // Variant classes
  const variantClasses = {
    primary: "",
    secondary: "",
    success: "",
    danger: "",
    warning: "",
    info: "",
    light: "",
    dark: "",
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        data-blox="accordion"
        className={`${variantClasses[variant]} overflow-hidden ${className}`}
        {...rest}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            {...item}
            index={index}
          />
        ))}
      </div>
    </AccordionContext.Provider>
  );
};
