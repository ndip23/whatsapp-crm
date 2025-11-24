import { apiClient } from "../lib/axios";

export const createAdmin = async (credentials) => {
  try {
    const response = await apiClient.post('/api/admin/create-agent', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAdmin = async () => {
  try {
    const response = await apiClient.get('/api/admin/view-agents');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateAdmin = async (credentials, adminId) => {
  try {
    const response = await apiClient.put(`/api/admin/update-agent/${adminId}`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteAdmin = async (adminId) => {
  try {
    const response = await apiClient.delete(`/api/admin/delete-agent/${adminId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


