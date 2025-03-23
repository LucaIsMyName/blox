import React, { useEffect } from "react";
import { BadgeProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Badge: React.FC<BadgeProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<BadgeProps>("Badge");
  const { children, variant = config.props.variant || "primary", size = config.props.size || "md", pill = config.props.pill || false, dot = config.props.dot || false, outlined = config.props.outlined || false, className = "", onClick, ...rest } = props;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Badge");
  }, []);

  // Base classes
  const baseClasses = "border inline-flex items-center justify-center";

  // Size classes
  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
    xl: "text-base px-3.5 py-1",
  };

  // Border radius classes
  const radiusClass = pill ? "rounded-full" : "rounded";

  // Get cursor class based on onClick presence
  const cursorClass = onClick ? "cursor-pointer" : "";

  // Build style object with CSS variables
  const style = {
    backgroundColor: outlined ? "transparent" : `var(--blox-badge-bg-color, var(--blox-color-${variant}-500, #0ea5e9))`,
    color: outlined ? `var(--blox-badge-outlined-color, var(--blox-color-${variant}-700,  #0369a1))` : `var(--blox-badge-text-color, white)`,
    borderColor: outlined ? `var(--blox-badge-border-color, var(--blox-color-${variant}-500,  #0ea5e9))` : "transparent",
    borderWidth: outlined ? "var(--blox-badge-border-width, 1px)" : 0,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${radiusClass} ${cursorClass} ${className}`}
      style={style}
      onClick={onClick}
      {...rest}>
      {dot && (
        <span
          className="inline-block h-2 w-2 rounded-full mr-1.5"
          style={{
            backgroundColor: `var(--blox-badge-dot-color, var(--blox-color-${variant}-400, #38bdf8))`,
          }}
        />
      )}
      {children}
    </button>
  );
};
