import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Dropdown from '../../shared/dropdown/Dropdown';
import Datetime from '../../shared/datetime/Datetime';
import Floor6 from "../../components/floor6/Floor6";
import './Room.scss';

const Room: React.FC = () => {
  const { user, logout, getUserInfo, isAdmin, isUser} = useAuth();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

  const handleFloorSelect = (floor: string) => {
    setSelectedFloor(floor);
  };

  const renderControlsBasedOnRole = () => {
    if (isAdmin() || isUser()) {
      return (
        <>
          <label htmlFor="roomDropdown">Select Room:</label>
          <Dropdown onFloorSelect={handleFloorSelect} />
        </>
      );
    }

    if (isUser()) {
      return (
        <>
          <p>You are not allowed to select a room.</p>
        </>
      );
    }

    return null;
  };

  const renderWelcomeLogout = () => {
    if (user) {
      return (
        <div className="logout-button" onClick={() => { logout(); navigate('/'); }}>
          <p>Welcome, {userInfo.name}!</p>
        </div>
      );
    }
    
    return (
      <div className="login-button-user" onClick={() => { navigate('/'); }}>
        <div>
          <p>Sign in</p>
        </div>
      </div>
    );
  };

  return (
    <div className="eiei center-content">
      {renderWelcomeLogout()}
      <div className="center-controls">
        <div className="controls">
          {renderControlsBasedOnRole()}
          <label htmlFor="dateTimeInput">Select Date and Time:</label>
          <Datetime />
        </div>
      </div>
      {selectedFloor === 'ชั้น6' && <Floor6 />}
    </div>
  );
};

export default Room;

