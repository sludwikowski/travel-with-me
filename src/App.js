import React from 'react'

import isEmail from 'validator/lib/isEmail'

import { CssBaseline, TextField, ThemeProvider } from '@mui/material'

import { theme } from './theme'

import FullPageLayout from './components/FullPageLayout'
import FullPageMessage from './components/FullPageMessage'
import FullPageLoader from './components/FullPageLoader'
import LoginForm from './components/LoginForm'
import CreateAccountForm from './components/CreateAccountForm/CreateAccountForm'
import RecoverPasswordForm from './components/RecoverPasswordForm'
import MenuAppBar from './components/MenuAppBar'
import UserDropdown from './components/UserDropdown/UserDropdown'
import TravelsList from './components/TravelsList'
import SearchBarContainer from './components/SearchBarContainer'

import { signIn, signUp, getIdToken, decodeToken, checkIfUserIsLoggedIn, sendPasswordResetEmail, logOut } from './auth'

import { getAll as getAllTravels } from './api/travels'

const EMAIL_VALIDATION_ERROR = 'Please type a valid e-mail!'
const PASSWORD_VALIDATION_ERROR = 'Password must have at least 6 chars!'
const REPEAT_PASSWORD_VALIDATION_ERROR = 'Passwords must be the same!'
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
    userRank: '',
    userAvatar: '',

    // router state
    notLoginUserRoute: 'LOGIN', // 'CREATE-ACCOUNT' or 'RECOVER-PASSWORD'

    // login page state
    loginEmail: '',
    loginEmailError: EMAIL_VALIDATION_ERROR,
    loginPassword: '',
    loginPasswordError: PASSWORD_VALIDATION_ERROR,
    loginSubmitted: false,

    // create account page
    createAccountEmail: '',
    createAccountEmailError: EMAIL_VALIDATION_ERROR,
    createAccountPassword: '',
    createAccountPasswordError: PASSWORD_VALIDATION_ERROR,
    createAccountRepeatPassword: '',
    createAccountRepeatPasswordError: REPEAT_PASSWORD_VALIDATION_ERROR,
    createAccountSubmitted: false,

    // recover password page
    recoverPasswordEmail: '',
    recoverPasswordEmailError: EMAIL_VALIDATION_ERROR,
    recoverPasswordSubmitted: false,

    // travels list page
    travels: null, // travels: null,
    searchPhrase: ''
  }

  async componentDidMount () {
    this.setState(() => ({ isLoading: true }))
    const userIsLoggedIn = await checkIfUserIsLoggedIn()
    this.setState(() => ({ isLoading: false }))
    if (userIsLoggedIn) this.onUserLogin()
  }

  onClickLogin = async () => {
    this.setState(() => ({ loginSubmitted: true }))

    if (this.state.loginEmailError) return
    if (this.state.loginPasswordError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await signIn(this.state.loginEmail, this.state.loginPassword)
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

  onClickCreateAccount = async () => {
    this.setState(() => ({ createAccountSubmitted: true }))

    if (this.state.createAccountEmailError) return
    if (this.state.createAccountPasswordError) return
    if (this.state.createAccountRepeatPasswordError) return

    this.setState(() => ({ isLoading: true }))
    try {
      await signUp(this.state.createAccountEmail, this.state.createAccountPassword)
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
      loginEmail,
      loginEmailError,
      loginPassword,
      loginPasswordError,
      loginSubmitted,
      isLoading,
      isInfoDisplayed,
      infoMessage,
      hasError,
      errorMessage,
      notLoginUserRoute,
      createAccountEmail,
      createAccountEmailError,
      createAccountPassword,
      createAccountPasswordError,
      createAccountRepeatPassword,
      createAccountRepeatPasswordError,
      createAccountSubmitted,
      recoverPasswordEmail,
      recoverPasswordEmailError,
      recoverPasswordSubmitted,
      travels,
      searchPhrase
    } = this.state

    const searchPhraseUpperCase = searchPhrase.toUpperCase()
    const filteredTravels = travels && travels.filter((travel) => {
      return (
        travel.title.toUpperCase().includes(searchPhraseUpperCase) ||
        travel.category.toUpperCase().includes(searchPhraseUpperCase) ||
        travel.description.toUpperCase().includes(searchPhraseUpperCase)
      )
    })

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {

          isUserLoggedIn ?
            <>
              <MenuAppBar>
                <UserDropdown
                  userDisplayName={userDisplayName}
                  userEmail={userEmail}
                  userAvatar={userAvatar}
                  userRank={userRank}
                  userSettings={[{ name: 'Profile' }, { name: 'Account' }, { name: 'Dashboard' }, { name: <div onClick={this.onClickLogOut} >Logout </div> }]}
                />
              </MenuAppBar>
              <SearchBarContainer>
                <TextField
                  fullWidth
                  label={'Type to search'}
                  id={'searchBar'}
                  color={'secondary'}
                  value={searchPhrase}
                  onChange={(e) => this.setState(() => ({ searchPhrase: e.target.value }))}
                />
              </SearchBarContainer>
              <TravelsList
                travels={filteredTravels}
              />
            </>
            :
            notLoginUserRoute === 'LOGIN' ?
              <FullPageLayout>
                <LoginForm
                  email={loginEmail}
                  emailError={loginSubmitted ? loginEmailError : undefined}
                  password={loginPassword}
                  passwordError={loginSubmitted ? loginPasswordError : undefined}
                  onChangeEmail={(e) => {
                    this.setState(() => ({
                      loginEmail: e.target.value,
                      loginEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
                    }))
                  }}
                  onChangePassword={(e) => {
                    this.setState(() => ({
                      loginPassword: e.target.value,
                      loginPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR
                    }))
                  }}
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
                    emailError={createAccountSubmitted ? createAccountEmailError : undefined}
                    password={createAccountPassword}
                    passwordError={createAccountSubmitted ? createAccountPasswordError : undefined}
                    repeatPassword={createAccountRepeatPassword}
                    repeatPasswordError={createAccountSubmitted ? createAccountRepeatPasswordError : undefined}
                    onChangeEmail={(e) => this.setState(() => ({
                      createAccountEmail: e.target.value,
                      createAccountEmailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
                    }))}
                    onChangePassword={(e) => this.setState(() => ({
                      createAccountPassword: e.target.value,
                      createAccountPasswordError: e.target.value.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR,
                      createAccountRepeatPasswordError: createAccountRepeatPassword === e.target.value ? '' : REPEAT_PASSWORD_VALIDATION_ERROR
                    }))}
                    onChangeRepeatPassword={(e) => this.setState(() => ({
                      createAccountRepeatPassword: e.target.value,
                      createAccountRepeatPasswordError: createAccountPassword === e.target.value ? '' : REPEAT_PASSWORD_VALIDATION_ERROR
                    }))}
                    onClickCreateAccount={this.onClickCreateAccount}
                    onClickBackToLogin={() => this.setState(() => ({ notLoginUserRoute: 'LOGIN' }))}
                  />
                </FullPageLayout>
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
