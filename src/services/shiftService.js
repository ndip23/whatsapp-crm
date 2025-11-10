import { apiClient } from "../lib/axios";

export const createShift = async (credentials) => {
  const response = await apiClient.post('/shift/create-shift', credentials);
  return response;
};

export const viewShifts = async () => {
  const response = await apiClient.get('/shift/view-shifts');
  return response;
};

export const editShift = async (shiftId, updatedData) => {
  const response = await apiClient.put(`/shift/update/${shiftId}`, updatedData);
  return response;
};

export const assignShiftAgent = async (agentId) => {
  const response = await apiClient.put(`/shift/assign/${agentId}`);
  return response;
};

export const updateShiftStatus = async () => {
  const response = await apiClient.put(`/shift/update-status`);
  return response;
};
