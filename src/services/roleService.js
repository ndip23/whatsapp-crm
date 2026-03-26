import { apiClient } from "../lib/axios";

/**
 * Fetch all defined system roles
 */
export const getAllRoles = async () => {
  try {
    const response = await apiClient.get('/api/admin/roles');
    // We return the roles array from the response
    return response.data.roles || [];
  } catch (error) {
    console.error("Fetch Roles Error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Create a new custom role with specific permissions
 */
export const createRole = async (roleData) => {
  try {
    const response = await apiClient.post('/api/admin/roles', roleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update an existing role's name, description, or permissions
 */
export const updateRole = async (roleId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/admin/roles/${roleId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Remove a role from the system
 */
export const deleteRole = async (roleId) => {
  try {
    const response = await apiClient.delete(`/api/admin/roles/${roleId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};