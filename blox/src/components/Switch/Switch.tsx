// Switch.tsx
import React, { useRef, useState, useCallback } from "react";
import { SwitchProps } from "./types";

const Switch: React.FC<SwitchProps> = ({ checked, defaultChecked = false, onChange, disabled = false, required = false, id, name, value = "on", label, labelPosition = "right", className = "", thumbClassName = "", trackClassName = "", labelClassName = "", helperText, errorMessage, hasError = false, inputProps = {}, ...props }) => {
  // Generate a unique ID if one is not provided
  const uniqueId = useRef(id || `blox-switch-${Math.random().toString(36).substring(2, 9)}`).current;

  // For uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Determine if we're in controlled mode
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Handle change event
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = event.target.checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      if (onChange) {
        onChange(newChecked);
      }
    },
    [disabled, isControlled, onChange]
  );

  // Generate description ID if helper text or error message is provided
  const descriptionId = helperText || errorMessage ? `${uniqueId}-description` : undefined;

  return (
    <div
      className={`blox-switch-container ${className}`}
      data-blox-switch=""
      data-checked={isChecked ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      data-error={hasError ? "true" : "false"}
      data-required={required ? "true" : "false"}
      data-label-position={labelPosition}>
      <label
        htmlFor={uniqueId}
        className="blox-switch-wrapper"
        data-blox-switch-wrapper=""
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          flexDirection: labelPosition === "left" ? "row-reverse" : "row",
        }}
        {...props}>
        {/* Hidden input for accessibility and form submission */}
        <input
          type="checkbox"
          id={uniqueId}
          name={name}
          value={value}
          checked={isChecked}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className="blox-switch-input"
          data-blox-switch-input=""
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={descriptionId}
          style={{
            border: "0",
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: "0",
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          }}
          {...inputProps}
        />

        {/* The visual switch component */}
        <div
          className={`blox-switch-track ${trackClassName}`}
          data-blox-switch-track=""
          data-state={isChecked ? "checked" : "unchecked"}
          data-disabled={disabled ? "true" : "false"}
          style={{
            position: "relative",
            display: "inline-flex",
            flexShrink: 0,
            justifyContent: "flex-start",
            alignItems: "center",
            WebkitTapHighlightColor: "transparent",
            // These are just base styles to ensure the component is visible
            // The user should override these with their own styling
            width: "36px",
            height: "20px",
            borderRadius: "10px",
          }}>
          <div
            className={`blox-switch-thumb ${thumbClassName}`}
            data-blox-switch-thumb=""
            data-state={isChecked ? "checked" : "unchecked"}
            data-disabled={disabled ? "true" : "false"}
            style={{
              position: "absolute",
              top: "2px",
              left: "2px",
              // These transform properties create the sliding effect
              transform: isChecked ? "translateX(16px)" : "translateX(0)",
              transition: "transform 150ms",
              // These are just base styles to ensure the component is visible
              width: "16px",
              height: "16px",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Label */}
        {label && (
          <span
            className={`blox-switch-label ${labelClassName}`}
            data-blox-switch-label=""
            style={{
              marginLeft: labelPosition === "right" ? "8px" : "0",
              marginRight: labelPosition === "left" ? "8px" : "0",
            }}>
            {label}
          </span>
        )}
      </label>

      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <div
          id={descriptionId}
          className={`blox-switch-description ${hasError ? "blox-switch-error" : ""}`}
          data-blox-switch-description=""
          data-error={hasError ? "true" : "false"}
          style={{
            marginTop: "4px",
            fontSize: "0.875em",
          }}>
          {hasError ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

export default Switch;
