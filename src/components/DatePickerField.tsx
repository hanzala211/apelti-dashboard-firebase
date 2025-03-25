import { DATE_FOMRAT } from "@constants";
import dayjs from "dayjs";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker as AntdDatePicker } from "antd";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const DatePickerField = <T extends FieldValues>({ control, name }: DatePickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <AntdDatePicker
            id={name}
            format={DATE_FOMRAT}
            placeholder={DATE_FOMRAT}
            className="bg-white w-full font-semibold py-[4px] px-3 focus-within:outline-none border-basicBlack border-[1px]"
            onChange={(_, dateString: string | string[]) => field.onChange(dateString)}
            value={field.value ? dayjs(field.value, DATE_FOMRAT) : null}
          />
          {error && <p className="text-basicRed text-sm">{error.message}</p>}
        </>
      )}
    />
  );
};
