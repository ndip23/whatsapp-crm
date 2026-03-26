import axios from 'axios';

// Backend API URL - ensures no trailing slash
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000 // 60 seconds to allow Render to wake up
});

// Helper function to get cookie value (Kept for compatibility)
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Helper to set cookies (Updated with modern security)
export const setCookie = (name, value) => {
  const isSecure = window.location.protocol === 'https:';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; ${isSecure ? 'Secure;' : ''} SameSite=Lax`;
};

// --- REQUEST INTERCEPTOR ---
// This grabs the token from localStorage and puts it in the header
apiClient.interceptors.request.use(
  (config) => {
    try {
      // We look for the token in localStorage first as it's more reliable for Vercel/Render
      const token = localStorage.getItem('accessToken');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
// This handles 401 errors if the token expires
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Clear everything
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);