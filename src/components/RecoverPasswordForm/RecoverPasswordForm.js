import * as React from 'react'
import PropTypes from 'prop-types'

import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

export function RecoverPasswordForm (props) {
  const {
    sx,
    email,
    onChangeEmail,
    onClickRecover,
    onClickBackToLogin
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
            Recover password
          </Typography>
          <Box
            component={'form'}
            sx={{ mt: 15 }}
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
              value={email}
              onChange={onChangeEmail}
            />
            <Button
              type={'submit'}
              fullWidth
              variant={'contained'}
              color={'secondary'}
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickRecover}
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

RecoverPasswordForm.propTypes = {
  sx: PropTypes.object,
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onClickRecover: PropTypes.func.isRequired,
  onClickBackToLogin: PropTypes.func.isRequired
}

export default RecoverPasswordForm
