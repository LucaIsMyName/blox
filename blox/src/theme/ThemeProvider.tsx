import React, { useEffect } from 'react';
import { ThemeContext, ThemeConfig, defaultTheme, generateCssVariables } from './index';

interface ThemeProviderProps {
  theme?: Partial<ThemeConfig>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme,
  children 
}) => {
  // Merge provided theme with default theme
  const mergedTheme: ThemeConfig = theme
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
    } else {
      document.head.appendChild(style);
    }
    
    return () => {
      document.getElementById('blox-theme-variables')?.remove();
    };
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};