import { iconsPath } from "@constants"
import { Outlet } from "react-router-dom"

export const AuthLayout: React.FC = () => {

  return <div className="relative h-full w-full">
    <header className="absolute">
      <img src={iconsPath.logoSVG} alt="Logo Image" className="w-20" />
    </header>
    <section className="flex md:justify-between">
      <Outlet />
      <img src={iconsPath.loginImage} alt="Login Placeholder" className="h-screen bg-basicGreen md:block hidden w-[40%]" />
    </section >
  </div>
}