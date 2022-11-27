import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, CircularProgress } from '@mui/material'

export function Loader (props) {
  const {
    sx,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <CircularProgress
        color={'success'}
        size={70}
      />
    </Box>
  )
}

Loader.propTypes = {
  sx: PropTypes.object
}

export default Loader
