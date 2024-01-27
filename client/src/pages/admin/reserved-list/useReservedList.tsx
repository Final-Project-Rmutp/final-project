import {useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../environments/axiosInstance";
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
      const response = await axiosInstance.get("/reservation/getreservation", {
        params: {
          page: 0,
          pageSize: 0,
        },
      });
      setListItems(response.data);
      return response.data;

      }, []);

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
  
    const getReservations = async () => {
        const response = await axiosInstance.get("/reservation/getreservation", {
          params: {
            page: 1,
            pageSize: 10,
          },
        });
        return response.data

    };
  
    const updateReservationStatus = async (
      currentStatus: string,
      reservationId: string
    ) => {
      const newStatus = currentStatus;
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
      return response.data;
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
        getReservations,
        updateReservationStatus,
        reserveRoom,
        searchRoom,
        setReservationData
    };
};

export default useReservedList;
