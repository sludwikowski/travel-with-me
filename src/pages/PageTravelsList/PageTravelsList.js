import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import MenuAppBar from '../../components/MenuAppBar'
import UserDropdown from '../../components/UserDropdown'
import SearchBarContainer from '../../components/SearchBarContainer'
import TravelsList from '../../components/TravelsList'
import { TravelPropType } from '../../components/TravelCard'

import { useAuthUser } from '../../contexts/UserContext'

import { TextField } from '@mui/material'

export const PageTravelsList = (props) => {
  const {
    travels,
    onClickLogOut
  } = props

  const [searchPhrase, setSearchPhrase] = React.useState('')

  const navigate = useNavigate()
  const onClickProfile = React.useCallback(() => navigate('/profile'), [navigate])

  const {
    userDisplayName,
    userEmail,
    userAvatar
  } = useAuthUser()

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
      />
    </>
  )
}
PageTravelsList.propTypes = {
  travels: PropTypes.arrayOf(TravelPropType),
  onClickLogOut: PropTypes.func
}
export default PageTravelsList
