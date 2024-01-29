import React, { useState, MouseEvent, useEffect, useRef } from "react";
import {
  Button,
  Avatar,
  Box,
  Typography,
  Stack,
  Container,
  Breadcrumbs,
  Link,
} from "@mui/joy";
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
import CssBaseline from '@mui/joy/CssBaseline';
import UserService from "../../../auth/service/UserService";
import { CardStyle, Header, IconButtonHeader, Layout, Left, Main, MenuContainer, Sidebar ,MenuItemContainer} from "./NavbarStyled";
import Hamburger from "./Hamburger";
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
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
      <IconButtonHeader
        id="toggle-mode"
        size="lg"
        variant="soft"
        color="neutral"
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        sx={{
          zIndex: 999,
          boxShadow: 'sm',
          width:"100%"
        }}
      >
        {mode === 'light' ? <Icon icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" color="#235726" /> : <Icon icon="line-md:moon-filled-alt-to-sunny-filled-loop-transition" color="#235726" />}
      </IconButtonHeader>
    );
  }

  const materialTheme = materialExtendTheme();
  const handleHamburgerClick = (event: MouseEvent<HTMLDivElement>) => {
    toggleSidebar(event)
  };
  const location = useLocation();
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
  
    return (
      <Breadcrumbs aria-label="breadcrumbs" size="lg">
        {pathnames.map((name: string, index: number) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
  
          const breadcrumbName = SidebarData.find((item) => item.path === name)?.name;
  
          return isLast ? (
            <Typography key={index} color="primary">
              {breadcrumbName || name}
            </Typography>
          ) : (
            <Link key={routeTo} color="neutral">
              Admin
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };
  
  return (
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Layout id="layout" data-left={state.leftOpen ? 'open' : 'closed'}>
            <Left id="left" className={state.leftOpen ? "open" : "closed"}>
              <div className="icon" onClick={handleHamburgerClick}>
              <Hamburger isActive={state.leftOpen} onClick={toggleSidebar} />
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
                        <span className="size-icon">{item.icon}</span> 
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
                <MenuContainer
                  id="profile-menu"
                  anchorEl={state.anchorEl}
                  open={Boolean(state.anchorEl)}
                  sx={{ width: 190 }}
                  ref={menuRef}
                >
                  <MenuItemContainer
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ColorSchemeToggle />
                  </MenuItemContainer>
                  <MenuItemContainer
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      color="danger"
                      variant="solid"
                      fullWidth
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </MenuItemContainer>
                </MenuContainer>
                </div>
              </Header>
              <div className="content">
                <div className="d-flex justify-content-end me-5 mt-2">
                  {generateBreadcrumbs()}
                </div>
                <Outlet></Outlet>
              </div>
            </Main>
          </Layout>
        </CssVarsProvider>
      </MaterialCssVarsProvider>
  );
};

export default AdminProfileSidebar;
