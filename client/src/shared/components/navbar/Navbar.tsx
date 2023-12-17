import React, { useState, MouseEvent, useEffect, useRef } from "react";
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Stack,
  IconButton,
  Container,
} from "@mui/joy";
import { Icon } from '@iconify/react';
import { MenuItems, MenuItemLinks } from "../../../styles/global";
import { SidebarData } from "./SidebarData";
import "./Navbar.scss";
import { Outlet, useNavigate } from "react-router";
import { toast } from 'sonner';
import theme from "../../../styles/theme";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID
} from '@mui/material/styles';

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CssBaseline from '@mui/joy/CssBaseline';
import UserService from "../../../auth/service/UserService";
import { CardStyle, Header, Layout, Left, Main, Sidebar } from "./NavbarStyled";

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

  const handleMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside: EventListener = (event: Event) => {
      const mouseEvent = event as unknown as MouseEvent;
      if (state.anchorEl && !state.anchorEl.contains(mouseEvent.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [state.anchorEl, handleClose]);

  const leftOpen = state.leftOpen ? "open" : "closed";
  // const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  // const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    user_img_path: "null",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await UserService.fetchUserProfile();
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
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
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
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
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Layout id="layout">
            <Left id="left" className={leftOpen}>
              <div className="icon" onClick={toggleSidebar}>
                <p><Icon icon="solar:hamburger-menu-bold-duotone" color="#9A9EEC" /></p>
              </div>
              <Sidebar className={`sidebar ${leftOpen}`}
              >
                <div className="header-left">
                  <div className="logo-header">
                    <Typography level="h2">LOGO</Typography>
                  </div>
                </div>
                <Container className="content">
                  {SidebarData.map((item, index) => (
                    <MenuItems key={index}>
                      <MenuItemLinks
                        to={item.path}
                        onClick={() => handleTabChange(item.title)}
                      >
                        {item.icon}
                        <Typography level="h4" style={{ marginLeft: "16px" }}>{item.title}</Typography>
                      </MenuItemLinks>
                    </MenuItems>
                  ))}
                </Container>
              </Sidebar>
            </Left>

            <Main id="main">
              <Header className="header">
                <div className="item-header">
                <CardStyle
                  onClick={handleMenuClick}
                >
                  <Box
                  
                    sx={{
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '0px',
                    }}
                  >
                    <Avatar src={userProfile.user_img_path} />
                    <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
                      <Typography fontWeight="bold" sx={{ paddingRight: 2 }}>
                        {userProfile.firstname}
                      </Typography>
                    </Stack>
                  </Box>
                </CardStyle>
                <Menu
                  id="profile-menu"
                  anchorEl={state.anchorEl}
                  open={Boolean(state.anchorEl)}
                  sx={{ width: 230 }}
                  ref={menuRef}
                >
                  <MenuItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <ColorSchemeToggle />
                  </MenuItem>
                  <MenuItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <Button color="danger" variant="soft" onClick={handleLogout}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
                </div>
              </Header>
              <div className="content">
                <Outlet></Outlet>
              </div>
            </Main>
          </Layout>
        </CssVarsProvider>
      </MaterialCssVarsProvider>
  );
};

export default AdminProfileSidebar;
