import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageAdminDetailsEdit = (props) => {
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
      PageAdminDetailsEdit
    </Box>
  )
}

PageAdminDetailsEdit.propTypes = {
  sx: PropTypes.object
}

export default PageAdminDetailsEdit
