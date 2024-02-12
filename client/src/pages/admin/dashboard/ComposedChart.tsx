import { useState, useEffect } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, ResponsiveContainer } from 'recharts';
import RoomService from '../../../auth/service/RoomService';

const       ComposedChartComponent = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await RoomService.getReportData();
        const formattedData = data.dataset.map((item: { x: string, y: string }) => ({
          name: item.x, 
          y: parseInt(item.y) 
        }));
        setReportData(formattedData);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={reportData}>
        <XAxis dataKey="name" name='asd'/>
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#fff" />
        <Area type="monotone" dataKey="y" fill="#8884d8" stroke="#8884d8" name='จำนวน' />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartComponent;
