import {useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../environments/axiosInstance";
import RoomService from "../../../auth/service/RoomService";
import { toast } from 'sonner'

export class reservedList {
    id!:string;
    fullname!:string;
    account_type!:string;
    room_number!:string;
    reservation_id!:string;
    reservation_reason!:string;
    reservation_status!:string;
    reservation_date!:string;
    timestamp!:string;
    start_time!:string;
    end_time!:string;
}
const useReservedList = () => {
    const [reservedtList, setListItems] = useState<reservedList[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [reservationData, setReservationData] = useState({
      room_id: "",
      reservation_date: "",
      start_time: "",
      end_time: "",
      reservation_reason: "",
    });
    const fetchReservedList = useCallback(async () => {
        const response = await RoomService.getReservationList({ page, pageSize: rowsPerPage });
        setListItems(response.reservelist);
        return response.data;
    }, [page, rowsPerPage]);
    
    

    useEffect(() => {
      fetchReservedList();
    }, [fetchReservedList]);

    const searchRoom = async () => {
        const response = await axiosInstance.post("/reservation/searchroom", {
          room_capacity: "",
          room_level: "",
          room_type: "",
          room_number: "",
          reservation_date: "",
          start_time: "",
          end_time: "",
        });
        return response.data
    };
  
    const reserveRoom = async () => {
        const response = await axiosInstance.post("/reservation/reserve", {
          ...reservationData,
        });
        await fetchReservedList();
        return response.data
    };
  
  
    const updateReservationStatus = async (
      currentStatus: string,
      reservationId: string
    ) => {
      const newStatus = currentStatus;
      try {
        const response = await axiosInstance.patch(
          "/reservation/updatestatus",
          {},
          {
            params: {
              reservation_id: reservationId,
              reservation_status: newStatus,
            },
          }
        );
        await fetchReservedList();
        return response.data;
      } catch (error) {
        toast.error("Time slot is not available");
      }
    };
    
    const handleChangePage = async (newPage: number) => {
        setPage(newPage);
        await fetchReservedList();
    };

    const handleChangeRowsPerPage = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        fetchReservedList();
    };

    return {
        page,
        rowsPerPage,
        reservationData,
        reservedtList,
        handleChangePage,
        handleChangeRowsPerPage,
        fetchReservedList,
        updateReservationStatus,
        reserveRoom,
        searchRoom,
        setReservationData
    };
};

export default useReservedList;
