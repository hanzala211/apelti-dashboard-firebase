import { CheckInput } from '@components';
import { useMessage } from '@context';
import { IMessage } from '@types';
import { useNavigate } from 'react-router-dom';

interface MessageProps {
  onCheckChange: (value: boolean) => void;
  index: number;
  item: IMessage;
  messagesBoolean: boolean[];
}

export const Message: React.FC<MessageProps> = ({
  onCheckChange,
  index,
  item,
  messagesBoolean,
}) => {
  const { setSelectedMessage, selectedMessage } = useMessage();
  const navigate = useNavigate();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(e.target.checked);
  };

  const handleChange = () => {
    navigate(`/messages?id=${item._id}`);
    setSelectedMessage(item);
  };

  return (
    <div
      onClick={handleChange}
      className={`flex gap-2 rounded-md cursor-pointer flex-col border-[1px] p-3 w-full ${item._id === selectedMessage?._id
          ? 'bg-softBlue border-darkBlue'
          : ' border-basicSilver'
        }`}
    >
      <div className="flex gap-2 items-center">
        <CheckInput
          checkValue={messagesBoolean[index]}
          handleOnChange={handleCheck}
          label={`${index}`}
        />
        <label htmlFor={`${index}`} className="text-[20px] font-semibold">
          {item.companyName}
        </label>
      </div>
      <div className="ml-5 space-y-2">
        {item.isDuplicate ? (
          <p className="bg-basicRed rounded-md text-basicWhite w-fit px-3 py-0.5 text-[13px]">
            Duplicate
          </p>
        ) : (
          <p className="py-0.5"></p>
        )}
        <p className="text-[12px]">{item.fileName}</p>
        <div className="flex items-center justify-between">
          <p className="text-[12px]">{item.supplierName}</p>
          <p className="text-[12px]">Add Comments</p>
        </div>
      </div>
    </div>
  );
};
