import { iconsPath } from "@constants";

const Loader: React.FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div
        className="w-52 h-52 bg-no-repeat bg-center bg-contain animate-spin origin-center duration-1000"
        style={{
          backgroundImage: `url(${iconsPath.logoSVG})`,
        }}
      />
    </div>
  );
};

export default Loader;
