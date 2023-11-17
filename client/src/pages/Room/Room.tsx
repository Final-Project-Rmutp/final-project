// Room.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import Dropdown from '../../shared/dropdown/Dropdown';
import Datetime from '../../shared/datetime/Datetime';
import './Room.scss'

const Room: React.FC = () => {
  const { user, logout, getUserInfo } = useAuth(); // Add getUserInfo function
  const navigate = useNavigate();

  if (!user) {
    // Redirect to login if the user is not logged in
    navigate('/');
    return null;
  }

  const userInfo = getUserInfo(); // Get user information

  return (
    <div className="eiei">
      <div 
        className="logout-button"
        onClick={() => {
          logout();
          navigate('/');
        }}
        >
          <div>
            <p>Welcome, {userInfo.name}!</p>
          </div>
          <div className=''>
            <p>LogOut!</p>
          </div>
        </div>
      <div className="controls">
        <label htmlFor="roomDropdown">Select Room:</label>
        <Dropdown />
        <label htmlFor="dateTimeInput">Select Date and Time:</label>
        <Datetime />
      </div>

      <div className="roomLayout">
        <label>Room Layout</label>
        {/* Container for four bedrooms */}
        <div className="bedroomContainer">
          <div className="blank1" id="floor6">
            blank
          </div>
          <div className="elevator" id="floor6">
            ลิฟท์
          </div>
          <div className="blank2" id="floor6">
            blank2
          </div>
          <div className="room601" id="floor6">
            601
          </div>
          <div className="room602" id="floor6">
            602
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
