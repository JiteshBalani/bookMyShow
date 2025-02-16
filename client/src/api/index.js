import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    baseURL: API_BASE_URL,
    withCredentials: true
    // timeout: 1000,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// // Add a request interceptor to dynamically add the token
