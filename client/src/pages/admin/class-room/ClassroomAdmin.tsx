// ClassRoomAdmin.tsx
import useClassroomAdmin from './useClassroomAdmin';
import React from 'react';
import { DialogContent, DialogActions } from "@mui/material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteForever from '@mui/icons-material/DeleteForever';
import {
    Tbody,
    Theader,
    HeadList,
    TableContainer,
} from "../student-list/StudentListStyled";
import {
    Checkbox,
    Button,
    Sheet,
    Table,
    ModalDialog,
    Modal,
    Divider,
    // FormControl,
    // FormLabel,
    // Stack,
    // Input,
    Box,
    DialogTitle,
    Typography,
    Select,
    Option
  } from "@mui/joy";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import { styled } from '@mui/system'; 

const TimetableContainer = styled('div')`
  margin: 20px auto;
  text-align: center;
  width: 80%;
  border-radius: 10px;
  overflow: hidden;
  margin-top:5%;
  
`;

const TimetableHeader = styled(Typography)`
  font-size: 24px;
  margin-top:3%;

`;

const TimetableTable = styled('table')`
  border-collapse: collapse;
  width: 70%;
  margin: 30px auto;
`;

const TimetableTh = styled('th')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
`;

interface TimetableDaysColumnProps {
  day: string;
}
const TimetableDaysColumn = styled('td')<TimetableDaysColumnProps>`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: 100px;
  padding:10px;
  background-color: ${props => {
    switch (props.day) {
      case 'Monday':
        return '#FFFF99';
      case 'Tuesday':
        return '#FFC0CB ';
      case 'Wednesday':
        return '#99ff99';
      case 'Thursday':
        return '#ffcc99';
      case 'Friday':
        return '#87CEEB'; 
      case 'Saturday':
        return '#b06ae6 ';
      case 'Sunday':
        return '#ff6978';
      default:
        return '#f2f2f2'; 
    }
  }};
  @media (max-width: 600px) {
    width: 70px; // Adjust width for smaller screens
  }
`;

const TimetableTd = styled('td')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: auto;
  background-color: #fff;
  padding: 5px;
  margin: 2px;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const ScrollableTableContainer = styled('div')`
  overflow-x: auto;
