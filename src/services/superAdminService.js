import { apiClient } from "../lib/axios";

export const createSuperAdmin = async (credentials) => {
  try {
    const response = await apiClient.post('/api/superadmin/admin', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getSuperAdmin = async () => {
  try {
    const response = await apiClient.get('/api/superadmin/view-admins');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateSuperAdmin = async (credentials, adminId) => {
  try {
    const response = await apiClient.put(`/api/superadmin/update-admin/${adminId}`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteSuperAdmin = async (adminId) => {
  try {
    const response = await apiClient.delete(`/api/superadmin/delete-admin/${adminId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


