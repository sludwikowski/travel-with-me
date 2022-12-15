import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate, useParams, Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import UserMenuItems from '../../components/UserMenuItems'
import MenuAppBar from '../../components/MenuAppBar'
import TravelTitle from '../../components/TravelTitle'
import DetailsList from '../../components/DetailsList'

import { useAuthUser } from '../../contexts/UserContext'

import { getMultiple as getMultipleDetails } from '../../api/details'
import { get as getTravel } from '../../api/travels'

import DetailsContextProvider from '../../contexts/DetailsContext'

import { handleAsyncAction } from '../../handleAsyncAction'

import { TravelPropType } from '../../components/TravelCard'
import { CartMenu } from '../../components/CartMenu'

export const PageTravel = (props) => {
  const {
    sx,
    travels,
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
        width: '80%',
        m: '80px auto',
        ...sx
      }}
      {...otherProps}
    >
      <MenuAppBar>
        <UserMenuItems
          userDisplayName={userDisplayName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
      </MenuAppBar>
      <CartMenu/>
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
      <Box >
        <DetailsContextProvider
          value={details}
        >
          <Outlet />
        </DetailsContextProvider>
        <DetailsList
          details={details}
        />
      </Box>
    </Box>
  )
}

PageTravel.propTypes = {
  sx: PropTypes.object,
  travels: PropTypes.arrayOf(TravelPropType),
  onClick: PropTypes.func,
  onClickLogOut: PropTypes.func,
  children: PropTypes.node
}

export default PageTravel
