import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminDetailsNew = (props) => {
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
      PageAdminDetailsNew
    </Box>
  )
}

PageAdminDetailsNew.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetailsNew
