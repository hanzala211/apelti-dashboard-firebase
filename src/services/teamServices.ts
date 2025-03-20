import { sendRequest } from '@helpers';

export const teamServices = {
  addMember: (data: unknown) =>
    sendRequest({
      url: '/company/user',
      data,
      isAuthIncluded: true,
      method: 'POST',
    }),
  getMember: () =>
    sendRequest({
      url: '/company/users',
      isAuthIncluded: true,
      method: 'GET',
    }),
  deleteMember: (userId: string) =>
    sendRequest({
      url: `/company/user/${userId}`,
      isAuthIncluded: true,
      method: 'DELETE',
    }),
  updateMember: (userId: string, data: unknown) =>
    sendRequest({
      url: `/company/user/${userId}`,
      isAuthIncluded: true,
      data,
      method: 'PUT',
    }),
};
