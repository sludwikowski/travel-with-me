import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useParams } from 'react-router-dom'

import { Box, Container, Stack, Typography, Button } from '@mui/material'

import ImagesContainer from '../../components/ImagesContainer'
import UserDropdown from '../../components/UserDropdown'
import MenuAppBar from '../../components/MenuAppBar'
import { TravelPropType } from '../../components/TravelCard'

import { useAuthUser } from '../../contexts/UserContext'

export const PageTravel = (props) => {
  const {
    sx,
    onClickLogOut,
    fetchDetailsByIds,
    travels,
    details,
    ...otherProps
  } = props

  const { travelId } = useParams()

  const currentTravel = travels && travels.find((travel) => {
    return travel.id === travelId
  })

  const { details: detailsIds } = currentTravel

  React.useEffect(() => {
    if (!detailsIds) return
    fetchDetailsByIds(detailsIds)
  }, [fetchDetailsByIds, detailsIds])

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
      <Box
        sx={{
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth={'xl'}>
          <Typography
            component={'h1'}
            variant={'h2'}
            align={'center'}
            color={'text.primary'}
            gutterBottom
          >
            {currentTravel.title}
          </Typography>
          <Typography
            variant={'h6'}
            align={'center'}
            color={'text.secondary'}
            paragraph
          >
            {currentTravel.description}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction={'row'}
            spacing={2}
            justifyContent={'center'}
          >
            <Button variant={'contained'}>Main call to action</Button>
            <Button variant={'secondary'}>Secondary action</Button>
          </Stack>
        </Container>
      </Box>
      <Container
        sx={{ py: 4 }}
        maxWidth={'xl'}
      >
        <ImagesContainer/>
      </Container>
    </Box>
  )
}

PageTravel.propTypes = {
  sx: PropTypes.object,
  onClick: PropTypes.func,
  onClickLogOut: PropTypes.func,
  travels: PropTypes.arrayOf(TravelPropType),
  details: PropTypes.arrayOf(PropTypes.object),
  fetchDetailsByIds: PropTypes.func
}

export default PageTravel
