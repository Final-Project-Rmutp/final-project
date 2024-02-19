// ClassRoomAdmin.tsx
import UserService, { ClassSchedule } from "../../../auth/service/UserService";
import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/system";
import { Typography, useColorScheme } from "@mui/joy";
const TimetableContainer = styled("div")`
  margin: 20px auto;
  text-align: center;
  width: 85%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2px);
  -webkit-backdrop-filter: blur(1.2px);
  border: 1px solid rgba(255, 255, 255, 0.01);
  height:100%;
  max-height:550px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;
const TimetableContainerIn = styled("div")`
  margin:10px;
  margin-top:0px;
  text-align: center;
  width: 98%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2px);
  -webkit-backdrop-filter: blur(1.2px);
  border: 1px solid rgba(255, 255, 255, 0.01);
`;

const TimetableHeader = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.pf.color};
`;

const TimetableTable = styled("table")`
  border-collapse: collapse;
  width: 100%;
  border-radius: 16px;
`;

const TimetableTh = styled("th")`
  color: black;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  border-top-left-radius: 16px;
  
`;

interface TimetableDaysColumnProps {
  day: string;
}
const TimetableDaysColumn = styled("td")<TimetableDaysColumnProps>`
  color: black;
  border: 1px solid black;
  border-left: none;
  border-bottom: none;
  ${(props) => props.day === "Sunday" && `
  &:first-child {
    border-bottom-left-radius: 16px;
  }
`}

  text-align: center;
  width: 100px;
  background: ${({ day }) => {
    switch (day) {
      case "Monday":
        return "linear-gradient(to right, #DCFFB7, #FFEAA7)"; // Yellow gradient
      case "Tuesday":
        return "linear-gradient(to right, #FF90BC, #FFC0D9)"; // Pink gradient
      case "Wednesday":
        return "linear-gradient(to right, #BFEA7C, #9BCF53)"; // Green gradient
      case "Thursday":
        return "linear-gradient(to right, #ffcc99, #FFA07A)"; // Light Coral gradient
      case "Friday":
        return "linear-gradient(to right, #87CEEB, #40A2D8)"; // Sky Blue gradient
      case "Saturday":
        return "linear-gradient(to right, #b06ae6, #C499F3)"; // Purple gradient
      case "Sunday":
        return "linear-gradient(to right, #EF6262, #FF8989)"; // Crimson gradient
      default:
        return "linear-gradient(to right, #f2f2f2, #d9d9d9)"; // Default gradient
    }
  }};
  @media (max-width: 600px) {
    width: 70px;
  }
`;


const TimetableTd = styled("td")`
  color: black;
  border: 1px solid black;
  border-bottom: none;
  border-left: none;
  &:last-child {
    border-right: none;
  }
  text-align: center;
  width: 120px;
  background-color: #fff;

  @media (max-width: 600px) {
    width: 100%;
  }

  &:hover {
    transform: scale(1.3);
    border-radius:10px;
    z-index:2;
  }
`;

const ScrollableTableContainer = styled("div")`
  overflow-x: auto;
  
`;

const TimetableTimeSlot = styled("th")`
  color: black;
  border-left: 1px solid black;
  border-bottom: none;
  height: 50px;
  text-align: center;
  background-color: #f2f2f2;
  font-size: 12px;
  &:last-child {
    border-top-right-radius: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
  
`;
const generateTimeSlots = () => {
  const startTime = "08:00:00";
  const endTime = "18:00:00";
  const timeSlots = [];

  let currentSlot = startTime;

  while (currentSlot < endTime) {
    timeSlots.push({ start: currentSlot, end: addHour(currentSlot) });
    currentSlot = addHour(currentSlot);
  }

  return timeSlots;
};

const generateHeaderTimeSlots = () => {
  const startTime = "08:00:00";
  const endTime = "18:00:00";
  const timeSlots = [];

  let currentSlot = startTime;

  while (currentSlot < endTime) {
    timeSlots.push({
      start: currentSlot.slice(0, 5),
      end: addHour(currentSlot).slice(0, 5),
    });
    currentSlot = addHour(currentSlot);
  }

  return timeSlots;
};
const addHour = (time: string): string => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const newDate = new Date(0, 0, 0, hours, minutes, seconds + 60 * 60);
  return newDate.toTimeString().slice(0, 8);
};

