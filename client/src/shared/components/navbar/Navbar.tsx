import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import {
  Card,
  Box,
  Avatar,
  Stack,
  Typography,
  Divider,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import StudentList from '../../../pages/admin/student-list/StudentList';
import { faBars, faTimes, faChartBar, faUser, faCalendarAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminProfileSidebar: React.FC = () => {
  const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };


  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {isMobileView && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
          <Button color="inherit" onClick={toggleTheme}>
            <Brightness4Icon />
          </Button>
          <Drawer anchor="left" onClose={toggleSidebar} >
            <div>
              <IconButton onClick={toggleSidebar}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
          </Drawer>
          <Card>
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar variant="rounded" src={randomImageUrl} />
              <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
                <Typography fontWeight="bold" sx={{ paddingRight: 2 }}>
                  Wisit Moondet
                </Typography>
              </Stack>
            </Box>
            <Divider />
          </Card>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: 6,

        }}
      >
      </Box>
      <div className="d-flex">
        <div className="sidebar-main">
          <div className={`sidebar fixed h-screen bg-gray-800 text-white p-4 ${collapsed ? 'collapsed' : ''} ${collapsed ? 'w-16' : 'w-64'}`}>
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
        </div>
        <div className="col-lg-12">
          <StudentList />
        </div>
      </div>
    </Box>
  );
};

export default AdminProfileSidebar;
