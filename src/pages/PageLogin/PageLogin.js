import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

export const PageLogin = (props) => {
  const {
    onClickLogin: onClickLoginFromProps
  } = props

  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginEmailError, setLoginEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginPasswordError, setLoginPasswordError] = React.useState(PASSWORD_VALIDATION_ERROR)
  const [loginSubmitted, setLoginSubmitted] = React.useState(false)

  const navigate = useNavigate()
  const onClickCreateAccount = React.useCallback(() => navigate('/create-account'), [navigate])
  const onClickForgotPassword = React.useCallback(() => navigate('/recover-password'), [navigate])

  const onClickLogin = React.useCallback(async () => {
    setLoginSubmitted(() => true)

    if (loginEmailError) return
    if (loginPasswordError) return

    onClickLoginFromProps(loginEmail, loginPassword)
  }, [loginEmail, loginEmailError, loginPassword, loginPasswordError, onClickLoginFromProps])

  React.useEffect(() => {
    setLoginEmailError(isEmail(loginEmail) ? '' : EMAIL_VALIDATION_ERROR)
  }, [loginEmail])

  React.useEffect(() => {
    setLoginPasswordError(loginPassword.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR)
  }, [loginPassword])

  return (
    <FullPageLayout>
      <LoginForm
        email={loginEmail}
        emailError={loginSubmitted ? loginEmailError : undefined}
        password={loginPassword}
        passwordError={loginSubmitted ? loginPasswordError : undefined}
        onChangeEmail={(e) => setLoginEmail(() => e.target.value)}
        onChangePassword={(e) => setLoginPassword(() => e.target.value)}
        onClickLogin={onClickLogin}
        onClickCreateAccount={onClickCreateAccount}
        onClickForgotPassword={onClickForgotPassword}
      />
    </FullPageLayout>
  )
}

PageLogin.propTypes = {
  onClickLogin: PropTypes.func.isRequired
}

export default PageLogin
