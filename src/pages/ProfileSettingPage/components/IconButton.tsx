import { ReactSVG } from "react-svg";

export const IconButton: React.FC<{ icon: string, label: string, className?: string }> = ({ icon: Icon, label, className }) => {
  return <button className={`text-basicBlack ${className} font-semibold flex gap-2 items-center rounded-full shadow-md p-2 `}>
    <ReactSVG
      src={Icon}
      beforeInjection={(svg) => {
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
      }}
    /> {label} </button>
} 