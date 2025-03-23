export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface BaseProps {
    variant?: Variant;
    className?: string;
}
