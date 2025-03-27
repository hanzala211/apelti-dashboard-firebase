export const SettingPageHeading: React.FC<{
  label: string;
  className?: string;
}> = ({ label, className }) => {
  return <h1 className={`text-[20px] m-0 ${className} font-bold`}>{label}</h1>;
};

export default SettingPageHeading;
