import React from 'react'
import PropTypes from 'prop-types'

import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

export const PageTravel = (props) => {
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
      PageTravel
      <Outlet />
    </Box>
  )
}

PageTravel.propTypes = {
  sx: PropTypes.object
}

export default PageTravel
