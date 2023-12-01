import axios, { AxiosInstance } from 'axios';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

const createAxiosInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
  });


  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
