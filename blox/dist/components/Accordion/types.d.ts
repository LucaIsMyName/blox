import { BaseProps } from '../../types';
import React from 'react';
export interface AccordionProps extends BaseProps {
    items: AccordionItemProps[];
    allowMultiple?: boolean;
    defaultIndex?: number | number[];
}
export interface AccordionItemProps {
    title: React.ReactNode;
    content: React.ReactNode;
    isDisabled?: boolean;
}
export interface AccordionContextType {
    activeIndices: number[];
    toggleItem: (index: number) => void;
    isItemActive: (index: number) => boolean;
}
