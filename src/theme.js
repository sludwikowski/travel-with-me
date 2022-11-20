import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#BFBFBF'
    },
    secondary: {
      main: '#8C8C8C'
    },
    info: {
      main: '#3498db'
    },
    warning: {
      main: '#e67e22'
    },
    error: {
      main: '#e74c3c'
    },
    success: {
      main: '#2ecc71'
    },
    background: {
      default: '#f1f1f1'
    }
  }

})

console.log('theme', theme)