`;

const TimetableTimeSlot = styled('th')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 12px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const ClassRoomAdmin: React.FC = () => {

    const{
        page,
        rowsPerPage,
        timetableData,
        teacherIds,
        selectedUserId,
        selectAll,
        // editClass,
        deleteDialogOpen,
        selectedItems,
        // editDialogOpen,
        handleUserIdChange,
        handleFetchClassSchedule,
        handleSelectAll,
        // handleCloseEditDialog,
        handleDeleteConfirmed,
        handleCheckboxChange,
        // handleEditConfirmed,
        handleDelete,
        handleDeleteAll,
        // handleEdit,
        handleCloseDeleteDialog,
        handleChangePage,
        handleChangeRowsPerPage,
        // handleInputEditChangeClass
    }=  useClassroomAdmin();
    
    const generateTimeSlots = () => {
    const startTime = '08:00:00';
    const endTime = '18:00:00';
    const timeSlots = [];

    let currentSlot = startTime;

    while (currentSlot < endTime) {
        timeSlots.push({ start: currentSlot, end: addHour(currentSlot) });
        currentSlot = addHour(currentSlot);
    }

    return timeSlots;
    };

    const generateHeaderTimeSlots = () => {
    const startTime = '08:00:00';
    const endTime = '18:00:00';
    const timeSlots = [];

    let currentSlot = startTime;

    while (currentSlot < endTime) {
        timeSlots.push({ start: currentSlot.slice(0, 5), end: addHour(currentSlot).slice(0, 5) });
        currentSlot = addHour(currentSlot);
    }

    return timeSlots;
    };
    const addHour = (time: string): string => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const newDate = new Date(0, 0, 0, hours, minutes, seconds + 60 * 60);
    return newDate.toTimeString().slice(0, 8);
    };
        const timeSlotsBody = generateTimeSlots();
        const headerTimeSlots = generateHeaderTimeSlots();
        const generateTimetableRows = () => {
            const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
            return (
                <>
                  {daysOfWeek.map((day) => (
                    <tr key={day}>
                      <TimetableDaysColumn day={day} key={day}><b>{day}</b></TimetableDaysColumn>
                      {timeSlotsBody.map((timeSlot) => (
                        <TimetableTd  colSpan={3} key={`${day}-${timeSlot.start}`}>
                          {timetableData.map((item) => (
                            item &&
                            item.day_of_week === day &&
                            item.start_time === timeSlot.start &&
                            item.end_time === timeSlot.end && (
                            <div key={item.id} style={{padding:'5px',margin:'2px',fontSize:'12px'}}>
                              <div><b className="text-danger" >{item.subject_name}</b></div>
                              <div><b className="text-danger" >{item.room_number}</b></div>
                            </div>
                            )
                          ))}
                        </TimetableTd>
                      ))}
                    </tr>
                  ))}
                </>
              );
        };
    return (
        <>
        <TimetableContainer>
        <TimetableHeader>{timetableData.length > 0 ? timetableData[0].fullname : 'Unknown'}</TimetableHeader>
        <div style={{width:"100%"}} className='d-flex justify-center align-items-center gap-4'>
        <Typography level="h4">Select User ID: </Typography>
        <Select value={selectedUserId} onChange={handleUserIdChange}
                    variant="solid"
                    color="primary">
            <Option value="" disabled>
                Select a teacher
            </Option>
            {teacherIds.map((item) => (
                <Option key={item?.id} value={item.id}>
                    {item.firstname}
                </Option>
            ))}
        </Select>
        <Button onClick={handleFetchClassSchedule}>Fetch Class Schedule</Button>
        </div>
        <ScrollableTableContainer>
          <TimetableTable>
            <thead>
              <tr>
                <TimetableTh><b>Day/Period</b></TimetableTh>
                {headerTimeSlots.map((timeSlot) => (
                  <TimetableTimeSlot  colSpan={3} key={timeSlot.start}><b>{`${timeSlot.start} - ${timeSlot.end}`}</b></TimetableTimeSlot>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTimetableRows()}
            </tbody>
          </TimetableTable>
        </ScrollableTableContainer>
        </TimetableContainer>


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
                        <th style={{ width: 100 }}>No</th>
                        <th style={{ width: 100 }}>Name</th>
                        <th style={{ width: 100 }}>Room</th>
                        <th style={{ width: 100 }}>Name Teacher</th>
                        <th style={{ width: 100 }}>Day</th>
                        <th style={{ width: 100 }}>Start Time</th>
                        <th style={{ width: 100 }}>End Time</th>
                        <th style={{ width: 100 }}>Select</th>
                        <th style={{ width: 100 }}>Action</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
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
                    {timetableData.map((item, index) => (
                        <tr className="text-center" key={item?.id || index}>
                        <th>{(page - 1) * rowsPerPage + index + 1}</th>
                        <th>{item.reservation_id}</th>
                        <th>{item.subject_name}</th>
                        <th>{item.room_number}</th>
                        <th>{item.fullname}</th>
                        <th>{item.day_of_week}</th>
                        <th>{item.start_time}</th>
                        <th>{item.end_time}</th>
                        <th>
                            <Checkbox
                            checked={selectedItems.includes(item.reservation_id)}
                            onChange={() => handleCheckboxChange(item.reservation_id)}
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
                            {/* <Button
                                variant="solid"
                                color="warning"
                                className="edit"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </Button> */}
                            <Button
                                color="danger"
                                variant="solid"
                                endDecorator={<DeleteForever />}
                                onClick={() => handleDelete(item.reservation_id)}
                                className="delete"
                            >
                                Delete
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
            </div>
        </div>
        {/* <Modal open={editDialogOpen} onClose={handleCloseEditDialog}>
            <ModalDialog    
            size="lg"
            variant="outlined"
            layout="center"
            color="primary"
            sx={{ width: 450 }}
            >
            <DialogTitle>Edit Class Schedule</DialogTitle>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                >
                <Stack spacing={3}>
                    <FormControl>
                    <FormLabel>Day of Week</FormLabel>
                    <Input
                        autoFocus
                        required
                        name="day_of_week"
                        value={editClass.day_of_week}
                        onChange={handleInputEditChangeClass}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <Input
                        required
                        name="start_time"
                        value={editClass.start_time}
                        onChange={handleInputEditChangeClass}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel>End Time</FormLabel>
                    <Input
                        required
                        name="end_time"
                        value={editClass.end_time}
                        onChange={handleInputEditChangeClass}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                    <FormControl>
                    <FormLabel>Subject</FormLabel>
                    <Input
                        required
                        name="subject_id"
                        value={editClass.subject_id}
                        onChange={handleInputEditChangeClass}
                        fullWidth
                        size="lg"
                    />
                    </FormControl>
                </Stack>
                <DialogActions>
                    <Button type="cancel" onClick={handleCloseEditDialog}>
                    Cancel
                    </Button>
                    <Button type="submit" onClick={handleEditConfirmed}>
                    Confirm
                    </Button>
                </DialogActions>
                </form>
            </ModalDialog>
            </Modal> */}
        </HeadList>
        </>
    );
  };

export default ClassRoomAdmin;
// function formatTimeThai(time: string) {
//     const [hour, minute] = time.split(':').map(Number);
//     const formattedHour = String(hour).padStart(2, '0');
//     const formattedMinute = String(minute).padStart(2, '0');
//     return `${formattedHour}:${formattedMinute}`;
// }