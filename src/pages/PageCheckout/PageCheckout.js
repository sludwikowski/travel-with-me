import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import {
  Box, Button, Typography, Stepper, Step, StepLabel, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'

import CheckoutForm from '../../components/CheckoutForm'
import MenuAppBar from '../../components/MenuAppBar'
import UserMenuItems from '../../components/UserMenuItems'
import { useAuthUser } from '../../contexts/UserContext'

import { shades } from '../../theme'

export const PageCheckout = (props) => {
  const {
    sx,
    ...otherProps
  } = props

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  const navigate = useNavigate()
  const onClickGoBack = React.useCallback(() => navigate('/home'), [navigate])

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      width={'80%'}
      m={'100px auto'}
    >
      <MenuAppBar>
        <UserMenuItems
          userDisplayName={userDisplayName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
      </MenuAppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          variant={'h4'}
          sx={{ mt: '120px' }}
        >
          Billing Information
        </Typography>
      </Box>
      <Box
        width={'80%'}
        m={'30px auto'}
        sx={{
          ...sx
        }}
        {...otherProps}
      >
        <Stepper
          sx={{ m: '20px 0' }}
        >
          <Step>
            <StepLabel>Reservation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>
        <CheckoutForm/>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          gap={'50px'}
        >
          <Button
            fullWidth
            color={'primary'}
            variant={'contained'}
            sx={{
              backgroundColor: shades.primary[200],
              boxShadow: 'none',
              color: 'white',
              borderRadius: 0,
              padding: '15px 40px',
              mt: 5
            }}
            onClick={handleClickOpen}
          >
            RESERVATION
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby={'alert-dialog-title'}
            aria-describedby={'alert-dialog-description'}
          >
            <DialogTitle id={'alert-dialog-title'}>
              Are you confirming your order?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id={'alert-dialog-description'}>
                Thank you for trusting us
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={onClickGoBack}
              >
                Yes
              </Button>
              <Button
                onClick={handleClickOpen}
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  )
}

PageCheckout.propTypes = {
  sx: PropTypes.object
}

export default PageCheckout
