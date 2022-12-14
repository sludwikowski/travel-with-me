import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { Box, Paper, Typography, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { addToCart } from '../../state/cartSlice'

import { shades } from '../../theme'

export function TravelCard (props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const {
    travel = {},
    width,
    onClick
  } = props
  const {
    category,
    image,
    title,
    price
  } = travel
  return (
    <Box
      width={width}
    >
      <Box
        component={Paper}
        elevation={16}
        position={'relative'}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={title}
          width={'380px'}
          height={'512px'}
          src={image}
          onClick={() => navigate(`/travel/${travel.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position={'absolute'}
          bottom={'10%'}
          left={'0'}
          width={'100%'}
          padding={'0 5%'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              backgroundColor={shades.neutral[100]}
              borderRadius={'3px'}
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              disabled={!onClick}
              onClick={onClick}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Show more
            </Button>
            <Button
              onClick={() => {
                dispatch(addToCart({ travel: { ...travel, count } }))
              }}
              sx={{ backgroundColor: shades.primary[300], color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt={'3px'}>
        <Typography
          variant={'h4'}
          color={'#000000'}
        >
          {title}
        </Typography>
        <Typography>
          {category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography fontWeight={'bold'}>${price}</Typography>
      </Box>
    </Box>
  )
}

export const TravelPropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired

}).isRequired

TravelCard.propTypes = {
  travel: TravelPropType,
  onClick: PropTypes.func,
  price: PropTypes.number,
  width: PropTypes.object
}

export default TravelCard
