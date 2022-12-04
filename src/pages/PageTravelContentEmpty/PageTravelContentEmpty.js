import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageTravelContentEmpty = (props) => {
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
      PageTravelContentEmpty
    </Box>
  )
}

PageTravelContentEmpty.propTypes = {
  sx: PropTypes.object
}

export default PageTravelContentEmpty
