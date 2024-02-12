// RoomService.ts
import { SubjectItemList } from '../model/subject';
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


export interface ClassScheduleItem {
    id:string;
    class_id:string;
    subject_id: string;
    reservation_id: string;
    subject_name: string;
    fullname: string;
    room_number: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
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
    getRoomTypeById: async (roomtypeId: string) => {
        const response = await axiosInstance.get(`/admin/room/getroomtype/${roomtypeId}`, {
            
        });
        return response.data.room_types;
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
    getAdminReportList: async ({ page, pageSize }: GetAllRoomsParams) => {
        const response = await axiosInstance.get('/admin/getreport',{
            params: { page, pageSize },
        });
        return response.data;
    },
    searchRoom: async (searchRoom: SearchRoomParams) => {
        const response = await axiosInstance.post('/reservation/searchroom', searchRoom);
        return response.data;
    },
    getReservationList: async ({ page, pageSize }: GetAllRoomsParams) => {
        const response = await axiosInstance.get('/reservation/getreservation',{
            params: { page, pageSize },
        });
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
    getdaudata: async (token: string) => {
        const response = await axiosInstance.get('/dashboard/getdaudata', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    },
    getReportData: async () => {
        const response = await axiosInstance.get('/dashboard/getreportdata', {
        });
        return response.data;
    },
    getAllSubject: async ({ page, pageSize }: GetAllRoomsParams) => {
        const response = await axiosInstance.get('/admin/subject/getallsubject',{
            params: { page, pageSize },
        });
        return response.data;
    },
    addSubject: async (subjectData: SubjectItemList) => {
        const response = await axiosInstance.post('/admin/subject/addsubject', subjectData);
        return response.data;
    },
    deleteSubject: async (subjectId: string) => {
        const response = await axiosInstance.delete(`/admin/subject/deletesubject/${subjectId}`);
        return response.data;
    },
    updateSubject: async (subjectId: string, subjectData: SubjectItemList) => {
        const response = await axiosInstance.patch(`/admin/subject/updatesubject/${subjectId}`, subjectData);
        return response.data;
    },
    getClassSchedule: async (userId: string): Promise<ClassScheduleItem[]> => {
        const response = await axiosInstance.get('/class/getClassSchedule', {
            params: { user_id: userId },
        });
        return response.data;
    },
    deleteClass: async (classId: string) => {
        const response = await axiosInstance.delete(`/class/deleteclass/${classId}`);
        return response.data;
    },
    updateClass: async (classId: string,dataClass:ClassScheduleItem) => {
        const response = await axiosInstance.patch(`/class/updateclass/${classId}`,dataClass);
        return response.data;
    },
};

export default RoomService;
