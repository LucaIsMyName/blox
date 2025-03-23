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
export declare const loadConfig: () => BloxConfig;
export declare const getComponentConfig: <T>(componentName: string) => ComponentConfig & {
    props: T;
};
export declare const injectComponentStyles: (componentName: string) => void;
