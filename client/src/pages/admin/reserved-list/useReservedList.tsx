import { useState, useEffect } from "react";
import UserService from "../../../auth/service/UserService";
import useUserState from "../../../auth/model/useUserState";
import { ReservedListItem } from "../../../auth/model/reserved-list";

const useReservedList = () => {
  const [listItems, setListItems] = useState<ReservedListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const { user, editingUser, AddUser, setEditUser, handleInputChange, resetUser, handleInputEditChange } = useUserState();

  const fetchUserList = async () => {
    try {
      // const data = await UserService.getAllUsers();
      // setListItems(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.id));
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
  const handleDelete = async (id: string) => {
    await fetchUserList();
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (itemToDelete !== null) {
      try {
        await UserService.deactivateUser(itemToDelete);
        const updatedList = listItems.filter(
          (item) => item.id !== itemToDelete
        );
        setListItems(updatedList);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error deactivating user:", error);
      }
    } else {
      try {
        await Promise.all(
          selectedItems.map(async (id) => {
            await UserService.deactivateUser(id);
          })
        );
        const updatedList = listItems.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setListItems(updatedList);
        setSelectedItems([]);
      } catch (error) {
        console.error("Error deactivating users:", error);
      }
    }
    await fetchUserList();
    setDeleteDialogOpen(false);
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
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

  return {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    itemToDelete,
    user,
    AddUser,
    editingUser,
    handleSelectAll,
    setEditUser,
    handleCheckboxChange,
    handleInputChange,
    resetUser,
    handleInputEditChange,
    fetchUserList,
    // ... ส่วนที่เพิ่มมา
    handleDelete,
    handleDeleteConfirmed,
    handleDeleteAll,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useReservedList;
