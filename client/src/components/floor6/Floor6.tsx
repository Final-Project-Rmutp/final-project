import React from 'react';
import './floor6.scss';

const Floor6: React.FC = () => {
  return (
    <div className="roomLayout">
      <label>Room Layout</label>
      {/* Container for four bedrooms */}
      <div className="bedroomContainer">
        <div className="blank1" id="blank1_floor6">
          blank
        </div>
        <div className="elevator" id="elevator_floor6">
          ลิฟท์
        </div>
        <div className="blank2" id="blank2_floor6">
          blank2
        </div>
        <div className="room601" id="room601_floor6">
          601
        </div>
        <div className="room602" id="room602_floor6">
          602
        </div>
      </div>
    </div>
  );
};

export default Floor6;
