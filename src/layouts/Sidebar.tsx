import { useEffect, useRef, useState } from "react";
import { SidebarItem } from "@components";
import { Menu } from "lucide-react";
import { iconsPath, ROUTES } from "@constants";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null)
  const sideBarButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    window.addEventListener("click", handleClick)

    return () => window.removeEventListener("click", handleClick)
  }, [])


  const handleClick = (e: MouseEvent) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target as Node) && sideBarButtonRef.current && !sideBarButtonRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        ref={sideBarButtonRef}
        className={`md:hidden fixed top-4 sm:left-0 -left-2.5 p-3 h-fit bg-transparent rounded-md z-50 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </button>

      <aside
        ref={sideBarRef}
        className={`fixed md:relative h-[100dvh] z-50 bg-basicWhite w-64 p-5 flex flex-col border-r shadow-lg transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex`}
      >
        <div className="flex items-center mb-3">
          <img src={iconsPath.logoSVG} alt="Logo Image" className="w-20" />
          <span className="text-[22px] font-bold">Apelti</span>
        </div>

        <p className={`text-slateGrey text-[15px] mb-5`}>MENU</p>

        <nav className="flex flex-col space-y-2 overflow-auto">
          <div className="py-2 border-b-[1px] space-y-2">
            <SidebarItem link="/" icon={iconsPath.dashboardSVG} label="Dashboard" />
            <SidebarItem link={ROUTES.messages} icon={iconsPath.messageSVG} label="Messages" />
            <SidebarItem link={ROUTES.documents} icon={iconsPath.documentSVG} label="Documents" />
            <SidebarItem link={ROUTES.customer_review} icon={iconsPath.documentSVG} label="Customer Review" />
          </div>
          <div className="space-y-2 border-b-[1px] py-2">
            <SidebarItem link={`${ROUTES.invoices}?all=true`} icon={iconsPath.invoiceSVG} label="Invoices" />
            <SidebarItem link={ROUTES.suppliers} icon={iconsPath.supplierSVG} label="Suppliers" />
            <SidebarItem link={ROUTES.payment} icon={iconsPath.paymentSVG} label="Payment" />
            <SidebarItem link={ROUTES.approval} icon={iconsPath.approvalSVG} label="Approval" />
          </div>
          <SidebarItem link={ROUTES.posting} icon={iconsPath.postingSVG} label="Posting" />
          <SidebarItem link={ROUTES.reports} icon={iconsPath.reportSVG} label="Reports" />
          <SidebarItem link={ROUTES.team} icon={iconsPath.teamSVG} label="Team" />
          <SidebarItem link={ROUTES.settings} icon={iconsPath.settingSVG} label="Settings" />

        </nav>
      </aside>
    </>
  );
};


export default Sidebar;
