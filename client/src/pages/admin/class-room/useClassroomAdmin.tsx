import RoomService, {
  ClassScheduleItem,
} from "../../../auth/service/RoomService";
import axiosInstance from "../../../environments/axiosInstance";
import { useEffect, useState } from "react";

const useClassroomAdmin = () => {
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [timetableData, setTimetableData] = useState<ClassScheduleItem[]>([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [teacherIds, setTeacherIds] = useState<
        { id: number; firstname: string }[]
    >([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectAll, setSelectAll] = useState(false);
    const [editClass, setEditClass] = useState({
        class_id:"",
        subject_id:"",
        day_of_week: "",
        start_time: "",
        end_time: "",
    });
    const handleInputEditChangeClass = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setEditClass((prevRoom) => ({
        ...prevRoom,
        [name]: value,
        }));
    };
    const getTeacherIds = async () => {
        try {
        const response = await axiosInstance.get("/admin/user/getteacherid");
        setTeacherIds(response.data);
        } catch (error) {
        console.error("Error fetching teacher IDs:", error);
        }
    };

    const handleUserIdChange = (_event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null, value: string | null) => {
        setSelectedUserId(value || ''); // Make sure to handle the case where value is null
    };
    
    
    
    
    
    
    


    
    const handleFetchClassSchedule = () => {
        if (selectedUserId) {
        RoomService.getClassSchedule(selectedUserId)
            .then((response) => {
            setTimetableData(response);
            })
            .catch((error) => {
            console.error("Error fetching class schedule:", error);
            });
        }
    };
    
    useEffect(() => {
        getTeacherIds();
        handleFetchClassSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : timetableData.map((item) => item.reservation_id));
    };
    

    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems((prevSelected) =>
          prevSelected.includes(itemId)
            ? prevSelected.filter((reservation_id) => reservation_id !== itemId)
            : [...prevSelected, itemId]
        );
      };
      const handleEditConfirmed = async () => {
        if (editClass) {
            try {
                const updatedClass: ClassScheduleItem = {
                    id: "",
                    class_id: "",
                    reservation_id: "",
                    subject_name: "",
                    fullname: "",
                    room_number: "",
                    day_of_week: editClass.day_of_week,
                    start_time: editClass.start_time,
                    end_time: editClass.end_time,
                    subject_id: editClass.subject_id
                };
    
                const response = await RoomService.updateClass(editClass.class_id, updatedClass);
    
                if (response.status === 200) {
                    console.log("Subject updated successfully:", response.data);
                    setEditClass({
                        class_id: "",
                        subject_id: "",
                        day_of_week: "",
                        start_time: "",
                        end_time: "",
                    });
                } else {
                    console.error("Failed to update subject:", response.data);
                }
            } catch (error) {
                console.error("Error updating subject:", error);
            }
            await handleFetchClassSchedule();
            setEditDialogOpen(false);
        }
    };

    const handleDeleteConfirmed = async () => {
        try {
            if (itemToDelete !== null) {
                await RoomService.deleteClass(itemToDelete);
                const updatedList = timetableData.filter((item) => item.reservation_id !== itemToDelete);
                setTimetableData(updatedList);
                setItemToDelete(null);
            } else {
            await Promise.all(selectedItems.map(async (id) => RoomService.deleteClass(id)));
            const updatedList = timetableData.filter((item) => !selectedItems.includes(item.reservation_id));
            setTimetableData(updatedList);
            setSelectedItems([]);
            }
            handleFetchClassSchedule();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

      
    const handleDelete = async (classId: string) => {
        handleFetchClassSchedule();
        setItemToDelete(classId);
        setDeleteDialogOpen(true);
    };

  const handleDeleteAll = () => {
    setDeleteDialogOpen(true);
  };
  
    const handleEdit = (classRoom: ClassScheduleItem) => {
        setEditClass(classRoom);
        setEditDialogOpen(true);
        };
  const handleCloseEditDialog = () => {
    setEditClass({
        class_id:'',
        subject_id: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
    });
    setEditDialogOpen(false);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleChangePage = async (newPage: number) => {
    setPage(newPage);
    await handleFetchClassSchedule();
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    handleFetchClassSchedule();
  };
    return {
        page,
        rowsPerPage,
        timetableData,
        teacherIds,
        selectedUserId,
        selectAll,
        editClass,
        deleteDialogOpen,
        selectedItems,
        editDialogOpen,
        setEditClass,
        handleUserIdChange,
        handleFetchClassSchedule,
        handleSelectAll,
        setSelectedItems,
        handleDeleteConfirmed,
        handleCheckboxChange,
        handleEditConfirmed,
        handleDelete,
        handleDeleteAll,
        handleEdit,
        setEditDialogOpen,
        handleCloseEditDialog,
        handleCloseDeleteDialog,
        handleChangePage,
        handleChangeRowsPerPage,
        handleInputEditChangeClass
    };
    };

export default useClassroomAdmin;
