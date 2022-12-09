import React from 'react'
import PropTypes from 'prop-types'

import { Outlet, useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import ImagesContainer from '../../components/ImagesContainer'
import UserDropdown from '../../components/UserDropdown'
import MenuAppBar from '../../components/MenuAppBar'
import { useAuthUser } from '../../contexts/UserContext'

export const PageTravel = (props) => {
  const {
    sx,
    onClickLogOut,
    ...otherProps
  } = props

  const navigate = useNavigate()
  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <MenuAppBar>
        <UserDropdown
          userDisplayName={userDisplayName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          userSettings={[
            { id: 1, name: <div onClick={onClickProfile} >Profile </div> },
            { id: 2, name: <div onClick={onClickLogOut} >Logout </div> }]
          }
        />
      </MenuAppBar>
      <ImagesContainer>
        <Outlet />
      </ImagesContainer>
    </Box>
  )
}

PageTravel.propTypes = {
  sx: PropTypes.object,
  onClick: PropTypes.func,
  onClickLogOut: PropTypes.func
}

export default PageTravel
