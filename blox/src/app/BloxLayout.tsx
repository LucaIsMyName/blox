import React from "react";

interface BloxLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const BloxLayout: React.FC<BloxLayoutProps> = ({ children, title = "Block Title", subtitle }) => {
  return (
    <div className="md:flex md:gap-4 pb-6 border-b mb-6">
      <section className="w-full md:max-w-96 md:min-w-96 mb-4 md:mb-0">
        {title && <h1 className="text-3xl font-bold">{title}</h1>}
        {subtitle && <p className="text-base">{subtitle}</p>}
      </section>
      <section className="md:flex-1 overflow-x-scroll">{children}</section>
    </div>
  );
};
