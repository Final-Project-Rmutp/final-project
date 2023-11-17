// components/Dropdown.tsx
import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false); 
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <input type="checkbox" id="dropdown" checked={isOpen} onChange={handleToggleDropdown} />
      <label className="dropdown__face" htmlFor="dropdown">
        <div className="dropdown__text">
          {selectedItem || 'Select Floor'} {/* Display selected item or default text */}
        </div>
        <div className="dropdown__arrow"></div>
      </label>
      <ul className={`dropdown__items ${isOpen ? 'open' : ''}`}>
        <li onClick={() => handleItemClick('ชั้น9')}>ชั้น9</li>
        <li onClick={() => handleItemClick('ชั้น8')}>ชั้น8</li>
        <li onClick={() => handleItemClick('ชั้น7')}>ชั้น7</li>
        <li onClick={() => handleItemClick('ชั้น6')}>ชั้น6</li>
        <li onClick={() => handleItemClick('ชั้น5')}>ชั้น5</li>
        <li onClick={() => handleItemClick('ชั้น4')}>ชั้น4</li>
        <li onClick={() => handleItemClick('ชั้น3')}>ชั้น3</li>
        <li onClick={() => handleItemClick('ชั้น2')}>ชั้น2</li>
        <li onClick={() => handleItemClick('ชั้น1')}>ชั้น1</li>
      </ul>
    </div>
  );
};

export default Dropdown;
