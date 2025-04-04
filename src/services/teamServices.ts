import { functions, httpsCallable } from '@firebaseApp';
import { sendRequest } from '@helpers';

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
  updateMember: (userId: string, data: unknown) =>
    sendRequest({
      url: `/company/user/${userId}`,
      isAuthIncluded: true,
      data,
      method: 'PUT',
    }),
};
