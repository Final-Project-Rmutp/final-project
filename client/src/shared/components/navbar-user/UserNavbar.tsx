import React, { useState, MouseEvent, useEffect, useRef } from "react";
import {
  Button,
  Avatar,
  Box,
  Typography,
  Stack,
  Container,
  List,
} from "@mui/joy";
import { MenuItems, MenuItemLinks } from "../../../styles/global";
import "./UserNavbar.scss";
import { Outlet, Route, Routes, useNavigate } from "react-router";
import { toast } from "sonner";
import theme from "../../../styles/theme";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import UserService from "../../../auth/service/UserService";
import {
  Main,
  MenuContainer,
  MenuItemContainer,
} from "../navbar/NavbarStyled";
import Hamburger from "../navbar/Hamburger";
import {
  HeaderNav,
  MenuItemLinksNav,
  MenuItemsNav,
  SidebarUser,
  IconButtonUser,
  CardStyleUser,
  LayoutUser,
  LeftUser,
} from "./UserSidebarStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import HomeUser from "../../../pages/user/index";

interface LayoutState {
  leftOpen: boolean;
  rightOpen: boolean;
  selectedTab: string;
  anchorEl: null | HTMLElement;
}

const UserProfileSidebar: React.FC = () => {
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
    localStorage.removeItem("account_role");
    navigate("/");
    toast.success("Logout Successful");
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
      if (
        state.anchorEl &&
        !state.anchorEl.contains(mouseEvent.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [state.anchorEl, handleClose]);

  const leftOpen = state.leftOpen ? "open" : "closed";
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    user_img_path: "null",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profileData = await UserService.fetchUserProfile();
      setUserProfile(profileData);
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
      <IconButtonUser
        id="toggle-mode"
        color="neutral"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        sx={{
          zIndex: 2,
          boxShadow: "none",
          marginBottom: 2,
        }}
      >
        {mode === "light" ? (
          <Icon
            icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
            color="black"
          />
        ) : (
          <Icon
            icon="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
            color="#fecf49"
          />
        )}
      </IconButtonUser>
    );
  }

  const materialTheme = materialExtendTheme();
  const handleHamburgerClick = (event: MouseEvent<HTMLDivElement>) => {
    toggleSidebar(event);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const UserSidebarData = [
    {
        isShow: true,
        title: 'Reservation',
        path: 'room-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:reservation-orders" color="#235726" />
    },
    {
        isShow : localStorage.getItem('type') === 'teacher',
        title: 'Classroom',
        path: 'classroom-user',
        icon:''
        // icon: <Icon icon="ph:user-list-fill" color="#3F51B5"  />
    },
    {
        isShow: true,
        title: 'Status',
        path: 'status-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:sync-status-solid" color="#0077B2" />
    },
    {
        isShow: true,
        title: 'Report',
        path: 'report-user',
        icon:''
        // icon: <Icon icon="fluent-mdl2:report-warning" color="red"  />
    }
]

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <LayoutUser
          id="layout"
          data-left={state.leftOpen ? "open" : "closed"}
          style={{ position: "relative" }}
        >
          {isMobile && (
            <LeftUser id="left" className={state.leftOpen ? "open" : "closed"}>
              <div className="icon" onClick={handleHamburgerClick}>
                <Hamburger isActive={state.leftOpen} onClick={toggleSidebar} />
              </div>
              <SidebarUser className={`sidebar ${leftOpen}`}>
                <div className="header-left">
                  <div className="logo-header">
                    <Typography level="h2">LOGO</Typography>
                  </div>
                </div>
                <Container className="content">
                  {UserSidebarData.map((item, index) => (
                    <MenuItems key={index}>
                      <MenuItemLinks
                        to={item.path}
                        onClick={() => handleTabChange(item.title)}
                      >
                        <span className="size-icon">{item.icon}</span>
                        <Typography level="h4" style={{ marginLeft: "16px" }}>
                          {item.title}
                        </Typography>
                      </MenuItemLinks>
                    </MenuItems>
                  ))}
                </Container>
              </SidebarUser>
            </LeftUser>
          )}
          <Main id="main">
            <HeaderNav>
              <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-5 h-[--header-height]">
                <Box sx={{ flexGrow: 0, marginBottom: 2 }}>
                  <span></span>
                </Box>
                {!isMobile && (
                  <>
                    <Box sx={{ flexGrow: 0, marginBottom: 2 }}>
                      <div className="lg:flex-1 flex items-center gap-1.5">
                        <span>
                          <Link to="/user">
                            <Typography 
                              level="h2" 
                              variant="plain"
                              >Rmutp
                            </Typography>
                          </Link>
                        </span>
                      </div>
                    </Box>
                    <Box
                      component="nav"
                      sx={{ flexGrow: 0, marginBottom: 2 }}
                    >
                      <List role="menubar" orientation="horizontal">
                        {UserSidebarData.map((item, index) => (
                          <>
                          {item.isShow && (
                            <MenuItemsNav  key={index}>
                            <MenuItemLinksNav
                              to={item.path}
                              onClick={() => handleTabChange(item.title)}
                            >
                              <span className="size-icon">{item.icon}</span>
                              <Typography
                                noWrap
                                level="title-sm"
                                style={{ marginLeft: "16px" }}
                              >
                                {item.title}
                              </Typography>
                            </MenuItemLinksNav>
                          </MenuItemsNav>
                          )} 
                          </>
                        ))}
                      </List>
                    </Box>
                  </>
                )}
                <div className="flex items-center justify-end gap-1.5">
                  <ColorSchemeToggle />
                  <CardStyleUser onClick={handleMenuClick}>
                    <Box
                      sx={{
                        p: 0.8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Avatar variant="solid" src={userProfile.user_img_path}>
                        {userProfile.firstname.substring(0, 1)}
                      </Avatar>
                      <Stack spacing={0.4} sx={{ marginLeft: 2 }}>
                        <Typography
                          fontWeight="bold"
                          level="title-sm"
                          sx={{ paddingRight: 2 }}
                        >
                          {userProfile.firstname}
                        </Typography>
                      </Stack>
                    </Box>
                  </CardStyleUser>
                  <MenuContainer
                    id="profile-menu"
                    anchorEl={state.anchorEl}
                    open={Boolean(state.anchorEl)}
                    sx={{ width: 120 }}
                    ref={menuRef}
                  >
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
              </div>
            </HeaderNav>
            <div className="content-user">
              <Outlet></Outlet>
              <Routes>
                <Route path="/" element={<HomeUser />} />
              </Routes>
            </div>
          </Main>
        </LayoutUser>
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default UserProfileSidebar;
