import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminTravels = (props) => {
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
      PageAdminTravels
    </Box>
  )
}

PageAdminTravels.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravels
