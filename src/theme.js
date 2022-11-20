import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EEEFF7'
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
      default: '#f1f1f1'
    }
  }

})

console.log('theme', theme)
