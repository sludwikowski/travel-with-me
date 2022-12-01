import React from 'react'

import isEmail from 'validator/lib/isEmail'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import PageTravelsList from './pages/PageTravelsList'
import PageLogin from './pages/PageLogin'
import PageCreateAccount from './pages/PageCreateAccount'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'

import { getAll as getAllTravels } from './api/travels'

const EMAIL_VALIDATION_ERROR = 'Please type a valid e-mail!'

export class App extends React.Component {
  state = {
    // global state
    isLoading: false,
    hasError: false,
    errorMessage: '',
    isInfoDisplayed: false,
    infoMessage: '',

    // user/auth state
    isUserLoggedIn: false,
    userDisplayName: '',
    userEmail: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'CREATE-ACCOUNT' or 'RECOVER-PASSWORD'

    // recover password page
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false,

    // travels list page
    travels: null // travels: null,
  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    this.setState(() => ({ isLoading: false }))
    if (userIsLoggedIn) this.onUserLogin()
  }

  onClickLogin = async (email, password) => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(email, password)
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickCreateAccount = async (email, password) => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signUp(email, password)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'User account created. User is logged in!'
      }))
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onClickRecover = async () => {
    this.setState(() => ({ recoverPasswordSubmitted: true }))

    if (this.state.recoverPasswordEmailError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await sendPasswordResetEmail(this.state.recoverPasswordEmail)
      this.setState(() => ({
        isInfoDisplayed: true,
        infoMessage: 'Check your inbox!'
      }))
      this.onUserLogin()
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  fetchTravels = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      const travels = await getAllTravels()
      this.setState(() => ({ travels }))
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  onUserLogin = () => {
    const token = getIdToken()
    if (!token) return
    const user = decodeToken(token)

    // @TODO replace this token decoding with request for user data
    this.setState(() => ({
      isUserLoggedIn: true,
      userDisplayName: '',
      userEmail: user.email,
      userAvatar: ''
    }))

    this.fetchTravels()
  }

  onClickLogOut = async () => {
    await logOut()
    this.setState(() => ({
      isUserLoggedIn: false,
      userDisplayName: '',
      userEmail: '',
      userAvatar: ''
    }))
  }

  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
  }

  dismissMessage = () => {
    this.setState(() => ({
      isInfoDisplayed: false,
      infoMessage: ''
    }))
  }

  render () {
    const {
      isUserLoggedIn,
      userDisplayName,
      userEmail,
      userAvatar,
      userRank,
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage,
      notLoginUserRoute,
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted,
      travels
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {

          isUserLoggedIn ?
            <PageTravelsList
              userDisplayName={userDisplayName}
              userEmail={userEmail}
              userAvatar={userAvatar}
              userRank={userRank}
              travels={travels}
              onClickLogOut={this.onClickLogOut}
            />
            :
            notLoginUserRoute === 'LOGIN' ?
              <PageLogin
                onClickLogin={this.onClickLogin}
                onClickCreateAccount={() => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))}
                onClickForgotPassword={() => this.setState(() => ({ notLoginUserRoute: 'RECOVER-PASSWORD' }))}
              />
              :
              notLoginUserRoute === 'CREATE-ACCOUNT' ?
                <PageCreateAccount
                  onClickCreateAccount={this.onClickCreateAccount}
                  onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                />
                :
                notLoginUserRoute === 'RECOVER-PASSWORD' ?
                  <FullPageLayout>
                    <RecoverPasswordForm
                      email={recoverPasswordEmail}
                      emailError={recoverPasswordSubmitted ? recoverPasswordEmailError : undefined}
                      onChangeEmail={(e) => this.setState(() => ({
                        recoverPasswordEmail: e.target.value,
                        recoverPasswordEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
                      }))}
                      onClickRecover={this.onClickRecover}
                      onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                    />
                  </FullPageLayout>
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
                onButtonClick={this.dismissMessage}
              />
              :
              null
          }
        {
            hasError ?
              <FullPageMessage
                message={errorMessage}
                iconVariant={'error'}
                onButtonClick={this.dismissError}
              />
              :
              null
          }

      </ThemeProvider>
    )
  }
}

export default App
