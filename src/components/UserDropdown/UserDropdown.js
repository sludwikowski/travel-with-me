import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Box, Typography, Avatar, MenuItem, Tooltip, IconButton, Menu } from '@mui/material'

export function UserDropdown (props) {
  const [anchorElUser, setAnchorElUser] = useState('')

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const {
    sx,
    userDisplayName,
    userEmail,
    userAvatar,
    userRank,
    userSettings,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        // height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px',
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
          {userRank || '– –'}
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
        <Tooltip
          title={'Open menu'}
          sx={{ pt: 15 }}
        >
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 1 }}
          >
            <Avatar
              src={userAvatar}
              sx={{ width: '4rem', height: '4rem' }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          id={'menu-appbar'}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {userSettings.map((setting, index) => (
            <MenuItem
              key={setting.name}
              onClick={handleCloseUserMenu}
            >
              <Typography
                textAlign={'center'}
              >
                {setting.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>

      </Box>
    </Box>
  )
}

UserDropdown.propTypes = {
  sx: PropTypes.object,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userRank: PropTypes.string,
  userAvatar: PropTypes.string,
  userSettings: PropTypes.object
}

export default UserDropdown
