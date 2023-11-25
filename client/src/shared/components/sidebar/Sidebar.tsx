import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChartBar, faUser, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
<div className={`sidebar h-screen bg-gray-800 text-white p-4 ${collapsed ? 'collapsed' : ''} ${collapsed ? 'w-16' : 'w-64'}`}>
      <button className="toggle-sidebar text-white focus:outline-none" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={collapsed ? faBars : faTimes} size="lg" />
      </button>
      <div className={`${collapsed ? 'hidden' : 'block'} mt-4`}>
        <ul className='nav-item space-y-4'>
          <li>
            <a className="block py-2" href="/your-desired-page">
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <a className="block py-2" href="/your-desired-page">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              User
            </a>
          </li>
          <li>
            <a className="block py-2" href="/your-desired-page">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Reserved
            </a>
          </li>
          <li>
            <a className="block py-2" href="/your-desired-page">
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Report
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
