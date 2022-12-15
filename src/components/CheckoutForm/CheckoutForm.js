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
        required
        fullWidth
        type={'text'}
        label={'First Name'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        type={'text'}
        label={'Last Name'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'Country'}
        sx={{ gridColumn: 'span 2' }}

      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'Street Address'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'Street Address 2 (optional)'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'City'}
        sx={{ gridColumn: 'span 2' }}
      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'State'}
        sx={{ gridColumn: '1fr' }}
      />
      <TextField
        required
        fullWidth
        type={'text'}
        label={'Zip Code'}
        sx={{ gridColumn: '1fr' }}
      />
    </Box>
  )
}

CheckoutForm.propTypes = {
  sx: PropTypes.object
}

export default CheckoutForm
