export const SettingPageHeading: React.FC<{
  label: string;
  className?: string;
}> = ({ label, className }) => {
  return <h1 className={`text-[20px] ${className} font-bold`}>{label}</h1>;
};

export default SettingPageHeading;
