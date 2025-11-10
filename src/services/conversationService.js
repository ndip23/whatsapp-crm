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
  const response = await apiClient.put(`/conversations/${conversationId}/close`);
  return response;
};

export const startConversation = async (conversationId) => {
  const response = await apiClient.put(`/conversations/${conversationId}/start-typing`);
  return response;
};
export const stopConversation = async (conversationId) => {
  const response = await apiClient.put(`/conversations/${conversationId}/stop-typing`);
  return response;
};