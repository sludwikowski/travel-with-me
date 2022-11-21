import React from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import LoginForm from './components/LoginForm'

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
    notLoginUserRoute: 'LOGIN', // 'NEW-ACCOUNT' or 'FORGOT-PASSWORD'

    // login page state
    loginEmail: '',
    loginPassword: '',

    // create account page
    createAccountEmail: '',
    createAccountPassword: '',
    createAccountRepeatPassword: '',

    // recover password page
    recoverPasswordEmail: '',

    // travels list page
    travels: null, // courses: null,
    searchPhrase: ''
  }

  render () {
    const {
      loginEmail,
      loginPassword,
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage,
      notLoginUserRoute
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {
            notLoginUserRoute === 'LOGIN' ?
              <LoginForm
                email={loginEmail}
                password={loginPassword}
                onChangeEmail={(e) => this.setState(() => ({ loginEmail: e.target.value }))}
                onChangePassword={(e) => this.setState(() => ({ loginPassword: e.target.value }))}
                onClickLogin={() => console.log('onClickLogin')}
                onClickCreateAccount={() => console.log('onClickCreateAccount')}
                onClickForgotPassword={() => console.log('onClickForgotPassword')}
              />
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
                onButtonClick={console.log}
              />
              :
              null
          }
        {
            hasError ?
              <FullPageMessage
                message={errorMessage}
                iconVariant={'error'}
                onButtonClick={console.log}
              />
              :
              null
          }

      </ThemeProvider>
    )
  }
}

export default App
