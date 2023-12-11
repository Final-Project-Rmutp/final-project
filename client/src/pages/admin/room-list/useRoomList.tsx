import { useState, useEffect } from "react";
import RoomService from "../../../auth/service/RoomService";
import useRoomState from "../../../auth/model/useRoomState";
import { RoomListActionItem, RoomListItem } from "../../../auth/model/room-list";

const useRoomList = () => {
  const [listItems, setListItems] = useState<RoomListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { room, editingRoom, AddRoom, setEditRoom, handleInputChange, resetRoom, handleInputEditChange } = useRoomState();

  const fetchRoomList = async () => {
    try {
      const data = await RoomService.getAllRoom();
      setListItems(data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchRoomList();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.room_id));
  };
  
  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };
  const handleDelete = async (room_id: string) => {
    await fetchRoomList();
    setItemToDelete(room_id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (itemToDelete !== null) {
      try {
        await RoomService.deleteRoom(itemToDelete);
        const updatedList = listItems.filter(
          (item) => item.id !== itemToDelete
        );
        setListItems(updatedList);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deactivating room:", error);
      }
    } else {
      try {
        await Promise.all(
          selectedItems.map(async (id) => {
            await RoomService.deleteRoom(id);
          })
        );
        const updatedList = listItems.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setListItems(updatedList);
        setSelectedItems([]);
      } catch (error) {
        console.error("Error deactivating rooms:", error);
      }
    }
    await fetchRoomList();
    setDeleteDialogOpen(false);
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditConfirmed = async () => {
    if (editingRoom) {
      try {
        const updatedRoomData = {
          id: editingRoom.id,
          room_id: editingRoom.room_id,
          room_number: editingRoom.room_number,
          room_type: editingRoom.room_type,
          room_capacity: editingRoom.room_capacity,
          room_facilities: editingRoom.room_facilities,
          room_level: editingRoom.room_level,
          room_status: editingRoom.room_status,
        };

        const response = await RoomService.updateRoom(
          editingRoom.room_id,
          updatedRoomData
        );

        if (response.status === 200) {
          console.log("Room updated successfully:", response.data);
          setEditRoom({
            id: "",
            room_id:"",
            room_number: "",
            room_type: "",
            room_capacity: "",
            room_facilities: "",
            room_level: "",
            room_status: "",
          });
        } else {
          console.error("Failed to update room:", response.data);
        }
      } catch (error) {
        console.error("Error updating room:", error);
      }
      await fetchRoomList();
      setEditDialogOpen(false);
    }
  };
  const handleAddConfirmed = async () => {
    try {
      const formData = new FormData();
      formData.append("room_number", room.room_number);
      formData.append("room_type", room.room_type);
      formData.append("room_capacity", room.room_capacity);
      formData.append("room_facilities", room.room_facilities);
      formData.append("room_levele", room.room_level);
      formData.append("room_status", room.room_status);

      const response = await RoomService.addRoom(AddRoom);
      console.log("API Response:", response);
      await fetchRoomList();
      setAddDialogOpen(false);
      resetRoom();
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        room_id:"",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: "",
        room_level: "",
        room_status: "",
    });
    setEditDialogOpen(false);
  };
  return {
    listItems,
    selectAll,
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
  };
};

export default useRoomList;
