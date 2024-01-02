import axios, { AxiosInstance } from 'axios';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

const createAxiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
  });
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;