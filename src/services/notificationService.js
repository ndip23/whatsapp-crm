import { apiClient } from "../lib/axios";

export const getNotification = async () => {
  const response = await apiClient.get('/notifications');
  return response;
};

export const readConversation = async (conversaionId) => {
  const response = await apiClient.put(`/conversations/${conversaionId}/read`);
  return response;
};

