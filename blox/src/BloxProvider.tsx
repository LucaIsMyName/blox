import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { ThemeConfig } from './theme';
import { loadConfig } from './utils/configLoader';

interface BloxProviderProps {
  theme?: Partial<ThemeConfig>;
  children: React.ReactNode;
}

export const BloxProvider: React.FC<BloxProviderProps> = ({ 
  theme,
  children 
}) => {
  // Load config from global variable if available
  const globalConfig = loadConfig();
  
  // Merge provided theme with global config
  const mergedTheme = {
    ...(globalConfig.theme || {}),
    ...(theme || {})
  };
  
  return (
    <ThemeProvider theme={mergedTheme}>
      {children}
    </ThemeProvider>
  );
};