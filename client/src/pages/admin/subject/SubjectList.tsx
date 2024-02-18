import React, { useEffect, useState} from "react";
import { DialogContent, DialogActions } from "@mui/material";
import {  toast } from 'sonner'

import {
  Checkbox,
  Button,
  Sheet,
  Table,
  ModalDialog,
  Modal,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Box,
  DialogTitle,
  Select,
  Option
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../student-list/StudentListStyled";
import useSubjectList from "./useSubjectList";
import DeleteForever from "@mui/icons-material/DeleteForever";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import axiosInstance from "../../../environments/axiosInstance";
import AddIcon from '@mui/icons-material/Add';

import "dayjs/locale/th";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import NewAdapter from "../../user/room/AdapterDay";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTime } from "../../../pages/user/room/ReservationStyled";

// import styled from 'styled-components';

// const TimetableContainer = styled.div`
//   margin: 20px auto;
//   text-align: center;
// `;

// const TimetableHeader = styled.h1`
//   font-size: 24px;
// `;

// const TimetableTable = styled.table`
//   border-collapse: collapse;
//   width: 70%;
//   margin: 30px auto;
// `;

// const TimetableTh = styled.th`
//     color:black;
//   border: 1px solid black;
//   height: 50px;
//   text-align: center;
//   background-color: #f2f2f2;
// `;

