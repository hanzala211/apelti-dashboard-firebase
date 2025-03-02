interface InvoiceFilterBtnProps {
  label: string,
  bool: boolean,
  onClick: () => void
}

export const FilterBtn: React.FC<InvoiceFilterBtnProps> = ({ label, bool, onClick }) => {
  return <button onClick={onClick} className={`relative md:text-[16px] text-[13px] before:left-1/2 before:-translate-x-1/2 ${bool ? "before:w-full before:absolute before:h-[3px] before:bottom-0 before:bg-basicGreen" : "before:w-0"} before:transition-all duration-200`}>{label}</button>
}