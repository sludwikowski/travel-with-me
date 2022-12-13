import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider, CssBaseline } from '@mui/material'

import App from './App'

import './firebaseConfig'

import UserContextProvider from './contexts/UserContext'

import { store } from './store'

import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </ThemeProvider>
  </Provider>
)
