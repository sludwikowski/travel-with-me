import * as React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import isEmail from 'validator/lib/isEmail'

import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

import { EMAIL_VALIDATION_ERROR, PASSWORD_VALIDATION_ERROR, REPEAT_PASSWORD_VALIDATION_ERROR } from '../../consts'

export function CreateAccountForm (props) {
  const {
    sx,
    onSubmit,
    onClickBackToLogin
  } = props

  const methods = useFormContext()

  const { register, formState: { errors }, watch } = methods

  const password = watch('password')

  const registeredEmailProps = register('email', {
    validate: (email) => isEmail(email) || EMAIL_VALIDATION_ERROR
  })

  const registeredPasswordProps = register('password', {
    required: {
      value: true,
      message: PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: PASSWORD_VALIDATION_ERROR
    }
  })

  const registeredRepeatPasswordProps = register('repeatPassword', {
    required: {
      value: true,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    minLength: {
      value: 6,
      message: REPEAT_PASSWORD_VALIDATION_ERROR
    },
    validate: (repeatPassword) => repeatPassword === password || REPEAT_PASSWORD_VALIDATION_ERROR
  })

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
            Create Account
          </Typography>
          <Box
            component={'form'}
            sx={{ mt: 1 }}
            onSubmit={onSubmit}
          >
            <TextField
              margin={'normal'}
              required
              fullWidth
              id={'email'}
              label={'E-mail'}
              name={'email'}
              autoComplete={'email'}
              autoFocus
              helperText={errors.email && errors.email.message}
              {...registeredEmailProps}
            />
            <TextField
              margin={'normal'}
              required
              fullWidth
              name={'password'}
              label={'Password'}
              type={'password'}
              value={password}
              helperText={errors.password && errors.password.message}
              {...registeredPasswordProps}
            />
            <TextField
              margin={'normal'}
              required
              fullWidth
              name={'repeat-password'}
              label={'Repeat password'}
              type={'password'}
              autoComplete={'repeat-password'}
              helperText={errors.repeatPassword && errors.repeatPassword.message}
              {...registeredRepeatPasswordProps}
            />
            <Button
              type={'submit'}
              fullWidth
              variant={'contained'}
              color={'secondary'}
              sx={{ mt: 3, mb: 2 }}
            >
              CREATE ACCOUNT
            </Button>
            <Button
              type={'button'}
              fullWidth
              variant={'text'}
              color={'secondary'}
              onClick={onClickBackToLogin}
            >
              BACK TO LOGIN
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

CreateAccountForm.propTypes = {
  sx: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default CreateAccountForm
