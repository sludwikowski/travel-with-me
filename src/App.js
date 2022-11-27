import React from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'

import { signIn } from './auth'

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

  onClickLogin = async () => {
    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(this.state.loginEmail, this.state.loginPassword)
    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.data.error.message
      }))
    } finally {
      this.setState(() => ({ isLoading: false }))
    }
  }

  dismissError = () => {
    this.setState(() => ({
      hasError: false,
      errorMessage: ''
    }))
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
      notLoginUserRoute,
      createAccountEmail,
      createAccountPassword,
      createAccountRepeatPassword,
      recoverPasswordEmail
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {
          notLoginUserRoute === 'LOGIN' ?
            <FullPageLayout>
              <LoginForm
                email={loginEmail}
                password={loginPassword}
                onChangeEmail={(e) => this.setState(() => ({ loginEmail: e.target.value }))}
                onChangePassword={(e) => this.setState(() => ({ loginPassword: e.target.value }))}
                onClickLogin={this.onClickLogin}
                onClickCreateAccount={() => this.setState(() => ({ notLoginUserRoute: 'CREATE-ACCOUNT' }))}
                onClickForgotPassword={() => this.setState(() => ({ notLoginUserRoute: 'RECOVER-PASSWORD' }))}
              />
            </FullPageLayout>
            :
            notLoginUserRoute === 'CREATE-ACCOUNT' ?
              <FullPageLayout>
                <CreateAccountForm
                  email={createAccountEmail}
                  password={createAccountPassword}
                  repeatPassword={createAccountRepeatPassword}
                  onChangeEmail={(e) => this.setState(() => ({ createAccountEmail: e.target.value }))}
                  onChangePassword={(e) => this.setState(() => ({ createAccountPassword: e.target.value }))}
                  onChangeRepeatPassword={(e) => this.setState(() => ({ createAccountRepeatPassword: e.target.value }))}
                  onClickCreateAccount={() => console.log('onClickCreateAccount')}
                  onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                />
              </FullPageLayout>
              :
              notLoginUserRoute === 'RECOVER-PASSWORD' ?
                <FullPageLayout>
                  <RecoverPasswordForm
                    email={recoverPasswordEmail}
                    onChangeEmail={(e) => this.setState(() => ({ recoverPasswordEmail: e.target.value }))}
                    onClickRecover={() => console.log('onClickRecover')}
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
