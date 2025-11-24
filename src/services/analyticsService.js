import { apiClient } from "../lib/axios";

export const getAnalyticsAdmin = async () => {
  try {
    const response = await apiClient.get('/api/analytics/admin');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAnalyticsAgents = async () => {
  try {
    const response = await apiClient.get('/api/analytics/agents');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAnalyticsMessages = async () => {
  try {
    const response = await apiClient.get('/api/analytics/messages');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



