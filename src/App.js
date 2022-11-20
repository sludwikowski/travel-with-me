import React from 'react'

import { Container, CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './theme'

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
    notLoginUserRoute: 'LOGIN', // 'NEW-ACCOUNT' or 'FORGOT PASSWORD'

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
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth={'xl'}>
          Simon Travel
        </Container>
      </ThemeProvider>
    )
  }
}

export default App
