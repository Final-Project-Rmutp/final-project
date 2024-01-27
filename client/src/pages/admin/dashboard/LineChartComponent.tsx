import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import RoomService from '../../../auth/service/RoomService';

export interface RoomData {
  roomNumber: string;
  bookings: string;
  cancellations: string;
}

export interface DashboardData {
  totalBookings: string;
  mostBookedRoom: RoomData[];
  leastBookedRoom: RoomData[];
  mostCancelledRoom: RoomData[];
}

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const DashboardComponent: React.FC = () => {
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
  }, []); // Empty dependency array means this effect runs once after the initial render.

  if (!dashboardData) {
    // If data is still loading, you can show a loading indicator or return null.
    return null;
  }

  const pieChartData = [
    {
      id: 0,
      value: Number(dashboardData?.mostBookedRoom[0]?.bookings) || 0,
      label: `Room ${dashboardData?.mostBookedRoom[0]?.roomNumber || ''} - Most Booked`,
      color: '#0088FE',
    },
    {
      id: 1,
      value: Number(dashboardData?.leastBookedRoom[0]?.bookings) || 0,
      label: `Room ${dashboardData?.leastBookedRoom[0]?.roomNumber || ''} - Least Booked`,
      color: '#FF8042',
    },
    {
      id: 2,
      value: Number(dashboardData?.mostCancelledRoom[0]?.cancellations) || 0,
      label: `Room ${dashboardData?.mostCancelledRoom[0]?.roomNumber || ''} - Most Cancelled`,
      color: '#00C49F',
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{dashboardData?.totalBookings || '0'}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={12}>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ width: '100%' }}>
            <Typography variant="h6">Booking Stats</Typography>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'purple' },
                  innerRadius: 60,
                },
              ]}
              sx={{ marginLeft: 15 }}
              {...size}
            >
              <PieCenterLabel>จองทั้งหมด {dashboardData?.totalBookings || '0'}</PieCenterLabel>
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Bar Chart</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardComponent;
