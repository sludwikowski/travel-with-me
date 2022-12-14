import { createTheme } from '@mui/material/styles'
import { green, grey, red } from '@mui/material/colors'

export const shades = {
  primary: {
    100: '#cccccc',
    200: '#999999',
    300: '#666666',
    400: '#333333',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000'
  },
  secondary: {
    100: '#f7ccd2',
    200: '#ef99a4',
    300: '#e66677',
    400: '#de3349',
    500: '#d6001c',
    600: '#ab0016',
    700: '#800011',
    800: '#56000b',
    900: '#2b0006'
  },
  neutral: {
    100: '#f5f5f5',
    200: '#ecebeb',
    300: '#e2e1e1',
    400: '#d9d7d7',
    500: '#cfcdcd',
    600: '#a6a4a4',
    700: '#7c7b7b',
    800: '#535252',
    900: '#292929'
  }
}

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: shades.neutral[300],
      dark: '#1e1e1f'
    },
    secondary: {
      light: '#fff5f8',
      main: shades.neutral[700],
      dark: shades.neutral[800]
    },
    info: {
      light: shades.neutral[100],
      main: '#A0CED9'
    },
    warning: {
      light: '#ffc071',
      main: '#ffb25e',
      dark: '#e67e22'
    },
    error: {
      light: red[50],
      main: red[500],
      dark: '#DB0000'
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700 // Roboto Condensed
  }
})

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase'
}

export const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.info.light,
      placeholder: grey[200]
    }
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14
    },
    caption: {
      ...rawTheme.typography.body1,
      fontSize: 12
    }
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#DB0000'
        }
      }
    }
  }
}

export default theme

console.log('theme', theme)
