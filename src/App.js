import React from 'react'

import { Routes, Route } from 'react-router-dom'

import ViewLoadersOverlay from './views/ViewLoadersOverlay'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import PageTravelsList from './pages/PageTravelsList'
import PageLogin from './pages/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile/PageProfile'
import PageTravel from './pages/PageTravel'

import { useAuthUser } from './contexts/UserContext'

import { checkIfUserIsLoggedIn } from './auth'

import { handleAsyncAction } from './handleAsyncAction'

export const App = () => {
  const {
    isUserLoggedIn,
    getUserData
  } = useAuthUser()

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await getUserData()
      }
    }, 'Loading app...').then(() => {})
    // mount only
  }, [getUserData])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {
        isUserLoggedIn ?
          <Routes>
            <Route
              path={'/profile'}
              element={
                <PageProfile/>
                  }
            />
            <Route
              path={'travels/:travelId'}
              element={
                <PageTravel />
            }
            >
            </Route>
            <Route
              path={'*'}
              element={
                <PageTravelsList/>
                  }
            />
          </Routes>
          :
          null
      }

      {
        !isUserLoggedIn ?
          <Routes>
            <Route
              path={'*'}
              element={
                <PageLogin/>
                  }
            />
            <Route
              path={'/create-account'}
              element={
                <PageCreateAccount/>
                  }
            />
            <Route
              path={'/recover-password'}
              element={
                <PageRecoverPassword/>
                  }
            />
          </Routes>
          :
          null
      }
      <ViewLoadersOverlay />
    </ThemeProvider>
  )
}

export default App
