import { jsx as _jsx } from "react/jsx-runtime";
// Accordion.tsx
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
// Create context for accordion state
const AccordionContext = createContext({
    activeIndices: [],
    toggleItem: () => { },
    isItemActive: () => false,
});
// Create context for each accordion item
const AccordionItemContext = createContext({
    isActive: false,
    isDisabled: false,
    index: -1,
    toggleItem: () => { },
});
// Hook to use accordion context
const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('useAccordion must be used within an Accordion component');
    }
    return context;
};
// Hook to use accordion item context
const useAccordionItem = () => {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error('useAccordionItem must be used within an AccordionItem component');
    }
    return context;
};
// Accordion Item Component
const AccordionItem = ({ children, isDisabled = false, index: providedIndex, className = '', ...props }) => {
    const { activeIndices, toggleItem, isItemActive } = useAccordion();
    // If index is not provided, we'll warn but not throw
    const index = providedIndex !== null && providedIndex !== void 0 ? providedIndex : -1;
    if (index === -1) {
        console.warn('AccordionItem: index prop is required for proper functioning');
    }
    const isActive = isItemActive(index);
    // Context value for this item
    const itemContextValue = useMemo(() => ({
        isActive,
        isDisabled,
        index,
        toggleItem: () => toggleItem(index),
    }), [isActive, isDisabled, index, toggleItem]);
    return (_jsx(AccordionItemContext.Provider, { value: itemContextValue, children: _jsx("div", { className: `blox-accordion-item ${className}`, "data-blox-accordion-item": "", "data-active": isActive ? 'true' : 'false', "data-disabled": isDisabled ? 'true' : 'false', ...props, children: children }) }));
};
// Accordion Button Component
const AccordionButton = ({ children, className = '', ...props }) => {
    const { isActive, isDisabled, toggleItem } = useAccordionItem();
    return (_jsx("button", { className: `blox-accordion-button ${className}`, onClick: () => !isDisabled && toggleItem(), disabled: isDisabled, "aria-expanded": isActive, "data-blox-accordion-button": "", "data-active": isActive ? 'true' : 'false', "data-disabled": isDisabled ? 'true' : 'false', type: "button", ...props, children: children }));
};
// Accordion Panel Component
const AccordionPanel = ({ children, className = '', ...props }) => {
    const { isActive } = useAccordionItem();
    if (!isActive)
        return null;
    return (_jsx("div", { className: `blox-accordion-panel ${className}`, "data-blox-accordion-panel": "", ...props, children: children }));
};
// Main Accordion Component
const Accordion = ({ children, allowMultiple = false, defaultIndex = [], activeIndices: controlledActiveIndices, onChange, className = '', ...props }) => {
    // Convert single defaultIndex to array
    const initialIndices = useMemo(() => {
        if (typeof defaultIndex === 'number') {
            return [defaultIndex];
        }
        return defaultIndex;
    }, [defaultIndex]);
    // State for active indices (for uncontrolled usage)
    const [internalActiveIndices, setInternalActiveIndices] = useState(initialIndices);
    // Determine if we're controlled or not
    const isControlled = controlledActiveIndices !== undefined;
    const activeIndices = isControlled ? controlledActiveIndices : internalActiveIndices;
    // Toggle accordion item
    const toggleItem = useCallback((index) => {
        const updatedIndices = activeIndices.includes(index)
            ? activeIndices.filter((i) => i !== index)
            : allowMultiple
                ? [...activeIndices, index]
                : [index];
        // Update internal state for uncontrolled usage
        if (!isControlled) {
            setInternalActiveIndices(updatedIndices);
        }
        // Call onChange callback
        onChange === null || onChange === void 0 ? void 0 : onChange(updatedIndices);
    }, [activeIndices, allowMultiple, isControlled, onChange]);
    // Check if an item is active
    const isItemActive = useCallback((index) => {
        return activeIndices.includes(index);
    }, [activeIndices]);
    // Context value
    const contextValue = useMemo(() => ({
        activeIndices,
        toggleItem,
        isItemActive,
    }), [activeIndices, toggleItem, isItemActive]);
    return (_jsx(AccordionContext.Provider, { value: contextValue, children: _jsx("div", { className: `blox-accordion ${className}`, "data-blox-accordion": "", "data-allow-multiple": allowMultiple ? 'true' : 'false', ...props, children: React.Children.map(children, (child, index) => {
                var _a;
                if (!React.isValidElement(child))
                    return child;
                // Auto-inject index if not provided
                return React.cloneElement(child, {
                    index: (_a = child.props.index) !== null && _a !== void 0 ? _a : index,
                });
            }) }) }));
};
// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Button = AccordionButton;
Accordion.Panel = AccordionPanel;
export default Accordion;
//# sourceMappingURL=Accordion.js.map