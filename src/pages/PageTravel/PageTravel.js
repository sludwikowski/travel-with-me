import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useParams } from 'react-router-dom'

import { Box, Container, Stack, Typography, Button, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

// import ImagesContainer from '../../components/ImagesContainer'
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
    children,
    ...otherProps
  } = props

  const { travelId } = useParams()
  const navigate = useNavigate()

  const currentTravel = travels && travels.find((travel) => {
    return travel.id === travelId
  })

  const detailsIds = currentTravel && currentTravel.details

  React.useEffect(() => {
    if (!detailsIds) {
      navigate('/')
      return
    }
    fetchDetailsByIds(detailsIds)
  }, [fetchDetailsByIds, detailsIds, navigate])

  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])

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
            fontWeight={500}
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
            <Button
              variant={'contained'}
              onClick={() => navigate(currentTravel.id)}
              sx={{ width: '300px' }}
            >
              NEXT
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container
        sx={{ py: 4 }}
        maxWidth={'xl'}
        height={'100%'}
      >
        <Box>
          <ImageList
            variant={'masonry'}
            cols={2}
            gap={8}
            sx={{
              '@media (max-width: 599.95px)': {
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'scroll'
              }
            }}
          >
            {children}
            {
            details && details.map((detail) => {
              return (
                <ImageListItem key={detail.content} >
                  <img
                    src={`${detail.content}?w=248&fit=crop&auto=format`}
                    srcSet={`${detail.content}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={detail.title}
                    loading={'lazy'}
                  />
                  <ImageListItemBar
                    position={'below'}
                    title={detail.title}
                  />
                </ImageListItem>
              )
            })
            }
          </ImageList>
        </Box>
        <Box
          sx={{
            display: 'flex', justifyContent: 'flex-end'
          }}
        >
          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={onClickGoBack}
            sx={{ width: '300px' }}
          >
            GO BACK
          </Button>
        </Box>
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
  fetchDetailsByIds: PropTypes.func,
  children: PropTypes.node
}

export default PageTravel
