// SideBarAdmin.tsx
import React, { MouseEvent } from "react";
import {
  Typography,
  Container,
} from "@mui/joy";
import { MenuItems, MenuItemLinks } from "../../../styles/global";
import { SidebarData } from "./SidebarData";
import { Left, Sidebar } from "./NavbarStyled";
import LogoRmutp from "../../../img/logo.png";
import { useColorScheme } from "@mui/joy/styles";
import Hamburger from "./Hamburger";

interface SideBarBarProps {
  state: LayoutState;
  setState: React.Dispatch<React.SetStateAction<LayoutState>>;
}

interface LayoutState {
  leftOpen: boolean;
  rightOpen: boolean;
  selectedTab: string;
  anchorEl: null | HTMLElement;
}

export const SideBarAdmin: React.FC<SideBarBarProps> = ({ state, setState }) => {
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
  const handleHamburgerClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleSidebar(event);
  };
  const handleTabChange = (tab: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedTab: tab,
    }));
  };

  const leftOpen = state.leftOpen ? "open" : "closed";
  const { mode } = useColorScheme();

  return (
    <Left
      id="left"
      className={state.leftOpen ? "open" : "closed"}
      style={{
        ...(mode === "dark"
          ? { background: "linear-gradient(to bottom, #020420, #0F172A)" }
          : { background: "linear-gradient(to bottom, #AA96DA,#6962AD)" }),
      }}
    >
    <div className="icon" onClick={handleHamburgerClick}>
        <Hamburger isActive={state.leftOpen} onClick={toggleSidebar} />
      </div>
      <Sidebar className={`sidebar ${leftOpen}`}>
        <div className="header-left">
          <div className="logo-header">
            <img src={LogoRmutp} alt="" />
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
                <Typography level="h4" style={{ marginLeft: "16px" }}>
                  {item.title}
                </Typography>
              </MenuItemLinks>
            </MenuItems>
          ))}
        </Container>
      </Sidebar>
    </Left>
  );
};

export default SideBarAdmin;
