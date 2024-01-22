import React, { useState } from 'react';
// import Floor6 from '../../../components/floor6/Floor6';
import './Reservation.scss';
import { Button, FormLabel, Grid } from '@mui/joy';

import "dayjs/locale/th";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import NewAdapter from './AdapterDay'
import { DateTime, OptionStyle, SelectStyle } from './ReservationStyled';
import RoomService, { SearchRoomParams } from '../../../auth/service/RoomService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Room: React.FC = () => {
  // const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [selectedStartTime, setSelectedStartTime] = useState<dayjs.Dayjs | null>(dayjs().startOf('day').hour(8));
  const [selectedEndTime, setSelectedEndTime] = useState<dayjs.Dayjs | null>(dayjs().startOf('day').hour(8));
  const [searchRoom, setSearchRoom] = useState<SearchRoomParams>({
    room_capacity: '',
    room_level: '',
    room_type: '',
    room_number: '',
    reservation_date: '',
    start_time: '',
    end_time: '',
  }); 
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
  // const handleDurationSelect = (value: string | null) => {
  //   console.log('Selected Duration:', value);
  // };
  
  // const handleRoomNumberSelect = (value: string | null) => {
  //   console.log('Selected Room Type:', value);
  // };
  
  // const handleRoomTypeSelect = (value: string | null) => {
  //   console.log('Selected Room Type:', value);
  // };
  
  // const handleNumberOfPeopleSelect = (value: string | null) => {
  //   console.log('Selected Number of People:', value);
  // };
  
  // const handleFloorSelect = (value: string | null) => {
  //   if (value !== null) {
  //     setSelectedFloor(value);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const startTime = selectedStartTime?.format("HH:00");
      const endTime = selectedEndTime?.format("HH:00");
      if (startTime && endTime) {
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);
  
        if (startHour < 8 || endHour > 18) {
          console.error('Invalid time range. Please select a time between 08:00 and 18:00.');
          return;
        }
      }
  
      const response = await RoomService.searchRoom({
        room_capacity: searchRoom.room_capacity,
        room_level: searchRoom.room_level,
        room_type: searchRoom.room_type,
        room_number: searchRoom.room_number,
        reservation_date: selectedDate?.format("YYYY-MM-DD") || "",
        start_time: startTime || "",
        end_time: endTime || "",
      } as SearchRoomParams);
      if (response) {
        console.log('Room search successful:', response);
      } else {
        console.error('Failed to search room:', response);
      }
    } catch (error) {
      console.error('Error during room search:', error);
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
  const shouldDisableTime = (value: dayjs.Dayjs) => {
    const hour = value.hour();
    return hour < 8 || hour > 18;
  };

  return (
    <div className="container mx-auto">
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
                    shouldDisableTime={shouldDisableTime}
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
                    shouldDisableTime={shouldDisableTime}
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
      {/* {selectedFloor === 'Floor 6' && <Floor6 />} */}
    </div>
  );
};

export default Room;
