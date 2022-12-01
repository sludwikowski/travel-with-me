import React from 'react'
import PropTypes from 'prop-types'

import MenuAppBar from '../../components/MenuAppBar'
import UserDropdown from '../../components/UserDropdown'
import SearchBarContainer from '../../components/SearchBarContainer'
import TravelsList from '../../components/TravelsList'
import { TravelPropType } from '../../components/TravelCard'

import { TextField } from '@mui/material'

export class PageTravelsList extends React.Component {
  state = {
    searchPhrase: ''
  }

  render () {
    const {
      userDisplayName,
      userEmail,
      userAvatar,
      userRank,
      travels,
      onClickLogOut
    } = this.props

    const {
      searchPhrase
    } = this.state

    const searchPhraseUpperCase = searchPhrase.toUpperCase()
    const filteredTravels = travels && travels.filter((travel) => {
      return (
        travel.title.toUpperCase().includes(searchPhraseUpperCase) ||
                travel.category.toUpperCase().includes(searchPhraseUpperCase) ||
                travel.description.toUpperCase().includes(searchPhraseUpperCase)
      )
    })

    return (
      <>
        <MenuAppBar>
          <UserDropdown
            userDisplayName={userDisplayName}
            userEmail={userEmail}
            userAvatar={userAvatar}
            userRank={userRank}
            userSettings={[{ name: 'Profile' }, { name: 'Account' }, { name: 'Dashboard' },
              { name: <div onClick={onClickLogOut} >Logout </div> }]
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
            onChange={(e) => this.setState(() => ({ searchPhrase: e.target.value }))}
          />
        </SearchBarContainer>
        <TravelsList
          travels={filteredTravels}
        />
      </>
    )
  }
}
PageTravelsList.propTypes = {
  userDisplayName: PropTypes.string,
  userEmail: PropTypes.string,
  userAvatar: PropTypes.string,
  userRank: PropTypes.string,
  travels: PropTypes.arrayOf(TravelPropType),
  onClickLogOut: PropTypes.func
}
export default PageTravelsList
