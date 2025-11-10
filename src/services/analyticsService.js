import { apiClient } from "../lib/axios";


export const getAnalyticsAdmin = async () => {
  const response = await apiClient.get('/analytics/admin');
  return response;
};

export const getAnalyticsAgents = async () => {
  const response = await apiClient.get(`/analytics/agents`);
  return response;
};

export const getAnalyticsMessages = async () => {
  const response = await apiClient.get(`/analytics/messages`);
  return response;
};



