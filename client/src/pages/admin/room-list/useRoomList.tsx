import { useState, useCallback } from "react";
import RoomService from "../../../auth/service/RoomService";
import useRoomState from "../../../auth/model/useRoomState";
import { RoomListActionItem, RoomListItem } from "../../../auth/model/room-list";
import axiosInstance from "../../../environments/axiosInstance";
import { toast } from 'sonner'

const useRoomList = () => {
  const [listItems, setListItems] = useState<RoomListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [facilities, setFacilities] = useState<{ facility_id: string; facility_name: string }[]>([]);

  const {
    room,
    editingRoom,
    AddRoom,
    setEditRoom,
    setAddRoom,
    handleInputChange,
    resetRoom,
    handleInputEditChange,
  } = useRoomState();

  const fetchRoomList = useCallback(async () => {
    try {
      const response = await RoomService.getAllRoom({ page, pageSize: rowsPerPage });
      setListItems(response);
    } catch (error) {
      console.error("Error fetching room response:", error);
    }
  }, [page, rowsPerPage]);

  const fetchFacilities = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/admin/facility/getallfacility');
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  }, []); 

  


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.room_id));
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleDelete = async (roomId: string) => {
    await fetchRoomList();
    await fetchFacilities();
    setItemToDelete(roomId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (itemToDelete !== null) {
        await RoomService.deleteRoom(itemToDelete);
        const updatedList = listItems.filter((item) => item.room_id !== itemToDelete);
        setListItems(updatedList);
        setItemToDelete(null);
      } else {
        await Promise.all(selectedItems.map(async (id) => RoomService.deleteRoom(id)));
        const updatedList = listItems.filter((item) => !selectedItems.includes(item.room_id));
        setListItems(updatedList);
        setSelectedItems([]);
      }
      await fetchRoomList();
      await fetchFacilities();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deactivating room(s):", error);
    }
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditConfirmed = async () => {
    if (
      !editingRoom.room_number ||
      !editingRoom.room_type ||
      !editingRoom.room_capacity ||
      !editingRoom.facilities_id ||
      !editingRoom.room_level ||
      !editingRoom.room_status
    ) {
        return;
    }
    if (editingRoom) {
      try {
        await RoomService.updateRoom(editingRoom.room_id, {
          id:editingRoom.id,
          room_id: editingRoom.room_id,
          room_number: editingRoom.room_number,
          room_type: editingRoom.room_type,
          room_capacity: editingRoom.room_capacity,
          room_facilities: editingRoom.room_facilities,
          facilities_id: editingRoom.facilities_id,
          room_level: editingRoom.room_level,
          room_status: editingRoom.room_status,
        });
  
        console.log('Room updated successfully');
        setEditDialogOpen(false);
        await fetchRoomList(); 
        await fetchFacilities();
      } catch (error) {
        console.error('Error updating room:', error);
      }
    }
  };

  const handleAddConfirmed = async () => {
    try {
      const response = await RoomService.addRoom(AddRoom);
      console.log("API Response:", response);
      setAddDialogOpen(false);
      resetRoom();
      await fetchRoomList();
      await fetchFacilities();
      window.location.reload();
      toast.success("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Error adding room. Please try again.");
    }
  };
  

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (room: RoomListActionItem) => {
    setEditRoom(room);
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    resetRoom();
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditRoom({
      id: "",
      room_id: "",
      room_number: "",
      room_type: "",
      room_capacity: "",
      room_facilities: [0, 1],
      facilities_id:[1, 2],
      room_level: "",
      room_status: "",
    });
    setEditDialogOpen(false);
  };

  const handleChangePage = async (newPage: number) => {
    setPage(newPage);
    await fetchRoomList();
    await fetchFacilities();

  };

  const handleChangeRowsPerPage = async (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    await fetchRoomList();
    await fetchFacilities();

  };

  return {
    listItems,
    selectAll,
    facilities,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    itemToDelete,
    room,
    AddRoom,
    addDialogOpen,
    editingRoom,
    editDialogOpen,
    handleSelectAll,
    handleCloseEditDialog,
    handleCloseAddDialog,
    setEditRoom,
    handleCheckboxChange,
    handleInputChange,
    resetRoom,
    handleInputEditChange,
    fetchRoomList,
    handleDelete,
    handleDeleteConfirmed,
    handleDeleteAll,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleAdd,
    handleAddConfirmed,
    handleEditConfirmed,
    fetchFacilities,
    setAddRoom,
  };
};

export default useRoomList;
