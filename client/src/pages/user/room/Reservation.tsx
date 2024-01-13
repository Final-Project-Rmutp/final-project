import React, { useState } from 'react';
import Floor6 from '../../../components/floor6/Floor6';
import './Reservation.scss';
import { FormLabel, Grid } from '@mui/joy';

import "dayjs/locale/th";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import NewAdapter from './AdapterDay'
import { DateTime, OptionStyle, SelectStyle } from './ReservationStyled';

const Room: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<dayjs.Dayjs | null>(dayjs());

  const availableFloors = ['Floor 1', 'Floor 2', 'Floor 6'];
  const roomNumber = ['9901', '9902', '9903'];
  const roomTypes = ['Single Room', 'Double Room', 'Suite'];
  const durations = ['1 Hour', '2 Hours', '3 Hours'];
  const numberOfPeopleOptions = ['1', '2', '3', '4', '5'];

  const handleDurationSelect = (value: string | null) => {
    console.log('Selected Duration:', value);
  };
  
  const handleRoomNumberSelect = (value: string | null) => {
    console.log('Selected Room Type:', value);
  };
  
  const handleRoomTypeSelect = (value: string | null) => {
    console.log('Selected Room Type:', value);
  };
  
  const handleNumberOfPeopleSelect = (value: string | null) => {
    console.log('Selected Number of People:', value);
  };
  
  const handleFloorSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedFloor(value);
    }
  };

  return (
    <div className="container mx-auto">
      <form action="">
        <Grid
          container
          spacing={2}
          columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{ alignItems: 'center', flexGrow: 1, padding: 8,marginTop:3}}
        >
          <Grid>
            <FormLabel>dateTimestart</FormLabel>
            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
              <DateTime
                className='datetime-picker'
                localeText={{ start: "Check-in", end: "Check-out" }}
                format="DD MMMM YYYY HH:mm"
                value={selectedDateTime}
                onChange={(newValue: unknown) => {
                  if (typeof newValue === 'string') {
                    setSelectedDateTime(dayjs(newValue));
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid>
            <FormLabel>dateTimeEnd</FormLabel>
            <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th">
              <DateTime
                className='datetime-picker'
                localeText={{ start: "Check-in", end: "Check-out" }}
                format="DD MMMM YYYY HH:mm"
                value={selectedDateTime}
                onChange={(newValue: unknown) => {
                  if (typeof newValue === 'string') {
                    setSelectedDateTime(dayjs(newValue));
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid>
            <FormLabel>ชั้น</FormLabel>
            <SelectStyle placeholder="Select a floor" onChange={(_, value) => handleFloorSelect(value as string)}>
              {availableFloors.map(floor => (
                <OptionStyle key={floor} value={floor}>
                  {floor}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>ห้อง</FormLabel>
            <SelectStyle placeholder="Select room number" onChange={(_, value) => handleRoomNumberSelect(value as string)}>
              {roomNumber.map(floor => (
                <OptionStyle key={floor} value={floor}>
                  {floor}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>จำนวนชั่วโมง</FormLabel>
            <SelectStyle placeholder="Select duration" onChange={(_, value) => handleDurationSelect(value as string)}>
              {durations.map(duration => (
                <OptionStyle key={duration} value={duration}>
                  {duration}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>ประเภทห้อง</FormLabel>
            <SelectStyle placeholder="Select room type" onChange={(_, value) => handleRoomTypeSelect(value as string)}>
              {roomTypes.map(roomType => (
                <OptionStyle key={roomType} value={roomType}>
                  {roomType}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
          <Grid>
            <FormLabel>จำนวนคน</FormLabel>
            <SelectStyle placeholder="Select number of people" onChange={(_, value) => handleNumberOfPeopleSelect(value as string)}>
              {numberOfPeopleOptions.map(numberOfPeople => (
                <OptionStyle key={numberOfPeople} value={numberOfPeople}>
                  {numberOfPeople}
                </OptionStyle>
              ))}
            </SelectStyle>
          </Grid>
        </Grid>
      </form>
      {selectedFloor === 'Floor 6' && <Floor6 />}
    </div>
  );
};

export default Room;
