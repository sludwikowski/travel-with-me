import * as React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@mui/material'
import TravelCard, { TravelPropType } from '../TravelCard'

export function TravelsList (props) {
  const {
    travels,
    onClickTravel
  } = props
  return (

    <Container
      sx={{ py: 2 }}
      maxWidth={'xl'}
    >
      <Grid
        container
        spacing={4}
      >
        {
        (!travels || travels.length === 0) ?
          'No found'
          :
          travels && travels.map((travel) => {
            return (
              <TravelCard
                key={travel.id}
                travel={travel}
                onClick={() => onClickTravel(travel.id)}
              />
            )
          })
          }
      </Grid>
    </Container>

  )
}

TravelsList.propTypes = {
  travels: PropTypes.arrayOf(TravelPropType),
  onClickTravel: PropTypes.func
}

export default TravelsList
