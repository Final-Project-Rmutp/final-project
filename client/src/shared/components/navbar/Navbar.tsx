import React, { useState, MouseEvent } from "react";
import {
  // Avatar,
  Box,
  // Button,
  Card,
  Divider,
  Stack,
  Typography,
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

interface LayoutState {
  leftOpen: boolean;
  rightOpen: boolean;
  selectedTab: string;
}

const AdminProfileSidebar: React.FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<LayoutState>({
    leftOpen: true,
    rightOpen: true,
    selectedTab: "Team",
  });

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

  const leftOpen = state.leftOpen ? "open" : "closed";
  const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
  const randomImageUrl = `https://picsum.photos/200/200?random=${randomImageNumber}`;
  return (
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
          <div className="profile-right"></div>
          <div className="profile-left">
            <Card>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  height: "45px",
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
          </div>
          <div className="btn-loggout">
            <Button color="danger" variant="soft" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <div className="content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSidebar;
