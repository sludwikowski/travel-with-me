import React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

export const ListItem = (props) => {
  const {
    sx,
    children,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        textAlign={'center'}
        variant={'h6'}
      >
        {children}
      </Typography>
    </Box>
  )
}

ListItem.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node
}

export default ListItem
