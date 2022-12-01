import PropTypes from 'prop-types'

import isEmail from 'validator/lib/isEmail'

import FullPageLayout from '../../components/FullPageLayout'
import LoginForm from '../../components/LoginForm'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR } from '../../consts'
import React from 'react'

export class PageLogin extends React.Component {
  state = {
    loginEmail: '',
    loginEmailError: EMAIL_VALIDATION_ERROR,
    loginPassword: '',
    loginPasswordError: PASSWORD_VALIDATION_ERROR,
    loginSubmitted: false
  }

  onClickLogin = async () => {
    this.setState(() => ({ loginSubmitted: true }))

    if (this.state.loginEmailError) return
    if (this.state.loginPasswordError) return

    this.props.onClickLogin(this.state.loginEmail, this.state.loginPassword)
  }

  render () {
    const {
      onClickCreateAccount,
      onClickForgotPassword
    } = this.props
    const {
      loginEmail,
      loginSubmitted,
      loginEmailError,
      loginPassword,
      loginPasswordError
    } = this.state

    return (
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
          onClickCreateAccount={onClickCreateAccount}
          onClickForgotPassword={onClickForgotPassword}
        />
      </FullPageLayout>
    )
  }
}

PageLogin.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func,
  onClickForgotPassword: PropTypes.func
}

export default PageLogin
