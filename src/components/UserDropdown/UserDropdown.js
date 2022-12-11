import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { Box, Typography, Avatar, MenuItem, Tooltip, IconButton, Menu } from '@mui/material'
import { useAuthUser } from '../../contexts/UserContext'

export function UserDropdown (props) {
  const [anchorElUser, setAnchorElUser] = useState('')

  const navigate = useNavigate()
  const onClickAdminPanel = React.useCallback((travelId) => navigate('/admin'), [navigate])

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
    userSettings,
    ...otherProps
  } = props

  const {
    isAdmin
  } = useAuthUser()

  return (
    <Box
      sx={{
        height: '100%',
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
          variant={'h6'}
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
              sx={{ width: '5rem', height: '5rem' }}
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
          {
          isAdmin ?
            <MenuItem>
              <Typography
                textAlign={'center'}
                variant={'h6'}
                onClick={onClickAdminPanel}
              >
                Panel Admin
              </Typography>
            </MenuItem>
            :
            null
          }
          {userSettings.map((setting) => (
            <MenuItem
              key={setting.id}
              onClick={handleCloseUserMenu}
            >
              <Typography
                textAlign={'center'}
                variant={'h6'}
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
  userSettings: PropTypes.array
}

export default UserDropdown
