import React, { useEffect } from "react";
import { ButtonProps } from "./types";
import { getComponentConfig, injectComponentStyles } from "../../utils/configLoader";

export const Button: React.FC<ButtonProps> = (props) => {
  // Load component configuration and merge with props
  const config = getComponentConfig<ButtonProps>("Button");
  const { children, variant = config.props.variant || "primary", size = config.props.size || "md", isLoading = config.props.isLoading || false, leftIcon, rightIcon, fullWidth = config.props.fullWidth || false, rounded = config.props.rounded || false, className = "", disabled, asChild, ...rest } = props;

  // Inject component-specific styles on mount
  useEffect(() => {
    injectComponentStyles("Button");
  }, []);

  // Base classes using CSS variables
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size classes using CSS variables for spacing and font sizes
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Border radius classes using CSS variables
  const getBorderRadiusClass = () => {
    if (rounded) {
      return "rounded-full";
    }
    return "rounded-none";
  };

  const getAsChildElement = () => {
    if (props.asChild) {
      return "div";
    }
    return "button";
  };


  // Disabled classes
  const disabledClasses = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  // Custom styles to apply CSS variables
  const customStyle = {
    backgroundColor: `var(--blox-button-bg-color,var(--blox-color-${variant}-500,  #0284c7))`,
    color: "var(--blox-button-text-color, white)",
    border: "1px solid rgba(0,0,0,0.2)",
  };

  return (
    <>
      {asChild ? (
        <div
          className={`${baseClasses} ${sizeClasses[size]} ${widthClasses} ${getBorderRadiusClass()} ${disabledClasses} ${className}`}
          style={customStyle}
          {...rest}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </div>
      ) : (
        <button
          className={`${baseClasses} ${sizeClasses[size]} ${widthClasses} ${getBorderRadiusClass()} ${disabledClasses} ${className}`}
          style={customStyle}
          disabled={disabled || isLoading}
          {...rest}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
      )}
    </>
  );
};
