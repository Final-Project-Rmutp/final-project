import React, { useState, MouseEvent, useEffect } from "react";
import "./Navbar.scss";
import theme from "../../../styles/theme";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Layout } from "./NavbarStyled"
import MainNavBar from "./MainNavBar";
import SideBarAdmin from "./SidebarAdmin";

interface LayoutState {
  leftOpen: boolean;
  rightOpen: boolean;
  selectedTab: string;
  anchorEl: null | HTMLElement;
}

export const AdminProfileSidebar: React.FC = () => {
  const [state, setState] = useState<LayoutState>({
    leftOpen: true,
    rightOpen: true,
    selectedTab: "Team",
    anchorEl: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = () => {
    setState({ ...state, anchorEl: null });
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

  const materialTheme = materialExtendTheme();

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Layout
          id="layout"
          data-left={state.leftOpen ? "open" : "closed"}
        >
          <SideBarAdmin state={state} setState={setState}/>
          <MainNavBar/>
        </Layout>
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default AdminProfileSidebar;
