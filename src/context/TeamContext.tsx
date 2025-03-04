import { useAuth } from "@context";
import { teamServices } from "@services";
import { IUser, TeamContextTypes } from "@types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const TeamContext = createContext<TeamContextTypes | undefined>(undefined)

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<IUser[]>([])
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false)
  const [isTeamLoading, setIsTeamLoading] = useState<boolean>(true)
  const [editingUser, setEditingUser] = useState<IUser | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (teamMembers.length === 0) {
      getMembers()
    }
  }, [])

  const addMember = async (sendData: unknown) => {
    try {
      setErrorMessage("")
      setIsAddingMember(true)
      const response = await teamServices.addMember(sendData)
      if (response.status === 200) {
        setTeamMembers((prev) => [...prev, response.data.data])
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(typeof error === "object" ? (error as Error).message : String(error))
    } finally {
      setIsAddingMember(false)
    }
  }

  const getMembers = async () => {
    try {
      setIsTeamLoading(true)
      const response = await teamServices.getMember()
      if (response.status === 200) {
        setTeamMembers(response.data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsTeamLoading(false)
    }
  }

  const deleteMember = async (userId: string) => {
    try {
      setIsTeamLoading(true)
      const response = await teamServices.deleteMember(userId)
      if (response.status === 200) {
        setTeamMembers((prev) => prev.filter((item) => item._id !== userId))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsTeamLoading(false)
    }
  }

  const updateUser = async (userId: string, data: unknown) => {
    try {
      setIsAddingMember(true)
      const response = await teamServices.updateMember(userId, data)
      if (response.status === 200) {
        setTeamMembers((prev) => [...prev.filter((item) => item._id !== userId), response.data.data])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAddingMember(false)
      setEditingUser(null)
    }
  }

  return <TeamContext.Provider value={{ teamMembers, setTeamMembers, addMember, isAddingMember, isTeamLoading, deleteMember, editingUser, setEditingUser, updateUser, errorMessage }}>{children}</TeamContext.Provider>
}

export const useTeam = (): TeamContextTypes => {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("use useTeam inside Team Provider")
  }
  return context
}