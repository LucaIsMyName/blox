import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Checkbox.tsx
import { useRef, useEffect } from 'react';
const Checkbox = ({ label, checked, defaultChecked, onChange, indeterminate = false, disabled = false, required = false, className = '', inputClassName = '', labelClassName = '', id, labelProps = {}, labelPosition = 'right', helperText, errorMessage, hasError = false, ...props }) => {
    // Generate a unique ID if one is not provided
    const uniqueId = useRef(id || `blox-checkbox-${Math.random().toString(36).substring(2, 9)}`).current;
    // Reference to the input element
    const inputRef = useRef(null);
    // Set indeterminate state on mount and update
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);
    // Handle change event
    const handleChange = (event) => {
        if (disabled)
            return;
        if (onChange) {
            onChange(event.target.checked, event);
        }
    };
    // Determine whether we're controlled or uncontrolled
    const isControlled = checked !== undefined;
    return (_jsxs("div", { className: `blox-checkbox-container ${className}`, "data-blox-checkbox": "", "data-checked": isControlled ? (checked ? 'true' : 'false') : undefined, "data-indeterminate": indeterminate ? 'true' : 'false', "data-disabled": disabled ? 'true' : 'false', "data-error": hasError ? 'true' : 'false', "data-required": required ? 'true' : 'false', "data-label-position": labelPosition, children: [_jsx("input", { ref: inputRef, type: "checkbox", id: uniqueId, checked: checked, defaultChecked: !isControlled ? defaultChecked : undefined, onChange: handleChange, disabled: disabled, required: required, className: `blox-checkbox-input ${inputClassName}`, "data-blox-checkbox-input": "", "aria-invalid": hasError, "aria-describedby": (helperText || errorMessage) ?
                    `${uniqueId}-description` :
                    undefined, ...props }), label && (_jsx("label", { htmlFor: uniqueId, className: `blox-checkbox-label ${labelClassName}`, "data-blox-checkbox-label": "", ...labelProps, children: label })), (helperText || errorMessage) && (_jsx("div", { id: `${uniqueId}-description`, className: `blox-checkbox-description ${hasError ? 'blox-checkbox-error' : ''}`, "data-blox-checkbox-description": "", "data-error": hasError ? 'true' : 'false', children: hasError ? errorMessage : helperText }))] }));
};
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map