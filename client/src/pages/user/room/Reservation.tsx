import React, {  useState } from 'react';
// import Floor6 from '../../../components/floor6/Floor6';
import {FormLabel, Grid, Sheet, Table,Button,Modal,ModalDialog,Stack,FormControl,Input,Typography } from '@mui/joy';

import "dayjs/locale/th";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import NewAdapter from './AdapterDay'
import { DateTime, OptionStyle, SelectStyle } from './ReservationStyled';
import RoomService, { SearchRoomParams } from '../../../auth/service/RoomService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  Tbody,
  Theader,
  HeadList,
  TableContainer,
} from "../../admin/student-list/StudentListStyled";
import { toast } from 'sonner'
import UserService, { Reservation } from '../../../auth/service/UserService';
import { useColorScheme } from "@mui/joy/styles";

type ApiResponse = {
  availableRooms: SearchRoomParams[];
  message?: string;
  // recommended_rooms: SearchRoomParams[];
};

const Room: React.FC = () => {
  // const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [reportDetail, setReportDetail] = useState<string>('');
  const [reservationReason, setReservationReason] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedStartTime, setSelectedStartTime] = useState<dayjs.Dayjs | null>(dayjs().startOf('day').hour(8));
  const [selectedEndTime, setSelectedEndTime] = useState<dayjs.Dayjs | null>(dayjs().startOf('day').hour(9));
  const [searchRoom, setSearchRoom] = useState<SearchRoomParams>({
    id:'',
    room_id:'',
    room_capacity: '',
    room_level: '',
    room_type: '',
    room_number: '',
    reservation_date: '',
    start_time: '',
    end_time: '',
  }); 
  const [reservationData, setReservationData] = useState<Reservation>({
    id:'',
    room_id:'',
    room_number: '',
    reservation_date: '',
    reservation_reason:'',
    start_time: '',
    end_time: '',
  }); 
  const [searchResults, setSearchResults] = useState<ApiResponse>({ availableRooms: []});
  const [searchResultsRecom, setSearchResultsRecom] = useState<{ recommended_rooms: SearchRoomParams[], message: string }>({ recommended_rooms: [], message: '' });
  const availableFloors = ['1', '2', '3','4','5','6','7','8','9'];
  const roomNumber = ['9901', '9902', '9903'];  
  const roomTypes = ['ห้องปฏิบัติการ', 'ห้องประชุม', 'ลานกิจกรรม'];
  const numberOfPeopleOptions = ['10', '20', '30', '40', '55'];


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchRoom((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputChangeReserve = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setReservationReason(value);
    setReservationData((prevData) => ({
      ...prevData,
      reservation_reason: value,
    }));
  };
  
  
  const handleSubmit = async () => {
    const startTime = selectedStartTime?.format("HH:00");
    const endTime = selectedEndTime?.format("HH:00");
  
    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(':')[0]);
      const endHour = parseInt(endTime.split(':')[0]);
  
      if (startHour < 8 || endHour > 18) {
        toast.error('Invalid time range. Please select a time between 08:00 and 18:00.');
        return;
      }
    }
  
    try {
      const response = await RoomService.searchRoom({
        room_capacity: searchRoom.room_capacity,
        room_level: searchRoom.room_level,
        room_type: searchRoom.room_type,
        room_number: searchRoom.room_number,
        reservation_date: selectedDate?.format("YYYY-MM-DD") || "",
        start_time: startTime || "",
        end_time: endTime || "",
      } as SearchRoomParams);
  
      setSearchResultsRecom({
        message: response.message || '',
        recommended_rooms: response.recommended_rooms || []
      });
  
      setSearchResults(prevState => ({
        ...prevState,
        availableRooms: response.availableRooms || [],
        message: response.message || ''
      }));
  
      if (response.availableRooms && response.availableRooms.length > 0) {
        toast.success('Available rooms found.');
      } else if (response.status === 500) {
        toast.error(response.message || 'Internal server error');
      }
  
      if (response.recommended_rooms && response.recommended_rooms.length > 0) {
        toast.info('Recommended rooms found.');
      } else if (!response.availableRooms || response.availableRooms.length === 0) {
        toast.error('No recommended rooms found.');
      }
  
    } catch (error) {
      toast.error('No rooms found');
    }
  };
  
  
  
  

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleConfirmClick = async () => {
      if (selectedRoomId !== null) {
        const reservationData = searchResults.availableRooms.find(room => room.room_id === selectedRoomId);
        if (reservationData) {
          const response = await UserService.reserveRoom({
              room_id: reservationData.room_id,
              reservation_date: selectedDate?.format("YYYY-MM-DD") || '',
              start_time: selectedStartTime?.format("HH:00") || '',
              end_time: selectedEndTime?.format("HH:00") || '',
              reservation_reason: reservationReason,
              room_number: reservationData.room_number
          } as Reservation);
          setModalOpen(false);
          toast.success(response.message || "Reservation confirmed successfully");
        }
      }
  };
  
  const handleReportClick = async () => {
      if (selectedRoomId !== null) {
        const response = await UserService.reportRoom({
          room_id: selectedRoomId,
          report_detail: reportDetail,
        });
        setModalOpen(false);
        toast.success(response.message || "Reported successfully");
      }
  };
  


  const handleDateChange = (
    value: dayjs.Dayjs | null,
  ) => {
    setSelectedDate(value);
  };
  const handleStartTimeChange = (
    value: dayjs.Dayjs | null,
  ) => {
    setSelectedStartTime(value);
  };
  
  const handleEndTimeChange = (
    value: dayjs.Dayjs | null,
  ) => {
    setSelectedEndTime(value);
  };
  const shouldDisableStartTime = (value: dayjs.Dayjs) => {
    const hour = value.hour();
    return hour < 8 || hour > 18;
  };
  const shouldDisableEndTime = (value: dayjs.Dayjs) => {
    const hour = value.hour();
    return hour < 9 || hour > 18;
  };

  const { mode } = useColorScheme();

  return (
    <div className="py-24 sm:py-32 md:py-40 relative"
    style={{
    width: "100%",
    height: "100vh",
    position: "relative",
    ...(mode === "dark"
        ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
        : { background: "#AA96DA" }),
    padding: 5,
    }}> 
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Grid
          container
          spacing={2}
          columns={{ xs: 12, sm: 6, md: 4, lg: 2 }}
          sx={{ alignItems: 'center', flexGrow: 1, padding: 8,marginTop:3}}
        >
          <Grid>
            <FormLabel>Select Date</FormLabel>
            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
              <DateTime>
                <DatePicker
                  className='datetime-picker'
                  format="DD MMMM YYYY"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </DateTime>
            </LocalizationProvider>
          </Grid>
          <Grid>
            <FormLabel>Select Start Time</FormLabel>
            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
              <DateTime>
                <TimePicker
                    className='TimePicker'
                    format='HH:00'
                    views={['hours']}
                    value={selectedStartTime}
                    onChange={handleStartTimeChange}
                    shouldDisableTime={shouldDisableStartTime}
                />
              </DateTime>
            </LocalizationProvider>
          </Grid>
          <Grid>
            <FormLabel>Select End Time</FormLabel>
            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
            <DateTime>
                <TimePicker
                    className='TimePicker'
                    format='HH:00'
                    views={['hours']}
                    value={selectedEndTime}
                    onChange={handleEndTimeChange}
                    shouldDisableTime={shouldDisableEndTime}
                />
              </DateTime>
            </LocalizationProvider>
          </Grid>
          <Grid>
            <FormLabel>ชั้น</FormLabel>
            <SelectStyle placeholder="เลือกชั้น" onChange={(_, value) => handleInputChange({ target: { name: 'room_level', value } } as React.ChangeEvent<HTMLInputElement>)}>
              {availableFloors.map(floor => (
                <OptionStyle key={floor} value={floor}>
                  {floor}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>ห้อง</FormLabel>
            <SelectStyle placeholder="เลือกห้อง" onChange={(_, value) => handleInputChange({ target: { name: 'room_number', value } } as React.ChangeEvent<HTMLInputElement>)}>
              {roomNumber.map(floor => (
                <OptionStyle key={floor} value={floor}>
                  {floor}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>ประเภทห้อง</FormLabel>
            <SelectStyle placeholder="เลือกประเภอห้อง" onChange={(_, value) => handleInputChange({ target: { name: 'room_type', value } } as React.ChangeEvent<HTMLInputElement>)}>
              {roomTypes.map(roomType => (
                <OptionStyle key={roomType} value={roomType}>
                  {roomType}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>จำนวนคน</FormLabel>
            <SelectStyle placeholder="เลือกจำนวนคน"onChange={(_, value) => handleInputChange({ target: { name: 'room_capacity', value } } as React.ChangeEvent<HTMLInputElement>)}>
              {numberOfPeopleOptions.map(numberOfPeople => (
                <OptionStyle key={numberOfPeople} value={numberOfPeople}>
                  {numberOfPeople}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
              <Button type="submit"  color="primary">
                Search Room
              </Button>
          </Grid>
        </Grid>
      </form>
        <HeadList>
            <TableContainer color="primary" >
                <Sheet
                    sx={{
                        "--TableCell-height": "40px",
                        "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                        "--Table-firstColumnWidth": "80px",
                        "--Table-lastColumnWidth": "144px",
                        "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
                        "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
                        height: 400,
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
                        variant="plain"
                        borderAxis={'xBetween' && 'yBetween'}
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
                  <th>No</th>
                  <th>ชั้น</th>
                  <th>ประเภทห้อง</th>
                  <th>ห้อง</th>
                  <th>จอง</th>
                  <th>รายงาน</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </Theader>
              <Tbody>
              {searchResults.availableRooms && searchResults.availableRooms.length > 0 ? (
                searchResults.availableRooms.map((item, index) => (
                <tr className="text-center" key={item.room_id || index}>
                  <th>{index + 1}</th>
                  <th>{item.room_level}</th>
                  <th>{item.room_type}</th>
                  <th>{item.room_number}</th>
                  <th>
                    <Button onClick={() => {
                      setModalOpen(true);
                      setSelectedRoomId(item.room_id);
                      setReservationData((prevData) => ({
                        ...prevData,
                        room_id: item.room_number,
                      }));
                    }}>
                      Confirm
                    </Button>
                  </th>
                  <th>
                    <Button 
                      color="warning"
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedRoomId(item.room_id);
                      }}>
                      Report
                    </Button>
                  </th>
                </tr>
              ))
            ) : (
                searchResultsRecom.recommended_rooms && searchResultsRecom.recommended_rooms.length > 0 ? (
                  <>
                    <tr>
                      <th colSpan={6} className="text-center">
                        <Typography
                          color="success"
                          variant="plain"
                          level="h3"
                        >
                          Recommended Rooms
                        </Typography>
                      </th>
                    </tr>
                    {searchResultsRecom.recommended_rooms.map((item, index) => (
                      <tr className="text-center" key={item.room_id || index}>
                        <th>{index + 1}</th>
                        <th>{item.room_level}</th>
                        <th>{item.room_type}</th>
                        <th>{item.room_number}</th>
                        <th>
                        <Button onClick={() => {
                        setModalOpen(true);
                        setSelectedRoomId(item.room_id);
                      }}>
                        Confirm
                      </Button>
                        </th>
                        <th>
                          <Button  
                          color="danger"
                          onClick={() => {
                            setModalOpen(true);
                            setSelectedRoomId(item.room_id);
                          }}>
                            Report
                          </Button>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : (
                  null
                )
              )}
              </Tbody>
            </Table>
            {isModalOpen && (
                <Modal open={isModalOpen} onClose={closeModal}>
                  <ModalDialog size="lg" layout="center" color="primary" sx={{ width: 450 }}>
                    <Stack spacing={3}>
                      <FormControl>
                        <FormLabel>Room</FormLabel>
                        <Input
                          required
                          name="room_id"
                          value={reservationData.room_id}
                          onChange={(e) => setReservationData((prevData) => ({
                            ...prevData,
                            room_id: e.target.value,
                          }))}
                          fullWidth
                          size="lg"
                          readOnly
                        />
                      </FormControl>
                      {reservationData.room_id ? (
                        <>
                          <FormControl>
                            <FormLabel>Select Date</FormLabel>
                            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                              <DateTime>
                                <DatePicker
                                  className='datetime-picker'
                                  format="DD MMMM YYYY"
                                  value={selectedDate}
                                  onChange={handleDateChange}
                                  readOnly
                                />
                              </DateTime>
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Start Time</FormLabel>
                            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                              <DateTime>
                                <TimePicker
                                    className='TimePicker'
                                    format='HH:00'
                                    views={['hours']}
                                    value={selectedStartTime}
                                    onChange={handleStartTimeChange}
                                    shouldDisableTime={shouldDisableStartTime}
                                    readOnly
                                />
                              </DateTime>
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl>
                            <FormLabel>End Time</FormLabel>
                            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                              <DateTime>
                                <TimePicker
                                    className='TimePicker'
                                    format='HH:00'
                                    views={['hours']}
                                    value={selectedEndTime}
                                    onChange={handleEndTimeChange}
                                    shouldDisableTime={shouldDisableEndTime}
                                    readOnly
                                />
                              </DateTime>
                            </LocalizationProvider>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Reservation reason</FormLabel>
                            <Input
                              required
                              name="reservation_reason"
                              value={reservationReason}
                              onChange={handleInputChangeReserve}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                          <div className='d-flex gap-3'>
                            <Button onClick={handleConfirmClick}>Confirm</Button>
                            <Button onClick={closeModal}>Cancel</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <FormControl>
                            <FormLabel>Report detail</FormLabel>
                            <Input
                              required
                              name="report_detail"
                              value={reportDetail}
                              onChange={(e) => setReportDetail(e.target.value)}
                              fullWidth
                              size="lg"
                            />
                          </FormControl>
                          <div className='d-flex gap-3'>
                            <Button onClick={handleReportClick}>Report</Button>
                            <Button onClick={closeModal}>Cancel</Button>
                          </div>
                        </>
                      )}
                    </Stack>
                  </ModalDialog>
                </Modal>
              )}
                </Sheet>
          {/* <div className="pagination-container">
            <CustomPagination
              count={100}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div> */}
        </TableContainer>
      </HeadList>
    </div>
  );
};

export default Room;
