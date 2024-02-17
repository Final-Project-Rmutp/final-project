import React, { useEffect, useState } from "react";
// import Floor6 from '../../../components/floor6/Floor6';
import {
  FormLabel,
  Grid,
  Button,
  Modal,
  ModalDialog,
  FormControl,
  Input,
  Container,
  Box,
  Typography
} from "@mui/joy";

import "dayjs/locale/th";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import NewAdapter from "./AdapterDay";
import { DateTime, OptionStyle, SelectStyle ,TimeSelect} from "./ReservationStyled";
import RoomService, {
  SearchRoomParams,
} from "../../../auth/service/RoomService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { toast } from "sonner";
import UserService, { Reservation } from "../../../auth/service/UserService";
import { useColorScheme } from "@mui/joy/styles";
import CardList from "./CardList";
import axiosInstance from "../../../environments/axiosInstance";

type ApiResponse = {
  availableRooms: SearchRoomParams[];
  message?: string;
  // recommended_rooms: SearchRoomParams[];
};

const Room: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [reportDetail, setReportDetail] = useState<string>("");
  const [reservationReason, setReservationReason] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedStartTime, setSelectedStartTime] =
    useState<dayjs.Dayjs | null>(dayjs().startOf("day").hour(8));
  const [selectedEndTime, setSelectedEndTime] = useState<dayjs.Dayjs | null>(
    dayjs().startOf("day").hour(9)
  );
  const [searchRoom, setSearchRoom] = useState<SearchRoomParams>({
    id: "",
    room_id: "",
    room_capacity: "",
    room_level: "",
    room_type: "",
    room_number: "",
    reservation_date: "",
    start_time: "",
    end_time: "",
  });
  const [searchResults, setSearchResults] = useState<ApiResponse>({
    availableRooms: [],
  });
  const [searchResultsRecom, setSearchResultsRecom] = useState<{
    recommended_rooms: SearchRoomParams[];
    message: string;
  }>({ recommended_rooms: [], message: "" });
  // const availableFloors = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  // const roomNumber = ["9901", "9902", "9903"];
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [availableFloorsApi, setRoomFloorsApi] = useState<string[]>([]);
  const numberOfPeopleOptions = ["10", "20", "30", "40", "55"];
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState<Reservation>({
    id: "",
    room_id: "",
    room_number: "",
    reservation_date: "",
    reservation_reason: "",
    start_time: "",
    end_time: "",
  });
  const [roomnumber, setRoomnumber] = useState<{ room_id: string; room_number: string }[]>([]);
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
    const fetchRoomTypes = async () => {
      try {
        const response = await axiosInstance.get(`/admin/room/getroomtype/{roomtype_id}`);
        setRoomTypes(response.data.room_types);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };
    
    fetchRoomTypes();
    
  }, []); 
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
  
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchRoom((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const startTime = selectedStartTime?.format("HH:00");
    const endTime = selectedEndTime?.format("HH:00");

    if (startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = parseInt(endTime.split(":")[0]);

      if (startHour < 8 || endHour > 18) {
        toast.error(
          "Invalid time range. Please select a time between 08:00 and 18:00."
        );
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
        message: response.message || "",
        recommended_rooms: response.recommended_rooms || [],
      });

      setSearchResults((prevState) => ({
        ...prevState,
        availableRooms: response.availableRooms || [],
        message: response.message || "",
      }));

      if (response.availableRooms && response.availableRooms.length > 0) {
        toast.success("Available rooms found.");
      } else if (response.status === 500) {
        toast.error(response.message || "Internal server error");
      }

      if (response.recommended_rooms && response.recommended_rooms.length > 0) {
        toast.info("Recommended rooms found.");
      } else if (
        !response.availableRooms ||
        response.availableRooms.length === 0
      ) {
        toast.error("No recommended rooms found.");
      }
    } catch (error) {
      toast.error("No rooms found");
    }
  };

  const closeModal = () => {
    setConfirmModalOpen(false);
    setReportModalOpen(false);
    setReservationReason("");
    setReportDetail("");
  };
  const handleConfirmClick = async () => {
    if (selectedRoomId !== null) {
      const reservationData = searchResults.availableRooms.find(
        (room) => room.room_id === selectedRoomId
      );
      if (reservationData) {
        try {
          const response = await UserService.reserveRoom({
            room_id: reservationData.room_id,
            reservation_date: selectedDate?.format("YYYY-MM-DD") || "",
            start_time: selectedStartTime?.format("HH:00") || "",
            end_time: selectedEndTime?.format("HH:00") || "",
            reservation_reason: reservationReason,
            room_number: reservationData.room_number,
          } as Reservation);
          setConfirmModalOpen(false);
          toast.success(response.message || "Reservation confirmed successfully");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // Handle API error response here
          toast.error(error.response?.data?.message || "Reservation failed");
        }
      } else {
        toast.error("Please select a room before confirming reservation");
      }
    }
  };
  
  

  const handleReportClick = async () => {
    if (selectedRoomId !== null) {
      try {
        const response = await UserService.reportRoom({
          room_id: selectedRoomId,
          report_detail: reportDetail,
        });
        setReportModalOpen(false);
        toast.success(response.message || "Reported successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error("All fields are required");
      }
    } else {
      toast.error("Please select a room before reporting");
    }
  };
  
  
  

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    setSelectedDate(value);
  };
  const handleStartTimeChange = (value: dayjs.Dayjs | null) => {
    setSelectedStartTime(value);
  };

  const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
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
    <div
      className="py-24 sm:py-32 md:py-40 relative"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        maxHeight: "calc(100vh - 0px)",
        overflowY: "auto" || "hidden",
        ...(mode === "dark"
          ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
          : { background: "linear-gradient(to bottom, #AA96DA, #6962AD)" }),
        padding: 5,
      }}
    >
      <Container maxWidth="xl" sx={{
        position:'sticky',
        top:'3.25rem',
        left:0,
        width:'100%',
        zIndex:2,
        flexGrow: 1, 
        marginTop: 10,
        padding:3,
        overflowX:'auto',
        overflowY:'hidden',
        }}>
          <Container>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Grid
              container
              spacing={2}
              direction="row"
              sx={{ 
                display:'flex',
                justifyContent:'center',
              alignItems: "center", 
              ...(mode === "dark"
              ? { background: "linear-gradient(to bottom, #040822, #040822)" }
              : { background: "linear-gradient(to bottom, #fff, #fff)" }),
              borderRadius:'50px',
              width:'78rem',
            }}
            >
              <Grid>
                <FormLabel>Select Date</FormLabel>
                <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                  <DateTime style={{position:'relative'}}
                  >
                    <DatePicker
                      className="datetime-picker"
                      format="DD MMMM YYYY"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                    <img className="position-absolute top-0 right-0"
                    style={{pointerEvents:'none', transform:'translate(-50%,20%)',}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Tear-Off%20Calendar.png" alt="Stopwatch" width="25" height="25" />
                  </DateTime>
                </LocalizationProvider>
              </Grid>
              <Grid>
                <FormLabel>Select Start Time</FormLabel>
                <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                  <TimeSelect style={{width:"120px",position:'relative'}}>
                    <TimePicker
                      className="TimePicker"
                      format="HH:00"
                      views={["hours"]}
                      value={selectedStartTime}
                      onChange={handleStartTimeChange}
                      shouldDisableTime={shouldDisableStartTime}
                    />
                    <img className="position-absolute top-0 right-0"
                    style={{pointerEvents:'none', transform:'translate(-50%,20%)',}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Stopwatch.png" alt="Stopwatch" width="25" height="25" />
                  </TimeSelect>
                </LocalizationProvider>
              </Grid>
              <Grid>
                <FormLabel>Select End Time</FormLabel>
                <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
                  <TimeSelect style={{width:"120px",position:'relative'}}>
                    <TimePicker
                      className="TimePicker"
                      format="HH:00"
                      views={["hours"]}
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
                      shouldDisableTime={shouldDisableEndTime}
                    />
                    <img className="position-absolute top-0 right-0"
                    style={{pointerEvents:'none', transform:'translate(-50%,20%)',}}
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Stopwatch.png" alt="Stopwatch" width="25" height="25" />
                  </TimeSelect>
                </LocalizationProvider>
              </Grid>
              <Grid>
                <FormLabel>ชั้น</FormLabel>
                <SelectStyle
                  style={{width:"100%"}}
                  placeholder="ชั้น"
                  onChange={(_, value) => {
                    handleInputChange({
                      target: { name: "room_level", value },
                    } as React.ChangeEvent<HTMLInputElement>);
                    setSelectedFloor(value as string | null);
                  }}
                >
                  {availableFloorsApi.map((floor) => (
                    <OptionStyle key={floor} value={floor}>
                      {floor}
                    </OptionStyle>
                  ))}
                </SelectStyle>
              </Grid>
              <Grid>
                <FormLabel>ห้อง</FormLabel>
                <SelectStyle
                  style={{width:"100%"}}
                  placeholder="ห้อง"
                  onChange={(_, value) =>
                    handleInputChange({
                      target: { name: "room_number", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {roomnumber.map((room) => (
                    <OptionStyle key={room.room_id} value={room.room_number}>
                      {room.room_number}
                    </OptionStyle>
                  ))}
                </SelectStyle>
              </Grid>
              <Grid>
                <FormLabel>ประเภทห้อง</FormLabel>
                <SelectStyle
                  style={{width:"100%"}}
                  placeholder="เลือกประเภทห้อง"
                  onChange={(_, value) =>
                    handleInputChange({
                      target: { name: "room_type", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {roomTypes.map((roomTypes) => (
                    <OptionStyle key={roomTypes} value={roomTypes}>
                      {roomTypes}
                    </OptionStyle>
                  ))}
                </SelectStyle>
              </Grid>
              <Grid>
                <FormLabel>จำนวนคน</FormLabel>
                <SelectStyle
                  style={{width:"100%"}}
                  placeholder="เลือกจำนวนคน"
                  onChange={(_, value) =>
                    handleInputChange({
                      target: { name: "room_capacity", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {numberOfPeopleOptions.map((numberOfPeople) => (
                    <OptionStyle key={numberOfPeople} value={numberOfPeople}>
                      {numberOfPeople}
                    </OptionStyle>
                  ))}
                </SelectStyle>
              </Grid>
              <Grid>
                <Button sx={{marginTop:2}} type="submit" color="primary" variant="solid">
                <img style={{marginRight:'10px'}} src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Magnifying%20Glass%20Tilted%20Left.webp" alt="Magnifying Glass Tilted Left" width="25" height="25" />
                  Search Room
                </Button>
              </Grid>
            </Grid>
          </form>
          </Container>
      </Container>
      <Container>
        <Box
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: 10,
            padding: 6,
            width: "100%",
            margin:0
          }}
        >   
            {searchResultsRecom.recommended_rooms && searchResultsRecom.recommended_rooms.length > 0 ? (
  <Container>
    <CardList
      data={searchResultsRecom.recommended_rooms}
      isRecommended={true}
      onConfirmClick={(roomId, roomNumber) => {
        setConfirmModalOpen(true);
        setSelectedRoomId(roomId);
        setReservationData((prevData) => ({
          ...prevData,
          room_id: roomNumber,
        }));
      }}
      onReportClick={(roomId, roomNumber) => {
        setReportModalOpen(true);
        setSelectedRoomId(roomId);
        setReservationData((prevData) => ({
          ...prevData,
          room_id: roomNumber,
        }));
      }}
    />
  </Container>
) : searchResults.availableRooms && searchResults.availableRooms.length > 0 ? (
  <Container>
    <CardList
      data={searchResults.availableRooms}
      isRecommended={false}
      onConfirmClick={(roomId, roomNumber) => {
        setConfirmModalOpen(true);
        setSelectedRoomId(roomId);
        setReservationData((prevData) => ({
          ...prevData,
          room_id: roomNumber,
        }));
      }}
      onReportClick={(roomId, roomNumber) => {
        setReportModalOpen(true);
        setSelectedRoomId(roomId);
        setReservationData((prevData) => ({
          ...prevData,
          room_id: roomNumber,
        }));
      }}
    />
  </Container>
) : (
  <Container
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      flexDirection: "column",
      background: "white",
      borderRadius: "20px",
      padding: 5,
    }}
  >
    <Typography level="h1" color="primary">
      No Data
    </Typography>
    <img
      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Detective%20Light%20Skin%20Tone.png"
      alt="Detective Light Skin Tone"
      width="200"
      height="200"
    />
  </Container>
)}


          {confirmModalOpen && (
            <Modal open={confirmModalOpen} onClose={closeModal}>
              <ModalDialog
                size="lg"
                layout="center"
                color="primary"
                sx={{ width: 450 }}
              >
                <FormControl>
                <FormLabel>Room</FormLabel>
                    <Input
                      required
                      name="room_id"
                      value={reservationData.room_id}
                      onChange={(e) =>
                        setReservationData((prevData) => ({
                          ...prevData,
                          room_id: e.target.value,
                        }))
                      }
                      fullWidth
                      size="lg"
                      readOnly
                      color="primary"
                    />
                </FormControl>

                <FormControl>
                  <FormLabel>Select Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={NewAdapter}
                    adapterLocale="th"
                  >
                    <DateTime sx={{ width: "50%" }}>
                      <DatePicker
                        className="datetime-picker"
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
                  <LocalizationProvider
                    dateAdapter={NewAdapter}
                    adapterLocale="th"
                  >
                    <TimeSelect sx={{ width: "50%" }}>
                      <TimePicker
                        className="TimePicker"
                        format="HH:00"
                        views={["hours"]}
                        value={selectedStartTime}
                        onChange={handleStartTimeChange}
                        shouldDisableTime={shouldDisableStartTime}
                        readOnly
                      />
                    </TimeSelect>
                  </LocalizationProvider>
                </FormControl>
                <FormControl>
                  <FormLabel>End Time</FormLabel>
                  <LocalizationProvider
                    dateAdapter={NewAdapter}
                    adapterLocale="th"
                  >
                    <TimeSelect sx={{ width: "50%" }}>
                      <TimePicker
                        className="TimePicker"
                        format="HH:00"
                        views={["hours"]}
                        value={selectedEndTime}
                        onChange={handleEndTimeChange}
                        shouldDisableTime={shouldDisableEndTime}
                        readOnly
                      />
                    </TimeSelect>
                  </LocalizationProvider>
                </FormControl>
                <FormControl>
                  <FormLabel >Reservation reason</FormLabel>
                  <Input
                    color="primary"
                    required
                    name="reservation_reason"
                    value={reservationReason}
                    onChange={(e) => setReservationReason(e.target.value)}
                    fullWidth
                    size="lg"
                  />
                </FormControl>
                <div className="d-flex gap-3 w-100 w-auto">
                  <Button onClick={handleConfirmClick}>Confirm</Button>
                  <Button color="neutral" onClick={closeModal}>Cancel</Button>
                </div>
              </ModalDialog>
            </Modal>
          )}
          {reportModalOpen && (
            <Modal open={reportModalOpen} onClose={closeModal}>
              <ModalDialog
                size="lg"
                layout="center"
                color="primary"
                sx={{ width: 450 }}
              >
                {/* ... (existing report modal content) */}
                <FormControl>
                  <FormControl>
                    <FormLabel>Room</FormLabel>
                    <Input
                      required
                      name="room_id"
                      value={reservationData.room_id}
                      onChange={(e) =>
                        setReservationData((prevData) => ({
                          ...prevData,
                          room_id: e.target.value,
                        }))
                      }
                      fullWidth
                      size="lg"
                      readOnly
                      color="primary"
                    />
                  </FormControl>
                  <FormLabel required>Report detail</FormLabel>
                  <Input
                    required
                    name="report_detail"
                    value={reportDetail}
                    onChange={(e) => setReportDetail(e.target.value)}
                    fullWidth
                    size="lg"
                    color="primary"
                  />
                </FormControl>
                <div className="d-flex gap-3">
                  <Button color="danger" onClick={handleReportClick}>Report</Button>
                  <Button color="neutral" onClick={closeModal}>Cancel</Button>
                </div>
              </ModalDialog>
            </Modal>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Room;
