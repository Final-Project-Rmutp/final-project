// AdminDashboard.tsx
import React from 'react';
// import ChartComponent from './Chart';
import DashboardComponent from './LineChartComponent';

const AdminDashboard: React.FC = () => {
  return (
    <div className='container mx-auto' style={{ width: '50%' }}>
      <h1>Admin Dashboard</h1>
      {/* <ChartComponent
        apiUrls={[
          '/dashboard/getbookingData',
          '/dashboard/getcancellationData',
          '/dashboard/getfrequentUseData',
          '/dashboard/getrarelyUsedData',
        ]}
        title="Combined Data Chart"
      /> */}
      <DashboardComponent></DashboardComponent>
    </div>
  );
};

export default AdminDashboard;
