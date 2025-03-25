/**
 * This function would typically load configuration from a file
 * In a browser context, it would be pre-processed during build
 */
export const loadConfig = () => {
    // In a real implementation, this would be injected during build
    // or loaded from a global variable set by the consuming application
    try {
        // Check if window.__BLOX_CONFIG__ exists (would be set by the app)
        if (typeof window !== 'undefined' && window.__BLOX_CONFIG__) {
            return window.__BLOX_CONFIG__;
        }
    }
    catch (e) {
        console.warn('Failed to load Blox configuration:', e);
    }
    // Return empty config if none is found
    return {};
};
// Helper to get component-specific config
export const getComponentConfig = (componentName) => {
    var _a;
    const config = loadConfig();
    const componentConfig = ((_a = config.components) === null || _a === void 0 ? void 0 : _a[componentName]) || {};
    return {
        ...componentConfig,
        props: (componentConfig.defaultProps || {}),
    };
};
// Helper to inject component styles
export const injectComponentStyles = (componentName) => {
    var _a, _b;
    const config = loadConfig();
    const styles = (_b = (_a = config.components) === null || _a === void 0 ? void 0 : _a[componentName]) === null || _b === void 0 ? void 0 : _b.styles;
    if (!styles || Object.keys(styles).length === 0) {
        return;
    }
    // Create a style element with CSS variables
    const styleElement = document.createElement('style');
    styleElement.id = `blox-${componentName.toLowerCase()}-styles`;
    let cssText = `.blox-${componentName.toLowerCase()} {\n`;
    Object.entries(styles).forEach(([key, value]) => {
        cssText += `  ${key}: ${value};\n`;
    });
    cssText += '}\n';
    styleElement.textContent = cssText;
    // Replace existing or add new
    const existingStyle = document.getElementById(styleElement.id);
    if (existingStyle) {
        existingStyle.replaceWith(styleElement);
    }
    else {
        document.head.appendChild(styleElement);
    }
};
//# sourceMappingURL=configLoader.js.map