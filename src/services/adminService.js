import { apiClient } from "../lib/axios";

export const createUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/admin/create-agent', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get('/api/admin/view-agents');
    return response.data.agents || []; 
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async (userId, credentials) => { // Changed order: ID first, then Data
  try {
    const response = await apiClient.put(`/api/admin/update-agent/${userId}`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/api/admin/delete-agent/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


