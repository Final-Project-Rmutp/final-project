import React, { useState } from 'react';
import Floor6 from '../../components/floor6/Floor6';
import './Room.scss';
import { Typography } from '@mui/joy';

import "dayjs/locale/th";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import NewAdapter from './AdapterDay'
import { DateTime, OptionStyle, SelectStyle } from './RoomStyled';
const Room: React.FC = () => {
  // const { getUserInfo } = useAuth();
  // const navigate = useNavigate();
  // const userInfo = getUserInfo();
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<dayjs.Dayjs | null>(dayjs());

  const availableFloors = ['Floor 1', 'Floor 2', 'Floor 6'];

  const handleFloorSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedFloor(value);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userRole');
  //   navigate('/');
  //   toast.success('Logout Successful');
  // };


  
  return (
    <div>
      <div className="eiei center-content">
        <div className="center-controls">
          <Typography >Select Room:</Typography>
          <SelectStyle placeholder="Select a floor" onChange={(_, value) => handleFloorSelect(value as string)}>
            {availableFloors.map(floor => (
              <OptionStyle key={floor} value={floor}>
                {floor}
              </OptionStyle>
            ))}
          </SelectStyle>
          <div className="controls">
            <Typography >Select Date and Time:</Typography>
            <div>
              <LocalizationProvider 
              dateAdapter={NewAdapter} 
              adapterLocale="th" 
              >
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
            </div>
          </div>
        </div>
        {selectedFloor === 'Floor 6' && <Floor6 />}
      </div>
    </div>
  );
};

export default Room;
