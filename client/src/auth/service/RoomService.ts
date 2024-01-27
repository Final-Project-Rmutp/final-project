// RoomService.ts
import axiosInstance from '../../environments/axiosInstance';
import { RoomListActionItem } from '../model/room-list';

interface GetAllRoomsParams {
    page: number;
    pageSize: number;
    offset?: number
}
export class SearchRoomParams {
    id!:string;
    room_id!:string;
    room_capacity!: string;
    room_level!: string;
    room_type!: string;
    room_number!: string;
    reservation_date!: string;
    start_time!: string;
    end_time!: string;
}
export interface ReservationListUser {
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
export interface AddClassParams {
    subject_id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    room_id: string;
}
const RoomService = {
    getAllRoom: async ({ page, pageSize }: GetAllRoomsParams) => {
        const response = await axiosInstance.get('/admin/room/getallroom',{
            params: { page, pageSize },
        });
        return response.data;
    },
    getRoomById: async (roomId: string) => {
        const response = await axiosInstance.get(`/admin/room/getallroom/${roomId}`);
        return response.data;
    },
    addRoom: async (roomData: RoomListActionItem) => {
        const response = await axiosInstance.post('/admin/room/add', roomData);
        return response.data;
    },
    deleteRoom: async (roomId: string) => {
        const response = await axiosInstance.delete(`/admin/room/deleteroom/${roomId}`);
        return response.data;
    },
    updateRoom: async (roomId: string, roomData: RoomListActionItem) => {
        const response = await axiosInstance.patch(`/admin/room/updateroom/${roomId}`, roomData);
        return response.data;
    },
    getAdminReportList: async () => {
        const response = await axiosInstance.get(`/admin/getreport/`);
        return response.data;
    },
    searchRoom: async (searchRoom: SearchRoomParams) => {
        const response = await axiosInstance.post('/reservation/searchroom', searchRoom);
        return response.data;
    },
    getReservationList: async () => {
        const response = await axiosInstance.get('/reservation/getreservation');
        return response.data;
    },

    addClass: async (classData: AddClassParams) => {
        const response = await axiosInstance.post('/class/addclass', classData);
        return response.data;
    },
    
    getReservedData: async () => {
        const response = await axiosInstance.get('/dashboard/getreserveddata');
        return response.data;
    },

};

export default RoomService;
