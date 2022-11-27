import * as React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

export function LoginForm (props) {
  const {
    sx,
    email,
    emailError,
    password,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    onClickCreateAccount,
    onClickForgotPassword
  } = props
  return (
    <Grid
      container
      component={'main'}
      sx={{ height: '100vh' }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727_960_720.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...sx
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...sx
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <RocketLaunchIcon/>
          </Avatar>
          <Typography
            component={'h1'}
            variant={'h5'}
          >
            Sign in
          </Typography>
          <Box
            component={'form'}
            sx={{ mt: 1 }}
          >
            <TextField
              margin={'normal'}
              required
              fullWidth
              id={'email'}
              label={'Email Address'}
              name={'email'}
              autoComplete={'email'}
              value={email}
              onChange={onChangeEmail}
              helperText={emailError}
            />
            <TextField
              margin={'normal'}
              required
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
              value={password}
              onChange={onChangePassword}
              autoComplete={'current-password'}
            />
            <Button
              type={'submit'}
              fullWidth
              variant={'contained'}
              color={'warning'}
              sx={{ mt: 3 }}
              onClick={onClickLogin}
            >
              LOGIN
            </Button>
            <Button
              type={'button'}
              fullWidth
              variant={'contained'}
              color={'secondary'}
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickCreateAccount}
            >
              CREATE ACCOUNT
            </Button>
            <Button
              type={'button'}
              fullWidth
              variant={'text'}
              color={'secondary'}
              onClick={onClickForgotPassword}
            >
              FORGOT PASSWORD
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

LoginForm.propTypes = {
  sx: PropTypes.object,
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string,
  password: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickCreateAccount: PropTypes.func.isRequired,
  onClickForgotPassword: PropTypes.func.isRequired
}

export default LoginForm