const Classroom: React.FC = () => {
  const [timetableData, setTimetableData] = useState<ClassSchedule[]>([]);
  const [dayColors, setDayColors] = useState<{ [key: string]: string }>({
    Monday: "#FFFF99",
    Tuesday: "#FFC0CB",
    Wednesday: "#99ff99",
    Thursday: "#ffcc99",
    Friday: "#87CEEB",
    Saturday: "#b06ae6",
    Sunday: "#ff6978",
  });
  const timeSlotsBody = generateTimeSlots();
  const headerTimeSlots = generateHeaderTimeSlots();

  const generateTimetableRows = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
  
    return (
      <>
        {daysOfWeek.map((day) => (
          <tr key={day} >
            <TimetableDaysColumn day={day} key={day} style={{height:'50px',padding:'10px'}}>
              <b >{day}</b>
            </TimetableDaysColumn>
            {timeSlotsBody.map((timeSlot) => {
              const itemsInTimeSlot = timetableData.filter((item) => item.day_of_week === day && item.start_time === timeSlot.start);
              const colspan = itemsInTimeSlot.length;

              return (
                <TimetableTd colSpan={colspan > 0 ? colspan : 1} key={`${day}-${timeSlot.start}`}>
                  {itemsInTimeSlot.map((item) => (
                    <div
                    className="d-flex justify-content-center align-items-center flex-column"
                      key={item.reservation_id}
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: dayColors[item.day_of_week],
                        textAlign:'center',
                        padding:5
                      }}
                    >
                      <div style={{ width: "120px"}}>
                        <span className="text-dark fw-bold" style={{ fontSize: "12px"}}>วิชา : {item.subject_name}</span>
                      </div>
                      <div style={{ width: "120px" }}>
                        <span className="text-dark fw-bold" style={{ fontSize: "12px"}}>ห้อง : {item.room_number}</span>
                      </div>
                    </div>
                  ))}
                </TimetableTd>
              );
            })}
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
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);
  useEffect(() => {
    const newDayColors = { ...dayColors };
    timetableData.forEach((item) => {
      newDayColors[item.day_of_week] = getDayColor(item.day_of_week);
    });
    setDayColors(newDayColors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timetableData]);

  const getDayColor = (day: string): string => {
    switch (day) {
      case "Monday":
        return "#FFFF99";
      case "Tuesday":
        return "#FFC0CB";
      case "Wednesday":
        return "#99ff99";
      case "Thursday":
        return "#ffcc99";
      case "Friday":
        return "#87CEEB";
      case "Saturday":
        return "#b06ae6";
      case "Sunday":
        return "#ff6978";
      default:
        return "#f2f2f2";
    }
  };
  const { mode } = useColorScheme();
  const darkMode = mode === "dark";
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  const currentWeekday = currentDate.toLocaleString('en-US', { weekday: 'long' });
  const currentTime = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  
  return (
    <div
      className="py-24 sm:py-32 md:py-40 relative d-flex justify-center align-items-center"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        maxHeight: "calc(100vh - 0px)",
        overflowY: "auto" || "hidden",
        ...(mode === "dark"
        ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
        : { background: "linear-gradient(to bottom, #AA96DA, #6962AD)" }),
        padding: 1,
      }}
    >
      <Container sx={{paddingTop:9}}>
        <TimetableContainer>
          <TimetableHeader>
          <div style={{ textAlign: 'left' }}>
            <img
              src={darkMode ? "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Teacher%20Dark%20Skin%20Tone.png" : "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Teacher%20Light%20Skin%20Tone.png"}
              alt={darkMode ? "Dark Emoji" : "Light Emoji"}
              style={{
                width: '30%',  // Adjust the width as needed
                maxWidth: '100px',  // Set a max width if necessary
                borderRadius: "50%",
                float: 'left',  // Align the image to the left
                marginRight: '10px',  // Add some margin if needed
              }}
            />
          </div>
            <div className="mt-3 text-start">
              <b className="fs-6">Today</b>
              <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Tear%20Off%20Calendar.webp" alt="Tear Off Calendar" width="25" height="25" />
            </div>
            <div className="text-start" style={{ fontSize: '14px' }}>
              <span className="fw-bold">Month:</span>  {currentMonth}
            </div>
            <div className="text-start" style={{ fontSize: '14px' }}>
              <span className="fw-bold">Day:</span> {currentWeekday}
            </div>
            <div className="text-start" style={{ fontSize: '14px' }}>
              <span className="fw-bold">Time:</span> {currentTime}
            </div>
          </TimetableHeader>
          <TimetableContainerIn>
            <ScrollableTableContainer>
              <TimetableTable>
                <thead>
                  <tr>
                    <TimetableTh>
                      <b>Day/Period</b>
                    </TimetableTh>
                    {headerTimeSlots.map((timeSlot) => (
                      <TimetableTimeSlot key={timeSlot.start}>
                        <b>{`${timeSlot.start} - ${timeSlot.end}`}</b>
                      </TimetableTimeSlot>
                    ))}
                  </tr>
                </thead>
                <tbody>{generateTimetableRows()}</tbody>
              </TimetableTable>
            </ScrollableTableContainer>
          </TimetableContainerIn>
        </TimetableContainer>
      </Container>


    </div>
  );
};

export default Classroom;
