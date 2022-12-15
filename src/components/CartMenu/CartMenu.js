import React from 'react'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'

import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen
} from '../../state/cartSlice'

import { shades } from '../../theme'

import { TravelPropType } from '../TravelCard'

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CartMenu = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const totalPrice = cart.reduce((total, travel) => {
    return total + travel.count * travel.price
  }, 0)

  const {
    travels,
    sx,
    ...otherProps
  } = props

  return (
    <Box
      display={isCartOpen ? 'block' : 'none'}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'fixed',
        zIndex: 9999,
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        overflow: 'auto',
        ...sx
      }}
      {...otherProps}
    >
      <Box
        sx={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          width: 'max(400px, 30%)',
          height: '100%',
          backgroundColor: '#fff',
          ...sx
        }}
      >
        <Box
          padding={'30px'}
          overflow={'auto'}
          height={'100%'}
        >
          <FlexBox mb={'15px'}>
            <Typography variant={'h3'}>SHOPPING CART ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>
          <Box>
            {cart.map((travel) => (
              <Box key={`${travel.title}-${travel.id}`}>
                <FlexBox p={'15px 0'}>
                  <Box flex={'1 1 40%'}>
                    <img
                      alt={travel.title}
                      width={'123px'}
                      height={'164px'}
                      src={travel.image}
                    />
                  </Box>
                  <Box flex={'1 1 60%'}>
                    <FlexBox mb={'5px'}>
                      <Typography fontWeight={'bold'}>
                        {travel.title}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: travel.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{travel.shortDescription}</Typography>
                    <FlexBox m={'15px 0'}>
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: travel.id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{travel.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: travel.id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight={'bold'}>
                        ${travel.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
          <Box m={'20px 0'}>
            <FlexBox m={'20px 0'}>
              <Typography fontWeight={'bold'}>SUBTOTAL</Typography>
              <Typography fontWeight={'bold'}>${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: 'white',
                borderRadius: 0,
                minWidth: '100%',
                padding: '20px 40px',
                m: '20px 0'
              }}
              onClick={() => {
                navigate('/checkout')
                dispatch(setIsCartOpen({}))
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

CartMenu.propTypes = {
  sx: PropTypes.object,
  travels: PropTypes.arrayOf(TravelPropType)
}

export default CartMenu
