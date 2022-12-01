import React from 'react'
import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import RecoverPasswordForm from '../../components/RecoverPasswordForm'

import { EMAIL_VALIDATION_ERROR } from '../../consts'

export class PageRecoverPassword extends React.Component {
  state = {
    email: '',
    emailError: EMAIL_VALIDATION_ERROR,
    isSubmitted: false
  }

  onClickRecover = async () => {
    this.setState(() => ({ isSubmitted: true }))

    if (this.state.emailError) return

    this.props.onClickRecover(this.state.email)
  }

  render () {
    const {
      onClickBackToLogin
    } = this.props

    const {
      email,
      emailError,
      isSubmitted
    } = this.state

    return (

      <FullPageLayout>
        <RecoverPasswordForm
          email={email}
          emailError={isSubmitted ? emailError : undefined}
          onChangeEmail={(e) => this.setState(() => ({
            email: e.target.value,
            emailError: isEmail(e.target.value) ? '' : EMAIL_VALIDATION_ERROR
          }))}
          onClickRecover={this.onClickRecover}
          onClickBackToLogin={onClickBackToLogin}
        />
      </FullPageLayout>
    )
  }
}

PageRecoverPassword.propTypes = {
  onClickBackToLogin: PropTypes.func,
  onClickRecover: PropTypes.func
}

export default PageRecoverPassword
