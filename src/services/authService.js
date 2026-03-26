import { apiClient, setCookie } from "../lib/axios";

/**
 * Handle User Login
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    
    if (response.data && response.data.token) {
      // 1. Store token in localStorage (Primary for API calls)
      localStorage.setItem('accessToken', response.data.token);
      
      // 2. Store token in cookie (Backup/Compatibility)
      setCookie('accessToken', response.data.token);
      
      // 3. Store user data in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Handle User Registration
 */
export const register = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/register', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Handle User Logout
 */
export const logout = () => {
  // 1. Remove from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  
  // 2. Remove from cookies
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  
  // 3. Redirect to login
  window.location.href = '/login';
};