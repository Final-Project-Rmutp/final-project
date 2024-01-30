// UserService.ts
import axiosInstance from "../../environments/axiosInstance";
import { UserData } from "../model/authTypes";

interface GetAllUsersParams {
  page: number;
  pageSize: number;
  offset?: number;
}

export interface ReservedListUserItem {
  id:string;
  fullname: string;
  account_type: string;
  room_number: string;
  reservation_reason: string;
  reservation_status: string;
  reservation_date: string;
  timestamp: string;
  start_time: string;
  end_time: string;
}
export interface Reservation {
  id:string;
  room_id: string;
  room_number: string;
  reservation_date: string;
  start_time: string;
  end_time: string;
  reservation_reason: string;
}
export interface UserReportItem {
  room_id:string;
  report_detail:string;
}

export interface ClassSchedule {
  reservation_id: number;
  subject_name: string;
  fullname: string;
  room_number: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
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
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  deactivateUser: async (userId: string) => {
    const response = await axiosInstance.delete(
      `/admin/user/deactivateUser/${userId}`
    );
    return response.data;
  },
  updateUser: async (userId: string, userData: UserData | FormData) => {
    let response;

    if (userData instanceof FormData) {
      // If userData is FormData (contains an image), send as multipart/form-data
      response = await axiosInstance.patch(
        `/admin/user/updateuser/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      // If userData is UserData (no image), send as JSON
      response = await axiosInstance.patch(
        `/admin/user/updateuser/${userId}`,
        userData
      );
    }

    return response.data;
  },
  getUserReportList: async () => {
      const response = await axiosInstance.get(`/user/getreport/`);
      return response.data;
  },
  getReservationListUser: async ({ page, pageSize }: GetAllUsersParams) => {
    const response = await axiosInstance.get('/user/getreservation',{
        params: { page, pageSize },
    });
    return response.data;
  },
  reserveRoom: async (reservationData: Reservation) => {
    const response = await axiosInstance.post('/reservation/reserve', reservationData);
    return response.data;
  },
  reportRoom: async (reportData: UserReportItem) => {
    const response = await axiosInstance.post('/user/room/report', reportData);
    return response.data;
  },
  getClassSchedule: async (): Promise<ClassSchedule> => {
      const response = await axiosInstance.get("/user/getschedule");
      return response.data as ClassSchedule;
  },
  
};

export default UserService;
