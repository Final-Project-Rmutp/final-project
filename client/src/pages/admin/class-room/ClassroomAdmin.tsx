// ClassRoomAdmin.tsx
import useClassroomAdmin from './useClassroomAdmin';
import React, { useEffect, useState } from 'react';
import { DialogContent, DialogActions } from "@mui/material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DeleteForever from '@mui/icons-material/DeleteForever';
import {
    Tbody,
    Theader,
    HeadList,
    TableContainer,
    OptionStyle
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
    Tooltip
  } from "@mui/joy";
import CustomPagination from "../../../shared/components/pagination/Pagination";
import { styled } from '@mui/system'; 
const TimetableContainer = styled("div")`
  margin: 20px auto;
  text-align: center;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2px);
  -webkit-backdrop-filter: blur(1.2px);
  border: 1px solid ${({ theme }) => theme.palette.neutral.softActiveColor};

`;
const TimetableContainerIn = styled("div")`
  margin:10px;
  margin-top:0px;
  text-align: center;
  width: 98%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2px);
  -webkit-backdrop-filter: blur(1.2px);
  border: 1px solid rgba(255, 255, 255, 0.01);
`;

const TimetableHeader = styled(Typography)`
  margin-top:10px;
  font-size: 20px;
  color: ${({ theme }) => theme.palette.pf.color};
`;

const TimetableTable = styled("table")`
  border-collapse: collapse;
  width: 100%;
  border-radius: 16px;
`;

const TimetableTh = styled("th")`
  color: black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  border-top-left-radius: 16px;
  
`;

interface TimetableDaysColumnProps {
  day: string;
}
const TimetableDaysColumn = styled("td")<TimetableDaysColumnProps>`
  color: black;
  border: 1px solid black;
  border-left: none;
  border-bottom: none;
  ${(props) => props.day === "Sunday" && `
  &:first-child {
    border-bottom-left-radius: 16px;
  }
`}

  text-align: center;
  width: 100px;
  background: ${({ day }) => {
    switch (day) {
      case "Monday":
        return "linear-gradient(to right, #DCFFB7, #FFEAA7)"; // Yellow gradient
      case "Tuesday":
        return "linear-gradient(to right, #FF90BC, #FFC0D9)"; // Pink gradient
      case "Wednesday":
        return "linear-gradient(to right, #BFEA7C, #9BCF53)"; // Green gradient
      case "Thursday":
        return "linear-gradient(to right, #ffcc99, #FFA07A)"; // Light Coral gradient
      case "Friday":
        return "linear-gradient(to right, #87CEEB, #40A2D8)"; // Sky Blue gradient
      case "Saturday":
        return "linear-gradient(to right, #b06ae6, #C499F3)"; // Purple gradient
      case "Sunday":
        return "linear-gradient(to right, #EF6262, #FF8989)"; // Crimson gradient
      default:
        return "linear-gradient(to right, #f2f2f2, #d9d9d9)"; // Default gradient
    }
  }};
  @media (max-width: 600px) {
    width: 70px; // Adjust width for smaller screens
  }
`;


const TimetableTd = styled("td")`
  color: black;
  border: 1px solid black;
  border-bottom: none;
  border-left: none;
  &:last-child {
    border-right: none;
  }
  text-align: center;
  width: 120px;
  background-color: #fff;

  @media (max-width: 600px) {
    width: 120px;
  }

  &:hover {
    transform: scale(1.3);
    border-radius:10px;
    z-index:2;
  }
`;

const ScrollableTableContainer = styled("div")`
  overflow-x: auto;
  
`;

