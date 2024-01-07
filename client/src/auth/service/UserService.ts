// UserService.ts
import axiosInstance from "../../environments/axiosInstance";
import { UserData } from "../model/authTypes";

interface GetAllUsersParams {
  page: number;
  pageSize: number;
  offset?: number;
}

const UserService = {
  searchUsers: async (searchTerm: string) => {
    const response = await axiosInstance.post("/admin/user/search", {
      search: searchTerm,
    });
    return response.data;
  },
  fetchUserProfile: async () => {
    const response = await axiosInstance.get("/user/getprofile");
    return response.data;
  },
  getAllUsers: async ({ page, pageSize }: GetAllUsersParams) => {
    const response = await axiosInstance.get("/admin/user/getalluser", {
      params: { page, pageSize },
    });
    return response.data;
  },
  getUserById: async (userId: string) => {
    const response = await axiosInstance.get(`/admin/user/getuser/${userId}`);
    return response.data;
  },
  addUser: async (userData: FormData) => {
    const response = await axiosInstance.post("/admin/user/add", userData, {
      headers: {},
    });
    return response.data;
  },
  deactivateUser: async (userId: string) => {
    const response = await axiosInstance.delete(
      `/admin/user/deactivateUser/${userId}`
    );
    return response.data;
  },
  updateUser: async (userId: string, userData: UserData) => {
    const response = await axiosInstance.patch(
      `/admin/user/updateuser/${userId}`,
      userData
    );
    return response.data;
  },
};

export default UserService;
