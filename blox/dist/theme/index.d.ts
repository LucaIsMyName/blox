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
export declare const defaultTheme: ThemeConfig;
export declare const ThemeContext: import("react").Context<ThemeConfig>;
export declare const useTheme: () => ThemeConfig;
export declare const generateCssVariables: (theme?: ThemeConfig) => string;
export declare const generateThemeInjectionScript: (theme?: ThemeConfig) => string;
