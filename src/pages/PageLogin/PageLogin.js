import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'

import { useAuthUser } from '../../contexts/UserContext'

import { signIn } from '../../auth'
import { signInWithFirebaseSDK } from '../../firebaseConfig'
import { handleAsyncAction } from '../../handleAsyncAction'

export const PageLogin = () => {
  const {
    getUserData
  } = useAuthUser()

  const methods = useForm()
  const { handleSubmit } = methods

  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginEmailError, setLoginEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginPasswordError, setLoginPasswordError] = React.useState(PASSWORD_VALIDATION_ERROR)
  const [loginSubmitted] = React.useState(false)

  const navigate = useNavigate()
  const onClickCreateAccount = React.useCallback(() => navigate('/create-account'), [navigate])
  const onClickForgotPassword = React.useCallback(() => navigate('/recover-password'), [navigate])

  const onClickLogin = React.useCallback(async (email, password) => {
    handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        signInWithFirebaseSDK(email, password),
        getUserData()
      ])
    }, 'Loging in...')
  }, [getUserData])

  React.useEffect(() => {
    setLoginEmailError(isEmail(loginEmail) ? '' : EMAIL_VALIDATION_ERROR)
  }, [loginEmail])

  React.useEffect(() => {
    setLoginPasswordError(loginPassword.length >= 6 ? '' : PASSWORD_VALIDATION_ERROR)
  }, [loginPassword])

  return (
    <FullPageLayout>
      <FormProvider
        {...methods}
      >
        <LoginForm
          email={loginEmail}
          emailError={loginSubmitted ? loginEmailError : undefined}
          password={loginPassword}
          passwordError={loginSubmitted ? loginPasswordError : undefined}
          onChangeEmail={(e) => setLoginEmail(() => e.target.value)}
          onChangePassword={(e) => setLoginPassword(() => e.target.value)}
          onSubmit={handleSubmit((data) => onClickLogin(data.email, data.password))}
          onClickCreateAccount={onClickCreateAccount}
          onClickForgotPassword={onClickForgotPassword}
        />
      </FormProvider>
    </FullPageLayout>
  )
}

export default PageLogin
