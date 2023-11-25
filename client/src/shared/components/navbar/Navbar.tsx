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
// import { useUser } from '../../../auth/authFetch';
import Sidebar from '../sidebar/Sidebar';
import StudentList from '../../../pages/admin/student-list/StudentList';

const UserProfileSidebar: React.FC = () => {
  const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

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
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
          <div className="main-navbar w-100">
            <nav className='nav align-items-stretch bg-black flex-md-nowrap  navbar navbar-light'>
              <a href="" className='w-100  navbar-brand'>
                <div className='d-table m-auto'>
                  <img src="{randomImageUrl}" alt=""  className='d-inline-block align-top mr-1'/>
                  <span className='d-none d-md-inline ml-1 text-white'>
                    asdsadasdsa
                  </span>
                </div>
              </a>
            </nav>
          </div>
          {!isMobileView &&  (
              <Sidebar  />
              )}
        </aside>
        <main className={`main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-2 ${isMobileView ? 'no-sidebar' : ''}`}>
          <div className={`main-navbar bg-black sticky-top w-100 ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="p-0 container-fluid">
              <nav className="nav flex-md-nowrap p-0 navbar navbar-light">
                <button className="btn-primary" onClick={toggleTheme}>
                  Toggle Theme
                </button>
                <Card>
                  <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <Avatar variant="rounded" src={randomImageUrl} />
                    <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
                      <Typography fontWeight="bold" sx={{paddingRight:10}}>Wisit Moondet</Typography>
                      <Typography variant="body2" color="text.secondary"></Typography>
                    </Stack>
                  </Box>
                  <Divider /> 
                </Card>
              </nav>
            </div>
          </div>
          <div className="main-content-container px-4 container-fluid">
              <StudentList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