// const TimetableTd = styled.td`
//     color:black;
//   border: 1px solid black;
//   height: 50px;
//   text-align: center;
// `;
export class AddclassItem {
    subject_id!: string;
    day_of_week!: string;
    start_time!: string;
    end_time!: string;
    room_id!: string;
}
export class AddclassItemRes {
    id!: string;
    subject_id!: string;
    day_of_week!: string;
    start_time!: string;
    end_time!: string;
    room_id!: string;
}
const SubjectList: React.FC = () => {
  const {
    listItems,
    selectAll,
    selectedItems,
    page,
    rowsPerPage,
    deleteDialogOpen,

    AddSubject,
    addDialogOpen,
    editingSubject,
    editDialogOpen,
    //set
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
  } = useSubjectList();
    const [userOptions, setUserOptions] = useState<{ id: string; firstname: string }[]>([]);
    const [roomnumber, setRoomnumber] = useState<{ room_id: string; room_number: string }[]>([]);
    const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [availableFloorsApi, setRoomFloorsApi] = useState<string[]>([]);

    const [selectedStartTime] =
    useState<dayjs.Dayjs | null>(dayjs().startOf("day").hour(8));
  const [selectedEndTime] = useState<dayjs.Dayjs | null>(
    dayjs().startOf("day").hour(9)
  );

  const handleStartTimeChange = (value: dayjs.Dayjs | null) => {
    setAddClass((prevClass) => ({
        ...prevClass,
        start_time: value ? value.format("HH:mm") : "",
    }));
};

const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
    setAddClass((prevClass) => ({
        ...prevClass,
        end_time: value ? value.format("HH:mm") : "",
    }));
};
  const shouldDisableStartTime = (value: dayjs.Dayjs) => {
    const hour = value.hour();
    return hour < 8 || hour > 18;
  };
  const shouldDisableEndTime = (value: dayjs.Dayjs) => {
    const hour = value.hour();
    return hour < 9 || hour > 18;
  };

  useEffect(() => {
    const fetchRoomLevel = async () => {
      try {
        const response = await axiosInstance.get(`/admin/room/getroomlevel`);
        setRoomFloorsApi(response.data.roomlevel);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };
    
    fetchRoomLevel();
    
  }, []); 
    useEffect(() => {
        const fetchRoomNumber = async () => {
          if (selectedFloor) {
            try {
              const response = await axiosInstance.get(`/admin/room/getroomnumber/${selectedFloor}`);
              setRoomnumber(response.data);
            } catch (error) {
              console.error("Error fetching room numbers:", error);
            }
          }
        };
    
        if (selectedFloor) {
          fetchRoomNumber();
        }
      }, [selectedFloor]);
    useEffect(() => {
        fetchUserOptions();
    }, []);
    const fetchUserOptions = async () => {
        const response = await axiosInstance.get("/admin/user/getteacherid");
        setUserOptions(response.data);
    }





    const [AddClass,setAddClass] = useState<AddclassItem>({
        subject_id: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
        room_id: "",
    });
    const [addClassDialogOpen, setAddClassDialogOpen] = useState(false);
    const [timetableData, setTimetableData] = useState<AddclassItemRes[]>([]);

    const handleCloseAddClassDialog = () => {
        setAddClassDialogOpen(false);
    };

    const handleAddclass = (subjectId: string) => {
        setAddClass({
          subject_id: subjectId,
          day_of_week: "",
          start_time: "",
          end_time: "",
          room_id: "",
        });
    
        // Open the add dialog
        setAddClassDialogOpen(true);
    };
//       const handleAddClassConfirmed = async () => {
//         try {
//             const startHours = parseInt(AddClass.start_time.split(":")[0]);
//             const endHours = parseInt(AddClass.end_time.split(":")[0]);
//             for(let i = startHours; i < endHours; i++) {
//                 const response = await axiosInstance.post("/class/addclass", {
//                     subject_id: AddClass.subject_id,
//                     day_of_week: AddClass.day_of_week,
//                     start_time: `` + i + `:00`,
//                     end_time: `` + (i + 1) + `:00`,
//                     room_id: AddClass.room_id,
//                 });
//                 const responseData = response.data;

//                 // ตรวจสอบ response และทำตามที่ต้องการ
//                 if (responseData.message === "Class added successfully") {
//                   // เพิ่มข้อมูลใหม่เข้าไปใน state timetableData
//                     setTimetableData((prevData) => [...prevData, responseData.newClass])
//                     // [...timetableData, responseData.newClass]
//                     console.log("Class added successfully");
//                 } else {
//                     console.log("Error:", responseData.error);
//                 }
//             }
     
//         handleCloseAddClassDialog();
    
//         // Reset the input values
//         setAddClass({
//             subject_id: "",
//             day_of_week: "",
//             start_time: "",
//             end_time: "",
//             room_id: "",
//         });
//         await fetchSubjectList();
//         } catch (error) {
//         console.error("Error creating class:", error);
//         }
//     };
// const handleInputChangeAddClass= (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setAddClass((prevUser) => ({
//     ...prevUser,
//     [name]: value,
//     }));
// };
        const handleAddClassConfirmed = async () => {
            try {
            
            const response = await axiosInstance.post("/class/addclass", {
                subject_id: AddClass.subject_id,
                day_of_week: AddClass.day_of_week,
                start_time: AddClass.start_time,
                end_time: AddClass.end_time,
                room_id: AddClass.room_id,
            });
        
            const responseData = response.data;

            if (response.status === 201) {
                setTimetableData([...timetableData, responseData.newClass]);
                handleCloseAddClassDialog();
                setAddClass({
                    subject_id: "",
                    day_of_week: "",
                    start_time: "",
                    end_time: "",
                    room_id: "",
                });
                toast.success("Class added successfully");
            } else {
                console.log("Error:", responseData.error);
                toast.error(responseData.message);
            }
            await fetchSubjectList();
        } catch (error) {
            console.error("Error creating class:", error);
            toast.error("Error data or room is not available for the new class");
        }
    };


    return (
        <>
        <HeadList>
        <TableContainer>
            <Sheet
            sx={{
                "--TableCell-height": "40px",
                "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                "--Table-firstColumnWidth": "80px",
                "--Table-lastColumnWidth": "144px",
                "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
                "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
                height: 370,
                overflow: "auto",
                backgroundColor: "nav.bg",
            }}
            >
            <Table
                className="table mb-0"
                borderAxis="bothBetween"
                stickyHeader
                hoverRow
                sx={{
                "--Table-headerUnderlineThickness": "1px",
                "--TableCell-paddingX": "10px",
                "--TableCell-paddingY": "7px",
                "& tr > *:first-of-type": {
                    position: "sticky",
                    zIndex: 1,
                    left: 0,
                    boxShadow: "1px 0 var(--TableCell-borderColor)",
                    // bgcolor: 'background.surface',
                },
                "& tr > *:last-child": {
                    position: "sticky",
                    right: 0,
                    bgcolor: "var(--TableCell-headBackground)",
                },
                }}
            >
                <Theader>
                <tr>
                    <th style={{ width: 30 }}>No</th>
                    <th style={{ width: 100 }}>Name</th>
                    <th style={{ width: 100 }}>Code</th>
                    <th style={{ width: 100 }}>User</th>
                    <th style={{ width: 40 }}>Select</th>
                    <th style={{ width: 230 }}>Action</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                    <Checkbox
                        key="selectAllCheckbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        color="primary"
                        disabled={false}
                        size="md"
                    />
                    </th>
                    <th></th>
                </tr>
                </Theader>
                <Tbody>
                {listItems.map((item, index) => (
                    <tr className="text-center" key={item.id || index}>
                    <th>{(page - 1) * rowsPerPage + index + 1}</th>
                    <th>{item.subject_name}</th>
                    <th>{item.subject_code}</th>
                    <th>{item.firstname}</th>
                    <th>
                        <Checkbox
                        checked={selectedItems.includes(item.subject_id)}
                        onChange={() => handleCheckboxChange(item.subject_id)}
                        color="primary"
                        disabled={false}
                        size="md"
                        />
                    </th>
                    <th>
                        <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        >
                        <Button
                            variant="solid"
                            color="warning"
                            className="edit"
                            onClick={() => handleEdit(item)}
                        >
                            Edit
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            endDecorator={<DeleteForever />}
                            onClick={() => handleDelete(item.subject_id)}
                            className="delete"
                        >
                            Delete
                        </Button>
                        <Button
                            color="primary"
                            variant="solid"
                            endDecorator={<AddIcon />}
                            onClick={() => handleAddclass(item.subject_id)}
                            className="create-class"
                        >
                            CreateClass
                        </Button>
                        </Box>
                    </th>
                    </tr>
                ))}
                </Tbody>
            </Table>
            <Modal open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <ModalDialog
                variant="outlined"
                role="alertdialog"
                color="danger"
                sx={{ borderWidth: "3px" }}
                >
                <DialogTitle color="danger" variant="plain" level="body-lg">
                    <WarningRoundedIcon />
                    Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {selectedItems.length > 1
                    ? "Are you sure you want to delete all selected subjects?"
                    : "Are you sure you want to delete the selected subject?"}
                </DialogContent>
                <DialogActions>
                    <Button
                    variant="solid"
                    color="neutral"
                    onClick={handleCloseDeleteDialog}
                    >
                    Cancel
                    </Button>
                    <Button
                    variant="solid"
                    color="danger"
                    onClick={handleDeleteConfirmed}
                    >
                    Confirm Delete
                    </Button>
                </DialogActions>
                </ModalDialog>
            </Modal>
            </Sheet>
            <div className="pagination-container">
            <CustomPagination
                count={100}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
        </TableContainer>
        <div className="card-footer">
            <div className="this-btn d-flex justify-center align-center gap-2">
            <Button
                sx={{
                width: "150px",
                padding: "15px !important",
                ":hover": {
                    boxShadow: "0 1px 20px 1px #A04C4C",
                    border: "1px solid #A04C4C",
                },
                }}
                id="delete"
                color="danger"
                variant="solid"
                className="text-red p-2"
                onClick={handleDeleteAll}
                disabled={selectedItems.length === 0}
            >
                Delete All
            </Button>
            <Button
                sx={{
                width: "150px",
                padding: "15px !important",
                ":hover": {
                    boxShadow: "0 1px 20px 1px #0D6EFD",
                    border: "1px solid #0D6EFD",
                },
                }}
                id="add"
                color="primary"
                variant="solid"
                className=" p-2"
                onClick={handleAdd}
            >
                Add
            </Button>
            </div>
        </div>
        <Modal open={editDialogOpen} onClose={handleCloseEditDialog}>
            <ModalDialog    
            size="lg"
            variant="outlined"
            layout="center"
            color="primary"
            sx={{ width: 450 }}
            >
            <DialogTitle>Edit Subject</DialogTitle>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                >
                <Stack spacing={3}>
                {editingSubject && (
                    <>
                    {/* <FormControl>
                        <FormLabel required>Id</FormLabel>
                        <Input
                        autoFocus
                        required
                        name="subject_id"
                        value={editingSubject.subject_id}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        />
                    </FormControl> */}
                    <FormControl>
                        <FormLabel required>Number</FormLabel>
                        <Input
                        autoFocus
                        required
                        name="subject_name"
                        value={editingSubject.subject_name}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        color="primary"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel required>Code</FormLabel>
                        <Input
                        required
                        name="subject_code"
                        value={editingSubject.subject_code}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        color="primary"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel required>User</FormLabel>
                        <Select
                        variant="solid"
                        color="primary"
                            required
                            name="user_id"
                            value={editingSubject.user_id}
                            onChange={(_, value) =>
                                setEditSubject({ ...editingSubject, user_id: value as string })
                            }
                            size="lg"
                        >
                            {userOptions.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.firstname}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    </>
                )}
                <DialogActions>
                    <Button type="cancel" onClick={handleCloseEditDialog}>
                    Cancel
                    </Button>
                    <Button type="submit" onClick={handleEditConfirmed}>
                    Confirm
                    </Button>
                </DialogActions>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        <Modal open={addDialogOpen} onClose={handleCloseAddDialog}>
            <ModalDialog
            size="lg"
            variant="outlined"
            layout="center"
            color="primary"
            sx={{ width: 450 }}
            >
            <DialogTitle>Add New Subject</DialogTitle>
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                }}
            >
                <Stack spacing={3}>
                <>
                    <FormControl>
                    <FormLabel required>Name</FormLabel>
                    <Input
                        autoFocus
                        required
                        name="subject_name"
                        value={AddSubject.subject_name}
                        onChange={handleInputChangeSubject}
                        fullWidth
                        size="lg"
                        color="primary"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel required>Code</FormLabel>
                    <Input
                        required
                        name="subject_code"
                        value={AddSubject.subject_code}
                        onChange={handleInputChangeSubject}
                        fullWidth
                        size="lg"
                        color="primary"
                    />
                    </FormControl>
                    <FormControl>
                        <FormLabel required>User ID</FormLabel>
                        <Select
                        variant="solid"
                        color="primary"
                            required
                            name="user_id"
                            value={AddSubject.user_id}
                            onChange={(_, value) =>
                                setAddSubject({ ...AddSubject, user_id: value as string })
                            }
                            size="lg"
                        >
                            {userOptions.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.firstname}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </>
                <DialogActions>
                    <Button type="cancel" onClick={handleCloseAddDialog}>
                    Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddConfirmed}>
                    Confirm
                    </Button>
                </DialogActions>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        <Modal open={addClassDialogOpen} onClose={handleCloseAddClassDialog}>
            <ModalDialog
            size="lg"
            variant="outlined"
            layout="center"
            color="primary"
            sx={{ width: 450 }}
            >
            <DialogTitle>Add New Subject</DialogTitle>
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                }}
            >
                <Stack spacing={3}>
                <>
                    <FormControl>
                        <FormLabel required>ชั้น</FormLabel>
                        <Select
                        variant="solid"
                        color="primary"
                            placeholder="เลือกชั้น"
                            onChange={(_, value) => setSelectedFloor(value as string | null)}
                        >
                            {availableFloorsApi.map((floor) => (
                            <Option key={floor} value={floor}>
                                {floor}
                            </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel required>Room</FormLabel>
                        <Select
                            variant="solid"
                            color="primary"
                            required
                            name="room_id"
                            value={AddClass.room_id}
                            onChange={(_, value) =>
                                setAddClass({ ...AddClass, room_id: value as string })
                            }
                            size="lg"
                        >
                            {roomnumber.map((user) => (
                                <Option key={user.room_id} value={user.room_id}>
                                    {user.room_number}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel required>Day</FormLabel>
                        <Select
                            variant="solid"
                            color="primary"
                            required
                            name="day_of_week"
                            value={AddClass.day_of_week}
                            onChange={(_, value) =>
                                setAddClass({ ...AddClass, day_of_week: value as string })
                            }
                            size="lg"
                        >
                            {daysOfWeek.map((day) => (
                                <Option key={day} value={day}>
                                    {day}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                    <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                        <DateTime sx={{width:"100%"}}>
                        <TimePicker
                            sx={{width:"100%"}}
                            className="TimePicker"
                            format="HH:00"
                            views={["hours"]}
                            value={selectedStartTime ? dayjs(AddClass.start_time) : null}
                            onChange={handleStartTimeChange}
                            shouldDisableTime={shouldDisableStartTime}
                        />
                        </DateTime>
                    </LocalizationProvider>
                        {/* <FormLabel required>Start Time</FormLabel>
                        <Input
                            required
                            name="start_time"
                            value={AddClass.start_time}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        /> */}
                    </FormControl>
                    <FormControl >
                    <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th" >
                        <DateTime sx={{width:"100%"}}>
                        <TimePicker
                            sx={{width:"100%"}}
                            className="TimePicker"
                            format="HH:00"
                            views={["hours"]}
                            value={selectedEndTime ? dayjs(AddClass.end_time) : null}
                            onChange={handleEndTimeChange}
                            shouldDisableTime={shouldDisableEndTime}
                        />
                        </DateTime>
                    </LocalizationProvider>
                        {/* <FormLabel required>End Time</FormLabel>
                        <Input
                            required
                            name="end_time"
                            value={AddClass.end_time}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        /> */}
                    </FormControl>
                    {/* <FormControl>
                        <FormLabel required>Subject ID</FormLabel>
                        <Input
                            required
                            name="subject_id"
                            value={AddClass.subject_id}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        />
                    </FormControl> */}
                </>
                <DialogActions>
                    <Button type="cancel" onClick={handleCloseAddClassDialog}>
                    Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddClassConfirmed}>
                    Confirm
                    </Button>
                </DialogActions>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </HeadList>
        </>
    );
    };

export default SubjectList;
// function formatTimeThai(time: string) {
//     const [hour, minute] = time.split(':').map(Number);
//     const formattedHour = String(hour).padStart(2, '0');
//     const formattedMinute = String(minute).padStart(2, '0');
//     return `${formattedHour}:${formattedMinute}`;
// }