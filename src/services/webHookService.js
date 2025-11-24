import { apiClient } from "../lib/axios";

export const verifyWebHook = async () => {
  try {
    const response = await apiClient.get('/api/whatsapp/verify/webhook');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const incomingMessage = async (credentials) => {
  try {
    const response = await apiClient.post('/api/whatsapp/webhook/incoming-msg', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const sendMessage = async (credentials) => {
  try {
    const response = await apiClient.post('/api/whatsapp/send', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



