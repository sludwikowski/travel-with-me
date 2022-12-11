import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

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

  const navigate = useNavigate()
  const onClickCreateAccount = React.useCallback(() => navigate('/create-account'), [navigate])
  const onClickForgotPassword = React.useCallback(() => navigate('/recover-password'), [navigate])

  const onClickLogin = React.useCallback(async (email, password) => {
    await handleAsyncAction(async () => {
      await signIn(email, password)
      await Promise.all([
        signInWithFirebaseSDK(email, password),
        getUserData()
      ])
    }, 'Logging in...')
  }, [getUserData])

  return (
    <FullPageLayout>
      <FormProvider
        {...methods}
      >
        <LoginForm
          onSubmit={handleSubmit((data) => onClickLogin(data.email, data.password))}
          onClickCreateAccount={onClickCreateAccount}
          onClickForgotPassword={onClickForgotPassword}
        />
      </FormProvider>
    </FullPageLayout>
  )
}

export default PageLogin
