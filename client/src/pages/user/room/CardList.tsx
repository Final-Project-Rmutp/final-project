import React from 'react';
import { Card, CardContent, CardActions, Button, Typography,} from '@mui/joy';

type CardListProps = {
  data: any[]; // Replace 'any' with the actual type of your data
  isRecommended: boolean;
  onConfirmClick: (roomId: string) => void;
  onReportClick: (roomId: string) => void;
};

const CardList: React.FC<CardListProps> = ({ data, isRecommended, onConfirmClick, onReportClick }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Card key={item.room_id || index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography >{item.room_level}</Typography>
            <Typography>{item.room_type}</Typography>
            <Typography>{item.room_number}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => onConfirmClick(item.room_id)}>
              Confirm
            </Button>
            <Button 
              color={isRecommended ? 'danger' : 'warning'}
              onClick={() => onReportClick(item.room_id)}
            >
              {isRecommended ? 'Report' : 'Recommend'}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CardList;
