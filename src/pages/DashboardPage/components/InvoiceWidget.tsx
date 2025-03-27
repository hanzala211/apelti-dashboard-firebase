import { LuFileScan } from 'react-icons/lu';

export const InvoiceWidget: React.FC<{ label: string; amount: number }> = ({
  label,
  amount,
}) => {
  return (
    <div
      className={`bg-basicWhite px-4 py-3 flex items-center justify-between rounded-2xl border-[1px]`}
    >
      <div>
        <h2 className={`text-silverGray font-semibold`}>{label}</h2>
        <h1 className="font-bold text-[22px]">{amount}</h1>
      </div>
      <div className={`bg-primaryColor rounded-3xl p-4`}>
        <LuFileScan color="white" size={24} />
      </div>
    </div>
  );
};

export default InvoiceWidget;
