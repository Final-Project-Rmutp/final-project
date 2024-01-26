import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface BarChartProps {
  data: {
    roomNumber: number;
    bookings: number;
    cancellations?: number;
  }[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  const barChartData = [
    { label: 'Most Booked', value: data[0].bookings },
    { label: 'Least Booked', value: data[1].bookings },
    { label: 'Most Canceled', value: data[2].cancellations || 0 },
  ];

  return (
    <BarChart
      series={[
        {
          data: barChartData.map((item) => item.value),
          highlightScope: { faded: 'global', highlighted: 'item' },
        },
      ]}
      height={500}
    />
  );
};

export default BarChartComponent;
