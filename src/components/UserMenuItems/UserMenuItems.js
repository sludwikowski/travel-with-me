import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { Box, Typography, Avatar, MenuItem, Tooltip, Badge, IconButton, Menu } from '@mui/material'

import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined'

import { useAuthUser } from '../../contexts/UserContext'

import { setIsCartOpen } from '../../state/cartSlice'

import { logOut } from '../../auth'

import { signOutWithFirebaseSDK } from '../../firebaseConfig'

export function UserMenuItems (props) {
  const [anchorElUser, setAnchorElUser] = useState('')

  const navigate = useNavigate()
  const onClickAdminPanel = React.useCallback((travelId) => navigate('/admin'), [navigate])
  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)

  const {
    clearUser
  } = useAuthUser()

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

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
          '@media (max-width: 599.95px)': {
            display: 'none'
          },
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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          columnGap: '20px',
          zIndex: 2,
          '@media (max-width: 599.95px)': {
            columnGap: '5px'
          },
          ...sx
        }}
      >
        <Tooltip
          title={'Open menu'}
          sx={{ pt: 15 }}
        >
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 1, ...sx }}
          >
            <Avatar
              src={userAvatar}
              sx={{
                width: '4rem',
                height: '4rem',
                '@media (max-width: 599.95px)': {
                  width: '3rem',
                  height: '3rem',
                  ...sx
                }
              }}
            />
          </IconButton>
        </Tooltip>
        <Badge
          badgeContent={cart.length}
          color={'error'}
          invisible={cart.length === 0}
          sx={{
            '& .MuiBadge-badge': {
              right: 10,
              top: 10,
              padding: '0 5px',
              height: '20px',
              minWidth: '19px',
              ...sx
            }
          }}
        >
          <IconButton
            onClick={() => dispatch(setIsCartOpen({}))}
            sx={{ color: 'black' }}
          >
            <ShoppingBagOutlined
              sx={{
                width: '4rem',
                height: '4rem',
                '@media (max-width: 599.95px)': {
                  width: '2rem',
                  height: '2rem',
                  ...sx
                }
              }}
            />
          </IconButton>
        </Badge>
      </Box>
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
        <MenuItem
          onClick={handleCloseUserMenu}
        >
          <Typography
            textAlign={'center'}
            variant={'h6'}
            onClick={onClickProfile}
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            textAlign={'center'}
            variant={'h6'}
            onClick={onClickLogOut}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

UserMenuItems.propTypes = {
  sx: PropTypes.object,
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userRank: PropTypes.string,
  userAvatar: PropTypes.string,
  userSettings: PropTypes.array
}

export default UserMenuItems
