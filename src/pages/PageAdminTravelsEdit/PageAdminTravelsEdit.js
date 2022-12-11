import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminTravelsEdit = (props) => {
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
      PageAdminTravelsEdit
    </Box>
  )
}

PageAdminTravelsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminTravelsEdit
