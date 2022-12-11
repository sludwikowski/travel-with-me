import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminDetails = (props) => {
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
      PageAdminDetails
    </Box>
  )
}

PageAdminDetails.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetails
