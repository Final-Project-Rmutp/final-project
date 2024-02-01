
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import RoomService from '../../../auth/service/RoomService';

export class RoomData {
  room_number!: string;
  reservations!: string;
  cancellations?: string;
}


export class DashboardData {
  total_reserved!: string;
  most_reserved_room!: RoomData;
  least_reserved_room!: RoomData;
  most_cancelled_room!: RoomData;
}




const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
  transition: 'opacity 0.5s', 
  opacity: 1,
  '&.fade': {
    opacity: 0,
  },
}));

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  return (
    <>
      <circle cx={centerX} cy={centerY} r={50} fill="#ffffff" />
      <StyledText x={centerX} y={centerY} fill="#000000">
        {children}
      </StyledText>
    </>
  );
}


const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await RoomService.getReservedData();
        setDashboardData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);
  if (!dashboardData) {
    // If data is still loading or fetching, you can return a loading indicator
    return <div>Loading...</div>;
  }
  
  const mostBookedRoomData = {
    roomNumber: dashboardData?.most_reserved_room?.room_number || '',
    bookings: dashboardData?.most_reserved_room?.reservations || '0',
  };
  
  const leastBookedRoomData = {
    roomNumber: dashboardData?.least_reserved_room?.room_number || '',
    bookings: dashboardData?.least_reserved_room?.reservations || '0',
  };
  
  const mostCancelledRoomData = {
    roomNumber: dashboardData?.most_cancelled_room?.room_number || '',
    cancellations: dashboardData?.most_cancelled_room?.cancellations || '0',
  };
  
  const pieChartData = [
    {
      id: 0,
      value: Number(mostBookedRoomData.bookings),
      label: `Room ${mostBookedRoomData.roomNumber} - Most Booked`,
      color: '#0088FE',
    },
    {
      id: 1,
      value: Number(leastBookedRoomData.bookings),
      label: `Room ${leastBookedRoomData.roomNumber} - Least Booked`,
      color: '#FF8042',
    },
    {
      id: 2,
      value: Number(mostCancelledRoomData.cancellations),
      label: `Room ${mostCancelledRoomData.roomNumber} - Most Cancelled`,
      color: '#00C49F',
    },
  ];

  return (
    <div className="container mx-auto w-50">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{dashboardData?.total_reserved || '0'}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ width: '100%' }}>
              <Typography variant="h6">Booking Stats</Typography>
              <PieChart
                sx={{width:'100%' ,maxWidth:'1000px'}}
                series={[
                  { 
                    data: pieChartData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'purple' },
                    innerRadius: 50,
                  },
                ]}
                height={300}
              >
                <PieCenterLabel>จองทั้งหมด {dashboardData?.total_reserved || '0'}</PieCenterLabel>
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={12} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bar Chart</Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
