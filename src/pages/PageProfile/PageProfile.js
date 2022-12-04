import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { useForm, FormProvider } from 'react-hook-form'

import { Box, Container, Grid, Typography, Button } from '@mui/material'

import ProfileDetails from '../../components/ProfileDetails'
import ProfileForm from '../../components/ProfileForm'
import MenuAppBar from '../../components/MenuAppBar'

import { useAuthUser } from '../../contexts/UserContext'

const PageProfile = (props) => {
  const {
    onSaveChanges,
    onAvatarChange
  } = props
  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  const methods = useForm({
    defaultValues: {
      email: userEmail,
      displayName: userDisplayName
    }
  })
  const { reset, handleSubmit } = methods

  React.useEffect(() => {
    reset({
      email: userEmail,
      displayName: userDisplayName
    })
  }, [userDisplayName, userEmail, reset])

  const navigate = useNavigate()
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])
  return (
    <>
      <MenuAppBar
        sx={{ height: 82 }}
      />
      <Box
        component={'section'}
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={'lg'}>
          <Typography
            sx={{ mb: 3 }}
            variant={'h4'}
          >
            Account
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <FormProvider
                {...methods}
              >
                <ProfileDetails
                  avatarsrc={userAvatar}
                  onChange={(e) => onAvatarChange(e.target.files[0])}
                />
              </FormProvider>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <FormProvider
                {...methods}
              >
                <ProfileForm
                  onSubmit={handleSubmit(async (data) => {
                    await onSaveChanges(data.displayName)
                    onClickGoBack()
                  })}
                />
              </FormProvider>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
              >
                <Button
                  color={'secondary'}
                  variant={'contained'}
                  onClick={onClickGoBack}
                >
                  GO BACK
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

PageProfile.propTypes = {
  onSaveChanges: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired
}

export default PageProfile
