import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  data: { label: string; value: string }[];
}

export const Select = <T extends FieldValues>({
  control,
  name,
  label,
  data,
}: SelectProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={label} className="text-neutralGray">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              id={label}
              {...field}
              className="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-[3px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
            >
              {data.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {error && <p className="text-basicRed text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default Select;
