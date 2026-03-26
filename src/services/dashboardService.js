import { apiClient } from "../lib/axios";

export const getDashboardStats = async () => {
  const response = await apiClient.get('/api/analytics/admin');
  // Note: Your backend controller returns the object directly, not wrapped in .stats
  return response.data; 
};

export const getAgentPerformance = async () => {
  const response = await apiClient.get('/api/analytics/agents');
  return response.data; // Returns array of agents
};

export const getMessagesByDay = async () => {
  const response = await apiClient.get('/api/analytics/messages');
  return response.data; // Returns array for the chart
};