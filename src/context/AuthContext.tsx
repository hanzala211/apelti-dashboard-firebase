import { errorConverter } from "@helpers";
import { authService } from "@services";
import { AuthContextTypes, IUser } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<IUser | null>(null)
  const [isRemember, setIsRemember] = useState<boolean>(false)
  const [isMainLoading, setIsMainLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token !== null && userData === null) {
      me()
    } else {
      setIsMainLoading(false)
    }
  }, [])

  const signup = async (sendData: unknown) => {
    try {
      setIsAuthLoading(true)
      const response = await authService.signup(sendData)
      console.log(response)
      if (response.status === 200) {
        setUserData(response.data.data.user)
        localStorage.setItem("token", response.data.data.token)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsMainLoading(false)
      setIsAuthLoading(false)
    }
  }

  const login = async (sendData: unknown) => {
    try {
      setIsAuthLoading(true)
      const response = await authService.login(sendData)
      console.log(response)
      if (response.status === 200) {
        setUserData(response.data.data.user)
        if (isRemember) {
          localStorage.setItem("token", response.data.data.token)
        }
        navigate("/")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(errorConverter(error));
    } finally {
      setIsMainLoading(false)
      setIsAuthLoading(false)
    }
  }

  const me = async () => {
    try {
      setIsAuthLoading(true)
      const response = await authService.me()
      console.log(response)
      if (response.status === 200) {
        setUserData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsMainLoading(false)
      setIsAuthLoading(false)
    }
  }

  return <AuthContext.Provider value={{ userData, setUserData, isRemember, setIsRemember, signup, login, isMainLoading, setIsMainLoading, errorMessage, isAuthLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("use useAuth inside Message Provider")
  }
  return context
}