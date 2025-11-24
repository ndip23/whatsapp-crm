import { apiClient } from "../lib/axios";

export const createShift = async (credentials) => {
  try {
    const response = await apiClient.post('/api/shift/create-shift', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const viewShifts = async () => {
  try {
    const response = await apiClient.get('/api/shift/view-shifts');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const editShift = async (shiftId, updatedData) => {
  try {
    const response = await apiClient.put(`/api/shift/update/${shiftId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const assignShiftAgent = async (agentId, shiftData) => {
  try {
    const response = await apiClient.put(`/api/shift/assign/${agentId}`, shiftData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateShiftStatus = async () => {
  try {
    const response = await apiClient.put('/api/shift/update-status');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
