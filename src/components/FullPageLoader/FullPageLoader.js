import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, CircularProgress } from '@mui/material'

export function FullPageLoader (props) {
  const { sx } = props
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        ...sx
      }}
    >
      <CircularProgress
        color={'success'}
        size={70}
      />
    </Box>
  )
}

FullPageLoader.propTypes = {
  sx: PropTypes.object
}

export default FullPageLoader
