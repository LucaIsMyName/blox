import { BaseProps, Size } from "../../types";
export interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: Size;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    rounded?: boolean;
    asChild?: boolean;
}
