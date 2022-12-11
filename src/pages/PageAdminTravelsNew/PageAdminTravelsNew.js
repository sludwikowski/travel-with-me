import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminTravelsNew = (props) => {
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
      PageAdminTravelsNew
    </Box>
  )
}

PageAdminTravelsNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravelsNew
