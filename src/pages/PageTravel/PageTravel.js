import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useParams } from 'react-router-dom'

import { Box, Container, Button, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'

// import ImagesContainer from '../../components/ImagesContainer'
import UserDropdown from '../../components/UserDropdown'
import MenuAppBar from '../../components/MenuAppBar'

import { useAuthUser } from '../../contexts/UserContext'

import { getMultiple as getMultipleDetails } from '../../api/details'
import { get as getTravel } from '../../api/travels'

import { handleAsyncAction } from '../../handleAsyncAction'
import { TravelTitle } from '../../components/TravelTitle'
import { logOut } from '../../auth'
import { signOutWithFirebaseSDK } from '../../firebaseConfig'
// import { TravelTitle } from '../../components/TravelTitle'

export const PageTravel = (props) => {
  const {
    sx,
    children,
    ...otherProps
  } = props

  const { travelId } = useParams()
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigateMemoized = React.useMemo(() => navigate, [])

  const [travel, setTravel] = React.useState(null)
  const fetchTravel = React.useCallback(async (travelId) => {
    await handleAsyncAction(async () => {
      const travel = await getTravel(travelId)
      setTravel(() => travel)
    }, 'Loading travel...')
  }, [])

  const [details, setDetails] = React.useState(null)
  const fetchDetailsById = React.useCallback((detailsIds) => {
    handleAsyncAction(async () => {
      const details = await getMultipleDetails(detailsIds)
      setDetails(() => details)
    }, 'Loading details...').then(() => {})
  }, [])

  const detailsIds = travel && travel.details

  React.useEffect(() => {
    if (!travel) return
    if (!detailsIds) {
      navigateMemoized('/')
      return
    }
    fetchDetailsById(detailsIds)
  }, [travel, fetchDetailsById, detailsIds, navigateMemoized])

  React.useEffect(() => {
    fetchTravel(travelId)
  },
  [fetchTravel, travelId])

  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])

  const {
    userDisplayName,
    userEmail,
    userAvatar,
    clearUser
  } = useAuthUser()

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

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
        {
        travel ?
          <TravelTitle
            travel={travel}
          />
          :
          null
        }

      </Box>
      <Container
        sx={{ py: 4 }}
        maxWidth={'xl'}
        height={'100vh'}
      >
        <Box>
          <ImageList
            // variant={'quilted'}
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
  children: PropTypes.node
}

export default PageTravel
