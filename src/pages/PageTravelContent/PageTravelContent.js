import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const PageTravelContent = (props) => {
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
      PageCourseContent
    </Box>
  )
}

PageTravelContent.propTypes = {
  sx: PropTypes.object
}

export default PageTravelContent
