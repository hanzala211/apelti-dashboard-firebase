import { ICONS } from '@constants';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-[50vh] flex items-center flex-col justify-center">
      <div
        className={`w-52 h-52 bg-no-repeat bg-center bg-contain`}
        style={{
          backgroundImage: `url(${ICONS.settings_icon})`,
        }}
      />
      <div className="relative h-1 w-[10rem] bg-silverGray overflow-hidden rounded">
        <div className="absolute h-full w-[5rem] bg-basicGreen animate-slide"></div>
      </div>
    </div>
  );
};

export default Loader;
