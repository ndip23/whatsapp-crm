import { apiClient } from "../lib/axios";

export const assignConversation = async (credentials) => {
  try {
    const response = await apiClient.put('/api/conversations/assign', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getConversations = async () => {
  try {
    const response = await apiClient.get('/api/conversations/list-all-convos');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getSingleConversation = async (conversationId) => {
  try {
    const response = await apiClient.get(`/api/conversations/convo/${conversationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const setFollowUp = async (credentials) => {
  try {
    const response = await apiClient.put('/api/conversations/followup', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const closeConversation = async (conversationId) => {
  try {
    const response = await apiClient.put(`/api/conversations/${conversationId}/close`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const startTyping = async (conversationId) => {
  try {
    const response = await apiClient.post(`/api/conversations/${conversationId}/start-typing`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const stopTyping = async (conversationId) => {
  try {
    const response = await apiClient.post(`/api/conversations/${conversationId}/stop-typing`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};