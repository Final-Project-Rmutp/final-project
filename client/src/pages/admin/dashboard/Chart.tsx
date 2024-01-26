// ChartComponent.tsx
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axiosInstance from '../../../environments/axiosInstance';

interface Status {
  room_number: string;
  reservation_status: string;
  status_count: number;
}

interface ChartComponentProps {
  apiUrls: string[];
  title: string;
}

const apiDescriptions: { [key: string]: string } = {
    '/dashboard/getbookingData': 'การจอง',
    '/dashboard/getcancellationData': 'ยกเลิก',
    '/dashboard/getfrequentUseData': 'ใช้บ่อย',
    '/dashboard/getrarelyUsedData': 'ไม่ค่อยได้ใช้',
  };
  
const ChartComponent: React.FC<ChartComponentProps> = ({ apiUrls, title }) => {
  const [data, setData] = useState<Status[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = apiUrls.map((url) => axiosInstance.get<Status[]>(url));
        const responses = await Promise.all(fetchPromises);

        // Extract status arrays from each response
        const apiData = responses.map((response) => response.data);
        setData(apiData);
      } catch (error) {
        console.error(`Error fetching ${title} data:`, error);
      }
    };

    fetchData();
  }, [apiUrls, title]);

  const parsedData = data.map((apiData, index) => ({
    data: apiData.map((status) => status.status_count),
    label: apiDescriptions[apiUrls[index]] || `API ${index + 1}`, // Use description or fallback to default label
  }));

  return (
    <div className='container'>
      <h3>{title}</h3>
      <BarChart
        series={parsedData}
        height={300}
        xAxis={[
          {
            data: data.length > 0 ? data[0].map((status) => status.room_number) : [],
            scaleType: 'band',
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
};

export default ChartComponent;
