import { apiClient } from "../lib/axios";


export const assignConversation = async (credentials) => {
  const response = await apiClient.put('/conversations/assign', credentials);
  return response;
};

export const getConversations = async () => {
  const response = await apiClient.get('/conversations/list-all-convos');
  return response;
};

export const getSingleConversation = async (conversaionId) => {
  const response = await apiClient.get(`/conversations/convo/${conversaionId}`);
  return response;
};

export const setFollowUp = async (credentials) => {
  const response = await apiClient.put('/conversations/followup', credentials);
  return response;
};
export const closeConversation = async (conversationId) => {
  const response = await apiClient.put(`api/conversations/${conversationId}/close`);
  return response;
};