// types.ts
import { HTMLAttributes, ReactNode } from 'react';

export type TabOrientation = 'horizontal' | 'vertical';
export type TabVariantStyle = 'line' | 'enclosed' | 'rounded' | 'soft-rounded' | 'pill';

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The ID of the active tab (controlled mode)
   */
  activeTab?: string;
  
  /**
   * Default active tab ID (uncontrolled mode)
   */
  defaultActiveTab?: string;
  
  /**
   * Callback when tab is changed
   */
  onChange?: (tabId: string) => void;
  
  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: TabOrientation;
  
  /**
   * Whether to animate tab transitions
   * @default true
   */
  animated?: boolean;
  
  /**
   * Children of the Tabs component
   */
  children: ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the TabList component
   */
  children: ReactNode;
  
  /**
   * Orientation of the tabs
   */
  orientation?: TabOrientation;
}

export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Tab ID (must be unique within a Tabs component)
   */
  id: string;
  
  /**
   * Children of the Tab component
   */
  children: ReactNode;
  
  /**
   * Whether the tab is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tab ID this panel is associated with
   */
  tabId: string;
  
  /**
   * Children of the TabPanel component
   */
  children: ReactNode;
}

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children of the TabPanels component
   */
  children: ReactNode;
}

export interface TabsContextType {
  /**
   * ID of the active tab
   */
  activeTabId: string;
  
  /**
   * Callback to change the active tab
   */
  setActiveTabId: (id: string) => void;
  
  /**
   * Orientation of the tabs
   */
  orientation: TabOrientation;
  
  /**
   * Whether animations are enabled
   */
  animated: boolean;
}

export interface TabsComposition {
  List: React.FC<TabListProps>;
  Tab: React.FC<TabProps>;
  Panels: React.FC<TabPanelsProps>;
  Panel: React.FC<TabPanelProps>;
}