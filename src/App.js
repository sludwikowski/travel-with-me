import React from 'react'

import { Button, CssBaseline, ThemeProvider, Typography } from '@mui/material'

import { theme } from './theme'

import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'

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
    const {
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>

        <h1>Simon Travel</h1>
        {
            isLoading ?
              <FullPageLoader/>
              :
              null
          }
        <Typography
          variant={'h2'}
        >
          Header 1
        </Typography>
        <Typography
          variant={'h4'}
        >
          Header 3
        </Typography>
        <Typography
          variant={'button'}
        >
          Button
        </Typography>
        <Button
          variant={'contained'}
          color={'primary'}
        >
          CONTAINED PRIMARY
        </Button>
        <Button
          variant={'contained'}
          color={'secondary'}
        >
          CONTAINED SECONDARY
        </Button>
        <Button
          variant={'text'}
          color={'secondary'}
        >
          TEXT PRIMARY
        </Button>
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
