import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import BarChartComponent from './BarChartComponent';
import { DefaultizedPieValueType } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
interface RoomData {
  roomNumber: number;
  bookings: number;
  cancellations: number;
}

interface MockData {
  totalBookings: number;
  mostBookedRoom: RoomData;
  leastBookedRoom: RoomData;
  mostCancelledRoom: RoomData;
}

const mockData: MockData = {
  totalBookings: 100,
  mostBookedRoom: { roomNumber: 123, bookings: 10, cancellations: 0 },
  leastBookedRoom: { roomNumber: 456, bookings: 5, cancellations: 0 },
  mostCancelledRoom: { roomNumber: 789, bookings: 10, cancellations: 8 },
  // Add more data if needed  
};

const barChartData = [
  {
    roomNumber: mockData.mostBookedRoom.roomNumber,
    bookings: mockData.mostBookedRoom.bookings,
    cancellations: mockData.mostBookedRoom.cancellations || 0,
  },
  {
    roomNumber: mockData.leastBookedRoom.roomNumber,
    bookings: mockData.leastBookedRoom.bookings,
    cancellations: mockData.leastBookedRoom.cancellations || 0,
  },
  {
    roomNumber: mockData.mostCancelledRoom.roomNumber,
    bookings: mockData.mostCancelledRoom.bookings || 0,
    cancellations: mockData.mostCancelledRoom.cancellations || 0,
  },
  // Add more data if needed
];

const TOTAL = barChartData.map((item) => item.bookings).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
  const percent = TOTAL === 0 ? 0 : params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};



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

  const pieChartData = [
    {
      id: 0,
      value: mockData.mostBookedRoom.bookings,
      label: `Room ${mockData.mostBookedRoom.roomNumber} - Most Booked`,
      color: '#0088FE'
    },
    {
      id: 1,
      value: mockData.leastBookedRoom.bookings,
      label: `Room ${mockData.leastBookedRoom.roomNumber} - Least Booked`,
      color: '#FF8042'
    },
    {
      id: 2,
      value: mockData.mostCancelledRoom.cancellations,
      label: `Room ${mockData.mostCancelledRoom.roomNumber} - Most Cancelled`,
      color: '#00C49F'
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{mockData.totalBookings}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={12}>
        <Card sx={{width:'100%'}}>
          <CardContent sx={{width:'100%'}}>
            <Typography variant="h6">Booking Stats</Typography>
            <PieChart
              series={[
                {
                  data: pieChartData,
                  arcLabel: getArcLabel,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'purple' },
                  innerRadius: 60,
                },
              ]}
              sx={{marginLeft:15}}
              {...size}
              
            >
              <PieCenterLabel>จองทั้งหมด {mockData.totalBookings}</PieCenterLabel>
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Bar Chart</Typography>
            <BarChartComponent data={barChartData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardComponent;
