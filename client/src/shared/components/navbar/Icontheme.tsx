import { useColorScheme } from "@mui/joy";
import React from "react";
import { IconButtonHeader} from "./NavbarStyled";
import { Icon } from '@iconify/react';

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