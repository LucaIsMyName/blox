import React, { useEffect } from "react";
import { BreadcrumbProps, BreadcrumbItem } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

// Home icon SVG
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

// Default separator
const DefaultSeparator = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// Ellipsis (when items are collapsed)
const Ellipsis = () => <span>...</span>;

export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<BreadcrumbProps>("Breadcrumb");
  const { items, variant = config.props.variant || "", separator = config.props.separator || <DefaultSeparator />, showHomeIcon = config.props.showHomeIcon || false, maxItems = config.props.maxItems || 0, className = "", ...rest } = props;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Breadcrumb");
  }, []);

  // If there are no items, don't render anything
  if (!items || items.length === 0) return null;

  // Determine which items to display based on maxItems
  const visibleItems = React.useMemo(() => {
    if (!maxItems || maxItems >= items.length || maxItems < 3) {
      return items;
    }

    // Always show first and last item when collapsing
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Calculate how many middle items to show
    const middleItems = maxItems - 2;
    const startIdx = 1;
    const endIdx = items.length - 1;

    if (middleItems <= 0) {
      // If we can only show first and last, return them with an ellipsis
      return [firstItem, { label: <Ellipsis />, href: "", isActive: false }, lastItem];
    } else {
      // Distribute middle items from the end
      const middleStartIdx = endIdx - middleItems;

      return [firstItem, { label: <Ellipsis />, href: "", isActive: false }, ...items.slice(middleStartIdx, endIdx), lastItem];
    }
  }, [items, maxItems]);

  // Render a single breadcrumb item
  const renderItem = (item: BreadcrumbItem, index: number, isFirst: boolean, isLast: boolean) => {
    // Determine if we should show the home icon
    const showIcon = isFirst && showHomeIcon;
    const icon = showIcon ? <HomeIcon /> : item.icon;

    // For the last (active) item, use a span instead of an a
    const isItemActive = item.isActive || isLast;

    // Style for the item based on whether it's active
    const itemStyle = {
      color: isItemActive ? `var(--blox-breadcrumb-active-color, var(--blox-color-${variant}-700,  #000))` : `var(--blox-breadcrumb-color, var(--blox-color-${variant}-600, #000))`,
      fontWeight: isItemActive ? "var(--blox-breadcrumb-active-font-weight, 400)" : "normal",
    };

    // Style for the separator
    const separatorStyle = {
      color: ` var(--blox-breadcrumb-separator-color, var(--blox-color-${variant}-400, black))`,
    };

    return (
      <li
        key={index}
        className="flex items-center">
        {/* Separator between items (not for the first item) */}
        {!isFirst && (
          <span
            className="mx-2 flex items-center"
            style={separatorStyle}
            aria-hidden="true">
            {separator}
          </span>
        )}

        {/* The breadcrumb item */}
        {isItemActive || !item.href ? (
          <span
            className="flex items-center"
            style={itemStyle}
            aria-current={isItemActive ? "page" : undefined}>
            {icon && <span className="mr-1.5">{icon}</span>}
            {item.label}
          </span>
        ) : (
          <a
            href={item.href}
            className="flex items-center hover:underline"
            style={itemStyle}
            onClick={item.onClick}>
            {icon && <span className="mr-1.5">{icon}</span>}
            {item.label}
          </a>
        )}
      </li>
    );
  };

  // Container style
  const containerStyle = {
    backgroundColor: `var(--blox-breadcrumb-bg-color, transparent)`,
  };

  return (
    <nav
      data-blox-breadcrumb
      aria-label="Breadcrumb"
      className={` ${className}`}
      style={containerStyle}
      {...rest}>
      <ol className="flex flex-wrap items-center">{visibleItems.map((item, index) => renderItem(item, index, index === 0, index === visibleItems.length - 1))}</ol>
    </nav>
  );
};
