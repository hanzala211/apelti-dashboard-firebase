export const PageHeading: React.FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return <h1 className={`text-[30px] ${className} font-semibold`}>{label}</h1>;
};

export default PageHeading;
