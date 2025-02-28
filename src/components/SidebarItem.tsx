import { COLORS } from "@constants";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";

interface SidebarItemProps {
  label: string,
  icon: string,
  link: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition ${isActive ? `bg-colorMint text-basicBlack` : "text-gray-400 hover:bg-gray-200"
        }`
      }
    >
      <ReactSVG
        src={Icon}
        beforeInjection={svg => {
          svg.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', `${COLORS.basicWhite}`);
            path.setAttribute('stroke', 'currentColor');
          });
        }}
      />

      <span className="text-sm underline">{label}</span>
    </NavLink>

  );
};

export default SidebarItem