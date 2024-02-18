import { useColorScheme } from "@mui/joy";
import React from "react";
import { IconButtonUser } from "../navbar-user/UserSidebarStyle";

export const ColorSchemeToggle = () => {
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
          width:'30px',
          "&:hover": {
            transform: "scale(1.4)",
          },
        }}
        
      >
        {mode === "light" ? (
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Star.webp" alt="Star" width="25" height="25" />
        ) : (
          <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Sun.webp" alt="Sun" width="25" height="25" />
        )}
      </IconButtonUser>
    );
  }