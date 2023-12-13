
import { extendTheme } from '@mui/joy/styles';


declare module '@mui/joy/styles' {
  // No custom tokens found, you can skip the theme augmentation.
}


const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {}
    },
    "dark": {
      "palette": {}
    }
  }
})

export default theme;