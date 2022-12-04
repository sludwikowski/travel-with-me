import React from 'react'

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
    userDisplayName,
    userEmail,
    userAvatar
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
            src={userAvatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
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
          color={'primary'}
          fullWidth
          variant={'text'}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProfileDetails
