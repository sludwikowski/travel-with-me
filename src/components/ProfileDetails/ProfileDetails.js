import React from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material'

import { useAuthUser } from '../../contexts/UserContext'

export const ProfileDetails = (props) => {
  const {
    avatarsrc
    // onAvatarChange
  } = props
  const {
    userDisplayName,
    userEmail
  } = useAuthUser()

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatarsrc}
            sx={{
              height: 84,
              mb: 2,
              width: 84
            }}
          />
          <Typography
            color={'textPrimary'}
            gutterBottom
            variant={'h5'}
          >
            {userDisplayName}
          </Typography>
          <Typography
            color={'textSecondary'}
            variant={'body2'}
          >
            {userEmail}
          </Typography>
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Button
          fullWidth
          color={'secondary'}
          variant={'contained'}
          component={'label'}
        >
          <input
            hidden
            multiple
            type={'file'}
          />
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

ProfileDetails.propTypes = {
  avatarsrc: PropTypes.string
  // onAvatarChange: PropTypes.func.isRequired
}

export default ProfileDetails
