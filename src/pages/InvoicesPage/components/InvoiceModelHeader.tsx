import { ICONS } from "@constants"
import { useInvoice } from "@context"
import { ReactSVG } from "react-svg"

export const InvoiceModelHeader: React.FC = () => {
  const { setIsInvoiceModelOpen } = useInvoice()

  const handleClose = () => {
    setIsInvoiceModelOpen(false)
  }

  return <header className="h-[7rem] px-4 shadow-lg flex justify-between items-center w-full bg-basicWhite">
    <h1 className="md:text-[22px] text-[17px] font-bold">Add Invoice</h1>
    <div className="flex gap-4 items-center">
      <button className="text-basicWhite md:text-[16px] text-[14px] bg-basicGreen px-7 hover:bg-opacity-70 transition-all border-basicGreen border-[1px] duration-200 py-1.5 rounded-full">Add</button>
      <button className="text-basicBlack md:text-[16px] text-[14px] bg-basicWhite hover:bg-gray-200 transition-all duration-200 border-basicBlack border-[1px] px-7 py-1.5 rounded-full">Draft</button>
      <button onClick={handleClose}>
        <ReactSVG src={ICONS.close} />
      </button>
    </div>
  </header>
}

export default InvoiceModelHeader