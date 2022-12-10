import React from 'react'
import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { Box, Button, Stack, Typography } from '@mui/material'

import { TravelPropType } from '../TravelCard'

export const TravelTitle = (props) => {
  const {
    sx,
    travel,
    ...otherProps
  } = props

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Typography
        component={'h1'}
        variant={'h2'}
        fontWeight={500}
        align={'center'}
        color={'text.primary'}
        gutterBottom
      >
        {travel.title}
      </Typography>
      <Typography
        variant={'h6'}
        align={'center'}
        color={'text.secondary'}
        paragraph
      >
        {travel.description}
      </Typography>
      <Stack
        sx={{ pt: 4 }}
        direction={'row'}
        spacing={2}
        justifyContent={'center'}
      >
        <Button
          variant={'contained'}
          onClick={() => navigate(travel.id)}
          sx={{ width: '300px' }}
        >
          NEXT
        </Button>
      </Stack>
    </Box>
  )
}

TravelTitle.propTypes = {
  sx: PropTypes.object,
  travel: TravelPropType
}

export default TravelTitle
