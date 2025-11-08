import { apiClient } from "../lib/axios";


export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response;
};

export const register = async (credentials) => {
  const response = await apiClient.post('/auth/register', credentials);
  return response;
};