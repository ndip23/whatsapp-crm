import axios from 'axios';
import { Agent } from 'http';

const API_URL = process.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
  httpAgent: new Agent({
    keepAlive: true
  }),
});

// Helper function to get cookie value
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const setCookie = (name, value) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
};

// Response interceptor - handle 401 errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ error });
    console.log('API Error:', error?.response?.status, error?.response?.data);
    
    if (error?.response?.status === 401) {
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);

// Request interceptor - add token from cookies
apiClient.interceptors.request.use(
  (config) => {
    try {
      const accessToken = getCookie('accessToken');
      
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);