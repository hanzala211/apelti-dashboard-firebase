import { useAuth } from "@context";
import { toast } from "@helpers";
import { teamServices } from "@services";
import { useQueryClient } from "@tanstack/react-query";
import { IUser, TeamContextTypes } from "@types";
import { createContext, ReactNode, useContext, useState } from "react";

const TeamContext = createContext<TeamContextTypes | undefined>(undefined)

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData } = useAuth()
  const [isAddingMember, setIsAddingMember] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<IUser | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const queryClient = useQueryClient()

  const addMember = async (sendData: unknown) => {
    try {
      setErrorMessage("")
      setIsAddingMember(true)
      const response = await teamServices.addMember(sendData)
      if (response.status === 200) {
        toast.success("Success", "User Added Successfully");
        queryClient.invalidateQueries({
          queryKey: ["teamMembers"]
        });
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
      const response = await teamServices.getMember()
      if (response.status === 200) {
        return response.data.data.users.filter((item: IUser, index: number, self: IUser[]) => item._id !== userData?._id && self.findIndex(u => u._id === item._id) === index)
      }
      return null
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMember = async (userId: string) => {
    try {
      const response = await teamServices.deleteMember(userId)
      if (response.status === 200) {
        queryClient.setQueryData<IUser[]>(["teamMembers"], (oldData) =>
          oldData ? oldData.filter((item) => item._id !== userId) : []
        );
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async (userId: string, data: unknown) => {
    try {
      setIsAddingMember(true)
      const response = await teamServices.updateMember(userId, data)
      if (response.status === 200) {
        toast.success("Success", "User Updated Successfully");
        queryClient.setQueryData<IUser[]>(["teamMembers"], (oldData) =>
          oldData
            ? [
              ...oldData.filter((item) => item._id !== userId),
              response.data.data as IUser,
            ]
            : [response.data.data as IUser]
        );
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAddingMember(false)
      setEditingUser(null)
    }
  }

  return <TeamContext.Provider value={{ addMember, isAddingMember, deleteMember, editingUser, setEditingUser, updateUser, errorMessage, getMembers }}>{children}</TeamContext.Provider>
}

export const useTeam = (): TeamContextTypes => {
  const context = useContext(TeamContext)
  if (!context) {
    throw new Error("use useTeam inside Team Provider")
  }
  return context
}