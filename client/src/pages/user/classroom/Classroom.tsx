// ClassRoomAdmin.tsx
import UserService, { ClassSchedule } from '../../../auth/service/UserService';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system'; 
import { Typography, useColorScheme } from '@mui/joy';
const TimetableContainer = styled('div')`
  margin: 20px auto;
  text-align: center;
  width: 80%;
  border-radius: 10px;
  overflow: hidden;
  margin-top:5%;
  background-color:#fff;
  
`;

const TimetableHeader = styled(Typography)`
  font-size: 24px;
  margin-top:3%;
  color:#000;

`;

const TimetableTable = styled('table')`
  border-collapse: collapse;
  width: 70%;
  margin: 30px auto;
`;

const TimetableTh = styled('th')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
`;

interface TimetableDaysColumnProps {
  day: string;
}
const TimetableDaysColumn = styled('td')<TimetableDaysColumnProps>`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: 100px;
  padding:10px;
  background-color: ${props => {
    switch (props.day) {
      case 'Monday':
        return '#FFFF99';
      case 'Tuesday':
        return '#FFC0CB ';
      case 'Wednesday':
        return '#99ff99';
      case 'Thursday':
        return '#ffcc99';
      case 'Friday':
        return '#87CEEB'; 
      case 'Saturday':
        return '#b06ae6 ';
      case 'Sunday':
        return '#ff6978';
      default:
        return '#f2f2f2'; 
    }
  }};
  @media (max-width: 600px) {
    width: 70px; // Adjust width for smaller screens
  }
`;

const TimetableTd = styled('td')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: auto;
  background-color: #fff;
  padding: 5px;
  margin: 2px;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const ScrollableTableContainer = styled('div')`
  overflow-x: auto;
`;

const TimetableTimeSlot = styled('th')`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 12px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;
const generateTimeSlots = () => {
  const startTime = '08:00:00';
  const endTime = '18:00:00';
  const timeSlots = [];

  let currentSlot = startTime;

  while (currentSlot < endTime) {
    timeSlots.push({ start: currentSlot, end: addHour(currentSlot) });
    currentSlot = addHour(currentSlot);
  }

  return timeSlots;
};

const generateHeaderTimeSlots = () => {
  const startTime = '08:00:00';
  const endTime = '18:00:00';
  const timeSlots = [];

  let currentSlot = startTime;

  while (currentSlot < endTime) {
    timeSlots.push({ start: currentSlot.slice(0, 5), end: addHour(currentSlot).slice(0, 5) });
    currentSlot = addHour(currentSlot);
  }

  return timeSlots;
};
const addHour = (time: string): string => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const newDate = new Date(0, 0, 0, hours, minutes, seconds + 60 * 60);
  return newDate.toTimeString().slice(0, 8);
};

const Classroom: React.FC = () => {
  const [timetableData, setTimetableData] = useState<ClassSchedule[]>([]);
  const timeSlotsBody = generateTimeSlots();
  const headerTimeSlots = generateHeaderTimeSlots();

  const generateTimetableRows = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <>
        {daysOfWeek.map((day) => (
          <tr key={day}>
            <TimetableDaysColumn day={day} key={day}><b>{day}</b></TimetableDaysColumn>
            {timeSlotsBody.map((timeSlot) => (
              <TimetableTd  colSpan={3} key={`${day}-${timeSlot.start}`}>
                {timetableData.map((item) => (
                  item &&
                  item.day_of_week === day &&
                  item.start_time === timeSlot.start &&
                  item.end_time === timeSlot.end && (
                  <div key={item.id} style={{padding:'5px',margin:'2px',fontSize:'12px'}}>
                    <div><b className="text-danger" >{item.subject_name}</b></div>
                    <div><b className="text-danger" >{item.room_number}</b></div>
                  </div>
                  )
                ))}
              </TimetableTd>
            ))}
          </tr>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await UserService.getClassSchedule();
        setTimetableData(Array.isArray(response) ? response : [response]);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);
  const { mode } = useColorScheme();

  return (
    <div
      className="py-24 sm:py-32 md:py-40 relative d-flex justify-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        maxHeight: "calc(100vh - 5px)",
        overflowY: "auto" || "hidden",
        ...(mode === "dark"
          ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
          : { background: "#AA96DA" }),
        padding: 5,
      }}
    >
      <TimetableContainer>
        <TimetableHeader>{timetableData.length > 0 ? timetableData[0].fullname : 'Unknown'}</TimetableHeader>
        <ScrollableTableContainer>
          <TimetableTable>
            <thead>
              <tr>
                <TimetableTh><b>Day/Period</b></TimetableTh>
                {headerTimeSlots.map((timeSlot) => (
                  <TimetableTimeSlot  colSpan={3} key={timeSlot.start}><b>{`${timeSlot.start} - ${timeSlot.end}`}</b></TimetableTimeSlot>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTimetableRows()}
            </tbody>
          </TimetableTable>
        </ScrollableTableContainer>
      </TimetableContainer>
    </div>
  );
};

export default Classroom;