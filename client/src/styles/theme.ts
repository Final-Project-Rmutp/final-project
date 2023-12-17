  import { PaletteRange, extendTheme } from '@mui/joy/styles';

  declare module '@mui/joy/styles' {
    interface ColorPalettePropOverrides {
      nav: true;
      main:true;
      pf:true;
    }
  
    interface NavPaletteOptions {
      bg?: string;
      color?: string;
      hoverBg?: string;
    }
  
    interface Palette {
      nav: PaletteRange & NavPaletteOptions;
      main:PaletteRange & NavPaletteOptions;
      pf:PaletteRange & NavPaletteOptions;

    }
  
    interface PaletteOptions {
      nav?: NavPaletteOptions;
      main?: NavPaletteOptions;
      pf:NavPaletteOptions;

    }
  }
  const neutral = {
    50: '#F7F7F8',
    100: '#EBEBEF',
    200: '#D8D8DF',
    300: '#B9B9C6',
    400: '#8F8FA3',
    500: '#73738C',
    600: '#5A5A72',
    700: '#434356',
    800: '#25252D',
    900: '#131318',
    dark:'#1D232A',
    nav:'#191E24',
    border:'#383F47'
  };

  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          neutral: {
            ...neutral,
            plainColor: `var(--joy-palette-neutral-200)`,
            plainHoverColor: `var(--joy-palette-neutral-900)`,
            plainHoverBg: `var(--joy-palette-neutral-100)`,
            plainActiveBg: `var(--joy-palette-neutral-200)`,
            plainDisabledColor: `var(--joy-palette-neutral-300)`,

            outlinedColor: `var(--joy-palette-neutral-800)`,
            outlinedBorder: `var(--joy-palette-neutral-200)`,
            outlinedHoverColor: `var(--joy-palette-neutral-900)`,
            outlinedHoverBg: `var(--joy-palette-neutral-100)`,
            outlinedHoverBorder: `var(--joy-palette-neutral-300)`,
            outlinedActiveBg: `var(--joy-palette-neutral-200)`,
            outlinedDisabledColor: `var(--joy-palette-neutral-300)`,
            outlinedDisabledBorder: `var(--joy-palette-neutral-100)`,

            softColor: `var(--joy-palette-neutral-800)`,
            softBg: `var(--joy-palette-neutral-100)`,
            softHoverColor: `var(--joy-palette-neutral-900)`,
            softHoverBg: `var(--joy-palette-neutral-200)`,
            softActiveBg: `var(--joy-palette-neutral-300)`,
            softDisabledColor: `var(--joy-palette-neutral-300)`,
            softDisabledBg: `var(--joy-palette-neutral-50)`,
            solidColor: `var(--joy-palette-common-white)`,
            solidBg: `var(--joy-palette-neutral-600)`,
            solidHoverBg: `var(--joy-palette-neutral-700)`,
            solidActiveBg: `var(--joy-palette-neutral-800)`,
            solidDisabledColor: `var(--joy-palette-neutral-300)`,
            solidDisabledBg: `var(--joy-palette-neutral-50)`,
          },
          common: {
            white: '#FFF',
            black: '#09090D',
          },
          text: {
            secondary: 'var(--joy-palette-neutral-600)',
            tertiary: 'var(--joy-palette-neutral-500)',
          },
          pf:{
            bg: 'var(--joy-palette-neutral-50)',
            color: 'var(--joy-palette-neutral-900)',
            hoverBg: 'var(--joy-palette-neutral-50)',
          },
          nav:{
            bg: 'var(--joy-palette-neutral-50)',
            color: 'var(--joy-palette-neutral-300)',
            hoverBg: 'var(--joy-palette-neutral-50)',
          },
          main:{
            bg: 'var(--joy-palette-neutral-50)',
            color: 'var(--joy-palette-neutral-900)',
            hoverBg: 'var(--joy-palette-neutral-50)',
          },
          background: {
            body: 'var(--joy-palette-neutral-100)',
            tooltip: 'var(--joy-palette-neutral-800)',
            backdrop: 'rgba(255 255 255 / 0.5)',
          },
        },
      },
      dark: {
        palette: {
          neutral: {
            ...neutral,
            plainColor: `var(--joy-palette-neutral-200)`,
            plainHoverColor: `var(--joy-palette-neutral-50)`,
            plainHoverBg: `var(--joy-palette-neutral-800)`,
            plainActiveBg: `var(--joy-palette-neutral-700)`,
            plainDisabledColor: `var(--joy-palette-neutral-700)`,

            outlinedColor: `var(--joy-palette-neutral-200)`,
            outlinedBorder: `var(--joy-palette-neutral-800)`,
            outlinedHoverColor: `var(--joy-palette-neutral-50)`,
            outlinedHoverBg: `var(--joy-palette-neutral-800)`,
            outlinedHoverBorder: `var(--joy-palette-neutral-700)`,
            outlinedActiveBg: `var(--joy-palette-neutral-800)`,
            outlinedDisabledColor: `var(--joy-palette-neutral-800)`,
            outlinedDisabledBorder: `var(--joy-palette-neutral-800)`,

            softColor: `var(--joy-palette-neutral-200)`,
            softBg: `var(--joy-palette-neutral-800)`,
            softHoverColor: `var(--joy-palette-neutral-50)`,
            softHoverBg: `var(--joy-palette-neutral-700)`,
            softActiveBg: `var(--joy-palette-neutral-600)`,
            softDisabledColor: `var(--joy-palette-neutral-700)`,
            softDisabledBg: `var(--joy-palette-neutral-900)`,

            solidColor: `var(--joy-palette-common-white)`,
            solidBg: `var(--joy-palette-neutral-600)`,
            solidHoverBg: `var(--joy-palette-neutral-700)`,
            solidActiveBg: `var(--joy-palette-neutral-800)`,
            solidDisabledColor: `var(--joy-palette-neutral-700)`,
            solidDisabledBg: `var(--joy-palette-neutral-900)`,
          },
          common: {
            white: '#FFF',
            black: '#09090D',
          },
          pf:{
            bg: 'var(--joy-palette-neutral-500)',
            color: 'var(--joy-palette-neutral-900)',
            hoverBg: 'var(--joy-palette-neutral-50)',
          },
          nav:{
            bg: 'var(--joy-palette-neutral-nav)',
            color: 'var(--joy-palette-neutral-700)',
            hoverBg: 'var(--joy-palette-neutral-50)',
          },
          main:{
            bg: 'var(--joy-palette-neutral-dark)',
            color: 'var(--joy-palette-neutral-900)',
            hoverBg: 'var(--joy-palette-neutral-5)0',
          },
          background: {
            body: 'var(--joy-palette-neutral-900)',
            surface: 'var(--joy-palette-common-black)',
            popup: 'var(--joy-palette-neutral-900)',
            level1: 'var(--joy-palette-neutral-800)',
            level2: 'var(--joy-palette-neutral-700)',
            level3: 'var(--joy-palette-neutral-600)',
          },
        },
      },
    },
  });

  export default theme;