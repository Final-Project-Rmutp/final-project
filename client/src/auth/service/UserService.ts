// UserService.ts
import axiosInstance from '../../environments/axiosInstance';
import { AdduserListItem, UserData } from '../model/authTypes';


const token = localStorage.getItem('token');
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
}

interface GetAllUsersParams {
  page: number;
  pageSize: number;
  offset?: number
}
const UserService = {

  fetchUserProfile:async () => {
    try {
      const response = await axiosInstance.get('/user/getprofile',{
      headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },

  getAllUsers: async ({ page, pageSize }: GetAllUsersParams) => {
    try {
      const response = await axiosInstance.get('/admin/user/getalluser', {
        headers,
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/user/getuser/${userId}`,{headers});
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },

  addUser: async (userData: AdduserListItem) => {
    try {
      const response = await axiosInstance.post('/admin/user/add', userData,{headers});
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  deactivateUser: async (userId: string) => {
    try {
      const response = await axiosInstance.delete(`/admin/user/deactivateUser/${userId}`,{headers});
      return response.data;
    } catch (error) {
      console.error(`Error deactivating user with ID ${userId}:`, error);
      throw error;
    }
  },
  updateUser: async (userId: string, userData: UserData) => {
    try {
      const response = await axiosInstance.patch(`/admin/user/updateuser/${userId}`, userData,{headers});
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },

};

export default UserService;
