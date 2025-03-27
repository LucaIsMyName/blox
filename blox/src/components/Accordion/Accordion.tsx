// Accordion.tsx
import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { AccordionProps, AccordionContextType, AccordionItemProps, AccordionButtonProps, AccordionPanelProps, AccordionItemContextType, AccordionComposition } from "./types";

// Create context for accordion state
const AccordionContext = createContext<AccordionContextType>({
  activeIndices: [],
  toggleItem: () => {},
  isItemActive: () => false,
});

// Create context for each accordion item
const AccordionItemContext = createContext<AccordionItemContextType>({
  isActive: false,
  isDisabled: false,
  index: -1,
  toggleItem: () => {},
});

// Hook to use accordion context
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion component");
  }
  return context;
};

// Hook to use accordion item context
const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem component");
  }
  return context;
};

// Accordion Item Component
const AccordionItem: React.FC<AccordionItemProps> = ({ children, isDisabled = false, index: providedIndex, className = "", ...props }) => {
  const { activeIndices, toggleItem, isItemActive } = useAccordion();

  // If index is not provided, we'll warn but not throw
  const index = providedIndex ?? -1;
  if (index === -1) {
    console.warn("AccordionItem: index prop is required for proper functioning");
  }

  const isActive = isItemActive(index);

  // Context value for this item
  const itemContextValue = useMemo(
    () => ({
      isActive,
      isDisabled,
      index,
      toggleItem: () => toggleItem(index),
    }),
    [isActive, isDisabled, index, toggleItem]
  );

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div
        className={`blox-accordion-item ${className}`}
        data-blox-accordion-item=""
        data-active={isActive ? "true" : "false"}
        data-disabled={isDisabled ? "true" : "false"}
        {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

// Accordion Button Component
const AccordionButton: React.FC<AccordionButtonProps> = ({ children, className = "", ...props }) => {
  const { isActive, isDisabled, toggleItem } = useAccordionItem();

  return (
    <button
      className={`blox-accordion-button ${className}`}
      onClick={() => !isDisabled && toggleItem()}
      disabled={isDisabled}
      aria-expanded={isActive}
      data-blox-accordion-button=""
      data-active={isActive ? "true" : "false"}
      data-disabled={isDisabled ? "true" : "false"}
      type="button"
      {...props}>
      {children}
    </button>
  );
};

// Accordion Panel Component
const AccordionPanel: React.FC<AccordionPanelProps> = ({ children, className = "", ...props }) => {
  const { isActive } = useAccordionItem();

  if (!isActive) return null;

  return (
    <div
      className={`blox-accordion-panel ${className}`}
      data-blox-accordion-panel=""
      {...props}>
      {children}
    </div>
  );
};

// Main Accordion Component
const Accordion: React.FC<AccordionProps> & AccordionComposition = ({ children, allowMultiple = false, defaultIndex = [], activeIndices: controlledActiveIndices, onChange, className = "", ...props }) => {
  // Convert single defaultIndex to array
  const initialIndices = useMemo(() => {
    if (typeof defaultIndex === "number") {
      return [defaultIndex];
    }
    return defaultIndex as number[];
  }, [defaultIndex]);

  // State for active indices (for uncontrolled usage)
  const [internalActiveIndices, setInternalActiveIndices] = useState<number[]>(initialIndices);

  // Determine if we're controlled or not
  const isControlled = controlledActiveIndices !== undefined;
  const activeIndices = isControlled ? controlledActiveIndices : internalActiveIndices;

  // Toggle accordion item
  const toggleItem = useCallback(
    (index: number) => {
      const updatedIndices = activeIndices.includes(index) ? activeIndices.filter((i) => i !== index) : allowMultiple ? [...activeIndices, index] : [index];

      // Update internal state for uncontrolled usage
      if (!isControlled) {
        setInternalActiveIndices(updatedIndices);
      }

      // Call onChange callback
      onChange?.(updatedIndices);
    },
    [activeIndices, allowMultiple, isControlled, onChange]
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

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={`blox-accordion ${className}`}
        data-blox-accordion=""
        data-allow-multiple={allowMultiple ? "true" : "false"}
        {...props}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          // Auto-inject index if not provided
          return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
            index: (child as React.ReactElement<AccordionItemProps>).props.index ?? index,
          });
        })}
      </div>
    </AccordionContext.Provider>
  );
};

// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;

export default Accordion;
