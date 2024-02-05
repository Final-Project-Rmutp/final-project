// ClassRoomAdmin.tsx
import UserService, { ClassSchedule } from '../../../auth/service/UserService';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimetableContainer = styled.div`
  margin: 20px auto;
  text-align: center;
  width: 100%;
`;

const TimetableHeader = styled.h1`
  font-size: 24px;
`;

const TimetableTable = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 30px auto;
`;

const TimetableTh = styled.th`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
`;


interface TimetableDaysColumnProps {
  day: string;
}
const TimetableDaysColumn = styled.td<TimetableDaysColumnProps>`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: 100px;
  background-color: ${props => {
    switch (props.day) {
      case 'Monday':
        return '#ff9999'; // สีแดง
      case 'Tuesday':
        return '#99ff99'; // สีเขียว
      case 'Wednesday':
        return '#9999ff'; // สีน้ำเงิน
      case 'Thursday':
        return '#ffff99'; // สีเหลือง
      case 'Friday':
        return '#ffccff'; // สีชมพู
      case 'Saturday':
        return '#ccffcc'; // สีม่วง
      case 'Sunday':
        return '#ffcc99'; // สีส้ม
      default:
        return '#f2f2f2'; // สีพื้นหลังทั่วไป
    }
  }};
  @media (max-width: 600px) {
    width: 70px; // Adjust width for smaller screens
  }
`;

const TimetableTd = styled.td`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  width: 150px;
  @media (max-width: 600px) {
    width: 100px; // Adjust width for smaller screens
  }
`;

const TimetableTimeSlot = styled.th`
  color: black;
  border: 1px solid black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 14px;
  @media (max-width: 600px) {
    font-size: 12px; // Adjust font size for smaller screens
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
                    <p key={item.id}>
                      <b className="text-danger">{`${item.subject_name} - ${item.room_number}`}</b>
                    </p>
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

  return (
    <div className="container d-flex justify-center align-items-center" style={{ height: "100vh" }}>
      <TimetableContainer>
        <TimetableHeader>TIME TABLE</TimetableHeader>
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
      </TimetableContainer>
    </div>
  );
};

export default Classroom;