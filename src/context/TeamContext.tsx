import { useAuth } from '@context';
import { DocumentData } from '@firebaseApp';
import { toast } from '@helpers';
import { useTeamHook } from '@hooks';
import { teamServices } from '@services';
import { IUser, TeamContextTypes } from '@types';
import { createContext, ReactNode, useContext, useState } from 'react';

const TeamContext = createContext<TeamContextTypes | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userData } = useAuth();
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { getTeamMembers } = useTeamHook()


  const addMember = async (sendData: Record<string, unknown>) => {
    try {
      setErrorMessage('');
      const response = await teamServices.addMember(sendData);
      console.log(response)
      if (response.data) {
        toast.success('Operation Successful', 'The new user has been successfully registered in the system.');
        return response.data as IUser;
      }
      return null;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    }
  };

  const getMembers = async () => {
    try {
      const response: IUser[] = await new Promise((resolve) => getTeamMembers({ adminId: userData?._id || "", onUpdate: (data: DocumentData) => resolve(data as IUser[]) }))
      console.log(response)
      if (response) {
        return response
      }
      return []
    } catch (error) {
      console.log(error);

    }
  };

  const deleteMember = async (userId: string) => {
    try {
      const response = await teamServices.deleteMember(userId);
      toast.success('Operation Successful', 'The user has been successfully deleted.');
      console.log(response);
      return null;
    } catch (error) {
      console.log(error);
      toast.error("Error", typeof error === 'object' ? (error as Error).message : String(error))
    }
  };

  const updateUser = async (userId: string, data: unknown) => {
    try {
      const response = await teamServices.updateMember(userId, data);
      if (response.status === 200) {
        toast.success('Operation Successful', 'The user has been successfully updated.');
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.log(error);
      setErrorMessage(
        typeof error === 'object' ? (error as Error).message : String(error)
      );
    } finally {
      setEditingUser(null);
    }
  };

  return (
    <TeamContext.Provider
      value={{
        addMember,
        deleteMember,
        editingUser,
        setEditingUser,
        updateUser,
        errorMessage,
        getMembers,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContextTypes => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('use useTeam inside Team Provider');
  }
  return context;
};
