import { useAuth } from "@context";
import { settingServices } from "@services";
import { SettingContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";

const SettingContext = createContext<SettingContextTypes | undefined>(undefined)

export const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>("")

  const changeEmailAndName = async (data: unknown) => {
    try {
      setErrorMessage("")
      const response = await settingServices.changePassword(data)
      console.log(response)
    } catch (error) {
      console.log(error)
      setErrorMessage(typeof error === "object" ? (error as Error)?.message : String(error))
    }
  }

  const changeUserData = async (data: unknown) => {
    try {
      const response = await settingServices.changeUserData(data, userData?._id || "")
      console.log(response)
      setUserData(response.data.data)
    } catch (error) {
      console.log(error)
      setErrorMessage(typeof error === "object" ? (error as Error)?.message : String(error))
    }
  }

  return <SettingContext.Provider value={{ changeEmailAndName, errorMessage, changeUserData }}>{children}</SettingContext.Provider>
}

export const useSetting = (): SettingContextTypes => {
  const context = useContext(SettingContext)
  if (!context) {
    throw new Error("use useSetting inside Setting Provider")
  }
  return context
}