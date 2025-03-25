import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from './theme/ThemeProvider';
import { loadConfig } from './utils/configLoader';
export const BloxProvider = ({ theme, children }) => {
    // Load config from global variable if available
    const globalConfig = loadConfig();
    // Merge provided theme with global config
    const mergedTheme = {
        ...(globalConfig.theme || {}),
        ...(theme || {})
    };
    return (_jsx(ThemeProvider, { theme: mergedTheme, children: children }));
};
//# sourceMappingURL=BloxProvider.js.map