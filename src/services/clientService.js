import { apiClient } from "../lib/axios";

export const createClient = async (credentials) => {
  try {
    const response = await apiClient.post('/api/client/create-client', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const viewClients = async () => {
  try {
    const response = await apiClient.get('/api/client/view-clients');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const viewSingleClient = async (clientId) => {
  try {
    const response = await apiClient.get(`/api/client/read/${clientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const editClient = async (clientId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/client/edit/${clientId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const toggleClient = async (clientId) => {
  try {
    const response = await apiClient.patch(`/api/client/${clientId}/toggle`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

