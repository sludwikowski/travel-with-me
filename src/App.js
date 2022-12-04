/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'

import PageTravelsList from './pages/PageTravelsList'
import PageLogin from './pages/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile/PageProfile'

import { useAuthUser } from './contexts/UserContext'

import { signIn, signUp, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut, updateUser, getUserData as getUserDataAPICall } from './auth'

import { getAll as getAllTravels } from './api/travels'

export const App = () => {
  // global state
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isInfoDisplayed, setIsInfoDisplayed] = React.useState(false)
  const [infoMessage, setInfoMessage] = React.useState('')

  // travels
  const [travels, setTravels] = React.useState(null)

  const {
    isUserLoggedIn,
    setUser,
    clearUser
  } = useAuthUser()

  const handleAsyncAction = React.useCallback(async (asyncAction) => {
    setIsLoading(() => true)
    try {
      await asyncAction()
    } catch (error) {
      setHasError(() => true)
      setErrorMessage(() => error.data.error.message)
    } finally {
      setIsLoading(() => false)
    }
  }, [])

  const fetchTravels = React.useCallback(async () => {
    const travels = await getAllTravels()
    setTravels(() => travels)
  }, [])

  const getUserData = React.useCallback(async () => {
    const user = await getUserDataAPICall()
    console.log(user)

    setUser({
      displayName: user.displayName,
      email: user.email,
      avatar: ''
    })
  }, [setUser])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        getUserData(),
        fetchTravels()
      ])
    })
  }, [fetchTravels, getUserData, handleAsyncAction])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'User account created. User is logged in!')
      await Promise.all([
        getUserData(),
        fetchTravels()
      ])
    })
  }, [fetchTravels, getUserData, handleAsyncAction])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      setIsInfoDisplayed(() => true)
      setInfoMessage(() => 'Check your inbox!')
      await Promise.all([
        getUserData(),
        fetchTravels()
      ])
    })
  }, [fetchTravels, getUserData, handleAsyncAction])

  const onClickSaveChangesProfile = React.useCallback(async (displayName, photoUrl) => {
    handleAsyncAction(async () => {
      await updateUser(displayName, photoUrl)
      await getUserData()
    })
  }, [getUserData, handleAsyncAction])

  const onClickLogOut = React.useCallback(async () => {
    await logOut()
    clearUser()
  }, [clearUser])

  const dismissError = React.useCallback(() => {
    setHasError(() => false)
    setErrorMessage(() => '')
  }, [])

  const dismissMessage = React.useCallback(() => {
    setIsInfoDisplayed(() => false)
    setInfoMessage(() => '')
  }, [])

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await Promise.all([
          getUserData(),
          fetchTravels()
        ])
      }
    })
    // mount only
  }, [fetchTravels, getUserData, handleAsyncAction])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {
        isUserLoggedIn ?
          <Routes>
            <Route
              path={'/profile'}
              element={
                <PageProfile
                  onSaveChanges={onClickSaveChangesProfile}
                />
                  }
            />
            <Route
              path={'*'}
              element={
                <PageTravelsList
                  travels={travels}
                  onClickLogOut={onClickLogOut}
                />
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
                <PageLogin
                  onClickLogin={onClickLogin}
                />
                  }
            />
            <Route
              path={'/create-account'}
              element={
                <PageCreateAccount
                  onClickCreateAccount={onClickCreateAccount}
                />
                  }
            />
            <Route
              path={'/recover-password'}
              element={
                <PageRecoverPassword
                  onClickRecover={onClickRecover}
                />
                  }
            />
          </Routes>
          :
          null
      }

      {
            isLoading ?
              <FullPageLoader/>
              :
              null
          }
      {
            isInfoDisplayed ?
              <FullPageMessage
                message={infoMessage}
                iconVariant={'info'}
                buttonLabel={'OK'}
                onButtonClick={dismissMessage}
              />
              :
              null
          }
      {
            hasError ?
              <FullPageMessage
                message={errorMessage}
                iconVariant={'error'}
                onButtonClick={dismissError}
              />
              :
              null
          }

    </ThemeProvider>
  )
}

export default App
