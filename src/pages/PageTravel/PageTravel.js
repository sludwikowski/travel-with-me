import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useParams, Outlet } from 'react-router-dom'

import { Box, Container } from '@mui/material'

// import ImagesContainer from '../../components/ImagesContainer'
import UserDropdown from '../../components/UserDropdown'
import MenuAppBar from '../../components/MenuAppBar'
import TravelTitle from '../../components/TravelTitle'
import DetailsList from '../../components/DetailsList'

import { useAuthUser } from '../../contexts/UserContext'

import { getMultiple as getMultipleDetails } from '../../api/details'
import { get as getTravel } from '../../api/travels'

import DetailsContextProvider from '../../contexts/DetailsContext'

import { handleAsyncAction } from '../../handleAsyncAction'

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
        <DetailsContextProvider
          value={details}
        >
          <Outlet />
        </DetailsContextProvider>
        <DetailsList
          details={details}
        />
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
