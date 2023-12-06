import { useState, useEffect } from "react";
import UserService from "../../../auth/service/UserService";
import useUserState from "../../../auth/model/useUserState";
import { ListItem, UserData } from "../../../auth/model/authTypes";
const useStudentList = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<File | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { user, editingUser,AddUser, setEditUser, handleInputChange, resetUser, handleInputEditChange } = useUserState();

  const fetchUserList = async () => {
    try {
      const data = await UserService.getAllUsers();
      setListItems(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleAdd = () => {
    resetUser();
    setUserImage(null);
    setAddDialogOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditUser({
      id: "",
      pin: "",
      citizen_id: "",
      firstname: "",
      lastname: "",
    });
    setEditDialogOpen(false);
  };

  const handleEditConfirmed = async () => {
    if (editingUser) {
      try {
        const updatedUserData = {
          id: editingUser.id,
          pin: editingUser.pin,
          citizen_id: editingUser.citizen_id,
          firstname: editingUser.firstname,
          lastname: editingUser.lastname,
        };

        const response = await UserService.updateUser(
          editingUser.id,
          updatedUserData
        );

        if (response.status === 200) {
          console.log("User updated successfully:", response.data);
          setEditUser({
            id: "",
            pin: "",
            citizen_id: "",
            firstname: "",
            lastname: "",
          });
        } else {
          console.error("Failed to update user:", response.data);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
      await fetchUserList();
      setEditDialogOpen(false);
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setUserImage(null);
  };

  const handleAddConfirmed = async () => {
    try {
      const formData = new FormData();
      formData.append("pin", user.pin);
      formData.append("citizen_id", user.citizen_id);
      formData.append("firstname", user.firstname);
      formData.append("lastname", user.lastname);
      formData.append("account_type", user.account_type);
      if (userImage) {
      formData.append("image", userImage);
    }
      const response = await UserService.addUser(AddUser);
      console.log("API Response:", response);
      await fetchUserList();
      setAddDialogOpen(false);
      resetUser();
      setUserImage(null); 
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUserImage(files[0]);
    }
  };
  
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
    editDialogOpen,
    addDialogOpen,
    user,
    AddUser,
    editingUser,
    setEditUser,
    handleInputChange,
    handleImageChange,
    resetUser,
    handleInputEditChange,
    fetchUserList,
    handleAdd,
    handleEdit,
    handleCloseEditDialog,
    handleEditConfirmed,
    handleCloseAddDialog,
    handleAddConfirmed,
    handleSelectAll,
    handleCheckboxChange,
    handleDelete,
    handleDeleteConfirmed,
    handleDeleteAll,
    handleCloseDeleteDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};

export default useStudentList;
