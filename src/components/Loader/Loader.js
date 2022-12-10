import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, CircularProgress, Typography } from '@mui/material'

export function Loader (props) {
  const {
    sx,
    message,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <CircularProgress
          color={'success'}
          size={70}
        />
        {
        message ?
          <Typography
            variant={'body1'}
          >
            {message}
          </Typography>
          :
          null
      }
      </Box>
    </Box>
  )
}

Loader.propTypes = {
  sx: PropTypes.object,
  message: PropTypes.string
}

export default Loader
