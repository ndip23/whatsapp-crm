import { apiClient, setCookie } from "../lib/axios";

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    if (response.data && response.data.token) {
      // Store token in cookie
      setCookie('accessToken', response.data.token);
      // Store user data in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/register', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Remove token from cookie
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // Remove user from localStorage
  localStorage.removeItem('user');
};