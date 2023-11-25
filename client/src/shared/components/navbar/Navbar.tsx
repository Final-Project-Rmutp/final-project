import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import {
  Card,
  Box,
  Avatar,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { useUser } from '../../../auth/authFetch';
import Sidebar from '../sidebar/Sidebar';
import StudentList from '../../../pages/admin/student-list/StudentList';

const UserProfileSidebar: React.FC = () => {
  const { user } = useUser();
  const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.classList.remove(isDarkTheme ? 'light-theme' : 'dark-theme');
    body.classList.add(isDarkTheme ? 'dark-theme' : 'light-theme');

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  useEffect(() => {
    // Lock scroll when component mounts
    document.body.style.overflow = 'hidden';

    // Clean up scroll lock when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <nav className={`navbar-container sticky top-0 z-auto ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <div className="logo-container">
          <img src="logo.png" alt="Logo" style={{ height: '40px', width: '40px' }} />
        </div>
        <button className="primary-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <Card>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar variant="rounded" src={randomImageUrl} />
            <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
              <Typography fontWeight="bold">{user?.id}</Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
            </Stack>
          </Box>
          <Divider />
        </Card>
      </nav>
          <div className="grid grid-rows-1 grid-flow-col">
            <div className="grid-cols-1">
              <Sidebar />
            </div>
            <div className="grid-cols-1">
            <StudentList />
            </div>
          </div>
    </>
  );
};

export default UserProfileSidebar;
