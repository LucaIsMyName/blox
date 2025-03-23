import React, { useEffect, useState, useRef } from "react";
import { TabsProps, TabItem } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Tabs: React.FC<TabsProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<TabsProps>("Tabs");
  const { items, activeTab, onChange, defaultActiveTab, variant = config.props.variant || "", orientation = config.props.orientation || "horizontal", variantStyle = config.props.variantStyle || "line", fullWidth = config.props.fullWidth || false, animated = config.props.animated !== undefined ? config.props.animated : true, tabListClassName = "", tabPanelClassName = "", alwaysRenderContent = config.props.alwaysRenderContent || false, leftContent, rightContent, className = "", ...rest } = props;

  // State for selected tab (uncontrolled mode)
  const [selectedTab, setSelectedTab] = useState<string>(activeTab || defaultActiveTab || (items.length > 0 ? items[0].id : ""));

  // Indicator element ref for line and enclosed variants
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Tabs");
  }, []);

  // Update selected tab when activeTab prop changes (controlled mode)
  useEffect(() => {
    if (activeTab !== undefined) {
      setSelectedTab(activeTab);
    }
  }, [activeTab]);

  // Update indicator position when selectedTab changes
  useEffect(() => {
    if ((variantStyle === "line" || variantStyle === "enclosed") && indicatorRef.current) {
      const activeTabElement = tabsRef.current[selectedTab];
      if (activeTabElement) {
        if (orientation === "horizontal") {
          indicatorRef.current.style.left = `${activeTabElement.offsetLeft}px`;
          indicatorRef.current.style.width = `${activeTabElement.offsetWidth}px`;
          indicatorRef.current.style.top = "";
          indicatorRef.current.style.height = "";
        } else {
          indicatorRef.current.style.top = `${activeTabElement.offsetTop}px`;
          indicatorRef.current.style.height = `${activeTabElement.offsetHeight}px`;
          indicatorRef.current.style.left = "";
          indicatorRef.current.style.width = "";
        }
      }
    }
  }, [selectedTab, orientation, variantStyle, items]);

  // Tab change handler
  const handleTabChange = (tabId: string) => {
    if (onChange) {
      onChange(tabId);
    }
    if (activeTab === undefined) {
      setSelectedTab(tabId);
    }
  };

  // Get the active tab content
  const activeTabContent = items.find((item) => item.id === selectedTab)?.content;

  // Base classes
  const baseClasses = "";

  // Orientation classes
  const orientationClasses = {
    horizontal: "",
    vertical: "flex",
  };

  // Variant style for the container
  const getContainerStyle = () => {
    return {
      backgroundColor: `var(--blox-tabs-bg-color, transparent)`,
    };
  };

  // Tab list style based on orientation and variant
  const getTabListStyle = () => {
    const style: React.CSSProperties = {
      borderColor: `var(--blox-tabs-border-color, var(--blox-color-${variant}-200,  #000))`,
    };

    if (orientation === "horizontal") {
      if (variantStyle === "enclosed") {
        style.borderBottom = `0 solid ${style.borderColor}`;
      } else if (variantStyle === "line") {
        style.borderBottom = `0 solid ${style.borderColor}`;
      }
    } else {
      if (variantStyle === "enclosed") {
        style.borderRight = `0 solid ${style.borderColor}`;
      } else if (variantStyle === "line") {
        style.borderRight = `0 solid ${style.borderColor}`;
      }
    }

    return style;
  };

  // Get style for a specific tab
  const getTabStyle = (item: TabItem) => {
    const isActive = item.id === selectedTab;
    const isDisabled = item.disabled;

    // Base style
    const style: React.CSSProperties = {
      color: isActive ? ` var(--blox-tabs-active-color, var(--blox-color-${variant}-700,#000))` : isDisabled ? `var(--blox-tabs-disabled-color, #000)` : `var(--blox-color-${variant}-600, var(--blox-tabs-color, #000))`,
      cursor: isDisabled ? "not-allowed" : "pointer",
    };

    // Add variant-specific styles
    if (variantStyle === "enclosed" && isActive) {
      style.backgroundColor = `var(--blox-tabs-active-bg, white)`;
      if (orientation === "horizontal") {
        style.borderColor = `var(--blox-tabs-border-color, var(--blox-color-${variant}-200,  #000))`;
        style.borderWidth = "var(--blox-border-width, 1px)";
        style.marginBottom = "-1px";
      } else {
        style.borderColor = `var(--blox-tabs-border-color, var(--blox-color-${variant}-200,  #000))`;
        style.borderWidth = "var(--blox-border-width, 1px)";
        style.marginRight = "-1px";
      }
    } else if (variantStyle === "soft-rounded" || variantStyle === "pill") {
      if (isActive) {
        style.backgroundColor = `var(--blox-tabs-soft-active-bg, var(--blox-color-${variant}-100,  #e9e9e9))`;
      }
    } else if (variantStyle === "rounded") {
      style.border = `1px solid ${isActive ? `var(--blox-tabs-rounded-active-border, var(--blox-color-${variant}-400,  #000))` : "transparent"}`;
      if (isActive) {
        style.backgroundColor = `var(--blox-tabs-rounded-active-bg, white)`;
      }
    }

    return style;
  };

  // Get style for the indicator
  const getIndicatorStyle = () => {
    return {
      backgroundColor: `var(--blox-tabs-indicator-color, var(--blox-color-${variant}-500, #000))`,
      transition: animated ? "all 0.2s ease-in-out" : "none",
    };
  };

  // Render each tab button
  const renderTab = (item: TabItem, index: number) => {
    const isActive = item.id === selectedTab;
    const isDisabled = item.disabled;

    // Tab classes based on variant style
    let tabClasses = "flex items-center outline-none focus:ring-2 focus:ring-offset-2";

    if (variantStyle === "rounded") {
      tabClasses += " rounded-sm";
    } else if (variantStyle === "soft-rounded") {
      tabClasses += " rounded-md";
    } else if (variantStyle === "pill") {
      tabClasses += " rounded-full";
    }

    if (fullWidth && orientation === "horizontal") {
      tabClasses += " flex-1 justify-center";
    }

    return (
      <button
        key={item.id}
        id={`tab-${item.id}`}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${item.id}`}
        tabIndex={isActive ? 0 : -1}
        disabled={isDisabled}
        onClick={() => !isDisabled && handleTabChange(item.id)}
        className={tabClasses}
        style={getTabStyle(item)}
        ref={(el) => (tabsRef.current[item.id] = el)}>
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </button>
    );
  };

  // Render the tab indicator for line and enclosed variants
  const renderIndicator = () => {
    if (variantStyle !== "line" && variantStyle !== "enclosed") return null;

    const indicatorClasses = orientation === "horizontal" ? "absolute bottom-0 h-0.5" : "absolute left-0 w-0.5";

    return (
      <div
        ref={indicatorRef}
        className={indicatorClasses}
        style={getIndicatorStyle()}
      />
    );
  };

  // Render tab panels
  const renderTabPanels = () => {
    return (
      <div className={`blox-tab-panels ${tabPanelClassName}`}>
        {alwaysRenderContent ? (
          items.map((item) => (
            <div
              key={item.id}
              id={`tabpanel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              hidden={item.id !== selectedTab}
              className={item.id === selectedTab ? "block" : "hidden"}>
              {item.content}
            </div>
          ))
        ) : (
          <div
            id={`tabpanel-${selectedTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedTab}`}>
            {activeTabContent}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${baseClasses} ${orientationClasses[orientation]} ${className}`}
      style={getContainerStyle()}
      {...rest}>
      <div
        className={`blox-tab-list relative ${orientation === "horizontal" ? "flex" : "flex-col"} ${tabListClassName}`}
        role="tablist"
        aria-orientation={orientation}
        style={getTabListStyle()}>
        {leftContent && <div className="flex items-center mr-2">{leftContent}</div>}
        {items.map(renderTab)}
        {rightContent && <div className="flex items-center ml-2">{rightContent}</div>}
        {renderIndicator()}
      </div>

      <div className={orientation === "horizontal" ? "pt-4" : "pl-4"}>{renderTabPanels()}</div>
    </div>
  );
};
