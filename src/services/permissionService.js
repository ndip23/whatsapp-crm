import { apiClient } from "../lib/axios";

export const getAllPermissions = async () => {
  const response = await apiClient.get('/api/admin/view-agents'); // Adjust this if you have a specific permissions route
  return response.data.permissions || [];
};

export const createPermission = async (data) => {
  const response = await apiClient.post('/api/admin/create-agent', data);
  return response.data;
};

export const updatePermission = async (id, data) => {
  const response = await apiClient.put(`/api/admin/update-agent/${id}`, data);
  return response.data;
};

export const deletePermission = async (id) => {
  const response = await apiClient.delete(`/api/admin/delete-agent/${id}`);
  return response.data;
};