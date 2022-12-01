import * as React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from '@mui/material'
import TravelCard, { TravelPropType } from '../TravelCard'

export function TravelsList (props) {
  const {
    travels
  } = props
  return (

    <Container
      sx={{ py: 2 }}
      maxWidth={'md'}
    >
      <Grid
        container
        spacing={4}
      >
        {
              travels && travels.map((travel) => {
                return (
                  <TravelCard
                    key={travel.id}
                    travel={travel}
                  />
                )
              })
          }
      </Grid>
    </Container>

  )
}

TravelsList.propTypes = {
  travels: PropTypes.arrayOf(TravelPropType)
}

export default TravelsList
