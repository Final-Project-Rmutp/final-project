// Home.tsx
import React from 'react';
import './Room.scss';
import Dropdown from '../../shared/dropdown/Dropdown';
import Datetime from '../../shared/datetime/Datetime';
const Room: React.FC = () => {
  return (
    <div className='eiei'>
      <div className="controls">
        <label htmlFor="roomDropdown">Select Room:</label>
        <Dropdown/>
        <label htmlFor="dateTimeInput">Select Date and Time:</label>
        <Datetime/>
      </div>

      <div className="roomLayout">
        <p>Room Layout:</p>
        {/* Container for four bedrooms */}
        <div className="bedroomContainer">
          <div className="blank1" id="floor6">blank</div>
          <div className="elevator" id="floor6">ลิฟท์</div>
          <div className="blank2" id="floor6">blank2</div>
          <div className="room601" id="floor6">601</div>
          <div className="room602" id="floor6">602</div>
        </div>
      </div>
    </div>
  );
};

export default Room;
