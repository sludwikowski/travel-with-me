import * as React from 'react'
import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'
import TravelCard, { TravelPropType } from '../TravelCard'

export function TravelsList (props) {
  const {
    sx,
    travels,
    onClickTravel
  } = props
  return (
    <Box
      sx={{
        width: '80%',
        margin: '40px auto',
        ...sx
      }}
    >
      <Typography
        variant={'h3'}
        textAlign={'center'}
        paddingBottom={'25px'}
      >
        Our Featured <b>Products</b>
      </Typography>
      <Box
        sx={{
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 380px)',
          justifyContent: 'space-around',
          rowGap: '50px',
          columnGap: '1.33%',
          ...sx
        }}
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
      </Box>
    </Box>

  )
}

TravelsList.propTypes = {
  sx: PropTypes.object,
  travels: PropTypes.arrayOf(TravelPropType),
  onClickTravel: PropTypes.func
}

export default TravelsList
