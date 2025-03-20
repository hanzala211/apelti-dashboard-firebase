import { IMessage, MessageContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

const MessageContext = createContext<MessageContextTypes | undefined>(
  undefined
);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

  return (
    <MessageContext.Provider value={{ selectedMessage, setSelectedMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextTypes => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('use useMessage inside Message Provider');
  }
  return context;
};