const TimetableTimeSlot = styled("th")`
  color: black;
  border-left: 1px solid black;
  border-bottom: none;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 12px;
  &:last-child {
    border-top-right-radius: 16px;
  }
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
    const [dayColors, setDayColors] = useState<{ [key: string]: string }>({
      Monday: "#FFFF99",
      Tuesday: "#FFC0CB",
      Wednesday: "#99ff99",
      Thursday: "#ffcc99",
      Friday: "#87CEEB",
      Saturday: "#b06ae6",
      Sunday: "#ff6978",
    });
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
          const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];
        
          return (
            <>
              {daysOfWeek.map((day) => (
                <tr key={day} >
                  <TimetableDaysColumn day={day} key={day} style={{height:'50px',padding:'10px'}}>
                    <b >{day}</b>
                  </TimetableDaysColumn>
                  {timeSlotsBody.map((timeSlot) => {
                    const itemsInTimeSlot = timetableData.filter((item) => item.day_of_week === day && item.start_time === timeSlot.start);
                    const colspan = itemsInTimeSlot.length;
      
                    return (
                      <TimetableTd colSpan={colspan > 0 ? colspan : 1} key={`${day}-${timeSlot.start}`}>
                        {itemsInTimeSlot.map((item) => (
                          <div
                          className="d-flex justify-content-center align-items-center flex-column"
                            key={item.reservation_id}
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: dayColors[item.day_of_week],
                              textAlign:'center',
                              padding:5
                            }}
                          >
                            <div style={{ width: "120px"}}>
                              <span className="text-dark fw-bold" style={{ fontSize: "12px"}}>วิชา : {item.subject_name}</span>
                            </div>
                            <div style={{ width: "120px" }}>
                              <span className="text-dark fw-bold" style={{ fontSize: "12px"}}>ห้อง : {item.room_number}</span>
                            </div>
                          </div>
                        ))}
                      </TimetableTd>
                    );
                  })}
                </tr>
              ))}
      
            </>
          );
        };
        useEffect(() => {
          const newDayColors = { ...dayColors };
          timetableData.forEach((item) => {
            newDayColors[item.day_of_week] = getDayColor(item.day_of_week);
          });
          setDayColors(newDayColors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [timetableData]);

        const getDayColor = (day: string): string => {
          switch (day) {
            case "Monday":
              return "#FFFF99";
            case "Tuesday":
              return "#FFC0CB";
            case "Wednesday":
              return "#99ff99";
            case "Thursday":
              return "#ffcc99";
            case "Friday":
              return "#87CEEB";
            case "Saturday":
              return "#b06ae6";
            case "Sunday":
              return "#ff6978";
            default:
              return "#f2f2f2";
          }
        };
    return (
        <>
        <TimetableContainer>
          <div style={{width:'100%',display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column', gap:10}}>
            <TimetableHeader>{timetableData.length > 0 ? timetableData[0].fullname : '-'}</TimetableHeader>
            <div style={{width:"100%",marginBottom:10}} className='d-flex justify-center align-items-center gap-4'>
            <Typography level="title-md">Select User: </Typography>
            <Select value={selectedUserId} onChange={handleUserIdChange}
                        variant="outlined"
                        color="primary">
                <OptionStyle value="" disabled>
                    Select a teacher
                </OptionStyle>
                {teacherIds.map((item) => (
                    <OptionStyle key={item?.id} value={item.id}>
                        {item.firstname}
                    </OptionStyle>
                ))}
            </Select>
            <Button onClick={handleFetchClassSchedule}>Fetch Class Schedule</Button>
            </div>
          </div>
          <ScrollableTableContainer>
            <TimetableContainerIn>
              <ScrollableTableContainer>
                <TimetableTable>
                  <thead>
                    <tr>
                      <TimetableTh>
                        <b>Day/Period</b>
                      </TimetableTh>
                      {headerTimeSlots.map((timeSlot) => (
                        <TimetableTimeSlot key={timeSlot.start}>
                          <b>{`${timeSlot.start} - ${timeSlot.end}`}</b>
                        </TimetableTimeSlot>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{generateTimetableRows()}</tbody>
                </TimetableTable>
              </ScrollableTableContainer>
            </TimetableContainerIn>
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
                        <th style={{ width: 100 }}>No</th>
                        <th style={{ width: 100 }}>Class Id</th>
                        <th style={{ width: 100 }}>Name</th>
                        <th style={{ width: 100 }}>Room</th>
                        <th style={{ width: 150 }}>Teacher</th>
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
                        <th>
                          <Tooltip  title={item.reservation_id} arrow>
                            <span>{item.reservation_id}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.subject_name} arrow>
                            <span>{item.subject_name}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.room_number} arrow>
                            <span>{item.room_number}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.fullname} arrow>
                            <span>{item.fullname}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.day_of_week} arrow>
                            <span>{item.day_of_week}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.start_time} arrow>
                            <span>{item.start_time}</span>
                          </Tooltip> 
                        </th>
                        <th>
                          <Tooltip  title={item.end_time} arrow>
                            <span>{item.end_time}</span>
                          </Tooltip> 
                        </th>
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