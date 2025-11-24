import { apiClient } from "../lib/axios";

export const getNotifications = async () => {
  try {
    const response = await apiClient.get('/api/notifications');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await apiClient.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
