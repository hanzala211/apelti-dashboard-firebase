import { useAuth } from "@context";
import { settingServices } from "@services";
import { SettingContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "@helpers";

const SettingContext = createContext<SettingContextTypes | undefined>(undefined)

export const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData, setUserData } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>("")

  const changePassword = async (data: unknown) => {
    try {
      setErrorMessage("")
      const response = await settingServices.changePassword(data)
      console.log(response)
      toast.success("Success", "Password Changed Successfully");
      return response
    } catch (error) {
      console.log(error)
      setErrorMessage(typeof error === "object" ? (error as Error)?.message : String(error))
    }
  }

  const changeUserData = async (data: unknown) => {
    try {
      const response = await settingServices.changeUserData(data, userData?._id || "")
      setUserData(response.data.data)
      console.log("Checking the update")
      toast.success("Success", "Data Updated Successfully");
    } catch (error) {
      console.log(error)
      setErrorMessage(typeof error === "object" ? (error as Error)?.message : String(error))
    }
  }

  return <SettingContext.Provider value={{ changePassword, errorMessage, changeUserData }}>{children}</SettingContext.Provider>
}

export const useSetting = (): SettingContextTypes => {
  const context = useContext(SettingContext)
  if (!context) {
    throw new Error("use useSetting inside Setting Provider")
  }
  return context
}