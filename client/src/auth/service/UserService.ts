// UserService.ts
import axiosInstance from '../../environments/axiosInstance';
import { UserData } from '../model/authTypes';

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/user/getalluser');
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/user/getuser/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },

  addUser: async (userData: UserData) => {
    try {
      const response = await axiosInstance.post('/admin/user/add', userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  deactivateUser: async (userId: string) => {
    try {
      const response = await axiosInstance.put(`/admin/user/deactivateUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deactivating user with ID ${userId}:`, error);
      throw error;
    }
  },

  activateUser: async (userId: string) => {
    try {
      const response = await axiosInstance.put(`/admin/user/activateUser/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error activating user with ID ${userId}:`, error);
      throw error;
    }
  },
};

export default UserService;
