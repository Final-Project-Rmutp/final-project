import React, { useState } from "react";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import styled from "styled-components";
import { SlotProps } from "@mui/joy/utils/types";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timeSlots: { start: string; end: string }[] = [
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
  { start: "17:00", end: "18:00" },
];

const TimeSlotRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DayColumn = styled.div`
  width: 120px;
  text-align: center;
  font-weight: bold;
`;

const TimeSlotBox = styled.div`
  width: 80px;
  height: 40px;
  border: 1px solid #ddd;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #eaf7eb;
    border-color: #4caf50;
  }

  &.selected {
    background-color: #aaf0d1;
    border-color: #4caf50;
  }
`;

const Slot: React.FC<SlotProps> = ({ slot, onClick, isSelected }) => {
  const handleSlotClick = () => {
    onClick(slot);
  };

  return (
    <TimeSlotBox className={`timeSlot ${isSelected ? 'selected' : ''}`} onClick={handleSlotClick}>
      {`${slot.start} - ${slot.end}`}
    </TimeSlotBox>
  );
};

const Classroom: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [room, setRoom] = useState("");
  const [classInfo, setClassInfo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<{ [day: string]: { start: string; end: string }[] }>(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );


  const handleSlotClick = (slot: { start: string; end: string }, day: string) => {
    const isSlotSelected = selectedSlots[day].some((s) => s.start === slot.start && s.end === slot.end);

    if (isSlotSelected) {
      setSelectedSlots({
        ...selectedSlots,
        [day]: selectedSlots[day].filter((s) => s.start !== slot.start || s.end !== slot.end),
      });
    } else {
      const overlappingSelection = selectedSlots[day].some(
        (s) => (s.start <= slot.start && slot.start < s.end) || (s.start < slot.end && slot.end <= s.end)
      );

      if (!overlappingSelection) {
        setSelectedSlots({
          ...selectedSlots,
          [day]: [...selectedSlots[day], slot],
        });
      }
    }
  };

  const openModal = () => {
    const hasSelection = Object.values(selectedSlots).some((slots) => slots.length > 0);
    if (hasSelection) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSlots(
      daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
    );
    // Clear other input fields when modal is closed
    setName("");
    setCourseCode("");
    setRoom("");
    setClassInfo("");
    setStartDate("");
    setEndDate("");
  };

  const handleConfirm = () => {
    console.log("Name:", name);
    console.log("Course Code:", courseCode);
    console.log("Room:", room);
    console.log("Class:", classInfo);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Selected Time Slots:", selectedSlots);
    closeModal();
  };


  return (
    <div className="App">
      <TimeSlotRow>
        <DayColumn></DayColumn>
        {timeSlots.map((slot, index) => (
          <TimeSlotBox key={index}>{`${slot.start} - ${slot.end}`}</TimeSlotBox>
        ))}
      </TimeSlotRow>
      {daysOfWeek.map((day, index) => (
        <TimeSlotRow key={index}>
          <DayColumn>{day}</DayColumn>
          {timeSlots.map((slot, index) => (
            <Slot
              key={index}
              slot={slot}
              onClick={() => handleSlotClick(slot, day)}
              isSelected={selectedSlots[day].some((s) => s.start === slot.start && s.end === slot.end)}
            />
          ))}
        </TimeSlotRow>
      ))}
      <button onClick={openModal}>Show Selected Times</button>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <ModalDialog>
          <ModalClose onClick={closeModal} />
          <div className="d-flex flex-column gap-2">
            <p>Selected Time Slots:</p>
            <ul>
              {daysOfWeek.map((day) => (
                <li key={day}>
                  {selectedSlots[day].length > 0 && (
                    <>
                      <strong>{day}:</strong>
                      <ul>
                        {selectedSlots[day].map((slot, index) => (
                          <li key={index}>{`${slot.start} - ${slot.end}`}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
            {Object.values(selectedSlots).some((slots) => slots.length > 0) && (
              <>
                <label>
                  Name:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  Course Code:
                  <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
                </label>
                <label>
                  Room:
                  <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
                </label>
                <label>
                  Class:
                  <input type="text" value={classInfo} onChange={(e) => setClassInfo(e.target.value)} />
                </label>
                <label>
                  Start Date:
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                  End Date:
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
                <button onClick={handleConfirm}>Confirm</button>
              </>
            )}
          </div>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default Classroom;