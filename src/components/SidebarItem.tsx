import { COLORS } from "@constants";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";

interface SidebarItemProps {
  label: string,
  icon: string | IconType,
  link: string,
  onClick?: () => void,
  isIconType?: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, link, onClick, isIconType }) => {
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition ${isActive ? `bg-colorMint text-basicBlack` : "text-gray-400 hover:bg-gray-200"
        }`
      }
    >
      {!isIconType ?
        <ReactSVG
          src={(typeof Icon === "string") ? Icon : ""}
          beforeInjection={svg => {
            svg.querySelectorAll('path').forEach(path => {
              path.setAttribute('fill', `${COLORS.basicWhite}`);
              path.setAttribute('stroke', 'currentColor');
            });
          }}
        />
        : <Icon size={18} />}

      <span className="text-sm underline">{label}</span>
    </NavLink>

  );
};

export default SidebarItem