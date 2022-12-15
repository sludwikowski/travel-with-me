import React from 'react'
import PropTypes from 'prop-types'

import { Box, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

export const CheckoutForm = (props) => {
  const {
    sx
  } = props

  const isNonMobile = useMediaQuery('(min-width:600px)')

  return (
    <Box
      display={'grid'}
      gap={'15px'}
      gridTemplateColumns={'repeat(4, minmax(0, 1fr))'}
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
        ...sx
      }}
    >
      <TextField
        fullWidth
        type={'text'}
        label={'First Name'}
        required
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        type={'text'}
        label={'Last Name'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type={'text'}
        label={'Country'}
        required
        sx={{ gridColumn: 'span 2' }}

      />
      <TextField
        fullWidth
        type={'text'}
        label={'Street Address'}
        required
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type={'text'}
        label={'Street Address 2 (optional)'}
        required
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type={'text'}
        label={'City'}
        required
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        fullWidth
        type={'text'}
        label={'State'}
        required
        sx={{ gridColumn: '1fr' }}
      />
      <TextField
        fullWidth
        type={'text'}
        label={'Zip Code'}
        required
        sx={{ gridColumn: '1fr' }}
      />
    </Box>
  )
}

CheckoutForm.propTypes = {
  sx: PropTypes.object
}

export default CheckoutForm
