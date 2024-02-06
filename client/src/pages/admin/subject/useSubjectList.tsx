import { useState, useEffect, useCallback } from "react";
import RoomService from "../../../auth/service/RoomService";
import useRoomState from "../../../auth/model/useRoomState";
import { SubjectItemList } from "../../../auth/model/subject";
import {  toast } from 'sonner'
const useSubjectList = () => {
  const [listItems, setListItems] = useState<SubjectItemList[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const {
    AddSubject,
    editingSubject,
    subject,
    //set
    setSubject,
    setEditSubject,
    setAddSubject,
    //func
    handleInputChangeSubject,
    handleInputEditChangeSubject
  } = useRoomState();

  const fetchSubjectList = useCallback(async () => {
    try {
      const response = await RoomService.getAllSubject({ page, pageSize: rowsPerPage });
      setListItems(response);
    } catch (error) {
      console.error("Error fetching subject response:", error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchSubjectList();
  }, [fetchSubjectList]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : listItems.map((item) => item.subject_id));
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleDelete = async (subjectId: string) => {
    await fetchSubjectList();
    setItemToDelete(subjectId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (itemToDelete !== null) {
        await RoomService.deleteSubject(itemToDelete);
        const updatedList = listItems.filter((item) => item.subject_id !== itemToDelete);
        setListItems(updatedList);
        setItemToDelete(null);
        toast.success("Subject deleted successfully");
      } else {
        await Promise.all(selectedItems.map(async (id) => RoomService.deleteSubject(id)));
        const updatedList = listItems.filter((item) => !selectedItems.includes(item.subject_id));
        setListItems(updatedList);
        setSelectedItems([]);
        toast.success("Subjects deleted successfully");
      }
      await fetchSubjectList();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deactivating subject(s):", error);
    }
  };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditConfirmed = async () => {
    if (
      !editingSubject.subject_name ||
      !editingSubject.subject_code ||
      !editingSubject.user_id ||
      !editingSubject.firstname
    ) {
      return;
    }
    if (editingSubject) {
      try {
        const response = await RoomService.updateSubject(editingSubject.subject_id, { ...editingSubject });
        if (response.status === 200) {
          setEditSubject({
            id: "",
            subject_id: "",
            subject_name:"",
            subject_code:"",
            user_id:"",
            firstname:""
          });
        } else {
          toast.error( response.data.message);
        }
      } catch (error) {
        console.error("Error updating subject:", error);
      }
      toast.success("Subject updated successfully:");
      await fetchSubjectList();
      setEditDialogOpen(false);
    }
  };

  const handleAddConfirmed = async () => {
    if (
      !AddSubject.subject_name ||
      !AddSubject.subject_code ||
      !AddSubject.user_id
    ) {
      return;
    }
    try {
      const response = await RoomService.addSubject(AddSubject);
      console.log("API Response:", response);
      await fetchSubjectList();
      setAddDialogOpen(false);
      setSubject(
        {
            id: "",
            subject_id: "",
            subject_name:"",
            subject_code:"",
            user_id:"",
            firstname:""
        }
      );
      toast.success("Subject add successfully:");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
    setAddSubject({
        id: "",
        subject_id: "",
        subject_name:"",
        subject_code:"",
        user_id:"",
        firstname:""
    })
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (subject: SubjectItemList) => {
    setEditSubject(subject);
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    setSubject(
        {
            id: "",
            subject_id: "",
            subject_name:"",
            subject_code:"",
            user_id:"",
            firstname:""
        }
    );
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditSubject({
        id: "",
        subject_id: "",
        subject_name:"",
        subject_code:"",
        user_id:"",
        firstname:""
    });
    setEditDialogOpen(false);
  };

  const handleChangePage = async (newPage: number) => {
    setPage(newPage);
    await fetchSubjectList();
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    fetchSubjectList();
  };

  return {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,
    itemToDelete,
    subject,
    AddSubject,
    addDialogOpen,
    editingSubject,
    editDialogOpen,
    //set
    setSubject,
    setEditSubject,
    setAddSubject,
    //func
    handleInputChangeSubject,
    handleInputEditChangeSubject,
    handleSelectAll,
    handleCloseEditDialog,
    handleCloseAddDialog,
    handleCheckboxChange,
    fetchSubjectList,
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

export default useSubjectList;
