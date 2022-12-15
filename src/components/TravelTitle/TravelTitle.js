import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { Box, Button, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { addToCart } from '../../state/cartSlice'

import { TravelPropType } from '../TravelCard'

import { shades } from '../../theme'

import { useNavigate } from 'react-router-dom'

export const TravelTitle = (props) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const {
    sx,
    travel,
    ...otherProps
  } = props
  const navigate = useNavigate()
  const onClickGoBack = React.useCallback(() => navigate('/'), [navigate])

  return (
    <Box
      sx={{
        ...sx
      }}
      {...otherProps}
    >
      <Box
        flex={'1 1 50%'}
        mb={'40px'}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Box>Home/Travel</Box>
          <Button
            variant={'text'}
            color={'secondary'}
            cursor={'pointer'}
            onClick={onClickGoBack}
          >
            Go back
          </Button>
        </Box>
        <Box m={'65px 0 25px 0'}>
          <Typography variant={'h3'}>{travel.title}</Typography>
          <Typography>${travel.price}</Typography>
          <Typography sx={{ mt: '20px' }}>
            {travel.description}
          </Typography>
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          minHeight={'50px'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            border={`1.5px solid ${shades.neutral[300]}`}
            mr={'20px'}
            p={'2px 5px'}
          >
            <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ p: '0 5px' }}>{count}</Typography>
            <IconButton onClick={() => setCount(count + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            sx={{
              backgroundColor: '#222222',
              color: 'white',
              borderRadius: 0,
              minWidth: '150px',
              padding: '10px 40px'
            }}
            onClick={() => dispatch(addToCart({ travel: { ...travel, count } }))}
          >
            ADD TO CART
          </Button>
        </Box>
        <Box
          mt={2}
        >
          <Typography>CATEGORIES: {travel.category}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

TravelTitle.propTypes = {
  sx: PropTypes.object,
  travel: TravelPropType
}

export default TravelTitle
