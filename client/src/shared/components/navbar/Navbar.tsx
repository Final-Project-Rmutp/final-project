import React, { useState, MouseEvent,useEffect} from "react";
import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material"; 
import {
  Button,
  Avatar,
} from "@mui/joy";
import { MenuItems, MenuItemLinks } from "../../../styles/global";
import { SidebarData } from "./SidebarData";
import "./Navbar.scss";
import { Outlet, useNavigate } from "react-router";
import { toast } from 'sonner'

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID} from '@mui/material/styles';

import { CssVarsProvider , useColorScheme} from '@mui/joy/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';
interface LayoutState {
  leftOpen: boolean;
  rightOpen: boolean;
  selectedTab: string;
  anchorEl: null | HTMLElement;
}

const AdminProfileSidebar: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<LayoutState>({
    leftOpen: true,
    rightOpen: true,
    selectedTab: "Team",
    anchorEl: null,
  });

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };
  const toggleSidebar = (event: MouseEvent<HTMLDivElement>) => {
    const parentNode = event.currentTarget.parentNode as HTMLElement | null;
    if (parentNode) {
      const key = `${parentNode.id}Open` as keyof LayoutState;
      setState((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    }
  };

  const handleTabChange = (tab: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedTab: tab,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
    toast.success('Logout Successful');

  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1500;
      if (isSmallScreen && state.leftOpen) {
        setState((prevState) => ({
          ...prevState,
          leftOpen: false,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state.leftOpen]);

  const leftOpen = state.leftOpen ? "open" : "closed";
  const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;




  
function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        zIndex: 999,
        borderRadius: '50%',
        boxShadow: 'sm',
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
const materialTheme = materialExtendTheme();
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <CssVarsProvider>
      <CssBaseline />
    <div id="layout">
      <div id="left" className={leftOpen}>
        <div className="icon" onClick={toggleSidebar}>
          <p>&equiv;</p>
        </div>
        <div className={`sidebar ${leftOpen}`}>
          <div className="header-left">
            <div className="logo-header">
              <h1>LOGO</h1>
            </div>
          </div>
          <div className="content">
            {SidebarData.map((item, index) => (
              <MenuItems key={index}>
                <MenuItemLinks
                  to={item.path}
                  onClick={() => handleTabChange(item.title)}
                >
                  {item.icon}
                  <span style={{ marginLeft: "16px" }}>{item.title}</span>
                </MenuItemLinks>
              </MenuItems>
            ))}
          </div>
        </div>
      </div>

      <div id="main">
        <div className="header">
                <Card
                component="button"
                onClick={handleMenuClick}
                >
                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '45px',
                    }}
                  >
                    <Avatar src={randomImageUrl} />
                    <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
                      <Typography fontWeight="bold" sx={{ paddingRight: 2 }}>
                        Wisit Moondet
                      </Typography>
                    </Stack>
                  </Box>
                  <Divider />
                </Card>
            <Menu
              id="profile-menu"
              anchorEl={state.anchorEl}
              open={Boolean(state.anchorEl)}
              onClose={handleClose}
              sx={{
                width:500
              }}
            >
              <MenuItem 
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <ColorSchemeToggle />
              </MenuItem>
              <MenuItem >
                <Button color="danger" variant="soft" onClick={handleLogout}>
                  Logout
                </Button>
              </MenuItem>
            </Menu>
        </div>
        <div className="content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
    </CssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default AdminProfileSidebar;
