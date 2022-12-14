import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { Paper, TextField } from '@mui/material'

import MenuAppBar from '../../components/MenuAppBar'
import UserMenuItems from '../../components/UserMenuItems'
import SearchBarContainer from '../../components/SearchBarContainer'
import TravelsList from '../../components/TravelsList'
import { TravelPropType } from '../../components/TravelCard'

import { useAuthUser } from '../../contexts/UserContext'

import { getAll as getAllTravels } from '../../api/travels'

import { handleAsyncAction } from '../../handleAsyncAction'
import { CartMenu } from '../../components/CartMenu'
import { MainCarousel } from '../../components/MainCarousel'

export const PageTravelsList = (props) => {
  const {
    ...otherProps
  } = props

  const [travels, setTravels] = React.useState(null)
  const [searchPhrase, setSearchPhrase] = React.useState('')

  const navigate = useNavigate()
  const onClickTravel = React.useCallback((travelId) => navigate(`/travels/${travelId}`), [navigate])

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

  const fetchTravels = React.useCallback(async () => {
    await handleAsyncAction(async () => {
      const travels = await getAllTravels()
      setTravels(() => travels)
    }, 'Loading travels...')
  }, [])

  React.useEffect(() => {
    fetchTravels()
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredTravels = React.useMemo(() => {
    const searchPhraseUpperCase = searchPhrase.toUpperCase()
    return travels && travels.filter((travel) => {
      return (
        travel.title.toUpperCase().includes(searchPhraseUpperCase) ||
        travel.category.toUpperCase().includes(searchPhraseUpperCase) ||
        travel.description.toUpperCase().includes(searchPhraseUpperCase)
      )
    })
  }, [travels, searchPhrase])

  return (
    <>
      <MenuAppBar
        {...otherProps}
      >
        <UserMenuItems
          userDisplayName={userDisplayName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
      </MenuAppBar>
      <MainCarousel/>
      <SearchBarContainer>
        <TextField
          component={Paper}
          elevation={8}
          fullWidth
          label={'Type to search'}
          id={'searchBar'}
          color={'secondary'}
          value={searchPhrase}
          size={'small'}
          onChange={(e) => setSearchPhrase(() => e.target.value)}
        />
      </SearchBarContainer>
      <TravelsList
        travels={filteredTravels}
        onClickTravel={onClickTravel}
      />
      <CartMenu/>
    </>
  )
}
PageTravelsList.propTypes = {
  travels: PropTypes.arrayOf(TravelPropType),
  onClickLogOut: PropTypes.func
}
export default PageTravelsList
