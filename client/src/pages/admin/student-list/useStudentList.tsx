import { useState, useEffect, useCallback } from "react";
import UserService from "../../../auth/service/UserService";
import useUserState from "../../../auth/model/useUserState";
import { ListItem, UserData } from "../../../auth/model/authTypes";
import React from "react";

const useStudentList = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const {
    user,
    editingUser,
    AddUser,
    setEditUser,
    setAddUser,
    handleInputChange,
    handleSelectChange,
    resetUser,
    handleInputEditChange,
  } = useUserState();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);

  const markItemAsUpdated = (itemId: string) => {
    setListItems((prevListItems) =>
      prevListItems.map((item) =>
        item.id === itemId ? { ...item, updated: true } : item
      )
    );
  };

  const handleSearch = useCallback(async () => {
    if (searchTerm.trim() !== "") {
      const searchData = await UserService.searchUsers(searchTerm);
      setListItems(searchData);
    }
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch();

    // if (
    //   e.target.value === '' &&
    //   e.nativeEvent &&
    //   (e.nativeEvent as InputEvent).inputType === 'deleteContentBackward'
    // ) {
    //   handleSearch();
    // }
  };

  const fetchUserList = useCallback(async () => {
    const response = await UserService.getAllUsers({
      page,
      pageSize: rowsPerPage,
    });
    setListItems(response);
  }, [page, rowsPerPage]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUserList(), handleSearch()]);
      setListItems((items) =>
        items.map((item) => ({ ...item, updated: false }))
      );
    };

    fetchData();
  }, [fetchUserList, handleSearch]);

  const handleAdd = () => {
    resetUser();
    setAddDialogOpen(true);
  };

  const handleEdit = (user: UserData) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditUser(initialUserState);
    setEditDialogOpen(false);
  };

  const handleEditConfirmed = async () => {
    if (editingUser) {
      const updatedUserData = {
        id: editingUser.id,
        pin: editingUser.pin,
        citizen_id: editingUser.citizen_id,
        firstname: editingUser.firstname,
        lastname: editingUser.lastname,
        user_img_path: editingUser.user_img_path,
      };

      const response = await UserService.updateUser(
        editingUser.id,
        updatedUserData
      );

      if (response.status === 200) {
        setEditUser(initialUserState);
      }
      await fetchUserList();
      markItemAsUpdated(editingUser.id);
      setEditDialogOpen(false);
    }
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddConfirmed = async () => {
    const formData = new FormData();
    formData.append("pin", AddUser.pin);
    formData.append("citizen_id", AddUser.citizen_id);
    formData.append("firstname", AddUser.firstname);
    formData.append("lastname", AddUser.lastname);
    formData.append("account_type", AddUser.account_type);
    formData.append("image", image as File);
    console.log(formData);

    await UserService.addUser(formData);
    await fetchUserList();
    setAddDialogOpen(false);
    resetUser();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];

      setImage(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAddUser({ ...AddUser, user_img_path: reader.result as string });
      };

      reader.readAsDataURL(selectedImage);
    }
  };
  const handleEditImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedImage = files[0];

      setImage(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser({ ...editingUser, user_img_path: reader.result as string });
      };

      reader.readAsDataURL(selectedImage);
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
    try {
      if (itemToDelete !== null) {
        await UserService.deactivateUser(itemToDelete);
        const updatedList = listItems.filter(
          (item) => item.id !== itemToDelete
        );
        setListItems(updatedList);
        setItemToDelete(null);
      } else {
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
      }
      await fetchUserList();
    } catch (error) {
      console.error("Error deactivating user(s):", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleChangePage = async (newPage: number) => {
    setPage(newPage);
    await fetchUserList();
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    fetchUserList();
  };

  const initialUserState: UserData = {
    id: "",
    pin: "",
    citizen_id: "",
    firstname: "",
    lastname: "",
    user_img_path: "" || null,
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
    searchTerm,
    setAddUser,
    setSearchTerm,
    handleSearch,
    setEditUser,
    handleInputChange,
    handleImageChange,
    resetUser,
    handleSelectChange,
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
    markItemAsUpdated,
    handleChange,
    handleEditImageChange
  };
};

export default useStudentList;
