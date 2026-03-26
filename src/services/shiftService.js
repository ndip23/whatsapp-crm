import { apiClient } from "../lib/axios";

export const createShift = async (data) => {
  const response = await apiClient.post('/api/shift/create-shift', data);
  return response.data;
};

export const viewShifts = async () => {
  const response = await apiClient.get('/api/shift/view-shifts');
  return response.data; // Expecting an array
};

export const editShift = async (shiftId, updatedData) => {
  const response = await apiClient.put(`/api/shift/update/${shiftId}`, updatedData);
  return response.data;
};

export const assignShiftAgent = async (agentId, shiftData) => {
  const response = await apiClient.put(`/api/shift/assign/${agentId}`, shiftData);
  return response.data;
};