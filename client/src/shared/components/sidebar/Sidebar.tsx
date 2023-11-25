// Sidebar.js

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 ${collapsed ? 'w-16' : 'w-64'}`}>
      <button className="text-white focus:outline-none" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={collapsed ? faBars : faTimes} size="lg" />
      </button>
      <div className={`${collapsed ? 'hidden' : 'block'} mt-4`}>
        <p className="text-white">Sidebar Content</p>
      </div>
    </div>
  );
};

export default Sidebar;
