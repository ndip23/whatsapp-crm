import axios from 'axios';

// Ensure the URL does NOT have a trailing slash
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000 // 60 seconds to allow Render to wake up
});

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const setCookie = (name, value) => {
  const isSecure = window.location.protocol === 'https:';
  // Added SameSite=Lax and Secure for Vercel/Render compatibility
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; ${isSecure ? 'Secure;' : ''} SameSite=Lax`;
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is 401, we just clear the local data. 
    // WE DO NOT REFRESH THE PAGE.
    if (error?.response?.status === 401) {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.removeItem('user');
      // The React Router will naturally keep the user on the Login page
      // based on the logic in App.jsx.
    }
    return Promise.reject(error);
  }
);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);