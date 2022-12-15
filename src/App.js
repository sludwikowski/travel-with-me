import React from 'react'

import { Routes, Route } from 'react-router-dom'

import ViewLoadersOverlay from './views/ViewLoadersOverlay'

import PageTravelsList from './pages/PageTravelsList'
import PageLogin from './pages/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'
import PageRecoverPassword from './pages/PageRecoverPassword'
import PageProfile from './pages/PageProfile/PageProfile'
import PageTravel from './pages/PageTravel'
import PageCheckout from './pages/PageCheckout'
import PageAdminMain from './pages/PageAdminMain'
import PageAdminDetails from './pages/PageAdminDetails'
import PageAdminDetailsNew from './pages/PageAdminDetailsNew'
import PageAdminDetailsEdit from './pages/PageAdminDetailsEdit'
import PageAdminTravels from './pages/PageAdminTravels'
import PageAdminTravelsNew from './pages/PageAdminTravelsNew'
import PageAdminTravelsEdit from './pages/PageAdminTravelsEdit'

import { useAuthUser } from './contexts/UserContext'

import { checkIfUserIsLoggedIn } from './auth'

import { handleAsyncAction } from './handleAsyncAction'

export const App = () => {
  const {
    isUserLoggedIn,
    isAdmin,
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
    <>
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
              path={'/checkout'}
              element={
                <PageCheckout />
              }
            />
            <Route
              path={'travels/:travelId'}
              element={
                <PageTravel />
            }
            >
            </Route>
            {
              isAdmin ?
                <Route
                  path={'/admin'}
                  element={<PageAdminMain />}
                >
                  <Route
                    path={'details'}
                    element={<PageAdminDetails />}
                  />
                  <Route
                    path={'details/new'}
                    element={<PageAdminDetailsNew />}
                  />
                  <Route
                    path={'details/:detailId'}
                    element={<PageAdminDetailsEdit />}
                  />
                  <Route
                    path={'travels'}
                    element={<PageAdminTravels />}
                  />
                  <Route
                    path={'travels/new'}
                    element={<PageAdminTravelsNew />}
                  />
                  <Route
                    path={'travels/:travelId'}
                    element={<PageAdminTravelsEdit />}
                  />
                </Route>
                :
                null
            }

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
    </>
  )
}

export default App
