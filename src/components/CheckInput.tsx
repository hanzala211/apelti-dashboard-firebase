import { ChangeEventHandler } from 'react';

interface CheckInputProps {
  checkValue?: boolean;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const CheckInput: React.FC<CheckInputProps> = ({
  checkValue,
  handleOnChange,
  label,
}) => {
  return (
    <input
      type="checkbox"
      id={label}
      className={`accent-basicBlack`}
      checked={checkValue}
      onChange={handleOnChange}
    />
  );
};
