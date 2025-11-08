import { apiClient } from "../lib/axios";


export const createSuperAdmin = async (credentials) => {
  const response = await apiClient.post('/superadmin/admin', credentials);
  return response;
};

export const getSuperAdmin = async () => {
  const response = await apiClient.get('/superadmin/view-admins')
  return response;
};


export const updateSuperAdmin = async (credentials, adminId) => {
  const response = await apiClient.put(`/superadmin/update-admin/${adminId}`, credentials);
  return response;
};


export const deleteSuperAdmin = async (adminId) => {
  const response = await apiClient.delete(`/superadmin/delete-admin/${adminId}`);
  return response;
};


