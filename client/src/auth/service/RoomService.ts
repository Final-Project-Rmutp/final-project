// RoomService.ts
import axiosInstance from '../../environments/axiosInstance';
import { RoomListActionItem } from '../model/room-list';


const token = localStorage.getItem('token');
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
}

interface GetAllRoomsParams {
    page: number;
    pageSize: number;
    offset?: number
}
const RoomService = {

    getAllRoom: async ({ page, pageSize }: GetAllRoomsParams) => {
        const response = await axiosInstance.get('/admin/room/getallroom',{
            headers,
            params: { page, pageSize },
        });
        return response.data;
    },

    getRoomById: async (roomId: string) => {
        const response = await axiosInstance.get(`/admin/room/getallroom/${roomId}`,{headers});
        return response.data;
    },

    addRoom: async (roomData: RoomListActionItem) => {
        const response = await axiosInstance.post('/admin/room/add', roomData,{headers});
        return response.data;
    },
    deleteRoom: async (roomId: string) => {
        const response = await axiosInstance.delete(`/admin/room/deleteroom/${roomId}`,{headers});
        return response.data;
    },
    updateRoom: async (roomId: string, roomData: RoomListActionItem) => {
        const response = await axiosInstance.patch(`/admin/room/updateroom/${roomId}`, roomData,{headers});
        return response.data;
    },

};

export default RoomService;
