import { useAuth } from "@context"

export const AuthButton: React.FC<{ text: string }> = ({ text }) => {
  const { isAuthLoading } = useAuth()

  return <button type="submit" disabled={isAuthLoading} className={`bg-basicBlack ${isAuthLoading ? "bg-opacity-50" : ""} text-basicWhite rounded-full py-2 transition-all duration-200 hover:bg-opacity-80`}>{text}</button>

}