import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { ThemeContext, defaultTheme, generateCssVariables } from './index';
export const ThemeProvider = ({ theme, children }) => {
    // Merge provided theme with default theme
    const mergedTheme = theme
        ? {
            colors: { ...defaultTheme.colors, ...(theme.colors || {}) },
            spacing: { ...defaultTheme.spacing, ...(theme.spacing || {}) },
            fontSizes: { ...defaultTheme.fontSizes, ...(theme.fontSizes || {}) },
            borderRadius: { ...defaultTheme.borderRadius, ...(theme.borderRadius || {}) },
        }
        : defaultTheme;
    // Inject CSS variables when theme changes
    useEffect(() => {
        const style = document.createElement('style');
        style.id = 'blox-theme-variables';
        style.textContent = generateCssVariables(mergedTheme);
        // Replace existing style or add new one
        const existingStyle = document.getElementById('blox-theme-variables');
        if (existingStyle) {
            existingStyle.replaceWith(style);
        }
        else {
            document.head.appendChild(style);
        }
        return () => {
            var _a;
            (_a = document.getElementById('blox-theme-variables')) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, [mergedTheme]);
    return (_jsx(ThemeContext.Provider, { value: mergedTheme, children: children }));
};
//# sourceMappingURL=ThemeProvider.js.map