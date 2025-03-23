import { createContext, useContext } from "react";

export type ThemeColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type ThemeColors = {
  primary: ThemeColorScale;
  secondary: ThemeColorScale;
  success: ThemeColorScale;
  danger: ThemeColorScale;
  warning: ThemeColorScale;
  info: ThemeColorScale;
  gray: ThemeColorScale;
};

export type ThemeSpacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
};

export type ThemeFontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
};

export type ThemeBorderRadius = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type ThemeConfig = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  fontSizes: ThemeFontSizes;
  borderRadius: ThemeBorderRadius;
};

// Default theme configuration
export const defaultTheme: ThemeConfig = {
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    danger: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "1rem",
    full: "9999px",
  },
};

// Create context to provide theme configuration
export const ThemeContext = createContext<ThemeConfig>(defaultTheme);

// Custom hook to access theme
export const useTheme = () => useContext(ThemeContext);

// Function to generate CSS variables from theme config
export const generateCssVariables = (theme: ThemeConfig = defaultTheme): string => {
  let cssVars = ":root {\n";

  const hexToRgb = (hex: string) => {
    const hexValue = hex.replace("#", "");
    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };


  // Colors
  Object.entries(theme.colors).forEach(([colorName, colorScale]) => {
    Object.entries(colorScale).forEach(([shade, value]) => {
      cssVars += `  --blox-color-${colorName}-${shade}: rgba(${hexToRgb(value)},var(--opacity,1));\n`;
    });
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([size, value]) => {
    cssVars += `  --blox-spacing-${size}: ${value};\n`;
  });

  // Font sizes
  Object.entries(theme.fontSizes).forEach(([size, value]) => {
    cssVars += `  --blox-font-size-${size}: ${value};\n`;
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([size, value]) => {
    cssVars += `  --blox-border-radius-${size}: ${value};\n`;
  });

  cssVars += "}";
  return cssVars;
};

// ThemeProvider component
export const generateThemeInjectionScript = (theme: ThemeConfig = defaultTheme): string => {
  return `
(function() {
  const style = document.createElement('style');
  style.id = 'blox-theme-variables';
  style.textContent = \`
${generateCssVariables(theme)}
  \`;
  
  // Replace existing style or add new one
  const existingStyle = document.getElementById('blox-theme-variables');
  if (existingStyle) {
    existingStyle.replaceWith(style);
  } else {
    document.head.appendChild(style);
  }
})();
  `;
};
