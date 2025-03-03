import { iconsPath } from "@constants"
import { useAuth } from "@context"

export const Nav: React.FC = () => {
  const { userData } = useAuth()

  return <nav className={`border-b w-full bg-mistGray flex fixed md:relative items-center md:justify-between justify-around gap-2 sm:px-14 px-8 py-4 z-10`}>
    <div className="relative">
      <input
        type="text"
        className={`lg:w-[30rem] md:w-[17rem] w-[14.5rem] bg-paleGray outline-none border border-gray-300 py-2 pr-8 pl-3 placeholder:underline rounded-md`}
        placeholder="Search"
      />
      <iconsPath.searchIcon className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 text-basicZinc`} />
    </div>

    <div className="flex items-center sm:space-x-6 space-x-2">
      <div className="flex md:gap-3 gap-1 items-center">
        <div className="relative">
          <div className={`w-8 h-8 rounded-full bg-grayTxt flex items-center justify-center font-bold text-basicWhite`}>
            {userData?.firstName[0]}{userData?.lastName[0]}
          </div>
        </div>
        <span className="font-medium sm:inline hidden text-gray-700">{userData?.firstName} {userData?.lastName}</span>
      </div>

      <div className="relative">
        <iconsPath.bellIcon className="w-5 h-5 text-gray-500" />
        <span className={`absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-basicWhite`}></span>
      </div>

    </div>
  </nav>
}

export default Nav