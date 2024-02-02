// ClassRoomAdmin.tsx
import useClassroomAdmin from './useClassroomAdmin';
import React from 'react';
import styled from 'styled-components';
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
    // Select,
    // Option
  } from "@mui/joy";
import CustomPagination from "../../../shared/components/pagination/Pagination";

const TimetableContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const TimetableHeader = styled.h1`
  font-size: 24px;
`;

const TimetableTable = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 30px auto;
`;

const TimetableTh = styled.th`
    color:black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
`;

const TimetableTd = styled.td`
    color:black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
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
    
    return (
        <>
        <TimetableContainer>
        <TimetableHeader>TIME TABLE</TimetableHeader>
        <label>Select User ID: </label>
        <select value={selectedUserId} onChange={handleUserIdChange}>
        <option value="">Select a teacher</option>
        {teacherIds.map((item) => (
          <option key={item?.id} value={item.id}>{item.firstname}</option>
        ))}
      </select>
      <Button onClick={handleFetchClassSchedule}>Fetch Class Schedule</Button>
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
            <TimetableTd rowSpan={3}><b>08:00 - 09:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger d-flex justify-center align-items-center mt-1">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "08:00:00" && item.end_time === "09:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "08:00:00" && item.end_time === "09:00:00") ? null : <b>08:00 - 09:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>09:00 - 10:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Monday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Tuesday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Wednesday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Thursday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Friday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Saturday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Sunday" && item.start_time === "09:00:00" && item.end_time === "10:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "09:00:00" && item.end_time === "10:00:00") ? null : <b>09:00 - 10:00</b>} */}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>10:00 - 11:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Monday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Tuesday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Wednesday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Thursday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Friday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Saturday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Sunday" && item.start_time === "10:00:00" && item.end_time === "11:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "10:00:00" && item.end_time === "11:00:00") ? null : <b>10:00 - 11:00</b>} */}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <TimetableTd rowSpan={3}><b>11:00 - 12:00</b></TimetableTd>{/* head */}
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Monday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>

                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Tuesday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Wednesday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Thursday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Friday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Saturday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
                <TimetableTd colSpan={3}>   
                {timetableData.map((item) => (
                    <p key={item?.id}>
                    {item && item.day_of_week === "Sunday" && item.start_time === "11:00:00" && item.end_time === "12:00:00" && (
                        <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                    )}
                    </p>
                ))}
                {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "11:00:00" && item.end_time === "12:00:00") ? null : <b>11:00 - 12:00</b>} */}
                </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>12:00 - 13:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "12:00:00" && item.end_time === "13:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "12:00:00" && item.end_time === "13:00:00") ? null : <b>12:00 - 13:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>13:00 - 14:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "13:00:00" && item.end_time === "14:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "13:00:00" && item.end_time === "14:00:00") ? null : <b>13:00 - 14:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
        <tr>
            <TimetableTd rowSpan={3}><b>14:00 - 15:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "14:00:00" && item.end_time === "15:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "14:00:00" && item.end_time === "15:00:00") ? null : <b>14:00 - 15:00</b>} */}
            </TimetableTd>
        </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>15:00 - 16:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "15:00:00" && item.end_time === "16:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "15:00:00" && item.end_time === "16:00:00") ? null : <b>15:00 - 16:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>16:00 - 17:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "16:00:00" && item.end_time === "17:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "16:00:00" && item.end_time === "17:00:00") ? null : <b>16:00 - 17:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        <tbody>
            <tr>
            <TimetableTd rowSpan={3}><b>17:00 - 18:00</b></TimetableTd>{/* head */}
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Monday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Monday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>

            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Tuesday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Tuesday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Wednesday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Wednesday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Thursday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Thursday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Friday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Friday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Saturday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Saturday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            <TimetableTd colSpan={3}>   
            {timetableData.map((item) => (
                <p key={item?.id}>
                {item && item.day_of_week === "Sunday" && item.start_time === "17:00:00" && item.end_time === "18:00:00" && (
                    <b className="text-danger">{`${item.fullname} - ${item.subject_name} - ${item.room_number}`}</b>
                )}
                </p>
            ))}
            {/* {timetableData.some(item => item.day_of_week === "Sunday" && item.start_time === "17:00:00" && item.end_time === "18:00:00") ? null : <b>17:00 - 18:00</b>} */}
            </TimetableTd>
            </tr>
        </tbody>
        </TimetableTable>
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
                        <th style={{ width: 100 }}>Weeked</th>
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