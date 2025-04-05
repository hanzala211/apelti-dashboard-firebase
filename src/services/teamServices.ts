import { functions, httpsCallable } from '@firebaseApp';

export const teamServices = {
  addMember: async (data: Record<string, unknown>) => {
    try {
      const response = await httpsCallable(functions, "createUser")({ ...data })
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  deleteMember: async (userId: string) => {
    try {
      const response = await httpsCallable(functions, "deleteUser")(userId)
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  updateMember: async (userId: string, data: unknown) => {
    try {
      const response = await httpsCallable(functions, "updateUser")({ ...data as Record<string, unknown>, userId })
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }
};
