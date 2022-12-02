import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

import UserContextProvider from './contexts/UserContext'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>
)

reportWebVitals()
