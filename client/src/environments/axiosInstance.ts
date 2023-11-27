import axios, { AxiosInstance } from 'axios';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

const createAxiosInstance = () => {
  const token = localStorage.getItem('token');

  const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  // Add an interceptor to update the Authorization header on each request
  instance.interceptors.request.use((config) => {
    const updatedToken = localStorage.getItem('token');
    if (updatedToken) {
      config.headers['Authorization'] = `Bearer ${updatedToken}`;
    }
    return config;
  });

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
