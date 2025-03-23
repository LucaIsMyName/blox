import React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, fullWidth = false, rounded = false, className = "", disabled, ...rest }) => {
  // Base classes
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Size classes
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
    info: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    light: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Border radius classes
  const roundedClasses = rounded ? "rounded-full" : "rounded-md";

  // Disabled classes
  const disabledClasses = disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${roundedClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
