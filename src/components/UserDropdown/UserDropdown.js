import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, Avatar } from '@mui/material'

export function UserDropdown (props) {
  const {
    sx,
    userDisplayName,
    userEmail,
    userAvatar,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: 'calc(100% - 51px)',
          ...sx
        }}
      >
        <Typography
          variant={'body1'}
        >
          {userDisplayName || '– –'}
        </Typography>
        <Typography
          variant={'caption'}
        >
          {userEmail}
        </Typography>
      </Box>
      <Box
        sx={{ ml: 2 }}
      >
        <Avatar
          src={userAvatar}
        />
      </Box>
    </Box>
  )
}

UserDropdown.propTypes = {
  sx: PropTypes.object,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string
}

export default UserDropdown
