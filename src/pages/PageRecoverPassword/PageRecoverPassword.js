import React from 'react'
import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import { useRouteTo } from '../../contexts/RouterContext'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

export const PageRecoverPassword = (props) => {
  const {
    onClickRecover: onClickRecoverFromProps
  } = props

  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const routeTo = useRouteTo()
  const onClickBackToLogin = React.useCallback(() => routeTo('LOGIN'), [routeTo])

  const onClickRecover = React.useCallback(async () => {
    setIsSubmitted(() => true)

    if (emailError) return

    onClickRecoverFromProps(email)
  }, [email, emailError, onClickRecoverFromProps])

  React.useEffect(() => {
    setEmailError(() => isEmail(email) ? '' : EMAIL_VALIDATION_ERROR)
  }, [email])

  return (

    <FullPageLayout>
      <RecoverPasswordForm
        email={email}
        emailError={isSubmitted ? emailError : undefined}
        onChangeEmail={(e) => setEmail(() => e.target.value)}
        onClickRecover={onClickRecover}
        onClickBackToLogin={onClickBackToLogin}
      />
    </FullPageLayout>
  )
}

PageRecoverPassword.propTypes = {
  onClickRecover: PropTypes.func
}

export default PageRecoverPassword
