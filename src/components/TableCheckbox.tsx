import { CheckInput } from "@components";
import { ChangeEvent } from "react";

interface TableCheckboxProps {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TableCheckbox: React.FC<TableCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <td className="pl-6 py-4 text-[14px]">
      <CheckInput checkValue={isChecked} handleOnChange={onChange} label="item_checkbox" />
    </td>
  );
};
