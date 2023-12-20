import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Floor6 from '../../components/floor6/Floor6';
import './Room.scss';
import { Button, Select, Option } from '@mui/joy';
import { toast } from 'sonner';

const Room: React.FC = () => {
  const { getUserInfo } = useAuth();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const availableFloors = ['Floor 1', 'Floor 2', 'Floor 6'];

  const handleFloorSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedFloor(value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
    toast.success('Logout Successful');
  };

  return (
    <div>
      <div className="eiei center-content">
        <div className="center-controls">
          <label>Select Room:</label>
          <p>You are not allowed to select a room.</p>
          <Select placeholder="Select a floor" onChange={(_, value) => handleFloorSelect(value as string)}>
            {availableFloors.map(floor => (
              <Option key={floor} value={floor}>
                {floor}
              </Option>
            ))}
          </Select>
          <p>Welcome, {userInfo.name}!</p>
          <div className="login-button-user" onClick={handleLogout}>
            <div>
              <Button color="danger">Logout</Button>
            </div>
          </div>
          <div className="controls">
            <label>Select Date and Time:</label>
            {/* Add your Date and Time picker component here */}
          </div>
        </div>
        {selectedFloor === 'Floor 6' && <Floor6 />}
      </div>
    </div>
  );
};

export default Room;
