import { apiClient } from "../lib/axios";

export const createClient = async (credentials) => {
  const response = await apiClient.post('/client/create-client', credentials);
  return response;
};

export const viewClients = async () => {
  const response = await apiClient.get('/client/view-clients');
  return response;
};

export const viewSingleClient = async (clientId) => {
  const response = await apiClient.get(`/client/read/${clientId}`);
  return response;
};

export const editClient = async (clientId, updatedData) => {
  const response = await apiClient.put(`/client/edit/${clientId}`, updatedData);
  return response;
};

export const toggleClient = async (clientId) => {
  const response = await apiClient.patch(`/client/${clientId}/toggle`);
  return response;
};

