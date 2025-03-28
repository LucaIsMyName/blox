interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackChars?: string;
  children?: React.ReactNode;
}

export const Avatar = ({ children, src, alt, size = "md", className, fallbackChars = "AA" }: AvatarProps) => {
  const baseClasses = "border border-[rgba(0,0,0,0.1)] border-2 rounded-full grid contents-center justify-center overflow-hidden text-gray-600";
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  return (
    <div
      style={{
        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
      }}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-full  grid contents-center justify-center overflow-hidden"
        />
      ) : (
        <div
         
          className={`grid contents-center items-center justify-center overflow-hidden`}>
          {children || <div className="flex items-center justify-center rounded-full">{fallbackChars}</div>}
        </div>
      )}
    </div>
  );
};
