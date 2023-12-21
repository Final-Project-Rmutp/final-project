import React,{ MouseEvent } from 'react';
import './Hamburger.scss';

interface HamburgerProps {
    isActive: boolean;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
  }
  
  const Hamburger: React.FC<HamburgerProps> = ({ isActive, onClick }) => {
    return (
      <div className={`hamburger ${isActive ? 'is-active' : ''}`} onClick={onClick}>
        <div className="hamburger__container">
          <div className="hamburger__inner"></div>
          <div className="hamburger__hidden"></div>
        </div>
      </div>
    );
  };
  
  export default Hamburger;
  