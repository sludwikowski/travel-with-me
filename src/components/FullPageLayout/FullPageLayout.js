import * as React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export function FullPageLayout (props) {
  const {
    sx,
    children
  } = props
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
      {children}
    </Box>
  )
}

FullPageLayout.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default FullPageLayout
