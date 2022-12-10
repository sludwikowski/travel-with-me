/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import { useDispatch } from 'react-redux'

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

import { signIn, signUp, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut, updateUser, getUserData as getUserDataAPICall } from './auth'

import { getMultiple as getMultipleDetails } from './api/details'
import { getAll as getAllTravels } from './api/travels'
import { upload as uploadAvatar } from './api/avatar'

import { signInWithFirebaseSDK, signOutWithFirebaseSDK } from './firebaseConfig'

import {
  createActionSetLoading,
  createActionSetError,
  createActionSetInfo,
  createActionRemoveLoading
} from './state/loaders'
export const App = () => {
  const dispatch = useDispatch()

  // travels
  const [travels, setTravels] = React.useState(null)

  // details
  const [details, setDetails] = React.useState(null)

  const {
    isUserLoggedIn,
    userId,
    setUser,
    clearUser
  } = useAuthUser()

  const handleAsyncAction = React.useCallback(async (asyncAction, message) => {
    dispatch(createActionSetLoading(message))
    try {
      await asyncAction()
    } catch (error) {
      dispatch(createActionSetError(error.message || error.data.error.message))
    } finally {
      dispatch(createActionRemoveLoading())
    }
  }, [dispatch])

  const fetchTravels = React.useCallback(async () => {
    const travels = await getAllTravels()
    setTravels(() => travels)
  }, [])

  const fetchDetailsByIds = React.useCallback(async (detailsIds) => {
    const details = await getMultipleDetails(detailsIds)
    setDetails(() => details)
  }, [])

  const fetchDetailsByIdsWithLoaders = React.useCallback((detailsIds) => {
    handleAsyncAction(async () => {
      await fetchDetailsByIds(detailsIds)
    }, 'Loading details...')
  }, [fetchDetailsByIds, handleAsyncAction])

  const getUserData = React.useCallback(async () => {
    const user = await getUserDataAPICall()

    setUser({
      id: user.localId,
      displayName: user.displayName,
      email: user.email,
      avatar: user.photoUrl
    })
  }, [setUser])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        signInWithFirebaseSDK(email, password),
        getUserData(),
        fetchTravels()
      ])
    }, 'Loging in...')
  }, [fetchTravels, getUserData, handleAsyncAction])

  const onClickCreateAccount = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signUp(email, password)
      dispatch(createActionSetInfo('User account created. User is logged in!'))
      await Promise.all([
        getUserData(),
        fetchTravels()
      ])
    }, 'Creating account...')
  }, [dispatch, fetchTravels, getUserData, handleAsyncAction])

  const onClickRecover = React.useCallback(async (email) => {
    handleAsyncAction(async () => {
      await sendPasswordResetEmail(email)
      dispatch(createActionSetInfo('Check your inbox!'))
    }, 'Recovering password...')
  }, [dispatch, handleAsyncAction])

  const onClickSaveChangesProfile = React.useCallback(async (displayName, photoUrl) => {
    handleAsyncAction(async () => {
      await updateUser(displayName, photoUrl)
      await getUserData()
    }, 'Saving profile...')
  }, [getUserData, handleAsyncAction])

  const onAvatarChangeProfile = React.useCallback(async (file) => {
    handleAsyncAction(async () => {
      const downloadURL = await uploadAvatar(userId, file, (progressPercent) => console.log(`Upload progress is ${progressPercent}%`))
      await updateUser(undefined, downloadURL)
      await getUserData()
    }, 'Saving profile...')
  }, [getUserData, handleAsyncAction, userId])

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

  React.useEffect(() => {
    handleAsyncAction(async () => {
      const userIsLoggedIn = await checkIfUserIsLoggedIn()
      if (userIsLoggedIn) {
        await Promise.all([
          getUserData(),
          fetchTravels()
        ])
      }
    }, 'Loading app...')
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
                  onAvatarChange={onAvatarChangeProfile}
                  onSaveChanges={onClickSaveChangesProfile}
                />
                  }
            />
            <Route
              path={'travels/:travelId'}
              element={
                <PageTravel
                  details={details}
                  travels={travels}
                  fetchDetailsByIds={fetchDetailsByIdsWithLoaders}
                  onClickLogOut={onClickLogOut}
                />
            }
            >
            </Route>
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
      <ViewLoadersOverlay />
    </ThemeProvider>
  )
}

export default App
