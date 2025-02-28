import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom"

export const AppLayout: React.FC = () => {
  return <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Nav />
      {/* The scrolling container */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  </div>
}

export default AppLayout