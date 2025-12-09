import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8001/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    // Skip redirect for /dashboard to allow AuthProvider to handle
    if (err.response?.status === 401 && err.config.url !== '/dashboard') {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const api = axios;