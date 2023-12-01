// theme.ts
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D0A2F7",
    },
    background: {
      default: "#D0A2F7",
      paper: "#fff",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#D0A2F7",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#D0A2F7",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: "#D0A2F7",
          },
        },
      },
    },
  },
});

export default theme;
