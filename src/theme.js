import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#9C9592'
    },
    secondary: {
      main: '#31353D'
    },
    info: {
      main: '#A0CED9'
    },
    warning: {
      main: '#e67e22'
    },
    error: {
      main: '#DB0000'
    },
    success: {
      main: '#025930'
    },
    background: {
      default: '#F1F1F1'
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
})

console.log('theme', theme)
