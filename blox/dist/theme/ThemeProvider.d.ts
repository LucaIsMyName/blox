import React from 'react';
import { ThemeConfig } from './index';
interface ThemeProviderProps {
    theme?: Partial<ThemeConfig>;
    children: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
