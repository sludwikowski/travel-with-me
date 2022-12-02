import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

export const PageRecoverPassword = (props) => {
  const {
    onClickRecover: onClickRecoverFromProps
  } = props

  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(EMAIL_VALIDATION_ERROR)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const navigate = useNavigate()
  const onClickBackToLogin = React.useCallback(() => navigate('/'), [navigate])

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
