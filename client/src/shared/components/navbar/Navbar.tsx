import React from 'react';
import './Navbar.scss';
import {
  Card,
  Box,
  Avatar,
  Stack,
  Typography,
//   IconButton,
  Divider,
} from '@mui/material';

const UserProfileSidebar: React.FC = () => {
    const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
    const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <img src="logo.png" alt="Logo" style={{ height: '40px', width: '40px' }} />
      </div>

      <Card>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar variant="rounded" src={randomImageUrl} />
          <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
            <Typography fontWeight="bold">Lucas Smith</Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </Stack>
          {/* <IconButton size="small">
            <Edit fontSize="small" />
          </IconButton> */}
        </Box>
        <Divider />
      </Card>
    </nav>
  );
};

export default UserProfileSidebar;
