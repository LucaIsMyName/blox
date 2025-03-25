interface BlockLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const BlockLayout: React.FC<BlockLayoutProps> = ({ children, title = "Block Title", subtitle }) => {
  return (
    <div className="md:flex md:gap-4 pb-6 border-b mb-6">
      <section className="w-full max-w-96">
        {title && <h1 className="text-3xl font-bold">{title}</h1>}
        {subtitle && <p className="text-base">{subtitle}</p>}
      </section>
      <section className="md:flex-1">{children}</section>
    </div>
  );
};
