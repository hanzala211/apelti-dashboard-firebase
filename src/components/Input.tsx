import { UseFormRegisterReturn } from "react-hook-form";

interface InvoiceInputProps {
  register: UseFormRegisterReturn;
  type: string;
  label: string;
  error?: string;
  min?: number
}

export const Input: React.FC<InvoiceInputProps> = ({ register, type, label, error, min = 0 }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={register.name} className="text-neutralGray">
        {label}
      </label>
      <input
        type={type}
        id={register.name}
        {...register}
        className="bg-white rounded-md w-full py-1.5 px-3 border border-basicBlack focus:shadow-blue-300 focus-within:shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200" min={min}
      />
      {error && <p className="text-basicRed text-sm">{error}</p>}
    </div>
  );
};
