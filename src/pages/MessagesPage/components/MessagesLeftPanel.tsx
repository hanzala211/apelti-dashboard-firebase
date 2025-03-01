import { Message } from "./Message"
import { CheckInput } from "@components"
import { MESSAGES_DATA } from "@constants";
import { useMessage } from "@context";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io"

export const MessagesLeftPanel: React.FC = () => {
  const { setSelectedMessage, selectedMessage } = useMessage()
  const [messagesBoolean, setMessagesBoolean] = useState<boolean[]>([])

  const selectAll = messagesBoolean.every((item) => item === true);

  useEffect(() => {
    const booleanData = Array.from({ length: MESSAGES_DATA.length }, (_, i) => i === -1);
    setMessagesBoolean(booleanData)
    if (window.innerWidth > 768) {
      setSelectedMessage(MESSAGES_DATA[0])
    }
  }, [MESSAGES_DATA])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setMessagesBoolean(messagesBoolean.map(() => newState));
  };

  const handleIndividualChange = (index: number, value: boolean) => {
    const updatedMessages = [...messagesBoolean];
    updatedMessages[index] = value;
    setMessagesBoolean(updatedMessages);
  };


  return <div className={`md:block ${selectedMessage === null ? "block" : "hidden"}`}>
    <div className="flex justify-end w-full">
      <span className="px-4 py-2 flex gap-2 items-center cursor-pointer">
        Newest <IoIosArrowDown />
      </span>
    </div>
    <div className="md:px-10 mt-4 w-full">
      <div className="space-x-2">
        <CheckInput checkValue={selectAll} handleOnChange={handleSelectAll} label="select" />
        <label htmlFor="select" className="font-semibold">
          Select All
        </label>
      </div>
      <div className="flex flex-col gap-3 h-[70dvh] overflow-y-auto mt-2 w-full">
        {MESSAGES_DATA.map((item, index) => (
          <Message
            key={index}
            onCheckChange={(value) => handleIndividualChange(index, value)}
            index={index}
            item={item}
            messagesBoolean={messagesBoolean}
          />
        ))}
      </div>
    </div>
  </div>
}