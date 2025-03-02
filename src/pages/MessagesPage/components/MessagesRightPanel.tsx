import { useMessage } from "@context"

export const MessagesRightPanel: React.FC = () => {
  const { selectedMessage } = useMessage()
  return <img
    src={selectedMessage?.imgPath}
    alt="Preview"
    className="absolute inset-0 w-[90%] mx-auto h-full object-contain"
  />
}