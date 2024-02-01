import React from 'react';
import { Card, CardContent, CardActions, Button, Typography,} from '@mui/joy';
import { SearchRoomParams } from '../../../auth/service/RoomService';

type CardListProps = {
  data: SearchRoomParams[]; // Replace 'any' with the actual type of your data
  isRecommended: boolean;
  onConfirmClick: (roomId: string ,roomNumber:string) => void;
  onReportClick: (roomId: string,roomNumber:string) => void;
};

const CardList: React.FC<CardListProps> = ({ data, onConfirmClick, onReportClick }) => {
  return (
    <div style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
      {data.map((item, index) => (
        <Card key={item.room_id || index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography>ชั้น : {item.room_level}</Typography>
            <Typography>รูปแบบห้อง : {item.room_type}</Typography>
            <Typography>ห้อง : {item.room_number}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => onConfirmClick(item.room_id,item.room_number)}>
              Confirm
            </Button>
            <Button 
              color='danger'
              onClick={() => onReportClick(item.room_id,item.room_number)}
            >
              {'Report'}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
