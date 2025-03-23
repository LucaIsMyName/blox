// src/index.ts
// Export components
export * from './components';

// Export types
export * from './types';

// Export theme-related utilities (if needed for your headless approach)
export * from './theme';
export { ThemeProvider } from './theme/ThemeProvider';
export { BloxProvider } from './BloxProvider';

// Export utility functions
export { getComponentConfig, loadConfig } from './utils/configLoader';

// Note: We're not importing CSS directly in this file anymore
// Users can import it separately if needed:
// import 'blox/dist/styles.css';