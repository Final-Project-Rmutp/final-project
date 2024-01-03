import React, { useState } from "react";
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import styled from "styled-components";

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
interface SlotProps {
  slot: { start: string; end: string };
  onClick: (slot: { start: string; end: string }) => void;
  isSelected: boolean; // New prop to indicate whether the slot is selected
}

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

const User: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<{ start: string; end: string }[]>([]);

  const handleSlotClick = (slot: { start: string; end: string }) => {
    const isSlotSelected = selectedSlots.some((s) => s.start === slot.start && s.end === slot.end);

    if (isSlotSelected) {
      setSelectedSlots(selectedSlots.filter((s) => s.start !== slot.start || s.end !== slot.end));
    } else {
      const overlappingSelection = selectedSlots.some(
        (s) => (s.start <= slot.start && slot.start < s.end) || (s.start < slot.end && slot.end <= s.end)
      );

      if (!overlappingSelection) {
        setSelectedSlots([...selectedSlots, slot]);
      }
    }
  };

  const openModal = () => {
    if (selectedSlots.length > 0) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSlots([]); // Clear selected slots when modal is closed
  };

  return (
    <div className="App">
      <div className="timeSlots">
        {timeSlots.map((slot, index) => (
          <Slot
            key={index}
            slot={slot}
            onClick={handleSlotClick}
            isSelected={selectedSlots.some((s) => s.start === slot.start && s.end === slot.end)}
          />
        ))}
      </div>
      <button onClick={openModal}>Show Selected Times</button>
      <Modal open={modalIsOpen} onClose={closeModal}>
        <ModalDialog>
          <ModalClose onClick={closeModal} />
          <div>
            <p>Selected Time Slots:</p>
            <ul>
              {selectedSlots.map((slot, index) => (
                <li key={index}>{`${slot.start} - ${slot.end}`}</li>
              ))}
            </ul>
          </div>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default User;