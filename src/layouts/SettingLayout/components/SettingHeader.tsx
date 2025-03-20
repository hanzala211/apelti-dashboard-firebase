import { ICONS } from '@constants';

export const SettingHeader: React.FC = () => {
  return (
    <header className="w-full flex items-center border-b-[1px] justify-center">
      <img src={ICONS.logoSVG} alt="Logo Image" className="w-20" />
      <span className="text-[22px] font-bold">Apelti</span>
    </header>
  );
};

export default SettingHeader;
