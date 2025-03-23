import React from 'react';
import { ThemeConfig } from './theme';
interface BloxProviderProps {
    theme?: Partial<ThemeConfig>;
    children: React.ReactNode;
}
export declare const BloxProvider: React.FC<BloxProviderProps>;
export {};
