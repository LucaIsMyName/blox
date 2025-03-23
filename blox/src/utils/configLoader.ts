import { ThemeConfig } from '../theme';

export interface ComponentConfig {
  defaultProps?: Record<string, any>;
  styles?: Record<string, string>;
}

export interface BloxConfig {
  theme?: Partial<ThemeConfig>;
  components?: Record<string, ComponentConfig>;
}

/**
 * This function would typically load configuration from a file
 * In a browser context, it would be pre-processed during build
 */
export const loadConfig = (): BloxConfig => {
  // In a real implementation, this would be injected during build
  // or loaded from a global variable set by the consuming application
  try {
    // Check if window.__BLOX_CONFIG__ exists (would be set by the app)
    if (typeof window !== 'undefined' && (window as any).__BLOX_CONFIG__) {
      return (window as any).__BLOX_CONFIG__;
    }
  } catch (e) {
    console.warn('Failed to load Blox configuration:', e);
  }
  
  // Return empty config if none is found
  return {};
};

// Helper to get component-specific config
export const getComponentConfig = <T>(componentName: string): ComponentConfig & { props: T } => {
  const config = loadConfig();
  const componentConfig = config.components?.[componentName] || {};
  
  return {
    ...componentConfig,
    props: (componentConfig.defaultProps || {}) as T,
  };
};

// Helper to inject component styles
export const injectComponentStyles = (componentName: string): void => {
  const config = loadConfig();
  const styles = config.components?.[componentName]?.styles;
  
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
  } else {
    document.head.appendChild(styleElement);
  }
};