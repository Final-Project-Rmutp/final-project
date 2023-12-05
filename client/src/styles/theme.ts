// theme.ts
import { createTheme, ThemeOptions } from "@mui/material";

interface CustomThemeOptions extends ThemeOptions {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: string;
          solidColor: string;
          solidHoverBg: string;
          solidActiveBg: string;
        };
        neutral: {
          solidBg: string;
          solidColor: string;
          solidHoverBg: string;
          solidActiveBg: string;
        };
      };
    };
    dark: {
      // Define properties for the dark color scheme if needed
    };
  };
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: 'var(--joy-palette-primary-600)',
          solidColor: '#fff',
          solidHoverBg: 'var(--joy-palette-primary-700)',
          solidActiveBg: 'var(--joy-palette-primary-800)',
          // ...other tokens
        },
        neutral: {
          solidBg: 'var(--joy-palette-primary-700)',
          solidColor: '#fff',
          solidHoverBg: 'var(--joy-palette-primary-800)',
          solidActiveBg: 'var(--joy-palette-primary-900)',
          // ...other tokens
        },
        // ...other palettes
      },
    },
    dark: {
      palette: {
        // similar structure but different values
      },
    },
  },
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
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: "#D0A2F7", // Change the background color for MuiBox
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
} as CustomThemeOptions);

export default theme;
