import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material'

import MenuAppBar from '../../components/MenuAppBar'
import UserDropdown from '../../components/UserDropdown'
import SearchBarContainer from '../../components/SearchBarContainer'
import TravelsList from '../../components/TravelsList'
import { TravelPropType } from '../../components/TravelCard'

import { useAuthUser } from '../../contexts/UserContext'

import { logOut } from '../../auth'
import { signOutWithFirebaseSDK } from '../../firebaseConfig'

import { getAll as getAllTravels } from '../../api/travels'

import { handleAsyncAction } from '../../handleAsyncAction'

export const PageTravelsList = (props) => {
  const {
    ...otherProps
  } = props

  const [travels, setTravels] = React.useState(null)
  const [searchPhrase, setSearchPhrase] = React.useState('')

  const navigate = useNavigate()
  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])
  const onClickTravel = React.useCallback((travelId) => navigate(`/travels/${travelId}`), [navigate])

  const {
    userDisplayName,
    userEmail,
    userAvatar,
    clearUser
  } = useAuthUser()

  const fetchTravels = React.useCallback(async () => {
    await handleAsyncAction(async () => {
      const travels = await getAllTravels()
      setTravels(() => travels)
    }, 'Loading travels...')
  }, [])

  const onClickLogOut = React.useCallback(async () => {
    await Promise.all([
      logOut(),
      signOutWithFirebaseSDK()
    ])
    clearUser()
  }, [clearUser])

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
      <SearchBarContainer>
        <TextField
          fullWidth
          label={'Type to search'}
          id={'searchBar'}
          color={'secondary'}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(() => e.target.value)}
        />
      </SearchBarContainer>
      <TravelsList
        travels={filteredTravels}
        onClickTravel={onClickTravel}
      />
    </>
  )
}
PageTravelsList.propTypes = {
  travels: PropTypes.arrayOf(TravelPropType),
  onClickLogOut: PropTypes.func
}
export default PageTravelsList
