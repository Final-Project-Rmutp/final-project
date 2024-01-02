import React from 'react';
import './Floor6.scss';
import { Card, Typography } from '@mui/joy';

const Floor6: React.FC = () => {
  return (
    <div className="roomLayout">
      <Typography>Room Layout</Typography>
      {/* Container for four bedrooms */}
      <Card>
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
      </Card>
    </div>
  );
};

export default Floor6;
