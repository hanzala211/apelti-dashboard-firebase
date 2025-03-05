import { Message } from "./Message"
import { CheckInput } from "@components"
import { MESSAGES_DATA } from "@constants";
import { useMessage } from "@context";
import { useEffect, useState } from "react";
import { ICONS } from "@constants";

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
  }

  const handleIndividualChange = (index: number, value: boolean) => {
    const updatedMessages = [...messagesBoolean];
    updatedMessages[index] = value;
    setMessagesBoolean(updatedMessages);
  }


  return <div className={`md:block w-full h-full ${selectedMessage === null ? "block" : "hidden"}`}>
    <div className="flex justify-end w-full">
      <span className="px-4 py-2 flex gap-2 items-center cursor-pointer">
        Newest <ICONS.arrowDown />
      </span>
    </div>
    <div className="md:px-10 px-2 mt-4 w-full">
      <div className="flex gap-2">
        <CheckInput checkValue={selectAll} handleOnChange={handleSelectAll} label="select" />
        <label htmlFor="select" className="font-semibold">
          Select All
        </label>
      </div>
      <div className="flex flex-col gap-3 h-[100dvh] max-h-[calc(100dvh-300px)] overflow-y-auto mt-2 w-full">
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