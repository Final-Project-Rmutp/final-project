import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  onFloorSelect: (floor: string) => void;
}

const DropdownContainer = styled.div`
  position: relative;
  width: 150px;
  filter: url(#goo);
`;

const DropdownFace = styled.label`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  color: #110f0f;
  display: block;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    border-bottom: 2px solid #090909;
    border-right: 2px solid #0b0b0b;
    position: absolute;
    top: 50%;
    right: 30px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) translateY(-50%);
    transform-origin: right;
  }
`;

const DropdownText = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DropdownArrow = styled.div`
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #090909;
  border-right: 2px solid #0b0b0b;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: rotate(45deg) translateY(-50%);
  transform-origin: right;
`;

const DropdownItems = styled.ul`
  margin: 0;
  position: absolute;
  right: 0;
  top: 100%;
  width: 100%;
  list-style: none;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  z-index: 2;
  opacity: 0;
  transition: all 0.0s cubic-bezier(0.93, 0.88, 0.1, 0.8);

  &::before {
    content: "";
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right: 20%;
    height: 10px;
    width: 20px;
  }

  li {
    padding: 10px;
    cursor: pointer;

    &:hover {
      border-radius: 50px;
      background-color: rgba(121, 88, 88, 0.681);
      color: #f6f6f6;
    }
  }
`;

const Dropdown: React.FC<DropdownProps> = ({ onFloorSelect }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onFloorSelect(item);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <input type="checkbox" id="dropdown" checked={isOpen} onChange={handleToggleDropdown} />
      <DropdownFace htmlFor="dropdown">
        <DropdownText>
          {selectedItem || 'Select Floor'}
          <DropdownArrow />
        </DropdownText>
      </DropdownFace>
      <DropdownItems className={isOpen ? 'open' : ''}>
        <li onClick={() => handleItemClick('ชั้น9')}>ชั้น9</li>
        <li onClick={() => handleItemClick('ชั้น8')}>ชั้น8</li>
        <li onClick={() => handleItemClick('ชั้น7')}>ชั้น7</li>
        <li onClick={() => handleItemClick('ชั้น6')}>ชั้น6</li>
        <li onClick={() => handleItemClick('ชั้น5')}>ชั้น5</li>
        <li onClick={() => handleItemClick('ชั้น4')}>ชั้น4</li>
        <li onClick={() => handleItemClick('ชั้น3')}>ชั้น3</li>
        <li onClick={() => handleItemClick('ชั้น2')}>ชั้น2</li>
        <li onClick={() => handleItemClick('ชั้น1')}>ชั้น1</li>
      </DropdownItems>
    </DropdownContainer>
  );
};

export default Dropdown;
