import { ICONS } from '@constants';

export const SettingHeader: React.FC = () => {
  return (
    <header className="w-full flex items-center border-b-[1px] justify-center">
      <img src={ICONS.settings_icon} alt="Logo Image" className="w-20" />
    </header>
  );
};

export default SettingHeader;
