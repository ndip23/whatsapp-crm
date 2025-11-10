import { apiClient } from "../lib/axios";


export const verifyWebHook = async () => {
  const response = await apiClient.get('/whatsapp/verify/webhook');
  return response;
};

export const incomingMessage = async (credentials) => {
  const response = await apiClient.post(`/whatsapp/webhook/incoming-msg`, credentials);
  return response;
};

export const sendMessage = async (credentials) => {
  const response = await apiClient.post(`/whatsapp/send`, credentials);
  return response;
};



