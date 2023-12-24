import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../auth/AuthContext';
import Floor6 from '../../components/floor6/Floor6';
import './Room.scss';
import { Select, Option, Typography } from '@mui/joy';
// import { toast } from 'sonner';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/th";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import NewAdapter from './AdapterDay'
import { DateTime } from './RoomStyled';
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
          <Select placeholder="Select a floor" onChange={(_, value) => handleFloorSelect(value as string)}>
            {availableFloors.map(floor => (
              <Option key={floor} value={floor}>
                {floor}
              </Option>
            ))}
          </Select>
          {/* <p>Welcome, {userInfo.name}!</p> */}
          {/* <div className="login-button-user" onClick={handleLogout}>
            <div>
              <Button color="danger">Logout</Button>
            </div>
          </div> */}
          <div className="controls">
            <Typography >Select Date and Time:</Typography>
            <div>
              <LocalizationProvider dateAdapter={NewAdapter} adapterLocale="th" >
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
