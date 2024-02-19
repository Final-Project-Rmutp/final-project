import React, { useState, MouseEvent, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router";
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
import { ColorSchemeToggle } from "./Icontheme";
import { CardStyle, Header, Main, MenuContainer } from "./NavbarStyled";
import { useLocation } from "react-router-dom";
import UserService from "../../../auth/service/UserService";
import { toast } from "sonner";
import { SidebarData } from "./SidebarData";
import { useColorScheme } from "@mui/joy/styles";

const MainNavBar: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<{
    anchorEl: HTMLElement | null;
    menuOpen: boolean;
  }>({
    anchorEl: null,
    menuOpen: false,
  });

  const handleMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      menuOpen: !state.menuOpen,
    });
  };

  const handleLogout = () => {
    setState({ ...state, menuOpen: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
    toast.success("Logout Successful");
  };

  const menuRef = useRef<HTMLDivElement>(null);

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

  const [userProfile, setUserProfile] = useState({
    firstname: "",
    user_img_path: "null",
  });

  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
      <Breadcrumbs aria-label="breadcrumbs" size="lg">
        {pathnames.map((name: string, index: number) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const breadcrumbName = SidebarData.find(
            (item) => item.path === name
          )?.name;

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

  const { mode } = useColorScheme();

  return (
    <Main
      id="main"
      style={{
        ...(mode === "dark"
          ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
          : { background: "linear-gradient(to bottom, #fff,#fff" }),
      }}
    >
      <Header className="header">
        <div className="item-header">
        <div className="d-flex justify-content-center align-items-center">
                <ColorSchemeToggle/>
              </div>
          <CardStyle  data-cy="profile-admin" onClick={handleMenuClick}>
            <Box
              style={{ cursor: "pointer" }}
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "0px",
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
            open={state.menuOpen}
            sx={{ width: 150 }}
            ref={menuRef}
          >
            {/* <ColorSchemeToggle /> */}
            <Button
              color="danger"
              variant="solid"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </MenuContainer>
        </div>
      </Header>
      <div className="content">
        <div className="d-flex justify-content-end me-5 mt-2">
          {generateBreadcrumbs()}
        </div>
        <Container>
          <Outlet />
        </Container>
      </div>
    </Main>
  );
};

export default MainNavBar;
