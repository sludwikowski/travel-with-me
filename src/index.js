import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import RouterContextProvider from './contexts/RouterContext'
import UserContextProvider from './contexts/UserContext'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContextProvider>
    <RouterContextProvider>
      <App />
    </RouterContextProvider>
  </UserContextProvider>
)

reportWebVitals()
