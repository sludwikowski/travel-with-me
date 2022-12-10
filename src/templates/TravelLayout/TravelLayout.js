import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const TravelLayout = (props) => {
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

    </Box>
  )
}

TravelLayout.propTypes = {
  sx: PropTypes.object
}

export default TravelLayout
