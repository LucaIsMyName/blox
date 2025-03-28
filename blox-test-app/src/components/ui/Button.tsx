interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", onClick, onFocus, className, ...props }) => {
  const baseClasses = "px-4 py-2 bg-blue-500 text-white border rounded-md";
  const variantClasses = {
    primary: "bg-blue-500 text-white border-blue-700 shadow-inner hover:bg-blue-600 focus:ring-2 focus:ring-blue-500",
    secondary: "bg-gray-100 !text-gray-700 border-gray-400 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500",
    danger: "bg-red-500 text-white border-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500",
  };
  return (
    <button
      onClick={onClick}
      onFocus={onFocus}
      className={`${baseClasses} ${variant === "danger" ? variantClasses.danger : variant === "primary" ? variantClasses.primary : variant === "secondary" ? variantClasses.secondary : ""} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
