// Tabs.tsx
import React, { createContext, useContext, useState, useEffect, memo } from "react";
import { TabsProps, TabListProps, TabProps, TabPanelsProps, TabPanelProps, TabsContextType, TabsComposition } from "./types";

// Create context for tabs state
const TabsContext = createContext<TabsContextType>({
  activeTabId: "",
  setActiveTabId: () => {},
  orientation: "horizontal",
  animated: true,
});

// Hook to use tabs context
const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within a Tabs component");
  }
  return context;
};

// TabList Component
const TabList: React.FC<TabListProps> = ({ children, orientation, className = "", ...props }) => {
  const { orientation: contextOrientation } = useTabs();
  const finalOrientation = orientation || contextOrientation;

  return (
    <div
      className={`blox-tab-list ${className}`}
      role="tablist"
      aria-orientation={finalOrientation}
      data-blox-tab-list=""
      data-orientation={finalOrientation}
      {...props}>
      {children}
    </div>
  );
};

// Tab Component
const Tab: React.FC<TabProps> = ({ id, children, disabled = false, className = "", ...props }) => {
  const { activeTabId, setActiveTabId } = useTabs();
  const isActive = activeTabId === id;

  const handleClick = () => {
    if (!disabled) {
      setActiveTabId(id);
    }
  };

  return (
    <button
      id={`blox-tab-${id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`blox-tabpanel-${id}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={`blox-tab ${className}`}
      data-blox-tab=""
      data-state={isActive ? "active" : "inactive"}
      data-disabled={disabled ? "true" : "false"}
      {...props}>
      {children}
    </button>
  );
};

// TabPanels Component
const TabPanels: React.FC<TabPanelsProps> = memo(({ children, className = "", ...props }) => {
  return (
    <div
      className={`blox-tab-panels ${className}`}
      data-blox-tab-panels=""
      {...props}>
      {children}
    </div>
  );
});

// TabPanel Component
const TabPanel: React.FC<TabPanelProps> = ({ tabId, children, className = "", ...props }) => {
  const { activeTabId, animated } = useTabs();
  const isActive = activeTabId === tabId;

  if (!isActive) return null;

  return (
    <div
      id={`blox-tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`blox-tab-${tabId}`}
      className={`blox-tab-panel ${className}`}
      data-blox-tab-panel=""
      data-state={isActive ? "active" : "inactive"}
      data-animated={animated ? "true" : "false"}
      {...props}>
      {children}
    </div>
  );
};

// Main Tabs Component
const Tabs: React.FC<TabsProps> & TabsComposition = ({ activeTab, defaultActiveTab, onChange, orientation = "horizontal", animated = true, children, className = "", ...props }) => {
  // For internal state (uncontrolled mode)
  const [internalActiveTabId, setInternalActiveTabId] = useState<string>(() => {
    // Try to find the first tab id from children if no default or active tab is provided
    if (defaultActiveTab) return defaultActiveTab;

    // This is just a fallback, preferably the user should provide defaultActiveTab
    return "";
  });

  // Determine if we're in controlled mode
  const isControlled = activeTab !== undefined;
  const activeTabId = isControlled ? activeTab : internalActiveTabId;

  // Handler for tab changes
  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTabId(tabId);
    }

    if (onChange) {
      onChange(tabId);
    }
  };

  // Update internal active tab when activeTab prop changes (controlled mode)
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTabId(activeTab);
    }
  }, [activeTab]);

  // Context value
  const contextValue = {
    activeTabId,
    setActiveTabId: handleTabChange,
    orientation,
    animated,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`blox-tabs ${className}`}
        data-blox-tabs=""
        data-orientation={orientation}
        {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
