import React, { useEffect, useState} from "react";
import { DialogContent, DialogActions } from "@mui/material";

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
    useEffect(() => {
        fetchUserOptions();
        fetchRoomNumber();
    }, []);
    const fetchUserOptions = async () => {
        const response = await axiosInstance.get("/admin/user/getteacherid");
        setUserOptions(response.data);
    }

    const fetchRoomNumber = async () => {
        const response = await axiosInstance.get("/admin/room/getroomnumber");
        setRoomnumber(response.data);
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

            // ตรวจสอบ response และทำตามที่ต้องการ
            if (responseData.message === "Class added successfully") {
              // เพิ่มข้อมูลใหม่เข้าไปใน state timetableData
                setTimetableData([...timetableData, responseData.newClass]);
                console.log("Class added successfully");
            } else {
                console.log("Error:", responseData.error);
            }
            handleCloseAddClassDialog();
        
            // Reset the input values
            setAddClass({
                subject_id: "",
                day_of_week: "",
                start_time: "",
                end_time: "",
                room_id: "",
            });
            await fetchSubjectList();
            } catch (error) {
            console.error("Error creating class:", error);
            }
        };
    const handleInputChangeAddClass= (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddClass((prevUser) => ({
        ...prevUser,
        [name]: value,
        }));
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
                background: (
                theme
                ) => `linear-gradient(${theme.vars.palette.background.surface} ,
                                    0 100%`,
                backgroundSize:
                "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "local, local, scroll, scroll",
                backgroundPosition:
                "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
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
                    <FormControl>
                        <FormLabel>Id</FormLabel>
                        <Input
                        autoFocus
                        required
                        name="subject_id"
                        value={editingSubject.subject_id}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Number</FormLabel>
                        <Input
                        autoFocus
                        required
                        name="subject_name"
                        value={editingSubject.subject_name}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Input
                        required
                        name="subject_code"
                        value={editingSubject.subject_code}
                        onChange={handleInputEditChangeSubject}
                        fullWidth
                        size="lg"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User</FormLabel>
                        <Select
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
                    <FormLabel>Name</FormLabel>
                    <Input
                        autoFocus
                        required
                        name="subject_name"
                        value={AddSubject.subject_name}
                        onChange={handleInputChangeSubject}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Code</FormLabel>
                    <Input
                        required
                        name="subject_code"
                        value={AddSubject.subject_code}
                        onChange={handleInputChangeSubject}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User ID</FormLabel>
                        <Select
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
                    <FormLabel>Room Id</FormLabel>
                        <Select
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
                    <FormLabel>Day</FormLabel>
                    <Input
                        autoFocus
                        required
                        name="day_of_week"
                        value={AddClass.day_of_week}
                        onChange={handleInputChangeAddClass}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                            required
                            name="start_time"
                            value={AddClass.start_time}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input
                            required
                            name="end_time"
                            value={AddClass.end_time}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Subject ID</FormLabel>
                        <Input
                            required
                            name="subject_id"
                            value={AddClass.subject_id}
                            onChange={handleInputChangeAddClass}
                            fullWidth
                            size="lg"
                        />
                    </FormControl>
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
        {/* <TimetableContainer>
            <TimetableHeader>TIME TABLE</TimetableHeader>
            <TimetableTable>
                <thead>
                    <tr>
                    <TimetableTh><b>Day/Period</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Monday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Tuesday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Wednesday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Thursday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Friday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Saturday</b></TimetableTh>
                    <TimetableTh colSpan={3}><b>Sunday</b></TimetableTh>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>08:00 - 09:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "08:00:00" && classItem.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <TimetableTd rowSpan={3}><b>09:00 - 10:00</b></TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>

                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>   
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "09:00:00" && classItem.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>}
                        </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <TimetableTd rowSpan={3}><b>10:00 - 11:00</b></TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>

                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>   
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "10:00:00" && classItem.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>}
                        </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <TimetableTd rowSpan={3}><b>11:00 - 12:00</b></TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>

                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                        <TimetableTd colSpan={3}>   
                        {timetableData.map((classItem) => (
                            <p key={classItem?.subject_id}>
                            {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00" && (
                                <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                            )}
                            </p>
                        ))}
                        {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "11:00:00" && classItem.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>}
                        </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>12:00 - 13:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "12:00:00" && classItem.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>13:00 - 14:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "13:00:00" && classItem.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                <tr>
                    <TimetableTd rowSpan={3}><b>14:00 - 15:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "14:00:00" && classItem.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>}
                    </TimetableTd>
                </tr>
                </tbody>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>15:00 - 16:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "15:00:00" && classItem.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>16:00 - 17:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "16:00:00" && classItem.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <TimetableTd rowSpan={3}><b>17:00 - 18:00</b></TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Monday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Monday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>

                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Tuesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Tuesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Wednesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Wednesday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Thursday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Thursday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Friday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Friday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Saturday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Saturday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    <TimetableTd colSpan={3}>   
                    {timetableData.map((classItem) => (
                        <p key={classItem?.subject_id}>
                        {classItem && classItem.day_of_week === "Sunday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00" && (
                            <b className="text-danger">{`${formatTimeThai(classItem.start_time)} - ${formatTimeThai(classItem.end_time)}`}</b>
                        )}
                        </p>
                    ))}
                    {timetableData.some(classItem => classItem.day_of_week === "Sunday" && classItem.start_time === "17:00:00" && classItem.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>}
                    </TimetableTd>
                    </tr>
                </tbody>
            </TimetableTable>
        </TimetableContainer> */}
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