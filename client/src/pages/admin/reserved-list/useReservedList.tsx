import React,{useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../environments/axiosInstance";
import RoomService, { GetAllReservationParams } from "../../../auth/service/RoomService";
import { toast } from 'sonner'
import dayjs from "dayjs";


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
    const [reservationStatus, setReservationStatus] = useState("");
    const [reservationDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [selectAllChecked, setSelectAllChecked] = React.useState(false);

    const handleToggleCheckbox = (reservationId: string) => {
      const updatedSelection = selectedItems.includes(reservationId)
        ? selectedItems.filter((id) => id !== reservationId)
        : [...selectedItems, reservationId];
      setSelectedItems(updatedSelection);
    };
    const handleToggleSelectAll = () => {
      const allIds = reservedtList.map((item) => item.reservation_id);
      const updatedSelection = selectAllChecked ? [] : allIds;
      setSelectedItems(updatedSelection);
      setSelectAllChecked(!selectAllChecked);
    };
    const handleCancel = async () => {
      for (const reservationId of selectedItems) {
          await updateReservationStatus("0", reservationId);
      }
      await fetchReservedList();
      setSelectedItems([]);
  };
  const handleApprove = async () => {
    for (const reservationId of selectedItems) {
      await updateReservationStatus("2", reservationId);
    }
    await fetchReservedList();
    setSelectedItems([]);
  };
  
  const handleInProgress = async () => {
      for (const reservationId of selectedItems) {
          await updateReservationStatus("1", reservationId);
      }
      await fetchReservedList();
      setSelectedItems([]);
  };
    const updateReservationStatusForSelectedItems = async (
      status: string
    ) => {
      for (const reservationId of selectedItems) {
        await updateReservationStatus(status, reservationId);
      }
      await fetchReservedList();
      setSelectedItems([]);
    };
      
    
    
    
  
    const handleStatusChange = async (
      _event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
      value: string | null
    ) => {
      const selectedStatus = value as string;
      setReservationStatus(selectedStatus);
      await updateReservationStatusForSelectedItems(selectedStatus);
    };
    
    
  
    const handleDateChange = (value: dayjs.Dayjs | null) => {
      setSelectedDate(value);
    
      // Clear reservation status when the date is cleared
      if (value === null) {
        setReservationStatus("");
      }
    };

    const fetchReservedList = useCallback(async () => {
      try {
        const params: GetAllReservationParams = {
          page: page,
          pageSize: rowsPerPage,
        };
    
        if (reservationStatus !== "") {
          params.reservation_status = reservationStatus;
        }
    
        if (reservationDate !== null) {
          params.reservation_date = reservationDate.toISOString();
        }
    
        const response = await RoomService.getReservationList(params);
        console.log(response);
    
        if (Array.isArray(response.reservelist)) {
          setListItems(response.reservelist);
        } else {
          console.error("Invalid data structure:", response.data);
        }
    
        return response.data;
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        throw error;
      }
    }, [page, rowsPerPage, reservationStatus, reservationDate]);
    
    
    

    useEffect(() => {
      fetchReservedList();
    }, [fetchReservedList, page, rowsPerPage]);
    

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

    const handleChangeRowsPerPage = async (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        await fetchReservedList();
    };

    return {
        page,
        rowsPerPage,
        reservationData,
        reservedtList,
        reservationStatus,
        reservationDate,
        selectAllChecked,
        selectedItems,
        handleChangePage,
        handleChangeRowsPerPage,
        fetchReservedList,
        updateReservationStatus,
        reserveRoom,
        searchRoom,
        setReservationData,
        setListItems,
        handleToggleCheckbox,
        handleToggleSelectAll,
        handleCancel,
        handleApprove,
        handleInProgress,
        handleDateChange,
        handleStatusChange
    };
};

export default useReservedList;
