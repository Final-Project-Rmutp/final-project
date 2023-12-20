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

  searchUsers: async (searchTerm: string) => {
      const response = await axiosInstance.post('/admin/user/search', { search: searchTerm }, { headers });
      return response.data;
  },
  fetchUserProfile:async () => {
      const response = await axiosInstance.get('/user/getprofile',{
      headers,
      });
      return response.data;
  },

  getAllUsers: async ({ page, pageSize }: GetAllUsersParams) => {
      const response = await axiosInstance.get('/admin/user/getalluser', {
        headers,
        params: { page, pageSize },
      });
      return response.data;
  },

  getUserById: async (userId: string) => {
      const response = await axiosInstance.get(`/admin/user/getuser/${userId}`,{headers});
      return response.data;
  },

  addUser: async (userData: AdduserListItem) => {
      const response = await axiosInstance.post('/admin/user/add', userData,{headers});
      return response.data;
  },

  deactivateUser: async (userId: string) => {
      const response = await axiosInstance.delete(`/admin/user/deactivateUser/${userId}`,{headers});
      return response.data;
  },
  
  updateUser: async (userId: string, userData: UserData) => {
      const response = await axiosInstance.patch(`/admin/user/updateuser/${userId}`, userData,{headers});
      return response.data;
  },

};

export default UserService;
