import PhoneInput from 'react-phone-input-2';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface PhoneNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultCountry?: string;
}

export const PhoneNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  defaultCountry = 'pk',
}: PhoneNumberInputProps<T>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="text-neutralGray">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <PhoneInput
              country={defaultCountry}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              inputProps={{
                name: name,
                id: name,
                placeholder: "",
              }}
              autoFormat={false}
              disableDropdown
              countryCodeEditable={true}
              inputClass="w-full rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-500 transition-all duration-200 bg-white py-1.5 px-3 focus-within:outline-none border-basicBlack border-[1px]"
              buttonClass="bg-transparent border-none outline-none focus:outline-none"
              dropdownClass="rounded-md shadow-lg"
              specialLabel=""
            />

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default PhoneNumberInput;
