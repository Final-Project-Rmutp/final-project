import axios, { AxiosInstance } from 'axios';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;
