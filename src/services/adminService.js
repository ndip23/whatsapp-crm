import { apiClient } from "../lib/axios";


export const createAdmin = async (credentials) => {
  const response = await apiClient.post('/admin/create-agent', credentials);
  return response;
};

export const getAdmin = async () => {
  const response = await apiClient.get('/admin/view-agents')
  return response;
};

export const updateAdmin = async (credentials, adminId) => {
  const response = await apiClient.put(`/admin/update-agent/${adminId}`, credentials);
  return response;
};


export const deleteAdmin = async (adminId) => {
  const response = await apiClient.delete(`/admin/delete-agent/${adminId}`);
  return response;
};


